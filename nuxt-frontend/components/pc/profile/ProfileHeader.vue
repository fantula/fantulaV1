<template>
  <div class="horizon-header">
    <div class="horizon-glass"></div>
    <div class="horizon-content">
      <div class="center-stage">
        <div class="icon-orb">
           <span class="greeting-icon">{{ greeting.icon }}</span>
        </div>
        
        <h1 class="greeting-main">{{ greeting.text }}</h1>
        
        <div class="user-identity">
          <span class="user-name">{{ userStore.user?.nickname || '旅行者' }}</span>
          <div class="name-shimmer"></div>
        </div>
      </div>
    </div>
    
    <!-- Central Glow Polish -->
    <div class="center-glow"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/client/user'

const userStore = useUserStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 6) return { text: '夜深了', icon: '🌙' }
  if (hour < 11) return { text: '早上好', icon: '☀️' }
  if (hour < 14) return { text: '中午好', icon: '🌞' }
  if (hour < 19) return { text: '下午好', icon: '☕' }
  return { text: '晚上好', icon: '✨' }
})
</script>

<style scoped>
.horizon-header {
  position: relative;
  width: 100%;
  height: 64px; /* Ultra-compact height */
  margin-bottom: 24px;
  border-radius: 100px; /* Pill shape for compactness */
  
  /* Flex Centering */
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Base */
  background: rgba(255, 255, 255, 0.01);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); /* Lighter shadow */
  
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}

.horizon-header:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

/* Glass Layer */
.horizon-glass {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 0;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.horizon-header:hover .horizon-glass {
  border-color: rgba(255, 255, 255, 0.12);
}

/* Central Glow */
.center-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 60%; height: 100%;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.horizon-content {
  position: relative;
  z-index: 5;
  width: 100%;
  display: flex;
  justify-content: center;
}

.center-stage {
  display: flex;
  align-items: center;
  gap: 16px; /* Spacing between elements */
}

/* Icon Orb - Smaller */
.icon-orb {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.5s ease;
}

.horizon-header:hover .icon-orb {
  transform: rotate(20deg);
  background: rgba(255,255,255,0.1);
}

.greeting-icon {
  font-size: 16px;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
}

/* Typography */
.greeting-main {
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  letter-spacing: 0.5px;
}

.user-identity {
  position: relative;
}

.user-name {
  font-size: 18px;
  font-weight: 700;
  /* Refined Gradient: Brighter center */
  background: linear-gradient(90deg, #A5F3FC 0%, #fff 50%, #A5F3FC 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 15px rgba(165, 243, 252, 0.3);
}

/* Shimmer */
.name-shimmer {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
  transform: skewX(-20deg) translateX(-150%);
  pointer-events: none;
  mix-blend-mode: overlay;
}

.horizon-header:hover .name-shimmer {
  transition: transform 0.8s ease-in-out;
  transform: skewX(-20deg) translateX(150%);
}

/* Responsive */
@media (max-width: 768px) {
  .horizon-header {
    height: 56px; /* Even smaller for mobile if needed */
    margin-bottom: 20px;
  }
  .center-stage { gap: 12px; }
  .greeting-main { font-size: 14px; }
  .user-name { font-size: 16px; }
}
</style>
