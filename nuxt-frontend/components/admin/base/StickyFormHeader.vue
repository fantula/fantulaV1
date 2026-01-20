<template>
  <div class="sticky-form-header">
    <div class="header-left">
      <el-button link @click="$emit('back')" class="back-btn">
        <el-icon class="back-icon"><ArrowLeft /></el-icon>
        <div class="header-titles">
          <div class="main-title">{{ title }}</div>
          <div class="sub-title" v-if="subtitle">{{ subtitle }}</div>
        </div>
      </el-button>
    </div>
    <div class="header-right">
      <slot name="actions">
        <el-button @click="$emit('cancel')">{{ cancelText }}</el-button>
        <el-button type="primary" @click="$emit('submit')" :loading="loading">{{ submitText }}</el-button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'

withDefaults(defineProps<{
  title: string
  subtitle?: string
  cancelText?: string
  submitText?: string
  loading?: boolean
}>(), {
  cancelText: '取消',
  submitText: '保存',
  loading: false
})

defineEmits<{
  (e: 'back'): void
  (e: 'cancel'): void
  (e: 'submit'): void
}>()
</script>

<style scoped>
.sticky-form-header {
  position: sticky;
  top: 0;
  z-index: 99;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e4e7ed;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.header-left {
  display: flex;
  align-items: center;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-icon {
  font-size: 18px;
}

.header-titles {
  text-align: left;
}

.main-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  line-height: 1.2;
}

.sub-title {
  font-size: 12px;
  color: #909399;
}

.header-right {
  display: flex;
  gap: 10px;
}

/* Dark mode support */
:root.dark .sticky-form-header {
  background: rgba(30, 41, 59, 0.9);
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

:root.dark .main-title {
  color: #e2e8f0;
}

:root.dark .sub-title {
  color: #94a3b8;
}
</style>
