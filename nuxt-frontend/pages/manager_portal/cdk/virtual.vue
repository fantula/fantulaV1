<template>
  <CdkListByType type="virtual" />
</template>

<script setup lang="ts">
import CdkListByType from '@/components/admin/cdk/CdkListByType.vue'
definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], title: '虚拟充值管理' })
</script>
