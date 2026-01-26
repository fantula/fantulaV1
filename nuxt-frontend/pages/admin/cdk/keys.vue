<template>
  <CdkListByType type="one_time" />
</template>

<script setup lang="ts">
import CdkListByType from '@/components/admin/cdk/CdkListByType.vue'
definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], title: '兑换码管理' })
</script>
