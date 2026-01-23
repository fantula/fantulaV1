<template>
  <BaseFormModal
    :visible="visible"
    title="更新密码"
    width="500px" 
    submit-text="确认更新"
    :loading="loading"
    :submit-disabled="!canSubmit"
    theme-id="suit-001"
    @close="$emit('close')"
    @update:visible="$emit('update:visible', $event)"
    @submit="handleSubmit"
  >
    <div class="form-group code-group-wrapper">
      <label class="form-label">邮箱验证码</label>
      <div class="code-group-inner">
        <input 
          type="text" 
          v-model="otpCode" 
          class="form-input code-input" 
          placeholder="请输入验证码" 
          maxlength="6" 
          inputmode="numeric"
          autocomplete="off"
          @input="otpCode = otpCode.replace(/\D/g, '')"
        />
        <SendCodeButton 
          :loading="loading" 
          :countdown="countdown" 
          @click="sendCode"
        />
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
        autocomplete="new-password"
      />
      <div class="password-strength" v-if="newPassword">
        强度: <span :class="strengthClass">{{ strengthText }}</span>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">确认新密码</label>
      <input 
        v-model="confirmPassword" 
        type="password" 
        class="form-input" 
        placeholder="请再次输入新密码" 
        autocomplete="new-password"
      />
    </div>
  </BaseFormModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import BaseFormModal from '@/components/modal/base/BaseFormModal.vue'
import { authApi } from '@/api/auth'
import { ElMessage } from 'element-plus'
import { CLIENT_MESSAGES } from '@/utils/clientMessages'
import SendCodeButton from '@/components/base/SendCodeButton.vue'

const props = defineProps<{
  visible?: boolean
  email: string
}>()

const emit = defineEmits(['close', 'update:visible'])

const otpCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const strength = ref(0)
const loading = ref(false)
const countdown = ref(0)
let timerInterval: any = null

watch(() => props.visible, (val) => {
  if (val) {
    otpCode.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    strength.value = 0
  }
})

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
  if (countdown.value > 0 || loading.value) return
  loading.value = true // Fix: Disable immediately
  try {
    const res = await authApi.sendOtp(props.email)
    if (res.success) {
      startTimer(COOLDOWN_SECONDS)
      ElMessage.success(CLIENT_MESSAGES.PASSWORD_MODAL.CODE_SENT)
    } else {
      ElMessage.error(res.msg || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL)
    }
  } catch (e: any) {
    ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL)
  } finally {
    loading.value = false // Fix: Re-enable
  }
}

const handleSubmit = async () => {
  if (!canSubmit.value || loading.value) return
  loading.value = true
  
  try {
    const verifyRes = await authApi.verifyOtp(props.email, otpCode.value)
    if (!verifyRes.success) {
      ElMessage.error(verifyRes.msg || CLIENT_MESSAGES.PASSWORD_MODAL.VERIFY_FAIL)
      loading.value = false
      return
    }

    const updateRes = await authApi.updatePassword(newPassword.value)
    if (updateRes.success) {
      ElMessage.success(CLIENT_MESSAGES.PASSWORD_MODAL.SUCCESS)
      emit('close')
    } else {
      ElMessage.error(updateRes.msg || CLIENT_MESSAGES.PASSWORD_MODAL.FAIL)
    }
  } catch (e: any) {
    if (e.message?.toLowerCase().includes('different')) {
      ElMessage.error(CLIENT_MESSAGES.PASSWORD_MODAL.SAME_PASSWORD)
    } else {
      ElMessage.error(e.message || CLIENT_MESSAGES.GLOBAL.UNKNOWN_ERROR)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.code-group-wrapper {
  position: relative;
}
.code-group-inner {
  position: relative;
  width: 100%;
}
.code-input {
  padding-right: 120px !important;
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