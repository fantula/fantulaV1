<template>
  <div class="banner-page">
    <div class="page-header">
      <h2>轮播图管理</h2>
    </div>

    <!-- 操作栏 -->
    <el-card shadow="never" class="action-card">
      <div class="action-container">
        <el-alert 
          title="提示：轮播图图片需从图片管理中选择，前端展示顺序由排序值决定（越小越靠前）。" 
          type="info" 
          show-icon 
          :closable="false"
          style="margin-right: 20px; flex: 1;"
        />
        <el-button type="primary" :icon="Plus" @click="openImageSelector">添加轮播图</el-button>
      </div>
    </el-card>

    <!-- 轮播图列表 -->
    <el-card shadow="never" class="list-card">
      <el-table :data="sortedBanners" style="width: 100%" v-loading="loading" border>
         <el-table-column label="图片预览" width="180">
          <template #default="{ row }">
          <el-image 
              :src="row.image?.url || row.url" 
              fit="cover" 
              style="width: 140px; height: 70px; border-radius: 4px;"
              :preview-src-list="[row.image?.url || row.url]"
            />
          </template>
        </el-table-column>
        <el-table-column label="图片名称" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.image?.name || row.title || '未命名' }}
          </template>
        </el-table-column>
        <el-table-column label="排序值" width="150">
          <template #default="{ row }">
            <el-input-number v-model="row.sort_order" :min="0" :max="999" size="small" controls-position="right" @change="handleSortChange(row)" />
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-switch 
              :model-value="row.status === 'on'" 
              @change="(val: any) => handleStatusChange(row, !!val)" 
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template #default="{ row }">
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 选择图片弹窗 (从图库选择) -->
    <el-dialog v-model="selectorVisible" title="选择图片" width="800px">
      <!-- 简易筛选 -->
       <div style="margin-bottom: 15px; display: flex;">
          <el-select v-model="selectorCategory" placeholder="图片分类" clearable style="width: 150px; margin-right: 15px;" @change="fetchLibrary">
            <el-option label="全部" value="" />
            <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
          </el-select>
          <el-input v-model="selectorKeyword" placeholder="搜索图片名称" clearable style="width: 200px;" @keyup.enter="fetchLibrary">
             <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
       </div>

       <!-- 图片网格 -->
       <div class="selector-grid">
          <div 
            v-for="img in libraryImages" 
            :key="img.id" 
            class="selector-item"
            :class="{ 'is-selected': selectedImageId === img.id }"
            @click="selectImage(img)"
          >
             <el-image :src="img.url" fit="cover" class="selector-thumb" />
             <div class="selector-name">{{ img.name }}</div>
             <div class="selector-mask" v-if="selectedImageId === img.id">
               <el-icon><Check /></el-icon>
             </div>
          </div>
       </div>

       <div class="pagination-wrapper" style="margin-top: 15px; display: flex; justify-content: flex-end;">
          <el-pagination background layout="prev, pager, next" :total="libraryImages.length" :page-size="12" />
       </div>

       <template #footer>
        <span class="dialog-footer">
          <el-button @click="selectorVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAddBanner" :disabled="!selectedImageId">确认添加</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { Plus, Search, Check } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi, type AdminBanner, type AdminImage, type AdminImageCategory } from '@/api/admin-supabase'

definePageMeta({
  title: '轮播图管理'
})

const loading = ref(false)
const selectorVisible = ref(false)

// Real Data
const banners = ref<AdminBanner[]>([])
const libraryImages = ref<AdminImage[]>([])
const categories = ref<AdminImageCategory[]>([])

// Fetch Data
const fetchData = async () => {
  loading.value = true
  try {
    const res = await adminApi.banner.getBanners()
    if (res.success) {
      banners.value = res.banners
    } else {
      ElMessage.error('加载轮播图失败: ' + res.error)
    }
  } finally {
    loading.value = false
  }
}

const fetchLibrary = async () => {
  const res = await adminApi.image.getImages({
    category_id: selectorCategory.value,
    keyword: selectorKeyword.value
  })
  if (res.success) {
    libraryImages.value = res.images
  }
}

onMounted(async () => {
  await Promise.all([
    fetchCategories(),
    fetchData()
  ])
})

const fetchCategories = async () => {
  const res = await adminApi.imageCategory.getCategories()
  if (res.success) {
    categories.value = res.categories
  }
}

// Computed
const sortedBanners = computed(() => {
  return [...banners.value].sort((a, b) => a.sort_order - b.sort_order)
})

// Selector Logic
const selectorCategory = ref('')
const selectorKeyword = ref('')
const selectedImageId = ref('')
const selectedImageObj = ref<AdminImage | null>(null)

const openImageSelector = async () => {
  selectedImageId.value = ''
  selectedImageObj.value = null
  await fetchLibrary()
  selectorVisible.value = true
}

const selectImage = (img: AdminImage) => {
  selectedImageId.value = img.id
  selectedImageObj.value = img
}

const confirmAddBanner = async () => {
  if (!selectedImageObj.value) return
  
  loading.value = true
  try {
    const res = await adminApi.banner.createBanner({
      image_id: selectedImageObj.value.id,
      title: selectedImageObj.value.name,
      sort_order: banners.value.length + 1
    })
    
    if (res.success) {
      ElMessage.success('添加成功')
      selectorVisible.value = false
      await fetchData()
    } else {
      ElMessage.error('添加失败: ' + res.error)
    }
  } finally {
    loading.value = false
  }
}

// Table Logic
const handleSortChange = async (row: AdminBanner) => {
  const res = await adminApi.banner.updateBanner(row.id, { sort_order: row.sort_order })
  if (res.success) {
    ElMessage.success('排序已更新')
  }
}

const handleStatusChange = async (row: AdminBanner, val: boolean) => {
  const newStatus = val ? 'on' : 'off'
  const res = await adminApi.banner.updateBanner(row.id, { status: newStatus })
  if (res.success) {
    row.status = newStatus
    ElMessage.success(newStatus === 'on' ? '已启用' : '已停用')
  } else {
    ElMessage.error('更新状态失败: ' + res.error)
  }
}

const handleDelete = (row: AdminBanner) => {
  ElMessageBox.confirm('确认移除该轮播图吗？', '删除', {
    type: 'warning'
  }).then(async () => {
    const res = await adminApi.banner.deleteBanner(row.id)
    if (res.success) {
      ElMessage.success('已删除')
      await fetchData()
    } else {
      ElMessage.error('删除失败: ' + res.error)
    }
  })
}
</script>

<style scoped>
.banner-page { /* Padding handled jointly by Layout */ }
.page-header {
  margin-bottom: 24px;
}
.page-header h2 {
  margin: 0;
  font-size: 28px;
  color: var(--el-text-color-primary);
  font-weight: 600;
}

.action-card, .list-card {
  margin-bottom: 24px;
}
.action-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Selector Grid */
.selector-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  max-height: 400px;
  overflow-y: auto;
  padding: 2px;
}
.selector-item {
  position: relative;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}
.selector-item:hover {
  border-color: #409EFF;
}
.selector-item.is-selected {
  border-color: #409EFF;
}

.selector-thumb {
  width: 100%;
  height: 100px;
  display: block;
}
.selector-name {
  font-size: 12px;
  padding: 4px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #f5f7fa;
}
.selector-mask {
  position: absolute;
  top: 0;
  right: 0;
  background: #409EFF;
  color: #fff;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 4px;
}
</style>
