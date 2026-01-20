<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <span>后台管理系统登录</span>
        </div>
      </template>
      
      <el-form :model="loginForm" :rules="rules" ref="formRef" label-width="0px" class="login-form">
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            placeholder="邮箱"
            prefix-icon="Message"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            prefix-icon="Lock"
            show-password
            clearable
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-hint">
        <el-alert 
          title="测试账号：admin@fantula.com / admin123456" 
          type="info" 
          show-icon 
          :closable="false"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useAdminStore } from '@/stores/admin'

definePageMeta({
  layout: false
})

const formRef = ref<FormInstance>()
const loading = ref(false)
const adminStore = useAdminStore()

const loginForm = reactive({
  email: '',
  password: ''
})

const rules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const handleLogin = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    // 使用独立的 Admin Store 登录（与客户端完全分离）
    const result = await adminStore.login(loginForm.email, loginForm.password)
    
    if (!result.success) {
      ElMessage.error(result.error || '登录失败')
      return
    }
    
    ElMessage.success(`欢迎回来，${adminStore.adminInfo?.name || '管理员'}`)
    
    // 跳转到后台首页
    await navigateTo('/_mgmt_9Xfa3')
  } catch (e: any) {
    ElMessage.error(e.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 400px;
}

.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.login-btn {
  width: 100%;
}

.login-hint {
  margin-top: 16px;
}
</style>

