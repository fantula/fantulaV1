<template>
  <div class="mobile-profile-page">
    <!-- User Hero Section -->
    <div class="profile-header">
      <div v-if="userStore.isLoggedIn" class="user-info">
        <div class="avatar-wrapper">
          <img :src="userStore.user?.avatar || '/images/client/pc/avatars/avatar-cat.png'" class="avatar-img" />
        </div>
        <div class="user-text">
          <h2 class="nickname">{{ userStore.user?.nickname || 'FANTULA User' }}</h2>
          <div class="uid-tag">UID: {{ userStore.user?.uid || '---' }}</div>
        </div>
      </div>
      
      <div v-else class="guest-info" @click="handleLogin">
        <div class="avatar-wrapper guest">
          <el-icon><User /></el-icon>
        </div>
        <div class="user-text">
          <h2 class="nickname">点击登录/注册</h2>
          <div class="uid-tag">登录体验更多功能</div>
        </div>
      </div>
    </div>

    <!-- Stats Grid (Wallet, Points, Coupons) -->
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-val">{{ userStore.user?.balance || '0.00' }}</span>
        <span class="stat-label">余额</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">{{ userStore.user?.points || '0' }}</span>
        <span class="stat-label">积分</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">0</span>
        <span class="stat-label">优惠券</span>
      </div>
    </div>

    <!-- Order Menu (Horizontal) -->
    <div class="menu-section">
      <div class="section-header">
        <span class="title">我的订单</span>
        <span class="more" @click="router.push('/mobile/orders')">全部订单 ></span>
      </div>
      <div class="order-actions">
        <div class="action-item">
          <el-icon><Wallet /></el-icon>
          <span>待支付</span>
        </div>
        <div class="action-item">
          <el-icon><Box /></el-icon>
          <span>待发货</span>
        </div>
        <div class="action-item">
          <el-icon><CircleCheck /></el-icon>
          <span>已完成</span>
        </div>
        <div class="action-item">
          <el-icon><Service /></el-icon>
          <span>售后</span>
        </div>
      </div>
    </div>

    <!-- General Menu List -->
    <div class="menu-list">
      <div class="menu-item" @click="router.push('/mobile/profile/favorites')">
         <el-icon class="item-icon"><Star /></el-icon>
         <span class="item-text">我的收藏</span>
         <el-icon class="arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item">
         <el-icon class="item-icon"><Service /></el-icon>
         <span class="item-text">在线客服</span>
         <el-icon class="arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item">
         <el-icon class="item-icon"><Setting /></el-icon>
         <span class="item-text">设置</span>
         <el-icon class="arrow"><ArrowRight /></el-icon>
      </div>
    </div>

    <!-- Logout Button -->
    <div v-if="userStore.isLoggedIn" class="logout-section">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </div>
    
    <!-- Modals -->
    <LoginRegisterModal :visible="modal.showLogin" @close="modal.closeLogin()" />
    <div class="tab-bar-spacer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/client/user'
import { useModalStore } from '@/stores/client/modal'
import { User, Wallet, Box, CircleCheck, Service, Star, Setting, ArrowRight } from '@element-plus/icons-vue'
import LoginRegisterModal from '@/components/pc/modal/LoginRegisterModal.vue'

definePageMeta({
  layout: 'mobile'
})

const router = useRouter()
const userStore = useUserStore()
const modal = useModalStore()

const handleLogin = () => {
  modal.showLogin = true
}

const handleLogout = async () => {
  await userStore.logout()
  router.push('/mobile')
}
</script>

<style scoped>
.mobile-profile-page {
  min-height: 100vh;
  background: #0F172A;
  color: #fff;
  padding: 20px;
}

/* Header */
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.user-info, .guest-info {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}
.avatar-wrapper {
  width: 64px; height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  display: flex; align-items: center; justify-content: center;
}
.avatar-img { width: 100%; height: 100%; object-fit: cover; }
.guest .el-icon { font-size: 32px; color: #94A3B8; }

.nickname { font-size: 20px; font-weight: 700; margin: 0 0 4px 0; }
.uid-tag { font-size: 12px; color: #94A3B8; background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 4px; display: inline-block; }

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid rgba(255,255,255,0.05);
}
.stat-item {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  position: relative;
}
.stat-item:not(:last-child)::after {
  content: ''; position: absolute; right: 0; top: 10%; height: 80%; width: 1px; background: rgba(255,255,255,0.05);
}
.stat-val { font-size: 16px; font-weight: 700; color: #F59E0B; }
.stat-label { font-size: 12px; color: #94A3B8; }

/* Menu Section */
.menu-section {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid rgba(255,255,255,0.05);
}
.section-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;
}
.title { font-size: 14px; font-weight: 600; }
.more { font-size: 12px; color: #94A3B8; }

.order-actions {
  display: flex; justify-content: space-between;
}
.action-item {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  font-size: 12px; color: #94A3B8;
}
.action-item .el-icon { font-size: 24px; color: #fff; margin-bottom: 4px; }

/* Menu List */
.menu-list {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 24px;
}
.menu-item {
  display: flex; align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.menu-item:last-child { border-bottom: none; }
.item-icon { font-size: 18px; color: #94A3B8; margin-right: 12px; }
.item-text { flex: 1; font-size: 14px; }
.arrow { color: #64748B; }

/* Logout */
.logout-btn {
  width: 100%;
  padding: 14px;
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  font-weight: 600;
  margin-bottom: 20px;
}

.tab-bar-spacer { height: 60px; }
</style>
