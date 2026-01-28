<template>
  <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
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
                placeholder="请输入新昵称"
                maxlength="20"
            />
        </div>
      </div>

      <div class="modal-footer">
          <button class="cancel-btn" @click="handleClose">取消</button>
          <button class="save-btn" @click="handleSave" :disabled="loading || !newValue.trim()">
              <span v-if="loading" class="spinner"></span>
              <span v-else>保存</span>
          </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  visible: boolean
  currentNickname?: string
}>()

const emit = defineEmits(['close', 'success'])
const userStore = useUserStore()

const newValue = ref('')
const loading = ref(false)

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
            ElMessage.success({ message: '修改成功', offset: 100, customClass: 'mobile-message' })
            emit('success')
            handleClose()
        } else {
            ElMessage.error(res.message || '修改失败')
        }
    } catch (e) {
        ElMessage.error('修改失败')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    z-index: 100; display: flex; align-items: center; justify-content: center;
    padding: 20px;
}

.modal-content {
    background: #1E293B; width: 100%; max-width: 320px;
    border-radius: 16px; padding: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    animation: popIn 0.2s ease-out;
}

@keyframes popIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-title { font-size: 18px; font-weight: 600; color: #fff; margin: 0; }
.close-btn { background: none; border: none; color: #94A3B8; padding: 4px; }

.modal-body { padding: 0 0 20px 0; }

.form-item label { display: block; font-size: 13px; color: #94A3B8; margin-bottom: 6px; }
.form-item input {
    width: 100%; height: 44px; background: #0F172A;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
    padding: 0 12px; color: #fff; font-size: 15px;
}

.modal-footer { display: flex; gap: 12px; }

.cancel-btn, .save-btn {
    flex: 1; height: 44px; border-radius: 8px; font-size: 15px; font-weight: 600; border: none;
}
.cancel-btn { background: rgba(255,255,255,0.05); color: #94A3B8; }
.save-btn { 
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); 
    color: white; 
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    display: flex; justify-content: center; align-items: center;
}
.save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.spinner {
    width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
