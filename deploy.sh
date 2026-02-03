#!/bin/bash

# 配置
SERVER_IP="180.163.87.70"
SERVER_USER="root"
REMOTE_DIR="/opt/fantula"
LOCAL_DIR="$(pwd)"

echo "🚀 开始部署到 $SERVER_IP ..."

# 1. 同步文件 (排除 node_modules, .git 等)
echo "📂 同步文件..."
rsync -avz --progress --exclude='node_modules' --exclude='.git' --exclude='.nuxt' --exclude='.output' \
  --exclude='.DS_Store' --exclude='.env' --exclude='.agent' \
  "$LOCAL_DIR/nuxt-frontend/" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/nuxt-frontend/"

rsync -avz --progress --exclude='node_modules' \
  "$LOCAL_DIR/scripts/scheduler/" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/scripts/scheduler/"

# 2. 远程构建与重启
echo "🔄 远程构建与重启..."
ssh "$SERVER_USER@$SERVER_IP" "bash -s" << EOF
  # 环境变量检查
  if [ ! -f $REMOTE_DIR/nuxt-frontend/.env ]; then
    echo "⚠️ 警告: 前端 .env 文件不存在"
  fi
  
  # 1. 部署 Scheduler
  echo "--- 部署 Scheduler ---"
  cd $REMOTE_DIR/scripts/scheduler
  # 确保 node_modules 存在
  if [ ! -d "node_modules" ]; then
    npm install --production
  fi
  
  if [ ! -f .env ]; then
     echo "复制 .env 到 Scheduler..."
     cp ../../nuxt-frontend/.env .
  fi
  # 清理可能存在的旧服务以防端口冲突
  pm2 delete fantula 2>/dev/null || true
  pm2 restart fantula-scheduler || pm2 start index.js --name fantula-scheduler

  # 2. 部署 Frontend
  echo "--- 部署 Frontend ---"
  cd $REMOTE_DIR/nuxt-frontend
  # 只在 package.json 变动时才需要 npm install，这里假设通常不需要，或者您可以手动运行
  # npm install
  npm run build
  
  if [ -f ecosystem.config.js ]; then
     echo "Starting with ecosystem.config.js..."
     pm2 restart ecosystem.config.js --update-env || pm2 start ecosystem.config.js
  else
     echo "Starting directly (No ecosystem config found)..."
     pm2 restart fantula-frontend || pm2 start .output/server/index.mjs --name fantula-frontend
  fi

  echo "✅ 部署完成!"
EOF
