<template>
  <div class="banner-page">
    
    <!-- 操作栏 -->
    <AdminActionCard>
      <div class="action-bar">
         <el-button type="primary" :icon="Plus" @click="openCreateDialog">添加轮播图</el-button>
         <el-button @click="fetchData" :icon="Refresh">刷新</el-button>
      </div>
      <div class="mt-2 text-gray-500 text-sm">
        提示：轮播图图片需从图片管理中选择，前端展示顺序由排序值决定（越小越靠前）。
      </div>
    </AdminActionCard>

    <!-- 列表 -->
    <el-card shadow="never" class="list-card" v-loading="loading">
      <el-table :data="banners" style="width: 100%" row-key="id">
        <el-table-column label="排序" width="100">
           <template #default="{ row }">
              <el-tag type="info">{{ row.sort_order }}</el-tag>
           </template>
        </el-table-column>
        <el-table-column label="封面图" width="200">
          <template #default="{ row }">
            <el-image 
              v-if="row.image"
              :src="row.image.url" 
              fit="cover" 
              style="width: 160px; height: 60px; border-radius: 4px;"
              :preview-src-list="[row.image.url]"
              preview-teleported
            />
            <span v-else class="text-gray-400">无图片</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="150" show-overflow-tooltip />
        <el-table-column prop="link" label="跳转链接" min-width="200" show-overflow-tooltip />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
             <el-switch 
               v-model="row.status" 
               active-value="on" 
               inactive-value="off"
               @change="(val: string | number | boolean) => handleStatusChange(row, val === 'on')"
             />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑/添加弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑轮播图' : '添加轮播图'" width="500px" append-to-body :z-index="2000">
      <el-form :model="form" label-width="80px">
        <el-form-item label="封面图片" required>
           <div class="image-selector" @click="openImageSelector">
             <el-image v-if="selectedImage" :src="selectedImage.url" fit="cover" class="preview-img" />
             <div v-else class="placeholder">
               <el-icon><Plus /></el-icon>
               <span>点击选择图片</span>
             </div>
           </div>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="可选" />
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input v-model="form.link" placeholder="可选，例如 /activity/1" />
        </el-form-item>
        <el-form-item label="排序值">
          <el-input-number v-model="form.sort_order" :min="0" />
          <div class="tips">值越小越靠前</div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 图片选择器 -->
    <el-dialog v-model="selectorVisible" title="选择图片" width="800px" append-to-body :z-index="2100">
       <div class="selector-header">
         <el-input v-model="selectorKeyword" placeholder="搜索图片" style="width: 200px;" @input="fetchImages">
            <template #prefix><el-icon><Search /></el-icon></template>
         </el-input>
       </div>
       <div class="selector-grid" v-loading="selectorLoading">
         <div 
           v-for="img in imageList" 
           :key="img.id" 
           class="selector-item" 
           :class="{ active: tempSelectedImageId === img.id }"
           @click="tempSelectedImageId = img.id"
          >
           <el-image :src="img.url" fit="cover" class="selector-img" />
           <div class="selector-name">{{ img.name }}</div>
         </div>
       </div>
       <div class="selector-pagination">
          <!-- 简单分页或滚动加载，这里暂略，直接展示 -->
       </div>
       <template #footer>
         <span class="dialog-footer">
           <el-button @click="selectorVisible = false">取消</el-button>
           <el-button type="primary" @click="confirmImageSelection" :disabled="!tempSelectedImageId">确定</el-button>
         </span>
       </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { Plus, Refresh, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminBannerApi, adminImageApi, type AdminBanner, type AdminImage } from '@/api/admin/media'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'

definePageMeta({
  title: '轮播图管理'
})

const loading = ref(false)
const banners = ref<AdminBanner[]>([])

const fetchData = async () => {
  loading.value = true
  const res = await adminBannerApi.getBanners()
  if (res.success) {
    banners.value = res.banners
  }
  loading.value = false
}

// Edit/Create Logic
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = reactive({
  id: '',
  image_id: '',
  title: '',
  link: '',
  sort_order: 0
})
const selectedImage = ref<AdminImage | null>(null)

