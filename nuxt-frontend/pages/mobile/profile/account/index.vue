<template>
  <div class="mobile-page">
    <div class="page-header">
      <div class="back-btn" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <h1 class="page-title">账号设置</h1>
      <div class="header-right"></div>
    </div>

    <div class="settings-content">
       <!-- Avatar Section -->
       <div class="setting-item avatar-item" @click="triggerUpload">
          <span class="label">头像</span>
          <div class="value-wrap">
             <img :src="userStore.user?.avatar || '/images/default-avatar.png'" class="avatar-img" />
             <el-icon class="arrow"><ArrowRight /></el-icon>
          </div>
          <input 
             type="file" 
             ref="fileInput" 
             class="hidden-input" 
             accept="image/*"
             @change="handleFileChange"
          />
       </div>

       <!-- Nickname Section -->
       <div class="setting-item" @click="activeModal = 'nickname'">
          <span class="label">昵称</span>
          <div class="value-wrap">
             <span class="text-val">{{ userStore.user?.nickName || userStore.user?.nickname || '未设置' }}</span>
             <el-icon class="arrow"><ArrowRight /></el-icon>
          </div>
       </div>

       <!-- Read-only Info -->
       <div class="setting-item">
          <span class="label">UID</span>
          <div class="value-wrap">
             <span class="text-val muted">{{ userStore.user?.uid || userStore.user?.id?.toString().slice(0,8) || '---' }}</span>
          </div>
       </div>

       <div class="divider"></div>

       <!-- Security Section -->
       <div class="setting-item" @click="handleWechatBindAction">
          <span class="label">微信绑定</span>
          <div class="value-wrap">
             <span class="text-val success" v-if="userStore.user?.openId">已绑定</span>
             <span class="text-val muted" v-else>未绑定</span>
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

       <div class="divider"></div>

       <!-- Danger Zone -->
       <div class="setting-item" @click="activeModal = 'delete'">
          <span class="label text-danger">注销账号</span>
          <div class="value-wrap">
             <el-icon class="arrow"><ArrowRight /></el-icon>
          </div>
       </div>

       <!-- Actions -->
       <div class="action-group">
          <button class="logout-btn" @click="handleLogout">退出登录</button>
       </div>
    </div>

    <!-- Modals -->
    <EditNicknameModal 
        :visible="activeModal === 'nickname'"
        :current-nickname="userStore.user?.nickName"
        @close="activeModal = null"
        @success="handleSuccess('昵称已更新')"
    />

    <ChangePasswordModal 
        :visible="activeModal === 'password'"
        @close="activeModal = null"
        @success="handleSuccess('密码已修改')"
    />

    <ChangeEmailModal 
        :visible="activeModal === 'email'"
        @close="activeModal = null"
        @success="handleSuccess('请查收确认邮件')"
    />

    <DeleteAccountModal 
        :visible="activeModal === 'delete'"
        @close="activeModal = null"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import { commonApi } from '@/api/client/common'
import { clientUserApi } from '@/api/client/user'
import { authApi } from '@/api/client/auth' // Add missing authApi import if not present
import { wechatLoginApi } from '@/api/client/wechat-login'
import { ElMessage } from 'element-plus'

// Modal Imports
import EditNicknameModal from '@/components/mobile/profile/modals/EditNicknameModal.vue'
import ChangePasswordModal from '@/components/mobile/profile/modals/ChangePasswordModal.vue'
import ChangeEmailModal from '@/components/mobile/profile/modals/ChangeEmailModal.vue'
import DeleteAccountModal from '@/components/mobile/profile/modals/DeleteAccountModal.vue'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const userStore = useUserStore()
const fileInput = ref<HTMLInputElement | null>(null)
const loading = ref(false)

const activeModal = ref<string | null>(null)

const triggerUpload = () => {
    fileInput.value?.click()
}

