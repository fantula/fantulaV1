#!/bin/bash
SERVER_IP="180.163.87.70"
SERVER_USER="root"
LOCAL_FILE="scripts/deploy_final.ts" 
REMOTE_DEST="/opt/supabase/docker/volumes/functions/upload-r2/index.ts"

echo "🔧 Uploading Final Code to $SERVER_IP..."

scp $LOCAL_FILE $SERVER_USER@$SERVER_IP:/tmp/index.ts.final

if [ $? -ne 0 ]; then
    echo "❌ SCP Failed"
    exit 1
fi

ssh $SERVER_USER@$SERVER_IP "bash -s" << 'EOF'
    set -e
    mv /tmp/index.ts.final /opt/supabase/docker/volumes/functions/upload-r2/index.ts
    docker restart supabase-edge-functions
    echo "✅ Restarted Edge Functions"
EOF
