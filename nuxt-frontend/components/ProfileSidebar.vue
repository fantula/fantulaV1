<!--
  个人中心左侧导航栏组件
  
  功能：
  - 用户头像和基本信息展示
  - 导航菜单项展示
  - 激活状态管理
  - 导航切换事件处理
  - 退出登录功能
  
  设计特点：
  - 完整的用户信息展示
  - 清晰的视觉层次
  - 统一的交互反馈
-->
<template>
  <aside class="profile-sidebar">
    <!-- 用户信息区域 -->
    <div class="user-info">
      <div class="user-avatar-wrapper">
        <img :src="user.avatar" :alt="user.nickname" class="user-avatar" />
      </div>
      <h2 class="user-name">{{ user.nickname }}</h2>
      <p class="user-uid">UID: {{ user.id || '87654321' }}</p>
      <button class="change-avatar-btn" @click="$emit('change-avatar')">
        更改头像
      </button>
    </div>

    <!-- 导航菜单 -->
    <nav class="sidebar-nav" role="navigation" aria-label="个人中心导航">
      <ul class="nav-list">
        <li v-for="item in menuItems" :key="item.key" class="nav-item">
          <NuxtLink
            :to="item.to"
            class="nav-link"
            :class="{ 'nav-link--active': isActive(item.to) }"
            aria-current="isActive(item.to) ? 'page' : undefined"
          >
            <span class="nav-icon" :class="item.iconClass">{{ item.icon }}</span>
            <span class="nav-text">{{ item.label }}</span>
            <div v-if="item.key === 'messages' && unreadCount > 0" class="nav-indicator-glow"></div>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- 退出登录按钮 -->
    <div class="logout-section">
      <button class="logout-btn" @click="$emit('logout')">
        <span class="logout-icon">🚪</span>
        <span class="logout-text">退出登录</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

// 用户信息类型定义
interface User {
  id: number | string
  nickname: string
  avatar: string
  [key: string]: any
}

// 组件属性定义
interface Props {
  user: User
}

// 事件定义
interface Emits {
  (e: 'change-avatar'): void
  (e: 'logout'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const route = useRoute()
const unreadCount = ref(0)
import { messageApi } from '@/api/message'
import { onMounted } from 'vue'

const fetchUnread = async () => {
    const res = await messageApi.getUnreadCount()
    if (res.success && typeof res.data === 'number') {
        unreadCount.value = res.data
    }
}

onMounted(() => {
    fetchUnread()
})

// 导航菜单项配置
const menuItems = [
  {
    key: 'profile',
    label: '个人中心',
    icon: '🏠',
    iconClass: 'icon-home',
    to: '/profile'
  },
  {
    key: 'wallet',
    label: '我的余额',
    icon: '💰',
    iconClass: 'icon-wallet',
    to: '/profile/wallet'
  },
  {
    key: 'orders',
    label: '我的订单',
    icon: '📦',
    iconClass: 'icon-orders',
    to: '/profile/order'
  },
  {
    key: 'exchange',
    label: '兑换中心',
    icon: '🎁',
    iconClass: 'icon-exchange',
    to: '/profile/exchange'
  },
  {
    key: 'referral',
    label: '返现推广',
    icon: '📈',
    iconClass: 'icon-promotion',
    to: '/profile/referral'
  },
  {
    key: 'tickets',
    label: '我的工单',
    icon: '🎫',
    iconClass: 'icon-tickets',
    to: '/profile/tickets'
  },
  {
    key: 'favorites',
    label: '我的收藏',
    icon: '❤️',
    iconClass: 'icon-favorites',
    to: '/profile/favorites'
  },
  {
    key: 'messages',
    label: '我的消息',
    icon: '💬',
    iconClass: 'icon-messages',
    to: '/profile/messages'
  }
]

const isActive = (to: string) => {
  const current = route.path
  
  // 1. Root Profile Page (Strict Exact)
  if (to === '/profile') {
    return current === '/profile' || current === '/profile/'
  }

  // 2. Sub-pages (Inclusive)
  // Check if current path starts with the link path
  if (current.startsWith(to)) return true
  
  return false
}
</script>

<style scoped>
.profile-sidebar {
  width: 260px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: fit-content;
}

/* 用户信息区域 */
.user-info {
  padding: 25px 20px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.user-avatar-wrapper {
  margin-bottom: 12px;
}

.user-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
}

.user-uid {
  font-size: 13px;
  color: #999;
  margin: 0 0 14px 0;
}

.change-avatar-btn {
  padding: 6px 16px;
  background: transparent;
  border: 1px solid var(--primary-blue);
  border-radius: 16px;
  color: var(--primary-blue);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.change-avatar-btn:hover {
  background: var(--primary-blue);
  color: white;
}

/* 导航菜单 */
.sidebar-nav {
  flex: 1;
  padding: 10px 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0;
}

.nav-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: #666666;
  font-family: 'PingFang SC', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #333333;
}

.nav-link--active {
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.12) 0%, rgba(14, 165, 233, 0.05) 100%);
  color: var(--primary-blue);
  font-weight: 600;
}

.nav-link--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--primary-blue);
}

.nav-icon {
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}

.nav-indicator-glow {
  width: 8px;
  height: 8px;
  background: #F97316;
  border-radius: 50%;
  box-shadow: 0 0 10px #F97316;
  animation: pulse-glow 2s infinite;
  margin-left: auto;
}

@keyframes pulse-glow {
  0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
  70% { transform: scale(1.5); opacity: 0; box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
  100% { transform: scale(1); opacity: 0; box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
}

/* 退出登录区域 */
.logout-section {
  padding: 15px 20px;
  border-top: 1px solid #eee;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: none;
  background: var(--primary-blue);
  color: white;
  font-family: 'PingFang SC', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: var(--active-orange);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.logout-icon {
  font-size: 18px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-text {
  flex: 1;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .profile-sidebar {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .user-info {
    padding: 20px 15px;
  }
  
  .user-avatar {
    width: 60px;
    height: 60px;
  }
  
  .user-name {
    font-size: 16px;
  }
  
  .sidebar-nav {
    padding: 10px 0;
  }
  
  .nav-link {
    padding: 12px 20px;
    font-size: 15px;
  }
  
  .nav-icon {
    font-size: 16px;
    width: 20px;
    height: 20px;
  }
  
  .logout-section {
    padding: 15px;
  }
  
  .logout-btn {
    padding: 14px 18px;
    font-size: 15px;
  }
}

/* 无障碍优化 */
@media (prefers-reduced-motion: reduce) {
  .nav-link {
    transition: none;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .nav-link {
    border: 1px solid transparent;
  }
  
  .nav-link:hover,
  .nav-link:focus {
    border-color: currentColor;
  }
  
  .nav-link--active {
    border-color: var(--primary-blue);
  }
}
</style> 