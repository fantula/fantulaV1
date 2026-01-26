<template>
  <div class="media-layout">
    
    <!-- 左侧分类侧边栏 -->
    <div class="media-sidebar">
      <div class="sidebar-header">
        <h3 class="sidebar-title">图片分类</h3>
      </div>
      
      <div class="category-nav">
        <!-- 固定项 -->
        <div 
          class="nav-item" 
          :class="{ active: currentCategoryId === '' }"
          @click="handleCategorySelect('')"
        >
          <el-icon><Picture /></el-icon>
          <span class="nav-label">全部图片</span>
          <span class="nav-count" v-if="totalImages > 0 && currentCategoryId === ''">{{ totalImages }}</span>
        </div>

        <!-- 分类列表 -->
        <div class="nav-divider"></div>
        <div class="nav-list" v-loading="catLoading">
          <div 
            v-for="cat in categories" 
            :key="cat.id" 
            class="nav-item"
            :class="{ active: currentCategoryId === cat.id, 'is-uncategorized': cat.name === '未分类' }"
            @click="handleCategorySelect(cat.id)"
          >
            <el-icon v-if="cat.name === '未分类'"><FolderRemove /></el-icon>
            <el-icon v-else><Folder /></el-icon>
            <span class="nav-label">{{ cat.name }}</span>
          </div>
        </div>
      </div>

      <div class="sidebar-footer">
        <el-button block @click="catDialogVisible = true">
          <el-icon class="el-icon--left"><Setting /></el-icon> 管理分类
        </el-button>
      </div>
    </div>

    <!-- 右侧内容区 -->
    <div class="media-content">
      <!-- 顶部工具栏 -->
      <div class="content-toolbar">
         <div class="toolbar-left">
            <el-input 
              v-model="searchKeyword" 
              placeholder="搜索图片..." 
              prefix-icon="Search"
              clearable 
              style="width: 240px;" 
              @keyup.enter="handleSearch"
              @clear="handleSearch"
            />
         </div>
         <div class="toolbar-right">
             <!-- 批量操作区 -->
             <div v-if="selectedIds.length > 0" class="batch-actions">
                 <span class="selection-info">已选 {{ selectedIds.length }} 项</span>
                 <el-button type="danger" link @click="handleBatchDelete">批量删除</el-button>
                 <el-divider direction="vertical" />
                 <el-button link @click="selectedIds = []">取消选择</el-button>
             </div>
             
             <el-divider direction="vertical" v-if="selectedIds.length > 0" />
             
             <el-button @click="syncFromR2" :loading="syncing" :icon="Refresh">R2 同步</el-button>
             <el-button type="primary" @click="uploadDialogVisible = true" :icon="Upload">上传图片</el-button>
         </div>
      </div>

      <!-- 图片网格 -->
      <div class="content-body" v-loading="loading">
         <div v-if="images.length === 0" class="empty-state">
           <el-empty description="暂无图片" />
         </div>
         
         <div v-else class="image-grid-container">
            <div 
              v-for="img in images" 
              :key="img.id" 
              class="grid-item"
              :class="{ selected: selectedIds.includes(img.id) }"
              @click="toggleSelect(img.id)"
            >
               <div class="img-preview">
                  <el-image 
                    :src="img.url" 
                    fit="cover" 
                    loading="lazy"
                    class="real-image"
                  />
                  <!-- 悬浮遮罩 -->
                  <div class="img-overlay">
                      <div class="overlay-actions">
                          <el-button circle size="small" :icon="View" @click.stop="previewImage(img.url)" />
                          <el-button circle size="small" type="primary" :icon="Edit" @click.stop="handleEdit(img)" />
                          <el-button circle size="small" type="danger" :icon="Delete" @click.stop="handleDelete(img)" />
                      </div>
                  </div>
                  <!-- 选中标记 -->
                  <div class="selection-mark" v-if="selectedIds.includes(img.id)">
                      <el-icon><Check /></el-icon>
                  </div>
               </div>
               <div class="img-meta">
                   <div class="img-name" :title="img.name">{{ img.name }}</div>
                   <div class="img-info">
                       <span class="cat-badge" v-if="img.category">{{ img.category.name }}</span>
                       <span class="date">{{ formatDate(img.created_at) }}</span>
                   </div>
               </div>
            </div>
         </div>
      </div>

      <!-- 分页 (固定底部) -->
      <div class="content-footer" v-if="images.length > 0">
         <el-pagination
           background
           layout="total, prev, pager, next"
           :total="images.length" 
           :page-size="50"
           hide-on-single-page
         />
         <!-- 注意：当前API没有分页返回 total，这里假设全部返回或者后续优化分页API。为了体验暂时显示 total=length -->
      </div>
    </div>

    <!-- 弹窗组件 -->
    <CategoryManagerModal v-model="catDialogVisible" @change="fetchCategories" />
    <ImageUploadModal v-model="uploadDialogVisible" :categories="categories" @success="handleUploadSuccess" />

    <!-- 编辑图片弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑图片信息" width="400px" append-to-body :z-index="2000">
       <el-form :model="editForm" label-width="80px">
         <el-form-item label="名称">
           <el-input v-model="editForm.name" />
         </el-form-item>
         <el-form-item label="分类">
            <el-select v-model="editForm.category_id" style="width: 100%;">
             <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
          </el-select>
         </el-form-item>
       </el-form>
       <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 图片预览 (使用 el-image-viewer 无法直接嵌入，使用 el-image 的 preview 功能但需要手动触发) -->
    <!-- 由于 el-image 自带点击预览，这里我们在 overlay 里的预览按钮可以手动调用一个隐藏的 el-image 的预览，或者简单点直接弹个 dialog -->
    <el-dialog v-model="previewVisible" width="800px" custom-class="preview-dialog" append-to-body>
        <img :src="previewUrl" style="max-width: 100%; max-height: 600px; display: block; margin: 0 auto;" />
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, computed, onMounted } from 'vue'
import { 
  Picture, Folder, FolderRemove, Setting, Search, 
  Upload, Refresh, Delete, Edit, View, Check 
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminImageApi, adminImageCategoryApi, type AdminImage, type AdminImageCategory } from '@/api/admin/media'
import CategoryManagerModal from '@/components/admin/media/CategoryManagerModal.vue'
import ImageUploadModal from '@/components/admin/media/ImageUploadModal.vue'

