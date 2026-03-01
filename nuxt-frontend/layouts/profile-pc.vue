<template>
  <div class="app-wrapper">
    <AppHeader />
    <div class="profile-workspace">
      <!-- 问候横幅：晚上好，旅行者 -->
      <ProfileHeader />
      <!-- 双栏：侧边栏 + 内容 -->
      <div class="profile-columns">
        <SideNavigation />
        <div class="profile-main">
          <!-- 大使背景图：右侧虚幻装饰 -->
          <div class="phantom-ambassador" aria-hidden="true"></div>
          <slot />
        </div>
      </div>
      <!-- 底部版权细条 -->
      <div class="profile-bottom-bar">
        <span>© 2019–2026 凡图拉 | 云南凡图拉科技有限公司</span>
        <span class="bottom-divider">·</span>
        <span>滇ICP备 2025060486号-1</span>
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
import ProfileHeader from '@/components/pc/profile/ProfileHeader.vue'
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

/* 外层纵向容器：问候横幅 + 双栏 */
.profile-workspace {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  max-width: 1180px;
  margin: 0 auto;
  width: 100%;
  padding: 16px 24px 0;
  gap: 8px; /* 问候横幅与双栏之间的间距 */
}

/* ProfileHeader 组件内置 margin-bottom: 24px，在此覆盖压缩 */
.profile-workspace :deep(.horizon-header) {
  margin-bottom: 0;
}

/* 内层横向容器：侧边栏 + 内容 */
.profile-columns {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: stretch;
  gap: 24px;
}

.profile-main {
  position: relative; /* 让 phantom-ambassador 绝对定位在此内 */
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

/* 右侧虚幻大使背景图 */
.phantom-ambassador {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: auto;
  aspect-ratio: 3 / 4;
  background-image: url('/images/theme/ambassador.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right center;
  opacity: 0.2;
  mask-image: linear-gradient(to right, transparent 5%, black 60%);
  -webkit-mask-image: linear-gradient(to right, transparent 5%, black 60%);
  pointer-events: none;
  z-index: 0;
}

/* Slot children sit above ambassador image */
.profile-main :deep(> *:not(.phantom-ambassador)) {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* 底部版权细条 */
.profile-bottom-bar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 6px 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.3px;
}

.bottom-divider {
  opacity: 0.4;
}

/* Logic Guard: Prevent PC layout from painting on Mobile devices (SSR Flash Protection) */
@media (max-width: 768px) {
  .app-wrapper {
    display: none !important;
  }
}
</style>
