<template>
  <div class="personal-info-page">
    <!-- 页面标题和操作按钮 (Fixed Top) -->
    <div class="page-header">
      <h1 class="page-title">个人信息</h1>
      <button class="change-password-btn" @click="showModal('password')">
        更新密码
      </button>
    </div>

    <!-- 可滚动内容区域 -->
    <div class="info-scroll-area">
        <!-- 个人信息内容 -->
        <div class="info-content">
          <!-- 头像和昵称 (无Label模式) -->
          <div class="info-section avatar-section">
            <div class="avatar-info">
              <div class="avatar-wrapper">
                <img :src="user.avatar || '/images/client/pc/avatars/avatar-cat.png'" :alt="user.nickname" class="user-avatar" />
                <div class="avatar-overlay" @click="showModal('avatar')">
                  <span>更换</span>
                </div>
              </div>
              <div class="avatar-details">
                <div class="user-name">{{ user.nickname }}</div>
                <button class="edit-btn secondary-btn" @click="showModal('nickname')">
                  更改昵称
                </button>
              </div>
            </div>
          </div>

          <!-- UID信息 -->
          <div class="info-section">
            <div class="section-label">UID</div>
            <div class="section-value">{{ user.uid || user.id || '87654321' }}</div>
          </div>

          <!-- 绑定邮箱 (暂隐藏换绑功能) -->
          <div class="info-section">
            <div class="section-label">当前邮箱</div>
            <div class="section-content">
              <div class="section-value">{{ user.email || 'user@example.com' }}</div>
              <button class="bind-btn secondary-btn" @click="showModal('email')">
                换绑邮箱
              </button>
            </div>
          </div>

          <!-- 快捷操作卡片 -->
          <div class="quick-actions">
            <div class="quick-actions-title">账户管理</div>
            <div class="quick-actions-grid">
              <div class="action-card" @click="showModal('password')">
                <div class="action-icon">🔑</div>
                <div class="action-info">
                  <div class="action-name">修改密码</div>
                  <div class="action-desc">更新登录密码</div>
                </div>
                <div class="action-arrow">→</div>
              </div>
              
              <div class="action-card" @click="showModal('google')">
                <div class="action-icon">🔗</div>
                <div class="action-info">
                  <div class="action-name">账户绑定</div>
                  <div class="action-desc">Google、微信绑定</div>
                </div>
                <div class="action-arrow">→</div>
              </div>
              
              <div class="action-card action-card-danger" @click="showModal('delete')">
                <div class="action-icon">⚠️</div>
                <div class="action-info">
                  <div class="action-name">注销账号</div>
                  <div class="action-desc">永久删除账户</div>
                </div>
                <div class="action-arrow">→</div>
              </div>
            </div>
          </div>
        </div>
    </div>

    <!-- Modals -->
    <ChangeAvatarModal 
      v-if="modals.avatar" 
      :current-avatar="user.avatar"
      @close="closeModal('avatar')" 
      @update="updateAvatar"
    />
    
    <ChangeNicknameModal 
      v-if="modals.nickname" 
      :current-nickname="user.nickname"
      @close="closeModal('nickname')" 
      @update="updateNickname"
    />

    <BindEmailModal 
      v-if="modals.email" 
      :current-email="user.email"
      @close="closeModal('email')" 
      @confirm="updateEmail"
    />

    <BindGoogleModal 
      v-if="modals.google" 
      :is-bound="!!user.isGoogleBound"
      :current-google-email="user.googleEmail"
      @close="closeModal('google')" 
      @bind="handleGoogleBind"
    />

    <ChangePasswordModal 
      v-if="modals.password" 
      :email="user.email"
      @close="closeModal('password')"
    />

    <DeleteAccountModal 
      v-if="modals.delete" 
      :email="user.email"
      @close="closeModal('delete')" 
      @confirm="handleDeleteAccount"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { authApi } from '@/api/auth'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

// Define Props
interface Props {
  user: any // Simplify to any to accept store user object directly
}

const props = defineProps<Props>()
const emit = defineEmits(['update:user'])
const userStore = useUserStore()

// Modals State
const modals = reactive({
  avatar: false,
  nickname: false,
  email: false,
  google: false,
  password: false,
  delete: false
})

const showModal = (type: keyof typeof modals) => {
  // 先关闭所有弹窗，防止状态冲突
  Object.keys(modals).forEach(k => {
    modals[k as keyof typeof modals] = false
  })
  modals[type] = true
}

const closeModal = (type: keyof typeof modals) => {
  modals[type] = false
}

// Handlers
const updateAvatar = async (newAvatar: string) => {
  try {
    const res = await authApi.updateProfile({ avatar: newAvatar })
    if (res.success) {
      ElMessage.success('头像更新成功')
      // Update store and refresh
      await userStore.fetchUserInfo()
      closeModal('avatar')
    } else {
      ElMessage.error(res.msg || '头像更新失败')
    }
  } catch (error: any) {
    ElMessage.error(error.message || '头像更新失败')
  }
}

