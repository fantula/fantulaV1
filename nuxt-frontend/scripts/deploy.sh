#!/bin/bash

# ==========================================
# 🚀 Fantula Unified Deployment Script
# ==========================================
# Usage: ./deploy.sh [env] [mode]
# env: staging | prod
# mode: quick (default) | full
#
# Examples:
#   ./deploy.sh staging quick  -> Code update only
#   ./deploy.sh staging full   -> Reinstall dependencies
# ==========================================

# --- Configuration ---
ENV=$1
MODE=${2:-quick}

# Define Environments
if [ "$ENV" == "staging" ]; then
    SERVER_IP="180.163.87.70"
    SERVER_USER="root"
    REMOTE_DIR="/opt/fantula/nuxt-frontend"
elif [ "$ENV" == "prod" ]; then
    # Production uses the same server as Staging (confirmed by user)
    SERVER_IP="180.163.87.70"
    SERVER_USER="root"
    REMOTE_DIR="/opt/fantula/nuxt-frontend"
else
    echo "Usage: $0 [staging|prod] [quick|full]"
    exit 1
fi

LOCAL_DIR=$(pwd)

# --- Confirmation ---
echo "========================================"
echo "🌍 Target:  $ENV ($SERVER_IP)"
echo "🚀 Mode:    $MODE (quick=reload, full=reinstall)"
echo "📂 Project: $LOCAL_DIR"
echo "========================================"

if [ "$ENV" == "prod" ]; then
    read -p "⚠️  Are you sure you want to deploy to PROD? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# --- 1. Local Build ---
echo "🏗️  Starting Local Build..."
# Ensure we are building for the correct environment if needed
# For now, we assume standard build.
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build Failed!"
    exit 1
fi

echo "✅ Build Successful"

# --- 2. Sync Artifacts ---
echo "☁️  Syncing artifacts to server..."
# Exclude node_modules to prevents overwriting Linux binaries with Mac ones
# and to save bandwidth. Full mode will reinstall them.
rsync -az --delete --exclude='node_modules' --exclude='.DS_Store' \
    $LOCAL_DIR/.output/ \
    $SERVER_USER@$SERVER_IP:$REMOTE_DIR/.output/

if [ $? -ne 0 ]; then
    echo "❌ Sync Failed!"
    exit 1
fi

# --- 3. Remote Execution ---
echo "🔧 Executing Remote Commands ($MODE mode)..."

ssh $SERVER_USER@$SERVER_IP "bash -s" << EOF
    set -e
    source ~/.bashrc

    cd $REMOTE_DIR/.output/server

    # Fix Permissions (optional, fix 501 ownership)
    chown -R root:root .

    # Mode-specific logic
    if [ "$MODE" == "full" ]; then
        echo "📦 [FULL] Cleaning/Reinstalling node_modules..."
        # Even though we excluded node_modules in sync, we might want to clean old ones
        rm -rf node_modules package-lock.json
        
        # Remove Mac-specific dependencies from package.json
        sed -i '/darwin-arm64/d' package.json
        
        echo "⬇️ [FULL] Installing dependencies (Mirror)..."
        export npm_config_sharp_binary_host="https://npmmirror.com/mirrors/sharp"
        export npm_config_sharp_libvips_binary_host="https://npmmirror.com/mirrors/sharp-libvips"
        npm install --omit=dev --registry=https://registry.npmmirror.com
    else
        echo "⚡ [QUICK] Skipping dependency reinstall. Using existing binaries."
    fi

    # Restart
    echo "🔄 Reloading PM2..."
    pm2 reload fantula --update-env || pm2 start $REMOTE_DIR/ecosystem.config.js --name fantula

    echo "✅ Deployment Complete!"
EOF
