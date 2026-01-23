<template>
  <BaseModal
    :visible="visible"
    title="修改头像"
    width="560px"
    confirm-text="保存修改"
    :loading="loading"
    :confirm-disabled="!hasChange"
    show-mascot
    mascot-position="bottom"
    @close="$emit('close')"
    @update:visible="$emit('update:visible', $event)"
    @confirm="handleConfirm"
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
    
    <!-- 裁剪区域 -->
    <div v-if="showCropper" class="cropper-section">
      <div class="cropper-container" ref="cropperContainer">
        <img ref="cropperImage" :src="cropperImageSrc" />
      </div>
      <div class="cropper-actions">
        <el-button @click="cancelCrop">取消</el-button>
        <el-button type="primary" @click="confirmCrop">确认裁剪</el-button>
      </div>
    </div>
    
    <!-- 系统头像区 -->
    <div v-else class="system-avatars-section">
      <div class="section-title">系统推荐头像</div>
      <div class="avatar-grid">
        <div 
          v-for="(img, index) in systemAvatars" 
          :key="index"
          class="avatar-item"
          :class="{ active: selectedSystemAvatar === img }"
          @click="selectSystemAvatar(img)"
        >
          <img :src="img" class="system-avatar-img" loading="lazy" />
          <div class="check-mark-overlay" v-if="selectedSystemAvatar === img">
            <el-icon><Check /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { getSupabaseClient } from '@/utils/supabase'
import { Upload, Check, UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

// 默认头像常量
const props = defineProps<{
  visible?: boolean
  currentAvatar: string
}>()

const emit = defineEmits(['close', 'update', 'update:visible'])

const fileInput = ref<HTMLInputElement | null>(null)
const previewAvatar = ref('')
const selectedSystemAvatar = ref('')
const loading = ref(false)
const previewLoading = ref(false)
const pendingFile = ref<File | null>(null)

// 裁剪相关
const showCropper = ref(false)
const cropperImage = ref<HTMLImageElement | null>(null)
const cropperImageSrc = ref('')
let cropperInstance: Cropper | null = null

// 系统头像列表（新增 AI 生成头像）
const systemAvatars: string[] = [] // Empty for now as assets were deleted

// Reset State on Open
watch(() => props.visible, (val) => {
  if (val) {
    previewAvatar.value = ''
    selectedSystemAvatar.value = ''
    pendingFile.value = null
    showCropper.value = false
    destroyCropper()
    if (fileInput.value) fileInput.value.value = ''
  }
})

const displayAvatar = computed(() => previewAvatar.value || props.currentAvatar)

const hasChange = computed(() => {
  return (previewAvatar.value || selectedSystemAvatar.value) && !loading.value && !showCropper.value
})

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleImageError = (e: Event) => {
  // If it breaks, hide it or clear it
  (e.target as HTMLImageElement).src = ''
}

const handleFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  
  // 文件大小限制 5MB
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.warning('图片大小不能超过 5MB')
    return
  }
  
  // 检查文件类型
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    ElMessage.warning('仅支持 JPG, PNG, WebP 格式')
    return
  }

  // 显示裁剪器
  const reader = new FileReader()
  reader.onload = (e) => {
    cropperImageSrc.value = e.target?.result as string
    showCropper.value = true
    nextTick(() => {
      initCropper()
    })
  }
  reader.readAsDataURL(file)
}

const initCropper = () => {
  if (cropperImage.value && !cropperInstance) {
    cropperInstance = new Cropper(cropperImage.value, {
      aspectRatio: 1,
      viewMode: 1,
      minCropBoxWidth: 100,
      minCropBoxHeight: 100,
      background: true,
      guides: true,
      center: true,
      highlight: true,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false
    })
  }
}

const cancelCrop = () => {
  destroyCropper()
  showCropper.value = false
  cropperImageSrc.value = ''
}

const confirmCrop = async () => {
  if (!cropperInstance) return
  
  loading.value = true
  try {
    // 获取裁剪后的 canvas
    const canvas = cropperInstance.getCroppedCanvas({
      width: 200,
      height: 200,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high'
    })
    
    // 转换为 Blob（压缩为 WebP 或 JPEG）
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Canvas to blob failed'))
        },
        'image/webp',
        0.85 // 85% 质量
      )
    })
    
    // 创建 File 对象
    pendingFile.value = new File([blob], `avatar_${Date.now()}.webp`, { type: 'image/webp' })
    
    // 预览
    previewAvatar.value = URL.createObjectURL(blob)
    selectedSystemAvatar.value = ''
    
    destroyCropper()
    showCropper.value = false
    
    ElMessage.success('裁剪成功，点击"保存修改"应用头像')
  } catch (e) {
    console.error(e)
    ElMessage.error('裁剪失败')
  } finally {
    loading.value = false
  }
}

const destroyCropper = () => {
  if (cropperInstance) {
    cropperInstance.destroy()
    cropperInstance = null
  }
}

const selectSystemAvatar = (img: string) => {
  selectedSystemAvatar.value = img
  previewAvatar.value = img
  pendingFile.value = null
}

const handleConfirm = async () => {
  loading.value = true
  let finalAvatarUrl = selectedSystemAvatar.value || props.currentAvatar

  try {
    if (pendingFile.value) {
      const client = getSupabaseClient()
      const { data: { user } } = await client.auth.getUser()
      if (!user) throw new Error('未登录')
      
      const fileName = `avatar_${Date.now()}.webp`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await client.storage
        .from('avatars')
        .upload(filePath, pendingFile.value, { upsert: true })
      
      if (uploadError) throw uploadError
       
      const { data: publicData } = client.storage.from('avatars').getPublicUrl(filePath)
      finalAvatarUrl = publicData.publicUrl
    }
    
    emit('update', finalAvatarUrl)
  } catch (e: any) {
    console.error(e)
    ElMessage.error('上传失败: ' + (e.message || '未知错误'))
    loading.value = false
  }
}

onUnmounted(() => {
  destroyCropper()
})
</script>

<style scoped>
/* 预览区 */
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
  background: var(--primary-blue);
  border-color: var(--primary-blue);
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

/* 裁剪区 */
.cropper-section {
  margin-top: 16px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}

.cropper-container {
  width: 100%;
  height: 300px;
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
}

.cropper-container img {
  max-width: 100%;
  display: block;
}

.cropper-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

/* 系统头像区 */
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
  grid-template-columns: repeat(6, 1fr);
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
  border-color: var(--active-orange);
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

.check-mark-overlay {
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
</style>
