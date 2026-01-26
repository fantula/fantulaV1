<template>
  <div class="profile-page">
    <!-- 顶部导航 -->

    <!-- 个人中心主体内容 -->
    <div class="profile-container">
      
      <!-- Simple Welcome Title -->
      <h1 class="simple-welcome-text">欢迎回来</h1>

      <div class="profile-layout">
        <!-- 左侧边栏 (Unified Deep Glass) -->
        <aside class="profile-sidebar">
          <!-- Sidebar Header: Back + User Identity -->
          <div class="sidebar-header">
            <!-- Back Button -->
            <div class="back-home-btn" @click="handleBackHome">
              <el-icon class="arrow-icon-left"><ArrowLeft /></el-icon>
              <span>返回首页</span>
            </div>

            <!-- User Hero Card -->
            <div class="user-hero-card">
              <!-- Loading Skeleton -->
              <div v-if="userStore.loading" class="user-hero-loading">
                <div class="avatar-skeleton"></div>
                <div class="info-skeleton">
                   <div class="line-1"></div>
                   <div class="line-2"></div>
                </div>
              </div>
              
              <!-- Real User Info -->
              <div v-else class="user-hero-content">
                <div class="avatar-wrapper">
                  <img 
                    :src="userStore.user?.avatar || '/images/client/pc/avatars/avatar-cat.png'" 
                    class="user-avatar"
                  />
                  <div class="status-dot"></div>
                </div>
                <div class="user-info">
                  <h3 class="user-nickname">{{ userStore.user?.nickname || 'FANTULA User' }}</h3>
                  <div class="user-id-badge">
                    <span>UID: {{ userStore.user?.uid || '---' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Menu -->
          <nav class="sidebar-menu">
            <div 
              v-for="group in menuGroups" 
              :key="group.key"
              class="menu-group"
            >
              <div v-if="group.label" class="menu-group-label">{{ group.label }}</div>
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
                <!-- Subtle Unread Indicator -->
                <div v-if="item.key === 'messages' && userStore.unreadMessageCount > 0" class="unread-indicator"></div>
                <!-- Active Indicator Glow (Visual Only) -->
                <div v-if="isMenuItemActive(item)" class="active-glow"></div>
              </div>
            </div>
          </nav>

          <!-- Footer Actions -->
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
             <!-- Phantom Watermark (Inside Frame) -->
             <div class="phantom-ambassador"></div>
             
             <!-- 强制刷新：确保每次切换 Tab 都会重新加载页面数据 -->
             <div class="page-content-wrapper">
                <NuxtPage :key="$route.fullPath" />
             </div>
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
definePageMeta({
  layout: 'pc'
})

import { useUserStore } from '@/stores/client/user'
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authApi } from '@/api/client/auth'
import LogoutModal from '@/components/pc/modal/LogoutModal.vue'
import { 
  SwitchButton, 
  ArrowLeft, 
  User, 
  Wallet, 
  List, 
  Ticket, 
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

// Define Interfaces for stronger typing
interface MenuItem {
  key: string
  label: string
  icon: any
  to: string
}

interface MenuGroup {
  key: string
  label: string
  items: MenuItem[]
}

// 侧边栏菜单项 - 扁平化
const menuGroups: MenuGroup[] = [
  {
    key: 'main',
    label: '', //留空不显示标题
    items: [
      { key: 'profile', label: '个人中心', icon: User, to: '/profile' },
      { key: 'wallet', label: '我的额度', icon: Wallet, to: '/profile/wallet' },
      { key: 'orders', label: '我的订单', icon: List, to: '/profile/order' },
      { key: 'exchange', label: '兑换中心', icon: Ticket, to: '/profile/exchange' },
      { key: 'favorites', label: '我的收藏', icon: Star, to: '/profile/favorites' },
      { key: 'tickets', label: '我的工单', icon: Service, to: '/profile/tickets' },
      { key: 'messages', label: '我的消息', icon: Bell, to: '/profile/messages' },
    ]
  }
]

// 手动控制高亮逻辑
const isMenuItemActive = (item: MenuItem) => {
    const path = route.path
    
    // 1. 个人中心首页 (精确匹配)
    if (item.key === 'profile') {
        return path === '/profile'
    } 
    
    // 2. 订单特殊处理: 订单列表(/profile/order) 和 订单详情(/profile/order/xxx)
    if (item.key === 'orders') {
        return path.startsWith('/profile/order')
    }

    // 3. 其他默认前缀匹配
    return path.startsWith(item.to)
}

const handleMenuClick = (item: MenuItem) => {
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

// 登录守卫与初始化
onMounted(() => {
  if (!userStore.isLoggedIn) {
     // 未登录则踢回首页
     router.push('/')
     return
  }
  userStore.fetchUserInfo()
})

// 监听登录状态，防止在页面中登出
watch(() => userStore.isLoggedIn, (loggedIn) => {
    if (!loggedIn) {
        router.push('/')
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

/* Phantom Background Layer (Now inside Content Frame) */
.phantom-ambassador {
  position: absolute;
  right: 0;
  top: 0; 
  bottom: 0;
  height: 100%; 
  width: auto;
  aspect-ratio: 3/4; 
  background-image: url('/images/theme/ambassador.png');
  background-repeat: no-repeat;
  background-size: cover; 
  background-position: right center;
  
  /* Natural Colors, Subtle Visibility */
  opacity: 0.25; 
  filter: none; 
  mix-blend-mode: normal; 
  
  /* Soft Fade out to left */
  mask-image: linear-gradient(to right, transparent 5%, black 60%);
  -webkit-mask-image: linear-gradient(to right, transparent 5%, black 60%);
  
  pointer-events: none;
  z-index: 0;
}

.page-content-wrapper {
  position: relative;
  z-index: 1; /* Content above phantom */
  height: 100%;
  overflow-y: auto; /* Internal scrolling */
  scrollbar-width: none;
}
.page-content-wrapper::-webkit-scrollbar { width: 0; }

.profile-content-frame {
  position: relative; /* Context for absolute phantom */
  width: 100%; height: 100%; border-radius: 24px; overflow: hidden;
  background: rgba(30, 41, 59, 0.3); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* 顶部导航 (Assuming Header component is used in Layout or App.vue, but here we treat profile-page as root) */

/* --- Layout Container --- */
.profile-container {
  flex: 1;
  display: flex;
  flex-direction: column; /* Stack Header and Layout */
  align-items: center;    /* Center horizontally */
  /* Extreme Pull Up: Reduced (Relaxed) */
  padding: 0 20px 20px 20px; 
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  height: auto; 
  flex-grow: 1;
  overflow: hidden;
  gap: 0;
  position: relative; 
  z-index: 5; 
}

.profile-layout {
  display: flex;
  gap: 32px;
  width: 100%;
  flex: 1;           
  min-height: 0;     
  max-width: 1300px;
  align-items: stretch;
  margin-top: 0; 
}

/* --- Ambassador Header --- */
.ambassador-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0; /* Header doesn't shrink */
  height: 180px;  /* Fixed header height */
  margin-top: -10px; /* Slight pull up if needed, or adjust padding */
  position: relative;
  z-index: 5;
}

.ambassador-img-wrapper {
  height: 130px; /* Adjust size to fit nicely */
  width: auto;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.4));
  margin-bottom: -10px;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.ambassador-img-wrapper:hover {
  transform: scale(1.05) translateY(-5px);
}

.ambassador-img {
  height: 100%;
  width: auto;
  object-fit: contain;
  /* Soft fade at bottom to blend */
  mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}

.welcome-text {
  text-align: center;
  position: relative;
  z-index: 3;
  margin-bottom: 20px;
}

.welcome-sub {
  font-size: 11px;
  letter-spacing: 3px;
  color: #60A5FA;
  font-weight: 700;
  margin-bottom: 2px;
  text-transform: uppercase;
  opacity: 0.8;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
}

.welcome-title {
  font-size: 28px; /* Slightly smaller than banner version */
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 4px 15px rgba(0,0,0,0.6);
}

.highlight-name {
  color: transparent;
  background: linear-gradient(135deg, #60A5FA 0%, #F97316 100%);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: 'Outfit', sans-serif;
}

/* Simple Welcome Text */
.simple-welcome-text {
  font-size: 20px; font-weight: 700; color: #fff;
  margin: 0 0 20px 0; align-self: flex-start;
  padding-left: 12px;
  position: relative; z-index: 5;
}

/* --- Left Sidebar: Obsidian Glass Panel --- */
.profile-sidebar {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 32px; /* Relaxed gap between sections */
  padding: 32px 24px 48px;
  height: 100%;
  overflow-y: auto;
  z-index: 50; /* High priority access */
  
  /* Obsidian Glass (Deepened) */
  background: rgba(10, 15, 30, 0.85); 
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  
  /* Enhanced 3D Depth */
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.3), 
    10px 0 40px -10px rgba(0, 0, 0, 0.5); 
    
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
}

.profile-sidebar::-webkit-scrollbar { width: 0; }

/* Sidebar Header Group */
.sidebar-header {
  display: flex;
  flex-direction: column;
  gap: 20px; 
  flex-shrink: 0;
}

/* Back Button (Restored to Visible Button) */
.back-home-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px; /* Consistent with menu */
  height: 48px; /* Taller, clickable area */
  width: 100%;
  
  background: rgba(255, 255, 255, 0.03); /* Visible bg */
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  
  color: #94A3B8;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-home-btn:hover {
  background: rgba(255, 255, 255, 0.08); /* Brighter hover */
  color: #fff;
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateX(4px); /* Consistent hover effect */
}
.arrow-icon-left { font-size: 16px; }

/* User Hero Card (Refined) */
.user-hero-card {
  position: relative;
  background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
  transition: transform 0.3s;
}

.user-hero-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px -10px rgba(0,0,0,0.6);
  border-color: rgba(255, 255, 255, 0.1);
}

/* User Hero Content */
.user-hero-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px; /* Increased gap */
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.user-avatar {
  width: 56px; /* Slightly larger */
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
  display: block;
}

.status-dot {
  position: absolute; bottom: 0; right: 0; width: 14px; height: 14px;
  background: #22C55E; border: 2px solid #1E293B; border-radius: 50%;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

.user-info {
  flex: 1;
  min-width: 0; /* Constraints flex item */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px; /* Space between name and badge */
}

.user-nickname {
  font-size: 15px; /* Optimised size */
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  margin: 0;
}

.user-id-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0,0,0,0.3);
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.05);
  max-width: 100%;
}

.user-id-badge span {
  font-size: 11px;
  font-family: 'Monaco', 'Menlo', monospace;
  color: #94A3B8;
  letter-spacing: 0.5px;
  white-space: nowrap; /* Enforce single line */
}

/* Loading Skeletons */
.user-hero-loading { display: flex; align-items: center; gap: 16px; }
.avatar-skeleton { width: 56px; height: 56px; border-radius: 50%; background: rgba(255,255,255,0.05); animation: pulse 1.5s infinite; }
.info-skeleton { flex: 1; }
.info-skeleton .line-1 { width: 90px; height: 18px; background: rgba(255,255,255,0.05); border-radius: 4px; margin-bottom: 8px; }
.info-skeleton .line-2 { width: 60px; height: 14px; background: rgba(255,255,255,0.03); border-radius: 4px; }
@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

/* Sidebar Menu */
.sidebar-menu {
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  gap: 12px; /* Increased from 8px for looser feel */
  padding-top: 12px;
  overflow-y: auto;
}

/* Menu Item: Pill Shape + Deepened Effects */
.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 20px; /* Increased vertical padding to 16px */
  border-radius: 16px; /* More rounded */
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy spring */
  color: #94A3B8;
  font-weight: 500;
  font-size: 15px;
  text-decoration: none !important;
  overflow: hidden;
  border: 1px solid transparent; /* Prepare for border */
}

