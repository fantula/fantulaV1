<template>
  <el-dialog 
    :model-value="modelValue" 
    :title="title" 
    :width="width" 
    :close-on-click-modal="false"
    destroy-on-close
    class="admin-data-dialog"
    @update:model-value="$emit('update:modelValue', $event)"
    @closed="$emit('closed')"
  >
     <div class="dialog-content" v-loading="loading && !showFooter">
        <slot />
     </div>
     
     <template #footer v-if="showFooter">
        <span class="dialog-footer">
           <el-button @click="handleCancel">{{ cancelText }}</el-button>
           <el-button type="primary" @click="handleConfirm" :loading="loading">{{ confirmText }}</el-button>
        </span>
     </template>
  </el-dialog>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  width?: string | number
  loading?: boolean
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
}>(), {
  width: '500px',
  loading: false,
  showFooter: true,
  confirmText: '确认',
  cancelText: '取消'
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'closed'): void
}>()

const handleCancel = () => {
    emit('cancel')
    emit('update:modelValue', false)
}

const handleConfirm = () => {
    emit('confirm')
}
</script>

<style scoped>
.dialog-content {
    padding: 10px 0;
}
</style>
