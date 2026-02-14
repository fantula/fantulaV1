# 服务器部署文档

> 最后更新: 2026-02-13

---

## 一、服务器信息

| 项目 | 值 |
|------|-----|
| 服务器 IP | `180.163.87.70` |
| 操作系统 | Linux (Docker) |
| 前端项目路径 | `/opt/fantula/nuxt-frontend/` |
| 定时器项目路径 | `/opt/fantula/scripts/scheduler/` |
| 数据库 | Supabase (自托管 Docker) |
| 进程管理 | PM2 |
| 域名 | `www.fantula.com` |

---

## 二、项目架构

```
服务器 180.163.87.70
├── Docker 容器集群 (Supabase)
│   ├── supabase-db        (PostgreSQL 数据库)
│   ├── supabase-auth      (GoTrue 认证服务)
│   ├── supabase-rest       (PostgREST API)
│   ├── supabase-storage    (文件存储 - S3/R2 Backend)
│   ├── supabase-edge-functions (Deno Edge Runtime - Self Hosted)
│   └── supabase-kong       (API 网关)
│
├── PM2 管理的 Node 进程
│   ├── fantula            (Nuxt3 SSR 前端, port 3000)
│   └── fantula-scheduler  (定时任务进程)
│
└── Nginx (反向代理)
    ├── fantula.com → localhost:3000 (前端)
    ├── /functions/v1/ → localhost:8000 (Kong -> Edge Functions)
    └── API 路由 → 对应后端服务
```

---

## 三、标准化部署流程 (Standard Deployment)

> **唯一操作入口**：`./scripts/deploy.sh`
> 详情参考：`docs/guides/DEPLOYMENT_STANDARD.md`

### 3.1 常用命令

```bash
# === 场景 A: 快速更新 (Quick Fix) ===
# 仅同步代码，重启服务 (不重装依赖)
./scripts/deploy.sh staging quick

# === 场景 B: 完整发布 (Full Release) ===
# 同步代码 + 清理/重装依赖 (自动使用国内镜像)
./scripts/deploy.sh staging full
```

### 3.2 部署原理
1.  **Local Build**: 本地构建 `.output`。
2.  **Rsync**: 增量同步 (排除 `node_modules` 以节省带宽和保护环境)。
3.  **Remote Install** (Full模式): 服务器端使用国内镜像 (`npmmirror`) 重装 Linux 依赖。
4.  **Restart**: `pm2 reload` 实现零停机重启。

---

## 四、运维与维护 (Maintenance)

详细运维操作请参阅：**[服务器长期维护手册](docs/guides/MAINTENANCE_MANUAL.md)**

涵盖内容：
- 每周健康检查 (Health Check)
- 日志清理 (Log Rotation)
- 灾难恢复 (Disaster Recovery)
- 数据库备份与还原

---

## 四、PM2 管理

### 4.1 常用命令

```bash
# 查看进程状态
pm2 status

# 查看实时日志
pm2 logs fantula --lines 50

# 只看错误日志
pm2 logs fantula --err --lines 30

# 重启（加载新环境变量）
pm2 restart fantula --update-env

# 停止
pm2 stop fantula

# 查看进程详情
pm2 show fantula
```

### 4.2 PM2 配置

PM2 进程由 `ecosystem.config.js` 配置（如存在），或通过命令行启动：

```bash
# 前端启动方式
cd /opt/fantula/nuxt-frontend
pm2 start .output/server/index.mjs --name fantula

# 定时器启动方式
cd /opt/fantula/scripts/scheduler
pm2 start index.js --name fantula-scheduler
```

---

## 五、数据库管理

### 5.1 连接方式

```bash
# SSH 到服务器后
docker exec supabase-db psql -U supabase_admin -d postgres

# 或直接执行 SQL
docker exec supabase-db psql -U supabase_admin -d postgres -c "SQL语句"
```

### 5.2 常用查询

```sql
-- 查看所有用户
SELECT id, email, nickname, balance, wechat_openid FROM profiles;

-- 查看表结构
\d profiles
\d recharge_orders

-- 查看外键关系
SELECT tc.table_name, kcu.column_name, rc.delete_rule
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public';

-- 查看 RPC 函数
SELECT proname, prosrc FROM pg_proc WHERE proname = 'delete_own_account';
```

