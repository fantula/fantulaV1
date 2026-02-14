#!/bin/bash

SERVER_IP="180.163.87.70"
SERVER_USER="root"
LOCAL_CONF="/Users/dalin/fantula/config/nginx-prod-cloud.conf"
REMOTE_TEMP="/tmp/nginx.conf.new"
REMOTE_DEST="/etc/nginx/sites-available/default"

echo "🔧 Deploying Nginx Config to $SERVER_IP..."

# 1. SCP the file
scp $LOCAL_CONF $SERVER_USER@$SERVER_IP:$REMOTE_TEMP

if [ $? -ne 0 ]; then
    echo "❌ SCP Failed"
    exit 1
fi

# 2. Move and Reload
ssh $SERVER_USER@$SERVER_IP "bash -s" << EOF
    set -e
    
    # Backup
    cp $REMOTE_DEST $REMOTE_DEST.bak.final.$(date +%s)
    
    # Move
    mv $REMOTE_TEMP $REMOTE_DEST
    
    # Test
    nginx -t
    
    if [ \$? -eq 0 ]; then
        systemctl reload nginx
        echo "✅ Nginx Reloaded Successfully"
    else
        echo "❌ Nginx Config Invalid. Rolling back..."
        cp $REMOTE_DEST.bak.final* $REMOTE_DEST
        systemctl reload nginx
        exit 1
    fi
EOF
