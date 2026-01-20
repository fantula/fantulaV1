<template>
  <BaseModal
    :visible="true"
    title="注销账号"
    :show-footer="false"
    @close="$emit('close')"
  >
    <div class="warning-box">
      <span class="warning-icon">⚠️</span>
      <div class="warning-content">
        警告：账号注销是不可恢复的操作。所有个人数据、订单记录和资产将被永久删除。
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">邮箱验证</label>
      <div class="captcha-row">
        <input v-model="otpCode" type="text" class="form-input" placeholder="请输入验证码" />
        <button 
          class="send-code-btn" 
          :disabled="countdown > 0 || loading" 
          @click="sendCode"
        >
          {{ countdown > 0 ? `${countdown}s后重发` : '获取验证码' }}
        </button>
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
      <button class="base-modal-cancel" @click="$emit('close')">取消</button>
      <button 
        class="delete-btn" 
        :disabled="!isConfirmed || !otpCode || loading" 
        @click="handleDelete"
      >
        {{ loading ? '处理中...' : '确认注销' }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { authApi } from '@/api/auth'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  email: string
}>()

const emit = defineEmits(['close', 'confirm'])

const isConfirmed = ref(false)
const otpCode = ref('')
const loading = ref(false)
const countdown = ref(0)
let timerInterval: any = null

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
      ElMessage.success('验证码已发送')
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

const handleDelete = async () => {
  if (!isConfirmed.value || !otpCode.value) return
  
  loading.value = true
  try {
    const verifyRes = await authApi.verifyOtp(props.email, otpCode.value)
    if (!verifyRes.success) {
      ElMessage.error(verifyRes.msg || '验证码错误')
      loading.value = false
      return
    }

    emit('confirm')
  } catch (e: any) {
    ElMessage.error(e.message || '验证失败')
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

.captcha-row {
  display: flex;
  gap: 12px;
}

.send-code-btn {
  padding: 0 16px;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #94A3B8;
  font-size: 13px;
  cursor: pointer;
  height: 46px;
  transition: all 0.2s;
}
.send-code-btn:hover { 
  background: rgba(255, 255, 255, 0.1); 
  color: #fff;
}
.send-code-btn:disabled { 
  opacity: 0.5; 
  cursor: not-allowed; 
}

.confirmation-area {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #CBD5E1;
  user-select: none;
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  accent-color: #EF4444;
}

.delete-btn {
  padding: 10px 24px;
  background: #EF4444;
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.delete-btn:disabled {
  background: #4B5563;
  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.5;
}

.delete-btn:not(:disabled):hover {
  background: #DC2626;
  transform: translateY(-1px);
}
</style>
