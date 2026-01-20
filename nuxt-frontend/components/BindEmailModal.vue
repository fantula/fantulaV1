<template>
  <BaseModal
    :visible="true"
    title="换绑邮箱"
    width="440px"
    :show-footer="false"
    @close="$emit('close')"
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

      <div class="form-group">
        <label class="form-label">验证码</label>
        <div class="captcha-row">
          <input v-model="currentCode" type="text" class="form-input" placeholder="请输入验证码" maxlength="6" />
          <button 
            class="send-code-btn" 
            :disabled="countdown > 0 || loading"
            @click="sendCurrentEmailCode"
          >
            {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
          </button>
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
        <input v-model="newEmail" type="email" class="form-input" placeholder="请输入新邮箱" />
      </div>

      <div class="info-box">
        <span class="info-icon">ℹ️</span>
        <span>确认后，系统将向新邮箱发送确认链接，点击链接即可完成换绑</span>
      </div>
    </div>

    <!-- Custom Footer -->
    <template #footer>
      <button class="base-modal-cancel" @click="$emit('close')">取消</button>
      <button 
        v-if="step === 1"
        class="base-modal-confirm" 
        @click="verifyCurrentEmail" 
        :disabled="!currentCode || currentCode.length < 4 || loading"
      >
        {{ loading ? '验证中...' : '下一步' }}
      </button>
      <button 
        v-if="step === 2"
        class="base-modal-confirm" 
        @click="handleConfirm" 
        :disabled="!isValidEmail || loading"
      >
        {{ loading ? '处理中...' : '确认换绑' }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { authApi } from '@/api/auth'

const props = defineProps<{
  currentEmail?: string
}>()

const emit = defineEmits(['close', 'confirm'])

const step = ref(1)
const currentCode = ref('')
const newEmail = ref('')
const countdown = ref(0)
const loading = ref(false)
let timerInterval: any = null

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

async function verifyCurrentEmail() {
  if (!currentCode.value || currentCode.value.length < 4 || loading.value) return
  loading.value = true

  try {
    const res = await authApi.verifyOtp(props.currentEmail!, currentCode.value)
    if (res.success) {
      ElMessage.success('验证成功')
      step.value = 2
    } else {
      ElMessage.error(res.msg || '验证码错误')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '验证失败')
  } finally {
    loading.value = false
  }
}

async function handleConfirm() {
  if (!isValidEmail.value || loading.value) return
  
  if (newEmail.value === props.currentEmail) {
    ElMessage.error('新邮箱不能与当前邮箱相同')
    return
  }
  
  loading.value = true

  try {
    const checkRes = await authApi.checkEmailAvailable(newEmail.value)
    if (!checkRes.success) {
      ElMessage.error('该邮箱已被注册，无法绑定')
      loading.value = false
      return
    }

    const res = await authApi.updateEmail(newEmail.value)
    if (res.success) {
      ElMessage.success('确认邮件已发送到新邮箱，请查收并点击确认链接完成换绑')
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
  gap: 16px;
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.step-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  color: #64748B;
  transition: all 0.3s;
}
.step-badge.active {
  background: var(--primary-blue);
  color: #fff;
}
.step-badge.done {
  background: #10B981;
  color: #fff;
}

.step-line {
  width: 40px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}
.step-line.done {
  background: #10B981;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  text-align: center;
}

.step-desc {
  font-size: 13px;
  color: #64748B;
  margin: 0;
  text-align: center;
}

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

.info-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  font-size: 13px;
  color: #94A3B8;
  line-height: 1.5;
}

.info-icon {
  font-size: 16px;
  flex-shrink: 0;
}
</style>
