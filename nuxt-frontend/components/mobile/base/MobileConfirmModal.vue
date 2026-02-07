<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="modal-overlay" @click="handleCancel">
        <div class="modal-content" @click.stop>
          
          <div class="modal-header">
            <div class="icon-circle" :class="type">
               <el-icon v-if="type === 'danger'" class="msg-icon"><Delete /></el-icon>
               <el-icon v-else class="msg-icon"><InfoFilled /></el-icon>
            </div>
            <div class="modal-title">{{ title }}</div>
          </div>

          <div class="modal-body">
             {{ content }}
          </div>

          <div class="modal-footer">
             <button class="btn-cancel" @click="handleCancel">{{ cancelText }}</button>
             <button 
                class="btn-confirm" 
                :class="type" 
                @click="handleConfirm"
                :disabled="loading"
             >
                <div v-if="loading" class="spinner-sm"></div>
                <span v-else>{{ confirmText }}</span>
             </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { InfoFilled, Delete } from '@element-plus/icons-vue'

interface Props {
  visible: boolean
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
  type?: 'info' | 'danger'
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '提示',
  content: '',
  confirmText: '确认',
  cancelText: '取消',
  type: 'info',
  loading: false
})

const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

const handleCancel = () => {
    emit('update:visible', false)
    emit('cancel')
}

const handleConfirm = () => {
    emit('confirm')
}
</script>

<style scoped>
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
    z-index: 3000; display: flex; align-items: center; justify-content: center;
    padding: 30px;
}

.modal-content {
    background: rgba(15, 23, 42, 0.9);
    width: 100%; max-width: 280px;
    border-radius: 20px; padding: 24px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    display: flex; flex-direction: column; align-items: center;
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes popIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.modal-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 16px; }

.icon-circle {
    width: 56px; height: 56px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
}
.icon-circle.info {
    background: linear-gradient(135deg, #3B82F6, #2563EB);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}
.icon-circle.danger {
    background: linear-gradient(135deg, #EF4444, #DC2626);
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}

.msg-icon { font-size: 28px; color: #fff; }

.modal-title { font-size: 17px; font-weight: 600; color: #fff; margin: 0; text-align: center; }

.modal-body {
    width: 100%; margin-bottom: 24px;
    font-size: 14px; color: #94A3B8; text-align: center; line-height: 1.5;
}

.modal-footer { width: 100%; display: flex; gap: 12px; }

.btn-cancel, .btn-confirm {
    flex: 1; height: 40px; border-radius: 20px; 
    font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
}

.btn-cancel {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
    color: #94A3B8;
}
.btn-cancel:active { background: rgba(255,255,255,0.1); }

.btn-confirm { border: none; color: #fff; }
.btn-confirm:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-confirm.info {
    background: linear-gradient(90deg, #3B82F6, #2563EB);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
.btn-confirm.danger {
    background: linear-gradient(90deg, #EF4444, #DC2626);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}
.btn-confirm:active:not(:disabled) { transform: scale(0.96); }

.spinner-sm {
    width: 16px; height: 16px; 
    border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
    border-radius: 50%; animation: spin 0.8s linear infinite;
}

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

@keyframes spin { to { transform: rotate(360deg); } }
</style>
