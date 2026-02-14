<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content aurora-modal-panel">
      <div class="modal-header">
        <h3 class="modal-title text-danger">退出登录</h3>
        <button class="close-btn" @click="handleClose">
            <Close class="w-5 h-5" />
        </button>
      </div>

      <div class="modal-body">
         <p class="confirm-text">确定要退出当前账号吗？</p>
      </div>

      <div class="modal-footer">
          <button class="cancel-btn" @click="handleClose">取消</button>
          <button class="save-btn btn-danger" @click="handleConfirm">
              <span v-if="loading" class="spinner"></span>
              <span v-else>确认退出</span>
          </button>
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'

const props = defineProps<{
  visible: boolean
  loading?: boolean
}>()

const emit = defineEmits(['close', 'confirm'])

const handleClose = () => {
    emit('close')
}

const handleConfirm = () => {
    emit('confirm')
}
</script>

<style scoped>
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
    z-index: 2000; display: flex; align-items: center; justify-content: center;
    padding: 20px;
}

/* Global Aurora Modal */
.modal-content {
    /* Styles handled by .aurora-modal-panel */
}

/* Animation handled by global .aurora-modal-panel */

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.modal-title { 
    font-size: 18px; font-weight: 700; color: #fff; margin: 0; 
    text-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
}
.text-danger { color: #F87171; }
.close-btn { 
    background: none; border: none; color: #94A3B8; padding: 4px; 
    cursor: pointer; transition: color 0.2s;
}
.close-btn:hover { color: #fff; }

.modal-body { padding: 0 0 24px 0; }
.confirm-text { color: #E0F2FE; font-size: 15px; text-align: center; margin: 0; }

.modal-footer { display: flex; gap: 12px; }
.cancel-btn, .save-btn {
    flex: 1; height: 48px; border-radius: 12px; font-size: 15px; font-weight: 600; border: none; cursor: pointer;
    transition: all 0.2s;
}
.cancel-btn { 
    background: rgba(255,255,255,0.05); color: #94A3B8;
    border: 1px solid rgba(255,255,255,0.05);
}
.cancel-btn:active { background: rgba(255,255,255,0.1); }

.btn-danger { 
    background: linear-gradient(135deg, #EF4444 0%, #B91C1C 100%); 
    color: white; 
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    display: flex; justify-content: center; align-items: center;
}
.btn-danger:active { transform: scale(0.96); box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2); }
.btn-danger:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(0.5); }

.spinner {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
