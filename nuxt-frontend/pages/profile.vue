<template>
  <div class="profile-page">
    <!-- 顶部导航 -->

    <!-- 个人中心主体内容 -->
    <div class="profile-container">
      <div class="profile-layout">
        <!-- 左侧边栏 (Unified Deep Glass) -->
        <aside class="profile-sidebar">
           <!-- 返回首页悬浮按钮 -->
          <div class="back-home-wrapper" @click="handleBackHome">
            <div class="back-home-btn">
              <el-icon class="arrow-icon-left"><ArrowLeft /></el-icon>
              <span>返回首页</span>
            </div>
          </div>

          <!-- 用户基本信息 -->
          <div class="user-card">
            <!-- 加载状态：骨架屏 -->
            <div v-if="userStore.loading" class="user-avatar-section user-avatar-section--loading">
              <div class="avatar-skeleton-large"></div>
              <div class="user-basic-info">
                <div class="nickname-skeleton"></div>
                <div class="uid-skeleton"></div>
              </div>
            </div>
            <!-- 已加载：真实头像 -->
            <div v-else class="user-avatar-section">
              <img 
                :src="userStore.user?.avatar || '/images/client/pc/avatars/avatar-cat.png'" 
                :alt="userStore.user?.nickname || '用户头像'"
                class="user-avatar-large"
              />
              <div class="user-basic-info">
                <h3 class="user-nickname">{{ userStore.user?.nickname || '用户' }}</h3>
                <p class="user-uid">UID: {{ userStore.user?.uid || userStore.user?.id?.slice(0,8) || '---' }}</p>
              </div>
            </div>
          </div>

          <!-- 菜单列表 - 分组 -->
          <nav class="sidebar-menu">
            <div 
              v-for="group in menuGroups" 
              :key="group.key"
              class="menu-group"
            >
              <div class="menu-group-label">{{ group.label }}</div>
              <div 
                v-for="item in group.items" 
                :key="item.key"
                class="menu-item"
                :class="{ 'active': isMenuItemActive(item) }"
                @click="handleMenuClick(item)"
              >
                <div class="icon-wrapper">
                   <el-icon class="menu-icon">
                      <component :is="item.icon" />
                   </el-icon>
                </div>
                <span class="menu-text">{{ item?.label }}</span>
                <span v-if="item?.badge" class="menu-badge">{{ item.badge }}</span>
              </div>
            </div>
          </nav>

          <!-- 退出登录按钮 (Bottom aligned via margin-top: auto) -->
          <div class="sidebar-footer">
            <button class="logout-btn" @click="handleLogoutClick">
              <el-icon><SwitchButton /></el-icon>
              退出登录
            </button>
          </div>
        </aside>

        <!-- 右侧主内容 (Unified Sheer Glass Frame) -->
        <main class="profile-main">
          <div class="profile-content-frame">
             <!-- 强制刷新：确保每次切换 Tab 都会重新加载页面数据 -->
             <NuxtPage :key="$route.fullPath" />
          </div>
        </main>
      </div>
    </div>

    <!-- 退出确认模态框 -->
    <LogoutModal 
      v-if="showLogoutModal" 
      @close="showLogoutModal = false" 
      @confirm="handleConfirmLogout" 
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authApi } from '@/api/auth'
import LogoutModal from '@/components/LogoutModal.vue'
import { 
  SwitchButton, 
  ArrowLeft, 
  User, 
  Wallet, 
  List, 
  Ticket, 
  Share, 
  Service, 
  Star, 
  Bell 
} from '@element-plus/icons-vue'

// SEO配置
useHead({
  title: '个人中心 - 凡图拉',
  meta: [
    { name: 'description', content: '凡图拉个人中心' }
  ]
})

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// 侧边栏菜单项 - 分组结构
const menuGroups = [
  {
    key: 'core',
    label: '核心功能',
    items: [
      { key: 'profile', label: '个人中心', icon: User, to: '/profile' },
      { key: 'wallet', label: '我的额度', icon: Wallet, to: '/profile/wallet' },
      { key: 'orders', label: '我的订单', icon: List, to: '/profile/orders' },
    ]
  },
  {
    key: 'shop',
    label: '商城服务',
    items: [
      { key: 'exchange', label: '兑换中心', icon: Ticket, to: '/profile/exchange' },
      { key: 'favorites', label: '我的收藏', icon: Star, to: '/profile/favorites' },
    ]
  },
  {
    key: 'more',
    label: '更多',
    items: [
      { key: 'referral', label: '返现推广', icon: Share, to: '/profile/referral' },
      { key: 'tickets', label: '我的工单', icon: Service, to: '/profile/tickets' },
      { key: 'messages', label: '我的消息', icon: Bell, to: '/profile/messages' },
    ]
  }
]

// 手动控制高亮逻辑
const isMenuItemActive = (item: any) => {
    if (item.key === 'profile') {
        return route.path === '/profile'
    } 
    return route.path.startsWith(item.to)
}

