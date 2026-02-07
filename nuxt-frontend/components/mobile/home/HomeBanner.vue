<template>
  <div class="banner-section">
    <!-- 
      Unified Container for Smooth Transition 
      Uses class-based state (.is-collapsed) instead of v-if/v-else 
    -->
    <div 
      class="banner-container-premium" 
    >
      <!-- Premium Glow Background (Ported from PC) -->
      <div class="glow-border-effect"></div>
      
       <!-- Content Area -->
       <div class="banner-content-inner">
         <!-- 1. Expanded Content: Carousel -->
         <div class="expanded-view">
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
  </div>
</template>

<script setup lang="ts">
import type { Banner } from '@/types/api'

defineProps<{
  banners: Banner[]
}>()
</script>

<style scoped>
.banner-section {
    padding: 12px 16px 20px;
    position: relative;
    z-index: 10;
}

/* --- Premium Container --- */
.banner-container-premium {
    position: relative;
    width: 100%;
    /* Expanded Height */
    height: 180px; 
    border-radius: var(--radius-lg);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    /* Glass Effect Base */
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

/* Collapsed State Override Removed */

/* --- Glow Border Effect (The "Soul" of PC Version) --- */
.glow-border-effect {
    position: absolute;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    border-radius: inherit; /* Follows parent radius */
    z-index: -1;
    background: linear-gradient(
        45deg, 
        var(--primary), 
        var(--accent), 
        #06B6D4, 
        var(--primary)
    );
    background-size: 300% 300%;
    animation: gradientFlow 6s ease infinite;
    opacity: 0.5;
    filter: blur(6px);
    transition: opacity 0.3s;
}

.banner-container-premium.is-collapsed .glow-border-effect {
    opacity: 0.2; /* Subtler glow when collapsed */
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* --- Inner Content Handling --- */
.banner-content-inner {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
    position: relative;
    background: rgba(0, 0, 0, 0.2); /* Inner shade */
    border: 1px solid rgba(255, 255, 255, 0.08); /* Fine border */
}

/* --- Expanded View Styles --- */
.expanded-view {
    width: 100%;
    height: 100%;
    position: relative;
    /* Removed opacity transition since always visible */
}
.expanded-view.fade-out {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease; /* Quick fade out */
}

.banner-carousel {
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden; /* Prevent vertical movement */
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x; /* Allow only horizontal pan */
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
.banner-overlay {
    position: absolute; bottom: 0; left: 0; right: 0; height: 40%;
    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}


/* Cleaned up removed styles: .collapse-hint, .collapsed-view, etc. */
</style>
