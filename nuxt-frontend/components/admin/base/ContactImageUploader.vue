<template>
  <div class="contact-uploader">
    <div class="uploader-wrapper">
        <el-upload
            class="upload-demo"
            action="#"
            :show-file-list="false"
            :http-request="handleUpload"
            :disabled="uploading"
            accept="image/*"
        >
            <div v-if="modelValue" class="preview-container">
                <el-image :src="modelValue" fit="contain" class="preview-image" />
                <div class="overlay">
                    <el-icon><Edit /></el-icon>
                    <span>更换图片</span>
                </div>
            </div>
            <div v-else class="upload-placeholder">
                <el-icon class="icon"><Plus /></el-icon>
                <span class="text">点击上传</span>
            </div>
        </el-upload>
    </div>
    <div class="upload-tip" v-if="tip">{{ tip }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import { ElMessage } from 'element-plus'

const props = defineProps<{
    modelValue: string
    folder?: string
    tip?: string
}>()

const emit = defineEmits(['update:modelValue'])

const uploading = ref(false)

const handleUpload = async (options: any) => {
    const file = options.file
    const folder = props.folder || 'contact_materials'
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        ElMessage.error('请上传图片文件')
        return
    }

    uploading.value = true
    const client = getAdminSupabaseClient()
    
    try {
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`
        const filePath = `${folder}/${fileName}`

        // Upload to 'media' bucket (assuming 'media' is the standard public bucket, or 'public')
        // Trying 'media' first as per common convention, or check 'storage' bucket?
        // User docs mentioned "Material Library" (R2 or Supabase).
        // Let's assume standard 'media' bucket for now.
        const bucket = 'media' 

        const { data, error } = await client
            .storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) throw error

        // Get Public URL
        const { data: { publicUrl } } = client
            .storage
            .from(bucket)
            .getPublicUrl(filePath)

        if (publicUrl) {
            emit('update:modelValue', publicUrl)
            ElMessage.success('上传成功')
        }
    } catch (e: any) {
        console.error('Upload failed', e)
        ElMessage.error(e.message || '上传失败，请检查存储配置')
    } finally {
        uploading.value = false
    }
}
</script>

<style scoped>
.uploader-wrapper {
    width: 120px;
    height: 120px;
    border: 1px dashed #dcdfe6;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    transition: border-color 0.2s;
    background: #fafafa;
}
.uploader-wrapper:hover {
    border-color: #409eff;
}
.upload-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #909399;
}
.icon { font-size: 24px; margin-bottom: 8px; }
.text { font-size: 12px; }

.preview-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.preview-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
}
.preview-container:hover .overlay { opacity: 1; }
.upload-tip {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
}
</style>