const handleMenuClick = (item: any) => {
    // Smart Refresh Logic
    if (route.path === item.to || (item.key === 'profile' && route.path === '/profile')) {
        // Already on page: Force Refresh
        const query = { ...route.query, refresh: Date.now() }
        router.push({ path: item.to, query })
    } else {
        // Normal Navigation
        router.push(item.to)
    }
}

const handleBackHome = () => {
    router.push('/')
}

const showLogoutModal = ref(false)

const handleLogoutClick = () => {
    showLogoutModal.value = true
}

const handleConfirmLogout = async () => {
    showLogoutModal.value = false
    await authApi.logout()
    userStore.logout()
    router.push('/')
}

// 每次进入个人中心，强制刷新一次用户信息
onMounted(() => {
  if (userStore.isLoggedIn) {
    userStore.fetchUserInfo()
  }
})
</script>

<style scoped>
.profile-page {
  height: 100vh; /* Fixed height */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Disable window scroll */
  background: #0F172A; /* Ensure background covers whole screen */
}

/* 顶部导航 (Assuming Header component is used in Layout or App.vue, but here we treat profile-page as root) */

.profile-container {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 20px; /* Reduced padding */
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 80px); /* Subtract header height approx */
  overflow: hidden;
}

.profile-layout {
  display: flex;
  gap: 24px;
  width: 100%;
  height: 100%; /* Fill container */
  max-width: 1200px;
  align-items: stretch;
}

/* --- Left Sidebar: Deep Glass Panel --- */
.profile-sidebar {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  height: 100%; /* Full height */
  overflow-y: auto; /* Allow sidebar scroll if needed */
  
  /* Unified Deep Glass Background */
  background: rgba(15, 23, 42, 0.85); 
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.profile-sidebar::-webkit-scrollbar {
  width: 0; /* Hide sidebar scrollbar */
}

/* Back Button */
.back-home-wrapper {
  margin-bottom: 8px;
  flex-shrink: 0;
}

.back-home-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.05); 
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #94A3B8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-home-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
}

.arrow-icon-left { font-size: 16px; }

/* User Card */
.user-card {
  padding: 10px 0 20px 0;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 8px;
  flex-shrink: 0;
}

.user-avatar-large {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.user-nickname {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.user-uid {
  font-size: 12px;
  color: #64748B;
  font-family: 'Monaco', monospace;
}

/* 个人中心头像骨架屏 */
.user-avatar-section--loading {
  pointer-events: none;
}

.avatar-skeleton-large {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  margin-bottom: 12px;
}

.nickname-skeleton {
  width: 80px;
  height: 16px;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  margin-bottom: 8px;
}

.uid-skeleton {
  width: 60px;
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Sidebar Menu */
.sidebar-menu {
  flex: 1; /* Take remaining space */
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto; /* Scrollable menu if too long */
}

.sidebar-menu::-webkit-scrollbar {
    width: 0;
}

/* Menu Group */
.menu-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-group:not(:last-child) {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.menu-group-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 18px 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px 18px; 
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #94A3B8;
  text-decoration: none !important;
  font-size: 16px;
  font-weight: 500;
  flex-shrink: 0;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #E2E8F0;
  transform: translateX(4px); 
}

/* Active State */
.menu-item.active {
  background: rgba(249, 115, 22, 0.15); 
  color: #FB923C; 
  font-weight: 600;
  box-shadow: none; 
  border-left: 3px solid #F97316; 
  padding-left: 15px; 
}

.menu-item.active .menu-icon {
  color: #FB923C; 
  opacity: 1;
}

.menu-item:hover .menu-icon {
  opacity: 1;
}

.icon-wrapper {
  width: 20px;
  height: 20px;
  margin-right: 14px; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 18px; 
  opacity: 0.6;
  transition: all 0.2s;
  color: inherit; 
}

.sidebar-footer {
  flex-shrink: 0;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center; 
}

.logout-btn {
  width: 100%;
  max-width: 200px; 
  padding: 10px 16px; 
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
  border: 1px solid rgba(239, 68, 68, 0.1);
  border-radius: 100px; 
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  margin: 0 auto;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.3);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

/* --- Right Main Content: Sheer Glass Frame --- */
.profile-main {
  flex: 1;
  min-width: 0;
  display: flex;
  height: 100%; /* Full Height */
  overflow: hidden; /* No scroll on main container */
}

.profile-content-frame {
  width: 100%;
  height: 100%; /* Full Height */
  
  /* Unified Sheer Glass */
  background: rgba(30, 41, 59, 0.3); 
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden; /* Clip internal content */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  
  display: flex;
  flex-direction: column;
  position: relative; /* For absolute children if any */
}

/* 响应式适配 */
@media (max-width: 900px) {
  .profile-page {
    height: auto;
    overflow-y: auto;
  }
  .profile-container {
    height: auto;
    padding: 10px;
  }
  .profile-layout {
    flex-direction: column;
    height: auto;
  }
  
  .profile-sidebar {
    width: 100%;
    height: auto;
  }
  
  .profile-content-frame {
    height: 600px; /* Fallback height for mobile */
    min-height: 600px;
  }
}
</style>