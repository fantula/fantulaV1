<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-code">{{ error.statusCode }}</div>
      <h1 class="error-title">{{ errorTitle }}</h1>
      <p class="error-desc">{{ errorDescription }}</p>
      
      <div class="actions">
        <button class="home-btn" @click="handleError">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })

const errorTitle = computed(() => {
  if (props.error.statusCode === 404) return '页面未找到'
  return '发生了一些错误'
})

const errorDescription = computed(() => {
  if (props.error.statusCode === 404) return '抱歉，您访问的页面不存在或已被移除。'
  return '服务器遇到了一点问题，请稍后再试。'
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 20px;
}

.error-content {
  text-align: center;
  background: white;
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  max-width: 500px;
  width: 100%;
}

.error-code {
  font-size: 120px;
  font-weight: 800;
  color: #2583f6; /* Blue theme */
  line-height: 1;
  margin-bottom: 20px;
  opacity: 0.1;
}

.error-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.error-desc {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.6;
}

.home-btn {
  background: #2583f6;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.home-btn:hover {
  background: #1e70e6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 131, 246, 0.2);
}

@media (max-width: 480px) {
  .error-content {
    padding: 40px 20px;
  }
  .error-code {
    font-size: 80px;
  }
}
</style>
