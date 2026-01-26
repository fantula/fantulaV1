<template>
  <BaseFormModal
    :visible="visible"
    title="绑定/换绑邮箱"
    width="500px"
    submit-text="确认绑定"
    :loading="loading"
    :submit-disabled="!canSubmit"
    @close="handleClose"
    @submit="handleConfirm"
  >
    <!-- Step 1: 验证当前邮箱 (仅当存在当前邮箱时) -->
    <template v-if="currentEmail && step === 1">
      <div class="alert-box">
        为了您的账号安全，请先验证当前邮箱。
      </div>
      
      <div class="form-group">
        <label class="form-label">当前邮箱</label>
        <input :value="currentEmail" class="form-input" disabled />
      </div>

      <div class="form-group">
        <label class="form-label">验证码</label>
        <div class="input-with-action">
          <input 
            v-model="oldCode" 
            class="form-input" 
            placeholder="请输入验证码"
            maxlength="6"
          />
          <button 
            class="send-code-btn" 
            :disabled="countdown > 0 || loading"
            @click="sendOldCode"
          >
            {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
          </button>
        </div>
      </div>
      
      <div class="step-actions">
        <button class="primary-btn full-width" @click="verifyOldEmail" :disabled="loading || oldCode.length < 4">
          下一步
        </button>
      </div>
    </template>

    <!-- Step 2: 绑定新邮箱 (或者如果没有旧邮箱，直接显示此步骤) -->
    <template v-else>
      <div class="form-group">
        <label class="form-label">新邮箱地址</label>
        <input 
          v-model="form.email" 
          class="form-input" 
          placeholder="请输入新邮箱"
          type="email"
        />
      </div>

      <div class="form-group">
        <label class="form-label">验证码</label>
        <div class="input-with-action">
          <input 
            v-model="form.code" 
            class="form-input" 
            placeholder="新邮箱验证码"
            maxlength="6"
          />
          <button 
            class="send-code-btn" 
            :disabled="countdown > 0 || loading || !isEmailValid"
            @click="sendNewCode"
          >
            {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
          </button>
        </div>
      </div>
    </template>
  </BaseFormModal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { authApi } from '@/api/client/auth'
import BaseFormModal from '@/components/pc/modal/base/BaseFormModal.vue'

const props = defineProps<{
  visible: boolean
  currentEmail?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
  (e: 'success', email: string): void
}>()

const step = ref(1)
const loading = ref(false)
const countdown = ref(0)
let timerInterval: any = null

const TIMER_KEY = 'otp_bind_email_timer_end'
const COOLDOWN_SECONDS = 300

// 旧邮箱验证码
const oldCode = ref('')

// 新邮箱表单
const form = reactive({
  email: '',
  code: ''
})

const isEmailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
})

const canSubmit = computed(() => {
  if (props.currentEmail && step.value === 1) return false // Step 1 use custom button
  return isEmailValid.value && form.code.length >= 4
})

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

watch(() => props.visible, (val) => {
  if (val) {
    step.value = props.currentEmail ? 1 : 2
    oldCode.value = ''
    form.email = ''
    form.code = ''
    restoreTimer()
  } else {
    // Clear timer on close if desired, BUT user asked for standard logic like DeleteAccount
    // DeleteAccount maintains timer even if closed? 
    // Usually persistence means it survives close/refresh.
    // So we DON'T clear it here.
  }
})

onMounted(() => { restoreTimer() })
onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

// 发送旧邮箱验证码
const sendOldCode = async () => {
  if (!props.currentEmail) return
  if (countdown.value > 0) return

  loading.value = true
  try {
    const res = await authApi.sendOtp(props.currentEmail)
    if (res.success) {
      ElMessage.success('验证码已发送到当前邮箱')
      startTimer(COOLDOWN_SECONDS)
    } else {
      ElMessage.error(res.msg || '发送失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '发送失败')
  } finally {
    loading.value = false
  }
}

// 验证旧邮箱
const verifyOldEmail = async () => {
  if (!props.currentEmail || !oldCode.value) return
  loading.value = true
  try {
    const res = await authApi.verifyOtp(props.currentEmail, oldCode.value)
    if (res.success) {
      ElMessage.success('当前邮箱验证通过')
      step.value = 2
      // Reset logic for step 2? 
      // Usually verification codes are separate. 
      // If we use the SAME timer for both steps, it's confusing.
      // But typically "Send Code" is one global throttling action.
      // Let's assume the timer applies to ANY code sending action for this modal context.
      // Or we should clear it? 
      // If step 2 requires sending a NEW code to NEW email, we should probably allow it?
      // Logic: Changing target email usually resets throttle or has separate throttle.
      // For simplicity and user request "like DeleteAccount", let's keep it shared or reset if logical.
      // Step 2 needs code for NEW email. 
      // Let's reset timer for Step 2 so user can send code to new email immediately.
      clearInterval(timerInterval)
      localStorage.removeItem(TIMER_KEY)
      countdown.value = 0
    } else {
      ElMessage.error(res.msg || '验证码错误')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '验证失败')
  } finally {
    loading.value = false
  }
}

// 发送新邮箱验证码
const sendNewCode = async () => {
  if (!isEmailValid.value) return
  if (countdown.value > 0) return
  
  // 检查邮箱是否已被占用
  try {
    const checkRes = await authApi.checkEmailAvailable(form.email)
    if (!checkRes.success) {
      ElMessage.error('该邮箱已被注册')
      return
    }
  } catch (e) {
    // ignore
  }

  loading.value = true
  try {
    const res = await authApi.sendOtp(form.email)
    if (res.success) {
      ElMessage.success('验证码已发送到新邮箱')
      startTimer(COOLDOWN_SECONDS)
    } else {
      ElMessage.error(res.msg || '发送失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '发送失败')
  } finally {
    loading.value = false
  }
}

// 最终提交：验证新邮箱并换绑
const handleConfirm = async () => {
  if (!canSubmit.value) return
  
  loading.value = true
  try {
    // 1. Verify new email OTP
    const verifyRes = await authApi.verifyOtp(form.email, form.code)
    if (!verifyRes.success) {
      ElMessage.error(verifyRes.msg || '验证码错误')
      loading.value = false
      return
    }

    // 2. Update Email
    const updateRes = await authApi.updateEmail(form.email)
    if (updateRes.success) {
      ElMessage.success('绑定成功，请去新邮箱查收确认邮件')
      emit('success', form.email)
      handleClose()
    } else {
      ElMessage.error(updateRes.msg || '绑定失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.alert-box {
  background: rgba(59, 130, 246, 0.1);
  color: #60A5FA;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0 12px;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-input:focus {
  border-color: #3B82F6;
  background: rgba(59, 130, 246, 0.05);
}

.input-with-action {
  display: flex;
  gap: 12px;
}

.send-code-btn {
  height: 44px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  transition: all 0.3s;
}

.send-code-btn:hover:not(:disabled) {
  border-color: #3B82F6;
  color: #3B82F6;
}

.send-code-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-actions {
  margin-top: 10px;
}

.primary-btn {
  height: 44px;
  background: #3B82F6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-btn.full-width {
  width: 100%;
}

.primary-btn:hover:not(:disabled) {
  background: #2563EB;
}

.primary-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
