<template>
  <div>
    <!-- Main Settings Sheet -->
    <div v-if="visible" class="sheet-overlay" @click="close">
      <div class="sheet-content" @click.stop>
        <!-- Grab Handle -->
        <div class="sheet-handle-bar">
            <div class="sheet-handle"></div>
        </div>

        <div class="sheet-header">
          <div class="sheet-title">设置</div>
        </div>
        
        <div class="sheet-body">
           <div class="setting-group">
               <div class="group-title">账号信息</div>
               
               <div class="setting-item" @click="openModal('nickname')">
                   <div class="item-left">
                       <User class="w-5 h-5 text-icon" />
                       <span>修改昵称</span>
                   </div>
                   <ArrowRight class="w-4 h-4 text-arrow" />
               </div>

               <div class="setting-item" @click="openModal('email')">
                   <div class="item-left">
                       <Message class="w-5 h-5 text-icon" />
                       <span>换绑邮箱</span>
                   </div>
                   <ArrowRight class="w-4 h-4 text-arrow" />
               </div>
           </div>

           <div class="setting-group">
               <div class="group-title">安全与隐私</div>

               <div class="setting-item" @click="openModal('password')">
                   <div class="item-left">
                       <Lock class="w-5 h-5 text-icon" />
                       <span>修改密码</span>
                   </div>
                   <ArrowRight class="w-4 h-4 text-arrow" />
               </div>

               <div class="setting-item" @click="openModal('delete')">
                   <div class="item-left">
                       <Delete class="w-5 h-5 text-red-400" />
                       <span class="text-red-400">注销账号</span>
                   </div>
                   <ArrowRight class="w-4 h-4 text-arrow" />
               </div>
           </div>

           <div class="setting-group">
               <div class="setting-item logout-item" @click="handleLogout">
                   <SwitchButton class="w-5 h-5" />
                   <span>退出登录</span>
               </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Sub Modals -->
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
    ArrowRight, User, Message, Lock, Delete, SwitchButton 
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'

// Import Modals
import EditNicknameModal from './modals/EditNicknameModal.vue'
import ChangePasswordModal from './modals/ChangePasswordModal.vue'
import ChangeEmailModal from './modals/ChangeEmailModal.vue'
import DeleteAccountModal from './modals/DeleteAccountModal.vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close'])
const router = useRouter()
const userStore = useUserStore()

const activeModal = ref<string | null>(null)

const close = () => {
    emit('close')
}

const openModal = (name: string) => {
    activeModal.value = name
}

const handleLogout = () => {
    if (confirm('确定要退出登录吗?')) {
        userStore.logout()
        router.push('/mobile')
        close()
    }
}

const handleSuccess = (msg: string) => {
    // Ideally use a Toast here, for now alert or simple log
    // alert(msg) // Modals already alert, so maybe just close is fine
}
</script>

<style scoped>
.sheet-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7); 
    z-index: 4000;
    display: flex; flex-direction: column; justify-content: flex-end;
    animation: fadeIn 0.3s forwards;
    backdrop-filter: blur(4px);
}

.sheet-content {
    background: #1E293B;
    border-top-left-radius: 20px; border-top-right-radius: 20px;
    padding: 10px 24px 40px 24px;
    max-height: 80vh; overflow-y: auto;
    display: flex; flex-direction: column;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    border-top: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
}

.sheet-handle-bar {
    display: flex; justify-content: center; padding: 10px 0; cursor: grab;
}
.sheet-handle {
    width: 40px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 4px;
}

.sheet-header {
    margin-bottom: 20px; padding-top: 10px;
}
.sheet-title { font-size: 20px; font-weight: 700; color: #fff; }

.sheet-body { display: flex; flex-direction: column; gap: 24px; }

.group-title {
    font-size: 13px; color: #94A3B8; margin-bottom: 10px; padding-left: 4px;
}

.setting-group {
    background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden;
}

.setting-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
    transition: background 0.2s;
}
.setting-item:last-child { border-bottom: none; }
.setting-item:active { background: rgba(255,255,255,0.06); }

.item-left { display: flex; align-items: center; gap: 12px; }
.item-left span { font-size: 15px; color: #E2E8F0; font-weight: 500; }
.text-icon { color: #94A3B8; }
.text-arrow { color: #475569; }

.logout-item {
    justify-content: center; gap: 10px;
}
.logout-item span { color: #F87171; }
.logout-item .text-icon { color: #F87171; }

.text-red-400 { color: #F87171 !important; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
</style>
