<template>
  <BaseModal
    :visible="true"
    title="联系客服"
    width="360px"
    :show-footer="false"
    @close="$emit('close')"
  >
    <div class="contact-content">
      <p>联系客服：请通过在线客服或拨打 <span class="phone">400-123-4567</span> 联系我们。</p>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
defineEmits(['close'])
</script>

<style scoped>
.contact-content {
  text-align: center;
  font-size: 15px;
  color: #E2E8F0;
}

.phone {
  color: var(--primary-blue);
  font-weight: 700;
}
</style>