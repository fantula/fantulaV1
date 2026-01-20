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

    <div v-if="initLoading" class="skeleton-container">
      <el-skeleton animated :rows="10" />
    </div>

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
          <el-tag v-if="row.department" :type="row.department?.name === '超级管理员' ? 'danger' : ''">
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
    <el-dialog v-model="userDialogVisible" :title="isEditUser ? '编辑用户' : '新增用户'" width="500px" @closed="resetUserForm">
      <el-form :model="userForm" :rules="userRules" ref="userFormRef" label-width="80px">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="绑定邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱地址" :disabled="isEditUser" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEditUser">
          <el-input v-model="userForm.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="所属部门" prop="department_id">
          <el-select v-model="userForm.department_id" placeholder="请选择部门" style="width: 100%;">
            <el-option v-for="dept in departments" :key="dept.id" :label="dept.name" :value="dept.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userForm.status">
            <el-radio value="enabled">启用</el-radio>
            <el-radio value="disabled">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitUserForm" :loading="submitting">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { adminBackendUserApi, adminDepartmentApi, type AdminBackendUser, type AdminDepartment } from '@/api/admin'
import { useBizFormat } from '@/composables/common/useBizFormat'

defineOptions({
  name: 'UserAccounts'
})

definePageMeta({
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

// Dialogs
const userDialogVisible = ref(false)
const isEditUser = ref(false)

// User Form
const userFormRef = ref<FormInstance>()
const userForm = reactive({
  id: '',
  name: '',
  email: '',
  password: '',
  department_id: '',
  status: 'enabled' as 'enabled' | 'disabled'
})

const userRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }, 
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  department_id: [{ required: true, message: '请选择部门', trigger: 'change' }]
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
const openAddUserDialog = () => {
  isEditUser.value = false
  userForm.id = ''
  userForm.name = ''
  userForm.email = ''
  userForm.password = ''
  userForm.department_id = ''
  userForm.status = 'enabled'
  userDialogVisible.value = true
}

const openEditUserDialog = (row: AdminBackendUser) => {
  isEditUser.value = true
  userForm.id = row.id
  userForm.name = row.name
  userForm.email = row.email
  userForm.password = ''
  userForm.department_id = row.department_id || ''
  userForm.status = row.status
  userDialogVisible.value = true
}

const submitUserForm = async () => {
  if (!userFormRef.value) return
  
  // 编辑模式下密码不是必填
  if (isEditUser.value) {
    userRules.password = []
  } else {
    userRules.password = [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }
  
  const valid = await userFormRef.value.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  try {
    if (isEditUser.value) {
      const result = await adminBackendUserApi.updateUser(userForm.id, {
        name: userForm.name,
        department_id: userForm.department_id,
        status: userForm.status,
      })
      if (result.success) {
        ElMessage.success('更新成功')
        userDialogVisible.value = false
        await loadUsers()
      } else {
        ElMessage.error(result.error || '更新失败')
      }
    } else {
      const result = await adminBackendUserApi.createUser({
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        department_id: userForm.department_id,
        status: userForm.status,
      })
      if (result.success) {
        ElMessage.success('添加成功')
        userDialogVisible.value = false
        await loadUsers()
      } else {
        ElMessage.error(result.error || '添加失败')
      }
    }
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    submitting.value = false
  }
}

const resetUserForm = () => {
  if (userFormRef.value) userFormRef.value.resetFields()
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
