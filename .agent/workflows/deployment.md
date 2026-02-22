---
description: 部署技能脚本 — 从构建到上线，内嵌所有踩坑检查
---

# 🚀 Deployment 技能脚本

> **使用前提**: 已读 `docs/SKILLS_HUB.md`，确认走此路线。
> **执行方式**: 从 Step 0 开始，逐步执行，每步有验证命令。遇 ⛔ 必须停止等待用户确认。

---

## Step 0: 确认部署范围

- [ ] **本次部署包含哪些改动**（逐项确认）：
  - [ ] 前端代码（.vue / .ts）改动 → 走 Step 1-5
  - [ ] 数据库迁移（supabase/migrations/）→ 还需要走 Step 6
  - [ ] Edge Functions（supabase/functions/）→ 还需要走 Step 7
  - [ ] Nginx 配置改动 → 还需要走 Step 8

- [ ] **确认部署模式**：
  - `quick`（代码改动，不重装依赖）→ 按以下步骤手动执行
  - `full`（新增依赖/大版本）→ 额外需要服务器重装依赖（Step 5.3）

---

## Step 1: 清理本地构建缓存（⚠️ 血泪铁律，禁止跳过）

**根因说明**：`nuxt dev` 会在 `.nuxt/` 写入 dev 存根。不清理直接构建，产物可能包含 dev 内容，导致部署后 HTTP 500。

```bash
cd /Users/dalin/fantula/nuxt-frontend
rm -rf .nuxt .output
```

- [ ] **验证清理成功**：
  ```bash
  ls .nuxt 2>/dev/null && echo "❌ 未清理" || echo "✅ 已清理"
  ls .output 2>/dev/null && echo "❌ 未清理" || echo "✅ 已清理"
  ```
  两条都必须输出 `✅ 已清理` 再继续。

---

## Step 2: 本地构建

```bash
cd /Users/dalin/fantula/nuxt-frontend
npm run build
```

- [ ] **等待构建完成**（约 2-5 分钟，3012 模块）
- [ ] **确认无 ERROR**（WARNING 可以有，ERROR 不行）

---

## Step 3: 验证构建产物（⚠️ 必须执行，防止 dev 存根上线）

```bash
# 检查 1：client.precomputed.mjs 大小（正常 ≥ 500KB）
wc -c /Users/dalin/fantula/nuxt-frontend/.output/server/chunks/build/client.precomputed.mjs
```

- [ ] **结果判断**：
  - `≥ 500000 bytes`（约 500KB）→ ✅ 正常，继续
  - `= 23 bytes` 或极小值 → ❌ **dev 存根！** 回到 Step 1 重新清理构建

```bash
# 检查 2：确认 JS 路径是哈希路径，非绝对路径
grep -o 'src="/_nuxt/[^"]*"' /Users/dalin/fantula/nuxt-frontend/.output/server/chunks/routes/renderer.mjs | head -3
```

- [ ] **结果判断**：
  - `src="/_nuxt/Abc123.js"` 形式 → ✅ 正常
  - `src="/_nuxt/Users/dalin/..."` 形式 → ❌ **绝对路径！** 回到 Step 1 重新清理构建

---

## Step 4: 同步前端产物到服务器

```bash
rsync -az --delete \
  /Users/dalin/fantula/nuxt-frontend/.output/ \
  root@180.163.87.70:/opt/fantula/nuxt-frontend/.output/
```

- [ ] **等待同步完成**（取决于网络，约 30s-2min）
- [ ] **确认无 rsync 错误**

---

## Step 5: 重启前端服务

### 5.1 Quick 部署（仅代码改动，不重装依赖）

```bash
ssh root@180.163.87.70 "pm2 reload fantula --update-env"
```

- [ ] **验证重启成功**：
  ```bash
  ssh root@180.163.87.70 "pm2 status | grep fantula"
  ```
  确认状态为 `online`，重启次数增加1。

### 5.2 Full 部署（新增依赖或大版本时额外执行）

