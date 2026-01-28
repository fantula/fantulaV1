<template>
  <header class="mobile-header" :class="{ 'is-scrolled': isScrolled }">
    <!-- Top Row: Logo & Actions -->
    <div class="header-top">
      <div class="logo-area">
         <span class="logo-text">FANTULA</span>
      </div>
      
      <div class="header-actions">
         <template v-if="!userStore.isLoggedIn">
            <button class="btn btn-glass btn-sm login-btn" @click="$emit('open-login')">登录</button>
         </template>
         <template v-else>
            <div class="header-avatar" @click="router.push('/mobile/profile')">
               <img :src="userStore.user?.avatar || '/images/default-avatar.png'" />
               <div class="avatar-ring"></div>
            </div>
         </template>
      </div>
    </div>

    <!-- Search Placeholder (Visible only when not scrolled or simplified when scrolled) -->
    <div class="search-trigger" :class="{ 'compact': isScrolled }">
      <div class="search-bar">
        <el-icon class="search-icon"><Search /></el-icon>
        <span class="search-text">搜索优质商品...</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/client/user'
import { Search } from '@element-plus/icons-vue'

defineProps<{
  isScrolled: boolean
}>()

defineEmits(['open-login'])

const router = useRouter()
const userStore = useUserStore()
</script>

<style scoped>
.mobile-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--safe-area-top) 16px 12px;
  background: transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-header.is-scrolled {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  padding-bottom: 12px;
}

/* Top Row */
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
}

.logo-text {
  font-family: 'DIN', sans-serif;
  font-weight: 700; 
  font-size: 24px; 
  letter-spacing: 1px;
  background: linear-gradient(90deg, #fff, #94A3B8);
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(255,255,255,0.1);
}

/* Actions */
.login-btn {
  padding: 6px 16px;
  font-size: 13px;
  border-radius: 20px;
}

.header-avatar {
  width: 36px; height: 36px; 
  border-radius: 50%; 
  position: relative;
  cursor: pointer;
}
.header-avatar img { 
  width: 100%; height: 100%; 
  object-fit: cover; 
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
}
.avatar-ring {
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  border-radius: 50%;
  border: 1px solid var(--primary-color);
  opacity: 0.5;
}

/* Search Trigger */
.search-trigger {
  width: 100%;
  transition: all 0.3s ease;
  height: 36px;
}
.search-trigger.compact {
  height: 0;
  opacity: 0;
  overflow: hidden;
  margin-top: -12px; /* Pull up */
}

.search-bar {
  width: 100%;
  height: 36px;
  background: rgba(255, 255, 255, 0.08); /* Lighter than bg */
  border: 1px solid var(--glass-border);
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: var(--text-secondary);
  font-size: 13px;
  backdrop-filter: blur(4px);
}

.search-icon { margin-right: 8px; font-size: 16px; }

</style>
