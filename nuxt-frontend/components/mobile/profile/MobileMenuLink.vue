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
  padding: 18px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:active { opacity: 0.7; }

.menu-left { display: flex; align-items: center; gap: 12px; }
.icon-wrap { display: flex; align-items: center; justify-content: center; }
.text-icon { color: #94A3B8; font-size: 20px; }
.menu-text { font-size: 15px; color: #E2E8F0; font-weight: 500; }
.text-arrow { color: #475569; font-size: 16px; }

.list-dot {
  width: 6px; height: 6px; background: #EF4444; border-radius: 50%; margin-left: 8px;
}
</style>
