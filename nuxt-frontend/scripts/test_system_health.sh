#!/bin/bash
# scripts/test_system_health.sh

echo "========================================"
echo "🩺  Fantula System Health Probe"
echo "========================================"

# 1. 检查 Docker 容器状态
echo "[1] Checking Docker Containers..."
if docker ps | grep -q "supabase_kong"; then
    echo "✅ Supabase Kong is RUNNING"
else
    echo "❌ Supabase Kong is DOWN"
fi

if docker ps | grep -q "supabase_db"; then
    echo "✅ Supabase DB is RUNNING"
else
    echo "❌ Supabase DB is DOWN"
fi

# 2. 检测端口连通性 (Try 54321 first, then 8000)
echo "[2] Checking Local Ports..."
API_PORT=54321

if curl -s http://127.0.0.1:54321/rest/v1/ > /dev/null; then
    echo "✅ Port 54321 (Local Supabase) is Accessible"
    API_PORT=54321
elif curl -s http://127.0.0.1:8000/rest/v1/ > /dev/null; then
    echo "✅ Port 8000 (Server Supabase/Kong) is Accessible"
    API_PORT=8000
else
    echo "❌ Neither Port 54321 nor 8000 is Accessible"
    echo "   (Connection Refused on both)"
fi

# 3. 检测外部网络
echo "[3] Checking External Internet..."
if ping -c 1 8.8.8.8 > /dev/null 2>&1; then
    echo "✅ External Internet is OK"
else
    echo "❌ External Internet is DOWN"
fi

# 4. 尝试访问 System Health Edge Function (如果 configured)
# 需要 SERVICE_ROLE_KEY
echo "[4] Checking Edge Function..."
# 尝试从 docker container env 拿 key (这是一个 hack)
KEY=$(docker exec supabase-kong printenv SERVICE_ROLE_KEY 2>/dev/null)
if [ -z "$KEY" ]; then
    echo "⚠️  Could not auto-detect SERVICE_ROLE_KEY from Kong container"
else
    # 简单的 health check
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://127.0.0.1:$API_PORT/functions/v1/system-health -H "Authorization: Bearer $KEY")
    echo "🔍 Edge Function Returned Code: $HTTP_CODE"
fi

echo "========================================"
