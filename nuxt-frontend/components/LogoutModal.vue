<template>
  <BaseModal
    :visible="true"
    title="退出登录"
    width="360px"
    confirm-text="确认退出"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
  >
    <div class="confirm-content">
      <div class="icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
      </div>
      <p class="confirm-text">确定要退出当前账号吗？</p>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
defineEmits(['close', 'confirm'])
</script>

<style scoped>
.confirm-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.icon-wrap {
  width: 72px;
  height: 72px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-blue);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
}

.confirm-text {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}
</style>
