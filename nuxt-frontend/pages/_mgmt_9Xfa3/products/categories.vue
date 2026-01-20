<template>
  <div class="category-page">
     <PageTipHeader title="拖拽表格行可调整分类排序" type="info" />

     <!-- Action Bar -->
     <AdminActionCard>
        <template #actions>
           <el-button @click="loadCategories" :icon="Refresh">刷新</el-button>
           <el-button type="primary" :icon="Plus" @click="openAddDialog">添加商品分类</el-button>
        </template>
     </AdminActionCard>

     <!-- Data Table -->
     <AdminDataTable 
        ref="adminTableRef"
        :data="categories" 
        :loading="loading"
        row-key="id"
     >
        <el-table-column width="60" align="center">
           <template #header><el-icon><Rank /></el-icon></template>
           <template #default>
              <div class="drag-handle"><el-icon><Rank /></el-icon></div>
           </template>
        </el-table-column>

        <el-table-column prop="name" label="分类名称" min-width="200" />
        <el-table-column label="排序" width="80" align="center">
           <template #default="{ $index }"><el-tag type="info" effect="plain" size="small">{{ $index + 1 }}</el-tag></template>
        </el-table-column>
        <el-table-column label="商品数" width="100" align="center">
           <template #default="{ row }"><el-tag effect="plain">{{ row.product_count || 0 }}</el-tag></template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
           <template #default="{ row }">
               <el-switch 
                  v-model="row.status" 
                  active-value="on" 
                  inactive-value="off" 
                  :loading="row.statusLoading"
                  @change="handleStatusChange(row)" 
               />
           </template>
        </el-table-column>
        <el-table-column label="创建时间" width="170" align="center">
           <template #default="{ row }">{{ new Date(row.created_at).toLocaleString('zh-CN') }}</template>
        </el-table-column>
        
        <el-table-column label="操作" width="150" fixed="right" align="center">
           <template #default="{ row }">
              <el-button link type="primary" @click="openEditDialog(row)">编辑</el-button>
              <el-button link type="danger" @click="confirmDelete(row)">删除</el-button>
           </template>
        </el-table-column>
     </AdminDataTable>
     
     <!-- Add/Edit Dialog -->
     <AdminDataDialog
        v-model="dialogVisible"
        :title="isEdit ? '编辑分类' : '添加分类'"
        :loading="submitting"
        @confirm="submitForm"
        @closed="resetForm"
     >
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
           <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入分类名称" />
           </el-form-item>
           <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                 <el-radio value="on">启用</el-radio>
                 <el-radio value="off">停用</el-radio>
              </el-radio-group>
           </el-form-item>
        </el-form>
     </AdminDataDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { Plus, Rank, Refresh } from '@element-plus/icons-vue'
import { adminCategoryApi, type ProductCategory } from '@/api/admin-supabase'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import Sortable from 'sortablejs'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import AdminDataDialog from '@/components/admin/base/AdminDataDialog.vue'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'

definePageMeta({ title: '商品分类管理' })

const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()
const adminTableRef = ref() // Ref to AdminDataTable component
const categories = ref<any[]>([])

const form = reactive({ id: '', name: '', status: 'on' as 'on' | 'off' })
const rules = reactive({ name: [{ required: true, message: '请输入名称', trigger: 'blur' }] })

// Logic
const loadCategories = async () => {
    loading.value = true
    try {
        const res = await adminCategoryApi.getCategories()
        if(res.success) {
            categories.value = res.categories
            nextTick(initSortable)
        }
    } finally { loading.value = false }
}

const initSortable = () => {
    // Find tbody inside AdminDataTable -> el-table
    // AdminDataTable root is div.admin-data-table
    // el-table is inside .table-container
    const el = adminTableRef.value?.$el
    if(!el) return
    const tbody = el.querySelector('.el-table__body-wrapper tbody')
    if(tbody) {
        Sortable.create(tbody, {
            handle: '.drag-handle',
            animation: 200,
            ghostClass: 'sortable-ghost',
            onEnd: async (evt: any) => {
                const { oldIndex, newIndex } = evt
                if(oldIndex === newIndex) return
                const moved = categories.value.splice(oldIndex, 1)[0]
                categories.value.splice(newIndex, 0, moved)
                await saveSortOrder()
            }
        })
    }
}

const saveSortOrder = async () => {
    const items = categories.value.map((c, i) => ({ id: c.id, sort_order: i }))
    const res = await adminCategoryApi.batchUpdateSort(items)
    if(res.success) ElMessage.success('排序已更新')
    else { ElMessage.error('排序更新失败'); loadCategories() }
}

// Dialog Actions
const openAddDialog = () => { isEdit.value = false; form.name=''; form.status='on'; dialogVisible.value = true }
const openEditDialog = (row: any) => { isEdit.value = true; form.id=row.id; form.name=row.name; form.status=row.status; dialogVisible.value=true }

const submitForm = async () => {
    if(!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if(!valid) return
        submitting.value = true
        try {
            const api = isEdit.value ? adminCategoryApi.updateCategory : adminCategoryApi.createCategory
            const payload: any = { name: form.name, status: form.status }
            if(!isEdit.value) payload.sort_order = categories.value.length
            
            const arg = isEdit.value ? form.id : payload
            const res = await (isEdit.value ? api(form.id, payload) : api(payload))
            
            if(res.success) {
                ElMessage.success(isEdit.value ? '更新成功' : '添加成功')
                dialogVisible.value = false
                loadCategories()
            } else ElMessage.error(res.error)
        } finally { submitting.value = false }
    })
}

const resetForm = () => formRef.value?.resetFields()

const handleStatusChange = async (row: any) => {
    row.statusLoading = true
    try {
        const res = await adminCategoryApi.updateCategory(row.id, { status: row.status })
        if(res.success) ElMessage.success(row.status === 'on' ? '启用成功' : '停用成功')
        else { row.status = row.status === 'on' ? 'off' : 'on'; ElMessage.error(res.error) }
    } catch { row.status = row.status === 'on' ? 'off' : 'on' } finally { row.statusLoading = false }
}

const confirmDelete = (row: any) => {
    if(row.product_count > 0) return ElMessageBox.alert(`分类下有 ${row.product_count} 商品，无法删除`, '提示')
    ElMessageBox.confirm(`确认删除分类 "${row.name}"?`, '警告', { type: 'warning' }).then(async ()=> {
        const res = await adminCategoryApi.deleteCategory(row.id)
        if(res.success) { ElMessage.success('删除成功'); loadCategories() }
        else ElMessage.error(res.error)
    })
}

onMounted(loadCategories)
</script>

<style scoped>
.drag-handle { cursor: grab; padding: 5px; color: #ccc; display: flex; justify-content: center; }
.drag-handle:hover { color: var(--el-color-primary); }
:deep(.sortable-ghost) { opacity: 0.4; background: #ecf5ff !important; }
:deep(.sortable-ghost td) { background: #ecf5ff !important; }
</style>
