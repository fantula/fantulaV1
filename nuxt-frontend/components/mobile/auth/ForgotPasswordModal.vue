<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">找回密码</h3>
        <button class="close-btn" @click="handleClose">
            <Close class="w-5 h-5" />
        </button>
      </div>

      <div class="modal-body">
         <form @submit.prevent="handleSubmit">
            <div class="form-item">
                <label>邮箱地址</label>
                <EmailInput v-model="form.email" :required="true" placeholder="请输入注册邮箱" />
            </div>

            <div class="form-item">
                <label>验证码</label>
                <div class="input-row">
                    <input 
                        v-model="form.code" 
                        type="text" 
                        placeholder="请输入验证码"
                        maxlength="6"
                    />
                    <SendCodeButton 
                        :loading="loading" 
                        :countdown="countdown" 
                        @click="sendCode"
                        class="mobile-send-btn"
                    />
                </div>
            </div>

            <div class="form-item">
                <label>新密码</label>
                <input 
                    v-model="form.newPassword" 
                    type="password" 
                    placeholder="请输入新密码 (至少6位)"
                />
            </div>

            <button class="submit-btn full-width" type="submit" :disabled="loading || !canSubmit">
                <div v-if="loading" class="spinner"></div>
                <span v-else>重置密码</span>
            </button>
         </form>
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { ElMessage } from 'element-plus'
import EmailInput from '@/components/shared/EmailInput.vue'
import SendCodeButton from '@/components/shared/SendCodeButton.vue'
import { useSendCode } from '@/composables/client/useSendCode'
import { getSupabaseClient } from '@/utils/supabase'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close', 'success'])

const form = reactive({
  email: '',
  code: '',
  newPassword: ''
})

const { 
  loading: codeLoading, 
  countdown, 
  sendCode: sendOtp,
  checkTimer 
} = useSendCode({ timerKey: 'otp_forgot_timer_end' })

const baseLoading = ref(false)
const loading = computed(() => baseLoading.value || codeLoading.value)

const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
const canSubmit = computed(() => {
  return isValidEmail.value && form.code.length >= 4 && form.newPassword.length >= 6
})

watch(() => props.visible, (val) => {
  if (val) {
    checkTimer()
  }
})

const handleClose = () => {
    emit('close')
}

const sendCode = async () => {
    if (!isValidEmail.value) {
        ElMessage.warning('请输入有效的邮箱地址')
        return
    }
    await sendOtp(form.email)
}

const handleSubmit = async () => {
  if (!canSubmit.value) return
  
  baseLoading.value = true
  try {
    const res = await authApi.resetPasswordWithOtp({
      email: form.email,
      code: form.code,
      password: form.newPassword
    })

    if (res.success) {
      ElMessage.success('密码重置成功，已自动登录')
      
      const userRes = await authApi.getUserInfo()
      if (userRes.success) {
         const session = await getSupabaseClient().auth.getSession()
         useUserStore().setUser(userRes.data, session.data.session?.access_token || '')
         emit('success')
         handleClose()
         setTimeout(() => location.reload(), 500)
      } else {
         emit('close')
         ElMessage.success('密码重置成功，请重新登录')
      }
    } else {
      ElMessage.error(res.msg || '重置失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '重置失败')
  } finally {
    baseLoading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
    z-index: 20000;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
}

.modal-content {
    background: var(--cyber-bg-glass, rgba(15, 23, 42, 0.9));
    width: 100%; max-width: 340px;
    border-radius: 20px; padding: 24px;
    border: 1px solid var(--cyber-border, rgba(6, 182, 212, 0.3));
    box-shadow: 0 0 30px rgba(6, 182, 212, 0.15), 0 10px 40px rgba(0,0,0,0.5);
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    backdrop-filter: blur(20px);
}

@keyframes popIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.modal-title { 
    font-size: 18px; font-weight: 700; color: #fff; margin: 0; 
    text-shadow: 0 0 10px rgba(255,255,255,0.2);
}
.close-btn { 
    background: none; border: none; color: #94A3B8; padding: 4px; 
    cursor: pointer; transition: color 0.2s;
}
.close-btn:hover { color: #fff; }

.form-item { margin-bottom: 16px; }
.form-item label { display: block; font-size: 13px; color: #94A3B8; margin-bottom: 8px; font-weight: 500; }
.form-item input {
    width: 100%; height: 48px; 
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
    padding: 0 16px; color: #fff; font-size: 16px;
    transition: all 0.2s;
}
.form-item input:focus {
    border-color: #00FFFF;
    background: rgba(15, 23, 42, 0.9);
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
    outline: none;
}

.input-row { display: flex; gap: 10px; }
/* Override SendCodeButton styles for mobile fit */
:deep(.mobile-send-btn) {
    height: 48px !important;
    border-radius: 12px !important;
}

.submit-btn {
    width: 100%; height: 48px; margin-top: 20px;
    background: var(--cyber-gradient-btn, linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%));
    color: #fff; border-radius: 12px; border: none; font-weight: 600; font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
    cursor: pointer; transition: all 0.2s;
}
.submit-btn:active { transform: scale(0.96); box-shadow: 0 2px 8px rgba(6, 182, 212, 0.2); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(0.5); }
.full-width { width: 100%; }

.spinner {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