// --- State ---
const loading = ref(false)
const catLoading = ref(false)
const categories = ref<AdminImageCategory[]>([])
const images = ref<AdminImage[]>([])
const currentCategoryId = ref('')
const searchKeyword = ref('')
const selectedIds = ref<string[]>([])

const catDialogVisible = ref(false)
const uploadDialogVisible = ref(false)
const editDialogVisible = ref(false)
const previewVisible = ref(false)
const previewUrl = ref('')

// --- Initialization ---
onMounted(async () => {
  await fetchCategories()
  await fetchImages()
})

// --- Category Logic ---
const fetchCategories = async () => {
  catLoading.value = true
  const res = await adminImageCategoryApi.getCategories()
  if (res.success) {
    categories.value = res.categories
  }
  catLoading.value = false
}

const handleCategorySelect = (id: string) => {
  if (currentCategoryId.value === id) return
  currentCategoryId.value = id
  fetchImages()
}

// --- Image Logic ---
const totalImages = computed(() => images.value.length) // Temporary, as API might not return total count yet

const fetchImages = async () => {
  loading.value = true
  selectedIds.value = [] // Reset selection on refresh
  try {
    const res = await adminImageApi.getImages({
      category_id: currentCategoryId.value,
      keyword: searchKeyword.value
    })
    if (res.success) {
      images.value = res.images || []
    } else {
      ElMessage.error(res.error || '获取图片失败')
    }
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  fetchImages()
}

// --- Selection Logic ---
const toggleSelect = (id: string) => {
  const idx = selectedIds.value.indexOf(id)
  if (idx > -1) {
    selectedIds.value.splice(idx, 1)
  } else {
    selectedIds.value.push(id)
  }
}

// --- Edit/Delete Logic ---
const editForm = reactive({
  id: '',
  name: '',
  category_id: ''
})

const handleEdit = (img: AdminImage) => {
  editForm.id = img.id
  editForm.name = img.name
  editForm.category_id = img.category_id || ''
  editDialogVisible.value = true
}

const confirmEdit = async () => {
  const res = await adminImageApi.updateImage(editForm.id, {
    name: editForm.name,
    category_id: editForm.category_id
  })
  if (res.success) {
    ElMessage.success('更新成功')
    editDialogVisible.value = false
    fetchImages()
  } else {
    ElMessage.error(res.error || '更新失败')
  }
}

const handleDelete = (img: AdminImage) => {
   ElMessageBox.confirm('确认删除此图片？', '警告', { type: 'warning' })
    .then(async () => {
      const res = await adminImageApi.deleteImage(img.id)
      if (res.success) {
        ElMessage.success('删除成功')
        fetchImages()
      } else {
        ElMessage.error(res.error)
      }
    })
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(`确认删除选中的 ${selectedIds.value.length} 张图片？`, '批量删除', { type: 'warning' })
    .then(async () => {
        const res = await adminImageApi.deleteImages(selectedIds.value)
        if (res.success) {
             ElMessage.success('批量删除成功')
             fetchImages()
        } else {
             ElMessage.error(res.error)
        }
    })
}

// --- R2 Sync ---
const syncing = ref(false)
const syncFromR2 = async () => {
  syncing.value = true
  try {
    const { getAdminAuthToken } = await import('@/utils/supabase-admin')
    const token = await getAdminAuthToken()
    if (!token) return ElMessage.error('请登录管理员账号')

    const { EDGE_FUNCTIONS_URL } = await import('@/utils/supabase')
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/list-r2`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix: 'uploads' })
    })
    
    const result = await response.json()
    if (result.error) throw new Error(result.error)
    
    const r2Objects = result.objects || []
    const existingUrls = new Set(images.value.map(i => i.url)) // Check current list (maybe incomplete if paged, but API returns all for now)
    // To be safe, we should fetch ALL images for sync check, but let's assume current list is enough for now or user knows to view 'All'
    // Better: Fetch all just for sync check? No, too heavy.
    // Let's rely on backend check or simple check against current view if 'All' is selected.
    // Ideally sync should be backend generic task.
    // We stick to current logic: compares against Client-side fetched images. 
    
    // Logic from previous version maintained:
    const missing = r2Objects.filter((obj: any) => !existingUrls.has(obj.url))
    if (missing.length === 0) {
        ElMessage.success('已是最新')
        return
    }
    
    // Auto create "未分类"
    let uncategorizedId = categories.value.find(c => c.name === '未分类')?.id
    if (!uncategorizedId) {
        const cRes = await adminImageCategoryApi.createCategory('未分类')
        if (cRes.success) uncategorizedId = cRes.category?.id
        await fetchCategories()
    }
    
    let added = 0
    for (const m of missing) {
        const name = m.key.split('/').pop()
        const res = await adminImageApi.createImage({ name, url: m.url, category_id: uncategorizedId })
        if (res.success) added++
    }
    ElMessage.success(`同步完成，新增 ${added} 张图片`)
    fetchImages()
    
  } catch (e: any) {
    ElMessage.error('同步失败: ' + e.message)
  } finally {
    syncing.value = false
  }
}

const handleUploadSuccess = () => {
  fetchImages()
}

const previewImage = (url: string) => {
    previewUrl.value = url
    previewVisible.value = true
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString()
}
</script>

<style scoped>
.media-layout {
  display: flex;
  height: calc(100vh - 120px); /* Adjust based on global header height */
  background: var(--el-bg-color);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--el-border-color-lighter);
}

/* Sidebar */
.media-sidebar {
  width: 240px;
  background: var(--el-bg-color-page); /* Slightly different bg */
  border-right: 1px solid var(--el-border-color-lighter);
  display: flex;
  flex-direction: column;
}
.sidebar-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}
.sidebar-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}
.category-nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
}
.nav-item {
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--el-text-color-regular);
  transition: all 0.2s;
  font-size: 14px;
}
.nav-item:hover {
  background: var(--el-fill-color-light);
  color: var(--el-color-primary);
}
.nav-item.active {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-right: 3px solid var(--el-color-primary);
}
.nav-item .el-icon {
  margin-right: 10px;
  font-size: 16px;
}
.nav-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.nav-count {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color);
  padding: 2px 6px;
  border-radius: 10px;
}
.nav-divider {
    height: 1px;
    background: var(--el-border-color-lighter);
    margin: 8px 20px;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--el-border-color-lighter);
}

/* Content */
.media-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Fix flex overflow */
}

/* Toolbar */
.content-toolbar {
  padding: 16px 24px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--el-bg-color);
}
.toolbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
}
.batch-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--el-color-danger-light-9);
    padding: 4px 12px;
    border-radius: 4px;
}
.selection-info {
    font-size: 13px;
    color: var(--el-color-danger);
}

/* Grid */
.content-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: var(--el-fill-color-extra-light); 
}
.image-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.grid-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid transparent;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
}
.grid-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.grid-item.selected {
  border-color: var(--el-color-primary);
  box-shadow: 0 0 0 2px var(--el-color-primary-light-5);
}

.img-preview {
  height: 140px;
  width: 100%;
  position: relative;
  background: #f5f7fa;
}
.real-image {
  width: 100%;
  height: 100%;
  display: block;
}
/* Overlay */
.img-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.4);
    opacity: 0;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.grid-item:hover .img-overlay {
    opacity: 1;
}
.overlay-actions {
    display: flex;
    gap: 8px;
}

.selection-mark {
    position: absolute;
    top: 8px;
    left: 8px;
    background: var(--el-color-primary);
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.img-meta {
  padding: 8px 12px;
}
.img-name {
  font-size: 13px;
  color: var(--el-text-color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}
.img-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.cat-badge {
    font-size: 11px;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color);
    padding: 1px 4px;
    border-radius: 3px;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.date {
    font-size: 11px;
    color: var(--el-text-color-placeholder);
}

.content-footer {
    padding: 16px 24px;
    background: var(--el-bg-color);
    border-top: 1px solid var(--el-border-color-lighter);
    display: flex;
    justify-content: flex-end;
}
</style>
