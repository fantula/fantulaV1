<template>
  <BaseFormModal
    :visible="visible"
    title="绑定微信"
    :show-footer="false"
    theme-id="suit-001"
    confirm-theme-id="suit-001-primary"
    cancel-theme-id="suit-001-secondary"
    @close="handleClose"
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="wechat-bind-content">
      <div class="modal-subtitle">绑定微信后，可使用微信扫码快捷登录</div>

      <!-- 状态：已绑定 -->
      <div v-if="isBound" class="bound-state">
        <div class="status-box bound">
          <div class="status-icon">
            <el-icon><ChatDotRound /></el-icon>
          </div>
          <div class="status-info">
            <div class="status-label">当前状态</div>
            <div class="status-text">已绑定微信</div>
            <div class="bound-meta" v-if="openId">OpenID: {{ maskOpenId(openId) }}</div>
          </div>
        </div>
        
        <div class="action-area">
           <button class="btn-secondary" @click="handleUnbind" disabled>
             <el-icon><Connection /></el-icon> 解除绑定 (暂未开放)
           </button>
        </div>
      </div>

      <!-- 状态：未绑定 (扫码) -->
      <div v-else class="bind-state">
        <div class="qr-container">
           <div v-if="loading" class="qr-loading">
             <div class="spinner"></div>
             <p>获取二维码...</p>
           </div>
           <div v-else-if="qrCodeUrl" class="qr-wrapper">
             <img :src="qrCodeUrl" class="qr-img" />
             <div class="qr-overlay" v-if="scanStatus === 'scanned'">
               <el-icon class="success-icon"><Select /></el-icon>
               <p>扫描成功</p>
               <p class="sub-text">正在绑定...</p>
             </div>
             <div class="qr-overlay error" v-if="isExpired">
               <el-icon class="refresh-icon" @click="refreshQrCode"><Refresh /></el-icon>
               <p>二维码已过期</p>
               <button class="text-btn" @click="refreshQrCode">点击刷新</button>
             </div>
           </div>
           <div v-else class="qr-error">
             <p>无法加载二维码</p>
             <button class="text-btn" @click="refreshQrCode">重试</button>
           </div>
        </div>

        <div class="scan-tip">
          请使用 <span class="highlight">微信</span> 扫一扫
        </div>
      </div>
      
    </div>
  </BaseFormModal>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import BaseFormModal from '@/components/pc/modal/base/BaseFormModal.vue'
import { ChatDotRound, Connection, Select, Refresh } from '@element-plus/icons-vue'
import { wechatLoginApi } from '@/api/client/wechat-login'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/client/user'

const props = defineProps<{
  visible: boolean
  isBound: boolean
  openId?: string
}>()

const emit = defineEmits(['close', 'update:visible', 'success'])
const userStore = useUserStore()

// State
const loading = ref(false)
const qrCodeUrl = ref('')
const ticket = ref('')
const scene = ref('')
const scanStatus = ref<'waiting' | 'scanned' | 'expired'>('waiting')
const isExpired = ref(false)
let pollTimer: any = null

// Mask OpenID
const maskOpenId = (id: string) => {
  if (!id || id.length < 10) return id
  return id.substring(0, 6) + '****' + id.substring(id.length - 4)
}

// Actions
const getQrCode = async () => {
  if (props.isBound) return

  loading.value = true
  isExpired.value = false
  qrCodeUrl.value = ''
  
  try {
    const res = await wechatLoginApi.getLoginQrCode()
    if (res.success && res.data) {
      qrCodeUrl.value = res.data.qrcodeUrl
      ticket.value = res.data.ticket
      scene.value = res.data.sceneStr
      loading.value = false
      scanStatus.value = 'waiting'
      startPolling()
    } else {
      ElMessage.error(res.msg || '获取二维码失败')
    }
  } catch (e) {
    ElMessage.error('网络错误')
  } finally {
    loading.value = false
  }
}

