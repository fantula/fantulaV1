<template>
  <BaseModal
    :visible="true"
    title="更新密码"
    confirm-text="确认更新"
    :loading="loading"
    :confirm-disabled="!canSubmit"
    @close="$emit('close')"
    @confirm="handleSubmit"
  >
    <div class="form-group">
      <label class="form-label">邮箱验证码</label>
      <div class="captcha-row">
        <input type="text" v-model="otpCode" class="form-input" placeholder="请输入验证码" maxlength="6" />
        <button 
          type="button" 
          class="send-code-btn" 
          :disabled="countdown > 0 || loading" 
          @click="sendCode"
        >
          {{ countdown > 0 ? `${countdown}s后重发` : '获取验证码' }}
        </button>
      </div>
      <p class="form-tip">验证码将发送至: {{ userEmail }}</p>
    </div>

    <div class="form-group">
      <label class="form-label">新密码</label>
      <input 
        v-model="newPassword" 
        type="password" 
        class="form-input" 
        placeholder="请输入新密码 (至少8位,包含数字和字母)" 
        @input="checkStrength"
      />
      <div class="password-strength" v-if="newPassword">
        强度: <span :class="strengthClass">{{ strengthText }}</span>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">确认新密码</label>
      <input v-model="confirmPassword" type="password" class="form-input" placeholder="请再次输入新密码" />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { authApi } from '@/api/auth'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  email: string
}>()

const emit = defineEmits(['close'])

const otpCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const strength = ref(0)
const loading = ref(false)
const countdown = ref(0)
let timerInterval: any = null

const userEmail = computed(() => props.email || '当前账户')

const TIMER_KEY = 'otp_password_timer_end'
const COOLDOWN_SECONDS = 300

const startTimer = (seconds: number, isNew = true) => {
  countdown.value = seconds
  if (isNew) {
    const endTime = Date.now() + seconds * 1000
    localStorage.setItem(TIMER_KEY, endTime.toString())
  }
  
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timerInterval)
      localStorage.removeItem(TIMER_KEY)
    }
  }, 1000)
}

const restoreTimer = () => {
  const endTimeStr = localStorage.getItem(TIMER_KEY)
  if (endTimeStr) {
    const endTime = parseInt(endTimeStr, 10)
    const now = Date.now()
    if (endTime > now) {
      const remaining = Math.ceil((endTime - now) / 1000)
      startTimer(remaining, false)
    } else {
      localStorage.removeItem(TIMER_KEY)
    }
  }
}

onMounted(() => { restoreTimer() })
onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })

const checkStrength = () => {
  let s = 0
  if (newPassword.value.length >= 8) s++
  if (/\d/.test(newPassword.value)) s++
  if (/[a-zA-Z]/.test(newPassword.value)) s++
  if (/[^a-zA-Z0-9]/.test(newPassword.value)) s++
  strength.value = s
}

const strengthText = computed(() => {
  const arr = ['弱', '弱', '中', '强', '很强']
  return arr[strength.value >= 0 && strength.value < arr.length ? strength.value : 0]
})
const strengthClass = computed(() => {
  const arr = ['weak', 'weak', 'medium', 'strong', 'very-strong']
  return arr[strength.value >= 0 && strength.value < arr.length ? strength.value : 0]
})

const canSubmit = computed(() => {
  return (
    otpCode.value.length >= 4 &&
    newPassword.value.length >= 8 &&
    /\d/.test(newPassword.value) &&
    /[a-zA-Z]/.test(newPassword.value) &&
    confirmPassword.value === newPassword.value
  )
})

const sendCode = async () => {
  if (countdown.value > 0) return
  try {
    const res = await authApi.sendOtp(props.email)
    if (res.success) {
      startTimer(COOLDOWN_SECONDS)
      ElMessage.success('验证码已发送, 请查收')
    } else {
      ElMessage.error(res.msg || '发送失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '发送失败')
  }
}

const handleSubmit = async () => {
  if (!canSubmit.value || loading.value) return
  loading.value = true
  
  try {
    const verifyRes = await authApi.verifyOtp(props.email, otpCode.value)
    if (!verifyRes.success) {
      ElMessage.error(verifyRes.msg || '验证码错误')
      loading.value = false
      return
    }

    const updateRes = await authApi.updatePassword(newPassword.value)
    if (updateRes.success) {
      ElMessage.success('密码更新成功')
      emit('close')
    } else {
      ElMessage.error(updateRes.msg || '修改失败')
    }
  } catch (e: any) {
    if (e.message?.toLowerCase().includes('different')) {
      ElMessage.error('新密码不能与旧密码相同')
    } else {
      ElMessage.error(e.message || '系统错误')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.captcha-row {
  display: flex;
  gap: 12px;
}

.send-code-btn {
  padding: 0 16px;
  white-space: nowrap;
  background: var(--primary-blue);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  height: 46px;
  transition: all 0.2s;
}
.send-code-btn:hover { background: var(--active-orange); }
.send-code-btn:disabled { 
  background: rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  cursor: not-allowed; 
}

.password-strength {
  font-size: 12px;
  color: #94A3B8;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.weak { color: #EF4444; font-weight: 600; }
.medium { color: #F59E0B; font-weight: 600; }
.strong, .very-strong { color: #10B981; font-weight: 600; }
</style>