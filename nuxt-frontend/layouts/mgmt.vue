<template>
  <div>
    <!-- 登录页：直接渲染，不显示侧边栏 -->
    <slot v-if="isLoginPage" />
    
    <!-- 加载中：显示骨架屏 -->
    <div v-else-if="isLoading" class="admin-loading-screen">
      <div class="loading-content">
        <div class="loading-logo">F</div>
        <p class="loading-text">正在验证身份...</p>
      </div>
    </div>
    
    <!-- 已登录：显示完整布局 -->
    <el-container v-else-if="currentUser" class="admin-layout" :class="{ 'dark-mode': isDark }">
      <el-aside :width="isCollapse ? '64px' : '250px'" class="admin-aside">
        <!-- Logo Area -->
        <div class="logo" :class="{ 'collapsed': isCollapse }">
          <div class="logo-icon">F</div>
          <div class="logo-text" v-show="!isCollapse">
            <h2>FANTULA</h2>
            <span class="logo-sub">ADMINISTRATOR</span>
          </div>
        </div>

        <!-- Menu Scrollbar -->
        <el-scrollbar class="menu-scrollbar">
          <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            unique-opened
            background-color="transparent"
            text-color="var(--el-text-color-regular)"
            active-text-color="var(--el-color-primary)"
          >
            <!-- Standard Menu List (No Drag & Drop) -->
            <template v-for="element in filteredMenuList" :key="element.index">
                <el-sub-menu v-if="element.children && element.children.length > 0" :index="element.index">
                  <template #title>
                    <el-icon><component :is="iconMap[element.icon || 'Menu']" /></el-icon>
                    <span>{{ element.title }}</span>
                  </template>
                  <el-menu-item 
                    v-for="child in element.children" 
                    :key="child.index" 
                    :index="child.index"
                  >
                    <el-icon v-if="child.icon"><component :is="iconMap[child.icon]" /></el-icon>
                    <template #title><span>{{ child.title }}</span></template>
                  </el-menu-item>
                </el-sub-menu>
                
                <el-menu-item v-else :index="element.index" :class="{ 'menu-item-spacing': element.spacing }">
                  <el-icon><component :is="iconMap[element.icon || 'Menu']" /></el-icon>
                  <template #title><span>{{ element.title }}</span></template>
                </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
        
        <!-- Collapse Toggle Button -->
        <div class="sidebar-toggle" @click="toggleCollapse">
          <el-icon v-if="isCollapse"><Expand /></el-icon>
          <el-icon v-else><Fold /></el-icon>
        </div>
      </el-aside>
      
      <el-container class="main-container">
        <el-header class="admin-header">
          <div class="header-content">
            <div class="header-portal-area" v-if="headerStore.title">
               <div class="module-title">{{ headerStore.title }}</div>
               <el-divider direction="vertical" class="header-divider" v-if="headerStore.tabs.length > 0" />
               <el-tabs 
                  v-if="headerStore.tabs.length > 0"
                  v-model="headerStore.activeTab" 
                  class="header-tabs" 
                  @tab-click="handleTabClick"
               >
                  <el-tab-pane 
                    v-for="tab in headerStore.tabs" 
                    :key="tab.name" 
                    :label="tab.label" 
                    :name="tab.name" 
                  />
               </el-tabs>
            </div>
            <div class="header-portal-area" v-else>
               <!-- Placeholder or Breadcrumb could go here -->
            </div>

            <div class="header-right-actions">
              <!-- Dark Mode Toggle -->
              <button class="theme-toggle" @click="toggleDark" :title="isDark ? 'Switch to Light' : 'Switch to Dark'">
                <el-icon v-if="isDark"><Sunny /></el-icon>
                <el-icon v-else><Moon /></el-icon>
              </button>

              <!-- User Dropdown -->
              <div class="user-info" v-if="currentUser">
                <el-dropdown trigger="click">
                  <div class="el-dropdown-link">
                    <el-avatar :size="36" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="user-avatar" />
                    <div class="user-details">
                       <span class="username">{{ currentUser.name }}</span>
                       <span class="user-role">{{ currentUser.email }}</span>
                    </div>
                    <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu class="user-dropdown">
                      <el-dropdown-item>
                        <el-icon><User /></el-icon> 个人中心
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-icon><Setting /></el-icon> 系统设置
                      </el-dropdown-item>
                      <el-dropdown-item divided @click="handleLogout">
                        <el-icon><SwitchButton /></el-icon> 退出登录
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </el-header>
        
        <el-main class="admin-main">
          <div class="main-content-wrapper">
            <slot />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/mgmt.css'
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useAdminStore } from '@/stores/admin/admin';
import { useAdminHeaderStore } from '@/stores/admin/header';
import { 
  Odometer, List, RefreshLeft, Goods, Files, Key, Ticket, User, 
  Service, Money, Picture, PictureFilled, QuestionFilled, ArrowDown,
  Setting, SwitchButton, Message, Fold, Expand, Document, Collection,
  Moon, Sunny, Timer, Monitor, UserFilled, Menu
} from '@element-plus/icons-vue';
// 使用统一菜单配置
import { ADMIN_MENU_ITEMS } from '@/config/admin-menu';
import { adminRoutes } from '@/config/admin-routes';

