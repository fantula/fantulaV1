# 🇨🇳 中国区服务器标准化部署规范 (Standard Deployment SOP)

> **核心原则**：本地构建，增量同步，离线安装。
> **适用环境**：公网 Git 访问受限的国内服务器 (如 180.163.87.70)。
> **项目范围**：Nuxt Frontend (Admin/PC/Mobile 三端合一) + Scheduler (定时器)。

---

## 1. 核心部署策略 (The "Push" Strategy)

由于服务器无法稳定连接 GitHub，我们废弃 `git pull` 拉取代码的方式，统一采用 **"Push" 模式**：

1.  **Local Build (本地构建)**：利用本地开发机 (Mac/Windows) 的高性能和网络环境，完成代码编译和打包。
2.  **Sync Artifacts (产物同步)**：使用 `rsync` 将 `.output` (Nuxt) 或 源码 (Scheduler) 同步到服务器。
3.  **Remote Install (远程安装)**：在服务器上使用国内镜像源 (`registry.npmmirror.com`) 安装依赖。
4.  **Restart (重启服务)**：使用 PM2 平滑重启。

---

## 2. 部署场景 (Scenarios)

我们定义两种标准的部署模式，应对不同需求：

### 🅰️ 快速更新 (Quick/Hotfix)
**场景**：修复 Bug、修改文案、调整样式（不涉及 `package.json` 变更）。
**特点**：速度快，不重新安装依赖。
**流程**：
1. 本地 `npm run build`
2. `rsync` 同步 `.output`
3. 远程 `pm2 reload`

### 🅱️ 完整发布 (Full Release)
**场景**：大版本更新、新增依赖、架构调整。
**特点**：稳定，强制清理缓存和依赖。
**流程**：
1. 本地 `npm run build`
2. `rsync` 同步 `.output`
3. 远程清理 `node_modules` (避免平台/版本冲突)
4. 远程 `npm install` (使用镜像源)
5. 远程 `pm2 reload`

---

## 3. 标准化脚本 (Standard Scripts)

为了避免手动操作失误，我们将提供统一的脚本入口：`./deploy.sh`。

### 使用方式
```bash
# 快速更新 (仅代码，不重装依赖)
./deploy.sh prod quick

# 完整发布 (含依赖重装)
./deploy.sh prod full

# 仅更新 Nginx 配置 (不重新构建)
./deploy.sh prod nginx-only
```

### 脚本规范 (`deploy.sh`)
- **环境隔离**：明确区分 `staging` (180.163.87.70) 和 `prod` (待定)。
- **路径规范**：
  - 前端：`/opt/fantula/nuxt-frontend`
  - 定时器：`/opt/fantula/scripts/scheduler`
- **依赖处理**：
  - 自动移除 `package.json` 中的 `darwin`/`win32` 依赖，防止 Linux 报错。
  - 强制使用淘宝镜像源 (`registry.npmmirror.com`)。
  - 自动配置 `sharp` 二进制镜像源。

---

## 4. 目录与权限规范

服务器目录结构必须统一，确保脚本通用性：

```
/opt/fantula/
├── nuxt-frontend/          # 前端主程序
│   ├── .output/            # 构建产物 (由本地同步)
│   ├── ecosystem.config.js # PM2 配置
│   └── .env                # 环境变量 (服务器独有，不覆盖)
│
└── scripts/
    └── scheduler/          # 定时器程序
        ├── package.json
        ├── index.js
        └── .env
```

**权限要求**：
- 部署用户建议为 `root` 或拥有 `/opt/fantula` 写权限的用户。
- 关键文件 (`.env`) 严禁同步覆盖，必须在服务器手动维护。

---

## 5. 环境变量与 NUXT_ 前缀映射 (Critical)

### 问题背景

由于采用"本地构建 + 远程运行"策略，Nuxt 3 的 `npm run build` 会将本地 `.env` 中的值（如 `SUPABASE_URL=http://127.0.0.1:54321`）**烘焙**进 `.output` 产物的 runtimeConfig 默认值中。

服务器上即使有正确的 `.env`，普通环境变量名（如 `SUPABASE_URL`）**无法覆盖**构建时烘焙的 runtimeConfig。Nuxt 3 运行时**只识别 `NUXT_` 前缀**的环境变量来覆盖 runtimeConfig。

