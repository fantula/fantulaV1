# 前端工程分层架构规范 (Frontend Structure Rules)

> **核心原则**：一套代码，三端隔离。严禁跨端引用，严禁逻辑混淆。

---

## 1️⃣ 后台管理端 (Admin Dashboard)
**定位**：内部运营管理系统
- **页面 (Pages)**: `/pages/admin`  
  *(所有后台页面必须放在此目录下)*
- **组件 (Components)**: `/components/admin`  
  *(专属业务组件，如下拉菜单、数据表格)*
- **布局 (Layout)**: `/layouts/mgmt.vue`
- **样式 (Styles)**: `/assets/styles/mgmt.css`
- **接口 (API)**: `/api/admin`  
  *(管理端专属接口)*
- **鉴权 (Auth)**: `/middleware/admin-auth.global.ts`

**❌ 禁令**：
- 严禁引用 `components/pc` 或 `components/mobile`。
- 严禁使用客户端的 `userStore` (应使用 `adminStore`)。

---

## 2️⃣ PC 客户端 (PC Client)
**定位**：桌面浏览器用户商城
- **页面 (Pages)**: `/pages/pc`  
  *(原 `client` 目录已更名为 `pc`，所有 PC 页面在此)*
- **组件 (Components)**: `/components/pc`  
  *(PC 端 UI 组件，如 Header, Footer, Hero)*
- **布局 (Layout)**: `/layouts/pc.vue`
- **样式 (Styles)**: `/assets/styles/pc.css` & `/assets/styles/theme-*.css`
- **接口 (API)**: `/api/client`  
  *(客户端通用接口，PC/Mobile 共用)*

**❌ 禁令**：
- 严禁混入移动端组件。
- 严禁直接调用 `/api/admin`。

---

## 3️⃣ 移动端 (Mobile Client)
**定位**：手机浏览器/H5 商城
- **页面 (Pages)**: `/pages/mobile`
- **组件 (Components)**: `/components/mobile`  
  *(移动端专属组件，如下巴导航、触屏事件)*
- **布局 (Layout)**: `/layouts/mobile.vue`
- **样式 (Styles)**: `/assets/styles/mobile.css`
- **接口 (API)**: `/api/client`  
  *(与 PC 共用逻辑)*

**❌ 禁令**：
- 严禁引用 Element Plus (移动端应轻量化，或使用 Vant 等，目前保持原生或轻量)。
- 严禁使用 PC 端的大屏布局组件。

---

## 4️⃣ 通用资源 (Shared Resources)
**定位**：跨端复用的逻辑与组件
- **通用组件**: `/components/shared`  
  *(仅限无业务逻辑的基础 UI，如 Loading, Empty, Icons)*
- **业务逻辑**: `/composables` & `/stores`  
  *(状态管理分模块：`user`, `cart`, `order`，逻辑层不区分 UI)*
- **工具库**: `/utils`

---

## ✅ 开发新功能流程 (Development Workflow)

**场景：我要开发一个新的“积分商城”页面**

1. **是给谁用的？**
   - **管理员配置积分商品** → 进入 **后台端**
   - **PC 用户兑换** → 进入 **PC 端**
   - **手机用户兑换** → 进入 **移动端**

2. **文件落位指南**：

| 文件类型 | 后台管理 (Admin) | PC 客户端 (PC) | 移动端 (Mobile) |
| :--- | :--- | :--- | :--- |
| **页面** | `pages/admin/points/index.vue` | `pages/pc/points/index.vue` | `pages/mobile/points/index.vue` |
| **组件** | `components/admin/points/EditModal.vue` | `components/pc/points/GiftCard.vue` | `components/mobile/points/GiftRow.vue` |
| **API** | `api/admin/points.ts` | `api/client/points.ts` | `api/client/points.ts` (同 PC) |
| **路由** | 自动生成 `/admin/points` | 自动生成 `/points` (需配置) | 自动生成 `/mobile/points` |

**⚠️ 最终检查**：
- 新页面是否指定了正确的 Layout (`definePageMeta({ layout: 'xxx' })`)？
- 新组件是否放错了文件夹？
