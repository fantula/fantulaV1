<!--
  应用顶部导航栏组件
  
  功能包括：
  - Logo和品牌名称展示
  - 主要导航菜单
  - 全局搜索框
  - 用户登录/注册入口
  - 沉浸式交互：头像点击直接进入个人中心
-->
<template>
  <header class="app-header">
    <div class="header-inner">
      <!-- Logo区 -->
      <NuxtLink to="/" class="logo-area">
        <img src="/images/shared/logo_v3.png" alt="logo" class="logo-img" />
        <span class="logo-text">凡图拉</span>
      </NuxtLink>
      <!-- 菜单区 -->
      <nav class="nav-menu">
        <NuxtLink to="/" class="nav-btn">首页</NuxtLink>
        <button @click="handleOrderClick" class="nav-btn">订单</button>
        <NuxtLink to="/community" class="nav-btn">社区帮助</NuxtLink>
        <button class="nav-btn" @click="showServiceModal = true">客服</button>
      </nav>
      <!-- 搜索框+用户区域 -->
      <div class="header-actions">
        <div class="search-box">
          <input 
            class="search-input" 
            type="text" 
            placeholder="搜索..." 
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <div class="search-icon-bg" @click="handleSearch" style="cursor: pointer">
            <el-icon :size="18" color="#fff"><Search /></el-icon>
          </div>
        </div>
        
        <!-- 未登录状态：显示登录按钮 -->
        <NuxtLink 
          v-if="!userStore.isLoggedIn" 
          to="#" 
          class="login-btn" 
          @click.prevent="modal.openLogin()"
        >
          登录/注册
        </NuxtLink>
        
          <!-- 已登录状态：显示购物车和用户信息 -->
          <div v-else class="user-section">
            <!-- 购物车图标容器 -->
            <div class="cart-wrapper" style="position: relative;" ref="cartWrapperRef">
              <div class="cart-icon" title="购物车" @click.stop="toggleMiniCart" id="cart-icon-ref">
                <div class="cart-icon-wrapper">
                  <el-icon :size="26" color="#E2E8F0"><ShoppingCart /></el-icon>
                  <!-- 购物车数量badge -->
                  <span v-if="cartStore.totalCount > 0" class="cart-badge">{{ cartStore.totalCount }}</span>
                </div>
              </div>
              
              <MiniCartPopup 
                :visible="cartStore.miniCartVisible" 
                @close="cartStore.miniCartVisible = false"
                class="header-mini-cart"
              />
            </div>

            <!-- Favorites Icon -->
            <div class="favorites-wrapper" @click="navigateToFavorites" id="favorites-icon-ref" title="我的收藏">
              <el-icon :size="24" color="#E2E8F0" class="fav-icon"><Star /></el-icon>
            </div>

            <div class="user-info-container">
              <!-- 加载状态：骨架屏 -->
              <div v-if="userStore.loading" class="user-info user-info--loading">
                <div class="avatar-skeleton"></div>
                <div class="name-skeleton"></div>
              </div>
              <!-- 已加载：真实头像 -->
              <div v-else @click="navigateToProfile" class="user-info" title="进入个人中心">
                <img 
                  :src="userStore.user?.avatar || '/images/client/pc/avatars/avatar-cat.png'" 
                  :alt="userStore.user?.nickName || userStore.user?.nickname || '用户头像'"
                  class="user-avatar"
                />
                <span class="user-name">{{ userStore.user?.nickName || userStore.user?.nickname || '用户' }}</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  </header>
  <ServiceModal v-if="showServiceModal" @close="showServiceModal = false" />
  <LoginRegisterModal :visible="showLoginModal" @close="closeLoginModal" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import ServiceModal from './ServiceModal.vue'
import LoginRegisterModal from './LoginRegisterModal.vue'
import MiniCartPopup from '@/components/cart/MiniCartPopup.vue'
import { Shop, ShoppingCart, Search, Star } from '@element-plus/icons-vue'


const modal = useModalStore()
const userStore = useUserStore()
const cartStore = useCartStore()
const route = useRoute()

const searchQuery = ref('')
const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
}

// 用户菜单状态
const showServiceModal = ref(false)
const showLoginModal = ref(false)

// 处理订单按钮点击 - 添加登录检查
const handleOrderClick = () => {
  if (userStore.isLoggedIn) {
    // 已登录，直接跳转
    navigateTo('/profile/orders')
  } else {
    // 未登录，显示登录弹窗
    showLoginModal.value = true
  }
}

// 关闭登录弹窗
const closeLoginModal = () => {
  showLoginModal.value = false
}

// 菜单导航方法
const navigateToProfile = () => {
  if (route.path === '/profile') {
    // Smart Refresh: If already on profile, force reload via query params
    const query = { ...route.query, refresh: Date.now() }
    navigateTo({ path: '/profile', query })
  } else {
    navigateTo('/profile')
  }
}

const navigateToFavorites = () => {
    navigateTo('/profile/favorites')
}

// 监听登录状态变化，登录成功后自动关闭弹窗
// 监听登录状态变化
watch(() => userStore.isLoggedIn, async (newValue) => {
  if (newValue) {
    // 登录成功: 关闭弹窗并加载购物车
    if (showLoginModal.value) showLoginModal.value = false
    await cartStore.loadCart()
  } else {
    // 退出登录: 清空本地购物车
    cartStore.items = []
  }
})

