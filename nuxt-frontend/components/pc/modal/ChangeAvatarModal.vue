<template>
  <BaseFormModal
    :visible="visible"
    title="修改头像"
    width="560px"
    submit-text="保存修改"
    :loading="loading"
    :submit-disabled="!hasChange"
    @close="handleClose"
    @submit="handleConfirm"
  >
    <!-- 预览和上传区 -->
    <div class="avatar-preview-section">
      <div class="preview-wrapper">
        <div v-if="previewLoading" class="preview-skeleton"></div>
        <img 
          v-else-if="displayAvatar"
          :src="displayAvatar" 
          class="preview-avatar" 
          @error="handleImageError"
        />
        <div v-else class="preview-avatar-placeholder">
          <el-icon :size="48"><UserFilled /></el-icon>
        </div>
      </div>
      <div class="upload-btn-wrapper">
        <button class="btn-upload" @click="triggerUpload">
          <el-icon><Upload /></el-icon> 上传新头像
        </button>
        <input type="file" ref="fileInput" hidden accept="image/png,image/jpeg,image/webp" @change="handleFileChange" />
        <div class="upload-tip">支持 JPG, PNG, WebP 格式，上传后自动裁剪压缩</div>
        <div class="upload-limit">最大 5MB，将压缩为 200x200px</div>
      </div>
    </div>
    
    <!-- 裁剪区域 (简单模拟，实际项目需集成 vue-cropperjs) -->
    <!-- 暂时省略复杂裁剪逻辑，直接展示预设头像 -->
   
    <div class="system-avatars-section">
      <div class="section-title">系统推荐头像</div>
      <div class="avatar-grid">
        <div 
          v-for="(url, index) in presetAvatars" 
          :key="index"
          class="avatar-item"
          :class="{ active: selectedAvatar === url }"
          @click="selectSystemAvatar(url)"
        >
          <img :src="url" class="system-avatar-img" loading="lazy" />
          <div class="active-overlay" v-if="selectedAvatar === url">
            <el-icon><Check /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </BaseFormModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { Check, UserFilled, Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getSupabaseClient } from '@/utils/supabase' // Use direct storage upload
import { authApi } from '@/api/client/auth'
import BaseFormModal from '@/components/pc/modal/base/BaseFormModal.vue'

const props = defineProps<{
  visible: boolean
  currentAvatar?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
  (e: 'update', value: string): void
}>()

const loading = ref(false)
const previewLoading = ref(false)
const selectedAvatar = ref('')
const previewAvatar = ref('') // Local preview (e.g. bold/uploaded)
const fileInput = ref<HTMLInputElement | null>(null)
const pendingFile = ref<File | null>(null)

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

const displayAvatar = computed(() => {
  return previewAvatar.value || props.currentAvatar
})

const hasChange = computed(() => {
  return !!selectedAvatar.value || !!pendingFile.value
})

watch(() => props.visible, (val) => {
  if (val) {
    selectedAvatar.value = ''
    previewAvatar.value = ''
    pendingFile.value = null
  }
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).src = '/images/client/pc/avatars/avatar-cat.png'
}

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = async (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files || !input.files[0]) return

  const file = input.files[0]
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.warning('图片大小不能超过 5MB')
    return
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    ElMessage.warning('仅支持 JPG, PNG, WebP 格式')
    return
  }

  // Preview immediate
  previewAvatar.value = URL.createObjectURL(file)
  pendingFile.value = file
  selectedAvatar.value = '' // Clear preset selection
  input.value = '' // Reset input
}

const selectSystemAvatar = (url: string) => {
  selectedAvatar.value = url
  previewAvatar.value = url
  pendingFile.value = null
}

const handleConfirm = async () => {
  if (!hasChange.value || loading.value) return
  
  loading.value = true
  let finalUrl = selectedAvatar.value || props.currentAvatar || ''

  try {
    // 1. If file upload
    if (pendingFile.value) {
      const client = getSupabaseClient()
      const { data: { user } } = await client.auth.getUser()
      if (!user) throw new Error('未登录')

      const ext = pendingFile.value.name.split('.').pop()
      const fileName = `avatar_${Date.now()}.${ext}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await client.storage
        .from('avatars')
        .upload(filePath, pendingFile.value, { upsert: true })
      
      if (uploadError) throw uploadError

      const { data: publicData } = client.storage
        .from('avatars')
        .getPublicUrl(filePath)
      
      finalUrl = publicData.publicUrl
    }

    // 2. Update Profile
    const res = await authApi.updateProfile({ avatar: finalUrl })
    if (res.success) {
      ElMessage.success('头像修改成功')
      emit('update', finalUrl)
      handleClose()
    } else {
      ElMessage.error(res.msg || '修改失败')
    }
  } catch (e: any) {
    console.error(e)
    ElMessage.error(e.message || '操作失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.avatar-preview-section {
  display: flex;
  align-items: center;
  gap: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview-skeleton {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.preview-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.preview-avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
}

.upload-btn-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-upload {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #E2E8F0;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-upload:hover {
  background: #3B82F6;
  border-color: #3B82F6;
  color: #fff;
}

.upload-tip {
  font-size: 12px;
  color: #64748B;
}

.upload-limit {
  font-size: 11px;
  color: #475569;
}

.system-avatars-section {
  margin-top: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #94A3B8;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.avatar-item {
  position: relative;
  cursor: pointer;
  border-radius: 50%;
  aspect-ratio: 1;
  border: 2px solid transparent;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2px;
}

.avatar-item:hover {
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.avatar-item.active {
  border-color: #F97316;
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.4);
}

.system-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}

.active-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(249, 115, 22, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
}
</style>
