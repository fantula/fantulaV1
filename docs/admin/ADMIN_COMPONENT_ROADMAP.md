# 后台管理组件标准化路线图

> **版本**: V1.0 | **更新时间**: 2026-02-04
> **目标**: 实现 "改一处，全局生效"

---

## 🎯 最终目标

```
当前状态                          目标状态
┌─────────────────┐              ┌─────────────────┐
│ 页面A: 自定义表格 │              │ 页面A: AdminDataTable │
│ 页面B: 自定义表格 │    ═══>     │ 页面B: AdminDataTable │
│ 页面C: 自定义表格 │              │ 页面C: AdminDataTable │
└─────────────────┘              └─────────────────┘
                                         │
                                         ▼
                                  修改 AdminDataTable
                                  所有页面同步更新
```

---

## 📊 当前组件覆盖率

### 基础组件

| 组件 | 已使用页面 | 未使用页面 | 覆盖率 |
|------|-----------|-----------|--------|
| `AdminDataTable` | 待统计 | 待统计 | - |
| `AdminDataDialog` | 待统计 | 待统计 | - |
| `AdminActionCard` | 待统计 | 待统计 | - |
| `PageTipHeader` | 待统计 | 待统计 | - |

### Composable

| Composable | 已使用页面 | 未使用页面 | 覆盖率 |
|------------|-----------|-----------|--------|
| `useAdminDialog` | 待统计 | 待统计 | - |
| `useAdminList` | 待统计 | 待统计 | - |
| `useBizFormat` | 待统计 | 待统计 | - |
| `useBizConfig` | 待统计 | 待统计 | - |

---

## 📋 执行计划

### Phase 1: 审计 (Week 1)

**任务**: 统计所有后台页面的组件使用情况

```bash
# 需要检查的页面目录
pages/manager_portal/
├── index.vue              # 仪表盘
├── products/              # 商品管理
├── orders/                # 订单管理
├── cdk/                   # CDK 管理
├── coupons/               # 优惠券
├── users/                 # 用户管理
├── help-center/           # 帮助中心
├── media/                 # 媒体中心
├── messages/              # 消息管理
├── tickets/               # 工单管理
├── recharge/              # 充值管理
└── backend-settings/      # 系统设置
```

**输出**: 组件覆盖率报告

### Phase 2: 高优先级替换 (Week 2-3)

**目标**: 将最常用组件的覆盖率提升到 100%

| 优先级 | 组件/Composable | 目标 |
|--------|-----------------|------|
| P0 | `AdminDataTable` | 所有列表页 |
| P0 | `useAdminDialog` | 所有弹窗 |
| P1 | `useBizFormat` | 所有格式化 |
| P1 | `useBizConfig` | 所有状态显示 |

### Phase 3: 样式统一 (Week 4)

**目标**: 建立 CSS 变量系统

```css
/* assets/styles/admin-variables.css */

:root {
  /* 主题色 */
  --admin-primary: #409eff;
  --admin-success: #67c23a;
  --admin-warning: #e6a23c;
  --admin-danger: #f56c6c;
  
  /* 间距 */
  --admin-spacing-xs: 4px;
  --admin-spacing-sm: 8px;
  --admin-spacing-md: 16px;
  --admin-spacing-lg: 24px;
  
  /* 字体 */
  --admin-font-size-sm: 12px;
  --admin-font-size-md: 14px;
  --admin-font-size-lg: 16px;
  
  /* 卡片 */
  --admin-card-radius: 8px;
  --admin-card-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
```

### Phase 4: 原子化组件 (长期)

**目标**: 创建可复用的原子组件

```vue
<!-- 统一按钮 -->
<AdminButton type="primary" action="create" label="新增" />
<AdminButton type="danger" action="delete" @click="handleDelete" />

<!-- 统一状态标签 -->
<AdminStatusTag :status="order.status" type="order" />

<!-- 统一时间显示 -->
<AdminDateTime :value="createdAt" format="datetime" />

<!-- 统一金额显示 -->
<AdminPrice :value="totalAmount" />
```

