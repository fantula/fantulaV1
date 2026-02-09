#!/bin/bash
# =====================================================
# 数据迁移脚本
# 从云端 Supabase 导出数据并导入到自托管实例
# =====================================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}  Supabase 数据迁移脚本${NC}"
echo -e "${GREEN}======================================${NC}"

# 配置 - 需要手动填写
CLOUD_DB_HOST="db.vjvmzcodbeijnembjiig.supabase.co"
CLOUD_DB_PORT="5432"
CLOUD_DB_NAME="postgres"
CLOUD_DB_USER="postgres"
# CLOUD_DB_PASSWORD 从环境变量读取

LOCAL_DB_HOST="localhost"
LOCAL_DB_PORT="54322"  # 自托管默认端口
LOCAL_DB_NAME="postgres"
LOCAL_DB_USER="postgres"
# LOCAL_DB_PASSWORD 从环境变量读取

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 检查环境变量
if [ -z "$CLOUD_DB_PASSWORD" ]; then
  echo -e "${RED}请设置 CLOUD_DB_PASSWORD 环境变量${NC}"
  echo "export CLOUD_DB_PASSWORD='your-cloud-db-password'"
  exit 1
fi

if [ -z "$LOCAL_DB_PASSWORD" ]; then
  echo -e "${RED}请设置 LOCAL_DB_PASSWORD 环境变量${NC}"
  echo "export LOCAL_DB_PASSWORD='your-local-db-password'"
  exit 1
fi

# 创建备份目录
mkdir -p $BACKUP_DIR

# 步骤 1: 导出云端数据
echo -e "\n${YELLOW}[1/3] 从云端导出数据...${NC}"
PGPASSWORD=$CLOUD_DB_PASSWORD pg_dump \
  -h $CLOUD_DB_HOST \
  -p $CLOUD_DB_PORT \
  -U $CLOUD_DB_USER \
  -d $CLOUD_DB_NAME \
  --schema=public \
  --data-only \
  --exclude-table=supabase_migrations \
  --exclude-table=schema_migrations \
  -f $BACKUP_DIR/data_export_$TIMESTAMP.sql

echo -e "${GREEN}数据已导出到: $BACKUP_DIR/data_export_$TIMESTAMP.sql${NC}"

# 步骤 2: 导出完整 schema (可选)
echo -e "\n${YELLOW}[2/3] 导出 Schema...${NC}"
PGPASSWORD=$CLOUD_DB_PASSWORD pg_dump \
  -h $CLOUD_DB_HOST \
  -p $CLOUD_DB_PORT \
  -U $CLOUD_DB_USER \
  -d $CLOUD_DB_NAME \
  --schema=public \
  --schema-only \
  -f $BACKUP_DIR/schema_export_$TIMESTAMP.sql

echo -e "${GREEN}Schema 已导出到: $BACKUP_DIR/schema_export_$TIMESTAMP.sql${NC}"

# 步骤 3: 导入到本地
echo -e "\n${YELLOW}[3/3] 导入数据到本地...${NC}"
echo -e "${YELLOW}注意: 请确保本地 Supabase 已启动并已应用所有迁移${NC}"
read -p "是否继续导入? (y/n): " confirm

if [ "$confirm" = "y" ]; then
  PGPASSWORD=$LOCAL_DB_PASSWORD psql \
    -h $LOCAL_DB_HOST \
    -p $LOCAL_DB_PORT \
    -U $LOCAL_DB_USER \
    -d $LOCAL_DB_NAME \
    -f $BACKUP_DIR/data_export_$TIMESTAMP.sql
  
  echo -e "${GREEN}数据导入完成!${NC}"
else
  echo -e "${YELLOW}已跳过导入步骤${NC}"
  echo -e "稍后手动导入:"
  echo -e "  PGPASSWORD=\$LOCAL_DB_PASSWORD psql -h $LOCAL_DB_HOST -p $LOCAL_DB_PORT -U $LOCAL_DB_USER -d $LOCAL_DB_NAME -f $BACKUP_DIR/data_export_$TIMESTAMP.sql"
fi

echo -e "\n${GREEN}======================================${NC}"
echo -e "${GREEN}  迁移脚本执行完成${NC}"
echo -e "${GREEN}======================================${NC}"
