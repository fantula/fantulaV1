<template>
  <div class="mobile-tab-bar">
    <div 
      v-for="tab in tabs" 
      :key="tab.path" 
      class="tab-item"
      :class="{ active: currentPath === tab.path }"
      @click="handleTabClick(tab)"
    >
      <div class="icon-wrapper">
        <component :is="tab.icon" class="tab-icon" />
        <div v-if="tab.badge && tab.badge > 0" class="badge">{{ tab.badge }}</div>
      </div>
      <span class="tab-label">{{ tab.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { HomeFilled, List, ShoppingCart, User } from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/client/cart'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const currentPath = computed(() => route.path)

const tabs = computed(() => [
  { name: '首页', path: '/mobile', icon: HomeFilled },
  { name: '分类', path: '/mobile/category', icon: List },
  { 
    name: '购物车', 
    path: '/mobile/cart', 
    icon: ShoppingCart,
    badge: cartStore.totalCount 
  },
  { name: '我的', path: '/mobile/profile', icon: User }
])

const handleTabClick = (tab: any) => {
  router.push(tab.path)
}
</script>

<style scoped>
.mobile-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px; /* Standard mobile tab height */
  background: rgba(15, 23, 42, 0.9); /* Dark theme base */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.08); /* Using border, not box-shadow top */
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #64748B; /* Inactive color */
  transition: all 0.2s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.tab-item.active {
  color: #3B82F6; /* Active Primary Blue */
}

.icon-wrapper {
  position: relative;
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.tab-icon {
  width: 100%;
  height: 100%;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-item.active .tab-icon {
  transform: translateY(-2px); /* Slight bounce up */
}

.badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background: #EF4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 100px;
  min-width: 16px;
  text-align: center;
  border: 1px solid #0F172A;
}

.tab-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>
