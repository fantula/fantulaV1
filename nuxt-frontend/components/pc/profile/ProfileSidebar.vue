<template>
  <aside class="profile-sidebar">
    <!-- 用户卡片 -->
    <div class="user-card" @click="navigateTo(pcRoutes.profile())">
      <img
        :src="userStore.user?.avatar || DEFAULT_AVATAR"
        :alt="nickname"
        class="user-avatar"
      />
      <div class="user-info">
        <div class="user-name">{{ nickname }}</div>
        <div class="user-uid">UID {{ uid }}</div>
      </div>
    </div>

    <!-- 导航列表 -->
    <nav class="sidebar-nav">
      <div
        v-for="item in navItems"
        :key="item.path"
        class="nav-item"
        :class="{ active: isActive(item) }"
        @click="navigateTo(item.path)"
      >
        <el-icon class="nav-icon"><component :is="item.icon" /></el-icon>
        <span class="nav-label">{{ item.label }}</span>
        <span v-if="item.badge && item.badge > 0" class="nav-badge">
          {{ item.badge > 99 ? '99+' : item.badge }}
        </span>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/client/user'
import { pcRoutes } from '@/config/client-routes'
import { DEFAULT_AVATAR } from '@/utils/constants'
import { User, List, Star, Bell, Coin, Ticket, Service } from '@element-plus/icons-vue'

const userStore = useUserStore()
const route = useRoute()

const nickname = computed(() => {
  const u = userStore.user as any
  return u?.nickName || u?.nickname || '用户'
})

const uid = computed(() => {
  const u = userStore.user as any
  return u?.uid || (u?.id ? String(u.id).slice(0, 8) : '---')
})

const navItems = computed(() => [
  { label: '个人信息', path: pcRoutes.profile(), icon: User },
  { label: '我的订单', path: pcRoutes.profileOrders(), icon: List },
  { label: '我的收藏', path: pcRoutes.profileFavorites(), icon: Star },
  { label: '消息中心', path: pcRoutes.profileMessages(), icon: Bell, badge: userStore.unreadMessageCount },
  { label: '我的钱包', path: pcRoutes.profileWallet(), icon: Coin },
  { label: '优惠券', path: pcRoutes.profileExchange(), icon: Ticket },
  { label: '工单支持', path: pcRoutes.profileTickets(), icon: Service },
])

const isActive = (item: { path: string }) => {
  const p = route.path
  return p === item.path || p.startsWith(item.path + '/')
}
</script>

<style scoped>
.profile-sidebar {
  width: 220px;
  flex-shrink: 0;
  position: sticky;
  top: 92px; /* header 60px + padding 32px */
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: flex-start;
}

/* 用户卡片 */
.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 4px;
}
.user-card:hover {
  background: rgba(255, 255, 255, 0.05);
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(59, 130, 246, 0.4);
  flex-shrink: 0;
}
.user-info { min-width: 0; }
.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #F1F5F9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-uid {
  font-size: 11px;
  color: #64748B;
  font-family: 'Monaco', monospace;
  margin-top: 2px;
}

/* 分隔线 */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* 导航项 */
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: #94A3B8;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
  border-left: 2px solid transparent;
}
.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #CBD5E1;
}
.nav-item.active {
  background: rgba(59, 130, 246, 0.1);
  color: #fff;
  border-left-color: #3B82F6;
}
.nav-icon {
  font-size: 16px;
  flex-shrink: 0;
}
.nav-label { flex: 1; }

/* 未读角标 */
.nav-badge {
  background: #3B82F6;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 20px;
  padding: 1px 6px;
  min-width: 18px;
  text-align: center;
  line-height: 16px;
}
</style>
