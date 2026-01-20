# 后端开发与扩展指南 (Backend Workflow)

由于本项目采用 **Supabase (BaaS)** 架构，后端开发流程与传统 Web 框架（如 NestJS/Spring）有显著差异。
为了确保多人协作时的数据库一致性、安全性及代码质量，**所有后端变更（改表、写函数、改权限）必须严格遵循以下流程**（特别是“抽奖”等新功能开发时）。

## 1. 核心铁律 (The 3 Golden Rules)

1.  **禁止手动修改生产环境**: 严禁直接在 Supabase Dashboard 生产环境项目手动“添加列”或“修改策略”。必须通过本地 Migration 上线。
2.  **类型即真理**: 数据库变更后，**必须** 立即重新生成 TypeScript 类型。前端代码不得手动定义数据库 Interface。
3.  **RLS 默认关闭**: 新建表时，默认情况下它是“公开读写”或“不可访问”的。**必须** 显式开启 RLS (Row Level Security) 并编写策略。

---

## 2. 数据库变更流程 (Database Migration Workflow)

当需要新增一张表（例如 `lotteries`）或修改字段时：

### Step 1: 本地变更
确保由于本地 Supabase 环境运行中。
```bash
npx supabase status
```

### Step 2: 生成迁移文件
使用 CLI 生成一个新的 SQL 迁移文件。
```bash
npx supabase migration new create_lotteries_table
# 此时会在 supabase/migrations/ 下生成一个时间戳 SQL 文件
```

### Step 3: 编写 SQL
编辑生成的 SQL 文件。必须遵循 SQL 书写规范：
```sql
-- 1. 建表
create table public.lotteries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'pending', -- snake_case
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. 开启 RLS (必须!)
alter table public.lotteries enable row level security;

-- 3. 添加注释 (推荐)
comment on table public.lotteries is '抽奖活动主表';
```

### Step 4: 应用并生成类型 (关键!)
应用迁移到本地数据库，并立即更新前端类型。
```bash
# 应用迁移
npx supabase db reset 

# 生成类型 (需要在 package.json 配置脚本)
npm run gen-types
```
> **注意**: 请在 `package.json` 中配置 `"gen-types": "npx supabase gen types typescript --local > types/supabase.ts"`

---

## 3. 安全发布清单 (Security Checklist)

新功能上线前，**必须** 对照此清单逐项打勾：

- [ ] **RLS Enabled**: 表是否执行了 `alter table ... enable row level security`?
- [ ] **Policy Coverage**:
    - [ ] `SELECT`: 谁能看？(所有用户? 仅自己? 仅管理员?)
    - [ ] `INSERT`: 谁能增？(通常仅管理员或后端 Function)
    - [ ] `UPDATE`: 谁能改？(禁止开放全字段更新，建议封装为 RPC)
    - [ ] `DELETE`: 谁能删？
- [ ] **Index Analysis**: 外键字段 (`user_id`, `product_id`) 是否添加了索引？
- [ ] **Type Sync**: 前端 `types/supabase.ts` 是否已更新到最新？

---

## 4. Edge Function 开发规范

对于复杂的后端逻辑（如“抽奖结算”、“发送邮件”），应使用 Edge Functions，而不是前端直接操作数据库。

### 4.1 目录结构
```text
supabase/functions/
├── _shared/           # 共享代码 (CORS, 错误处理, 鉴权)
├── admin-lottery-draw/ # 目录名即函数名 (kebab-case)
│   └── index.ts       # 入口文件
└── order-create/
```

### 4.2 命名规范
*   **管理员操作**: 以 `admin-` 开头 (如 `admin-user-ban`)，便于在网关层做统一拦截。
*   **公共服务**: 动词+名词 (如 `send-email`)。

### 4.3 标准模板
每个 Function **必须** 处理 OPTIONS 请求（CORS）并使用标准响应格式。

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // 1. 处理 CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. 检查 Auth (如需)
    // const authHeader = req.headers.get('Authorization') ...

    // 3. 业务逻辑
    const { name } = await req.json()
    
    // 4. 标准成功响应
    return new Response(
      JSON.stringify({ success: true, data: { result: 'ok' } }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    // 5. 标准错误响应
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 },
    )
  }
})
```

---

## 5. 前后端对接流程

1.  **后端**: 编写 Migration SQL -> `db reset` -> 编写 RLS -> Edge Function。
2.  **同步**: 运行 `npm run gen-types` 更新类型定义。
3.  **前端**: 
    - 引入新类型 `Database['public']['Tables']['lotteries']['Row']`。
    - 在 `api/admin/` 下新建对应模块 `api/admin/lottery.ts`。
    - 开发 UI。

---

此文档旨在消除“后端黑盒”，让任何接手项目的开发者都能安全、规范地扩展新功能。
