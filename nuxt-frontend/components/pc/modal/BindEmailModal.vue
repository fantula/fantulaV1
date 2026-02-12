<template>
  <BaseFormModal
    :visible="visible"
    title="绑定/换绑邮箱"
    width="500px"
    submit-text="确认绑定"
    :loading="loading"
    :submit-disabled="!canSubmit"
    confirm-theme-id="suit-001-primary"
    cancel-theme-id="suit-001-secondary"
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
        <div class="input-with-action relative-input-group">
          <input 
            v-model="oldCode" 
            class="form-input" 
            placeholder="请输入验证码"
            maxlength="6"
          />
          <SendCodeButton 
            :loading="loading"
            :countdown="countdown"
            @click="sendOldCode"
          />
        </div>
      </div>
      
      <div class="step-actions">
        <BaseButton themeId="primary" block @click="verifyOldEmail" :disabled="loading || oldCode.length < 4">
          下一步
        </BaseButton>
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
        <div class="input-with-action relative-input-group">
          <input 
            v-model="form.code" 
            class="form-input" 
            placeholder="新邮箱验证码"
            maxlength="6"
          />
          <SendCodeButton 
            :loading="loading"
            :countdown="countdown"
            :disabled="!isEmailValid"
            @click="sendNewCode"
          />
        </div>
      </div>
    </template>
  </BaseFormModal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { authApi } from '@/api/client/auth'
import BaseFormModal from '@/components/pc/modal/base/BaseFormModal.vue'
import SendCodeButton from '@/components/shared/SendCodeButton.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { useSendCode } from '@/composables/client/useSendCode'

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

// 1. Old Email Timer
const { 
  loading: oldLoading, 
  countdown: oldCountdown, 
  sendCode: sendOldOtp,
  checkTimer 
} = useSendCode({ timerKey: 'otp_security_timer' })

// 2. New Email Timer
const { 
  loading: newLoading, 
  countdown: newCountdown, 
  sendCode: sendNewOtp 
} = useSendCode({ timerKey: 'otp_bind_new_timer_end' })

const baseLoading = ref(false)
const loading = computed(() => baseLoading.value || oldLoading.value || newLoading.value)
const countdown = computed(() => step.value === 1 ? oldCountdown.value : newCountdown.value)

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

watch(() => props.visible, (val) => {
  if (val) {
    step.value = props.currentEmail ? 1 : 2
    oldCode.value = ''
    form.email = ''
    form.code = ''
    checkTimer() // Sync timer
  }
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

// 发送旧邮箱验证码
const sendOldCode = async () => {
  if (!props.currentEmail) return
  await sendOldOtp(props.currentEmail)
}

// 验证旧邮箱
const verifyOldEmail = async () => {
  if (!props.currentEmail || !oldCode.value) return
  baseLoading.value = true
  try {
    const res = await authApi.verifyOtp(props.currentEmail, oldCode.value)
    if (res.success) {
      ElMessage.success('当前邮箱验证通过')
      step.value = 2
    } else {
      ElMessage.error(res.msg || '验证码错误')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '验证失败')
  } finally {
    baseLoading.value = false
  }
}

// 发送新邮箱验证码
const sendNewCode = async () => {
  if (!isEmailValid.value) return
  
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

  await sendNewOtp(form.email)
}

// 最终提交：验证新邮箱并换绑
const handleConfirm = async () => {
  if (!canSubmit.value) return
  
  baseLoading.value = true
  try {
    // 1. Verify new email OTP
    const verifyRes = await authApi.verifyOtp(form.email, form.code)
    if (!verifyRes.success) {
      ElMessage.error(verifyRes.msg || '验证码错误')
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
    baseLoading.value = false
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

.relative-input-group {
  position: relative;
}
/* SendCodeButton is absolute, so we remove flex gap logic for it within this group if we move to absolute */
/* However, input-with-action was display: flex. 
   If SendCodeButton is absolute, input should take full width.
*/
.input-with-action {
  display: block; /* Change from flex to block for absolute positioning context */
}

/* Cleanup old buttons if unused */

</style>