const toggleMiniCart = () => {
  cartStore.miniCartVisible = !cartStore.miniCartVisible
}

// 点击外部关闭购物车
const cartWrapperRef = ref<HTMLElement | null>(null)
const handleClickOutside = (event: MouseEvent) => {
  if (cartStore.miniCartVisible && cartWrapperRef.value && !cartWrapperRef.value.contains(event.target as Node)) {
    cartStore.miniCartVisible = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.app-header {
  width: 100vw;
  min-width: 1180px;
  /* 透明/毛玻璃背景效果 */
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0 0 0 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(230, 230, 230, 0.5);
  /* 固定定位 */
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}
.header-inner {
  width: 1180px;
  height: 60px; /* 原为48px，提升高度 */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-area {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.logo-img {
  height: 50px; /* Increased from 32px to fill header */
  width: auto;
  object-fit: contain;
  /* border-radius: 50%; Removed for custom shape */
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  /* filter: drop-shadow removed for clean look */
}
.logo-area:hover .logo-img {
  transform: rotate(15deg) scale(1.1);
  /* box-shadow removed */
}
/* Removed old logo-img styles */
.logo-text {
  font-family: PingFang SC, sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #222;
  letter-spacing: 2px;
  white-space: nowrap;
}
.nav-menu {
  display: flex;
  gap: 40px;
  flex: 1;
  margin-left: 40px;
}
.nav-btn {
  font-family: PingFang SC, sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #494949;
  text-align: left;
  line-height: 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  background: none;
  border: none;
  border-radius: 0;
  padding: 0 8px 0 8px;
  position: relative;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;
  height: 48px;
}
.nav-btn.router-link-active::after,
.nav-btn.router-link-exact-active::after,
.nav-btn:hover::after {
  content: '';
  display: block;
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 6px;
  height: 3px;
  background: var(--active-orange);
  border-radius: 2px;
}
.nav-btn.router-link-active,
.nav-btn.router-link-exact-active,
.nav-btn:hover {
  color: #222;
  /* 移除背景色，保持透明风格 */
  background: transparent;
  cursor: pointer;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 28px; /* 原为18px，提升间距 */
}
.search-box {
  width: 260px;
  height: 39px;
  background: rgba(255, 255, 255, 0.1); /* Dark Glass */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  display: flex;
  align-items: center;
  padding: 0 12px 0 16px;
  position: relative;
  transition: all 0.3s;
}
.search-box:focus-within {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
}
.search-input {
  flex: 1;
  height: 30px;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
  color: #fff; /* White text */
  font-family: PingFang SC, sans-serif;
  white-space: nowrap;
}
.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.search-icon-bg {
  width: 32px;
  height: 32px;
  background: transparent; /* Remove white circle */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  transition: transform 0.2s;
}
.search-box:focus-within .search-icon-bg {
  transform: scale(1.1);
  color: var(--active-orange);
}
.login-btn {
  width: 113px;
  height: 39px;
  background: var(--primary-blue);
  border-radius: 20px;
  color: #fff;
  font-family: PingFang SC, sans-serif;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(14, 165, 233, 0.3); /* Blue shadow */
  white-space: nowrap;
}
.login-btn:hover {
  background: var(--active-orange);
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4); /* Orange shadow */
  transform: translateY(-1px);
}

/* 用户区域样式 */
.user-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 购物车样式 */
.cart-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  color: #E2E8F0 !important; /* Force to match global nav */
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  height: 100%;
  transition: color 0.3s;
}
.cart-icon:hover {
  color: var(--active-orange) !important;
}

/* 移除悬停效果 */
.cart-icon:hover {
  opacity: 1;
  background: none;
}

.cart-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: var(--active-orange);
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  padding: 0 4px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

/* Favorites Icon */
.favorites-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;
}
.favorites-wrapper:hover .fav-icon {
  color: var(--active-orange) !important;
  transform: scale(1.1);
}
.fav-icon {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 用户信息样式 */
.user-info-container {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  padding: 4px 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.user-info:hover {
  transform: scale(1.05); /* Slight zoom on hover */
  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.5)); /* Glow effect hint */
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2); /* Semi-transparent border */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 头像骨架屏样式 */
.user-info--loading {
  pointer-events: none;
}

.avatar-skeleton {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

.name-skeleton {
  width: 50px;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
  transition: border-color 0.3s;
}

.user-info:hover .user-avatar {
    border-color: var(--active-orange);
}

.user-name {
  font-family: 'PingFang SC', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #fff; /* White name */
  white-space: nowrap;
}

/* 响应式适配 */
@media (max-width: 1220px) {
  .user-section {
    gap: 16px;
  }
  
  .user-name {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .user-section {
    gap: 12px;
  }
  
  .cart-img {
    width: 24px;
    height: 24px;
  }
  
  .user-avatar {
    width: 32px;
    height: 32px;
  }
  
  .user-name {
    display: none;
  }
  
  .nav-menu {
    display: none; /* 移动端暂时隐藏菜单 */
  }
}
</style>