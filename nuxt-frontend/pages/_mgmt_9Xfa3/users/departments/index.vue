<template>
  <div class="page-container">
    <PageTipHeader 
      title="部门管理" 
      description="创建和管理后台部门，配置可访问的页面权限"
    />

    <AdminActionCard>
      <template #actions>
        <el-button :icon="Refresh" @click="loadDepartments">刷新</el-button>
        <el-button type="primary" :icon="Plus" @click="openAddDept">新增部门</el-button>
      </template>
    </AdminActionCard>

    <!-- 部门管理布局 -->
    <el-card shadow="never" class="dept-manager-card">
      <div class="dept-manager">
        <div class="dept-list-pane">
          <div class="pane-header">
            <span>部门列表</span>
          </div>
          <div class="dept-list">
            <div 
              v-for="dept in departments" 
              :key="dept.id" 
              class="dept-item"
              :class="{ active: currentEditDeptId === dept.id }"
              @click="selectDeptToEdit(dept)"
            >
              <span class="dept-name">{{ dept.name }}</span>
              <el-tag size="small" effect="plain">{{ dept.user_count || 0 }} 人</el-tag>
            </div>
            <div v-if="departments.length === 0" class="empty-list">
              <el-empty description="暂无部门" :image-size="60" />
            </div>
          </div>
        </div>
        <div class="dept-config-pane">
          <div v-if="currentEditDeptObj" class="config-form">
            <el-form label-position="top" :model="currentEditDeptObj" ref="deptFormRef">
              <el-form-item label="部门名称" prop="name" :rules="[{ required: true, message: '请输入部门名称', trigger: 'blur' }]">
                <el-input v-model="currentEditDeptObj.name" />
              </el-form-item>
              <el-form-item label="权限配置 (勾选允许访问的后台页面)">
                <el-checkbox-group v-model="currentEditDeptObj.permissions" class="perm-list">
                  <el-checkbox v-for="menu in menuList" :key="menu.path" :value="menu.path">
                    {{ menu.title }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveDeptConfig" :loading="deptSaving">保存配置</el-button>
                <el-button 
                  type="danger" 
                  plain 
                  @click="handleDeleteDept"
                  :disabled="(currentEditDeptObj.user_count || 0) > 0"
                >
                  删除部门
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-else class="empty-selection">
            <el-empty description="请选择左侧部门进行配置" :image-size="80" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { adminDepartmentApi, type AdminDepartment } from '@/api/admin'

defineOptions({
  name: 'UserDepartments'
})

definePageMeta({
  title: '部门管理'
})

// 使用统一菜单配置 - 权限菜单列表
import { getPermissionMenuItems } from '@/config/admin-menu'
const menuList = getPermissionMenuItems()

// --- State ---
const departments = ref<AdminDepartment[]>([])
const currentEditDeptId = ref('')
const currentEditDeptObj = ref<AdminDepartment | null>(null)
const deptFormRef = ref<FormInstance>()
const deptSaving = ref(false)

// --- Load Data ---
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

// --- Department Logic ---
const selectDeptToEdit = (dept: AdminDepartment) => {
  currentEditDeptId.value = dept.id
  currentEditDeptObj.value = JSON.parse(JSON.stringify(dept))
}

const openAddDept = async () => {
  const result = await adminDepartmentApi.createDepartment({ name: '新部门', permissions: [] })
  if (result.success && result.department) {
    await loadDepartments()
    selectDeptToEdit(result.department)
    ElMessage.success('部门已创建')
  } else {
    ElMessage.error(result.error || '创建失败')
  }
}

const handleDeleteDept = async () => {
  if (!currentEditDeptObj.value) return
  const result = await adminDepartmentApi.deleteDepartment(currentEditDeptObj.value.id)
  if (result.success) {
    ElMessage.success('部门已删除')
    currentEditDeptId.value = ''
    currentEditDeptObj.value = null
    await loadDepartments()
  } else {
    ElMessage.error(result.error || '删除失败')
  }
}

const saveDeptConfig = async () => {
  if (!currentEditDeptObj.value) return
  deptSaving.value = true
  try {
    const result = await adminDepartmentApi.updateDepartment(currentEditDeptObj.value.id, {
      name: currentEditDeptObj.value.name,
      permissions: currentEditDeptObj.value.permissions,
    })
    if (result.success) {
      ElMessage.success('部门配置已保存')
      await loadDepartments()
    } else {
      ElMessage.error(result.error || '保存失败')
    }
  } finally {
    deptSaving.value = false
  }
}

// --- Init ---
onMounted(async () => {
  await loadDepartments()
})
</script>

<style scoped>
.dept-manager-card {
  margin-top: 16px;
}

/* Department Manager Layout */
.dept-manager {
  display: flex;
  height: 500px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.dept-list-pane {
  width: 280px;
  border-right: 1px solid var(--el-border-color);
  display: flex;
  flex-direction: column;
}

.pane-header {
  padding: 12px 16px;
  background: var(--el-fill-color-light);
  border-bottom: 1px solid var(--el-border-color);
  font-weight: 600;
  color: var(--admin-text-regular);
}

.dept-list {
  flex: 1;
  overflow-y: auto;
}

.dept-item {
  padding: 14px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.dept-item:hover { 
  background: var(--el-fill-color-light); 
}

.dept-item.active { 
  background: var(--el-color-primary-light-9); 
  color: var(--el-color-primary); 
  font-weight: 600; 
}

.dept-name { 
  flex: 1; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.dept-item.active .dept-name { 
  color: var(--el-color-primary); 
}

.dept-config-pane {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.empty-selection, .empty-list { 
  padding-top: 100px; 
  display: flex; 
  justify-content: center; 
}

.perm-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.perm-list .el-checkbox {
  width: calc(50% - 8px);
  margin: 0;
}
</style>
