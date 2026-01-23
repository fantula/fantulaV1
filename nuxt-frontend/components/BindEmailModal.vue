<template>
  <BaseFormModal
    :visible="visible"
    title="换绑邮箱"
    width="500px"
    show-mascot
    mascot-position="bottom"
    :cancel-text="cancelText"
    :submit-text="submitText"
    :loading="loading"
    :submit-disabled="submitDisabled"
    @close="$emit('close')"
    @submit="handleStepSubmit"
  >
    <!-- Step 1: 验证当前邮箱 -->
    <div v-if="step === 1" class="step-content">
      <div class="step-indicator">
        <span class="step-badge active">1</span>
        <span class="step-line"></span>
        <span class="step-badge">2</span>
      </div>
      <p class="step-title">验证当前邮箱</p>
      <p class="step-desc">为确保账号安全，请先验证您的当前邮箱</p>
      
      <div class="form-group">
        <label class="form-label">当前邮箱</label>
        <input :value="currentEmail" type="email" class="form-input" disabled />
      </div>

      <div class="form-group code-group-wrapper">
        <label class="form-label">验证码</label>
        <div class="code-group-inner">
          <input 
            v-model="currentCode" 
            type="text" 
            class="form-input code-input" 
            placeholder="请输入验证码" 
            maxlength="6" 
            inputmode="numeric"
            autocomplete="off"
            @input="currentCode = currentCode.replace(/\D/g, '')"
          />
          <SendCodeButton 
            :loading="loading" 
            :countdown="countdown" 
            @click="sendCurrentEmailCode"
          />
        </div>
      </div>
      
      <div class="form-tip">验证码将发送至: {{ currentEmail }}</div>
    </div>

    <!-- Step 2: 输入新邮箱 -->
    <div v-if="step === 2" class="step-content">
      <div class="step-indicator">
        <span class="step-badge done">✓</span>
        <span class="step-line done"></span>
        <span class="step-badge active">2</span>
      </div>
      <p class="step-title">设置新邮箱</p>
      <p class="step-desc">输入您要绑定的新邮箱地址</p>
      
      <div class="form-group">
        <label class="form-label">新邮箱地址</label>
        <EmailInput v-model="newEmail" placeholder="请输入新邮箱" />
      </div>

      <div class="info-box">
        <span class="info-icon">ℹ️</span>
        <span>确认后，系统将向新邮箱发送确认链接，点击链接即可完成换绑</span>
      </div>
    </div>
  </BaseFormModal>
</template>

<script setup lang="ts">
import BaseFormModal from '@/components/modal/base/BaseFormModal.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { authApi } from '@/api/auth'
import { CLIENT_MESSAGES } from '@/utils/clientMessages'
import EmailInput from '@/components/base/EmailInput.vue'
import SendCodeButton from '@/components/base/SendCodeButton.vue'

const props = defineProps<{
  visible?: boolean
  currentEmail?: string
}>()

const emit = defineEmits(['close', 'confirm'])

const step = ref(1)
const currentCode = ref('')
const newEmail = ref('')
const countdown = ref(0)
const loading = ref(false)
let timerInterval: any = null

const cancelText = computed(() => '取消')
// Dynamic submit text based on step
const submitText = computed(() => {
  if (loading.value) return step.value === 1 ? '验证中...' : '提交中...'
  return step.value === 1 ? '下一步' : '确认换绑'
})

const submitDisabled = computed(() => {
  if (step.value === 1) return !currentCode.value || currentCode.value.length < 4 || loading.value
  return !isValidEmail.value || loading.value
})

const handleStepSubmit = () => {
  if (step.value === 1) {
    verifyCurrentEmail()
  } else {
    handleConfirm()
  }
}

const TIMER_KEY = 'otp_change_email_timer_end'
const COOLDOWN_SECONDS = 300 

const isValidEmail = computed(() => {
  return newEmail.value && 
         newEmail.value.includes('@') && 
         newEmail.value !== props.currentEmail
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

onMounted(() => { restoreTimer() })
onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })

async function sendCurrentEmailCode() {
  if (!props.currentEmail || countdown.value > 0 || loading.value) return
  loading.value = true

  try {
    const res = await authApi.sendOtp(props.currentEmail)
    if (res.success) {
      ElMessage.success(CLIENT_MESSAGES.EMAIL_MODAL.CODE_SENT)
      startTimer(COOLDOWN_SECONDS)
    } else {
      ElMessage.error(res.msg || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL)
    }
  } catch (e: any) {
    ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.SEND_FAIL)
  } finally {
    loading.value = false
  }
}

async function verifyCurrentEmail() {
  if (!currentCode.value || currentCode.value.length < 4 || loading.value) return
  loading.value = true

  try {
    const res = await authApi.verifyOtp(props.currentEmail!, currentCode.value)
    if (res.success) {
      ElMessage.success(CLIENT_MESSAGES.EMAIL_MODAL.VERIFY_SUCCESS)
      step.value = 2
    } else {
      ElMessage.error(res.msg || CLIENT_MESSAGES.PASSWORD_MODAL.VERIFY_FAIL)
    }
  } catch (e: any) {
    ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.VERIFY_FAIL)
  } finally {
    loading.value = false
  }
}

async function handleConfirm() {
  if (!isValidEmail.value || loading.value) return
  
  if (newEmail.value === props.currentEmail) {
    ElMessage.error(CLIENT_MESSAGES.EMAIL_MODAL.SAME_EMAIL)
    return
  }
  
  loading.value = true

  try {
    const checkRes = await authApi.checkEmailAvailable(newEmail.value)
    if (!checkRes.success) {
      ElMessage.error(CLIENT_MESSAGES.EMAIL_MODAL.EMAIL_OCCUPIED)
      loading.value = false
      return
    }

    const res = await authApi.updateEmail(newEmail.value)
    if (res.success) {
      ElMessage.success(CLIENT_MESSAGES.EMAIL_MODAL.CONFIRM_SENT)
      emit('confirm', newEmail.value)
      emit('close')
    } else {
      ElMessage.error(res.msg || '换绑失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '换绑失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.step-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.step-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.05);
  color: #64748B;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.step-badge.active {
  background: linear-gradient(135deg, var(--primary-blue), #2563eb);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
  transform: scale(1.1);
}

.step-badge.done {
  background: rgba(16, 185, 129, 0.2);
  color: #10B981;
  border-color: rgba(16, 185, 129, 0.3);
}

.step-line {
  width: 40px;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  transition: all 0.3s;
}
.step-line.done {
  background: #10B981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
}

.step-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-align: center;
  letter-spacing: -0.5px;
}

.step-desc {
  font-size: 13px;
  color: #94A3B8;
  margin: 0;
  text-align: center;
}

.code-group-wrapper {
  position: relative;
}

.code-group-inner {
  position: relative;
  width: 100%;
}

.code-input {
  padding-right: 120px !important; /* Make room for button */
}



.info-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  
  /* Glass Info Box */
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 14px;
  
  font-size: 13px;
  color: #CBD5E1;
  line-height: 1.5;
  box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.05);
}

.info-icon {
  font-size: 18px;
  flex-shrink: 0;
  filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.4));
}

</style>
