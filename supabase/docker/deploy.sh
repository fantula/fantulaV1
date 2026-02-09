#!/bin/bash
# =====================================================
# Supabase 自托管部署脚本
# 用于在国内服务器上部署 Supabase
# =====================================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}  Supabase 自托管部署脚本${NC}"
echo -e "${GREEN}======================================${NC}"

# 配置变量
SUPABASE_DIR="/opt/supabase"
DOCKER_COMPOSE_VERSION="2.24.5"

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}请使用 root 用户运行此脚本${NC}"
  exit 1
fi

# 步骤 1: 创建部署目录
echo -e "\n${YELLOW}[1/5] 创建部署目录...${NC}"
mkdir -p $SUPABASE_DIR
cd $SUPABASE_DIR

# 步骤 2: 下载 Supabase Docker 配置
echo -e "\n${YELLOW}[2/5] 下载 Supabase Docker 配置...${NC}"
if [ -d "./docker" ]; then
  echo "Docker 配置已存在，跳过下载"
else
  git clone --depth 1 https://github.com/supabase/supabase.git temp
  mv temp/docker .
  rm -rf temp
fi

cd docker

# 步骤 3: 复制环境变量模板
echo -e "\n${YELLOW}[3/5] 配置环境变量...${NC}"
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo -e "${GREEN}已创建 .env 文件，请编辑配置：${NC}"
  echo "  - POSTGRES_PASSWORD: 数据库密码"
  echo "  - JWT_SECRET: JWT 密钥 (至少32字符)"
  echo "  - ANON_KEY: 匿名访问密钥"
  echo "  - SERVICE_ROLE_KEY: 服务角色密钥"
  echo "  - SITE_URL: 网站 URL"
  echo "  - API_EXTERNAL_URL: API 外部 URL"
else
  echo ".env 文件已存在"
fi

# 步骤 4: 生成密钥（如果需要）
echo -e "\n${YELLOW}[4/5] 生成安全密钥...${NC}"
JWT_SECRET=$(openssl rand -base64 32 | tr -d '\n')
POSTGRES_PASSWORD=$(openssl rand -base64 24 | tr -d '\n')

echo -e "生成的密钥（请保存）："
echo -e "  JWT_SECRET: ${GREEN}$JWT_SECRET${NC}"
echo -e "  POSTGRES_PASSWORD: ${GREEN}$POSTGRES_PASSWORD${NC}"

# 步骤 5: 提示下一步
echo -e "\n${YELLOW}[5/5] 部署准备完成${NC}"
echo -e "${GREEN}======================================${NC}"
echo -e "接下来请执行以下步骤："
echo -e ""
echo -e "1. 编辑 ${SUPABASE_DIR}/docker/.env 文件"
echo -e "   nano ${SUPABASE_DIR}/docker/.env"
echo -e ""
echo -e "2. 设置以下关键配置："
echo -e "   POSTGRES_PASSWORD=$POSTGRES_PASSWORD"
echo -e "   JWT_SECRET=$JWT_SECRET"
echo -e "   SITE_URL=https://your-domain.com"
echo -e "   API_EXTERNAL_URL=https://api.your-domain.com"
echo -e ""
echo -e "3. 启动服务："
echo -e "   cd ${SUPABASE_DIR}/docker"
echo -e "   docker compose up -d"
echo -e ""
echo -e "4. 检查服务状态："
echo -e "   docker compose ps"
echo -e ""
echo -e "${GREEN}======================================${NC}"
