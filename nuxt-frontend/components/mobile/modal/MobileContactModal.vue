<template>
  <Teleport to="body">
  <Transition name="fade">
    <div v-if="visible" class="modal-overlay" @click="handleClose">
      <div class="modal-panel-glass" @click.stop>
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
           <div class="contact-card-glass wechat" @click="copyText(config.wechat_id || 'Spotify-cn')">
              <div class="card-icon">
                 <el-icon><ChatDotRound /></el-icon>
              </div>
              <div class="card-info">
                 <div class="label">微信客服</div>
                 <div class="value">{{ config.wechat_id || 'Spotify-cn' }}</div>
              </div>
              <div class="copy-tag">
                 <el-icon><CopyDocument /></el-icon>
                 <span>复制</span>
              </div>
           </div>

           <!-- Service Time -->
           <div class="time-tip">
              <el-icon><Clock /></el-icon>
              <span>在线时间：{{ config.service_time || '10:00 - 23:00' }}</span>
           </div>

           <!-- Telegram -->
           <div class="contact-card-glass telegram" @click="copyText(config.telegram_id || '@Fantula_Support')">
              <div class="card-icon">
                 <el-icon><Position /></el-icon>
              </div>
              <div class="card-info">
                 <div class="label">Telegram</div>
                 <div class="value">{{ config.telegram_id || '@Fantula_Support' }}</div>
              </div>
              <div class="copy-tag">
                 <el-icon><CopyDocument /></el-icon>
                 <span>复制</span>
              </div>
           </div>

        </div>
      </div>
    </div>
  </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Close, ChatDotRound, Position, Clock, CopyDocument } from '@element-plus/icons-vue'
import { useNotify } from '@/composables/useNotify'
import { useSystemConfig } from '@/composables/client/useSystemConfig'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const { success, error } = useNotify()

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
     success('已复制到剪贴板')
   }).catch(() => {
     error('复制失败')
   })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px); /* Deeper blur */
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

.modal-panel-glass {
  width: 100%; max-width: 320px;
  background: rgba(15, 23, 42, 0.9); /* Deep Aurora Base */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset;
  overflow: hidden;
  animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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

/* Contact Cards */
.contact-card-glass {
  display: flex; align-items: center; gap: 12px;
  padding: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.contact-card-glass:active { background: rgba(255,255,255,0.06); transform: scale(0.98); }

/* WeChat Style */
.contact-card-glass.wechat .card-icon {
   color: #10B981; background: rgba(16, 185, 129, 0.15);
   box-shadow: 0 0 10px rgba(16, 185, 129, 0.1);
}
/* Telegram Style */
.contact-card-glass.telegram .card-icon {
   color: #38BDF8; background: rgba(56, 189, 248, 0.15);
   box-shadow: 0 0 10px rgba(56, 189, 248, 0.1);
}

.card-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}

.card-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.label { font-size: 11px; color: #94A3B8; }
.value { font-size: 14px; color: #F1F5F9; font-weight: 600; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px; }

.copy-tag {
  display: flex; align-items: center; justify-content: center; gap: 4px;
  padding: 6px 14px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px; /* Pill Shape */
  color: #fff; cursor: pointer;
  font-size: 12px; font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
.copy-tag:active { 
  transform: scale(0.95);
  background: rgba(255,255,255,0.2); 
}
.copy-tag .el-icon { font-size: 12px; }

/* Wechat Copy Specific */
.wechat .copy-tag {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
  color: #34D399;
}
.wechat .copy-tag:active { background: rgba(16, 185, 129, 0.25); }

/* Telegram Copy Specific */
.telegram .copy-tag {
  background: rgba(56, 189, 248, 0.15);
  border-color: rgba(56, 189, 248, 0.3);
  color: #38BDF8;
}
.telegram .copy-tag:active { background: rgba(56, 189, 248, 0.25); }

.time-tip {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  font-size: 11px; color: #64748B;
  padding: 4px 0;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-active .modal-panel-glass { animation: pop-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.fade-leave-active .modal-panel-glass { animation: pop-out 0.2s ease; }

@keyframes pop-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes pop-out {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.95); opacity: 0; }
}
</style>
