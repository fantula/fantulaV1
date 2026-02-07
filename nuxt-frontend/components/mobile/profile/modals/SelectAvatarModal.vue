<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">修改头像</h3>
          <button class="close-btn" @click="handleClose">
            <Close class="w-5 h-5" />
          </button>
        </div>

        <div class="modal-body">
          <div class="current-avatar-section">
            <div class="avatar-wrapper">
                <img :src="currentAvatar || defaultAvatar" class="current-img" @error="handleImageError" />
            </div>
            <p class="section-label">当前头像</p>
          </div>

          <div class="system-avatars-section">
            <p class="section-label align-left">系统推荐</p>
            <div class="avatar-grid">
                <div 
                    v-for="(url, index) in presetAvatars" 
                    :key="index"
                    class="avatar-item"
                    :class="{ active: selectedAvatar === url }"
                    @click="selectAvatar(url)"
                >
                    <img :src="url" class="grid-img" loading="lazy" />
                    <div class="active-overlay" v-if="selectedAvatar === url">
                        <Check class="w-4 h-4" />
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" @click="handleClose">取消</button>
          <button class="submit-btn" @click="handleConfirm" :disabled="loading || !hasChange">
            <span v-if="loading" class="spinner"></span>
            <span v-else>保存修改</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Close, Check } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  visible: boolean
  currentAvatar?: string
}>()

const emit = defineEmits(['close', 'success'])
const userStore = useUserStore()

const loading = ref(false)
const selectedAvatar = ref('')
const defaultAvatar = '/images/client/pc/avatars/avatar-cat.png'

const presetAvatars = [
  '/images/client/pc/avatars/avatar-cat.png',
  '/images/client/pc/avatars/avatar-dog.png',
  '/images/client/pc/avatars/avatar-bear.png',
  '/images/client/pc/avatars/avatar-rabbit.png',
  '/images/client/pc/avatars/avatar-fox.png',
  '/images/client/pc/avatars/avatar-panda.png',
  '/images/client/pc/avatars/avatar-lion.png',
  '/images/client/pc/avatars/avatar-tiger.png'
]

const hasChange = computed(() => {
    return selectedAvatar.value && selectedAvatar.value !== props.currentAvatar
})

watch(() => props.visible, (val) => {
    if (val) {
        selectedAvatar.value = props.currentAvatar || ''
    }
})

const handleClose = () => {
    emit('close')
}

const selectAvatar = (url: string) => {
    selectedAvatar.value = url
}

const handleImageError = (e: Event) => {
    (e.target as HTMLImageElement).src = defaultAvatar
}

const handleConfirm = async () => {
    if (!hasChange.value) return
    loading.value = true
    try {
        const res = await userStore.updateProfile({ avatar: selectedAvatar.value })
        if (res.success) {
            ElMessage.success({ message: '头像修改成功', offset: 100, customClass: 'mobile-message' })
            emit('success')
            handleClose()
        } else {
            ElMessage.error(res.message || '修改失败')
        }
    } catch (e: any) {
        ElMessage.error('操作失败')
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

.modal-content {
    background: var(--cyber-bg-glass, rgba(15, 23, 42, 0.85));
    width: 100%; max-width: 340px;
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

.current-avatar-section {
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    margin-bottom: 24px; padding-bottom: 24px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.avatar-wrapper {
    width: 80px; height: 80px; border-radius: 50%;
    border: 2px solid rgba(6, 182, 212, 0.5);
    padding: 2px;
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}
.current-img {
    width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
}

.section-label {
    font-size: 13px; color: #94A3B8; margin: 0;
}
.align-left { text-align: left; width: 100%; margin-bottom: 12px; }

.avatar-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}
.avatar-item {
    position: relative; aspect-ratio: 1; border-radius: 50%; cursor: pointer;
    border: 2px solid transparent; padding: 2px;
    transition: all 0.2s;
}
.avatar-item:hover { transform: scale(1.05); }
.avatar-item.active {
    border-color: #06B6D4;
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
    transform: scale(1.1);
}
.grid-img {
    width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
}
.active-overlay {
    position: absolute; inset: 0; border-radius: 50%;
    background: rgba(6, 182, 212, 0.3);
    display: flex; align-items: center; justify-content: center;
    color: white;
}

.modal-footer { display: flex; gap: 12px; margin-top: 24px; }
.cancel-btn, .submit-btn {
    flex: 1; height: 48px; border-radius: 12px; font-size: 15px; font-weight: 600; border: none; cursor: pointer;
    transition: all 0.2s;
}
.cancel-btn { 
    background: rgba(255,255,255,0.05); color: #94A3B8;
    border: 1px solid rgba(255,255,255,0.05);
}
.cancel-btn:active { background: rgba(255,255,255,0.1); }

.submit-btn { 
    background: var(--cyber-gradient-btn, linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%));
    color: white; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
}
.submit-btn:active { transform: scale(0.96); box-shadow: 0 2px 8px rgba(6, 182, 212, 0.2); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(0.5); }

.spinner {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
