<template>
  <el-dialog v-model="visible" title="图库选择" width="800px" append-to-body destroy-on-close class="picker-dialog">
    <div class="picker-container">
      <div class="picker-sidebar">
        <div 
          class="picker-cat-item" 
          :class="{ active: activeCategoryId === '' }"
          @click="activeCategoryId = ''; fetchImages()"
        >全部图片</div>
        <div 
          v-for="cat in categories" 
          :key="cat.id" 
          class="picker-cat-item"
          :class="{ active: activeCategoryId === cat.id }"
          @click="activeCategoryId = cat.id; fetchImages()"
        >{{ cat.name }}</div>
      </div>
      <div class="picker-main" v-loading="loading">
        <div class="picker-toolbar">
          <el-upload
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleUpload"
          >
            <el-button type="primary" size="small">上传新图片</el-button>
          </el-upload>
        </div>
        <div class="picker-grid">
          <div 
            v-for="img in images" 
            :key="img.id" 
            class="picker-img-card"
            @click="selectImage(img.url)"
          >
            <el-image :src="img.url" fit="cover" />
            <div class="picker-img-name">{{ img.name }}</div>
          </div>
        </div>
        <el-empty v-if="images.length === 0" description="暂无图片" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { adminApi, type AdminImage, type AdminImageCategory } from '@/api/admin'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', url: string): void
}>()

const visible = ref(props.modelValue)
const loading = ref(false)
const images = ref<AdminImage[]>([])
const categories = ref<AdminImageCategory[]>([])
const activeCategoryId = ref('')

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    loadCategories()
    fetchImages()
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const loadCategories = async () => {
  if (categories.value.length > 0) return  // 缓存
  const res = await adminApi.imageCategory.getCategories()
  if (res.success) categories.value = res.categories
}

const fetchImages = async () => {
  loading.value = true
  const res = await adminApi.image.getImages({
    category_id: activeCategoryId.value || undefined
  })
  if (res.success) images.value = res.images
  loading.value = false
}

const selectImage = (url: string) => {
  emit('select', url)
  visible.value = false
}

const handleUpload = async (file: any) => {
  loading.value = true
  try {
    const { uploadImageToStorage } = await import('@/utils/uploadImage')
    const upRes = await uploadImageToStorage(file.raw)
    if (upRes.success) {
      await adminApi.image.createImage({
        name: file.name,
        url: upRes.url!,
        category_id: activeCategoryId.value || undefined
      })
      selectImage(upRes.url!)
      fetchImages()
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.picker-container {
  display: flex;
  height: 500px;
  gap: 20px;
}

.picker-sidebar {
  width: 150px;
  border-right: 1px solid #f0f2f5;
  padding-right: 10px;
  overflow-y: auto;
}

.picker-cat-item {
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;
}

.picker-cat-item:hover { 
  background: #f5f7fa; 
  color: #409EFF; 
}

.picker-cat-item.active { 
  background: #ecf5ff; 
  color: #409EFF; 
  font-weight: bold; 
}

.picker-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.picker-toolbar { margin-bottom: 15px; }

.picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  overflow-y: auto;
  padding-bottom: 20px;
}

.picker-img-card {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  background: #fff;
}

.picker-img-card:hover { 
  border-color: #409EFF; 
  box-shadow: 0 4px 12px rgba(64,158,255,0.15); 
}

.picker-img-card .el-image { 
  width: 100%; 
  height: 100px; 
}

.picker-img-name {
  padding: 5px;
  font-size: 12px;
  color: #606266;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
