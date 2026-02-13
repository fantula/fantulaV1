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
│   ├── supabase-storage    (文件存储)
│   └── supabase-kong       (API 网关)
│
├── PM2 管理的 Node 进程
│   ├── fantula            (Nuxt3 SSR 前端, port 3000)
│   └── fantula-scheduler  (定时任务进程)
│
└── Nginx (反向代理)
    ├── fantula.com → localhost:3000 (前端)
    └── API 路由 → 对应后端服务
```

---

## 三、部署流程

### 3.1 标准部署（前端代码更新）

```bash
# === 本地执行 ===

# 1. 构建
cd /Users/dalin/fantula/nuxt-frontend
npm run build

# 2. 上传构建产物
rsync -az --delete \
  /Users/dalin/fantula/nuxt-frontend/.output/ \
  root@180.163.87.70:/opt/fantula/nuxt-frontend/.output/

# 3. 重启 PM2
ssh root@180.163.87.70 "cd /opt/fantula/nuxt-frontend && pm2 restart fantula --update-env"

# 4. 验证
ssh root@180.163.87.70 "pm2 status fantula"
```

### 3.2 带数据库变更的部署

> ⚠️ 严禁执行 `supabase db reset`，参考 `/database-migration` 工作流

```bash
# 1. 先在数据库执行 DDL
ssh root@180.163.87.70 "
docker exec supabase-db psql -U supabase_admin -d postgres -c '
  ALTER TABLE xxx ADD COLUMN yyy;
'
"

# 2. 验证变更
ssh root@180.163.87.70 "
docker exec supabase-db psql -U supabase_admin -d postgres -c '
  \d tablename
'
"

# 3. 再部署前端代码（同 3.1）
```

### 3.3 定时器部署（Scheduler）

定时器是独立的 Node.js 进程，代码位于 `scripts/scheduler/`。

```bash
# === 本地执行 ===

# 1. 上传定时器代码（不含 node_modules）
rsync -az --exclude='node_modules' \
  /Users/dalin/fantula/scripts/scheduler/ \
  root@180.163.87.70:/opt/fantula/scripts/scheduler/

# 2. 安装依赖（如 package.json 有变更）
ssh root@180.163.87.70 "cd /opt/fantula/scripts/scheduler && npm install"

# 3. 重启定时器
ssh root@180.163.87.70 "pm2 restart fantula-scheduler --update-env"

# 4. 验证
ssh root@180.163.87.70 "curl -s http://127.0.0.1:3001/status"
```

> ⚠️ 定时器使用自己的 `.env`，不共用 Nuxt 的环境变量。

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

---

## 六、环境变量

### 6.1 服务器 `.env` 文件位置

```
/opt/fantula/nuxt-frontend/.env         # Nuxt 前端
/opt/fantula/scripts/scheduler/.env     # 定时器
```

### 6.2 关键环境变量

| 变量名 | 说明 | 注意事项 |
|--------|------|---------|
| `NUXT_WECHAT_APP_SECRET` | 微信公众号 AppSecret | **必须** `NUXT_` 前缀才能运行时覆盖 |
| `NUXT_SUPABASE_SERVICE_KEY` | Supabase Service Role Key | admin 权限，绝不暴露给前端 |
| `NUXT_WECHAT_PAY_MCH_ID` | 微信支付商户号 | |
| `NUXT_WECHAT_PAY_API_V3_KEY` | 微信支付 V3 密钥 | |
| `NUXT_WECHAT_PAY_PRIVATE_KEY` | 商户证书私钥 | 单行格式，`\n` 替换换行 |
| `NUXT_WECHAT_PAY_SERIAL_NO` | 商户证书序列号 | |
| `NUXT_PUBLIC_SUPABASE_URL` | Supabase API 地址 | public 前缀 = 前端可见 |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名 Key | public 前缀 = 前端可见 |

> ⚠️ **Nuxt 3 运行时覆盖规则**：  
> 构建时 `npm run build` 会把 `nuxt.config.ts` 的 runtimeConfig 默认值打包进 `.output`。  
> 运行时只有 `NUXT_` 前缀的环境变量才能覆盖这些默认值。  
> 修改 `.env` 后必须执行 `pm2 restart fantula --update-env` 才生效。

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
