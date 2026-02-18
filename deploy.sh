#!/bin/bash

# ============================================
# Fantula 标准化部署脚本
# 用法: ./deploy.sh [staging|prod] [quick|full|nginx-only]
#   quick      - 仅同步代码 + 重启 (默认)
#   full       - 同步代码 + 重装依赖 + 重启
#   nginx-only - 仅更新 Nginx 配置
# ============================================

set -e

# 配置
SERVER_IP="180.163.87.70"
SERVER_USER="root"
REMOTE_DIR="/opt/fantula"
LOCAL_DIR="$(pwd)"

# 参数处理
ENV_TYPE=$1
MODE=${2:-quick}

if [ -z "$ENV_TYPE" ]; then
  echo "Usage: ./deploy.sh [staging|prod] [quick|full|nginx-only]"
  echo ""
  echo "Modes:"
  echo "  quick       - Code sync + restart (default, no dependency reinstall)"
  echo "  full        - Code sync + reinstall Linux deps + restart"
  echo "  nginx-only  - Only update Nginx config, no rebuild"
  exit 1
fi

echo "=========================================="
echo "🚀 Fantula Deploy: $ENV_TYPE / $MODE"
echo "   Server: $SERVER_USER@$SERVER_IP"
echo "=========================================="

# ============================================
# Pre-flight 检查
# ============================================
echo ""
echo "--- Pre-flight Checks ---"

# SSH 连通性
ssh -o ConnectTimeout=5 -o BatchMode=yes "$SERVER_USER@$SERVER_IP" "echo ok" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ 无法连接服务器 $SERVER_IP，终止。"
    exit 1
fi
echo "✅ SSH 连接正常"

# 生产环境二次确认
if [ "$ENV_TYPE" == "prod" ]; then
    echo ""
    echo "⚠️  即将部署到 生产环境 ($SERVER_IP)"
    read -p "   输入 'yes' 确认: " confirm
    if [ "$confirm" != "yes" ]; then
        echo "已取消。"
        exit 0
    fi
fi

# ============================================
# Nginx-only 模式 (快捷通道)
# ============================================
if [ "$MODE" == "nginx-only" ]; then
    echo ""
    echo "--- Nginx-only Deploy ---"

    if [ ! -f "$LOCAL_DIR/config/nginx-prod.conf" ]; then
        echo "❌ config/nginx-prod.conf 不存在"
        exit 1
    fi

    scp "$LOCAL_DIR/config/nginx-prod.conf" "$SERVER_USER@$SERVER_IP:/etc/nginx/sites-available/fantula.conf"
    ssh "$SERVER_USER@$SERVER_IP" "ln -sf /etc/nginx/sites-available/fantula.conf /etc/nginx/sites-enabled/default && nginx -t && systemctl reload nginx"

    echo "✅ Nginx 配置已更新并重载"
    exit 0
fi

# ============================================
# 1. 本地构建 (Local Build)
# ============================================
echo ""
echo "--- Step 1: Local Build ---"
cd "$LOCAL_DIR/nuxt-frontend"
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，终止部署。"
    exit 1
fi
echo "✅ 构建成功"
cd "$LOCAL_DIR"

# ============================================
# 2. 同步文件 (Sync Artifacts)
# ============================================
echo ""
echo "--- Step 2: Sync Files ---"

# 同步 Nuxt 产物
echo "📂 Syncing .output/ ..."
rsync -avz --progress --delete \
  "$LOCAL_DIR/nuxt-frontend/.output/" \
  "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/nuxt-frontend/.output/"

# 同步 Nuxt 配置和 PM2 配置
scp "$LOCAL_DIR/nuxt-frontend/ecosystem.config.js" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/nuxt-frontend/"
scp "$LOCAL_DIR/nuxt-frontend/package.json" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/nuxt-frontend/"

# 同步 Scheduler (源码)
echo "📂 Syncing scheduler/ ..."
rsync -avz --progress --exclude='node_modules' --exclude='.env' \
  "$LOCAL_DIR/scripts/scheduler/" \
  "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/scripts/scheduler/"

# 同步 Nginx 配置
echo "📂 Syncing Nginx config ..."
scp "$LOCAL_DIR/config/nginx-prod.conf" "$SERVER_USER@$SERVER_IP:/etc/nginx/sites-available/fantula.conf"

echo "✅ 文件同步完成"

# ============================================
# 3. 远程命令 (Remote Commands)
# ============================================
echo ""
echo "--- Step 3: Remote Deploy ---"

ssh "$SERVER_USER@$SERVER_IP" "bash -s" << EOF
  set -e

  # --- Scheduler ---
  echo "--- Deploying Scheduler ---"
  cd $REMOTE_DIR/scripts/scheduler

  if [ ! -d "node_modules" ] || [ "$MODE" == "full" ]; then
    echo "📦 Installing Scheduler Dependencies..."
    npm install --production --registry=https://registry.npmmirror.com
  fi

  if [ ! -f .env ]; then
     echo "⚠️  Scheduler .env missing, copying from frontend if available..."
     [ -f ../../nuxt-frontend/.env ] && cp ../../nuxt-frontend/.env .
  fi

  pm2 reload fantula-scheduler || pm2 start index.js --name fantula-scheduler

  # --- Frontend ---
  echo "--- Deploying Frontend ---"
  cd $REMOTE_DIR/nuxt-frontend

  # 确保 .env 存在
  if [ ! -f .env ]; then
    echo "⚠️  Fatal: Frontend .env missing!"
    exit 1
  fi

  # Full 模式下重装依赖 (解决 macOS → Linux 二进制兼容性)
  if [ "$MODE" == "full" ]; then
    echo "📦 Re-installing Server Dependencies (Linux binaries)..."
    cd .output/server
    rm -rf node_modules
    rm -f package-lock.json
    sed -i '/darwin/d' package.json
    npm install --production --registry=https://registry.npmmirror.com
    cd ../..
  fi

  echo "♻️  Reloading PM2..."
  if [ -f ecosystem.config.js ]; then
     pm2 reload ecosystem.config.js --update-env || pm2 start ecosystem.config.js
  else
     pm2 reload fantula || pm2 start .output/server/index.mjs --name fantula
  fi

  # --- Nginx ---
  echo "--- Updating Nginx ---"
  ln -sf /etc/nginx/sites-available/fantula.conf /etc/nginx/sites-enabled/default
  nginx -t && systemctl reload nginx
  echo "✅ Nginx 已重载"

  # --- Health Check ---
  echo "--- Health Check ---"
  sleep 3
  HTTP_CODE=\$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/)
  if [ "\$HTTP_CODE" -ge 200 ] && [ "\$HTTP_CODE" -lt 400 ]; then
    echo "✅ Health check PASSED (HTTP \$HTTP_CODE)"
  else
    echo "❌ Health check FAILED (HTTP \$HTTP_CODE)"
    echo "   Run: pm2 logs fantula --lines 30"
    exit 1
  fi

  echo ""
  echo "✅ 部署完成!"
EOF

# ============================================
# 4. 本地版本标记
# ============================================
echo ""
echo "--- Step 4: Version Tag ---"
if command -v git &> /dev/null && git rev-parse --git-dir > /dev/null 2>&1; then
    VERSION="deploy-$(date +%Y%m%d-%H%M%S)"
    git tag "$VERSION" 2>/dev/null && echo "✅ Tagged: $VERSION" || echo "⚠️  Tag failed (may already exist)"
else
    echo "⚠️  Not a git repo, skipping tag"
fi

echo ""
echo "=========================================="
echo "🎉 Deploy Complete: $ENV_TYPE / $MODE"
echo "=========================================="
