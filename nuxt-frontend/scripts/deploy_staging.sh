#!/bin/bash

# Configuration
SERVER_USER="root"
SERVER_IP="101.126.31.206"
PROJECT_DIR="/var/www/fantula/nuxt-frontend" # Adjust if necessary

echo "🚀 Starting Deployment to Staging ($SERVER_IP)..."

# 1. SSH and Execute Commands
ssh $SERVER_USER@$SERVER_IP << 'EOF'
    set -e # Exit on error
    
    echo "📂 Navigating to project directory..."
    cd /var/www/fantula/nuxt-frontend || exit 1
    
    echo "⬇️ Pulling latest code..."
    git pull origin main
    
    echo "📦 Installing dependencies..."
    npm install
    
    echo "🏗️ Building for production..."
    npm run build
    
    echo "🔄 Restarting PM2 process..."
    pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
    
    echo "✅ Deployment Successful!"
EOF
