<template>
  <div class="image-page">
    <div class="page-header">
      <h2>图片管理</h2>
    </div>

    <!-- 筛选与操作 -->
    <el-card shadow="never" class="filter-card">
      <div class="filter-container">
        <div class="filter-left">
          <el-select v-model="filterCategoryId" placeholder="选择分类" clearable style="width: 150px; margin-right: 15px;" @change="handleSearch">
            <el-option label="全部图片" value="" />
            <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
          </el-select>
          <el-input v-model="searchKeyword" placeholder="搜索图片名称" clearable style="width: 200px; margin-right: 15px;" @keyup.enter="handleSearch">
             <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          
        </div>
        <div class="filter-right">
           <el-button @click="openCategoryManager">管理分类</el-button>
           <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
             批量删除 {{ selectedIds.length ? `(${selectedIds.length})` : '' }}
           </el-button>
           <el-button type="success" :icon="Refresh" @click="syncFromR2" :loading="syncing">从 R2 同步</el-button>
           <el-button type="primary" :icon="Upload" @click="openUpload">上传图片</el-button>
        </div>
      </div>

      <!-- 已有分类展示 -->
      <div class="category-display" v-if="categories.length > 0">
        <span class="cat-label">已有分类：</span>
        <div class="cat-tags">
           <el-tag v-for="cat in categories" :key="cat.id" type="info" class="mr-2" style="margin-right: 8px;">{{ cat.name }}</el-tag>
        </div>
      </div>
    </el-card>

    <!-- 图片列表 (Grid) -->
    <el-card shadow="never" class="list-card" v-loading="loading">
      <div v-if="filteredImages.length === 0" class="empty-state">
        <el-empty description="暂无图片" />
      </div>
      <div v-else class="image-grid">
        <div v-for="img in filteredImages" :key="img.id" class="image-card" :class="{ 'is-selected': selectedIds.includes(img.id) }">
          <div class="card-selection" @click.stop="toggleSelect(img.id)">
             <el-checkbox :model-value="selectedIds.includes(img.id)" size="large" style="pointer-events: none;" />
          </div>
          <div class="image-wrapper">
             <el-image 
                :src="img.url" 
                fit="cover" 
                class="image-thumb"
                :preview-src-list="[img.url]"
                :initial-index="0"
                :z-index="3000"
                preview-teleported
             />
          </div>
          <div class="image-info">
            <div class="image-header">
               <el-tag size="small" type="info" effect="plain" class="cat-tag">{{ img.category?.name || '未分类' }}</el-tag>
            </div>
            <div class="image-name" :title="img.name">{{ img.name }}</div>
            <div class="image-actions">
               <el-button link type="primary" size="small" @click="handleEdit(img)">编辑</el-button>
               <el-button link type="danger" size="small" @click="handleDelete(img)">删除</el-button>
            </div>
          </div>
        </div>
      </div>

       <!-- 分页 -->
      <div class="pagination-wrapper" style="margin-top: 20px; display: flex; justify-content: flex-end;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredImages.length"
          :page-size="20"
        />
      </div>
    </el-card>

    <!-- 管理分类弹窗 -->
    <el-dialog v-model="catDialogVisible" title="分类管理" width="500px" append-to-body :z-index="2000">
       <div class="cat-manager">
         <div class="add-cat-row">
           <el-input v-model="newCatName" placeholder="新分类名称" style="margin-right: 10px;" />
           <el-button type="primary" @click="addCategory">添加分类</el-button>
         </div>
         <el-divider />
         <div class="cat-list">
           <div v-for="cat in categories" :key="cat.id" class="cat-item">
             <span>{{ cat.name }}</span>
             <el-button link type="danger" size="small" @click="deleteCategory(cat)">删除</el-button>
           </div>
         </div>
       </div>
    </el-dialog>

    <!-- 上传图片弹窗 -->
    <el-dialog v-model="uploadDialogVisible" title="上传图片" width="500px" @closed="resetUploadForm" append-to-body :z-index="2000">
      <el-form :model="uploadForm" label-width="80px">
        <el-form-item label="所属分类" required>
          <el-select v-model="uploadForm.categoryId" placeholder="请选择分类" style="width: 100%;">
             <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="图片名称">
           <el-input v-model="uploadForm.name" placeholder="默认使用文件名" />
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
          <el-button @click="uploadDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitUpload" :loading="uploading">开始上传</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑图片弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑图片信息" width="400px" append-to-body :z-index="2000">
       <el-form :model="editForm" label-width="80px">
         <el-form-item label="图片名称">
           <el-input v-model="editForm.name" />
         </el-form-item>
         <el-form-item label="所属分类">
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

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { Search, Upload, Refresh } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi, type AdminImage, type AdminImageCategory } from '@/api/admin'

definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"],
  title: '图片管理'
})

// State
const loading = ref(false)
const filterCategoryId = ref('')
const searchKeyword = ref('')

// Dialog States
const catDialogVisible = ref(false)
const uploadDialogVisible = ref(false)
const editDialogVisible = ref(false)

