<template>
  <BaseModal
    :visible="visible"
    :title="title"
    :width="width"
    :show-close="true"
    :show-footer="showFooter"
    :cancel-text="cancelText"
    :confirm-text="submitText"
    :loading="loading"
    :confirm-disabled="submitDisabled"
    :theme-id="themeId"
    @close="handleClose"
    @confirm="handleSubmit"
  >
    <!-- Subtitle Slot/Prop -->
    <div v-if="subtitle" class="form-subtitle">{{ subtitle }}</div>

    <!-- Main Content -->
    <div class="form-body-wrapper">
      <slot></slot>
    </div>

    <!-- Custom Footer Slot (Pass-through) -->
    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
/**
 * Layer 2: BaseFormModal
 * Wrapper around BaseModal for Form Scenarios.
 * Standardizes width, props, and simple form logic.
 */
import BaseModal from '@/components/base/BaseModal.vue'

const props = withDefaults(defineProps<{
  visible: boolean
  title?: string
  subtitle?: string
  width?: string
  cancelText?: string
  submitText?: string
  loading?: boolean
  submitDisabled?: boolean
  showFooter?: boolean
  themeId?: string
}>(), {
  title: '表单',
  width: '500px', // Standard Form Width
  cancelText: '取消',
  submitText: '提交',
  loading: false,
  submitDisabled: false,
  showFooter: true,
  themeId: 'suit-001'
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'submit'): void
  (e: 'update:visible', value: boolean): void
}>()

const handleClose = () => {
  if (!props.loading) {
    emit('close')
    emit('update:visible', false)
  }
}

const handleSubmit = () => {
  if (!props.loading && !props.submitDisabled) {
    emit('submit')
  }
}
</script>

<style scoped>
.form-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: -24px; /* Pull up closer to title */
  margin-bottom: 20px;
  margin-left: 2px;
}

.form-body-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
