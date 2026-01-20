<template>
  <el-dialog 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)"
    title="编辑优惠券说明" 
    width="500px"
    destroy-on-close
  >
    <el-form label-position="top">
      <el-form-item label="优惠券名称">
        <el-input :model-value="coupon?.name" disabled />
      </el-form-item>
      <el-form-item label="使用说明">
        <el-input 
          v-model="codeValue" 
          type="textarea" 
          :rows="4"
          placeholder="请输入优惠券使用说明，如：仅限新用户使用、限购1次等"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="$emit('update:modelValue', false)">取消</el-button>
      <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { adminApi } from '@/api/admin-supabase'

interface CouponItem {
  id: string
  name: string
  code?: string
}

const props = defineProps<{
  modelValue: boolean
  coupon: CouponItem | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'saved'): void
}>()

const codeValue = ref('')
const saving = ref(false)

watch(() => props.coupon, (newCoupon) => {
  codeValue.value = newCoupon?.code || ''
}, { immediate: true })

const handleSave = async () => {
  if (!props.coupon) return
  
  saving.value = true
  try {
    const res = await adminApi.coupon.updateCouponCode(props.coupon.id, codeValue.value)
    if (res.success) {
      ElMessage.success('保存成功')
      emit('update:modelValue', false)
      emit('saved')
    } else {
      ElMessage.error(res.error || '保存失败')
    }
  } catch (e) {
    ElMessage.error('保存异常')
  } finally {
    saving.value = false
  }
}
</script>