/* Hover State - Deepened */

.menu-item:hover {
  background: rgba(255, 255, 255, 0.08); /* Brighter hover */
  color: #F8FAFC;
  transform: translateX(6px); /* More movement */
  box-shadow: 0 4px 12px rgba(0,0,0,0.2); /* Lift effect */
  border-color: rgba(255, 255, 255, 0.05);
}

/* Active State: Neon Pill */
.menu-item.active {
  /* Strong Neon Gradient */
  background: linear-gradient(90deg, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.05) 100%);
  color: #FB923C; 
  font-weight: 700;
  
  /* Deepened Glow */
  box-shadow: 
    inset 0 0 0 1px rgba(249, 115, 22, 0.3), /* Sharp inner border */
    0 0 20px rgba(249, 115, 22, 0.15); /* Outer glow */
    
  transform: translateX(0); /* Reset move */
  padding-left: 20px; /* Reset padding diff */
}

.menu-item.active .menu-icon {
  color: #FB923C;
  opacity: 1;
  filter: drop-shadow(0 0 8px rgba(251, 146, 60, 0.6)); /* Stronger icon glow */
  transform: scale(1.1); /* Pop icon */
}

.menu-item:hover .menu-icon {
  opacity: 1;
  color: #E2E8F0;
}

/* Unread - Subtle Dot Style */
.unread-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38BDF8; /* Sky Blue - subtle but visible */
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
  /* Position to the right */
  margin-left: auto; 
  margin-right: 8px;
  
  /* Subtle pulse */
  animation: pulse-dot 3s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 0.8; transform: scale(1); box-shadow: 0 0 5px rgba(56, 189, 248, 0.4); }
  50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px rgba(56, 189, 248, 0.8); }
}

