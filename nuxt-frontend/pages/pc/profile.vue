<template>
  <div class="profile-page">
    <!-- 顶部导航 -->

    <!-- 个人中心主体内容 -->
    <div class="profile-container">
      
      <!-- Simple Welcome Title -->
      <h1 class="simple-welcome-text">欢迎回来</h1>

      <div class="profile-layout">
        <!-- 左侧边栏 (Unified Deep Glass) -->
        <SideNavigation />

        <!-- 右侧主内容 (Unified Sheer Glass Frame) -->
        <main class="profile-main">
          <div class="profile-content-frame">
             <!-- Mature Arch: No Overlay Spinner. NProgress handles the transition visual. -->
             <!-- We just need to ensure the background remains visible. -->

             <!-- Phantom Watermark (Inside Frame) -->
             <div class="phantom-ambassador"></div>
             
             <!-- 强制刷新：确保每次切换 Tab 都会重新加载页面数据 -->
             <div class="page-content-wrapper">
                <NuxtPage :key="$route.fullPath" />
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
import SideNavigation from '@/components/pc/profile/SideNavigation.vue'

// SEO配置
useHead({
  title: '个人中心 - 凡图拉',
  meta: [
    { name: 'description', content: '凡图拉个人中心' }
  ]
})

// Mature Arch: No local loading state needed here
const userStore = useUserStore()
const router = useRouter()

// 登录守卫与初始化
onMounted(() => {
  if (!userStore.isLoggedIn) {
     // 未登录则踢回首页
     router.push('/')
     return
  }
  userStore.fetchUserInfo()
})

// 监听登录状态，防止在页面中登出
watch(() => userStore.isLoggedIn, (loggedIn) => {
    if (!loggedIn) {
        router.push('/')
    }
})
</script>

<style scoped>
.profile-page {
  height: 100vh; /* Fixed height */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Disable window scroll */
  background: #0F172A; /* Ensure background covers whole screen */
}

/* Phantom Background Layer (Now inside Content Frame) */
.phantom-ambassador {
  position: absolute;
  right: 0;
  top: 0; 
  bottom: 0;
  height: 100%; 
  width: auto;
  aspect-ratio: 3/4; 
  background-image: url('/images/theme/ambassador.png');
  background-repeat: no-repeat;
  background-size: cover; 
  background-position: right center;
  
  /* Natural Colors, Subtle Visibility */
  opacity: 0.25; 
  filter: none; 
  mix-blend-mode: normal; 
  
  /* Soft Fade out to left */
  mask-image: linear-gradient(to right, transparent 5%, black 60%);
  -webkit-mask-image: linear-gradient(to right, transparent 5%, black 60%);
  
  pointer-events: none;
  z-index: 0;
}

.page-content-wrapper {
  position: relative;
  z-index: 1; /* Content above phantom */
  height: 100%;
  overflow-y: auto; /* Internal scrolling */
  scrollbar-width: none;
}
.page-content-wrapper::-webkit-scrollbar { width: 0; }

.profile-content-frame {
  position: relative; /* Context for absolute phantom */
  width: 100%; height: 100%; border-radius: 24px; overflow: hidden;
  background: rgba(30, 41, 59, 0.3); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* 顶部导航 (Assuming Header component is used in Layout or App.vue, but here we treat profile-page as root) */

/* --- Layout Container --- */
.profile-container {
  flex: 1;
  display: flex;
  flex-direction: column; /* Stack Header and Layout */
  align-items: center;    /* Center horizontally */
  /* Extreme Pull Up: Reduced (Relaxed) */
  padding: 0 20px 20px 20px; 
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  height: auto; 
  flex-grow: 1;
  overflow: hidden;
  gap: 0;
  position: relative; 
  z-index: 5; 
}

.profile-layout {
  display: flex;
  gap: 32px;
  width: 100%;
  flex: 1;           
  min-height: 0;     
  max-width: 1300px;
  align-items: stretch;
  margin-top: 0; 
}

/* --- Ambassador Header --- */
.ambassador-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0; /* Header doesn't shrink */
  height: 180px;  /* Fixed header height */
  margin-top: -10px; /* Slight pull up if needed, or adjust padding */
  position: relative;
  z-index: 5;
}

.ambassador-img-wrapper {
  height: 130px; /* Adjust size to fit nicely */
  width: auto;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.4));
  margin-bottom: -10px;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.ambassador-img-wrapper:hover {
  transform: scale(1.05) translateY(-5px);
}

.ambassador-img {
  height: 100%;
  width: auto;
  object-fit: contain;
  /* Soft fade at bottom to blend */
  mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}

.welcome-text {
  text-align: center;
  position: relative;
  z-index: 3;
  margin-bottom: 20px;
}

.welcome-sub {
  font-size: 11px;
  letter-spacing: 3px;
  color: #60A5FA;
  font-weight: 700;
  margin-bottom: 2px;
  text-transform: uppercase;
  opacity: 0.8;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
}

.welcome-title {
  font-size: 28px; /* Slightly smaller than banner version */
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 4px 15px rgba(0,0,0,0.6);
}

.highlight-name {
  color: transparent;
  background: linear-gradient(135deg, #60A5FA 0%, #F97316 100%);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: 'Outfit', sans-serif;
}

/* Simple Welcome Text */
.simple-welcome-text {
  font-size: 20px; font-weight: 700; color: #fff;
  margin: 0 0 20px 0; align-self: flex-start;
  padding-left: 12px;
  position: relative; z-index: 5;
}

/* --- Right Main Content --- */
.profile-main {
  flex: 1; min-width: 0; display: flex; height: 100%;
}
.profile-content-frame {
  width: 100%; height: 100%; border-radius: 24px; overflow: hidden;
  background: rgba(30, 41, 59, 0.3); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 900px) {
  .profile-layout { flex-direction: column; }
  .profile-sidebar { width: 100%; height: auto; padding: 16px; }
  .user-hero-card { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .profile-content-frame { min-height: 500px; }
}
</style>