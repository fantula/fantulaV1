# 后端开发规范

> **版本**: 1.0  
> **创建日期**: 2026-02-03  
> **适用范围**: Supabase 后端（本地 + 云端）

---

## 一、数据库函数规范

### 1.1 安全规范

#### SECURITY DEFINER 函数必须设置 search_path

```sql
-- ✅ 正确
CREATE OR REPLACE FUNCTION public.my_function()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp  -- 必须设置
AS $$
BEGIN
  -- 函数逻辑
END;
$$;

-- ❌ 错误：未设置 search_path
CREATE OR REPLACE FUNCTION public.my_function()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER  -- 缺少 search_path 设置
AS $$
BEGIN
  -- 函数逻辑
END;
$$;
```

#### 函数命名规范

| 前缀 | 用途 | 示例 |
|------|------|------|
| `admin_` | 管理员专用操作 | `admin_review_refund` |
| `trigger_` | 触发器函数 | `trigger_notify_order_created` |
| `create_` | 创建资源 | `create_pre_order` |
| `cancel_` | 取消/撤销操作 | `cancel_pre_order` |
| `release_` | 释放资源 | `release_preorder_resources` |
| `check_` | 检查/验证 | `check_email_available` |
| `get_` | 查询数据 | `get_product_stock` |
| `is_` | 布尔判断 | `is_admin` |

### 1.2 函数文档规范

每个函数必须包含注释说明：

```sql
-- 函数简述
-- @param p_order_id 订单ID
-- @returns 操作结果
-- @security DEFINER (需要管理员权限 / 需要用户登录 / 公开)
CREATE OR REPLACE FUNCTION public.example_function(p_order_id uuid)
...
```

---

## 二、RLS (Row Level Security) 规范

### 2.1 基本原则

1. **所有业务表必须启用 RLS**
2. **启用 RLS 后必须创建至少一个策略**
3. **避免使用无条件的 `USING(true)`**（除非是公开只读表）

### 2.2 策略命名规范

```
{表名}_{角色}_{操作}
```

示例：
- `orders_users_read_own` - 用户读取自己的订单
- `products_public_read` - 公开读取商品
- `admin_users_admin_all` - 管理员完全访问

### 2.3 常用策略模板

#### 用户只能访问自己的数据
```sql
CREATE POLICY "users_read_own" ON public.orders
    FOR SELECT
    USING (auth.uid() = user_id);
```

#### 公开只读
```sql
CREATE POLICY "public_read" ON public.products
    FOR SELECT
    USING (status = 'on');
```

#### 管理员完全访问
```sql
CREATE POLICY "admin_all" ON public.orders
    FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
```

---

## 三、索引规范

### 3.1 必须创建索引的场景

| 场景 | 索引类型 |
|------|----------|
| 外键字段 | 普通索引 |
| 频繁查询的过滤字段 | 普通索引 |
| 唯一性约束字段 | 唯一索引 |
| 复合查询条件 | 复合索引 |

### 3.2 索引命名规范

```
idx_{表名}_{字段名}
```

示例：
- `idx_orders_user_id`
- `idx_orders_status_created_at`

### 3.3 注意事项

- 外键必须有配套索引（否则级联删除时全表扫描）
- 避免过度索引（影响写入性能）
- 定期检查未使用的索引

---

## 四、迁移文件规范

### 4.1 命名规范

```
{YYYYMMDDHHMMSS}_{描述性名称}.sql
```

示例：
- `20260203160000_fix_function_search_path.sql`
- `20260203160100_add_indexes_and_rls.sql`

### 4.2 内容规范

```sql
-- Migration: 简短描述
-- 详细说明这个迁移做了什么

-- 1. 第一部分操作
...

-- 2. 第二部分操作
...

-- [可选] 回滚语句（注释形式）
-- ROLLBACK:
-- DROP INDEX IF EXISTS idx_xxx;
```

### 4.3 禁止事项

- ❌ 在迁移中 DROP 核心业务表
- ❌ 在迁移中 TRUNCATE 业务数据
- ❌ 修改 `⛔ 冻结` 标记的函数逻辑

---

## 五、Edge Functions 规范

### 5.1 部署策略

| 环境 | 说明 |
|------|------|
| **本地开发** | 可以有未部署的函数用于测试 |
| **生产云端** | 只部署实际使用的函数 |

### 5.2 命名规范

```
{领域}-{动作}
```

示例：
- `order-create`
- `wechat-notify`
- `cdk-allocate`

### 5.3 config.toml 配置

```toml
# 需要关闭 JWT 验证的函数（如微信回调）
[functions.wechat-notify]
verify_jwt = false  # 原因注释

# 默认开启 JWT 验证
[functions.order-create]
verify_jwt = true
```

### 5.4 废弃函数处理

已迁移到 Nuxt Server API 的函数：
1. 在文件夹添加 `DEPRECATED.md` 说明
2. 不部署到生产环境
3. 保留代码用于参考

---

## 六、代码检查命令

### 检查 RLS 覆盖
```bash
# 在 Supabase Studio SQL Editor 中运行
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename NOT IN (
    SELECT DISTINCT tablename FROM pg_policies WHERE schemaname = 'public'
);
```

### 检查函数 search_path
```bash
# 查找未设置 search_path 的 SECURITY DEFINER 函数
SELECT proname 
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
AND p.prosecdef = true
AND proconfig IS NULL OR NOT ('search_path=public, pg_temp' = ANY(proconfig));
```

### 检查未索引的外键
```bash
# 使用 Supabase Advisor
# Project Settings > Database > Advisor > Performance
```

---

## 七、相关文档

- [CORE_FREEZE_RULES.md](file:///Users/dalin/fantula/docs/business_rules/CORE_FREEZE_RULES.md) - 核心逻辑冻结规范
- [SUPABASE_CLIENT_RULES.md](file:///Users/dalin/fantula/docs/architecture/SUPABASE_CLIENT_RULES.md) - 客户端使用规范
- [CORE_LOGIC.md](file:///Users/dalin/fantula/docs/business_rules/CORE_LOGIC.md) - 核心业务逻辑
