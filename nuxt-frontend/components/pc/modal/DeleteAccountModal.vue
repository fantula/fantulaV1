<template>
  <BaseModal
    :visible="visible"
    title="注销账号"
    width="500px"
    :show-footer="false"
    theme-id="suit-001"
    @close="$emit('close')"
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="warning-box">
      <span class="warning-icon">⚠️</span>
      <div class="warning-content">
        警告：账号注销是不可恢复的操作。所有个人数据、订单记录和资产将被永久删除。
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">邮箱验证</label>
      <div class="captcha-row relative-input-group">
        <input 
          v-model="otpCode" 
          type="text" 
          class="form-input" 
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
      <p class="form-tip">为了您的资产安全，请验证邮箱: {{ email }}</p>
    </div>
    
    <div class="confirmation-area">
      <label class="checkbox-label">
        <input type="checkbox" v-model="isConfirmed" />
        <span>我已了解风险，确认注销当前账号</span>
      </label>
    </div>

    <template #footer>
      <BaseButton themeId="secondary" @click="$emit('close')">取消</BaseButton>
      <BaseButton 
        themeId="destructive" 
        :disabled="!isConfirmed || !otpCode || loading" 
        :loading="loading"
        @click="handleDelete"
      >
        {{ loading ? '处理中...' : '确认注销' }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { authApi } from '@/api/client/auth'
import { ElMessage } from 'element-plus'
import { CLIENT_MESSAGES } from '@/utils/clientMessages'
import BaseButton from '@/components/shared/BaseButton.vue'
import SendCodeButton from '@/components/shared/SendCodeButton.vue'

const props = defineProps<{
  visible?: boolean
  email: string
}>()

const emit = defineEmits(['close', 'confirm', 'update:visible'])

const isConfirmed = ref(false)
const otpCode = ref('')
const loading = ref(false)
const countdown = ref(0)
let timerInterval: any = null

watch(() => props.visible, (val) => {
  if (val) {
    isConfirmed.value = false
    otpCode.value = ''
  }
})

const TIMER_KEY = 'otp_delete_timer_end'
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

const sendCode = async () => {
  if (countdown.value > 0) return
  loading.value = true
  try {
    const res = await authApi.sendOtp(props.email)
    if (res.success) {
      ElMessage.success(CLIENT_MESSAGES.DELETE_MODAL.CODE_SENT)
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

const handleDelete = async () => {
  if (!isConfirmed.value || !otpCode.value) return
  
  loading.value = true
  try {
    const verifyRes = await authApi.verifyOtp(props.email, otpCode.value)
    if (!verifyRes.success) {
      ElMessage.error(verifyRes.msg || CLIENT_MESSAGES.DELETE_MODAL.CODE_ERROR)
      loading.value = false
      return
    }

    emit('confirm')
  } catch (e: any) {
    ElMessage.error(e.message || CLIENT_MESSAGES.PASSWORD_MODAL.VERIFY_FAIL)
    loading.value = false
  }
}
</script>

<style scoped>
.warning-box {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  padding: 16px;
  color: #EF4444;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.warning-icon {
  font-size: 20px;
}

.warning-content {
  font-size: 14px;
  line-height: 1.5;
  color: #FCA5A5;
}

.relative-input-group {
  position: relative;
  display: block; /* SendCodeButton is absolute inside */
}

/* Removed legacy .send-code-btn, .delete-btn styles */
</style>
