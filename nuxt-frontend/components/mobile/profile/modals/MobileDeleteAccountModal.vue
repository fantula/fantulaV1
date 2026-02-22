<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content aurora-modal-panel">
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
                    class="aurora-input"
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
          <button class="aurora-btn-danger" @click="handleDelete" :disabled="loading || !canSubmit">
              <span v-if="loading" class="spinner"></span>
              <span v-else>确认注销</span>
          </button>
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { Close, Check } from '@element-plus/icons-vue'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { useRouter } from 'vue-router'
import { useNotify } from '@/composables/useNotify'
import { useSendCode } from '@/composables/client/useSendCode'
import { mobileRoutes } from '@/config/client-routes'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close'])
const userStore = useUserStore()
const router = useRouter()
const { success, error } = useNotify()

const isConfirmed = ref(false)
const otpCode = ref('')
const {
  loading: codeLoading, 
  countdown, 
  sendCode: sendOtp,
  checkTimer 
} = useSendCode({ timerKey: 'otp_security_timer' })

const baseLoading = ref(false)
const loading = computed(() => baseLoading.value || codeLoading.value)

const canSubmit = computed(() => {
    return isConfirmed.value && otpCode.value.length >= 4
})

watch(() => props.visible, (val) => {
    if (val) {
        isConfirmed.value = false
        otpCode.value = ''
        countdown.value = 0
        checkTimer() // Sync timer
    }
})

onUnmounted(() => {
})

const handleClose = () => {
    emit('close')
}

// ... existing code ...

const sendCode = async () => {
    await sendOtp(userStore.user?.email || '')
}

const handleDelete = async () => {
    if (!canSubmit.value || !userStore.user?.email) return
    
    baseLoading.value = true
    try {
        // 1. Verify OTP
        const verifyRes = await authApi.verifyOtp(userStore.user.email, otpCode.value)
        if (!verifyRes.success) {
            error(verifyRes.msg || '验证码错误')
            return
        }

        // 2. Execute Delete
        const res = await authApi.deleteAccount()
        if (res.success) {
            success('账号已注销')
            await userStore.logout()
            router.push(mobileRoutes.home())
        } else {
             error(res.msg || '注销失败')
        }
    } catch (e: any) {
        error('注销失败')
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
    text-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
}
.text-danger { color: #F87171; }
.close-btn { 
    background: none; border: none; color: #94A3B8; padding: 4px; 
    cursor: pointer; transition: color 0.2s;
}
.close-btn:hover { color: #fff; }

.modal-body { padding: 0 0 20px 0; }

.warning-box {
    background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2);
    padding: 16px; border-radius: 12px;
    display: flex; gap: 12px; margin-bottom: 24px;
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.1) inset;
}
.warning-icon {
    width: 24px; height: 24px; background: #EF4444; color: white;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: bold; flex-shrink: 0; font-size: 14px;
    box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
}
.warning-box p {
    margin: 0; font-size: 13px; color: #FCA5A5; line-height: 1.5;
}

.form-item { margin-bottom: 20px; }
.form-item label { display: block; font-size: 13px; color: #94A3B8; margin-bottom: 8px; font-weight: 500; }
.form-item input {
    width: 100%; height: 48px; 
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
    padding: 0 16px; color: #fff; font-size: 16px;
    transition: all 0.2s;
}
.form-item input:focus {
    border-color: #EF4444; /* Red focus for danger */
    background: rgba(15, 23, 42, 0.9);
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.2);
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

.checkbox-row {
    display: flex; align-items: center; gap: 12px; cursor: pointer;
    padding: 8px 0;
}
.checkbox {
    width: 22px; height: 22px; 
    border: 2px solid #475569; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    background: rgba(255,255,255,0.05);
}
.checkbox.checked {
    background: #EF4444; border-color: #EF4444;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
    animation: pulse 0.3s;
}
@keyframes pulse { 50% { transform: scale(1.1); } }

.check-icon { color: white; width: 14px; height: 14px; }
.checkbox-row span { font-size: 14px; color: #CBD5E1; transition: color 0.2s; }
.checkbox-row:hover span { color: #fff; }

.modal-footer { display: flex; gap: 12px; }
/* Handled by global aurora classes */

.spinner {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Flex adjustments */
.input-row .aurora-input { flex: 1; min-width: 0; }
.code-btn { flex-shrink: 0; }

/* Handled by global aurora classes */
</style>
