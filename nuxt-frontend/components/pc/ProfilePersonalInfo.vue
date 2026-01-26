<template>
  <div class="personal-info-page">
    <!-- 1. Hero Banner: Identity -->
    <div class="profile-banner">
      <div class="banner-glass"></div>
      <div class="banner-content">
        <div class="hero-left">
          <div class="hero-avatar-wrapper" @click="showModal('avatar')">
            <img :src="user.avatar || '/images/client/pc/avatars/avatar-cat.png'" class="hero-avatar" />
            <div class="hero-avatar-overlay"><el-icon><Camera /></el-icon></div>
          </div>
          <div class="hero-text">
            <h1 class="hero-nickname">{{ user.nickname }}</h1>
            <div class="hero-tags">
              <span class="user-tag role-tag">FANTULA Member</span>
              <span class="user-tag security-tag">
                <el-icon><CircleCheck /></el-icon> 安全等级: 高
              </span>
            </div>
          </div>
        </div>
        
        <div class="hero-actions">
           <button class="glass-pill-btn primary-glass-btn" @click="showModal('nickname')">
             <el-icon><Edit /></el-icon> 编辑资料
           </button>
        </div>
      </div>
    </div>

    <!-- Scrollable Workspace -->
    <div class="workspace-scroll-area">
      <div class="workspace-content">
        
        <!-- 2. Info Grid (Data Display) -->
        <div class="info-grid section-gap">
          <!-- UID Card -->
          <div class="glass-tile info-tile">
            <div class="tile-icon-bg"><el-icon><CreditCard /></el-icon></div>
            <div class="tile-header">
              <div class="tile-label">账户 UID</div>
              <el-icon class="tile-corner-icon"><CreditCard /></el-icon>
            </div>
            <div class="tile-value-group">
              <span class="tile-value-mono">{{ user.uid || user.id || '---' }}</span>
              <button class="copy-btn-mini" @click="handleCopy(user.uid || user.id)">
                <el-icon><CopyDocument /></el-icon>
              </button>
            </div>
          </div>

          <!-- Email Card -->
          <div class="glass-tile info-tile">
            <div class="tile-icon-bg"><el-icon><Message /></el-icon></div>
            <div class="tile-header">
              <div class="tile-label">绑定邮箱</div>
              <div class="status-badge success" v-if="user.email">已绑定</div>
              <div class="status-badge warning" v-else>未绑定</div>
            </div>
            <div class="tile-value-group">
              <span class="tile-value">{{ user.email || '未绑定邮箱' }}</span>
              <button class="icon-action-btn" @click="showModal('email')">
                <el-icon><EditPen /></el-icon>
              </button>
            </div>
          </div>

          <!-- Account Security / Stats (Placeholder for balance or reliability) -->
          <div class="glass-tile info-tile">
             <div class="tile-icon-bg"><el-icon><Lock /></el-icon></div>
             <div class="tile-header">
               <div class="tile-label">账号安全</div>
               <div class="status-badge success">保护中</div>
             </div>
             <div class="tile-value-group">
               <div class="security-level-bar">
                 <div class="level-fill" style="width: 100%"></div>
               </div>
               <span class="tile-meta">极高</span>
             </div>
          </div>
        </div>

        <!-- 3. Command Center (Actions) -->
        <div class="command-center section-gap">
          <h3 class="section-title">账户管理</h3>
          <div class="command-grid">
            
            <!-- Update Password -->
            <div class="action-card-lg" @click="showModal('password')">
              <div class="card-bg-icon">🔑</div>
              <div class="card-content">
                <div class="card-icon-frame blue-frame"><el-icon><Key /></el-icon></div>
                <div class="card-text">
                  <span class="card-title">修改密码</span>
                  <span class="card-desc">定期更新密码保护账号安全</span>
                </div>
              </div>
              <div class="card-arrow"><el-icon><ArrowRight /></el-icon></div>
            </div>

            <!-- Account Binding -->
            <div class="action-card-lg" @click="showModal('google')">
              <div class="card-bg-icon">🔗</div>
              <div class="card-content">
                <div class="card-icon-frame purple-frame"><el-icon><Connection /></el-icon></div>
                <div class="card-text">
                  <span class="card-title">账号绑定</span>
                  <span class="card-desc">Google / 微信 快捷登录</span>
                </div>
              </div>
              <div class="card-arrow"><el-icon><ArrowRight /></el-icon></div>
            </div>

            <!-- Delete Account -->
            <div class="action-card-lg danger-card" @click="showModal('delete')">
              <div class="card-bg-icon">⚠️</div>
              <div class="card-content">
                <div class="card-icon-frame red-frame"><el-icon><Warning /></el-icon></div>
                <div class="card-text">
                  <span class="card-title">注销账号</span>
                  <span class="card-desc">永久删除账号数据</span>
                </div>
              </div>
              <div class="card-arrow"><el-icon><ArrowRight /></el-icon></div>
            </div>
            
          </div>
        </div>

      </div>
    </div>

    <!-- Modals (v-model:visible for correct transition handling) -->
    <ChangeAvatarModal v-model:visible="modals.avatar" :current-avatar="user.avatar" @close="closeModal('avatar')" @update="updateAvatar" />
    <ChangeNicknameModal v-model:visible="modals.nickname" :current-nickname="user.nickname" @close="closeModal('nickname')" @update="updateNickname" />
    <BindEmailModal v-model:visible="modals.email" :current-email="user.email" @close="closeModal('email')" @confirm="updateEmail" />
    <BindGoogleModal v-model:visible="modals.google" :is-bound="!!user.isGoogleBound" :current-google-email="user.googleEmail" @close="closeModal('google')" @bind="handleGoogleBind" />
    <ChangePasswordModal v-model:visible="modals.password" :email="user.email" @close="closeModal('password')" />
    <DeleteAccountModal v-model:visible="modals.delete" :email="user.email" @close="closeModal('delete')" @confirm="handleDeleteAccount" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Camera, Edit, CircleCheck, CreditCard, CopyDocument, 
  Message, EditPen, Lock, Key, Connection, Warning, ArrowRight 
} from '@element-plus/icons-vue'
import { CLIENT_MESSAGES } from '@/utils/clientMessages'

