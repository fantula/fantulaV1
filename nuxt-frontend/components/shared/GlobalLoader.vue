<template>
  <div 
    class="global-loader"
    :class="[
      { 'is-hidden': !loading },
      `mode-${variant}`
    ]"
  >
    <!-- Background Effects -->
    <div class="bg-grid" v-if="variant === 'initial'"></div>
    <div class="bg-radial" v-if="variant === 'initial'"></div>
    
    <!-- Glass Effect Background for Navigation -->
    <div class="bg-glass" v-if="variant === 'navigation'"></div>

    <div class="loader-content">
      <!-- Dual Ring Spinner -->
      <div class="spinner-container">
        <div class="ring outer-ring"></div>
        <div class="ring inner-ring"></div>
      </div>
      
      <!-- Branding (Only for Initial Load) -->
      <h1 class="brand-name" v-if="variant === 'initial'">FanTula</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading: boolean
  variant?: 'initial' | 'navigation' | 'section'
}

withDefaults(defineProps<Props>(), {
  variant: 'initial'
})
</script>

<style scoped>
.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  opacity: 1;
  visibility: visible;
  overflow: hidden;
}

/* Mode: Initial (Full Dark Theme) */
.global-loader.mode-initial {
  background-color: #020617;
}

/* Mode: Navigation (Glass Effect) */
.global-loader.mode-navigation {
  background-color: rgba(2, 6, 23, 0.4); /* Semi-transparent dark blue */
  backdrop-filter: blur(12px); /* Frost glass effect */
}

/* Mode: Section (Local Area Loader) */
.global-loader.mode-section {
  position: absolute; /* Relative to parent container */
  width: 100%;
  height: 100%;
  z-index: 50;
  border-radius: 24px; /* Match container radius */
  background-color: rgba(2, 6, 23, 0.4);
  backdrop-filter: blur(8px);
}

.global-loader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Background Effects */
.bg-radial {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #1e293b 0%, #020617 70%);
  z-index: -1;
}

.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: -2;
  mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
}

.bg-glass {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.loader-content {
  text-align: center;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Spinner Container */
.spinner-container {
  position: relative;
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 0 10px rgba(23, 143, 198, 0.3));
}

.ring {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-color: transparent;
}

/* Outer Ring - Blue */
.outer-ring {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-width: 4px;
  border-top-color: #178fc6; /* Primary Blue */
  border-left-color: rgba(23, 143, 198, 0.3);
  animation: spin 1s linear infinite; /* Increased speed */
}

/* Inner Ring - Orange */
.inner-ring {
  top: 15px;
  left: 15px;
  width: 50px;
  height: 50px;
  border-width: 4px;
  border-top-color: #F97316; /* Active Orange */
  border-right-color: rgba(249, 115, 22, 0.3);
  animation: spin-reverse 0.4s linear infinite; /* Much faster reverse */
}

/* Branding Text */
.brand-name {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #fff;
  opacity: 0.8;
  animation: pulse 2s ease-in-out infinite;
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}

@keyframes pulse {
  0% { opacity: 0.5; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.5; transform: scale(0.98); }
}
</style>
