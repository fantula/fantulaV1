<template>
  <div class="app-wrapper">
    <AppHeader />
    <div class="profile-layout-body">
      <SideNavigation />
      <div class="profile-main">
        <slot />
      </div>
    </div>
    <!-- 开发工具组件（仅开发环境） -->
    <DevLoginTool v-if="isDev" />
    <!-- 粒子背景 -->
    <ClientOnly>
      <ParticleBackground />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/pc.css'
import AppHeader from '@/components/pc/AppHeader.vue'
import DevLoginTool from '@/components/pc/DevLoginTool.vue'
import ParticleBackground from '@/components/pc/ParticleBackground.vue'
import SideNavigation from '@/components/pc/profile/SideNavigation.vue'
import { pcRoutes } from '@/config/client-routes'
import { useUserStore } from '@/stores/client/user'

const isDev = import.meta.dev

// 认证守卫：未登录跳回首页（替代已删除的 profile.vue 中的 auth 逻辑）
const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    await userStore.init()
  }
  if (!userStore.isLoggedIn) {
    router.push(pcRoutes.home())
    return
  }
  if (!userStore.user) {
    userStore.fetchUserInfo()
  }
})

watch(() => userStore.isLoggedIn, (loggedIn) => {
  if (!loggedIn) {
    router.push(pcRoutes.home())
  }
})
</script>

<style scoped>
.app-wrapper {
  height: 100vh;
  overflow: hidden; /* 锁定整体高度，防止切换时背景抖动 */
  display: flex;
  flex-direction: column;
}

.profile-layout-body {
  flex: 1;
  min-height: 0; /* Flex shrink bug fix */
  display: flex;
  align-items: stretch; /* 左右两栏同高，右侧面板撑满 */
  max-width: 1180px;
  margin: 0 auto;
  width: 100%;
  padding: 32px 24px;
  gap: 24px;
}

.profile-main {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
}

/* Slot children participate in flex layout */
.profile-main :deep(> *) {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* Logic Guard: Prevent PC layout from painting on Mobile devices (SSR Flash Protection) */
@media (max-width: 768px) {
  .app-wrapper {
    display: none !important;
  }
}
</style>
