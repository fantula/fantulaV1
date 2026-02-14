# 系统诊断与监控体系规划 (System Diagnostics & Monitoring Architecture)

> **目标**: 让系统"不再透明"，让错误"无处遁形"。
> **Owner**: 未来项目经理/运维负责人

---

## 🏗 核心理念 (Core Philosophy)

目前的痛点是：**报错模糊 (500/504)** -> **查服务器日志 (SSH)** -> **猜测原因**。
未来的流程是：**报错** -> **后台看"黑匣子"记录** -> **一键运行"探针"** -> **定位组件故障**。

我们不仅仅是修 Bug，而是要建立一套**自我诊断系统**。

---

## 🛠 第一阶段：系统探针 ("The Probe")

**这根"针" (Probe)** 是一个永久运行的 Edge Function，用于探测系统内部所有 vital signs (生命体征)。

### 1. 架构设计
*   **Endpoint**: `POST /functions/v1/system-health`
*   **权限**: 仅限 Admin (Service Role) 调用，防止对外暴露系统细节。

### 2. 探测项目 (Checklist)
这个函数会依次尝试连接以下核心组件，并返回 **Pass/Fail** 及延迟时间：

| 组件 (Component) | 探测方式 (Method) | 故障含义 (Failure Meaning) |
|:---|:---|:---|
| **Kong Gateway** | 内部 fetch `http://kong:8000` | 容器网络不通 / 网关挂了 |
| **Database** | 执行简单 SQL `SELECT 1` | 数据库挂了 / 密码过期 |
| **R2 Storage** | 列出存储桶 `ListBuckets` | R2 凭证失效 / S3 协议配置错误 |
| **External Web** | `curl https://www.google.com` | 服务器外网出口被封 |

### 3. 返回示例
```json
{
  "status": "warning",
  "checks": {
    "gateway": { "status": "ok", "latency": "2ms" },
    "database": { "status": "ok", "latency": "15ms" },
    "r2_storage": { "status": "error", "error": "InvalidAccessKeyId" }
  }
}
```

---

## 🛠 第二阶段：后台诊断面板 (Admin Diagnostics UI)

在后台管理系统 (`/admin/system/health`) 增加一个可视化面板。

### 1. 功能
*   **一键体检**: 点击按钮，调用 `/system-health` 接口。
*   **红绿灯展示**: 
    *   🟢 **数据库**: 正常
    *   🔴 **存储 (R2)**: 异常 (点击查看错误详情: "Invalid Access Key")
*   **环境信息**: 显示当前连接的 Supabase URL、版本号、以及最近一次部署时间。

### 2. 价值
运营人员遇到问题时，先点一下体检。如果是"全绿"，说明是用户网络问题；如果有"红灯"，直接截图给开发，**节省 90% 的沟通成本**。

---

## 🛠 第三阶段：错误"黑匣子" (Error Black Box)

**"不要让我去翻服务器日志。"**

### 1. 方案：`error_logs` 表
在数据库中建立一个专门记录系统级错误的表。

```sql
create table error_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  service text,    -- e.g., 'edge-function', 'nuxt-backend'
  context text,    -- e.g., 'upload-r2'
  level text,      -- 'error', 'warning', 'critical'
  message text,    -- "Connection timed out"
  stack_trace text, 
  user_id uuid     -- 触发错误的用户
);
```

### 2. 捕获机制
*   **Edge Function**: 在 `catch` 块中，除了返回 500 给前端，同时通过 SQL 写入一条记录到 `error_logs`。
*   **Nuxt Backend**: 在全局错误处理器中，将未捕获异常写入 `error_logs`。

### 3. 展示
后台管理系统增加 **"系统日志"** 菜单，按时间倒序显示最近的报错。
*   **优势**: 手机端都能看日志，不需要电脑 SSH。

---

## 📅 实施路线图 (Implementation Roadmap)

1.  **立即执行**: 
    *   开发 `system-health` Edge Function (固化今天的探针代码)。
2.  **短期计划 (本周)**:
    *   在 Admin 后台增加简单的"系统体检"页面，对接该 Function。
3.  **长期规范**:
    *   所有新开发的后端逻辑，必须包含 `try-catch` 并写入 `error_logs` 表。

---

这就是未来的**运维底气**。即使您不在电脑前，通过手机后台点一下，就能知道服务器哪里病了。
