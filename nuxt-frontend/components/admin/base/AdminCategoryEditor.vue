<template>
  <AdminDataDialog
    v-model="visible"
    :title="isEdit ? '编辑分类' : '新增分类'"
    :loading="loading"
    @confirm="handleConfirm"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <!-- 通用字段: Name -->
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" :placeholder="namePlaceholder" />
      </el-form-item>

      <!-- 特有字段: Icon & Color (供 article / faq 使用) -->
      <template v-if="showIconAndColor">
        <el-form-item label="图标" prop="icon">
          <el-input v-model="form.icon" placeholder="Emoji 或 Element 图标名" style="width: 150px;">
            <template #append>
              <span v-if="form.icon">{{ form.icon }}</span>
            </template>
          </el-input>
          <span class="text-gray-400 text-xs ml-2">推荐使用 Emoji，如 📝</span>
        </el-form-item>
        
        <el-form-item label="颜色" prop="color">
          <div class="flex items-center gap-2">
            <el-color-picker v-model="form.color" />
            <el-input v-model="form.color" style="width: 120px;" />
          </div>
        </el-form-item>
      </template>

      <!-- 通用字段: Sort Order -->
      <el-form-item label="排序" prop="sort_order">
        <el-input-number v-model="form.sort_order" :min="0" :max="999" controls-position="right" />
        <span class="text-gray-400 text-xs ml-2">数字越小越靠前</span>
      </el-form-item>

      <!-- 特有字段: Checkout Visible (供 faq 使用) -->
      <el-form-item v-if="showCheckoutVisible" label="结算页显示" prop="is_checkout_visible">
        <el-switch v-model="form.is_checkout_visible" />
        <div class="form-tip text-gray-400 text-xs mt-1 w-full">开启后，该分类下的问题将显示在结算界面。</div>
      </el-form-item>

      <!-- 通用字段: Status (不同页面绑定的 key 不同: status vs is_active) -->
      <el-form-item label="状态" prop="active_state">
        <el-switch 
           v-if="statusType === 'boolean'"
           v-model="form.active_state" 
           active-text="启用" 
           inactive-text="禁用" 
        />
        <el-radio-group v-else v-model="form.active_state">
            <el-radio value="on">启用</el-radio>
            <el-radio value="off">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </AdminDataDialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import AdminDataDialog from '@/components/admin/base/AdminDataDialog.vue'

// ==========================================
// Props & Emits
// ==========================================
const props = withDefaults(defineProps<{
  modelValue: boolean
  isEdit?: boolean
  loading?: boolean
  type?: 'basic' | 'article' | 'faq' | 'product'
  initialData?: Record<string, any>
}>(), {
  modelValue: false,
  isEdit: false,
  loading: false,
  type: 'basic',
  initialData: () => ({})
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'confirm', data: Record<string, any>): void
}>()

// ==========================================
// State
// ==========================================
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const formRef = ref<FormInstance>()
const form = reactive({
  id: '',
  name: '',
  icon: '📝',
  color: '#409EFF',
  sort_order: 10,
  active_state: true as boolean | string,
  is_checkout_visible: false
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
})

// ==========================================
// Computed Configurations
// ==========================================
const showIconAndColor = computed(() => ['article', 'faq'].includes(props.type))
const showCheckoutVisible = computed(() => props.type === 'faq')
const namePlaceholder = computed(() => {
  if (props.type === 'product') return '例如: 服饰箱包'
  if (props.type === 'faq') return '例如: 支付问题'
  return '例如: 使用攻略'
})
const statusType = computed(() => props.type === 'product' ? 'string' : 'boolean')

// ==========================================
// Watchers (Sync data when dialog opens)
// ==========================================
watch(visible, (val) => {
  if (val) {
    const d = props.initialData
    form.id = d.id || ''
    form.name = d.name || ''
    form.sort_order = typeof d.sort_order === 'number' ? d.sort_order : (d.sortOrder !== undefined ? d.sortOrder : 10)
    
    // Status mapping
    if (statusType.value === 'string') {
        form.active_state = d.status || 'on'
    } else {
        form.active_state = d.is_active !== undefined ? Boolean(d.is_active) : true
    }

    if (showIconAndColor.value) {
      form.icon = d.icon || '📝'
      form.color = d.color || '#409EFF'
    }
    
    if (showCheckoutVisible.value) {
      form.is_checkout_visible = Boolean(d.is_checkout_visible)
    }
    
    // reset validation state
    setTimeout(() => formRef.value?.clearValidate(), 0)
  }
})

// ==========================================
// Actions
// ==========================================
const handleConfirm = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (!valid) return

    // Construct unified payload payload based on component type
    const payload: Record<string, any> = {
      name: form.name.trim(),
      sort_order: form.sort_order
    }

    // Add specific fields
    if (statusType.value === 'string') {
        payload.status = form.active_state
    } else {
        payload.is_active = form.active_state
    }

    if (showIconAndColor.value) {
      payload.icon = form.icon || '📝'
      payload.color = form.color || '#409EFF'
    }

    if (showCheckoutVisible.value) {
      payload.is_checkout_visible = form.is_checkout_visible
    }

    // Include ID if editing
    if (props.isEdit) {
      payload.id = form.id
    }

    emit('confirm', payload)
  })
}
</script>

<style scoped>
.form-tip {
  line-height: 1.4;
  margin-top: 4px;
}
</style>
