<template>
  <div class="menu-item" @click="$emit('click')">
    <div class="menu-left">
      <div class="icon-wrap" v-if="icon">
        <component :is="icon" class="w-5 h-5 text-icon" />
      </div>
      <slot name="icon" v-else></slot>
      
      <span class="menu-text">{{ label }}</span>
      <div class="list-dot" v-if="badge"></div>
    </div>
    <el-icon class="text-arrow"><ArrowRight /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

defineProps<{
  label: string
  icon?: any
  badge?: boolean
}>()

defineEmits(['click'])
</script>

<style scoped>
.menu-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
  transition: background 0.2s;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:active { background: rgba(255,255,255,0.03); }

.menu-left { display: flex; align-items: center; gap: 12px; }
.icon-wrap { 
    display: flex; align-items: center; justify-content: center; 
    width: 24px; height: 24px;
    filter: drop-shadow(0 0 5px rgba(6, 182, 212, 0.2));
}
.text-icon { color: var(--cyber-primary, #06B6D4); font-size: 20px; }

.menu-text { font-size: 15px; color: #E0F2FE; font-weight: 500; letter-spacing: 0.3px; }
.text-arrow { color: #64748B; font-size: 16px; transition: color 0.2s; }

.menu-item:hover .text-arrow { color: #00FFFF; }

.list-dot {
  width: 6px; height: 6px; 
  background: var(--cyber-primary, #06B6D4); 
  border-radius: 50%; margin-left: 8px;
  box-shadow: 0 0 5px var(--cyber-primary, #06B6D4);
  animation: breathe 2s infinite ease-in-out;
}

@keyframes breathe {
  0% { opacity: 0.6; box-shadow: 0 0 4px var(--cyber-primary); }
  50% { opacity: 1; box-shadow: 0 0 10px var(--cyber-primary); }
  100% { opacity: 0.6; box-shadow: 0 0 4px var(--cyber-primary); }
}
</style>