const startPolling = () => {
  stopPolling()
  pollTimer = setInterval(async () => {
    if (!scene.value || props.isBound) return

    try {
      const res = await wechatLoginApi.checkScanStatus(scene.value)
      if (res.success && res.data) {
        const { status, bindToken } = res.data
        
        if (status === 'need_bind' && bindToken) {
             scanStatus.value = 'scanned'
             stopPolling()
             await performBind(bindToken)
        } else if (status === 'logged_in') {
             stopPolling()
             ElMessage.warning('该微信已绑定其他账号，请更换微信')
        } else if (status === 'scanned') {
             scanStatus.value = 'scanned'
             // Continue polling
        } else if (status === 'expired') {
             isExpired.value = true
             stopPolling()
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, 2000)
}

const performBind = async (token: string) => {
  try {
    const res = await wechatLoginApi.bindWechatToAccount({ bindToken: token })
    if (res.success) {
       ElMessage.success('绑定成功')
       emit('success')
       handleClose()
       // Refresh user info
       userStore.fetchUserInfo()
    } else {
       ElMessage.error(res.msg || '绑定失败')
       qrCodeUrl.value = '' // Reset to allow retry?
       getQrCode() // Refresh
    }
  } catch (e: any) {
    ElMessage.error(e.message || '绑定失败')
  }
}

const stopPolling = () => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

const refreshQrCode = () => {
  getQrCode()
}

const handleClose = () => {
  stopPolling()
  emit('close')
  emit('update:visible', false)
}

const handleUnbind = () => {
   // Placeholder
   ElMessage.info('如需解绑请联系客服')
}

watch(() => props.visible, (val) => {
  if (val && !props.isBound) {
    getQrCode()
  } else {
    stopPolling()
  }
})

onUnmounted(() => {
  stopPolling()
})
</script>

<style scoped>
.wechat-bind-content {
  display: flex; flex-direction: column; gap: 24px; padding: 10px 0;
  min-height: 250px; align-items: center;
}

.modal-subtitle { color: #94A3B8; font-size: 14px; text-align: center; }

/* Bound State */
.bound-state { width: 100%; display: flex; flex-direction: column; gap: 24px; }

.status-box.bound {
  background: rgba(7, 193, 96, 0.1); /* Wechat Green */
  border: 1px solid rgba(7, 193, 96, 0.3);
  border-radius: 16px; padding: 20px;
  display: flex; align-items: center; gap: 16px;
}

.status-icon {
  width: 48px; height: 48px; background: rgba(7, 193, 96, 0.2);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: #07C160; font-size: 24px;
}

.status-info { flex: 1; }
.status-label { font-size: 12px; color: #94A3B8; }
.status-text { font-size: 18px; font-weight: 700; color: #fff; }
.bound-meta { font-size: 12px; color: #07C160; font-family: monospace; margin-top: 4px; }

.action-area { display: flex; justify-content: center; }
.btn-secondary {
  background: rgba(255,255,255,0.05); color: #94A3B8;
  border: 1px solid rgba(255,255,255,0.1); padding: 10px 24px;
  border-radius: 8px; cursor: not-allowed; display: flex; align-items: center; gap: 8px;
}

/* Bind State (QR) */
.bind-state { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 20px; }

.qr-container {
  width: 200px; height: 200px;
  background: #fff; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}

.qr-img { width: 180px; height: 180px; }

.qr-loading, .qr-error {
  display: flex; flex-direction: column; align-items: center; gap: 10px; color: #1E293B;
}
.spinner {
  width: 30px; height: 30px; border: 3px solid #E2E8F0; border-top-color: #07C160;
  border-radius: 50%; animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.qr-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(255,255,255,0.9);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: #07C160;
}
.qr-overlay.error { color: #EF4444; }

.success-icon { font-size: 40px; margin-bottom: 8px; }
.refresh-icon { font-size: 32px; margin-bottom: 8px; cursor: pointer; }

.text-btn {
  background: none; border: none; color: inherit; text-decoration: underline; cursor: pointer;
  margin-top: 8px;
}

.scan-tip { color: #94A3B8; font-size: 14px; }
.highlight { color: #07C160; font-weight: bold; }

</style>