### 解决方案：两层防御

**第一层：`ecosystem.config.js` 自动映射**

PM2 配置文件读取服务器 `.env`，自动将原始变量名映射到 `NUXT_` 前缀：

```javascript
env: {
    ...envConfig,                    // 原始变量（SUPABASE_URL 等）
    NUXT_PUBLIC_API_BASE: envConfig.SUPABASE_URL,    // → runtimeConfig.public.apiBase
    NUXT_SUPABASE_KEY: envConfig.SUPABASE_KEY,       // → runtimeConfig.supabaseKey
    NUXT_SUPABASE_SERVICE_KEY: envConfig.SUPABASE_SERVICE_KEY,
    // 微信配置同理...
}
```

**第二层：`server/utils/supabase.ts` process.env 优先**

服务端 Supabase 工具函数直接从 `process.env` 读取配置，优先级：
```
NUXT_PUBLIC_API_BASE > SUPABASE_URL > runtimeConfig.public.apiBase > fallback
```

这确保即使 runtimeConfig 覆盖机制失效，服务端代码仍能读到正确的值。

### 映射对照表

| 服务器 `.env` 变量 | ecosystem.config.js 映射 | 对应 runtimeConfig |
|---|---|---|
| `SUPABASE_URL` | `NUXT_PUBLIC_API_BASE` | `public.apiBase` |
| `SUPABASE_URL` | `NUXT_PUBLIC_SUPABASE_URL` | `public.supabaseUrl` |
| `SUPABASE_KEY` | `NUXT_PUBLIC_SUPABASE_ANON_KEY` | `public.supabaseAnonKey` |
| `SUPABASE_KEY` | `NUXT_SUPABASE_KEY` | `supabaseKey` |
| `SUPABASE_SERVICE_KEY` | `NUXT_SUPABASE_SERVICE_KEY` | `supabaseServiceKey` |
| `WECHAT_PAY_MCHID` | `NUXT_WECHAT_PAY_MCHID` | `wechatPayMchid` |
| `WECHAT_PAY_APPID` | `NUXT_WECHAT_PAY_APPID` | `wechatPayAppid` |
| `WECHAT_APP_SECRET` | `NUXT_WECHAT_APP_SECRET` | `wechatAppSecret` |

### 维护规则

1. **添加新的 runtimeConfig 变量时**，必须同步在 `ecosystem.config.js` 中添加 `NUXT_` 前缀映射
2. **服务器 `.env` 只需维护原始变量名**（如 `SUPABASE_URL`），`NUXT_` 前缀由 `ecosystem.config.js` 自动生成
3. **部署后验证**：`pm2 logs fantula --lines 20 --nostream | grep '\[Supabase\]'` 确认 `Resolved URL` 正确

---

## 6. 数据库变更规范 (Database Migration)

**严禁**在部署脚本中包含数据库变更命令。数据库变更必须先行：

1.  **开发阶段**：生成 SQL 文件 (`supabase/migrations/xxxx.sql`)。
2.  **部署前**：在 Supabase Dashboard 执行 SQL，或使用专门的 Migration 脚本。
3.  **验证**：确认数据库结构变更无误。
4.  **执行部署**：运行 `./deploy.sh` 发布前端代码。

---

## 6. Nginx 配置管理

Nginx 配置通过 `config/nginx-prod.conf` 版本控制，部署时自动同步。

- **配置源**: `config/nginx-prod.conf`（唯一真理源）
- **服务器位置**: `/etc/nginx/sites-available/fantula.conf`
- **修改流程**: 编辑本地文件 → 提交 → `./deploy.sh prod quick` 或 `./deploy.sh prod nginx-only`
- **禁止** 直接在服务器上修改 Nginx 配置

---

## 7. 回滚方案 (Rollback)

部署成功后会自动打 `deploy-YYYYMMDD-HHMMSS` 标签。回滚流程：

1.  `git tag` 查看可用标签。
2.  `git checkout deploy-YYYYMMDD-HHMMSS`（上一个稳定标签）。
3.  `npm run build`。
4.  `./deploy.sh prod full`。

---

此文档作为后续所有部署操作的**唯一真理来源 (SSOT)**。
