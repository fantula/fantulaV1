<template>
  <Transition name="fade">
    <div v-if="visible" class="modal-overlay" @click="handleClose">
      <div class="modal-panel" @click.stop>
        <!-- Header -->
        <div class="modal-header">
           <div class="header-title">联系我们</div>
           <div class="close-btn" @click="handleClose">
             <el-icon><Close /></el-icon>
           </div>
        </div>

        <!-- Body -->
        <div class="modal-body">
           
           <!-- WeChat -->
           <div class="contact-card wechat">
              <div class="card-icon">
                 <el-icon><ChatDotRound /></el-icon>
              </div>
              <div class="card-info">
                 <div class="label">微信客服</div>
                 <div class="value">{{ config.wechat_id || 'Spotify-cn' }}</div>
              </div>
              <button class="action-btn" @click="copyText(config.wechat_id || 'Spotify-cn')">
                 复制
              </button>
           </div>

           <!-- Service Time -->
           <div class="time-tip">
              <el-icon><Clock /></el-icon>
              <span>在线时间：{{ config.service_time || '10:00 - 23:00' }}</span>
           </div>

           <!-- Telegram -->
           <div class="contact-card telegram">
              <div class="card-icon">
                 <el-icon><Position /></el-icon>
              </div>
              <div class="card-info">
                 <div class="label">Telegram</div>
                 <div class="value">{{ config.telegram_id || '@Fantula_Support' }}</div>
              </div>
              <button class="action-btn" @click="copyText(config.telegram_id || '@Fantula_Support')">
                 复制
              </button>
           </div>

        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Close, ChatDotRound, Position, Clock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useSystemConfig } from '@/composables/client/useSystemConfig'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const { contactConfig, fetchContactConfig } = useSystemConfig()

const config = computed(() => {
    return contactConfig.value || {
        wechat_id: 'Spotify-cn',
        telegram_id: '@Fantula_Support',
        service_time: '10:00 - 23:00'
    }
})

onMounted(() => {
    fetchContactConfig()
})

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClose = () => {
   visible.value = false
}

const copyText = (text: string) => {
   navigator.clipboard.writeText(text).then(() => {
     ElMessage.success({
        message: '已复制到剪贴板',
        offset: 80, // Show lower on mobile
        duration: 1500
     })
   }).catch(() => {
     ElMessage.error('复制失败')
   })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

.modal-panel {
  width: 100%; max-width: 340px;
  background: linear-gradient(145deg, #1E293B, #0F172A);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  overflow: hidden;
}

.modal-header {
  padding: 16px 20px;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.header-title { font-size: 16px; font-weight: 700; color: #fff; }
.close-btn { 
  width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.05);
  display: flex; align-items: center; justify-content: center; color: #94A3B8;
  cursor: pointer;
}

.modal-body {
  padding: 24px 20px;
  display: flex; flex-direction: column; gap: 16px;
}

.contact-card {
  display: flex; align-items: center; gap: 12px;
  padding: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 14px;
}

/* WeChat Style */
.contact-card.wechat .card-icon {
   color: #10B981; background: rgba(16, 185, 129, 0.15);
}

/* Telegram Style */
.contact-card.telegram .card-icon {
   color: #3B82F6; background: rgba(59, 130, 246, 0.15);
}

.card-icon {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
}

.card-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.label { font-size: 12px; color: #94A3B8; }
.value { font-size: 15px; color: #fff; font-weight: 600; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px; }

.action-btn {
  padding: 6px 14px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  color: #CBD5E1; font-size: 12px; font-weight: 500;
  cursor: pointer;
}
.action-btn:active { background: rgba(255,255,255,0.15); color: #fff; }

.time-tip {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  font-size: 12px; color: #64748B;
  padding: 4px 0;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-active .modal-panel { animation: pop-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.fade-leave-active .modal-panel { animation: pop-out 0.2s ease; }

@keyframes pop-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes pop-out {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.95); opacity: 0; }
}
</style>
