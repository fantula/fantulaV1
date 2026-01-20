# 客户端开发快速上手

> 5 分钟了解核心开发规范

## 1. 目录结构

```
nuxt-frontend/
├── api/client/          # 客户端 API
├── composables/client/  # 业务逻辑
├── components/modal/    # 弹窗组件
│   └── base/            # 4 种基础模板
└── pages/               # 页面
```

## 2. API 调用

```typescript
// ✅ 正确：使用 client API
import { clientOrderApi } from '@/api/client'
const res = await clientOrderApi.getOrderList()
if (res.success) { /* res.data */ }

// ❌ 错误：直接调用 Supabase
const { data } = await getSupabaseClient().from('orders').select()
```

## 3. 弹窗选择

| 场景 | 使用模板 | 尺寸 |
|------|---------|------|
| 确认/警告 | `BaseConfirmModal` | 400px |
| 表单输入 | `BaseFormModal` | 500px |
| 结果展示 | `BaseResultModal` | 400px |
| 复杂业务 | `BaseBusinessModal` | 600px |

## 4. 新功能开发 5 步走

1. [ ] **API**: `api/client/xxx.ts`
2. [ ] **导出**: `api/client/index.ts` 添加
3. [ ] **Composable**: `composables/client/useXxx.ts`
4. [ ] **弹窗**: 继承 Base 模板
5. [ ] **验证**: `npm run build`

## 5. 全局工具

```typescript
import { useBizFormat } from '@/composables/common/useBizFormat'
import { useBizConfig } from '@/composables/common/useBizConfig'

const { formatPrice, formatDate } = useBizFormat()
const { getOrderStatusLabel } = useBizConfig()
```

---

详细规范见 [CLIENT_DEVELOPMENT_GUIDE.md](./CLIENT_DEVELOPMENT_GUIDE.md)
