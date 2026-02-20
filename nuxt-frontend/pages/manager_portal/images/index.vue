<template>
  <div class="image-page">
    <div class="page-header">
      <h2>图片管理</h2>
      <div class="header-actions">
        <el-button :icon="Refresh" @click="syncFromR2" :loading="syncing">从 R2 同步</el-button>
        <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
          批量删除{{ selectedIds.length ? ` (${selectedIds.length})` : '' }}
        </el-button>
        <el-button type="primary" :icon="Upload" @click="openUpload">
          {{ activeCategory ? `上传至「${activeCategory.name}」` : '上传图片' }}
        </el-button>
      </div>
    </div>

    <div class="image-layout">
      <!-- 左侧分类导航 -->
      <div class="category-sidebar">
        <div class="sidebar-title">图片分类</div>

        <!-- 全部 -->
        <div
          class="cat-nav-item"
          :class="{ active: activeCategoryId === '' }"
          @click="selectCategory('')"
        >
          <el-icon><FolderOpened /></el-icon>
          <span class="cat-name">全部</span>
          <span class="cat-count">{{ images.length }}</span>
        </div>

        <!-- 分类列表 -->
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="cat-nav-item"
          :class="{ active: activeCategoryId === cat.id }"
          @click="selectCategory(cat.id)"
        >
          <el-icon><Folder /></el-icon>
          <span class="cat-name">{{ cat.name }}</span>
          <span class="cat-count">{{ getCategoryCount(cat.id) }}</span>
          <el-icon class="cat-delete-btn" @click.stop="deleteCategory(cat)" title="删除分类">
            <Close />
          </el-icon>
        </div>

        <!-- 新建分类 -->
        <div class="new-cat-area">
          <div v-if="!showNewCatInput" class="new-cat-btn" @click="showNewCatInput = true">
            <el-icon><Plus /></el-icon> 新建分类
          </div>
          <div v-else class="new-cat-form">
            <el-input
              v-model="newCatName"
              placeholder="分类名称"
              size="small"
              @keyup.enter="addCategory"
              @keyup.esc="showNewCatInput = false"
              autofocus
            />
            <div class="new-cat-hint">slug 将自动生成</div>
            <div class="new-cat-actions">
              <el-button size="small" type="primary" @click="addCategory">确认</el-button>
              <el-button size="small" @click="showNewCatInput = false">取消</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧图片内容区 -->
      <div class="image-main">
        <!-- 当前分类信息栏 -->
        <div class="content-header">
          <div class="content-title">
            <el-icon><FolderOpened /></el-icon>
            <span>{{ activeCategory ? activeCategory.name : '全部图片' }}</span>
            <el-tag v-if="activeCategory" size="small" type="info" style="margin-left: 8px;">
              {{ activeCategory.slug }}
            </el-tag>
          </div>
          <el-input
            v-model="searchKeyword"
            placeholder="搜索图片名称"
            clearable
            style="width: 200px;"
            @keyup.enter="fetchData"
            @clear="fetchData"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
        </div>

        <!-- 图片网格 -->
        <div v-loading="loading" class="image-grid-wrapper">
          <div v-if="filteredImages.length === 0 && !loading" class="empty-state">
            <el-empty :description="`「${activeCategory?.name || '全部'}」暂无图片`">
              <el-button type="primary" @click="openUpload">立即上传</el-button>
            </el-empty>
          </div>
          <div v-else class="image-grid">
            <div
              v-for="img in filteredImages"
              :key="img.id"
              class="image-card"
              :class="{ 'is-selected': selectedIds.includes(img.id) }"
            >
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
                <div class="image-name" :title="img.name">{{ img.name }}</div>
                <div class="image-actions">
                  <el-button link type="primary" size="small" @click="handleEdit(img)">编辑</el-button>
                  <el-button link type="danger" size="small" @click="handleDelete(img)">删除</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传图片弹窗 -->
    <el-dialog v-model="uploadDialogVisible" :title="uploadDialogTitle" width="480px" @closed="resetUploadForm" append-to-body :z-index="2000">
      <el-form :model="uploadForm" label-width="80px">
        <!-- 只有在「全部」模式下才需要手动选分类 -->
        <el-form-item v-if="!activeCategory" label="所属分类" required>
          <el-select v-model="uploadForm.categoryId" placeholder="请选择分类" style="width: 100%;">
            <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-else label="上传至">
          <el-tag>{{ activeCategory.name }} ({{ activeCategory.slug }}/)</el-tag>
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
              <div class="el-upload__tip">支持 jpg/png/webp，不超过 10MB</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="uploadDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpload" :loading="uploading">开始上传</el-button>
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
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { Search, Upload, Refresh, Folder, FolderOpened, Plus, Close } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminImageApi, adminImageCategoryApi, type AdminImage, type AdminImageCategory } from '@/api/admin/media'

