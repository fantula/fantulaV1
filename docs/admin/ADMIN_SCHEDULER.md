# 定时任务系统 (Scheduler System)

> **定位**: 系统级定时任务调度与清理服务
> **版本**: v2.0 | **最后更新**: 2026-02-03

---

## 一、架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Admin UI)                      │
│   pages/admin/backend-settings/scheduler.vue                │
│   composables/admin/useAdminScheduler.ts                    │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│               Scheduler Service (Node.js)                    │
│                 scripts/scheduler/index.js                   │
│                                                              │
│   ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│   │  frequent │  │   daily   │  │  weekly   │               │
│   │ 每5分钟   │  │ 每日03:00 │  │ 周日05:00 │               │
│   └─────┬─────┘  └─────┬─────┘  └─────┬─────┘               │
│         │              │              │                      │
│         ▼              ▼              ▼                      │
│   ┌─────────────────────────────────────────────┐           │
│   │              Supabase RPC Functions          │           │
│   │    (使用 Service Role 绕过 RLS)              │           │
│   └─────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Tables                         │
│   pre_orders, orders, order_fulfillments,                    │
│   wechat_login_sessions, scheduled_task_logs                │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、任务清单

| 任务 | 说明 | 分组 | 频率 |
|------|------|------|------|
| `cleanup_expired_preorders` | 将过期的待支付预订单改为 deleted，释放锁定资源 | frequent | 每5分钟 |
| `expire_active_orders` | 将已过期的有效订单状态改为 expired | frequent | 每5分钟 |
| `cleanup_unverified_users` | 统计超过24小时未验证邮箱的用户 | daily | 每日03:00 |
| `cleanup_expired_wechat_sessions` | 删除已过期的微信扫码登录会话 | daily | 每日03:00 |
| `cleanup_expired_order_fulfillments` | 删除过期超过7天的订单回执信息 | daily | 每日04:00 |
| `cleanup_old_expired_preorders` | 将超过30天的过期预订单标记为 deleted | weekly | 周日05:00 |

---

## 三、任务分组

### frequent (高频任务)
**执行频率**: 每 5 分钟
**任务列表**:
- `cleanup_expired_preorders`
- `expire_active_orders`

**说明**: 这些任务处理时效性强的数据，需要高频检查以确保资源及时释放。

### daily (每日任务)
**执行频率**: 每日凌晨 3:00
**任务列表**:
- `cleanup_unverified_users`
- `cleanup_expired_wechat_sessions`
- `cleanup_expired_order_fulfillments`

**说明**: 清理过期会话和无效用户数据，低峰期执行避免影响正常业务。

### weekly (每周任务)
**执行频率**: 每周日凌晨 5:00
**任务列表**:
- `cleanup_old_expired_preorders`

**说明**: 清理历史数据，保持数据库整洁。

---

## 四、服务部署

### 4.1 本地运行

```bash
cd scripts/scheduler
npm install
npm start
```

### 4.2 环境变量

创建 `.env` 文件：

```env
SCHEDULER_PORT=3001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4.3 PM2 部署

```bash
pm2 start scripts/scheduler/index.js --name fantula-scheduler
pm2 save
```

---

## 五、API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/status` | 获取定时器运行状态 |
| GET | `/tasks` | 获取任务列表和分组 |
| POST | `/start` | 启动定时器 |
| POST | `/stop` | 停止定时器 |
| POST | `/run/:taskName` | 手动执行指定任务 |
| GET | `/logs?limit=50` | 获取执行日志 |

### 响应示例

**GET /status**
```json
{
  "isRunning": true,
  "lastRun": "2026-02-03T21:00:00.000Z",
  "lastResult": {
    "success": true,
    "expired_count": 5,
    "task_name": "cleanup_expired_preorders"
  },
  "taskGroups": ["frequent", "daily", "weekly"]
}
```

**POST /run/cleanup_expired_preorders**
```json
{
  "success": true,
  "expired_count": 3,
  "error_count": 0,
  "task_name": "cleanup_expired_preorders"
}
```

---

## 六、数据库函数

所有任务通过 PostgreSQL 函数实现，确保原子性和一致性：

| 函数名 | 参数 | 返回值 |
|--------|------|--------|
| `cleanup_expired_preorders()` | 无 | `jsonb` |
| `expire_active_orders()` | 无 | `jsonb` |
| `cleanup_expired_order_fulfillments()` | 无 | `jsonb` |
| `cleanup_unverified_users()` | 无 | `jsonb` |
| `cleanup_old_expired_preorders()` | 无 | `jsonb` |

**迁移文件**: `supabase/migrations/20260203130000_add_scheduler_tasks.sql`

---

## 七、日志表

**表名**: `scheduled_task_logs`

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | uuid | 主键 |
| `task_name` | text | 任务名称 |
| `status` | text | success / error |
| `affected_count` | integer | 处理的数据条数 |
| `error` | text | 错误信息（可选） |
| `executed_at` | timestamptz | 执行时间 |

---

## 八、后台管理界面

**路径**: `/admin/backend-settings/scheduler`

功能：
- 查看服务运行状态
- 启动/停止定时器
- 按分组查看所有任务
- 手动执行任意任务
- 查看执行日志（支持分页）

---

## 九、新增任务指南

### 步骤 1: 创建数据库函数

在 `supabase/migrations/` 下创建迁移文件：

```sql
CREATE OR REPLACE FUNCTION public.your_new_task()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_count INTEGER := 0;
BEGIN
    -- 你的逻辑
    
    -- 记录日志
    INSERT INTO scheduled_task_logs (task_name, status, affected_count)
    VALUES ('your_new_task', 'success', v_count);
    
    RETURN jsonb_build_object(
        'success', true,
        'expired_count', v_count,
        'task_name', 'your_new_task'
    );
END;
$function$;
```

### 步骤 2: 添加到 scheduler 服务

编辑 `scripts/scheduler/index.js`:

```javascript
// 1. 在 tasks 对象中添加
const tasks = {
  // ...existing tasks
  your_new_task: async () => {
    console.log('[任务] 开始执行 your_new_task...')
    const { data, error } = await supabase.rpc('your_new_task')
    // ...handle result
    return data
  }
}

// 2. 在 taskMeta 中添加元信息
const taskMeta = {
  // ...existing meta
  your_new_task: {
    name: '新任务名称',
    description: '任务描述',
    group: 'daily',  // 或 frequent/weekly
    cron: '0 3 * * *'
  }
}

// 3. 在对应的 taskGroups 中添加
const taskGroups = {
  daily: {
    tasks: [..., 'your_new_task']
  }
}
```

### 步骤 3: 更新前端显示名称

编辑 `scheduler.vue`:

```typescript
const taskDisplayNames: Record<string, string> = {
  // ...existing names
  your_new_task: '新任务显示名称'
}
```

---

## 十、注意事项

1. **Service Role Key**: 定时任务服务使用 Service Role Key，可绕过 RLS，请确保密钥安全
2. **时区**: 所有时间基于服务器时区 (通常为 UTC)
3. **并发**: 使用 `FOR UPDATE SKIP LOCKED` 避免并发冲突
4. **日志清理**: 建议定期清理 `scheduled_task_logs` 表中的历史数据
5. **监控**: 建议配置服务监控，确保定时任务服务持续运行
