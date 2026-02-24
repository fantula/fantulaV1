<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content aurora-modal-panel">
      <div class="modal-header">
        <h3 class="modal-title">{{ step === 1 && currentEmail ? '验证原邮箱' : '绑定新邮箱' }}</h3>
        <button class="close-btn" @click="handleClose">
            <Close class="w-5 h-5" />
        </button>
      </div>

      <div class="modal-body">
         <!-- Step 1: Verify Old Email -->
         <template v-if="currentEmail && step === 1">
            <div class="alert-box">
                为了您的账号安全，请先验证当前邮箱。
            </div>
            
            <div class="form-item">
                <label>当前邮箱</label>
                <input :value="currentEmail" disabled class="aurora-input disabled-input" style="color: #94A3B8;" />
            </div>

            <div class="form-item">
                <label>验证码</label>
                <div class="input-row">
                    <input 
                        v-model="oldCode" 
                        type="text" 
                        class="aurora-input"
                        placeholder="请输入验证码"
                        maxlength="6"
                    />
                    <button 
                        class="code-btn gap-1" 
                        style="display: flex; align-items: center; justify-content: center;"
                        @click="handleSendCode1" 
                        :disabled="countdown > 0 || sendingCode1"
                    >
                        <span v-if="sendingCode1" class="btn-spinner spinner-mini"></span>
                        <span>{{ countdown > 0 ? `${countdown}s` : '发送验证码' }}</span>
                    </button>
                </div>
            </div>

            <button class="aurora-btn-primary gap-2" @click="verifyOldEmail" :disabled="loading || oldCode.length < 4">
                <span v-if="loading" class="btn-spinner"></span>
                <span v-else>下一步</span>
            </button>
         </template>

         <!-- Step 2: Verify New Email -->
         <template v-else>
            <div class="form-item">
                <label>新邮箱地址</label>
                <input 
                    v-model="form.email" 
                    type="email"
                    class="aurora-input"
                    placeholder="请输入新邮箱"
                />
            </div>

            <div class="form-item">
                <label>验证码</label>
                <div class="input-row">
                    <input 
                        v-model="form.code" 
                        type="text" 
                        class="aurora-input"
                        placeholder="新邮箱验证码"
                        maxlength="6"
                    />
                    <button 
                        class="send-code-btn gap-2" 
                        style="display: flex; align-items: center; justify-content: center;"
                        :disabled="countdown > 0 || loading || !isValidNewEmail || sendingCode2"
                        @click="handleSendCode2"
                    >
                        <span v-if="sendingCode2" class="btn-spinner spinner-mini"></span>
                        <span>{{ countdown > 0 ? `${countdown}s` : '发送验证码' }}</span>
                    </button>
                </div>
            </div>

            <button class="aurora-btn-primary gap-2" @click="handleConfirm" :disabled="loading || !canSubmit">
                <span v-if="loading" class="btn-spinner"></span>
                <span v-else>确认绑定</span>
            </button>
         </template>
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
import { useNotify } from '@/composables/useNotify'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close', 'success'])
const userStore = useUserStore()

// State
const step = ref(1)
const { success, error } = useNotify()
import { useSendCode } from '@/composables/client/useSendCode'

const currentEmail = computed(() => userStore.user?.email)

// Step 1 Data
const oldCode = ref('')
const sendingCode1 = ref(false)

// Step 2 Data
const form = reactive({
  email: '',
  code: ''
})
const sendingCode2 = ref(false)

const isValidNewEmail = computed(() => {
  return form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
})

const canVerifyOld = computed(() => oldCode.value.length >= 4)
const canSubmit = computed(() => {
  return isValidNewEmail.value && form.code.length >= 4
})

const { 
  loading: oldLoading, 
  countdown: oldCountdown, 
  sendCode: sendOldOtp,
  checkTimer: checkOldTimer 
} = useSendCode({ timerKey: 'otp_security_timer' })

const { 
  loading: newLoading, 
  countdown: newCountdown, 
  sendCode: sendNewOtp,
  checkTimer: checkNewTimer 
} = useSendCode({ timerKey: 'otp_bind_new_timer_end' })