### 5.3 数据库备份

```bash
# 导出整个数据库
docker exec supabase-db pg_dump -U supabase_admin -d postgres > backup_$(date +%Y%m%d).sql

# 仅导出数据（不含结构）
docker exec supabase-db pg_dump -U supabase_admin -d postgres --data-only > data_backup.sql

# 仅导出结构
docker exec supabase-db pg_dump -U supabase_admin -d postgres --schema-only > schema_backup.sql
```

### 3.3 部署 Edge Functions (Self-Hosted)

> **注意**: 由于网络和依赖问题，目前采用**手动部署**方式，不使用 Supabase CLI 的自动部署。

1.  **准备代码**: 确保 `supabase/functions/upload-r2/index.ts` 包含所有依赖（内联 R2 工具函数）。
2.  **上传代码**:
    ```bash
    scp supabase/functions/upload-r2/index.ts root@180.163.87.70:/opt/supabase/docker/volumes/functions/upload-r2/index.ts
    ```
3.  **重启服务** (加载代码变更):
    ```bash
    ssh root@180.163.87.70 "docker restart supabase-edge-functions"
    ```
4.  **验证**:
    ```bash
    curl -I -X POST https://www.fantula.com/functions/v1/upload-r2
    # 预期返回 401 Unauthorized (鉴权成功) 或 400 Bad Request
    ```

---

## 六、环境变量

### 6.1 服务器 `.env` 文件位置

```
/opt/fantula/nuxt-frontend/.env         # Nuxt 前端
/opt/fantula/scripts/scheduler/.env     # 定时器
/opt/supabase/docker/.env              # Supabase 基础配置
/opt/supabase/docker/docker-compose.yml # Edge Functions 环境变量 (R2)
```

### 6.2 关键环境变量

| 变量名 | 说明 | 位置 |
|--------|------|------|
| `NUXT_WECHAT_APP_SECRET` | 微信公众号 AppSecret | Nuxt .env |
| `NUXT_SUPABASE_SERVICE_KEY` | Supabase Service Role Key | Nuxt .env |
| `R2_ACCOUNT_ID` | Cloudflare R2 账户 ID | docker-compose.yml (functions service) |
| `R2_ACCESS_KEY_ID` | R2 Access Key | docker-compose.yml (functions service) |
| `R2_SECRET_ACCESS_KEY` | R2 Secret Key | docker-compose.yml (functions service) |
| `R2_BUCKET_NAME` | R2 存储桶名称 | docker-compose.yml (functions service) |
| `R2_PUBLIC_BASE_URL` | R2 公网访问域名 | docker-compose.yml (functions service) |

> ⚠️ **Nuxt 3 运行时覆盖规则**：  
> 构建时 `npm run build` 会把 `nuxt.config.ts` 的 runtimeConfig 默认值打包进 `.output`。  
> 运行时只有 `NUXT_` 前缀的环境变量才能覆盖这些默认值。  
> 修改 `.env` 后必须执行 `pm2 restart fantula --update-env` 才生效。

> ⚠️ **Edge Functions 配置规则**：
> R2 变量必须直接注入到 `/opt/supabase/docker/docker-compose.yml` 的 `functions` 服务 `environment` 块中。
> 修改后需执行 `docker restart supabase-edge-functions`。

### 6.3 Scheduler 环境变量

| 变量名 | 说明 | 当前值 |
|--------|------|--------|
| `SUPABASE_URL` | Supabase API 地址 | `http://127.0.0.1:8000` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role Key | *(与 Nuxt 相同的 key)* |
| `SCHEDULER_PORT` | Scheduler HTTP 端口 | `3001` |

> ⚠️ **踩坑记录**：Supabase URL 必须是 `http://127.0.0.1:8000`（Kong 网关端口），  
> 不是 `54321`（那是 Supabase CLI 本地开发的端口）。  
> Service Role Key 必须是实际 JWT Secret 签发的，不是 demo key。

---

## 七、定时器 (Scheduler)

### 7.1 架构

```
scripts/scheduler/
├── index.js         # 入口（Express + node-cron）
├── .env             # 环境变量（Supabase 连接信息）
├── package.json     # 依赖（express, node-cron, @supabase/supabase-js, dotenv）
└── node_modules/
```

