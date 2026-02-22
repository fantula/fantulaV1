<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
      <div class="modal-content aurora-modal-panel">
        <div class="modal-header">
          <h3 class="modal-title">微信绑定</h3>
          <button class="close-btn" @click="handleClose">
            <Close class="w-5 h-5" />
          </button>
        </div>

        <div class="modal-body">
            <div class="bind-status-card" :class="{ bound: isBound }">
                <div class="icon-wrapper">
                    <!-- Simple WeChat Icon Placeholder or Use Element Icon -->
                    <el-icon :size="32" color="#fff"><ChatDotRound /></el-icon>
                </div>
                <div class="status-info">
                    <p class="status-title">{{ isBound ? '已绑定微信' : '未绑定微信' }}</p>
                    <p class="status-desc" v-if="isBound">
                        当前账号已关联微信，可用于快速登录
                    </p>
                    <p class="status-desc" v-else>
                        绑定微信后可使用微信快速登录
                    </p>
                </div>
            </div>

            <div class="action-section" v-if="isBound">
                <p class="tip-text">如需更换绑定，请先解除当前绑定</p>
            </div>
            <div class="action-section" v-else>
                 <p class="tip-text">绑定微信后可使用微信快速登录</p>
            </div>
        </div>

        <div class="modal-footer">
          <div v-if="isBound" class="footer-actions">
              <button class="submit-btn unbind-btn" :disabled="loading" @click="handleUnbind">
                {{ loading ? '处理中...' : '解除绑定' }}
              </button>
          </div>
          <button v-else class="submit-btn" @click="handleBind">
            立即绑定
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Close, ChatDotRound } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import { wechatLoginApi } from '@/api/client/wechat-login'
import { ElMessageBox, ElMessage } from 'element-plus'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close'])
const userStore = useUserStore()
const loading = ref(false)

const isBound = computed(() => {
    return !!userStore.user?.openId
})

const handleUnbind = async () => {
    try {
        await ElMessageBox.confirm(
            '解除绑定后将无法通过微信快速登录，确定要解绑吗？',
            '解除绑定',
            {
                confirmButtonText: '确定解绑',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: 'mobile-msg-box',
                center: true
            }
        )
        
        loading.value = true
        const res = await wechatLoginApi.unbindWechat()
        if (res.success) {
            ElMessage.success('解除绑定成功')
            await userStore.fetchUserInfo()
            // Don't close, allow user to bind new one immediately if they want
        } else {
            ElMessage.error(res.msg || '解绑失败')
        }
    } catch (e) {
        // Cancelled or Error
        if (e !== 'cancel') {
             if (import.meta.dev) console.error(e)
             ElMessage.error('操作失败')
        }
    } finally {
        loading.value = false
    }
}

const handleBind = () => {
    // Check if in WeChat browser (for Mobile)
    const isWechat = /MicroMessenger/i.test(navigator.userAgent)
    if (!isWechat) {
        ElMessage.warning('请在微信内打开此页面进行绑定')
        return
    }

    // Redirect to OAuth
    // Current path is /mobile/profile/account, callback should be /mobile/wechat-callback
    const redirectUri = window.location.origin + '/mobile/wechat-callback'
    // DOCS: State implies login mode. We want 'login' state usually, but let's check oauth-login.ts
    // If we send state='login', callback parses it.
    const authUrl = wechatLoginApi.getOAuthUrl(redirectUri, 'login') 
    
    // Add return_to to callback so it comes back here
    const returnTo = encodeURIComponent(window.location.href)
    window.location.href = authUrl + `&return_to=${returnTo}`
}

const handleClose = () => {
    emit('close')
}
</script>

<style scoped>
/* ... existing styles ... code omitted for brevity in replacement ... */
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
    z-index: 2000; display: flex; align-items: center; justify-content: center;
    padding: 20px;
}

/* Global Aurora Modal */
.modal-content {
   /* Handled by global class usually, but scoped here just in case */
   background: #1E293B; border-radius: 16px; padding: 24px; width: 100%; max-width: 320px;
   border: 1px solid rgba(255,255,255,0.1);
}

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.modal-title { 
    font-size: 18px; font-weight: 700; color: #fff; margin: 0; 
}
.close-btn { 
    background: none; border: none; color: #94A3B8; padding: 4px; 
    cursor: pointer; transition: color 0.2s;
}

.bind-status-card {
    background: rgba(255,255,255,0.05); border-radius: 16px; padding: 20px;
    display: flex; align-items: center; gap: 16px;
    border: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 24px;
}
.bind-status-card.bound {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.3);
}

.icon-wrapper {
    width: 48px; height: 48px; border-radius: 50%;
    background: #07C160;
    display: flex; align-items: center; justify-content: center;
}
.status-info { flex: 1; }
.status-title { font-size: 16px; font-weight: 600; color: white; margin: 0 0 4px 0; }
.status-desc { font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.4; }

.tip-text { text-align: center; color: #64748B; font-size: 13px; margin: 0; }

.modal-footer { margin-top: 24px; }
.submit-btn {
    width: 100%; height: 48px; 
    background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%);
    color: white; border-radius: 12px; font-size: 15px; font-weight: 600; border: none; cursor: pointer;
}
.unbind-btn {
    background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #F87171;
}
</style>

<!-- Global styles for ElMessageBox dark theme (not scoped) -->
<style>
.mobile-msg-box {
  width: 90% !important;
  max-width: 320px !important;
  background: rgba(30, 41, 59, 0.95) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 20px !important;
  padding-bottom: 15px !important;
}
.mobile-msg-box .el-message-box__header {
  padding-bottom: 8px !important;
}
.mobile-msg-box .el-message-box__title {
  color: #fff !important;
  font-size: 18px !important;
}
.mobile-msg-box .el-message-box__message p {
  color: #CBD5E1 !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
}
.mobile-msg-box .el-message-box__btns {
  flex-direction: column-reverse;
  gap: 10px;
}
.mobile-msg-box .el-button {
  width: 100% !important;
  margin: 0 !important;
  height: 44px !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
}
.mobile-msg-box .el-button--primary {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%) !important;
  border: none !important;
  color: #fff !important;
}
.mobile-msg-box .el-button--default {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #94A3B8 !important;
}
</style>
