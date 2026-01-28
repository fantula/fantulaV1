<template>
  <div class="banner-section">
    <!-- Collapsed State -->
    <div v-if="isCollapsed" class="banner-placeholder-glass" @click="isCollapsed = false">
         <span class="placeholder-text">查看推荐活动</span>
         <el-icon><ArrowDown /></el-icon>
    </div>

    <!-- Expanded State -->
    <div v-else class="banner-container-3d" @click="handleBannerClick">
      <!-- Glow Underlay -->
      <div class="banner-glow"></div>
      
      <div class="banner-content card-glass">
         <div class="banner-carousel" v-if="banners.length > 0">
            <div 
              v-for="banner in banners" 
              :key="banner.id" 
              class="banner-item"
            >
              <img :src="banner.image" class="banner-img" />
              <div class="banner-overlay"></div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import type { Banner } from '@/types/api'

defineProps<{
  banners: Banner[]
}>()

const isCollapsed = ref(false)

const handleBannerClick = () => {
    // Optional: Tap to collapse or navigate
    // if (!isCollapsed.value) isCollapsed.value = true
}
</script>

<style scoped>
.banner-section {
    padding: 12px 16px 20px; /* Reduced top padding as Header handles safe area */
    position: relative;
    z-index: 10;
}

/* Placeholder */
.banner-placeholder-glass {
    width: 100%;
    height: 44px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 13px;
    backdrop-filter: blur(8px);
    transition: all 0.3s;
    cursor: pointer;
}
.banner-placeholder-glass:active { 
    transform: scale(0.98); 
    background: rgba(59, 130, 246, 0.1); 
    color: var(--primary-color); 
}

/* Main Container */
.banner-container-3d {
    position: relative;
    width: 100%;
    height: 180px; /* Taller */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.banner-container-3d:active { transform: scale(0.98); }

/* Glow Effect */
.banner-glow {
    position: absolute;
    top: 10px; left: 10px; right: 10px; bottom: -10px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    filter: blur(25px);
    opacity: 0.4;
    border-radius: 20px;
    z-index: -1;
    animation: pulse-glow 4s infinite;
}

.banner-content {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-lg);
    overflow: hidden;
    padding: 4px; /* Frame Border */
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.banner-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  border-radius: 14px; /* Inner radius */
}
.banner-carousel::-webkit-scrollbar { display: none; }

.banner-item {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
  position: relative;
}
.banner-img {
  width: 100%; height: 100%; object-fit: cover;
}

/* Gradient Overlay for Text Readability (Future proof) */
.banner-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
    pointer-events: none;
}
</style>
