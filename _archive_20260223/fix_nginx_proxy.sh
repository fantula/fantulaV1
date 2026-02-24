#!/bin/bash

SERVER_IP="180.163.87.70"
SERVER_USER="root"
REMOTE_FILE="/etc/nginx/sites-available/default"
BACKUP_FILE="/etc/nginx/sites-available/default.bak.$(date +%s)"
CLOUD_URL="https://vjvmzcodbeijnembjiig.supabase.co/functions/v1/"
CLOUD_HOST="vjvmzcodbeijnembjiig.supabase.co"

echo "🔧 Patching Nginx on $SERVER_IP..."

ssh $SERVER_USER@$SERVER_IP "bash -s" << EOF
    set -e
    
    # 1. Backup
    cp $REMOTE_FILE $BACKUP_FILE
    echo "✅ Backed up config to $BACKUP_FILE"

    # 2. Prepare the new location block content
    # We use a temporary file to construct the new config
    
    # Read the file, verify it has the target block
    if ! grep -q "location /functions/v1/" $REMOTE_FILE; then
        echo "❌ location /functions/v1/ not found in config!"
        exit 1
    fi

    # Use sed to replace the proxy_pass line inside location /functions/v1/
    # This is tricky with sed multiline. 
    # Instead, we will overwrite the specific block logic using a more robust approach if possible.
    # But since we know the structure from 'cat', we can replace the block.
    
    # Simplest approach: Replace the proxy_pass URL and add SSL directives.
    # The existing config has:
    # proxy_pass http://127.0.0.1:8000/functions/v1/;
    
    # We want:
    # proxy_pass https://vjvmzcodbeijnembjiig.supabase.co/functions/v1/;
    # proxy_ssl_server_name on;
    # proxy_set_header Host vjvmzcodbeijnembjiig.supabase.co;
    
    sed -i 's|proxy_pass http://127.0.0.1:8000/functions/v1/;|proxy_pass https://vjvmzcodbeijnembjiig.supabase.co/functions/v1/;\n        proxy_ssl_server_name on;\n        proxy_set_header Host vjvmzcodbeijnembjiig.supabase.co;|' $REMOTE_FILE

    echo "✅ Updated Nginx Config"

    # 3. Test Config
    nginx -t

    # 4. Reload
    systemctl reload nginx
    echo "✅ Nginx Reloaded"
EOF