const handleWechatBindAction = () => {
    if (userStore.user?.openId) {
        ElMessage.info({ message: '您已绑定微信', offset: 100, customClass: 'mobile-message' })
        return
    }
    // Redirect to WeChat Auth
    const redirectUri = window.location.origin + '/mobile/wechat-callback'
    const authUrl = wechatLoginApi.getOAuthUrl(redirectUri, 'bind') // state='bind'
    window.location.href = authUrl
}


const handleFileChange = async (e: Event) => {
    const files = (e.target as HTMLInputElement).files
    if (!files || files.length === 0) return

    const file = files[0]
    // Basic validation
    if (file.size > 2 * 1024 * 1024) {
        ElMessage.warning('图片大小不能超过 2MB')
        return
    }

    loading.value = true
    try {
        // 1. Upload
        const uploadRes = await commonApi.uploadFile(file)
        if (uploadRes.success && uploadRes.data && uploadRes.data.src) {
            const newUrl = uploadRes.data.src
            
            // 2. Update Profile
            const updateRes = await clientUserApi.updateAvatar(newUrl)
            if (updateRes.success) {
                ElMessage.success({ message: '头像更新成功', offset: 100, customClass: 'mobile-message' })
                userStore.fetchUserInfo()
            } else {
                ElMessage.error(updateRes.error || '更新头像失败')
            }
        } else {
             ElMessage.error(uploadRes.msg || '上传失败')
        }
    } catch (err) {
        ElMessage.error('网络错误')
    } finally {
        loading.value = false
        // Reset input
        if (fileInput.value) fileInput.value.value = ''
    }
}

const handleSuccess = (msg: string) => {
    ElMessage.success({ message: msg, offset: 100, customClass: 'mobile-message' })
    userStore.fetchUserInfo()
}

const handleLogout = async () => {
    if (confirm('确定要退出登录吗？')) {
        try {
            await authApi.logout()
        } catch (e) {
            console.error('Logout API failed:', e)
        } finally {
            userStore.logout()
            router.replace('/mobile')
        }
    }
}
</script>

<style scoped>
.mobile-page {
  min-height: 100vh;
  background: #0F172A;
  color: #fff;
  display: flex; flex-direction: column;
}

.page-header {
  display: flex; align-items: center; padding: 20px;
  background: rgba(15, 23, 42, 0.95);
  position: sticky; top: 0; z-index: 20;
}
.back-btn {
  width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.1); border-radius: 50%;
}
.page-title { flex: 1; text-align: center; font-size: 18px; font-weight: 600; margin: 0; padding-right: 32px; }

.settings-content { padding: 20px; }

.setting-item {
    background: rgba(30, 41, 59, 0.4);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 16px;
    display: flex; justify-content: space-between; align-items: center;
    cursor: pointer;
}
.setting-item:first-child { border-top-left-radius: 12px; border-top-right-radius: 12px; }
.setting-item:last-of-type { border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; border-bottom: none; }
.setting-item:active { background: rgba(30, 41, 59, 0.8); }

.label { font-size: 15px; color: #E2E8F0; }
.value-wrap { display: flex; align-items: center; gap: 8px; }
.text-val { font-size: 14px; color: #94A3B8; }
.text-val.muted { color: #64748B; }
.text-val.success { color: #34D399; }
.arrow { color: #64748B; font-size: 14px; }

.avatar-img {
    width: 40px; height: 40px; border-radius: 50%; object-fit: cover;
    border: 2px solid rgba(255,255,255,0.1);
}

.hidden-input { display: none; }

.action-group { margin-top: 40px; }

.logout-btn {
    width: 100%; height: 48px;
    background: rgba(239, 68, 68, 0.1);
    color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 12px;
    font-size: 15px; font-weight: 600;
}
.logout-btn:active { background: rgba(239, 68, 68, 0.2); }

.text-danger { color: #EF4444; }

.divider {
    height: 12px;
}
</style>