const updateNickname = async (newNickname: string) => {
  try {
    const res = await authApi.updateProfile({ nickname: newNickname })
    if (res.success) {
      ElMessage.success('昵称更新成功')
       // Update store and refresh
      await userStore.fetchUserInfo()
      closeModal('nickname')
    } else {
      ElMessage.error(res.msg || '昵称更新失败')
    }
  } catch (error: any) {
    ElMessage.error(error.message || '昵称更新失败')
  }
}

// 换绑邮箱成功后刷新
const updateEmail = async (newEmail: string) => {
  console.log('Email updated to:', newEmail)
  // 刷新用户信息以显示新邮箱
  await userStore.fetchUserInfo()
  closeModal('email')
}

const handleGoogleBind = () => {
  console.log('Google Bind Action Triggered')
}

const handleDeleteAccount = async () => {
  try {
    const res = await authApi.deleteAccount()
    if (res.success) {
      // Import ElMessageBox for modal dialog
      const { ElMessageBox } = await import('element-plus')
      
      // Clear local state first
      await userStore.logout()
      
      // Show success modal
      ElMessageBox.alert(
        '您的账号已成功注销，所有数据已被永久删除。感谢您的使用！',
        '注销成功',
        {
          confirmButtonText: '返回首页',
          type: 'success',
          center: true,
          callback: () => {
            window.location.href = '/'
          }
        }
      )
    } else {
      ElMessage.error(res.msg || '注销失败')
    }
  } catch (error: any) {
    ElMessage.error(error.message || '注销失败')
  }
}

</script>

<style scoped>
/* Glass Shell Layout */
/* Glass Shell Layout */
.personal-info-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* background: rgba(30, 41, 59, 0.7); -> Handled by Parent */
  /* backdrop-filter: blur(20px); -> Handled by Parent */
  /* border: 1px solid rgba(255, 255, 255, 0.1); -> Handled by Parent */
  /* border-radius: 24px; -> Handled by Parent */
  /* overflow: hidden; -> Handled by Parent */
  /* box-shadow: 0 4px 20px rgba(0,0,0,0.2); -> Handled by Parent */
  box-sizing: border-box;
}

/* 页面标题区域 (Fixed) */
.page-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.page-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.change-password-btn {
  padding: 10px 24px;
  background: var(--primary-blue);
  color: white;
  border: none;
  border-radius: 100px; /* Pill */
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.change-password-btn:hover {
  background: var(--active-orange);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

/* Scrollable Content Area */
.info-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  /* Scrollbar Styling */
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
}

.info-scroll-area::-webkit-scrollbar {
  width: 6px;
}
.info-scroll-area::-webkit-scrollbar-track {
  background: transparent;
}
.info-scroll-area::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 3px;
}

.info-content {
  padding: 32px;
}

.info-section {
  margin-bottom: 32px;
}

.avatar-section {
    margin-bottom: 40px; /* 增加头像区域间距 */
}

.section-label {
  font-size: 14px;
  font-weight: 500;
  color: #94A3B8; /* Slate-400 */
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.section-value {
  font-size: 16px;
  color: #E2E8F0; /* Slate-200 */
  flex: 1;
  font-family: 'Monaco', monospace; 
  font-weight: 500;
}

.section-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* 头像信息 - 移除Label后样式 */
.avatar-info {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar-wrapper {
  position: relative;
  width: 90px;
  height: 90px;
  cursor: pointer;
}

.user-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.avatar-wrapper:hover .user-avatar {
    border-color: var(--active-orange);
}

.avatar-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  display: flex; alignItems: center; justifyContent: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: #fff;
  font-size: 12px;
  backdrop-filter: blur(2px);
}

.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

.avatar-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.user-name {
  font-size: 24px; 
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

/* 统一特定辅助按钮样式 (Edit / Bind) */
.secondary-btn {
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #94A3B8;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.secondary-btn:hover {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

/* 快捷操作卡片 */
.quick-actions {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.quick-actions-title {
  font-size: 14px;
  font-weight: 600;
  color: #94A3B8;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-card:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

.action-card.action-card-danger:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

.action-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.action-info {
  flex: 1;
}

.action-name {
  font-size: 14px;
  font-weight: 600;
  color: #E2E8F0;
  margin-bottom: 2px;
}

.action-desc {
  font-size: 12px;
  color: #64748B;
}

.action-arrow {
  font-size: 16px;
  color: #64748B;
  transition: transform 0.2s;
}

.action-card:hover .action-arrow {
  transform: translateX(4px);
  color: #3B82F6;
}

.action-card.action-card-danger:hover .action-arrow {
  color: #EF4444;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .page-header {
    padding: 20px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .page-title {
    text-align: center;
  }
  
  .info-content {
    padding: 20px;
  }
  
  .section-content {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .avatar-info {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .avatar-details {
      align-items: center;
  }

  .danger-zone {
    flex-direction: column-reverse;
    text-align: center;
    gap: 20px;
  }
}
</style>