### 7.2 任务清单

| 任务名 | 分组 | 频率 | 说明 |
|--------|------|------|------|
| `cleanup_expired_preorders` | frequent | 每 5 分钟 | 清理过期预订单 (pending → deleted)，释放锁定资源 |
| `expire_active_orders` | frequent | 每 5 分钟 | 将已过期的有效订单状态改为 expired |
| `cleanup_unverified_users` | daily | 每日 03:00 | 统计超过24小时未验证邮箱的用户 |
| `cleanup_expired_wechat_sessions` | daily | 每日 03:00 | 删除已过期的微信扫码登录会话 |
| `cleanup_expired_order_fulfillments` | daily | 每日 04:00 | 删除过期超过7天的订单回执信息 |
| `cleanup_old_expired_preorders` | weekly | 周日 05:00 | 将超过30天的 expired 预订单标记为 deleted |

### 7.3 管理 API

```bash
# 查看状态
curl http://127.0.0.1:3001/status

# 查看任务列表
curl http://127.0.0.1:3001/tasks

# 手动执行某个任务
curl -X POST http://127.0.0.1:3001/run/cleanup_expired_preorders

# 启动/停止定时器
curl -X POST http://127.0.0.1:3001/start
curl -X POST http://127.0.0.1:3001/stop

# 查看执行日志
curl http://127.0.0.1:3001/logs
```

### 7.4 依赖的 RPC 函数

以下 PostgreSQL 函数在数据库中，被定时器通过 `supabase.rpc()` 调用：

- `cleanup_expired_preorders()`
- `expire_active_orders()`
- `cleanup_expired_order_fulfillments()`
- `cleanup_unverified_users()`
- `cleanup_old_expired_preorders()`

> `cleanup_expired_wechat_sessions` 直接操作 `wechat_login_sessions` 表，不走 RPC。

### 7.5 排查定时器问题

```bash
# 查看日志
pm2 logs fantula-scheduler --lines 30

# 如果全部报 fetch failed → 检查 .env 的 SUPABASE_URL 和 KEY
cat /opt/fantula/scripts/scheduler/.env

# 手动测试连接
curl -s http://127.0.0.1:8000/rest/v1/profiles?select=email \
  -H 'apikey: <SERVICE_KEY>' \
  -H 'Authorization: Bearer <SERVICE_KEY>'

# 检查执行记录
docker exec supabase-db psql -U supabase_admin -d postgres -c "
  SELECT task_name, status, affected_count, executed_at 
  FROM scheduled_task_logs ORDER BY executed_at DESC LIMIT 10;
"
```

---

## 八、Nginx 配置（如需修改）

```bash
# 查看配置
cat /etc/nginx/sites-available/fantula
# 或
cat /etc/nginx/conf.d/fantula.conf

# 测试配置
nginx -t

# 重载
systemctl reload nginx
```

### 7.1 微信支付回调路径

微信支付回调需要在微信商户平台配置通知 URL：
```
https://www.fantula.com/api/wechat/notify
```

确保 Nginx 正确代理此路径到 Nuxt 后端（port 3000）。

---

## 九、故障排查

### 8.1 前端白屏/502

```bash
# 检查 PM2 进程是否存活
pm2 status

# 如果挂了，查看错误
pm2 logs fantula --err --lines 50

# 重启
pm2 restart fantula --update-env
```

### 8.2 Supabase 服务异常

```bash
# 检查容器状态
docker ps | grep supabase

# 重启所有 Supabase 容器
cd /opt/supabase  # 或实际 docker-compose 路径
docker compose restart

# 查看数据库日志
docker logs supabase-db --tail 50
```

### 8.3 微信相关错误

参考 `docs/WECHAT_LOGIN_AND_PAY.md` 第七章"排错指南"。

---

## 十、安全注意事项

1. **Service Role Key** 只能在服务端使用，绝不暴露给前端
2. **微信 AppSecret** 和 **支付私钥** 属于最高敏感信息
3. 所有 `.env` 文件不应提交到 Git
4. 数据库操作必须使用 RLS 或 Service Role Client 配合权限控制
5. **绝对禁止** `supabase db reset`（参考 `.agent/workflows/database-migration.md`）
