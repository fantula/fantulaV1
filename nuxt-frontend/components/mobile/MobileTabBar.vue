<template>
  <div class="tab-bar-container">
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
          <!-- Active Indicator Dot -->
          <transition name="scale">
             <div v-if="currentPath === tab.path" class="active-dot"></div>
          </transition>
        </div>
        <span class="tab-label">{{ tab.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { HomeFilled, Grid, Service, User } from '@element-plus/icons-vue' // Using Grid for "Functions"

const router = useRouter()
const route = useRoute()

// Check if current path starts with tab path (for nested routes)
// But for exact tabs (home, category, help, profile) usually exact or prefix match.
const currentPath = computed(() => {
    // Simple exact match or logic for nested routes
    return route.path
})

const tabs = computed<Array<{name: string, path: string, icon: any, badge?: number}>>(() => [
  { name: '首页', path: '/mobile', icon: HomeFilled },
  { name: '功能', path: '/mobile/channel', icon: Grid },
  { name: '帮助', path: '/mobile/help', icon: Service },
  { name: '我的', path: '/mobile/profile', icon: User }
])

const handleTabClick = (tab: any) => {
  router.push(tab.path)
}
</script>

<style scoped>
.tab-bar-container {
  position: fixed; bottom: 20px; left: 20px; right: 20px;
  z-index: 1000;
  pointer-events: none; /* Let clicks pass through outside the bar */
  padding-bottom: env(safe-area-inset-bottom);
}

.mobile-tab-bar {
  pointer-events: auto;
  height: 64px;
  background: rgba(15, 23, 42, 0.85); /* Darker, more glass */
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 32px; /* Pill shape */
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #94A3B8; /* Slate 400 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}

.tab-item.active {
  color: #F97316; /* Primary Orange */
}

.icon-wrapper {
  position: relative;
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  display: flex; align-items: center; justify-content: center;
}

.tab-icon {
  width: 22px; height: 22px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-item.active .tab-icon {
  transform: translateY(-3px);
  color: #fff; /* Icon turns white on active maybe? Or keep orange. Let's keep orange text, white icon? No, consistent color is better. */
  color: #F97316;
}

/* Optional Active Dot */
.active-dot {
  position: absolute; bottom: -8px; width: 4px; height: 4px; border-radius: 50%;
  background: #F97316;
  box-shadow: 0 0 8px #F97316;
}
.scale-enter-active, .scale-leave-active { transition: transform 0.2s; }
.scale-enter-from, .scale-leave-to { transform: scale(0); }

.badge {
  position: absolute; top: -2px; right: -6px;
  background: #EF4444; color: #fff;
  font-size: 9px; font-weight: 700;
  padding: 1px 4px; border-radius: 10px;
  min-width: 14px; text-align: center;
  border: 1px solid #0F172A;
}

.tab-label {
  font-size: 10px; font-weight: 500; letter-spacing: 0.5px;
  transform-origin: center top;
  transition: transform 0.2s;
}
.tab-item.active .tab-label {
   font-weight: 600;
}
</style>
