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

    <div class="loader-content" v-if="variant === 'initial'">
      <!-- Brand Name -->
      <h1 class="brand-name">凡图拉</h1>

      <!-- Rolling Text Animation (Horizontally aligned after brand) -->
      <div class="rolling-text-container">
        <div class="rolling-track">
          <div class="rolling-item item-1">可靠</div>
          <div class="rolling-item item-2">正规</div>
          <div class="rolling-item item-3">稳定</div>
          <!-- Duplicate for end state -->
          <div class="rolling-item item-1">可靠</div>
        </div>
      </div>
    </div>

    <!-- Simple Spinner for Navigation -->
    <div class="loader-content" v-else>
       <div class="spinner-simple"></div>
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
  background-color: rgba(2, 6, 23, 0.4);
  backdrop-filter: blur(12px);
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

.loader-content {
  text-align: center;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: row; /* Horizontal alignment */
  align-items: center; /* Center vertically */
  justify-content: center;
  gap: 1.5rem; /* Gap between "Fantula" and rolling text */
}

/* Brand Name */
.brand-name {
  font-size: 3.5rem; /* Large size */
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  margin: 0;
  line-height: 80px; /* Match container height */
}

/* Rolling Text Container */
.rolling-text-container {
  height: 80px; /* Increased height to match larger font */
  overflow: hidden;
  position: relative;
  perspective: 1000px;
  /* Align with brand name baseline */
  display: block;
}

.rolling-track {
  animation: roll-up 3.5s cubic-bezier(0.25, 1, 0.5, 1); /* Slower animation (3.5s) */
  animation-fill-mode: forwards;
}

.rolling-item {
  height: 80px; /* Match container height */
  line-height: 80px; /* Vertically center */
  font-size: 3.5rem; /* Same size as Brand Name */
  font-weight: 800;
  letter-spacing: 4px;
  text-align: left;
}

/* Colors for rolling items */
.item-1 { color: #F59E0B; text-shadow: 0 0 15px rgba(245, 158, 11, 0.4); } /* Gold/Orange */
.item-2 { color: #34D399; text-shadow: 0 0 15px rgba(52, 211, 153, 0.4); } /* Emerald Green */
.item-3 { color: #38BDF8; text-shadow: 0 0 15px rgba(56, 189, 248, 0.4); } /* Sky Blue */

/* Keyframes - Adjusted for 80px height */
@keyframes roll-up {
  0% { transform: translateY(0); }
  20% { transform: translateY(0); }

  33% { transform: translateY(-80px); }
  53% { transform: translateY(-80px); }

  66% { transform: translateY(-160px); }
  86% { transform: translateY(-160px); }

  100% { transform: translateY(-160px); } /* End state */
}

/* Simple Spinner for non-initial loading */
.spinner-simple {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #38BDF8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .loader-content {
    flex-direction: row; /* Keep horizontal on mobile */
    gap: 0.8rem;
  }
  .brand-name { font-size: 1.8rem; line-height: 40px; }
  .rolling-text-container { height: 40px; display: block; }
  .rolling-item { height: 40px; line-height: 40px; font-size: 1.8rem; }

  @keyframes roll-up {
    0% { transform: translateY(0); }
    20% { transform: translateY(0); }

    33% { transform: translateY(-40px); }
    53% { transform: translateY(-40px); }

    66% { transform: translateY(-80px); }
    86% { transform: translateY(-80px); }

    100% { transform: translateY(-80px); }
  }
}
</style>
