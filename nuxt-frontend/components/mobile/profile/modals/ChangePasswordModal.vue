<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">修改登录密码</h3>
        <button class="close-btn" @click="$emit('close')">
            <Close class="w-5 h-5" />
        </button>
      </div>

      <div class="modal-body">
         <div v-if="!userStore.user?.email" class="alert-box">
             请先绑定邮箱，修改密码需要邮箱验证。
         </div>

         <template v-else>
            <div class="form-item">
                <label>邮箱验证码</label>
                <div class="input-row">
                    <input 
                        v-model="form.code" 
                        type="text" 
                        placeholder="请输入验证码"
                        maxlength="6"
                    />
                    <button 
                        class="code-btn" 
                        :disabled="countdown > 0 || loading"
                        @click="sendCode"
                    >
                        {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}
                    </button>
                </div>
            </div>

            <div class="form-item">
                <label>新密码</label>
                <input 
                    v-model="form.newPassword" 
                    type="password" 
                    placeholder="请输入新密码 (6-20位)"
                />
            </div>

            <div class="form-item">
                <label>确认密码</label>
                <input 
                    v-model="form.confirmPassword" 
                    type="password" 
                    placeholder="再次输入新密码"
                />
            </div>
         </template>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="$emit('close')">取消</button>
        <button 
            class="submit-btn" 
            :disabled="!canSubmit || loading"
            @click="handleConfirm"
        >
            <div v-if="loading" class="spinner"></div>
            <span v-else>确认修改</span>
        </button>
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close', 'success'])
const userStore = useUserStore()

const loading = ref(false)
const countdown = ref(0)
let timerInterval: any = null

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
    if(val) {
        form.code = ''
        form.newPassword = ''
        form.confirmPassword = ''
    }
})

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

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval)
})

const sendCode = async () => {
    if (!userStore.user?.email) return
    if (countdown.value > 0) return

    loading.value = true
    try {
        const res = await authApi.sendOtp(userStore.user.email)
        if (res.success) {
            ElMessage.success({ message: '验证码已发送', offset: 100, customClass: 'mobile-message' })
            startTimer(300) 
        } else {
            ElMessage.error(res.msg || '发送失败')
        }
    } catch (e: any) {
        ElMessage.error('发送验证码异常')
    } finally {
        loading.value = false
    }
}

const handleConfirm = async () => {
    if (!canSubmit.value || !userStore.user?.email) return

    loading.value = true
    try {
        // 1. Verify OTP
        const verifyRes = await authApi.verifyOtp(userStore.user.email, form.code)
        if (!verifyRes.success) {
            ElMessage.error(verifyRes.msg || '验证码错误')
            loading.value = false
            return
        }

        // 2. Update Password
        const updateRes = await authApi.updatePassword(form.newPassword)
        if (updateRes.success) {
            emit('success')
            userStore.logout() // Force logout as expected by mobile flow
        } else {
             ElMessage.error(updateRes.msg || '密码修改失败')
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
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
    z-index: 2000; display: flex; align-items: center; justify-content: center;
    padding: 20px;
}

.modal-content {
    background: var(--cyber-bg-glass, rgba(15, 23, 42, 0.8));
    width: 100%; max-width: 320px;
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

.alert-box {
    background: rgba(239, 68, 68, 0.1); color: #FCA5A5; 
    padding: 12px; border-radius: 12px; font-size: 13px; margin-bottom: 20px;
    border: 1px solid rgba(239, 68, 68, 0.2);
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

.modal-footer { display: flex; gap: 12px; margin-top: 24px; }
.cancel-btn, .submit-btn {
    flex: 1; height: 48px; border-radius: 12px; font-size: 15px; font-weight: 600; border: none; cursor: pointer;
    transition: all 0.2s;
}
.cancel-btn { 
    background: rgba(255,255,255,0.05); color: #94A3B8;
    border: 1px solid rgba(255,255,255,0.05);
}
.cancel-btn:active { background: rgba(255,255,255,0.1); }

.submit-btn { 
    background: var(--cyber-gradient-btn, linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%));
    color: white; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
}
.submit-btn:active { transform: scale(0.96); box-shadow: 0 2px 8px rgba(6, 182, 212, 0.2); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(0.5); }

.spinner {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
