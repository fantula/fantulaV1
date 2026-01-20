<template>
  <el-dialog 
    v-model="visible" 
    title="上传图片" 
    width="500px" 
    @closed="resetForm" 
    append-to-body 
    :z-index="2000"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="所属分类" required>
        <el-select v-model="form.categoryId" placeholder="请选择分类" style="width: 100%;">
           <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="图片名称">
         <el-input v-model="form.name" placeholder="默认使用文件名" />
      </el-form-item>
      <el-form-item label="选择图片" required>
         <el-upload
           class="upload-demo"
           action="#"
           :auto-upload="false"
           :limit="1"
           :on-change="handleFileChange"
           :file-list="fileList"
           list-type="picture"
         >
           <el-button type="primary">点击选择文件</el-button>
           <template #tip>
             <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 2MB</div>
           </template>
         </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitUpload" :loading="uploading">开始上传</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { adminImageApi, type AdminImageCategory } from '@/api/admin/media'

const props = defineProps<{
  modelValue: boolean
  categories: AdminImageCategory[]
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const form = reactive({
  categoryId: '',
  name: ''
})
const fileList = ref<any[]>([])
const uploading = ref(false)

const handleFileChange = (file: any, fileListRef: any) => {
  fileList.value = fileListRef
  if (!form.name && file.name) {
    form.name = file.name
  }
}

const submitUpload = async () => {
  if (!form.categoryId) {
    ElMessage.warning('请选择分类')
    return
  }
  if (fileList.value.length === 0) {
    ElMessage.warning('请选择图片文件')
    return
  }
  if (form.name && form.name.length > 50) {
      ElMessage.warning('图片名称过长，请精简')
      return
  }
  
  uploading.value = true
  try {
    const file = fileList.value[0].raw
    const { uploadImageToStorage } = await import('@/utils/uploadImage')
    const uploadRes = await uploadImageToStorage(file)
    
    if (!uploadRes.success) {
      ElMessage.error('文件上传失败: ' + uploadRes.error)
      uploading.value = false
      return
    }
    
    const res = await adminImageApi.createImage({
      name: form.name || file.name,
      url: uploadRes.url!,
      category_id: form.categoryId
    })
    
    if (res.success) {
      ElMessage.success('上传成功')
      visible.value = false
      emit('success')
    } else {
      ElMessage.error('保存图片记录失败: ' + res.error)
    }
  } catch (error: any) {
    console.error('Upload error:', error)
    ElMessage.error('上传失败: ' + (error.message || '未知错误'))
  } finally {
    uploading.value = false
  }
}

const resetForm = () => {
  form.categoryId = ''
  form.name = ''
  fileList.value = []
}
</script>

<style scoped>
:deep(.el-upload-list__item-name) {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