const route = useRoute();
const router = useRouter();
const adminStore = useAdminStore();
const headerStore = useAdminHeaderStore();

/**
 * 核心：动态菜单高亮逻辑
 * 策略：最长前缀匹配 (Longest Prefix Match)
 * 解决：/manager_portal/orders 错误匹配到 /manager_portal 的问题
 */
const activeMenu = computed(() => {
  const currentPath = route.path.replace(/\/$/, '') // 去除末尾斜杠
  
  // 1. 找出所有可能的匹配项 (当前路径 以 菜单路径 开头)
  const candidates = menuList.value.filter(item => {
    const menuPath = item.index
    // 精确匹配
    if (currentPath === menuPath) return true
    // 前缀匹配 (必须保证是目录级匹配，如 /admin/orders 匹配 /admin/orders/123，但 /admin不应匹配 /admin-settings)
    if (currentPath.startsWith(menuPath + '/')) return true
    
    // 子菜单匹配逻辑 (如有)
    if (item.children) {
        return item.children.some(child => currentPath === child.index || currentPath.startsWith(child.index + '/'))
    }
    return false
  })

  // 2. 如果没有匹配，尝试找子菜单的具体匹配
  // (简版逻辑：假设目前只有一级菜单为主，如果有二级菜单需递归展开)
  // 上面的 filter 只是找出了"包含该路径的父菜单或本身"，还需要具体定位到高亮的 index
  
  // 修正策略：直接遍历所有叶子节点路径，找到最长匹配
  const allLeafPaths: string[] = []
  const traverse = (items: any[]) => {
      items.forEach(item => {
          allLeafPaths.push(item.index)
          if (item.children) traverse(item.children)
      })
  }
  traverse(menuList.value)
  
  // 过滤出所有是当前路径前缀的菜单项
  const validMatches = allLeafPaths.filter(menuPath => {
      if (currentPath === menuPath) return true
      if (currentPath.startsWith(menuPath + '/')) return true
      return false
  })
  
  // 排序：长度倒序 (最长匹配优先)
  validMatches.sort((a, b) => b.length - a.length)
  
  return validMatches[0] || ''
})

const isCollapse = ref(false);
const isLoading = ref(true);
const isDark = ref(false);

// 判断是否在登录页 - 登录页直接渲染，不显示侧边栏
const isLoginPage = computed(() => route.path === adminRoutes.login());

const currentUser = computed(() => adminStore.adminInfo);

// Icon Map for Dynamic Component Loading
const iconMap: Record<string, any> = {
  Odometer, List, RefreshLeft, Goods, Files, Key, Ticket, User,
  Service, Money, Picture, PictureFilled, QuestionFilled, Document,
  Collection, Message, Setting, Timer, Monitor, UserFilled, Menu
};

const menuList = ref([...ADMIN_MENU_ITEMS]);

