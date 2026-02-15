<template>
  <BaseModal
    :visible="visible"
    title="修改头像"
    width="340px"
    confirm-text="保存修改"
    :loading="loading"
    :confirm-disabled="!hasChange"
    @update:visible="handleClose"
    @close="handleClose"
    @confirm="handleConfirm"
  >
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
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import { useNotify } from '@/composables/useNotify'
import BaseModal from '@/components/shared/BaseModal.vue'

import { DEFAULT_AVATAR, SYSTEM_AVATARS } from '@/utils/constants'

const props = defineProps<{
  visible: boolean
  currentAvatar?: string
}>()

const emit = defineEmits(['close', 'success'])
const userStore = useUserStore()
const { success, error } = useNotify()

const loading = ref(false)
const selectedAvatar = ref('')
const defaultAvatar = DEFAULT_AVATAR


const presetAvatars = SYSTEM_AVATARS

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
            success('头像修改成功')
            emit('success')
            handleClose()
        } else {
            error(res.message || '修改失败')
        }
    } catch (e: any) {
        error('操作失败')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
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
</style>
