<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
      <div class="modal-content">
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
                <p class="tip-text">如需更换绑定，请在PC端操作或联系客服</p>
            </div>
            <div class="action-section" v-else>
                 <p class="tip-text">请在登录页或PC端进行微信绑定</p>
            </div>
        </div>

        <div class="modal-footer">
          <button class="submit-btn" @click="handleClose">
            知道了
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Close, ChatDotRound } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close'])
const userStore = useUserStore()

const isBound = computed(() => {
    return !!userStore.user?.openId
})

const handleClose = () => {
    emit('close')
}
</script>

<style scoped>
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
    z-index: 2000; display: flex; align-items: center; justify-content: center;
    padding: 20px;
}

.modal-content {
    background: var(--cyber-bg-glass, rgba(15, 23, 42, 0.85));
    width: 100%; max-width: 320px;
    border-radius: 20px; padding: 24px;
    border: 1px solid var(--cyber-border, rgba(6, 182, 212, 0.3));
    box-shadow: 0 0 30px rgba(6, 182, 212, 0.15), 0 10px 40px rgba(0,0,0,0.5);
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    backdrop-filter: blur(20px);
}

@keyframes popIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.modal-title { 
    font-size: 18px; font-weight: 700; color: #fff; margin: 0; 
    text-shadow: 0 0 10px rgba(255,255,255,0.2);
}
.close-btn { 
    background: none; border: none; color: #94A3B8; padding: 4px; 
    cursor: pointer; transition: color 0.2s;
}
.close-btn:hover { color: #fff; }

.bind-status-card {
    background: rgba(255,255,255,0.05); border-radius: 16px; padding: 20px;
    display: flex; align-items: center; gap: 16px;
    border: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 24px;
}
.bind-status-card.bound {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.3);
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.1);
}

.icon-wrapper {
    width: 48px; height: 48px; border-radius: 50%;
    background: #07C160; /* WeChat Green */
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 10px rgba(7, 193, 96, 0.4);
}
.status-info { flex: 1; }
.status-title { font-size: 16px; font-weight: 600; color: white; margin: 0 0 4px 0; }
.status-desc { font-size: 13px; color: #94A3B8; margin: 0; line-height: 1.4; }

.tip-text { text-align: center; color: #64748B; font-size: 13px; margin: 0; }

.modal-footer { margin-top: 24px; }
.submit-btn {
    width: 100%; height: 48px; 
    background: var(--cyber-gradient-btn, linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%));
    color: white; border-radius: 12px; font-size: 15px; font-weight: 600; border: none; cursor: pointer;
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
    transition: all 0.2s;
}
.submit-btn:active { transform: scale(0.96); box-shadow: 0 2px 8px rgba(6, 182, 212, 0.2); }
</style>