definePageMeta({
  layout: 'mgmt', middleware: ['mgmt-auth'],
  title: '图片管理'
})

// =====================
// State
// =====================
const loading = ref(false)
const searchKeyword = ref('')
const activeCategoryId = ref('')   // '' = 全部

const uploadDialogVisible = ref(false)
const editDialogVisible = ref(false)
const showNewCatInput = ref(false)
const newCatName = ref('')

const session = useSupabaseSession()
const categories = ref<AdminImageCategory[]>([])
const images = ref<AdminImage[]>([])
const selectedIds = ref<string[]>([])

// =====================
// 计算属性
// =====================
const activeCategory = computed(() =>
  categories.value.find(c => c.id === activeCategoryId.value) || null
)

const filteredImages = computed(() => {
  let list = images.value
  if (activeCategoryId.value) {
    list = list.filter(img => img.category_id === activeCategoryId.value)
  }
  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.toLowerCase()
    list = list.filter(img => img.name.toLowerCase().includes(kw))
  }
  return list
})

const uploadDialogTitle = computed(() =>
  activeCategory.value ? `上传至「${activeCategory.value.name}」` : '上传图片'
)

const getCategoryCount = (catId: string) =>
  images.value.filter(img => img.category_id === catId).length

// =====================
// 数据加载
// =====================
const fetchCategories = async () => {
  const res = await adminImageCategoryApi.getCategories()
  if (res.success) categories.value = res.categories
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await adminImageApi.getImages({ keyword: searchKeyword.value })
    if (res.success) images.value = res.images
    else ElMessage.error('加载图片失败: ' + res.error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchCategories(), fetchData()])
})

// =====================
// 分类操作
// =====================
const selectCategory = (id: string) => {
  activeCategoryId.value = id
  selectedIds.value = []
}

const addCategory = async () => {
  const name = newCatName.value.trim()
  if (!name) return ElMessage.warning('请输入分类名称')

  const res = await adminImageCategoryApi.createCategory(name)
  if (res.success) {
    ElMessage.success('分类创建成功')
    newCatName.value = ''
    showNewCatInput.value = false
    await fetchCategories()
    // 自动切换到新创建的分类
    if (res.category) activeCategoryId.value = res.category.id
  } else {
    ElMessage.error('创建失败: ' + res.error)
  }
}

const deleteCategory = (cat: AdminImageCategory) => {
  ElMessageBox.confirm(
    `确认删除分类「${cat.name}」吗？该分类下有图片则无法删除。`,
    '删除分类', { type: 'warning' }
  ).then(async () => {
    const res = await adminImageCategoryApi.deleteCategory(cat.id)
    if (res.success) {
      ElMessage.success('分类已删除')
      if (activeCategoryId.value === cat.id) activeCategoryId.value = ''
      await fetchCategories()
    } else {
      ElMessage.error('删除失败: ' + res.error)
    }
  }).catch(() => {})
}

// =====================
// 批量选择 & 删除
// =====================
const toggleSelect = (id: string) => {
  const index = selectedIds.value.indexOf(id)
  if (index > -1) selectedIds.value.splice(index, 1)
  else selectedIds.value.push(id)
}

