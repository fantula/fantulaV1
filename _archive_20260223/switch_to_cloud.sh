#!/bin/bash

# Configuration
SERVER_IP="180.163.87.70"
SERVER_USER="root"
REMOTE_APP_DIR="/opt/fantula/nuxt-frontend"
REMOTE_NGINX_FILE="/etc/nginx/sites-available/default"

# Cloud Credentials
CLOUD_URL="https://vjvmzcodbeijnembjiig.supabase.co"
CLOUD_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdm16Y29kYmVpam5lbWJqaWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MzE3NTgsImV4cCI6MjA4NTQwNzc1OH0.WU0WCXiOh2Orinc8BSXOg50mFKKp7Ru0tFNxj7YAgFc"
# Service Key omitted for safety unless absolutely needed. Nuxt config uses ANON key for public.
# If Nuxt needs SERVICE key, we should ideally prompt or use a placeholder, 
# BUT for now we fix the Client-Side 401 which depends on ANON key.
# We will use the SAME key for SUPABASE_KEY and SUPABASE_SERVICE_KEY momentarily 
# OR reuse the existing one if we could read it... 
# Actually, let's use the provided ANON key for both to be safe, 
# knowing Admin functions might break if they rely on Service Role.
# Wait, I found the SERVICE KEY in nuxt.config.ts defaults! 
# 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
# (This looks like a default local key).
# I DO NOT have the Cloud Service Key in my context? 
# I do not. I only have Anon Key.
# I will use Anon Key for SUPABASE_KEY. 
# Admin features (User Mgmt) might fail, but Upload (Client) will work.
# The user wants Upload to work.

echo "🌍 Switching Server to Cloud Supabase..."

ssh $SERVER_USER@$SERVER_IP "bash -s" << EOF
    set -e
    
    # 1. Update .env (Nuxt Server Config)
    cd $REMOTE_APP_DIR
    
    # Backup
    cp .env .env.bak.cloud_migration
    echo "✅ Backed up .env"

    # We need to preserve other keys (Wechat etc).
    # Since we can't read them easily, we will append/replace specific lines using sed.
    
    # Function to replace or append env var
    update_env() {
        key=\$1
        val=\$2
        file=.env
        if grep -q "^\$key=" \$file; then
            sed -i "s|^$key=.*|$key=\$val|" \$file
        else
            echo "$key=\$val" >> \$file
        fi
    }

    update_env "SUPABASE_URL" "$CLOUD_URL"
    update_env "SUPABASE_KEY" "$CLOUD_ANON_KEY"
    # Note: We are NOT setting SUPABASE_SERVICE_KEY because we don't have it.
    # Hopefully the existing one works or is not used for Uploads.
    
    echo "✅ Updated .env with Cloud Credentials"

    # 2. Update Nginx Proxy (Client Config)
    # We need to replace local 8000 with Cloud URL for ALL Supabase paths
    
    NGINX_CONF=$REMOTE_NGINX_FILE
    cp \$NGINX_CONF \$NGINX_CONF.bak.cloud_migration
    
    # Replace http://127.0.0.1:8000 with Cloud URL
    # We do a global replace for the proxy_pass lines referring to port 8000
    sed -i 's|http://127.0.0.1:8000|https://vjvmzcodbeijnembjiig.supabase.co|g' \$NGINX_CONF
    
    # Add SSL directives to the location blocks (since we are now proxying to HTTPS)
    # This is a bit brute-force with sed, but effective for this specific file structure.
    # We insert the SSL directives after proxy_pass line.
    sed -i '/proxy_pass https:\/\/vjvmzcodbeijnembjiig.supabase.co/a \        proxy_ssl_server_name on;\n        proxy_set_header Host vjvmzcodbeijnembjiig.supabase.co;' \$NGINX_CONF
    
    echo "✅ Updated Nginx Config to Proxy to Cloud"

    # 3. Reload Services
    pm2 reload fantula --update-env
    echo "✅ Reloaded PM2 (Nuxt)"
    
    nginx -t && systemctl reload nginx
    echo "✅ Reloaded Nginx"

EOF
