<template>
  <el-dialog 
    v-model="visible" 
    title="分类管理" 
    width="500px" 
    append-to-body 
    :z-index="2000"
    @open="fetchCategories"
  >
     <div class="cat-manager">
       <div class="add-cat-row">
         <el-input v-model="newCatName" placeholder="新分类名称" style="margin-right: 10px;" />
         <el-button type="primary" @click="handleAdd" :loading="loading">添加分类</el-button>
       </div>
       <el-divider />
       <div class="cat-list" v-loading="loading">
         <div v-for="cat in categories" :key="cat.id" class="cat-item">
           <span>{{ cat.name }}</span>
           <el-button link type="danger" size="small" @click="handleDelete(cat)">删除</el-button>
         </div>
       </div>
     </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminImageCategoryApi, type AdminImageCategory } from '@/api/admin/media'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const loading = ref(false)
const categories = ref<AdminImageCategory[]>([])
const newCatName = ref('')

const fetchCategories = async () => {
  loading.value = true
  const res = await adminImageCategoryApi.getCategories()
  if (res.success) {
    categories.value = res.categories
  }
  loading.value = false
}

const handleAdd = async () => {
  if (!newCatName.value.trim()) {
      ElMessage.warning('请输入分类名称')
      return
  }
  loading.value = true
  const res = await adminImageCategoryApi.createCategory(newCatName.value)
  if (res.success) {
     ElMessage.success('分类添加成功')
     newCatName.value = ''
     await fetchCategories()
     emit('change')
  } else {
     ElMessage.error('添加失败: ' + res.error)
  }
  loading.value = false
}

const handleDelete = (cat: AdminImageCategory) => {
  ElMessageBox.confirm(`确认删除分类 "${cat.name}" 吗？`, '删除分类', {
    type: 'warning'
  }).then(async () => {
    loading.value = true
    const res = await adminImageCategoryApi.deleteCategory(cat.id)
    if (res.success) {
      ElMessage.success('分类删除成功')
      await fetchCategories()
      emit('change')
    } else {
      ElMessage.error('删除失败: ' + res.error)
    }
    loading.value = false
  })
}
</script>

<style scoped>
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
</style>
