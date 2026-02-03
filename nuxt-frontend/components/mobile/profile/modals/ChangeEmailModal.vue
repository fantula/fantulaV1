<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
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
                <input :value="currentEmail" disabled class="disabled-input" />
            </div>

            <div class="form-item">
                <label>验证码</label>
                <div class="input-row">
                    <input 
                        v-model="oldCode" 
                        type="text" 
                        placeholder="请输入验证码"
                        maxlength="6"
                    />
                    <button 
                        class="code-btn" 
                        :disabled="countdown > 0 || loading"
                        @click="sendOldCode"
                    >
                        {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}
                    </button>
                </div>
            </div>

            <button class="submit-btn full-width" @click="verifyOldEmail" :disabled="loading || oldCode.length < 4">
                <div v-if="loading" class="spinner"></div>
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
                    placeholder="请输入新邮箱"
                />
            </div>

            <div class="form-item">
                <label>验证码</label>
                <div class="input-row">
                    <input 
                        v-model="form.code" 
                        type="text" 
                        placeholder="新邮箱验证码"
                        maxlength="6"
                    />
                    <button 
                        class="code-btn" 
                        :disabled="countdown > 0 || loading || !isEmailValid"
                        @click="sendNewCode"
                    >
                        {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}
                    </button>
                </div>
            </div>

            <button class="submit-btn full-width" @click="handleConfirm" :disabled="loading || !canSubmit">
                <div v-if="loading" class="spinner"></div>
                <span v-else>确认绑定</span>
            </button>
         </template>
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close', 'success'])
const userStore = useUserStore()

// State
const step = ref(1)
const loading = ref(false)
const countdown = ref(0)
let timerInterval: any = null

const currentEmail = computed(() => userStore.user?.email)

// Step 1 Data
const oldCode = ref('')

// Step 2 Data
const form = reactive({
  email: '',
  code: ''
})

const isEmailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
})

const canSubmit = computed(() => {
  return isEmailValid.value && form.code.length >= 4
})

// Watchers
watch(() => props.visible, (val) => {
  if (val) {
    step.value = currentEmail.value ? 1 : 2
    oldCode.value = ''
    form.email = ''
    form.code = ''
    countdown.value = 0
    if(timerInterval) clearInterval(timerInterval)
  }
})

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval)
})

// Timer Logic
const startTimer = (seconds: number) => {
    countdown.value = seconds
    if (timerInterval) clearInterval(timerInterval)
    timerInterval = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timerInterval)
        }
    }, 1000)
}

// Handlers
const handleClose = () => {
    emit('close')
}

// 1. Send Old Code
const sendOldCode = async () => {
    if (!currentEmail.value) return
    if (countdown.value > 0) return

    loading.value = true
    try {
        const res = await authApi.sendOtp(currentEmail.value)
        if (res.success) {
            ElMessage.success({ message: '验证码已发送', offset: 100, customClass: 'mobile-message' })
            startTimer(300)
        } else {
            ElMessage.error(res.msg || '发送失败')
        }
    } catch (e: any) {
        ElMessage.error('发送异常')
    } finally {
        loading.value = false
    }
}

// 2. Verify Old Email
const verifyOldEmail = async () => {
    if (!currentEmail.value || !oldCode.value) return
    
    loading.value = true
    try {
        const res = await authApi.verifyOtp(currentEmail.value, oldCode.value)
        if (res.success) {
            ElMessage.success({ message: '验证通过', offset: 100, customClass: 'mobile-message' })
            step.value = 2
            // Reset timer for step 2? Usually separate. Let's clear logic to allow new send.
            if(timerInterval) clearInterval(timerInterval)
            countdown.value = 0
        } else {
            ElMessage.error(res.msg || '验证码错误')
        }
    } catch (e: any) {
        ElMessage.error('验证失败')
    } finally {
        loading.value = false
    }
}

// 3. Send New Code
const sendNewCode = async () => {
    if (!isEmailValid.value) return
    if (countdown.value > 0) return

    // Check availability
    try {
        const checkRes = await authApi.checkEmailAvailable(form.email)
        if (!checkRes.success) {
             ElMessage.error({ message: '该邮箱已被注册', offset: 100, customClass: 'mobile-message' })
             return
        }
    } catch (e) {}

    loading.value = true
    try {
        const res = await authApi.sendOtp(form.email)
        if (res.success) {
            ElMessage.success({ message: '验证码已发至新邮箱', offset: 100, customClass: 'mobile-message' })
            startTimer(300)
        } else {
            ElMessage.error(res.msg || '发送失败')
        }
    } catch (e: any) {
        ElMessage.error('发送异常')
    } finally {
        loading.value = false
    }
}

// 4. Confirm Binding
const handleConfirm = async () => {
    if (!canSubmit.value) return

    loading.value = true
    try {
        // Verify New Email Logic First? Or direct update with verify?
        // PC logic: verifyOtp(newEmail, code) THEN updateEmail(newEmail)
        
        const verifyRes = await authApi.verifyOtp(form.email, form.code)
        if (!verifyRes.success) {
            ElMessage.error(verifyRes.msg || '验证码错误')
            loading.value = false
            return
        }

        const updateRes = await authApi.updateEmail(form.email)
        if (updateRes.success) {
            emit('success')
            ElMessage.success({ message: '绑定成功，请查收确认邮件', offset: 100, customClass: 'mobile-message' })
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
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
  z-index: 2000; display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

.modal-content {
  background: #1E293B; width: 100%; max-width: 340px;
  border-radius: 16px; padding: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  animation: popIn 0.2s ease-out;
}

@keyframes popIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-title { font-size: 18px; font-weight: 600; color: #fff; margin: 0; }
.close-btn { background: none; border: none; color: #94A3B8; padding: 4px; }

.alert-box {
    background: rgba(59, 130, 246, 0.1); color: #60A5FA; padding: 12px; border-radius: 8px; font-size: 13px; margin-bottom: 16px;
}

.form-item { margin-bottom: 16px; }
.form-item label { display: block; font-size: 13px; color: #94A3B8; margin-bottom: 6px; }
.form-item input {
    width: 100%; height: 44px; background: #0F172A;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
    padding: 0 12px; color: #fff; font-size: 15px;
}
.disabled-input { opacity: 0.6; cursor: not-allowed; }

.input-row { display: flex; gap: 8px; }
.code-btn {
    height: 44px; padding: 0 12px; font-size: 13px; white-space: nowrap;
    background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
}
.code-btn:disabled { opacity: 0.5; }

.submit-btn {
    width: 100%; height: 44px; margin-top: 10px;
    background: #3B82F6; color: #fff; border-radius: 8px; border: none; font-weight: 600; font-size: 15px;
    display: flex; align-items: center; justify-content: center;
}
.submit-btn:disabled { opacity: 0.5; }
.full-width { width: 100%; }

.spinner {
    width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