// Component Imports (Explicit to fix hydration/loading issues)
import ChangeAvatarModal from '@/components/pc/modal/ChangeAvatarModal.vue'
import ChangeNicknameModal from '@/components/pc/modal/ChangeNicknameModal.vue'
import BindEmailModal from '@/components/pc/modal/BindEmailModal.vue'
import BindGoogleModal from '@/components/pc/modal/BindGoogleModal.vue'
import ChangePasswordModal from '@/components/pc/modal/ChangePasswordModal.vue'
import DeleteAccountModal from '@/components/pc/modal/DeleteAccountModal.vue'

// Define Props
interface Props {
  user: any 
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
      ElMessage.success(CLIENT_MESSAGES.PROFILE.AVATAR_UPDATE)
      await userStore.fetchUserInfo()
      closeModal('avatar')
    } else {
      ElMessage.error(res.msg || CLIENT_MESSAGES.PROFILE.AVATAR_FAIL)
    }
  } catch (error: any) {
    ElMessage.error(error.message || CLIENT_MESSAGES.PROFILE.AVATAR_FAIL)
  }
}

const updateNickname = async (newNickname: string) => {
  try {
    const res = await authApi.updateProfile({ nickname: newNickname })
    if (res.success) {
      ElMessage.success(CLIENT_MESSAGES.PROFILE.NICKNAME_UPDATE)
      await userStore.fetchUserInfo()
      closeModal('nickname')
    } else {
      ElMessage.error(res.msg || CLIENT_MESSAGES.PROFILE.NICKNAME_FAIL)
    }
  } catch (error: any) {
    ElMessage.error(error.message || CLIENT_MESSAGES.PROFILE.NICKNAME_FAIL)
  }
}

const updateEmail = async (newEmail: string) => {
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
      const { ElMessageBox } = await import('element-plus')
      await userStore.logout()
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
      ElMessage.error(res.msg || CLIENT_MESSAGES.PROFILE.LOGOUT_FAIL) // Mapped as defined
    }
  } catch (error: any) {
    ElMessage.error(error.message || CLIENT_MESSAGES.PROFILE.LOGOUT_FAIL)
  }
}

const handleCopy = (text: string) => {
  if(!text || text === '---') return
  navigator.clipboard.writeText(text).then(() => {
    ElMessage.success(CLIENT_MESSAGES.PROFILE.UID_COPY)
  })
}
</script>

<style scoped>
/* Page Layout */
.personal-info-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  /* Parent container handles the sheer glass frame */
}

/* 1. Hero Banner */
.profile-banner {
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 180px; /* Reduced from excessive height */
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
}

/* Mesh Gradient Background */
.banner-glass {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.15), transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.1), transparent 40%);
  pointer-events: none;
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.hero-avatar-wrapper {
  position: relative;
  width: 88px; height: 88px;
  cursor: pointer;
}

.hero-avatar {
  width: 100%; height: 100%;
  border-radius: 50%;
  border: 4px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.hero-avatar-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  border-radius: 50%;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: #fff; font-size: 24px;
  backdrop-filter: blur(2px);
}

.hero-avatar-wrapper:hover .hero-avatar-overlay { opacity: 1; }
.hero-avatar-wrapper:hover .hero-avatar { border-color: rgba(6, 182, 212, 0.5); }

.hero-text {
  display: flex; flex-direction: column; gap: 8px;
}

.hero-nickname {
  margin: 0;
  font-size: 28px; font-weight: 700; color: #fff;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero-tags {
  display: flex; gap: 10px;
}

