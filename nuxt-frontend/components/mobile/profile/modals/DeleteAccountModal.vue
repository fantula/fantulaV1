<template>
  <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title text-danger">注销账号</h3>
        <button class="close-btn" @click="handleClose">
            <Close class="w-5 h-5" />
        </button>
      </div>

      <div class="modal-body">
         <div class="warning-box">
             <div class="warning-icon">!</div>
             <p>警告：账号注销是不可恢复的操作。所有个人数据将被永久删除。</p>
         </div>

         <div class="form-item">
            <label>邮箱验证 ({{ userStore.user?.email }})</label>
            <div class="input-row">
                <input 
                    v-model="otpCode" 
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

        <div class="checkbox-row" @click="isConfirmed = !isConfirmed">
            <div class="checkbox" :class="{ checked: isConfirmed }">
                <Check v-if="isConfirmed" class="check-icon" />
            </div>
            <span>我已了解风险，确认注销当前账号</span>
        </div>
      </div>

      <div class="modal-footer">
          <button class="cancel-btn" @click="handleClose">取消</button>
          <button class="save-btn btn-danger" @click="handleDelete" :disabled="loading || !canSubmit">
              <span v-if="loading" class="spinner"></span>
              <span v-else>确认注销</span>
          </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { Close, Check } from '@element-plus/icons-vue'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close'])
const userStore = useUserStore()
const router = useRouter()

const isConfirmed = ref(false)
const otpCode = ref('')
const loading = ref(false)
const countdown = ref(0)
let timerInterval: any = null

const canSubmit = computed(() => {
    return isConfirmed.value && otpCode.value.length >= 4
})

watch(() => props.visible, (val) => {
    if (val) {
        isConfirmed.value = false
        otpCode.value = ''
        countdown.value = 0
        if(timerInterval) clearInterval(timerInterval)
    }
})

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval)
})

const handleClose = () => {
    emit('close')
}

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
        ElMessage.error('发送异常')
    } finally {
        loading.value = false
    }
}

const handleDelete = async () => {
    if (!canSubmit.value || !userStore.user?.email) return
    
    loading.value = true
    try {
        // 1. Verify OTP
        const verifyRes = await authApi.verifyOtp(userStore.user.email, otpCode.value)
        if (!verifyRes.success) {
            ElMessage.error(verifyRes.msg || '验证码错误')
            loading.value = false
            return
        }

        // 2. Execute Delete (Should ideally be atomic with verification on backend, but following PC flow)
        // Actually PC flow isVerifyOtp -> emit confirm -> parent calls deleteAccount.
        // Wait, DeleteAccountModal PC calls emit('confirm'), parent ProfilePersonalInfo calls deleteAccount(). 
        // Here we can call it directly or emit. Direct call is simpler for mobile page structure.
        
        const res = await authApi.deleteAccount()
        if (res.success) {
            ElMessage.success({ message: '账号已注销', offset: 100, customClass: 'mobile-message' })
            await userStore.logout()
            router.push('/mobile')
        } else {
             ElMessage.error(res.msg || '注销失败')
        }
    } catch (e: any) {
        ElMessage.error('注销失败')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    z-index: 100; display: flex; align-items: center; justify-content: center;
    padding: 20px;
}

.modal-content {
    background: #1E293B; width: 100%; max-width: 340px;
    border-radius: 16px; padding: 20px;
    border: 1px solid rgba(239, 68, 68, 0.3);
    animation: popIn 0.2s ease-out;
}

@keyframes popIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-title { font-size: 18px; font-weight: 600; color: #fff; margin: 0; }
.text-danger { color: #EF4444; }
.close-btn { background: none; border: none; color: #94A3B8; padding: 4px; }

.modal-body { padding: 0 0 20px 0; }

.warning-box {
    background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2);
    padding: 12px; border-radius: 12px;
    display: flex; gap: 12px; margin-bottom: 20px;
}
.warning-icon {
    width: 20px; height: 20px; background: #EF4444; color: white;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: bold; flex-shrink: 0; font-size: 12px;
}
.warning-box p {
    margin: 0; font-size: 13px; color: #FCA5A5; line-height: 1.4;
}

.form-item { margin-bottom: 16px; }
.form-item label { display: block; font-size: 13px; color: #94A3B8; margin-bottom: 6px; }
.form-item input {
    width: 100%; height: 44px; background: #0F172A;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
    padding: 0 12px; color: #fff; font-size: 15px;
}

.input-row { display: flex; gap: 8px; }
.code-btn {
    height: 44px; padding: 0 12px; font-size: 13px; white-space: nowrap;
    background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
}
.code-btn:disabled { opacity: 0.5; }

.checkbox-row {
    display: flex; align-items: center; gap: 10px; cursor: pointer;
}
.checkbox {
    width: 20px; height: 20px; border: 2px solid #475569; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
}
.checkbox.checked {
    background: #EF4444; border-color: #EF4444;
}
.check-icon { color: white; width: 14px; height: 14px; }
.checkbox-row span { font-size: 13px; color: #CBD5E1; }

.modal-footer { display: flex; gap: 12px; }
.cancel-btn, .save-btn {
    flex: 1; height: 44px; border-radius: 8px; font-size: 15px; font-weight: 600; border: none;
}
.cancel-btn { background: rgba(255,255,255,0.05); color: #94A3B8; }
.btn-danger { 
    background: linear-gradient(135deg, #EF4444 0%, #B91C1C 100%); 
    color: white; 
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    display: flex; justify-content: center; align-items: center;
}
.btn-danger:disabled { opacity: 0.5; cursor: not-allowed; }

.spinner {
    width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
