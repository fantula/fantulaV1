<template>
  <BaseFormModal
    :visible="visible"
    title="更新密码"
    width="500px" 
    submit-text="确认更新"
    :loading="loading"
    :submit-disabled="!canSubmit"
    @close="handleClose"
    @submit="handleConfirm"
  >
    <div v-if="!email" class="alert-box">
      请先绑定邮箱，修改密码需要邮箱验证。
    </div>

    <template v-else>
      <div class="form-group">
        <label class="form-label">验证码</label>
        <div class="input-with-action">
          <input 
            v-model="form.code" 
            class="form-input" 
            placeholder="邮箱验证码"
            maxlength="6"
          />
          <button 
            class="send-code-btn" 
            :disabled="countdown > 0 || loading"
            @click="sendCode"
          >
            {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">新密码</label>
        <input 
          v-model="form.newPassword" 
          class="form-input" 
          type="password"
          placeholder="6-20位字符"
        />
      </div>

      <div class="form-group">
        <label class="form-label">确认密码</label>
        <input 
          v-model="form.confirmPassword" 
          class="form-input" 
          type="password"
          placeholder="再次输入新密码"
        />
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
  email?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
}>()

const loading = ref(false)
const countdown = ref(0)
let timerInterval: any = null

const TIMER_KEY = 'otp_change_pwd_timer_end'
const COOLDOWN_SECONDS = 300

const form = reactive({
  code: '',
  newPassword: '',
  confirmPassword: ''
})

const canSubmit = computed(() => {
  return form.code.length >= 4 && 
         form.newPassword.length >= 6 && 
         form.newPassword === form.confirmPassword
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
    form.code = ''
    form.newPassword = ''
    form.confirmPassword = ''
    restoreTimer()
  }
})

onMounted(() => { restoreTimer() })
onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const sendCode = async () => {
  if (!props.email) return
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

const handleConfirm = async () => {
  if (!canSubmit.value || !props.email) return
  
  loading.value = true
  try {
    // 1. 验证 OTP
    const verifyRes = await authApi.verifyOtp(props.email, form.code)
    if (!verifyRes.success) {
      ElMessage.error(verifyRes.msg || '验证码错误')
      loading.value = false
      return
    }

    // 2. 更新密码
    const updateRes = await authApi.updatePassword(form.newPassword)
    if (updateRes.success) {
      ElMessage.success('密码修改成功')
      handleClose()
    } else {
      ElMessage.error(updateRes.msg || '密码修改失败')
    }
  } catch (e: any) {
    console.error(e)
    ElMessage.error(e.message || '操作失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.alert-box {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
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
</style>