<template>
  <BaseFormModal
    :visible="visible"
    title="修改昵称"
    :loading="loading"
    submit-text="确认修改"
    :submit-disabled="!canSubmit"
    @close="handleClose"
    @submit="handleConfirm"
  >
    <div class="form-group">
      <label class="form-label">新昵称</label>
      <input 
        v-model="inputValue" 
        class="form-input" 
        placeholder="请输入新的昵称"
        maxlength="20"
        @keyup.enter="handleConfirm"
      />
      <div class="form-tip">昵称支持中英文、数字，长度2-20位</div>
    </div>
  </BaseFormModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { authApi } from '@/api/client/auth'
import BaseFormModal from '@/components/pc/modal/base/BaseFormModal.vue'

const props = defineProps<{
  visible: boolean
  currentNickname?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
  (e: 'success', value: string): void
}>()

const loading = ref(false)
const inputValue = ref('')

const canSubmit = computed(() => {
  const len = inputValue.value.trim().length
  return len >= 2 && len <= 20
})

watch(() => props.visible, (val) => {
  if (val) {
    inputValue.value = props.currentNickname || ''
  }
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleConfirm = async () => {
  if (!canSubmit.value || loading.value) return
  
  const newValue = inputValue.value.trim()
  if (newValue === props.currentNickname) {
    handleClose()
    return
  }

  loading.value = true
  try {
    const res = await authApi.updateProfile({ nickname: newValue })
    if (res.success) {
      ElMessage.success('昵称修改成功')
      emit('success', newValue)
      handleClose()
    } else {
      ElMessage.error(res.msg || '修改失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '修改失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0 12px;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.form-input:focus {
  border-color: #3B82F6;
  background: rgba(59, 130, 246, 0.05);
}

.form-tip {
  font-size: 12px;
  color: #64748B;
  margin-top: 6px;
}
</style>