// 根据用户权限过滤菜单
const filteredMenuList = computed(() => {
  const deptName = adminStore.adminInfo?.department?.name || ''
  const perms = adminStore.permissions || []
  
  // 超级管理员可见全部菜单（部门名称包含"超级"或 permissions 包含 "*"）
  if (deptName.includes('超级') || perms.includes('*')) {
    return menuList.value;
  }
  
  const permissions = adminStore.permissions || [];
  
  // 如果没有权限配置，显示全部（兼容旧数据）
  if (permissions.length === 0) {
    return menuList.value;
  }
  
  // 根据权限过滤菜单
  return menuList.value.filter(item => {
    // 仪表盘始终可见
    if (item.index === adminRoutes.home()) return true;
    // 检查是否有权限访问该菜单
    // 如果有子菜单，检查子菜单权限
    if (item.children && item.children.length > 0) {
        // 只要有一个子菜单有权限，就显示父菜单
        return item.children.some(child => permissions.includes(child.index))
    }
    return permissions.includes(item.index);
  });
});

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
}

// Dark Mode Toggle
const toggleDark = () => {
  isDark.value = !isDark.value;
  applyTheme();
};

const applyTheme = () => {
  const htmlEl = document.documentElement;
  if (isDark.value) {
    htmlEl.classList.add('dark');
    localStorage.setItem('admin-theme', 'dark');
  } else {
    htmlEl.classList.remove('dark');
    localStorage.setItem('admin-theme', 'light');
  }
};

const loadTheme = () => {
    try {
        const savedTheme = localStorage.getItem('admin-theme');
        if (savedTheme === 'dark') {
            isDark.value = true;
            applyTheme();
        }
    } catch(e) { console.warn('Theme load failed', e)}
}

// Handle Header Tab Click
const handleTabClick = (tabInstance: any) => {
  const name = tabInstance.props.name
  // Find target tab to get route
  const targetTab = headerStore.tabs.find(t => t.name === name)
  if (targetTab && targetTab.route) {
    router.push(targetTab.route)
  }
}

// 等待 middleware 完成初始化后关闭 loading
// 注意：身份验证由 admin-auth.global.ts 处理，这里只负责 UI 状态
const waitForAuth = async () => {
  // middleware 可能还在初始化中，等待完成
  if (!adminStore.isInitialized) {
    await adminStore.init();
  }
  isLoading.value = false;
};

const handleLogout = async () => {
  await adminStore.logout();
  ElMessage.success('已退出登录');
  await router.push(adminRoutes.login());
};

onMounted(() => {
  waitForAuth();
  loadTheme();
});
</script>

<style scoped>
/* CSS Variables for Theming */
.admin-layout {
  --admin-bg: #f6f8fb;
  --admin-aside-bg: #ffffff;
  --admin-header-bg: rgba(255,255,255,0.9);
  --admin-text-primary: #303133;
  --admin-text-regular: #606266;
  --admin-text-secondary: #909399;
  --admin-border: rgba(0,0,0,0.03);
  --admin-hover-bg: #f4f6f9;
  --admin-toggle-bg: #fff;
  --admin-logo-text: #2c3e50;
  
  height: 100vh;
  background-color: var(--admin-bg);
  font-family: 'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

/* Dark Mode Overrides - Using local class for stronger specificity */
.admin-layout.dark-mode {
  --admin-bg: #0f172a;
  --admin-aside-bg: #1e293b;
  --admin-header-bg: rgba(30, 41, 59, 0.9);
  --admin-text-primary: #e2e8f0;
  --admin-text-regular: #cbd5e1;
  --admin-text-secondary: #94a3b8;
  --admin-border: rgba(255,255,255,0.05);
  --admin-hover-bg: #334155;
  --admin-toggle-bg: #1e293b;
  --admin-logo-text: #f1f5f9;
}

/* Sidebar Styling */
.admin-aside {
  background: var(--admin-aside-bg);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 16px rgba(0,0,0,0.04);
  z-index: 20;
  position: relative;
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s;
  overflow: hidden;
  border-right: 1px solid var(--admin-border);
}

.logo {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid var(--admin-border);
  transition: all 0.3s;
  white-space: nowrap;
}
.logo.collapsed {
  justify-content: center;
  padding: 0;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #409EFF 0%, #36d1dc 100%);
  border-radius: 8px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(64,158,255,0.3);
}

.logo-text {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition: opacity 0.3s;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--admin-logo-text);
  letter-spacing: 0.5px;
}
.logo-sub {
  font-size: 10px;
  color: var(--admin-text-secondary);
  font-weight: 600;
  letter-spacing: 1.5px;
}

.menu-scrollbar {
  flex: 1;
  padding: 12px 0;
}

