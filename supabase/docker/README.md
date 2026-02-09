# Supabase 自托管部署指南

## 概述

本文档描述如何将云端 Supabase 迁移到国内服务器自托管部署。

## 服务器要求

- **操作系统**: Ubuntu 20.04+ / Debian 11+
- **内存**: 最低 4GB，推荐 8GB+
- **磁盘**: 至少 50GB SSD
- **Docker**: 20.10+
- **Docker Compose**: 2.0+

## 部署步骤

### 1. 准备服务器

```bash
# 更新系统
apt update && apt upgrade -y

# 安装 Docker (如果未安装)
curl -fsSL https://get.docker.com | sh

# 安装 Docker Compose
apt install docker-compose-plugin -y

# 验证安装
docker --version
docker compose version
```

### 2. 部署 Supabase

```bash
# 上传部署脚本到服务器
scp deploy.sh root@180.163.87.70:/opt/

# SSH 到服务器
ssh root@180.163.87.70

# 执行部署脚本
chmod +x /opt/deploy.sh
/opt/deploy.sh
```

### 3. 配置环境变量

编辑 `/opt/supabase/docker/.env` 文件：

```bash
nano /opt/supabase/docker/.env
```

关键配置项：

```env
# 数据库
POSTGRES_PASSWORD=<生成的强密码>

# JWT 密钥 (至少32字符)
JWT_SECRET=<生成的密钥>

# API 密钥 (使用 supabase CLI 或在线工具生成)
ANON_KEY=<匿名访问密钥>
SERVICE_ROLE_KEY=<服务角色密钥>

# 域名配置
SITE_URL=https://fantula.com
API_EXTERNAL_URL=https://api.fantula.com

# SMTP 配置 (可选，用于邮件发送)
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=<SMTP密码>
SMTP_SENDER_NAME=Fantula
```

### 4. 生成 JWT 密钥

使用 Supabase 官方工具生成密钥：
https://supabase.com/docs/guides/self-hosting#generate-api-keys

或使用命令行：

```bash
# 生成 JWT_SECRET (至少32字符)
openssl rand -base64 32

# 使用 supabase CLI 生成 ANON_KEY 和 SERVICE_ROLE_KEY
# 需要使用上面的 JWT_SECRET
```

### 5. 启动服务

```bash
cd /opt/supabase/docker
docker compose up -d

# 检查服务状态
docker compose ps

# 查看日志
docker compose logs -f
```

### 6. 数据迁移

```bash
# 设置环境变量
export CLOUD_DB_PASSWORD='云端数据库密码'
export LOCAL_DB_PASSWORD='本地数据库密码'

# 执行迁移脚本
chmod +x migrate_data.sh
./migrate_data.sh
```

## 更新前端配置

迁移完成后，更新 Nuxt 前端的环境变量：

```env
# .env 或 .env.production
SUPABASE_URL=https://api.fantula.com
SUPABASE_ANON_KEY=<新的ANON_KEY>
```

## 服务端口

默认端口映射：

| 服务 | 端口 | 说明 |
|------|------|------|
| Kong (API Gateway) | 8000 | API 入口 |
| Supabase Studio | 3000 | 管理界面 |
| PostgreSQL | 5432 | 数据库 |
| GoTrue (Auth) | 9999 | 认证服务 |
| Realtime | 4000 | 实时订阅 |
| Storage | 5000 | 文件存储 |

## Nginx 反向代理配置

```nginx
# /etc/nginx/sites-available/supabase
server {
    listen 443 ssl http2;
    server_name api.fantula.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# Studio 管理界面 (可选，建议仅内网访问)
server {
    listen 443 ssl http2;
    server_name studio.fantula.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 备份策略

### 自动备份脚本

```bash
#!/bin/bash
# /opt/supabase/backup.sh

BACKUP_DIR="/opt/supabase/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# 备份数据库
docker compose exec -T db pg_dump -U postgres postgres > $BACKUP_DIR/db_$TIMESTAMP.sql

# 压缩
gzip $BACKUP_DIR/db_$TIMESTAMP.sql

# 保留最近7天的备份
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/db_$TIMESTAMP.sql.gz"
```

### 配置定时任务

```bash
# 每天凌晨2点备份
crontab -e
0 2 * * * /opt/supabase/backup.sh >> /var/log/supabase-backup.log 2>&1
```

## 故障排查

### 常见问题

1. **服务启动失败**
   ```bash
   docker compose logs <service_name>
   ```

2. **数据库连接失败**
   - 检查 POSTGRES_PASSWORD 是否正确
   - 确保端口未被占用

3. **API 返回 401**
   - 检查 JWT_SECRET 是否一致
   - 验证 ANON_KEY 是否正确生成

### 重置服务

```bash
# 停止所有服务
docker compose down

# 清理数据卷 (⚠️ 会删除所有数据)
docker compose down -v

# 重新启动
docker compose up -d
```

## 监控建议

1. 使用 Prometheus + Grafana 监控容器状态
2. 配置日志收集 (如 Loki)
3. 设置告警规则 (CPU、内存、磁盘)
