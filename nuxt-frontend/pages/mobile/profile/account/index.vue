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
       <div class="setting-item" @click="openNicknameEdit">
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
             <span class="text-val muted">{{ userStore.user?.uid || userStore.user?.id?.slice(0,8) || '---' }}</span>
          </div>
       </div>

       <div class="setting-item">
          <span class="label">邮箱</span>
          <div class="value-wrap">
             <span class="text-val muted">{{ userStore.user?.email }}</span>
          </div>
       </div>

       <!-- Actions -->
       <div class="action-group">
          <button class="logout-btn" @click="handleLogout">退出登录</button>
       </div>
    </div>

    <!-- Nickname Dialog -->
    <div class="dialog-overlay" v-if="showNicknameDialog" @click.self="showNicknameDialog = false">
        <div class="dialog-box">
            <div class="dialog-title">修改昵称</div>
            <input v-model="newNickname" class="dialog-input" placeholder="请输入新昵称" />
            <div class="dialog-footer">
                <button class="btn cancel" @click="showNicknameDialog = false">取消</button>
                <button class="btn confirm" @click="confirmNickname" :disabled="loading">
                    <span v-if="loading">...</span>
                    <span v-else>保存</span>
                </button>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import { commonApi } from '@/api/client/common'
import { clientUserApi } from '@/api/client/user'
import { authApi } from '@/api/client/auth'
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const userStore = useUserStore()
const fileInput = ref<HTMLInputElement | null>(null)
const loading = ref(false)

// Nickname State
const showNicknameDialog = ref(false)
const newNickname = ref('')

const triggerUpload = () => {
    fileInput.value?.click()
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

const openNicknameEdit = () => {
    newNickname.value = userStore.user?.nickName ||  userStore.user?.nickname || ''
    showNicknameDialog.value = true
}

const confirmNickname = async () => {
    if (!newNickname.value.trim() || loading.value) return
    
    loading.value = true
    try {
        const res = await clientUserApi.updateNickname(newNickname.value)
        if (res.success) {
            ElMessage.success({ message: '昵称已更新', offset: 100, customClass: 'mobile-message' })
            showNicknameDialog.value = false
            userStore.fetchUserInfo()
        } else {
             ElMessage.error(res.error || '更新失败')
        }
    } finally {
        loading.value = false
    }
}

const handleLogout = async () => {
    if (confirm('确定要退出登录吗？')) {
        await authApi.logout()
        userStore.logout()
        router.push('/mobile')
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

/* Dialog */
.dialog-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    z-index: 100; display: flex; align-items: center; justify-content: center;
    padding: 40px;
}
.dialog-box {
    background: #1E293B; width: 100%; max-width: 320px;
    border-radius: 16px; padding: 24px;
    border: 1px solid rgba(255,255,255,0.1);
}
.dialog-title { font-size: 18px; font-weight: 600; text-align: center; margin-bottom: 20px; }
.dialog-input {
    width: 100%; height: 44px; background: #0F172A;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
    padding: 0 16px; color: #fff; font-size: 15px;
    margin-bottom: 20px;
}
.dialog-footer { display: flex; gap: 12px; }
.btn { flex: 1; height: 40px; border-radius: 8px; font-size: 14px; font-weight: 500; border: none; }
.btn.cancel { background: rgba(255,255,255,0.05); color: #94A3B8; }
.btn.confirm { background: #3B82F6; color: #fff; }
.btn:disabled { opacity: 0.5; }
</style>
