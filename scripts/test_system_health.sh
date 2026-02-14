#!/bin/bash

# 1. Get Service Key from REMOTE server (Container Envs)
echo "🔑 Fetching Service Key from server container..."
# Use docker inspect to get the env var directly from the running container
SERVICE_KEY=$(ssh root@180.163.87.70 "docker inspect supabase-edge-functions | grep SUPABASE_SERVICE_ROLE_KEY | cut -d '=' -f2 | tr -d '\", '")

if [ -z "$SERVICE_KEY" ]; then
    echo "❌ Could not find SUPABASE_SERVICE_ROLE_KEY on server .env"
    exit 1
fi

echo "🔍 Probing System Health..."
echo "Endpoint: https://www.fantula.com/functions/v1/system-health"

curl -v -X POST https://www.fantula.com/functions/v1/system-health \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json"

echo -e "\n\nDone."
