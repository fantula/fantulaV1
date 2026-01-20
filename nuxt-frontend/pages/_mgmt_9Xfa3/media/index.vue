<template>
  <div class="loading-container">
    <el-icon class="is-loading"><Loading /></el-icon> redirecting...
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Loading } from '@element-plus/icons-vue'

const router = useRouter()
onMounted(() => {
    router.replace('/_mgmt_9Xfa3/media/images')
})
</script>

<style scoped>
.loading-container { height: 200px; display: flex; align-items: center; justify-content: center; color: #909399; }
</style>
