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

import { onMounted, onActivated, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Loading } from '@element-plus/icons-vue'
import { adminRoute } from '@/config/admin-routes'

const router = useRouter()

const redirect = async () => {
    await nextTick()
    router.replace(adminRoute('help-center/faq'))
}

onMounted(() => redirect())
onActivated(() => redirect())
</script>

<style scoped>
.loading-container { height: 200px; display: flex; align-items: center; justify-content: center; color: #909399; }
</style>
