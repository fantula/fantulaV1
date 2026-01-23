<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <span>后台管理系统登录</span>
        </div>
      </template>
      
      <!-- 登录方式切换 -->
      <el-tabs v-model="loginMode" class="login-tabs">
        <el-tab-pane label="密码登录" name="password">
          <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="0px">
            <el-form-item prop="email">
              <el-input
                v-model="passwordForm.email"
                placeholder="邮箱"
                prefix-icon="Message"
                clearable
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="passwordForm.password"
                placeholder="密码"
                prefix-icon="Lock"
                show-password
                clearable
                @keyup.enter="handlePasswordLogin"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-btn" @click="handlePasswordLogin" :loading="loading">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="验证码登录" name="otp">
          <el-form :model="otpForm" :rules="otpRules" ref="otpFormRef" label-width="0px">
            <el-form-item prop="email">
              <el-input
                v-model="otpForm.email"
                placeholder="邮箱"
                prefix-icon="Message"
                clearable
              />
            </el-form-item>
            <el-form-item prop="code">
              <div class="code-input-group">
                <el-input
                  v-model="otpForm.code"
                  placeholder="验证码"
                  prefix-icon="Key"
                  clearable
                  @keyup.enter="handleOtpLogin"
                />
                <el-button 
                  type="primary" 
                  plain 
                  :disabled="countdown > 0 || sendingCode" 
                  :loading="sendingCode"
                  @click="handleSendCode"
                >
                  {{ countdown > 0 ? formatCountdown(countdown) : '发送验证码' }}
                </el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-btn" @click="handleOtpLogin" :loading="loading">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      
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

const adminStore = useAdminStore()

// --- State ---
const loginMode = ref<'password' | 'otp'>('password')
const loading = ref(false)
const sendingCode = ref(false)
const countdown = ref(0)

// Password Form
const passwordFormRef = ref<FormInstance>()
const passwordForm = reactive({
  email: '',
  password: ''
})

const passwordRules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

// OTP Form
const otpFormRef = ref<FormInstance>()
const otpForm = reactive({
  email: '',
  code: ''
})

const otpRules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码为6位数字', trigger: 'blur' }
  ]
})

// --- Handlers ---

const handlePasswordLogin = async () => {
  const valid = await passwordFormRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const result = await adminStore.login(passwordForm.email, passwordForm.password)
    
    if (!result.success) {
      ElMessage.error(result.error || '登录失败')
      return
    }
    
    ElMessage.success(`欢迎回来，${adminStore.adminInfo?.name || '管理员'}`)
    await navigateTo('/_mgmt_9Xfa3')
  } catch (e: any) {
    ElMessage.error(e.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const handleSendCode = async () => {
  // 只验证邮箱字段
  const emailValid = await otpFormRef.value?.validateField('email').catch(() => false)
  if (!emailValid) return

  sendingCode.value = true
  try {
    const result = await adminStore.sendOtp(otpForm.email)
    
    if (!result.success) {
      ElMessage.error(result.error || '发送验证码失败')
      return
    }
    
    ElMessage.success('验证码已发送到您的邮箱')
    startCountdown()
  } catch (e: any) {
    ElMessage.error(e.message || '发送验证码失败')
  } finally {
    sendingCode.value = false
  }
}

const handleOtpLogin = async () => {
  const valid = await otpFormRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    const result = await adminStore.loginWithOtp(otpForm.email, otpForm.code)
    
    if (!result.success) {
      ElMessage.error(result.error || '登录失败')
      return
    }
    
    ElMessage.success(`欢迎回来，${adminStore.adminInfo?.name || '管理员'}`)
    await navigateTo('/_mgmt_9Xfa3')
  } catch (e: any) {
    ElMessage.error(e.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const startCountdown = () => {
  countdown.value = 300  // 5分钟倒计时
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 格式化倒计时显示 (mm:ss)
const formatCountdown = (seconds: number): string => {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
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
  width: 420px;
}

.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.login-tabs {
  margin-top: -10px;
}

.login-btn {
  width: 100%;
}

.login-hint {
  margin-top: 16px;
}

.code-input-group {
  display: flex;
  gap: 10px;
}

.code-input-group .el-input {
  flex: 1;
}

.code-input-group .el-button {
  width: 120px;
}
</style>