const handleBatchDelete = () => {
  if (!selectedIds.value.length) return
  ElMessageBox.confirm(
    `确认删除选中的 ${selectedIds.value.length} 张图片吗？此操作不可恢复。`,
    '批量删除', { type: 'warning' }
  ).then(async () => {
    loading.value = true
    try {
      const token = session.value?.access_token
      const res = await adminImageApi.deleteImages(selectedIds.value, token)
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
  }).catch(() => {})
}

// =====================
// R2 同步（P4：路径解析归类）
// =====================
const syncing = ref(false)

const syncFromR2 = async () => {
  syncing.value = true
  try {
    const token = session.value?.access_token
    if (!token) return ElMessage.error('无法获取登录凭证，请重新登录')

    const { EDGE_FUNCTIONS_URL } = await import('@/utils/supabase')
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/list-r2`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix: '' }) // 列出所有对象
    })

    const result = await response.json()
    if (!response.ok || result.error) {
      return ElMessage.error('获取 R2 列表失败: ' + (result.error || '未知错误'))
    }

    const r2Objects: Array<{ key: string; url: string }> = result.objects || []
    if (!r2Objects.length) return ElMessage.info('R2 中没有图片')

    const existingUrls = new Set(images.value.map(img => img.url))
    const missingObjects = r2Objects.filter(obj => !existingUrls.has(obj.url))

    if (!missingObjects.length) return ElMessage.success('已是最新，无需同步')

    // 按路径前缀分组，自动匹配或创建分类
    const slugToCategoryId = new Map<string, string>()
    for (const cat of categories.value) {
      if (cat.slug) slugToCategoryId.set(cat.slug, cat.id)
    }

    let addedCount = 0
    for (const obj of missingObjects) {
      // 从路径提取 slug：banners/xxx.jpg → banners
      const parts = obj.key.split('/')
      const folderSlug = parts.length > 1 ? parts[0] : 'others'

      // 找或创建对应分类
      let categoryId = slugToCategoryId.get(folderSlug)
      if (!categoryId) {
        const createRes = await adminImageCategoryApi.createCategory(folderSlug, folderSlug)
        if (createRes.success && createRes.category) {
          categoryId = createRes.category.id
          slugToCategoryId.set(folderSlug, categoryId)
          await fetchCategories()
        }
      }

      const name = parts[parts.length - 1] || obj.key
      const res = await adminImageApi.createImage({
        name,
        url: obj.url,
        category_id: categoryId
      })
      if (res.success) addedCount++
    }

    ElMessage.success(`同步成功！新增 ${addedCount} 张图片`)
    await fetchData()

  } catch (e: any) {
    if (import.meta.dev) console.error('Sync error:', e)
    ElMessage.error('同步失败: ' + (e.message || '未知错误'))
  } finally {
    syncing.value = false
  }
}

// =====================
// 上传（P3：上下文感知，自动用当前分类 slug）
// =====================
const uploadForm = reactive({ categoryId: '', name: '' })
const fileList = ref<any[]>([])
const uploading = ref(false)

const openUpload = () => {
  if (activeCategory.value) {
    uploadForm.categoryId = activeCategory.value.id
  }
  uploadDialogVisible.value = true
}

const handleFileChange = (file: any, fileListRef: any) => {
  fileList.value = fileListRef
  if (!uploadForm.name && file.name) uploadForm.name = file.name
}

const submitUpload = async () => {
  if (!uploadForm.categoryId && !activeCategory.value) {
    return ElMessage.warning('请选择分类')
  }
  if (!fileList.value.length) return ElMessage.warning('请选择图片文件')
  if (uploadForm.name && uploadForm.name.length > 50) return ElMessage.warning('图片名称过长')

  uploading.value = true
  try {
    const file = fileList.value[0].raw
    const token = session.value?.access_token
    if (!token) return ElMessage.error('请重新登录')

    // 确定上传分类和 R2 folder
    const catId = activeCategory.value?.id || uploadForm.categoryId
    const cat = categories.value.find(c => c.id === catId)
    const folder = cat?.slug || 'others'

    const { uploadImageToStorage } = await import('@/utils/uploadImage')
    const uploadRes = await uploadImageToStorage(file, folder, undefined, token)

    if (!uploadRes.success) {
      return ElMessage.error('文件上传失败: ' + uploadRes.error)
    }

    const res = await adminImageApi.createImage({
      name: uploadForm.name || file.name,
      url: uploadRes.url!,
      category_id: catId
    })

    if (res.success) {
      ElMessage.success('上传成功')
      uploadDialogVisible.value = false
      selectedIds.value = []
      await fetchData()
    } else {
      ElMessage.error('保存图片记录失败: ' + res.error)
    }
  } catch (e: any) {
    if (import.meta.dev) console.error('Upload error:', e)
    ElMessage.error('上传失败: ' + (e.message || '未知错误'))
  } finally {
    uploading.value = false
  }
}

const resetUploadForm = () => {
  uploadForm.categoryId = ''
  uploadForm.name = ''
  fileList.value = []
}

// =====================
// 编辑 & 删除
// =====================
const editForm = reactive({ id: '', name: '', category_id: '' })

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
    ElMessage.success('修改成功')
    editDialogVisible.value = false
    await fetchData()
  } else {
    ElMessage.error('修改失败: ' + res.error)
  }
}

const handleDelete = (img: AdminImage) => {
  ElMessageBox.confirm('确认删除该图片吗？此操作无法恢复。', '删除图片', { type: 'warning' })
    .then(async () => {
      const token = session.value?.access_token
      const res = await adminImageApi.deleteImage(img.id, token)
      if (res.success) {
        ElMessage.success('已删除')
        await fetchData()
      } else {
        ElMessage.error('删除失败: ' + res.error)
      }
    }).catch(() => {})
}
</script>

<style scoped>
.image-page {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-shrink: 0;
}
.page-header h2 {
  margin: 0;
  font-size: 24px;
  color: var(--el-text-color-primary);
  font-weight: 600;
}
.header-actions {
  display: flex;
  gap: 10px;
}

/* ===== 主布局 ===== */
.image-layout {
  display: flex;
  gap: 0;
  flex: 1;
  min-height: 0;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  overflow: hidden;
}

/* ===== 左侧分类导航 ===== */
.category-sidebar {
  width: 200px;
  flex-shrink: 0;
  background: var(--el-bg-color-page);
  border-right: 1px solid var(--el-border-color-lighter);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-title {
  padding: 16px 16px 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--el-text-color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cat-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  cursor: pointer;
  border-radius: 0;
  transition: background 0.15s;
  position: relative;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.cat-nav-item:hover {
  background: var(--el-fill-color-light);
}
.cat-nav-item.active {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  font-weight: 600;
  border-right: 3px solid var(--el-color-primary);
}

.cat-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cat-count {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
  background: var(--el-fill-color);
  border-radius: 10px;
  padding: 1px 6px;
  min-width: 20px;
  text-align: center;
}
.cat-delete-btn {
  opacity: 0;
  transition: opacity 0.15s;
  color: var(--el-color-danger);
  font-size: 12px;
}
.cat-nav-item:hover .cat-delete-btn {
  opacity: 1;
}

/* 新建分类 */
.new-cat-area {
  margin-top: auto;
  padding: 12px;
  border-top: 1px solid var(--el-border-color-lighter);
}
.new-cat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--el-color-primary);
  cursor: pointer;
  padding: 6px 0;
}
.new-cat-btn:hover { opacity: 0.8; }
.new-cat-form { display: flex; flex-direction: column; gap: 6px; }
.new-cat-hint { font-size: 11px; color: var(--el-text-color-placeholder); }
.new-cat-actions { display: flex; gap: 6px; }

/* ===== 右侧内容区 ===== */
.image-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--el-bg-color);
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  flex-shrink: 0;
}
.content-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.image-grid-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* ===== 图片网格 ===== */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.image-card {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
  background: var(--el-bg-color);
  position: relative;
}
.image-card:hover {
  box-shadow: var(--el-box-shadow-light);
  transform: translateY(-2px);
}
.is-selected {
  border: 2px solid var(--el-color-primary);
  box-shadow: 0 0 8px var(--el-color-primary-light-5);
}

.card-selection {
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 20;
  background: var(--el-bg-color-overlay);
  border-radius: 4px;
  padding: 2px;
  cursor: pointer;
  box-shadow: var(--el-box-shadow-lighter);
  transition: transform 0.15s;
}
.card-selection:hover { transform: scale(1.05); }
:deep(.el-checkbox__inner) { width: 18px; height: 18px; }
:deep(.el-checkbox__inner::after) { height: 9px; left: 5px; top: 1px; }

.image-wrapper {
  height: 140px;
  background: var(--el-fill-color-light);
}
.image-thumb { width: 100%; height: 100%; }

.image-info { padding: 10px; }
.image-name {
  font-size: 13px;
  color: var(--el-text-color-primary);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.image-actions { display: flex; justify-content: space-between; }

.empty-state { padding: 60px 0; }

:deep(.el-upload-list__item-name) {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
