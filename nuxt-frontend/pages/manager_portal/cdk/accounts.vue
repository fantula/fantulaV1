<template>
  <CdkListByType type="shared" />
</template>

<script setup lang="ts">
import CdkListByType from '@/components/admin/cdk/CdkListByType.vue'
definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], title: '账号合租管理' })
</script>