---

## 🔧 标准化改造步骤

### 替换自定义表格为 AdminDataTable

**改造前**:
```vue
<el-table :data="list" v-loading="loading">
  <el-table-column type="selection" />
  <el-table-column prop="name" label="名称" />
  ...
</el-table>
<el-pagination 
  :total="total" 
  :page-size="pageSize"
  @current-change="handlePageChange"
/>
```

**改造后**:
```vue
<AdminDataTable 
  :data="list" 
  :loading="loading" 
  :total="total"
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  @page-change="loadList"
>
  <el-table-column prop="name" label="名称" />
  ...
</AdminDataTable>
```

### 替换内联弹窗逻辑为 useAdminDialog

**改造前**:
```typescript
const dialogVisible = ref(false)
const dialogLoading = ref(false)
const isEdit = ref(false)
const form = ref({ name: '', status: '' })

const openAdd = () => {
  isEdit.value = false
  form.value = { name: '', status: '' }
  dialogVisible.value = true
}

const openEdit = (row) => {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

const handleSubmit = async () => {
  dialogLoading.value = true
  try {
    if (isEdit.value) {
      await api.update(form.value.id, form.value)
    } else {
      await api.create(form.value)
    }
    dialogVisible.value = false
    loadList()
  } finally {
    dialogLoading.value = false
  }
}
```

**改造后**:
```typescript
import { useAdminDialog } from '@/composables/admin/useAdminDialog'

const dialog = useAdminDialog({ name: '', status: '' }, {
  onSubmit: async (form, isEdit) => {
    return isEdit 
      ? await api.update(form.id, form) 
      : await api.create(form)
  },
  onSuccess: () => loadList()
})

// 使用: dialog.openAdd(), dialog.openEdit(row), dialog.submit()
```

### 替换硬编码状态为 useBizConfig

**改造前**:
```vue
<el-tag v-if="row.status === '待发货'" type="warning">待发货</el-tag>
<el-tag v-else-if="row.status === '服务中'" type="success">服务中</el-tag>
<el-tag v-else>{{ row.status }}</el-tag>
```

**改造后**:
```vue
<el-tag :type="getOrderStatusType(row.status)">
  {{ getOrderStatusLabel(row.status) }}
</el-tag>
```

```typescript
const { getOrderStatusLabel, getOrderStatusType } = useBizConfig()
```

---

## 📈 长期收益

| 收益 | 说明 |
|------|------|
| **一致性** | 所有页面外观和交互一致 |
| **效率** | 修改一处，全局生效 |
| **可维护性** | 改动集中，易于追踪 |
| **质量** | 减少重复代码和Bug |
| **协作** | AI/新人都能快速理解 |

---

## ✅ 验收标准

### Phase 完成标准

- [ ] Phase 1: 审计报告产出，覆盖率数据完整
- [ ] Phase 2: 核心组件覆盖率达到 100%
- [ ] Phase 3: CSS 变量系统建立，所有颜色/间距使用变量
- [ ] Phase 4: 原子组件库完成，新页面可以快速搭建

### 单页验收标准

- [ ] 使用 `AdminDataTable` (列表页)
- [ ] 使用 `AdminDataDialog` (有弹窗的页面)
- [ ] 使用 `useAdminDialog` Composable
- [ ] 使用 `useBizFormat` 格式化
- [ ] 使用 `useBizConfig` 状态配置
- [ ] 无硬编码颜色值
- [ ] 无重复代码块

---

## 📚 相关文档

| 文档 | 说明 |
|------|------|
| [ADMIN_ENGINEERING_STANDARD.md](./ADMIN_ENGINEERING_STANDARD.md) | 组件使用规范 |
| [ADMIN_TEST_OPTIMIZATION_GUIDE.md](./ADMIN_TEST_OPTIMIZATION_GUIDE.md) | 测试优化流程 |