// Data
const categories = ref<AdminImageCategory[]>([])

const fetchCategories = async () => {
  const res = await adminApi.imageCategory.getCategories()
  if (res.success) {
    categories.value = res.categories
  }
}

const images = ref<AdminImage[]>([])
const selectedIds = ref<string[]>([])

const toggleSelect = (id: string) => {
  const index = selectedIds.value.indexOf(id)
  if (index > -1) {
    selectedIds.value.splice(index, 1)
  } else {
    selectedIds.value.push(id)
  }
}

const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) return
  
  ElMessageBox.confirm(`确认删除选中的 ${selectedIds.value.length} 张图片吗？此操作不可恢复。`, '批量删除', {
    type: 'warning'
  }).then(async () => {
    loading.value = true
    try {
        const res = await adminApi.image.deleteImages(selectedIds.value)
        if (res.success) {
            ElMessage.success('批量删除成功')
            selectedIds.value = []
            await fetchData()
        } else {
            ElMessage.error('删除失败: ' + res.error)
        }
    } finally {
        loading.value = false
    }
  })
}

// Fetch Data
const fetchData = async () => {
  loading.value = true
  try {
    const res = await adminApi.image.getImages({
      category_id: filterCategoryId.value,
      keyword: searchKeyword.value
    })
    if (res.success) {
      images.value = res.images
    } else {
      ElMessage.error('加载图片失败: ' + res.error)
    }
  } finally {
    loading.value = false
  }
}

// --- R2 Sync Logic ---
const syncing = ref(false)

