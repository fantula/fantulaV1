<template>
  <div class="loading-container">
    <el-icon class="is-loading"><Loading /></el-icon> redirecting...
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Loading } from '@element-plus/icons-vue'

const router = useRouter()
onMounted(() => {
    router.replace('/admin/help-center/faq')
})
</script>

<style scoped>
.loading-container { height: 200px; display: flex; align-items: center; justify-content: center; color: #909399; }
</style>
