#!/bin/bash
SERVER_IP="180.163.87.70"
SERVER_USER="root"
LOCAL_FUNC_DIR="supabase/functions/system-health" 
LOCAL_SHARED_DIR="supabase/functions/_shared"
REMOTE_BASE_DIR="/opt/supabase/docker/volumes/functions"

echo "🔧 Deploying System Health Probe + Shared Utils to $SERVER_IP..."

# 1. Create a temporary deployment package locally
rm -rf /tmp/deploy_pkg
mkdir -p /tmp/deploy_pkg/system-health
mkdir -p /tmp/deploy_pkg/_shared

cp -r $LOCAL_FUNC_DIR/* /tmp/deploy_pkg/system-health/
cp -r $LOCAL_SHARED_DIR/* /tmp/deploy_pkg/_shared/

# 2. Tar it up
tar -czf /tmp/deploy_health.tar.gz -C /tmp/deploy_pkg .

# 3. Upload Metadata
echo "📦 Uploading package..."
scp /tmp/deploy_health.tar.gz $SERVER_USER@$SERVER_IP:/tmp/deploy_health.tar.gz

if [ $? -ne 0 ]; then
    echo "❌ SCP Failed"
    exit 1
fi

# 4. Extract on Server
ssh $SERVER_USER@$SERVER_IP "bash -s" << 'EOF'
    set -e
    TARGET_DIR="/opt/supabase/docker/volumes/functions"
    mkdir -p $TARGET_DIR
    
    echo "📂 Extracting to $TARGET_DIR..."
    tar -xzf /tmp/deploy_health.tar.gz -C $TARGET_DIR
    
    # Restart to pick up changes (Deno caches imports)
    docker restart supabase-edge-functions
    echo "✅ Restarted Edge Functions"
    rm /tmp/deploy_health.tar.gz
EOF