```bash
# 同步 package.json 和配置
rsync -az \
  /Users/dalin/fantula/nuxt-frontend/package.json \
  /Users/dalin/fantula/nuxt-frontend/ecosystem.config.js \
  root@180.163.87.70:/opt/fantula/nuxt-frontend/

# 服务器重装依赖并重启
ssh root@180.163.87.70 "cd /opt/fantula/nuxt-frontend && \
  rm -rf node_modules package-lock.json && \
  npm install --registry=https://registry.npmmirror.com && \
  pm2 reload fantula --update-env"
```

---

## Step 6: 验证线上服务

```bash
# HTTP 状态码验证
curl -s -o /dev/null -w "%{http_code}" https://www.fantula.com/manager_portal/login
```

- [ ] **结果判断**：
  - `200` → ✅ 正常
  - `500` → ❌ 查看 PM2 日志：`ssh root@180.163.87.70 "pm2 logs fantula --err --lines 30"`
  - `502` → ❌ PM2 崩溃，查看 `pm2 status`

```bash
# 确认 JS 路径正常（非 dev 绝对路径）
curl -s https://www.fantula.com/manager_portal/login | grep -o 'src="/_nuxt/[^"]*"' | head -3
```

- [ ] **应该看到哈希路径**（如 `src="/_nuxt/DQDHi-Zj.js"`），不应看到 `/Users/dalin/` 路径

---

## Step 7: 部署数据库迁移（如本次包含迁移）

⛔ **数据库操作前必须确认用户知晓，此操作不可逆（某些情况下）**

```bash
# 在服务器上执行迁移
ssh root@180.163.87.70 "cd /opt/supabase/docker && \
  supabase db push --linked"
```

**或者直接执行 SQL**（更安全，可逐条确认）：
```bash
# 将 SQL 文件上传并执行
scp /Users/dalin/fantula/supabase/migrations/[文件名].sql \
  root@180.163.87.70:/tmp/
ssh root@180.163.87.70 "psql \$DATABASE_URL < /tmp/[文件名].sql"
```

- [ ] **执行后验证**：确认迁移中预期的表/列/策略已创建

---

## Step 8: 部署 Edge Functions（如本次包含 Edge Function 修改）

```bash
# 上传 Edge Function 代码
scp /Users/dalin/fantula/supabase/functions/[函数名]/index.ts \
  root@180.163.87.70:/opt/supabase/docker/volumes/functions/[函数名]/index.ts

# 重启 Edge Function 运行时
ssh root@180.163.87.70 "docker restart supabase-edge-functions"
```

- [ ] **等待约 30s 后验证** Edge Function 可正常响应

---

## Step 9: 完成报告

```
## 部署完成报告

- **部署时间**: [时间]
- **部署内容**:
  - 前端: ✅ / ❌
  - 数据库迁移: ✅ / ❌ / 无
  - Edge Functions: ✅ / ❌ / 无
- **线上验证**: HTTP 200 ✅ / JS路径正常 ✅
- **服务状态**: PM2 online ✅
- **用户验证建议**: [建议用户测试哪些功能]
```

---

## 🚨 故障排查快速指南

### 症状：HTTP 500 + `_entrypoints is not iterable`
→ **根因**: `client.precomputed.mjs` 是 dev 存根（23 bytes）
→ **修复**: 回到 Step 1 重新清理构建

### 症状：页面白屏，JS 路径是 `/Users/dalin/...`
→ **根因**: 同上，client.manifest.mjs 包含本地路径
→ **修复**: 回到 Step 1 重新清理构建

### 症状：HTTP 502
→ **根因**: PM2 进程崩溃
→ **排查**: `pm2 logs fantula --err --lines 50`

### 症状：部署后功能异常，之前是好的
→ **排查**: `pm2 logs fantula --lines 100`，看是否有 API 错误
→ **可能原因**: 环境变量未传入（查 ecosystem.config.js）

### 症状：Edge Function 返回 403 SignatureDoesNotMatch
→ **根因**: R2 签名 Regex 错误（`\.\\d{3}` 应为 `\.\d{3}`）
→ **修复**: 检查 `supabase/functions/*/index.ts` 中的 `amzDate` 计算行
→ **详情**: `docs/backend/EDGE_FUNCTIONS.md` §R2 踩坑
