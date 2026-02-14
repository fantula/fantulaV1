# 运维与故障排查手册 (Maintenance & Troubleshooting)

> **"系统坏了怎么办？"**
> 本手册汇总了 Fantula 项目最常见的故障场景、排查流程和避坑指南。

---

## 🚨 常见故障排查 (Troubleshooting)

### 场景 1: API 返回 504 Gateway Timeout
**现象**: 前端请求 `/functions/v1/xxx` 超过 10 秒无响应，最后报 504。
**原因**: Edge Function 内部逻辑挂起（通常是数据库连接连不上，或者 R2 上传卡住）。
**排查步骤**:

#### 🚀 第一步: 使用"系统探针" (The System Probe)

**方法 A: 后台可视化 (推荐)**
1. 进入后台管理系统 -> **系统设置** (`/admin/backend-settings`)。
2. 查看 "服务连通性检测" 面板。
3.这里会显示：
    *   **Database**: 连接状态 + 延迟 (e.g., "Connected (30ms)")
    *   **R2 Storage**: 凭证状态 + 延迟
    *   **Gateway Network**: 内网容器与网关的连通性
    *   **Server Internet**: 服务器外网出口连通性 (访问 Baidu)

**方法 B: 命令脚本 (如果不通网)**
这是我们开发的一键诊断工具 (2026-02-15 新增)。

**在服务器上执行**:
```bash
# 不需要复杂的 curl 命令，直接运行这个脚本 (自动提取 Key)
sh /opt/fantula/scripts/test_system_health.sh
```
*(注意：如果没有这个脚本，请参考 `scripts/test_system_health.sh` 本地文件创建)*

**或者手动执行**:
```bash
export $(cat /opt/supabase/docker/.env | grep SERVICE_ROLE_KEY | xargs)
curl -X POST http://127.0.0.1:8000/functions/v1/system-health \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY"
```

**解读结果**:
*   `"database": { "status": "error" }` -> 数据库挂了或密码过期。
*   `"internal_network": { "status": "error" }` -> Docker 内部网络不通 (Kong 无法连接)。
*   `"r2_connectivity": { "status": "error" }` -> R2 凭证错误或被墙。
*   `"external_internet": { "status": "error" }` -> 服务器无法访问外网 (DNS 或防火墙)。

如果探针全是 **ok**，但业务接口还是 504，那说明是**业务逻辑代码**写了死循环或极其低效的 SQL。

#### 第二步: 检查日志 (如果探针挂了)
```bash
ssh root@180.163.87.70 "docker logs --tail 100 supabase-edge-functions"
```

### 场景 2: API 返回 500 Internal Server Error
**现象**: 请求立即返回 500。
**原因**: 代码抛出未捕获异常，或者 Nginx 代理到了错误的端口。
**排查步骤**:
1.  **检查 Nginx 路由**:
    ```bash
    cat /etc/nginx/sites-enabled/default
    ```
    确保 `/functions/v1/` 代理到 `http://127.0.0.1:8000/` (本地 Kong)，而不是其他地址。
2.  **查看 Function 日志**: 寻找 `Uncaught Error` 或 `Panic`。

### 场景 3: 401 Unauthorized (但在 Cloud 上能用)
**现象**: 本地开发环境正常，部署到服务器后报 401。
**原因**: **分裂脑 (Split Brain)**。服务器上的 Edge Function 连接的是 Local Supabase (如果你用的是本地)，但前端 Token 是 Cloud Supabase 签发的（或者反之）。
**解决方案**:
*   确保 `NUXT_PUBLIC_SUPABASE_URL` 与 Edge Function 内部的 `SUPABASE_URL` 指向同一个实例。
*   **当前架构**: 全套自托管。前端指向 `www.fantula.com`，Edge Function 指向 `http://kong:8000` (即本机)。

---

## 💣 避坑指南 (Common Pitfalls)

### 1. 也是最重要的：不要手动改配置！
*   ❌ **错误做法**: SSH 连上去，用 `vim` 修改 `/opt/supabase/docker/docker-compose.yml`。
*   ✅ **正确做法**: 在本地修改 `docker-compose.yml.remote`，然后使用部署脚本上传。
*   **后果**: 手动修改的配置一旦重启或被覆盖，修复就需要几个小时（正如 2026-02-15 发生的那样）。

### 2. 不要使用 `supabase db reset`
*   ❌ **错误做法**: 在生产环境连接的 CLI 中运行 `supabase db reset`。
*   ✅ **正确做法**: 使用 `supabase db push` 或 SQL 迁移脚本。
*   **后果**: **数据全丢！** 生产环境禁止 Reset。

### 3. R2 凭证不在 `.env` 里
*   **说明**: Supabase 的 Edge Function 容器无法直接读取 `.env` 文件中的自定义变量（如 `R2_` 开头）。
*   ✅ **正确做法**: 必须显式写在 `docker-compose.yml` 的 `environment:` 块中。

---

## 🛡 维护操作 (Maintenance Ops)

### 备份数据库
```bash
docker exec supabase-db pg_dump -U supabase_admin -d postgres > /backup/db_$(date +%F).sql
```

### 重启 Edge Functions
修改代码或配置后：
```bash
cd /opt/supabase/docker
docker compose restart functions
# 或者强行重建
docker compose up -d --force-recreate functions
```

### 查看系统负载
```bash
# 查看 Docker 容器资源占用
docker stats --no-stream
```

## 9. 变更管理 (Change Management)
**CRITICAL**: 本项目已锁定为 **Golden Version** (稳定版)。
任何修改请严格遵守 [CHANGE_MANAGEMENT.md](file:///Users/dalin/fantula/docs/CHANGE_MANAGEMENT.md)。

- **原则**: 本地开发 -> 本地测试 -> 标准发布。
- **禁止**: 直接修改服务器文件。
- **禁止**: 未经测试直接发布。
