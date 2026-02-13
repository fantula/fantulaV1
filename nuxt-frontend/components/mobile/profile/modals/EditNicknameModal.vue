<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content aurora-modal-panel">
      <div class="modal-header">
        <h3 class="modal-title">修改昵称</h3>
        <button class="close-btn" @click="handleClose">
            <Close class="w-5 h-5" />
        </button>
      </div>

      <div class="modal-body">
        <div class="form-item">
            <label>新昵称</label>
            <input 
                v-model="newValue" 
                type="text" 
                class="aurora-input"
                placeholder="请输入新昵称"
                maxlength="20"
            />
        </div>
      </div>

      <div class="modal-footer">
          <button class="aurora-btn-primary" @click="handleSave" :disabled="loading || !newValue.trim()">
              <span v-if="loading" class="spinner"></span>
              <span v-else>保存</span>
          </button>
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import { useNotify } from '@/composables/useNotify'

const props = defineProps<{
  visible: boolean
  currentNickname?: string
}>()

const emit = defineEmits(['close', 'success'])
const userStore = useUserStore()

const newValue = ref('')
const loading = ref(false)
const { success, error } = useNotify()

watch(() => props.visible, (val) => {
    if (val) {
        newValue.value = props.currentNickname || ''
    }
})

const handleClose = () => {
    emit('close')
}

const handleSave = async () => {
    if (!newValue.value.trim()) return
    
    loading.value = true
    try {
        const res = await userStore.updateProfile({ nickname: newValue.value.trim() })
        if (res.success) {
            success('修改成功')
            emit('success')
            handleClose()
        } else {
            error(res.message || '修改失败')
        }
    } catch (e) {
        error('修改失败')
    } finally {
        loading.value = false
    }
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
    text-shadow: 0 0 10px rgba(255,255,255,0.2);
}
.close-btn { 
    background: none; border: none; color: #94A3B8; padding: 4px; 
    cursor: pointer; transition: color 0.2s;
}
.close-btn:hover { color: #fff; }

.modal-body { padding: 0 0 24px 0; }

.form-item label { display: block; font-size: 13px; color: #94A3B8; margin-bottom: 8px; font-weight: 500; }
.form-item input {
    width: 100%; height: 48px; 
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
    padding: 0 16px; color: #fff; font-size: 16px;
    transition: all 0.2s;
}
.form-item input:focus {
    border-color: #00FFFF;
    background: rgba(15, 23, 42, 0.9);
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
    outline: none;
}

.modal-footer { display: flex; gap: 12px; }

/* Handled by global aurora classes */
.save-btn:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(0.5); }

.spinner {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Button layout override */
.aurora-btn-ghost { 
    flex: 1; height: 48px; border-radius: 12px; font-size: 15px; font-weight: 600; 
    background: rgba(255,255,255,0.05); color: #94A3B8; border: 1px solid rgba(255,255,255,0.05);
}
.aurora-btn-primary { flex: 1; height: 48px; border-radius: 12px; }
</style>
