<template>
  <div class="mobile-sub-page-header-wrapper">
    <!-- Spacer to prevent content overlap -->
    <div class="header-spacer"></div>
    
    <div class="mobile-sub-page-header">
      <div class="back-btn" @click="handleBack">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <h1 class="page-title">{{ title }}</h1>
      <div class="header-right">
         <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const props = defineProps<{
  title: string
  backPath?: string
}>()

const router = useRouter()

const handleBack = () => {
  if (props.backPath) {
    router.push(props.backPath)
  } else {
    router.back()
  }
}
</script>

<style scoped>
.mobile-sub-page-header {
  display: flex; align-items: center; padding: 0 20px;
  /* Glass Header */
  background: var(--cyber-bg-glass, rgba(15, 23, 42, 0.8));
  backdrop-filter: blur(12px);
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  border-bottom: 1px solid var(--cyber-border, rgba(56, 189, 248, 0.3));
  height: 60px; /* Reduced height for better mobile feel */
  padding-top: env(safe-area-inset-top); /* Handle safe area */
}

.back-btn {
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.05); border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  color: #E0F2FE;
  cursor: pointer;
  transition: all 0.2s;
}
.back-btn:active { background: rgba(255,255,255,0.1); }

.page-title { 
    flex: 1; text-align: center; font-size: 18px; font-weight: 700; margin: 0; 
    color: #fff; text-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
}

.header-right {
    width: 36px; display: flex; justify-content: flex-end;
}

.header-spacer {
  height: 60px; /* Match header height */
  width: 100%;
  padding-top: env(safe-area-inset-top); /* Match header padding */
}
</style>
