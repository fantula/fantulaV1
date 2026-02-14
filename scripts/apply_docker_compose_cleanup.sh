#!/bin/bash

SERVER_IP="180.163.87.70"
SERVER_USER="root"
LOCAL_FILE="docker-compose.yml.remote"
REMOTE_FILE="/opt/supabase/docker/docker-compose.yml"

echo "🔧 Uploading Cleaned Docker Compose to $SERVER_IP..."

scp $LOCAL_FILE $SERVER_USER@$SERVER_IP:/tmp/docker-compose.yml.clean

if [ $? -ne 0 ]; then
    echo "❌ SCP Failed"
    exit 1
fi

ssh $SERVER_USER@$SERVER_IP "bash -s" << 'EOF'
    set -e
    
    # Backup existing
    cp /opt/supabase/docker/docker-compose.yml /opt/supabase/docker/docker-compose.yml.broken.$(date +%s)
    
    # Move new file
    mv /tmp/docker-compose.yml.clean /opt/supabase/docker/docker-compose.yml
    
    echo "✅ Replaced docker-compose.yml"
    
    # Restart
    cd /opt/supabase/docker
    docker compose up -d --force-recreate functions
    
    echo "✅ Recreated functions service"
EOF
