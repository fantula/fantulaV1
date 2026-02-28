<template>
  <div class="profile-page">
    <!-- 个人中心主体内容 -->
    <div class="profile-container">
      <ProfileHeader />

      <div class="profile-layout">
        <SideNavigation />

        <main class="profile-main">
          <div class="profile-content-frame">
             <div class="phantom-ambassador"></div>
             
             <!-- 强制刷新与平滑转场 -->
             <div class="page-content-wrapper">
                <NuxtPage :key="$route.fullPath" :transition="{ name: 'fade-slide', mode: 'out-in' }" />
             </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { useUserStore } from '@/stores/client/user'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { pcRoutes } from '@/config/client-routes'
import SideNavigation from '@/components/pc/profile/SideNavigation.vue'
import ProfileHeader from '@/components/pc/profile/ProfileHeader.vue'

useHead({
  title: '个人中心 - 凡图拉'
})

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  if (!userStore.isLoggedIn) {
     router.push(pcRoutes.home())
     return
  }
  userStore.fetchUserInfo()
})

watch(() => userStore.isLoggedIn, (loggedIn) => {
    if (!loggedIn) {
        router.push(pcRoutes.home())
    }
})
</script>

<style scoped>
.profile-page {
  flex: none; height: calc(100vh - 60px); display: flex; flex-direction: column; overflow: hidden; background: #0F172A;
}

.phantom-ambassador {
  position: absolute; right: 0; top: 0; bottom: 0; height: 100%; width: auto; aspect-ratio: 3/4; 
  background-image: url('/images/theme/ambassador.png'); background-repeat: no-repeat; background-size: cover; background-position: right center;
  opacity: 0.25; mix-blend-mode: normal; 
  mask-image: linear-gradient(to right, transparent 5%, black 60%);
  -webkit-mask-image: linear-gradient(to right, transparent 5%, black 60%);
  pointer-events: none; z-index: 0;
}

/* 外部锁定，内部滚动方案 */
.page-content-wrapper {
  position: relative; z-index: 1; flex: 1; width: 100%;
  overflow: hidden; /* 彻底锁死外部滚动 */
  min-height: 0; display: flex; flex-direction: column;
}

.profile-container {
  flex: 1; min-height: 0; display: flex; flex-direction: column; align-items: center; 
  padding: 0 20px 20px 20px; max-width: 1400px; margin: 0 auto; width: 100%;
  overflow: hidden; gap: 0; position: relative; z-index: 5; 
}

.profile-layout {
  display: flex; gap: 32px; width: 100%; flex: 1; min-height: 0; max-width: 1300px; align-items: stretch; margin-top: 0; 
}

.profile-main {
  flex: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column;
}

.profile-content-frame {
  flex: 1; min-height: 0; width: 100%; border-radius: 24px; overflow: hidden; position: relative;
  display: flex; flex-direction: column;
  background: rgba(30, 41, 59, 0.3); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

@media (max-width: 900px) {
  .profile-layout { flex-direction: column; }
  .profile-sidebar { width: 100%; height: auto; padding: 16px; }
  .user-hero-card { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .profile-content-frame { min-height: 500px; }
}

/* Vue/Nuxt Transition Classes */
:deep(.fade-slide-enter-active),
:deep(.fade-slide-leave-active) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
:deep(.fade-slide-enter-from) {
  opacity: 0;
  transform: translateY(10px);
}
:deep(.fade-slide-leave-to) {
  opacity: 0;
  transform: translateY(-10px);
}
</style>