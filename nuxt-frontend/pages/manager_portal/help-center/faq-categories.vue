<template>
  <div class="admin-page">
    <PageTipHeader title="问题分类" description="管理常见问题（FAQ）的分类结构。" />

    <AdminActionCard>
      <el-button type="primary" :icon="Plus" @click="dialog.openAdd()">新增分类</el-button>
      <el-button :icon="Sort" @click="openSortDialog">调整排序</el-button>
    </AdminActionCard>

    <AdminDataTable
      :data="categories"
      :loading="loading"
      :show-pagination="false"
      class="mt-4"
      row-key="id"
    >
        <el-table-column prop="sort_order" label="排序" width="100" align="center" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.is_active" type="success" size="small">启用</el-tag>
            <el-tag v-else type="info" size="small">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="结算页显示" width="120" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.is_checkout_visible" type="warning" size="small">显示</el-tag>
            <el-tag v-else type="info" size="small" effect="plain">隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="200">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="dialog.openEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
    </AdminDataTable>

    <!-- Dialog -->
    <AdminDataDialog
      v-model="dialog.visible.value"
      :title="dialog.isEdit.value ? '编辑分类' : '新增分类'"
      :loading="dialog.loading.value"
      @confirm="dialog.submit"
    >
      <el-form ref="formRef" :model="dialog.form" label-width="110px">
        <el-form-item label="分类名称" required>
          <el-input v-model="dialog.form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="dialog.form.sort_order" :min="0" />
        </el-form-item>
        <el-form-item label="启用状态" v-if="dialog.isEdit.value">
          <el-switch v-model="dialog.form.is_active" />
        </el-form-item>
        <el-form-item label="结算页显示">
          <el-switch v-model="dialog.form.is_checkout_visible" />
          <div class="form-tip text-gray-400 text-xs mt-1">开启后，该分类下的问题将显示在结算界面。</div>
        </el-form-item>
      </el-form>
    </AdminDataDialog>

    <!-- Sort Dialog -->
    <el-dialog
      v-model="sortDialogVisible"
      title="调整分类顺序"
      width="500px"
      append-to-body
    >
      <div class="sort-tip text-gray-400 text-sm mb-2">
        提示：拖拽列表项进行排序，点击保存后生效。
      </div>
      <div class="sort-container">
         <draggable 
           v-model="sortList" 
           item-key="id"
           animation="200"
           handle=".drag-handle"
           ghost-class="ghost-item"
         >
            <template #item="{ element, index }">
               <div class="sort-item">
                  <div class="drag-handle">
                    <el-icon><Sort /></el-icon>
                  </div>
                  <div class="sort-content">
                     <span class="sort-name">{{ element.name }}</span>
                     <el-tag size="small" type="info">{{ index * 10 }}</el-tag>
                  </div>
               </div>
            </template>
         </draggable>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="sortDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveSort" :loading="savingSort">保存排序</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Sort } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import draggable from 'vuedraggable'
import { adminFaqApi } from '@/api/admin/help-center'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import AdminDataDialog from '@/components/admin/base/AdminDataDialog.vue'
import { useAdminDialog, confirmDelete } from '@/composables/admin/useAdminDialog'
import { useBizFormat } from '@/composables/admin/useBizFormat'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

interface AdminFaqCategory {
  id: string
  name: string
  sort_order: number
  is_active: boolean
  is_checkout_visible: boolean
  created_at: string
}

const loading = ref(false)
const categories = ref<AdminFaqCategory[]>([])
const { formatDate } = useBizFormat()
const sortDialogVisible = ref(false)
const sortList = ref<AdminFaqCategory[]>([])
const savingSort = ref(false)

const fetchCategories = async () => {
  loading.value = true
  const res = await adminFaqApi.getCategories()
  if (res.success) {
    categories.value = res.categories || []
  }
  loading.value = false
}

// Dialog Logic
const dialog = useAdminDialog({
  id: '',
  name: '',
  sort_order: 0,
  is_active: true,
  is_checkout_visible: false
}, {
  onSubmit: async (form, isEdit) => {
    if (!form.name) {
       ElMessage.warning('请输入分类名称')
       return { success: false }
    }
  
    let res
    if (isEdit) {
      res = await adminFaqApi.updateCategory(form.id, {
        name: form.name,
        sort_order: form.sort_order,
        is_active: form.is_active,
        is_checkout_visible: form.is_checkout_visible
      })
    } else {
      res = await adminFaqApi.createCategory({
        name: form.name,
        sort_order: form.sort_order,
        is_checkout_visible: form.is_checkout_visible
      })
    }

    if (res.error) {
        return { success: false, error: (res.error as any).message || String(res.error) }
    }
    return { success: true }
  },
  onSuccess: async () => {
     await fetchCategories()
     ElMessage.success(dialog.isEdit.value ? '更新成功' : '创建成功')
  }
})

// Bind formRef to the dialog's reference
const formRef = dialog.formRef

const handleDelete = async (row: AdminFaqCategory) => {
  await confirmDelete(
      '确定要删除此分类吗？',
      async () => {
          const res = await adminFaqApi.deleteCategory(row.id)
          if (res.error) {
              throw new Error((res.error as any).message || String(res.error))
          }
          await fetchCategories()
          return { success: true }
      }
  )
}

// Sorting Logic
const openSortDialog = () => {
  sortList.value = JSON.parse(JSON.stringify(categories.value))
  sortDialogVisible.value = true
}

const saveSort = async () => {
  savingSort.value = true
  try {
    const updates = sortList.value.map((item, index) => {
      const newOrder = index * 10
      if (item.sort_order !== newOrder) {
          return adminFaqApi.updateCategory(item.id, { sort_order: newOrder })
      }
      return null
    }).filter(p => p !== null)

    if (updates.length > 0) {
      await Promise.all(updates)
      ElMessage.success(`已更新 ${updates.length} 个分类的顺序`)
    } else {
      ElMessage.info('顺序未发生变化')
    }
    
    sortDialogVisible.value = false
    fetchCategories()
  } catch (e: any) {
    ElMessage.error('排序保存失败: ' + e.message)
  } finally {
    savingSort.value = false
  }
}

onMounted(fetchCategories)
</script>

<style scoped>
.admin-page {
  padding: 0;
}
.sort-container {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
}
.sort-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: white;
  border-bottom: 1px solid var(--el-border-color-lighter);
}
.sort-item:last-child {
  border-bottom: none;
}
.drag-handle {
  cursor: move;
  color: var(--el-text-color-secondary);
  margin-right: 12px;
  display: flex;
  align-items: center;
}
.sort-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sort-name {
  font-weight: 500;
}
.ghost-item {
  background: var(--el-color-primary-light-9);
  opacity: 0.5;
}
</style>