.icon-wrapper {
  width: 24px; height: 24px;
  margin-right: 16px; /* Increased gap from 12px */
  display: flex; align-items: center; justify-content: center;
}
.menu-icon { font-size: 19px; opacity: 0.7; transition: all 0.3s; color: inherit; }

/* Footer & Logout */
.sidebar-footer { 
  padding-top: 24px; 
  margin-top: auto; /* Push to bottom of flex container */
  /* Remove border top for cleaner look? User wants separation "more obvious". 
     Maybe keeping the border is good, or using a gap. 
     User said "move up a bit". 
     The padding-bottom on .profile-sidebar handles the "lift".
  */
  border-top: 1px solid rgba(255,255,255,0.06); 
}

.logout-btn {
  width: 100%;
  padding: 16px 20px; /* Match menu padding */
  background: rgba(239, 68, 68, 0.05); /* Slight tint by default */
  color: #F87171;
  border: 1px solid rgba(239, 68, 68, 0.1);
  border-radius: 16px; /* Match menu radius */
  font-size: 15px; font-weight: 600;
  cursor: pointer;
  display: flex; align-items: center; gap: 16px; /* Match menu gap */
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #EF4444;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
}

/* --- Right Main Content --- */
.profile-main {
  flex: 1; min-width: 0; display: flex; height: 100%;
}
.profile-content-frame {
  width: 100%; height: 100%; border-radius: 24px; overflow: hidden;
  background: rgba(30, 41, 59, 0.3); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 900px) {
  .profile-layout { flex-direction: column; }
  .profile-sidebar { width: 100%; height: auto; padding: 16px; }
  .user-hero-card { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .profile-content-frame { min-height: 500px; }
}
</style>