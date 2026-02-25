<template>
  <div class="mobile-page">
    <MobileSubPageHeader title="账号设置" />

    <div class="settings-content">
       <!-- Group 1: Basic Info -->

       <!-- Group 2: Account Binding -->
       <div class="setting-container">
            <!-- Avatar Item -->
            <div class="setting-item" @click="activeModal = 'avatar'">
                <div class="left">
                    <span class="label">头像</span>
                </div>
                <div class="right">
                    <NuxtImg :src="userStore.user?.avatar || DEFAULT_AVATAR" class="avatar-img" @error="handleImageError" loading="lazy" decoding="async" width="80" quality="80" format="webp" />
                    <el-icon class="arrow"><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="divider"></div>

            <!-- Nickname Item -->
            <div class="setting-item" @click="activeModal = 'nickname'">
                <div class="left">
                    <span class="label">昵称</span>
                </div>
                <div class="right">
                    <span class="value">{{ userStore.user?.nickName || '未设置' }}</span>
                    <el-icon class="arrow"><ArrowRight /></el-icon>
                </div>
            </div>

            <div class="divider"></div>

             <!-- UID Item -->
             <div class="setting-item" @click="copyUID">
                <div class="left">
                    <span class="label">UID</span>
                </div>
                <div class="right">
                    <span class="value uid-text">{{ userStore.user?.uid || userStore.user?.id }}</span>
                    <el-icon class="copy-icon"><DocumentCopy /></el-icon>
                </div>
            </div>
        </div>

        <!-- Security Group -->
        <h3 class="group-title">账号安全</h3>
        <div class="setting-container">
            <div class="setting-item" @click="activeModal = 'wechat'">
                <div class="left">
                    <span class="label">微信绑定</span>
                </div>
                <div class="right">
                    <span class="value">{{ userStore.user?.openId ? '已绑定' : '未绑定' }}</span>
                    <el-icon class="arrow"><ArrowRight /></el-icon>
                </div>
            </div>

           <div class="setting-item" @click="activeModal = 'email'">
              <span class="label">邮箱</span>
              <div class="value-wrap">
                 <span class="text-val">{{ userStore.user?.email }}</span>
                 <el-icon class="arrow"><ArrowRight /></el-icon>
              </div>
           </div>

           <div class="setting-item" @click="activeModal = 'password'">
              <span class="label">登录密码</span>
              <div class="value-wrap">
                 <span class="text-val muted">修改</span>
                 <el-icon class="arrow"><ArrowRight /></el-icon>
              </div>
           </div>
       </div>

       <!-- Actions -->
       <div class="action-group">
          <!-- 退出登录 (Logout/Safe) -->
          <button class="logout-btn-safe" @click="handleLogout">退出登录</button>
          
          <div class="danger-zone-spacer"></div>

          <!-- 注销账号 (Delete Account/Ghost Danger) -->
          <button class="delete-account-ghost" @click="activeModal = 'delete'">注销账号 (危险操作)</button>
       </div>
    </div>

    <!-- Modals -->
    <EditNicknameModal 
        :visible="activeModal === 'nickname'"
        :current-nickname="userStore.user?.nickName"
        @close="activeModal = null"
        @success="handleSuccess('昵称已更新')"
    />

    <ChangeEmailModal 
        :visible="activeModal === 'email'"
        @close="activeModal = null"
        @success="handleSuccess('邮箱已修改')"
    />

    <MobileChangePasswordModal 
      :visible="activeModal === 'password'"
      @close="activeModal = null"
      @success="handleSuccess('密码已修改')"
    />
    
    <!-- Delete Account Modal -->
    <MobileDeleteAccountModal 
      :visible="activeModal === 'delete'" 
      @close="activeModal = null" 
    />

    <MobileLogoutModal
      :visible="activeModal === 'logout'"
      :loading="loading"
      @close="activeModal = null"
      @confirm="handleLogoutConfirm"
    />

    <SelectAvatarModal
        :visible="activeModal === 'avatar'"
        :current-avatar="userStore.user?.avatar"
        @close="activeModal = null"
        @success="handleSuccess('头像已更新')"
    />

    <WechatBindModal
        :visible="activeModal === 'wechat'"
        @close="activeModal = null"
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, DocumentCopy } from '@element-plus/icons-vue'
import { mobileRoutes } from '@/config/client-routes'
import { useUserStore } from '@/stores/client/user'
import { authApi } from '@/api/client/auth'
import { useNotify } from '@/composables/useNotify'
import { DEFAULT_AVATAR } from '@/utils/constants'

