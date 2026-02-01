<template>
  <div class="device-detection-page">
    <div class="loading-container">
      <div class="spinner"></div>
      <p>正在识别设备...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 根路径智能跳转
 * 根据设备类型自动跳转到 /pc 或 /mobile
 */
definePageMeta({
  layout: false
})

const router = useRouter()

onMounted(() => {
  // 检测是否为移动设备
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // 跳转到对应页面
  if (isMobile) {
    router.replace('/mobile')
  } else {
    router.replace('/pc')
  }
})
</script>

<style scoped>
.device-detection-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #fff;
}

.loading-container {
  text-align: center;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}
</style>
