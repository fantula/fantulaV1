#!/bin/bash

# 配置
SERVER_IP="180.163.87.70"
SERVER_USER="root"
REMOTE_DIR="/opt/fantula"
LOCAL_DIR="$(pwd)"

# 参数处理
ENV_TYPE=$1
MODE=$2

if [ -z "$ENV_TYPE" ]; then
  echo "Usage: ./deploy.sh [staging|prod] [quick|full]"
  exit 1
fi

echo "🚀 开始部署到 $ENV_TYPE ($SERVER_IP) - 模式: ${MODE:-quick} ..."

# 1. 本地构建 (Local Build)
echo "🏗️  执行本地构建 (npm run build)..."
cd "$LOCAL_DIR/nuxt-frontend"
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，终止部署。"
    exit 1
fi
cd "$LOCAL_DIR"

# 2. 同步文件 (Sync Artifacts)
echo "📂 同步文件 (.output + ecosystem.config.js)..."

# 同步 Nuxt 产物
rsync -avz --progress --delete \
  "$LOCAL_DIR/nuxt-frontend/.output/" \
  "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/nuxt-frontend/.output/"

# 同步 Nuxt 配置和 PM2 配置
scp "$LOCAL_DIR/nuxt-frontend/ecosystem.config.js" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/nuxt-frontend/"
scp "$LOCAL_DIR/nuxt-frontend/package.json" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/nuxt-frontend/"

# 同步 Scheduler (源码)
rsync -avz --progress --exclude='node_modules' --exclude='.env' \
  "$LOCAL_DIR/scripts/scheduler/" \
  "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/scripts/scheduler/"

# 3. 远程命令 (Remote Commands)
echo "🔄 执行远程更新..."

ssh "$SERVER_USER@$SERVER_IP" "bash -s" << EOF
  set -e
  
  # --- 1. Scheduler ---
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

  # --- 2. Frontend ---
  echo "--- Deploying Frontend ---"
  cd $REMOTE_DIR/nuxt-frontend
  
  # 确保 .env 存在
  if [ ! -f .env ]; then
    echo "⚠️  Fatal: Frontend .env missing!"
    exit 1
  fi

  # Full 模式下重装依赖 (关键修复：解决 macOS -> Linux 的二进制兼容性问题)
  if [ "$MODE" == "full" ]; then
    echo "📦 [Fix] Re-installing Server Dependencies (for Linux binaries)..."
    cd .output/server
    rm -rf node_modules
    rm -f package-lock.json
    # 移除 macOS 特有的依赖 (Fix: npm install failing on Linux due to darwin packages)
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

  echo "✅ 部署完成!"
EOF