const syncFromR2 = async () => {
  syncing.value = true
  try {
    // 1. 获取 R2 对象列表
    const { getAdminAuthToken } = await import('@/utils/supabase-admin')
    const token = await getAdminAuthToken()
    
    if (!token) {
      ElMessage.error('请先登录后台管理员账号')
      return
    }

    const { EDGE_FUNCTIONS_URL } = await import('@/utils/supabase')
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/list-r2`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prefix: 'uploads' })
    })

    const result = await response.json()
    
    if (!response.ok || result.error) {
      ElMessage.error('获取 R2 列表失败: ' + (result.error || '未知错误'))
      return
    }

    const r2Objects = result.objects || []
    
    if (r2Objects.length === 0) {
      ElMessage.info('R2 存储桶中没有图片')
      return
    }

    // 2. 获取数据库中已有的图片 URL
    const existingUrls = new Set(images.value.map(img => img.url))

    // 3. 筛选出缺失的图片
    const missingObjects = r2Objects.filter((obj: any) => !existingUrls.has(obj.url))

    if (missingObjects.length === 0) {
      ElMessage.success('已同步，无新图片')
      return
    }

    // 4. 获取或创建"未分类"分类
    let uncategorizedId = ''
    const uncategorizedCat = categories.value.find(c => c.name === '未分类')
    if (uncategorizedCat) {
      uncategorizedId = uncategorizedCat.id
    } else {
      // 创建未分类
      const createRes = await adminApi.imageCategory.createCategory('未分类')
      if (createRes.success && createRes.category) {
        uncategorizedId = createRes.category.id
        await fetchCategories()
      }
    }

    // 5. 批量插入缺失的图片记录
    let addedCount = 0
    for (const obj of missingObjects) {
      const name = obj.key.split('/').pop() || obj.key
      const res = await adminApi.image.createImage({
        name,
        url: obj.url,
        category_id: uncategorizedId || undefined
      })
      if (res.success) addedCount++
    }

    ElMessage.success(`同步成功！新增 ${addedCount} 张图片`)
    await fetchData()

  } catch (error: any) {
    console.error('Sync error:', error)
    ElMessage.error('同步失败: ' + (error.message || '未知错误'))
  } finally {
    syncing.value = false
  }
}

onMounted(() => {
  fetchCategories()
  fetchData()
})

// Computed
const filteredImages = computed(() => images.value)

// --- Category Logic ---
const newCatName = ref('')
const openCategoryManager = () => {
  catDialogVisible.value = true
}
const addCategory = async () => {
  if (!newCatName.value.trim()) {
    ElMessage.warning('请输入分类名称')
    return
  }
  const res = await adminApi.imageCategory.createCategory(newCatName.value)
  if (res.success) {
     ElMessage.success('分类添加成功')
     newCatName.value = ''
     fetchCategories()
  } else {
     ElMessage.error('添加失败: ' + res.error)
  }
}
const deleteCategory = (cat: AdminImageCategory) => {
  ElMessageBox.confirm(`确认删除分类 "${cat.name}" 吗？`, '删除分类', {
    type: 'warning'
  }).then(async () => {
    const res = await adminApi.imageCategory.deleteCategory(cat.id)
    if (res.success) {
      ElMessage.success('分类删除成功')
      fetchCategories()
    } else {
      ElMessage.error('删除失败: ' + res.error)
    }
  })
}


// --- Upload Logic ---
const uploadForm = reactive({
  categoryId: '',
  name: ''
})
const fileList = ref<any[]>([])
const uploading = ref(false)

const openUpload = () => {
  uploadDialogVisible.value = true
}
const handleFileChange = (file: any, fileListRef: any) => {
  fileList.value = fileListRef
  if (!uploadForm.name && file.name) {
    uploadForm.name = file.name
  }
}

const submitUpload = async () => {
  if (!uploadForm.categoryId) {
    ElMessage.warning('请选择分类')
    return
  }
  if (fileList.value.length === 0) {
    ElMessage.warning('请选择图片文件')
    return
  }
  // 校验图片名称长度
  if (uploadForm.name && uploadForm.name.length > 50) {
      ElMessage.warning('图片名称过长，请精简')
      return
  }
  
  uploading.value = true
  try {
    // 1. 先上传文件到 Supabase Storage
    const file = fileList.value[0].raw
    const { uploadImageToStorage } = await import('@/utils/uploadImage')
    const uploadRes = await uploadImageToStorage(file)
    
    if (!uploadRes.success) {
      ElMessage.error('文件上传失败: ' + uploadRes.error)
      uploading.value = false
      return
    }
    
    // 2. 保存图片记录到数据库
    const res = await adminApi.image.createImage({
      name: uploadForm.name || file.name,
      url: uploadRes.url!, // 使用真实上传后的 URL
      category_id: uploadForm.categoryId
    })
    
    if (res.success) {
      ElMessage.success('上传成功')
      uploadDialogVisible.value = false
      selectedIds.value = [] // 上传完成后重置勾选状态
      await fetchData()
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
const resetUploadForm = () => {
  uploadForm.categoryId = ''
  uploadForm.name = ''
  fileList.value = []
}

// --- Edit/Delete Logic ---
// ... 保持原有逻辑，但 categoryId 改为 category_id ...
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
  const res = await adminApi.image.updateImage(editForm.id, {
    name: editForm.name,
    category_id: editForm.category_id
  })
  
  if (res.success) {
    ElMessage.success('修改成功')
    editDialogVisible.value = false
    await fetchData()
  } else {
    ElMessage.error('修改失败: ' + res.error)
  }
}

const handleDelete = (img: AdminImage) => {
  ElMessageBox.confirm('确认删除该图片吗？此操作无法恢复。', '删除图片', {
    type: 'warning'
  }).then(async () => {
    const res = await adminApi.image.deleteImage(img.id)
    if (res.success) {
      ElMessage.success('已删除')
      await fetchData()
    } else {
      ElMessage.error('删除失败: ' + res.error)
    }
  })
}

const handleSearch = () => {
  fetchData()
}
</script>

<style scoped>
.image-page {
  padding: 0;
}
.page-header {
  margin-bottom: 24px;
}
.page-header h2 {
  margin: 0;
  font-size: 28px;
  color: var(--el-text-color-primary);
  font-weight: 600;
}

.filter-card {
  margin-bottom: 24px;
}
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filter-left, .filter-right {
  display: flex;
  align-items: center;
}

/* Image Grid */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.image-card {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  background: var(--el-bg-color);
  position: relative;
}
.image-card:hover {
  box-shadow: var(--el-box-shadow-light);
  transform: translateY(-2px);
}

.image-wrapper {
  height: 150px;
  width: 100%;
  background: var(--el-fill-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-thumb {
  width: 100%;
  height: 100%;
}

.image-info {
  padding: 12px;
}
.image-name {
  font-size: 14px;
  color: var(--el-text-color-primary);
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.image-actions {
  display: flex;
  justify-content: space-between;
}

/* Category Manager */
.cat-manager {
  padding: 0 10px;
}
.add-cat-row {
  display: flex;
  margin-bottom: 15px;
}
.cat-list {
  max-height: 300px;
  overflow-y: auto;
}
.cat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--el-border-color-lighter);
}
.cat-item:last-child {
  border-bottom: none;
}

/* Fix Upload Dialog File Name Overflow */
:deep(.el-upload-list__item-name) {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-selection {
    position: absolute;
    top: 6px;
    left: 6px;
    z-index: 20;
    background: var(--el-bg-color-overlay);
    border-radius: 4px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--el-box-shadow-lighter);
    cursor: pointer;
    transition: transform 0.2s;
}
.card-selection:hover {
    transform: scale(1.05);
}
/* Enlarge Checkbox */
:deep(.el-checkbox__inner) {
    width: 20px;
    height: 20px;
}
:deep(.el-checkbox__inner::after) {
    height: 10px;
    left: 6px;
    top: 2px;
}

.is-selected {
    border: 2px solid var(--el-color-primary);
    box-shadow: 0 0 8px var(--el-color-primary-light-5);
}

.image-header {
    margin-bottom: 5px;
}
.cat-tag {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.category-display {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid var(--el-border-color-lighter);
    display: flex;
    align-items: flex-start;
}
.cat-label {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    margin-right: 10px;
    white-space: nowrap;
    margin-top: 2px;
}
.cat-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
</style>