const openCreateDialog = () => {
  isEdit.value = false
  form.id = ''
  form.image_id = ''
  form.title = ''
  form.link = ''
  form.sort_order = 0
  selectedImage.value = null
  dialogVisible.value = true
}

const handleEdit = (row: AdminBanner) => {
  isEdit.value = true
  form.id = row.id
  form.image_id = row.image_id
  form.title = row.title || ''
  form.link = row.link || ''
  form.sort_order = row.sort_order
  selectedImage.value = row.image || null
  dialogVisible.value = true
}

const submitForm = async () => {
  if (!form.image_id) {
    ElMessage.warning('请选择图片')
    return
  }

  if (isEdit.value) {
    const updatePayload: any = {
        title: form.title,
        link: form.link,
        sort_order: form.sort_order,
        image_id: form.image_id
    }
    
    // Call update
    const resUpdate = await adminBannerApi.updateBanner(form.id, updatePayload)
    if (resUpdate.success) {
      ElMessage.success('更新成功')
      dialogVisible.value = false
      fetchData()
    } else {
      ElMessage.error('更新失败: ' + resUpdate.error)
    }

  } else {
    const res = await adminBannerApi.createBanner({
      image_id: form.image_id,
      title: form.title,
      link: form.link,
      sort_order: form.sort_order
    })
    if (res.success) {
      ElMessage.success('创建成功')
      dialogVisible.value = false
      fetchData()
    } else {
      ElMessage.error('创建失败: ' + res.error)
    }
  }
}

const handleStatusChange = async (row: AdminBanner, isActive: boolean) => {
    const status = isActive ? 'on' : 'off'
    const res = await adminBannerApi.updateBanner(row.id, { status })
    if (res.success) {
        ElMessage.success('状态已更新')
    } else {
        ElMessage.error('更新失败')
        row.status = isActive ? 'off' : 'on' // revert
    }
}

const handleDelete = (row: AdminBanner) => {
  ElMessageBox.confirm('确认删除该轮播图吗？', '删除提示', {
    type: 'warning'
  }).then(async () => {
    const res = await adminBannerApi.deleteBanner(row.id)
    if (res.success) {
      ElMessage.success('删除成功')
      fetchData()
    } else {
      ElMessage.error('删除失败')
    }
  })
}


// Image Selector Logic
const selectorVisible = ref(false)
const selectorLoading = ref(false)
const selectorKeyword = ref('')
const imageList = ref<AdminImage[]>([])
const tempSelectedImageId = ref('')

const openImageSelector = () => {
  selectorVisible.value = true
  fetchImages()
}

const fetchImages = async () => {
  selectorLoading.value = true
  const res = await adminImageApi.getImages({ keyword: selectorKeyword.value })
  if (res.success) {
    imageList.value = res.images
  }
  selectorLoading.value = false
}

const confirmImageSelection = () => {
  const img = imageList.value.find(i => i.id === tempSelectedImageId.value)
  if (img) {
    selectedImage.value = img
    form.image_id = img.id
    selectorVisible.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.banner-page {
  padding: 0;
}
.action-bar {
    display: flex;
    gap: 10px;
}
.list-card {
    /* No margin top needed */
}
.tips {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    line-height: 1.2;
    margin-top: 5px;
}

/* Image Selector Wrapper */
.image-selector {
    width: 200px;
    height: 100px;
    border: 1px dashed var(--el-border-color);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.3s;
}
.image-selector:hover {
    border-color: var(--el-color-primary);
}
.preview-img {
    width: 100%;
    height: 100%;
}
.placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--el-text-color-secondary);
    font-size: 12px;
}

/* Selector Modal Grid */
.selector-header {
    margin-bottom: 15px;
}
.selector-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    max-height: 400px;
    overflow-y: auto;
}
.selector-item {
    border: 2px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
}
.selector-item.active {
    border-color: var(--el-color-primary);
}
.selector-img {
    width: 100%;
    height: 80px;
    display: block;
}
.selector-name {
    font-size: 12px;
    padding: 4px;
    text-align: center;
    background: #f5f7fa;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