.el-menu-vertical {
  border-right: none;
}

/* Menu Item Styling */
.el-menu-item {
  margin: 4px 8px;
  height: 48px;
  line-height: 48px;
  border-radius: 8px;
  color: var(--admin-text-regular);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex !important;
  align-items: center !important;
  padding: 0 12px !important;
}

/* Item Spacing Utility */
.menu-item-spacing {
  margin-top: 24px !important;
  position: relative;
}
.menu-item-spacing::before {
  content: '';
  position: absolute;
  top: -12px;
  left: 12px;
  right: 12px;
  height: 1px;
  background-color: var(--admin-border);
}

/* Icons styling */
.el-icon {
  font-size: 18px !important;
  width: 24px !important;
  height: 24px !important;
  text-align: center;
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-right: 12px;
  transition: margin 0.3s;
}

/* Collapsed State */
.el-menu--collapse .el-menu-item {
  justify-content: center !important;
  padding: 0 !important;
  margin: 4px auto !important;
  width: 48px !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 250px;
}
.el-menu--collapse .el-icon {
  margin-right: 0 !important;
  padding-right: 0px;
  display: flex !important;
}
.el-menu--collapse span {
  display: none;
}

/* Hover & Active States */
.el-menu-item:hover {
  background-color: var(--admin-hover-bg);
  color: #409EFF;
}

.el-menu-item.is-active {
  background: linear-gradient(135deg, #409EFF 0%, #79bbff 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(64,158,255,0.3);
  font-weight: 600;
}

/* Sidebar Toggle */
.sidebar-toggle {
  height: 48px;
  border-top: 1px solid var(--admin-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--admin-text-secondary);
  transition: all 0.3s;
  background: var(--admin-aside-bg);
}
.sidebar-toggle:hover {
  color: #409EFF;
  background: var(--admin-hover-bg);
}

/* Header Styling */
.main-container {
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s;
}

.admin-header {
  height: 72px;
  background: var(--admin-header-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--admin-border);
  display: flex;
  align-items: center;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background-color 0.3s;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-portal-area {
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
}

.module-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--admin-text-primary);
    white-space: nowrap;
    margin-right: 15px;
}

.header-divider {
    height: 24px;
    margin-right: 15px;
    border-color: var(--admin-border);
}

.header-tabs {
    --el-tabs-header-height: 100%;
}
.header-tabs :deep(.el-tabs__nav-wrap::after) { display: none; }
.header-tabs :deep(.el-tabs__header) { margin: 0; border: none; }
.header-tabs :deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 500;
    height: 72px;
    line-height: 72px;
    color: var(--admin-text-regular);
}
.header-tabs :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
    font-weight: 600;
    font-size: 17px;
}
.header-tabs :deep(.el-tabs__active-bar) {
    height: 3px;
    border-radius: 2px;
}

.header-right-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Theme Toggle Button */
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--admin-border);
  background: var(--admin-toggle-bg);
  color: var(--admin-text-regular);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}
.theme-toggle:hover {
  background: var(--admin-hover-bg);
  color: #409EFF;
  transform: rotate(15deg);
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 20px;
  transition: background-color 0.3s;
}
.el-dropdown-link:hover {
  background-color: var(--admin-hover-bg);
}

.user-avatar {
  border: 2px solid var(--admin-aside-bg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.user-details {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
}

.username {
  font-size: 14px;
  font-weight: 600;
  color: var(--admin-text-primary);
}
.user-role {
  font-size: 11px;
  color: var(--admin-text-secondary);
}

/* Main Content Area */
.admin-main {
  padding: 0;
  position: relative;
}

.main-content-wrapper {
  width: 100%;
  padding: 24px;
  background-color: var(--admin-bg);
  min-height: calc(100vh - 72px);
  position: relative;
  box-sizing: border-box;
  transition: background-color 0.3s;
}

/* Loading Screen */
.admin-loading-screen {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #f6f8fb 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.loading-content {
  text-align: center;
}
.loading-logo {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #409EFF 0%, #36d1dc 100%);
  border-radius: 16px;
  color: white;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 24px rgba(64,158,255,0.3);
  animation: pulse 1.5s ease-in-out infinite;
}
.loading-text {
  color: #606266;
  font-size: 14px;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
</style>
