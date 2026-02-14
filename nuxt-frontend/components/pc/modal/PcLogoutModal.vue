<template>
  <BaseConfirmModal
    :visible="true"
    title="退出登录"
    message="确定要退出当前账号吗？"
    confirm-text="确认退出"
    theme-id="suit-001"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
  />
</template>

<script setup lang="ts">
import BaseConfirmModal from '@/components/pc/modal/base/BaseConfirmModal.vue'

defineProps<{
  visible?: boolean
}>()

defineEmits(['close', 'confirm'])
</script>

<style scoped>
/* Layer 3: No Layout CSS Allowed */
</style>
