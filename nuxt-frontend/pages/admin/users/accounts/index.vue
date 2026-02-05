<template>
  <div class="page-container">
    <PageTipHeader 
      title="用户管理" 
      description="管理后台管理员账号，分配部门与权限"
    />

    <AdminActionCard>
      <template #actions>
        <el-button :icon="Refresh" @click="loadUsers">刷新</el-button>
        <el-button type="primary" :icon="Plus" @click="openAddUserDialog">新增用户</el-button>
      </template>
    </AdminActionCard>

    <AdminPageSkeleton v-if="initLoading" type="list" />

    <AdminDataTable
      v-else
      :loading="loading"
      :data="users"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="用户名称" min-width="150" />
      <el-table-column prop="email" label="绑定邮箱" min-width="200" show-overflow-tooltip />
      <el-table-column label="所属部门" width="180" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.department" :type="row.department?.name === '超级管理员' ? 'danger' : undefined">
            {{ row.department?.name || '无部门' }}
          </el-tag>
          <span v-else class="text-gray">无部门</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template #default="{ row }">
          <el-switch 
            v-model="row.status" 
            active-value="enabled"
            inactive-value="disabled"
            :loading="row.statusLoading"
            @change="handleUserStatusChange(row)" 
          />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template #default="{ row }">
          <el-button link type="primary" @click="openEditUserDialog(row)">编辑</el-button>
          <el-popconfirm 
            :title="`确认删除用户 '${row.name}' 吗？`"
            @confirm="handleDeleteUser(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- 用户新增/编辑弹窗 -->
    <!-- 用户新增/编辑弹窗 -->
    <AdminDataDialog
      v-model="dialog.visible.value"
      :title="dialog.isEdit.value ? '编辑用户' : '新增用户'"
      :loading="dialog.loading.value"
      @confirm="dialog.submit"
    >
      <el-form :model="dialog.form" :rules="userRules" :ref="dialog.formRef" label-width="80px">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="dialog.form.name" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="绑定邮箱" prop="email">
          <el-input v-model="dialog.form.email" placeholder="请输入邮箱地址" :disabled="dialog.isEdit.value" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!dialog.isEdit.value">
          <el-input v-model="dialog.form.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="所属部门" prop="department_id">
          <el-select v-model="dialog.form.department_id" placeholder="请选择部门" style="width: 100%;">
            <el-option v-for="dept in departments" :key="dept.id" :label="dept.name" :value="dept.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dialog.form.status">
            <el-radio value="enabled">启用</el-radio>
            <el-radio value="disabled">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </AdminDataDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { adminBackendUserApi, adminDepartmentApi, type AdminBackendUser, type AdminDepartment } from '@/api/admin'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { useAdminDialog } from '@/composables/admin/useAdminDialog'

defineOptions({
  name: 'UserAccounts'
})

definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"],
  title: '用户管理'
})

const { formatDate } = useBizFormat()

// --- State ---
const initLoading = ref(true)
const loading = ref(false)
const submitting = ref(false)

const users = ref<(AdminBackendUser & { statusLoading?: boolean })[]>([])
const departments = ref<AdminDepartment[]>([])
const selectedIds = ref<string[]>([])

const userRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }, 
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  department_id: [{ required: true, message: '请选择部门', trigger: 'change' }]
})

// Dialog
const dialog = useAdminDialog({
  id: '',
  name: '',
  email: '',
  password: '',
  department_id: '',
  status: 'enabled' as 'enabled' | 'disabled'
}, {
  onSubmit: async (form, isEdit) => {
    // 密码字段处理：编辑模式下若为空则不提交
    const payload = { ...form }
    if (isEdit) {
       // @ts-ignore
       if (!payload.password) delete payload.password
       return await adminBackendUserApi.updateUser(form.id, payload)
    } else {
       return await adminBackendUserApi.createUser(payload)
    }
  },
  onSuccess: async () => {
    await loadUsers()
  }
})

// --- Load Data ---
const loadUsers = async () => {
  loading.value = true
  try {
    const result = await adminBackendUserApi.getUsers()
    if (result.success) {
      users.value = result.users
    }
  } catch (e: any) {
    ElMessage.error(e.message || '加载用户失败')
  } finally {
    loading.value = false
    initLoading.value = false
  }
}

const loadDepartments = async () => {
  try {
    const result = await adminDepartmentApi.getDepartments()
    if (result.success) {
      departments.value = result.departments
    }
  } catch (e: any) {
    ElMessage.error(e.message || '加载部门失败')
  }
}

// --- Selection ---
const handleSelectionChange = (rows: AdminBackendUser[]) => {
  selectedIds.value = rows.map(r => r.id)
}

// --- User Logic ---
// --- User Logic ---
const openAddUserDialog = async () => {
  userRules.password = [{ required: true, message: '请输入密码', trigger: 'blur' }]
  dialog.openAdd()
  // 刷新部门列表以获取最新数据
  await loadDepartments()
}


const openEditUserDialog = (row: AdminBackendUser) => {
  userRules.password = []
  dialog.openEdit({ 
      ...row, 
      password: '', // 清空密码字段
      department_id: row.department_id || '' 
  })
}

const handleUserStatusChange = async (row: AdminBackendUser & { statusLoading?: boolean }) => {
  row.statusLoading = true
  try {
    const result = await adminBackendUserApi.updateUser(row.id, { status: row.status })
    if (result.success) {
      ElMessage.success(row.status === 'enabled' ? '用户已启用' : '用户已停用')
    } else {
      row.status = row.status === 'enabled' ? 'disabled' : 'enabled'
      ElMessage.error(result.error || '操作失败')
    }
  } catch (e: any) {
    row.status = row.status === 'enabled' ? 'disabled' : 'enabled'
    ElMessage.error(e.message || '操作失败')
  } finally {
    row.statusLoading = false
  }
}

const handleDeleteUser = async (row: AdminBackendUser) => {
  const result = await adminBackendUserApi.deleteUser(row.id)
  if (result.success) {
    ElMessage.success('删除成功')
    await loadUsers()
  } else {
    ElMessage.error(result.error || '删除失败')
  }
}

// --- Init ---
onMounted(async () => {
  await loadDepartments()
  await loadUsers()
})
</script>

<style scoped>
.text-gray { 
  color: var(--admin-text-secondary); 
}

.skeleton-container {
  padding: 24px;
  background: #fff;
  border-radius: 4px;
}
</style>
