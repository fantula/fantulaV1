<template>
  <BaseFormModal
    :visible="visible"
    title="更新密码"
    width="500px" 
    submit-text="确认更新"
    :loading="loading"
    :submit-disabled="!canSubmit"
    confirm-theme-id="suit-001-primary"
    cancel-theme-id="suit-001-secondary"
    @close="handleClose"
    @submit="handleConfirm"
  >
    <div v-if="!email" class="alert-box">
      请先绑定邮箱，修改密码需要邮箱验证。
    </div>

    <template v-else>
      <div class="form-group">
        <label class="form-label">验证码</label>
        <div class="input-with-action relative-input-group">
          <input 
            v-model="form.code" 
            class="form-input" 
            placeholder="邮箱验证码"
            maxlength="6"
          />
          <SendCodeButton 
            :loading="loading"
            :countdown="countdown"
            @click="sendCode"
          />
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
import { ref, computed, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { authApi } from '@/api/client/auth'
import BaseFormModal from '@/components/pc/modal/base/BaseFormModal.vue'
import SendCodeButton from '@/components/shared/SendCodeButton.vue'
import { useSendCode } from '@/composables/client/useSendCode'

const props = defineProps<{
  visible: boolean
  email?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
}>()

const { 
  loading: codeLoading, 
  countdown, 
  sendCode: sendOtp,
  checkTimer 
} = useSendCode({ timerKey: 'otp_security_timer' })

const baseLoading = ref(false)
const loading = computed(() => baseLoading.value || codeLoading.value)

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

watch(() => props.visible, (val) => {
  if (val) {
    form.code = ''
    form.newPassword = ''
    form.confirmPassword = ''
    checkTimer() // Model opened, sync timer
  }
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const sendCode = async () => {
  if (!props.email) return
  await sendOtp(props.email)
}

const handleConfirm = async () => {
  if (!canSubmit.value || !props.email) return
  
  baseLoading.value = true
  try {
    // 1. 验证 OTP
    const verifyRes = await authApi.verifyOtp(props.email, form.code)
    if (!verifyRes.success) {
      ElMessage.error(verifyRes.msg || '验证码错误')
      baseLoading.value = false
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
    if (import.meta.dev) console.error(e)
    ElMessage.error(e.message || '操作失败')
  } finally {
    baseLoading.value = false
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
  position: relative;
  display: block; /* Was flex, now block for absolute child */
}

</style>