# 服务器部署文档

> 最后更新: 2026-02-11

---

## 一、服务器信息

| 项目 | 值 |
|------|-----|
| 服务器 IP | `180.163.87.70` |
| 操作系统 | Linux (Docker) |
| 前端项目路径 | `/opt/fantula/nuxt-frontend/` |
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
# 启动方式
cd /opt/fantula/nuxt-frontend
pm2 start .output/server/index.mjs --name fantula
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
/opt/fantula/nuxt-frontend/.env
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

---

## 七、Nginx 配置（如需修改）

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

## 八、故障排查

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

## 九、安全注意事项

1. **Service Role Key** 只能在服务端使用，绝不暴露给前端
2. **微信 AppSecret** 和 **支付私钥** 属于最高敏感信息
3. 所有 `.env` 文件不应提交到 Git
4. 数据库操作必须使用 RLS 或 Service Role Client 配合权限控制
5. **绝对禁止** `supabase db reset`（参考 `.agent/workflows/database-migration.md`）
