# Supabase 客户端使用规范

> **严禁混用！** 后台管理与客户端使用完全独立的认证策略。

## 两套客户端

| 客户端 | 导入路径 | Key 类型 | RLS | 用途 |
|--------|----------|----------|-----|------|
| **客户端** | `@/utils/supabase` | `anon` | ✅ 受限 | 用户只能访问自己的数据 |
| **后台管理** | `@/utils/supabase-admin` | `service_role` | ❌ 绕过 | 管理员可访问所有数据 |

---

## 使用规则

### 客户端页面 (`pages/pc/` 或 `pages/mobile/`)
```typescript
// ✅ 正确
import { getSupabaseClient } from '@/utils/supabase'

// ❌ 禁止
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
```

### 后台管理页面 (`pages/admin/`)
```typescript
// ✅ 正确
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

// ❌ 禁止
import { getSupabaseClient } from '@/utils/supabase'
import { getAdminSupabaseClient } from '@/utils/supabase'  // 这是错的别名！
```

### API 层
```typescript
// 后台 API (api/admin/xxx.ts)
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

// 客户端 API (api/client/xxx.ts)
import { getSupabaseClient } from '@/utils/supabase'
```

---

## 快速检查命令

```bash
# 检查后台页面是否误用客户端 client
grep -r "from '@/utils/supabase'" pages/admin/

# 检查客户端页面是否误用 admin client  
grep -r "supabase-admin" pages/pc/ pages/mobile/
```

---

## 常见错误

| 错误 | 后果 | 修复 |
|------|------|------|
| 后台用 `@/utils/supabase` | 数据查不出来（受 RLS 限制） | 改用 `@/utils/supabase-admin` |
| 客户端用 `supabase-admin` | 用户可访问所有数据（安全漏洞） | 改用 `@/utils/supabase` |

---

## 用户注册触发器

新用户注册时，数据库会自动：
1. 在 `auth.users` 创建认证记录
2. 触发器 `on_auth_user_created` 调用 `handle_new_user()`
3. 自动创建 `profiles` 记录：
   - 生成唯一 8 位 UID（永久不变）
   - 从 OAuth 提供者获取头像和昵称
   - 初始化余额为 0

### 支持的登录方式
| 方式 | 触发器执行 | profiles 创建 |
|------|------------|---------------|
| 邮箱+密码 | ✅ | ✅ |
| 邮箱+验证码 | ✅ | ✅ |
| Google OAuth | ✅ | ✅ |

---

> **开发新功能前，先确认使用哪个客户端！**
