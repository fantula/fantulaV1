<template>
  <div v-if="show" class="dev-login-tool">
    <div class="tool-header">
      <span>开发调试工具</span>
      <button @click="show = false">×</button>
    </div>
    <div class="tool-content">
      <p class="tool-info">当前状态: {{ userStore.isLoggedIn ? '已登录' : '未登录' }}</p>
      <p v-if="userStore.user" class="tool-info">UID: {{ userStore.user.uid || '无' }}</p>
      <div class="tool-actions">
        <button @click="handleMockLogin" class="btn-mock">一键模拟登录</button>
        <button @click="userStore.logout" class="btn-logout">强制登出</button>
      </div>
    </div>
  </div>
  <button v-else class="dev-tool-trigger" @click="show = true">
    DEV
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const show = ref(true)
const userStore = useUserStore()

const handleMockLogin = () => {
  userStore.mockLogin()
  location.reload()
}
</script>

<style scoped>
.dev-login-tool {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 220px;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  border-radius: 12px;
  padding: 15px;
  z-index: 9999;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1);
  font-family: sans-serif;
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  opacity: 0.9;
}

.tool-header button {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.tool-info {
  font-size: 12px;
  margin-bottom: 8px;
  opacity: 0.8;
}

.tool-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.tool-actions button {
  flex: 1;
  padding: 6px;
  font-size: 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-mock {
  background: #409eff;
  color: #fff;
}

.btn-logout {
  background: #f56c6c;
  color: #fff;
}

.dev-tool-trigger {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  background: #409eff;
  color: #fff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  z-index: 9998;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(64,158,255,0.4);
}
</style>
