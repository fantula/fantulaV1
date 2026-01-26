# 全局设置与系统配置 (System Configuration)

> **定位**: 定义后台系统的全局配置项、菜单布局及通用业务参数。
> **适用**: 前端开发、系统管理员。

---

## 一、 菜单配置 (Menu Configuration)

后台侧边栏菜单通过代码文件静态配置，非数据库动态生成（以保证稳定性）。

*   **配置文件**: `config/admin-menu.ts`
*   **配置项**: `ADMIN_MENU_ITEMS` Array

### 配置结构
```typescript
interface AdminMenuItem {
    index: string      // 路由路径 (如 /admin/orders)
    title: string      // 显示标题
    icon?: string      // 图标 (Element Plus Icon Name)
    spacing?: boolean  // 是否在上方显示分割线
}
```

**新增菜单步骤**:
1. 修改 `config/admin-menu.ts` 添加配置。
2. 确保 `pages/admin/` 下存在对应的 `.vue` 文件。
3. 在【用户管理 -> 部门管理】中，权限列表会自动识别新路径（可能需手动同步或刷新）。

---

## 二、 布局系统 (Layout System)

后台仅允许使用一种布局：

1.  **文件**: `layouts/mgmt.vue`
2.  **特点**:
    *   左侧固定侧边栏 (Sidebar)
    *   顶部导航栏 (Navbar): 含面包屑、用户头像、暗黑模式切换
    *   内容区 (Content): 包含 `<NuxtPage />`
3.  **使用**:
    ```typescript
    definePageMeta({
      layout: 'mgmt',      // 强制指定
      middleware: ["mgmt-auth"] // 强制鉴权
    })
    ```

---

## 三、 业务字典配置 (Business Config)

所有涉及业务状态的文案、Tag 颜色，统一在 Composable 中管理，禁止硬编码。

*   **文件**: `composables/common/useBizConfig.ts`
*   **使用方式**:
    ```typescript
    const { getOrderStatusLabel, getOrderStatusType } = useBizConfig()
    
    // 模板中
    <el-tag :type="getOrderStatusType(row.status)">
      {{ getOrderStatusLabel(row.status) }}
    </el-tag>
    ```

**维护指南**:
*   新增订单状态时，必须在此文件更新映射表。
*   新增商品类型时，必须在此文件添加定义。

---

## 四、 全局工具库 (Global Utils)

*   **格式化**: `composables/common/useBizFormat.ts`
    *   `formatPrice(val)`: 统一金额显示 (保留2位小数)。
    *   `formatDate(val)`: 统一时间显示 (YYYY-MM-DD HH:mm)。
*   **API 请求**: `utils/supabase-admin.ts`
    *   封装了 `getAdminSupabaseClient`，确保所有请求走 Service Role。

---

## 五、 环境变量 (Environment)

后台系统依赖以下核心变量：
*   `SUPABASE_URL`: 数据库地址
*   `SUPABASE_KEY`: Anon Key (仅用于登录)
*   `SUPABASE_SERVICE_KEY`: Service Role Key (用于数据操作) - **严禁泄露给客户端**

> 生产环境部署时，必须在 Vercel/Netlify 或 Docker 环境变量中正确配置。
