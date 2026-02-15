#!/bin/bash

# Configuration
SERVER_IP="180.163.87.70"
SERVER_USER="root"
REMOTE_PATH="/opt/fantula/nuxt-frontend"
LOCAL_OUTPUT_DIR="nuxt-frontend/.output"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 Starting Frontend Deployment to $SERVER_IP...${NC}"

# 1. Check for build artifacts
if [ ! -d "$LOCAL_OUTPUT_DIR" ]; then
    echo -e "${RED}❌ Error: .output directory not found!${NC}"
    echo "Please run 'cd nuxt-frontend && npm run build' first."
    exit 1
fi

# 2. Compress .output
echo "📦 Compressing build artifacts..."
tar -czf /tmp/nuxt_dist.tar.gz -C nuxt-frontend .output

# 3. Upload to server
echo "📤 Uploading to server..."
scp /tmp/nuxt_dist.tar.gz $SERVER_USER@$SERVER_IP:/tmp/nuxt_dist.tar.gz

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ SCP Failed${NC}"
    rm /tmp/nuxt_dist.tar.gz
    exit 1
fi

# 4. Deploy on server
echo "🔧 Deploying on server..."
ssh $SERVER_USER@$SERVER_IP "bash -s" << 'EOF'
    set -e
    TARGET_DIR="/opt/fantula/nuxt-frontend"
    
    # Backup existing output (optional, keep last one)
    if [ -d "$TARGET_DIR/.output" ]; then
        echo "   Backing up existing .output..."
        rm -rf "$TARGET_DIR/.output.bak"
        mv "$TARGET_DIR/.output" "$TARGET_DIR/.output.bak"
    fi
    
    # Extract new output
    echo "   Extracting new .output..."
    tar -xzf /tmp/nuxt_dist.tar.gz -C $TARGET_DIR
    
    # Restart PM2
    echo "   Restarting PM2 process..."
    # Ensure PM2 is in path or use absolute path if needed
    # Usually available in root env
    pm2 reload fantula || pm2 restart fantula
    
    # Clean up
    rm /tmp/nuxt_dist.tar.gz
    
    echo "✅ Deployment Successful!"
EOF

# Cleanup local
rm /tmp/nuxt_dist.tar.gz

echo -e "${GREEN}🎉 Done!${NC}"