// Modal Imports
import EditNicknameModal from '@/components/mobile/profile/modals/EditNicknameModal.vue'
import MobileChangePasswordModal from '@/components/mobile/profile/modals/MobileChangePasswordModal.vue'
import ChangeEmailModal from '@/components/mobile/profile/modals/ChangeEmailModal.vue'
import MobileDeleteAccountModal from '@/components/mobile/profile/modals/MobileDeleteAccountModal.vue'
import MobileLogoutModal from '@/components/mobile/profile/modals/MobileLogoutModal.vue'
import SelectAvatarModal from '@/components/mobile/profile/modals/SelectAvatarModal.vue' // New
import WechatBindModal from '@/components/mobile/profile/modals/WechatBindModal.vue' // New
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const activeModal = ref<string | null>(null)
const { success, error } = useNotify()

const handleSuccess = (msg: string) => {
    success(msg)
    userStore.fetchUserInfo()
}

const handleLogout = () => {
    activeModal.value = 'logout'
}

const handleLogoutConfirm = async () => {
    loading.value = true
    try {
        await userStore.logout()
    } catch (e) {
        if (import.meta.dev) console.error('Logout failed:', e)
    } finally {
        activeModal.value = null
        loading.value = false
        router.replace(mobileRoutes.home())
    }
}

const copyUID = () => {
    const uid = userStore.user?.uid || userStore.user?.id?.toString()
    if (!uid) return
    
    // Simple copy fallback
    const textArea = document.createElement('textarea')
    textArea.value = uid
    document.body.appendChild(textArea)
    textArea.select()
    try {
        document.execCommand('copy')
        success('UID 已复制')
    } catch (err) {
        error('复制失败')
    }
    document.body.removeChild(textArea)
}

const handleImageError = (e: Event) => {
    const target = e.target as HTMLImageElement
    target.src = DEFAULT_AVATAR
}
</script>

<style scoped>
/* -------------------------------------------
   Account Page Styles (Cyber/Neon Theme)
------------------------------------------- */
.mobile-page {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  color: #fff;
  display: flex; flex-direction: column;
}



.settings-content { padding: 20px; display: flex; flex-direction: column; gap: 16px; }

/* Setting Item Container */
.setting-container {
    background: var(--cyber-bg-glass, rgba(30, 41, 59, 0.4));
    border: 1px solid var(--cyber-border, rgba(6, 182, 212, 0.3));
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(12px);
}

.setting-item {
    background: transparent;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 18px 20px;
    display: flex; justify-content: space-between; align-items: center;
    cursor: pointer;
    transition: background 0.2s;
    min-height: 60px; /* Ensure consistent height */
}
.setting-item:last-child { border-bottom: none; }
.setting-item:active { background: rgba(6, 182, 212, 0.1); }

.label { font-size: 15px; color: #E2E8F0; font-weight: 500; } /* Lighter text */

.right { 
    display: flex; align-items: center; gap: 8px; 
    color: #94A3B8;
}

.value { font-size: 14px; color: #94A3B8; }
.value-wrap { display: flex; align-items: center; gap: 10px; }
.text-val { font-size: 14px; color: #94A3B8; }
.text-val.muted { color: #64748B; }
.text-val.success { color: #10B981; } /* Green */

.arrow { 
    color: #475569; font-size: 16px; transition: color 0.2s; 
    display: flex; align-items: center; /* Fix icon vertical alignment */
}
.setting-item:hover .arrow { color: #06B6D4; }

.avatar-img {
    width: 44px; height: 44px; border-radius: 50%; object-fit: cover;
    border: 2px solid var(--cyber-primary, #06B6D4);
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
}

.hidden-input { display: none; }

.copy-hint { font-size: 10px; color: var(--cyber-primary); margin-left: 4px; opacity: 0.8; }

.action-group { margin-top: 30px; display: flex; flex-direction: column; }

/* 退出登录: 安全中性样式 */
.logout-btn-safe {
    width: 100%; height: 50px;
    background: rgba(255, 255, 255, 0.05);
    color: #E2E8F0; 
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    font-size: 16px; font-weight: 600;
    transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
}
.logout-btn-safe:active { 
    background: rgba(255, 255, 255, 0.1); 
    border-color: rgba(255, 255, 255, 0.2);
}

.danger-zone-spacer { height: 50px; }

/* 注销账号: 弱视觉危险警告样式 */
.delete-account-ghost {
    width: 100%; height: 44px;
    background: transparent;
    color: #F87171; 
    border: 1px dashed rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    font-size: 14px; font-weight: 500;
    transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
}
.delete-account-ghost:active { 
    background: rgba(239, 68, 68, 0.05);
    border-color: rgba(239, 68, 68, 0.6);
}

.text-danger { color: #F87171; text-shadow: 0 0 5px rgba(248, 113, 113, 0.3); }

.text-copy {
    cursor: pointer; position: relative;
    display: flex; align-items: center; gap: 4px;
}
.text-copy:active { opacity: 0.7; }

/* Divider replaced by gap in flex container */
.divider { display: none; }
</style>