const baseLoading = ref(false)
const loading = computed(() => baseLoading.value || oldLoading.value || newLoading.value || sendingCode1.value || sendingCode2.value)

// Dynamic countdown display based on step
const countdown = computed(() => step.value === 1 ? oldCountdown.value : newCountdown.value)

// Watchers
watch(() => props.visible, (val) => {
  if (val) {
    step.value = currentEmail.value ? 1 : 2
    oldCode.value = ''
    form.email = ''
    form.code = ''
    checkOldTimer()
    checkNewTimer()
  }
})

// Handlers
const handleClose = () => {
    emit('close')
}

const handleSendCode1 = async () => {
    if (!currentEmail.value) return
    sendingCode1.value = true
    try {
        await sendOldOtp(currentEmail.value)
    } finally {
        sendingCode1.value = false
    }
}

const handleSendCode2 = async () => {
    if (!isValidNewEmail.value) return
    sendingCode2.value = true
    try {
        const checkRes = await authApi.checkEmailAvailable(form.email)
        if (!checkRes.success) {
             error('该邮箱已被注册')
             return
        }
        await sendNewOtp(form.email)
    } catch (e) {
        // Handled by API error interceptor
    } finally {
        sendingCode2.value = false
    }
}

// 1. Send Old Code
const sendOldCode = async () => {
    await sendOldOtp(currentEmail.value || '')
}

// 2. Verify Old Email
const verifyOldEmail = async () => {
    if (!currentEmail.value || !oldCode.value) return
    
    baseLoading.value = true
    try {
        const res = await authApi.verifyOtp(currentEmail.value, oldCode.value)
        if (res.success) {
            success('验证通过')
            step.value = 2
        } else {
            error(res.msg || '验证码错误')
        }
    } catch (e: any) {
        error('验证失败')
    } finally {
        baseLoading.value = false
    }
}

// 4. Confirm Binding
const handleConfirm = async () => {
    if (!canSubmit.value) return

    baseLoading.value = true
    try {
        // Verify New Email Logic First? Or direct update with verify?
        // PC logic: verifyOtp(newEmail, code) THEN updateEmail(newEmail)
        
        
        const verifyRes = await authApi.verifyOtp(form.email, form.code)
        if (!verifyRes.success) {
            error(verifyRes.msg || '验证码错误')
            return
        }

        const updateRes = await authApi.updateEmail(form.email)
        if (updateRes.success) {
            emit('success')
            success('绑定成功，请查收确认邮件')
            handleClose()
        } else {
             error(updateRes.msg || '绑定失败')
        }
    } catch (e: any) {
        error(e.message || '操作失败')
    } finally {
        baseLoading.value = false
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
    z-index: 2000; display: flex; align-items: center; justify-content: center;
    padding: 20px;
}

/* Global Aurora Modal */
.modal-content {
    /* Styles handled by .aurora-modal-panel */
}

/* Animation handled by global .aurora-modal-panel */

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

.alert-box {
    background: rgba(59, 130, 246, 0.1); color: #60A5FA; 
    padding: 12px; border-radius: 12px; font-size: 13px; margin-bottom: 20px;
    border: 1px solid rgba(59, 130, 246, 0.2);
}

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
.disabled-input { opacity: 0.6; cursor: not-allowed; }

.input-row { display: flex; gap: 10px; }
.code-btn {
    height: 48px; padding: 0 16px; font-size: 13px; white-space: nowrap;
    background: rgba(255,255,255,0.05); color: #E0F2FE; 
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; cursor: pointer;
    transition: all 0.2s;
}
.code-btn:active { background: rgba(255,255,255,0.1); }
.code-btn:disabled { opacity: 0.5; cursor: not-allowed; }

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



/* Flex adjustments for input-row with aurora-input */
.input-row .aurora-input { flex: 1; min-width: 0; }
.code-btn { flex-shrink: 0; }
.aurora-btn-primary { margin-top: 20px; }
</style>