.user-tag {
  font-size: 12px; font-weight: 500;
  padding: 4px 10px; border-radius: 6px;
  display: flex; align-items: center; gap: 6px;
}

.user-tag.role-tag {
  background: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.user-tag.security-tag {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* Glass Pill Button */
.glass-pill-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-size: 14px; font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(4px);
}

.primary-glass-btn:hover {
  background: linear-gradient(90deg, #06B6D4 0%, #3B82F6 100%);
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
  transform: translateY(-1px);
}

/* Scroll Area */
.workspace-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 40px;
}
.workspace-scroll-area::-webkit-scrollbar { width: 0; }

.workspace-content {
  padding: 32px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-gap { margin-bottom: 40px; }
.section-title {
  font-size: 16px; font-weight: 600; color: #94A3B8;
  margin-bottom: 20px; letter-spacing: 0.5px;
}

/* 2. Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.glass-tile {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 20px;
  overflow: hidden;
  display: flex; flex-direction: column; gap: 16px;
  transition: all 0.3s;
}

.glass-tile:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.tile-icon-bg {
  position: absolute; bottom: -10px; right: -10px;
  font-size: 80px; color: rgba(255,255,255,0.15); /* Significantly Increased visibility */
  transform: rotate(-15deg);
  pointer-events: none;
}

.tile-header {
  display: flex; justify-content: space-between; align-items: start;
}

.tile-label { font-size: 13px; color: #64748B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

.tile-corner-icon { font-size: 20px; color: rgba(255,255,255,0.1); }

.status-badge {
  font-size: 12px; padding: 2px 8px; border-radius: 4px; border: 1px solid;
}
.status-badge.success { color: #34D399; background: rgba(52, 211, 153, 0.1); border-color: rgba(52, 211, 153, 0.2); }
.status-badge.warning { color: #FBBF24; background: rgba(251, 191, 36, 0.1); border-color: rgba(251, 191, 36, 0.2); }

.tile-value-group {
  display: flex; align-items: center; justify-content: space-between;
}

.tile-value-mono {
  font-family: 'Monaco', monospace; font-size: 18px; color: #E2E8F0; font-weight: 600; letter-spacing: 1px;
}
.tile-value { font-size: 16px; color: #E2E8F0; font-weight: 500; }
.tile-meta { font-size: 16px; color: #34D399; font-weight: 600; }

.copy-btn-mini, .icon-action-btn {
  background: transparent; border: none; color: #64748B;
  cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px;
  transition: all 0.2s;
}
.copy-btn-mini:hover, .icon-action-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

.security-level-bar {
  flex: 1; height: 6px; background: rgba(255,255,255,0.1);
  border-radius: 3px; margin-right: 12px; overflow: hidden;
}
.level-fill { height: 100%; background: #34D399; border-radius: 3px; }


/* 3. Command Center */
.command-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.action-card-lg {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: space-between;
  overflow: hidden;
  transition: all 0.3s ease;
  min-height: 100px;
}

.action-card-lg:hover {
  background: rgba(59, 130, 246, 0.08); /* Blue Tint */
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
}

.danger-card:hover {
  background: rgba(239, 68, 68, 0.08); /* Red Tint */
  border-color: rgba(239, 68, 68, 0.3);
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.1);
}

.card-bg-icon {
  position: absolute; right: -10px; bottom: -15px;
  font-size: 90px; opacity: 0.15; /* Significantly Increased visibility */
  transform: rotate(10deg);
  pointer-events: none;
  filter: grayscale(1);
  transition: all 0.3s;
}

.action-card-lg:hover .card-bg-icon {
  opacity: 0.1;
  filter: grayscale(0);
  transform: rotate(0deg) scale(1.1);
}

.card-content {
  display: flex; align-items: center; gap: 16px;
  position: relative; z-index: 2;
}

.card-icon-frame {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
}

.blue-frame { background: rgba(59, 130, 246, 0.15); color: #60A5FA; }
.purple-frame { background: rgba(139, 92, 246, 0.15); color: #A78BFA; }
.red-frame { background: rgba(239, 68, 68, 0.15); color: #F87171; }

.card-text { display: flex; flex-direction: column; gap: 4px; }
.card-title { font-size: 16px; font-weight: 600; color: #F1F5F9; }
.card-desc { font-size: 12px; color: #64748B; }

.card-arrow {
  color: #475569; font-size: 18px; transition: all 0.3s;
  position: relative; z-index: 2;
}

.action-card-lg:hover .card-arrow {
  color: #fff; transform: translateX(6px);
}

/* Responsive */
@media (max-width: 1000px) {
  .info-grid, .command-grid { grid-template-columns: 1fr; }
  .profile-banner { flex-direction: column; padding: 20px; height: auto; gap: 20px; align-items: flex-start; }
  .banner-content { flex-direction: column; align-items: flex-start; gap: 20px; }
  .hero-actions { width: 100%; display: flex; justify-content: flex-end; }
}
</style>