<template>
  <div class="banner-page">

    <!-- 操作栏 -->
    <AdminActionCard>
      <div class="action-bar">
        <el-button type="primary" :icon="Plus" @click="handleOpenAdd">添加轮播图</el-button>
        <el-button @click="fetchData" :icon="Refresh">刷新</el-button>
      </div>
      <div class="mt-2 text-gray-500 text-sm">
        提示：轮播图图片需从图片库中选择。如需上传新图片，请先前往「图片库」管理。
      </div>
    </AdminActionCard>

    <!-- 列表 -->
    <AdminDataTable
      :data="banners"
      :loading="loading"
      :show-pagination="false"
      class="list-card"
      row-key="id"
    >
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
          <el-button link type="primary" @click="handleOpenEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- 编辑/添加弹窗 -->
    <AdminDataDialog
      v-model="dialog.visible.value"
      :title="dialog.isEdit.value ? '编辑轮播图' : '添加轮播图'"
      :loading="dialog.loading.value"
      @confirm="dialog.submit"
    >
      <!-- ⚠️ 必须绑定 :ref="dialog.formRef" 否则 submit 内部 validate 校验不到 -->
      <el-form :model="dialog.form" :ref="dialog.formRef" label-width="80px">
        <el-form-item label="封面图片" required>
          <div class="image-selector" @click="pickerVisible = true">
            <el-image v-if="selectedImage" :src="selectedImage.url" fit="cover" class="preview-img" />
            <div v-else class="placeholder">
              <el-icon><Plus /></el-icon>
              <span>点击从图片库选择</span>
            </div>
          </div>
          <div class="tips">请先在「图片库」上传图片，再来此处选择</div>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="dialog.form.title" placeholder="可选" />
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input v-model="dialog.form.link" placeholder="可选，例如 /activity/1" />
        </el-form-item>
        <el-form-item label="排序值">
          <el-input-number v-model="dialog.form.sort_order" :min="0" />
          <div class="tips">值越小越靠前</div>
        </el-form-item>
      </el-form>
    </AdminDataDialog>

    <!-- 图片选择器（从图片库选择，无上传功能） -->
    <AdminImagePicker
      v-model="pickerVisible"
      @select="handleImageSelect"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminBannerApi, type AdminBanner, type AdminImage } from '@/api/admin/media'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import AdminDataDialog from '@/components/admin/base/AdminDataDialog.vue'
import AdminImagePicker from '@/components/admin/AdminImagePicker.vue'
import { useAdminDialog, confirmDelete } from '@/composables/admin/useAdminDialog'

definePageMeta({
  layout: 'mgmt', middleware: ['mgmt-auth'],
  title: '轮播图管理'
})

// --- State ---
const loading = ref(false)
const banners = ref<AdminBanner[]>([])
const selectedImage = ref<AdminImage | null>(null)
const pickerVisible = ref(false)

// --- Data ---
const fetchData = async () => {
  loading.value = true
  const res = await adminBannerApi.getBanners()
  if (res.success) banners.value = res.banners
  loading.value = false
}

// --- Dialog ---
const dialog = useAdminDialog({
  id: '',
  image_id: '',
  title: '',
  link: '',
  sort_order: 0
}, {
  onSubmit: async (form, isEdit) => {
    if (!form.image_id) {
      ElMessage.warning('请先选择封面图片')
      return { success: false }
    }
    if (isEdit) {
      return await adminBannerApi.updateBanner(form.id, {
        title: form.title,
        link: form.link,
        sort_order: form.sort_order,
        image_id: form.image_id
      })
    } else {
      return await adminBannerApi.createBanner({
        image_id: form.image_id,
        title: form.title,
        link: form.link,
        sort_order: form.sort_order
      })
    }
  },
  onSuccess: async () => {
    await fetchData()
    if (!dialog.visible.value) selectedImage.value = null
  }
})

// 开启「添加」时清空图片选择
const handleOpenAdd = () => {
  selectedImage.value = null
  dialog.openAdd()
}

// 开启「编辑」时回填已选图片
const handleOpenEdit = (row: AdminBanner) => {
  selectedImage.value = row.image || null
  dialog.openEdit({
    id: row.id,
    image_id: row.image_id,
    title: row.title || '',
    link: row.link || '',
    sort_order: row.sort_order
  })
}

// --- 图片选择回调 ---
const handleImageSelect = (image: AdminImage) => {
  selectedImage.value = image
  dialog.form.image_id = image.id
}

// --- Status / Delete ---
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

const handleDelete = async (row: AdminBanner) => {
  await confirmDelete(
    '确认删除该轮播图吗？',
    async () => {
      const res = await adminBannerApi.deleteBanner(row.id)
      if (res.success) await fetchData()
      return res
    }
  )
}

onMounted(() => fetchData())
</script>

<style scoped>
.banner-page { padding: 0; }
.action-bar { display: flex; gap: 10px; }
.tips {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  line-height: 1.4;
  margin-top: 5px;
}

/* 图片选择区域 */
.image-selector {
  width: 240px;
  height: 110px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: border-color 0.2s;
  background: var(--el-fill-color-extra-light);
}
.image-selector:hover { border-color: var(--el-color-primary); }

.preview-img { width: 100%; height: 100%; }

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}
.placeholder .el-icon { font-size: 24px; }
</style>
