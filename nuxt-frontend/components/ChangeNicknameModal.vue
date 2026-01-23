<template>
  <BaseModal
    :visible="visible"
    title="修改昵称"
    confirm-text="确认修改"
    :loading="loading"
    :confirm-disabled="!isValid"
    show-mascot
    @close="$emit('close')"
    @update:visible="$emit('update:visible', $event)"
    @confirm="handleUpdate"
  >
    <div class="form-group">
      <label class="form-label">新昵称</label>
      <input 
        v-model="newNickname" 
        type="text" 
        class="form-input" 
        placeholder="请输入新昵称"
        @keyup.enter="handleUpdate"
      />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { authApi } from '@/api/auth'
import { ElMessage } from 'element-plus'
import { CLIENT_MESSAGES } from '@/utils/clientMessages'

const props = defineProps<{
  visible?: boolean
  currentNickname: string
}>()

const emit = defineEmits(['close', 'update', 'update:visible'])

const newNickname = ref(props.currentNickname)
const loading = ref(false)

watch(() => props.visible, (val) => {
  if (val) {
    newNickname.value = props.currentNickname
  }
})

const isValid = computed(() => {
  return newNickname.value.trim().length >= 2 && 
         newNickname.value !== props.currentNickname && 
         !loading.value
})

const handleUpdate = async () => {
  if (!isValid.value) return
  
  loading.value = true
  try {
    const res = await authApi.updateProfile({ nickname: newNickname.value })
    if (res.success) {
      ElMessage.success(CLIENT_MESSAGES.NICKNAME_MODAL.SUCCESS)
      emit('update', newNickname.value)
    } else {
      ElMessage.error(res.msg || CLIENT_MESSAGES.NICKNAME_MODAL.FAIL)
    }
  } catch (e: any) {
    ElMessage.error(e.message || CLIENT_MESSAGES.NICKNAME_MODAL.FAIL)
  } finally {
    loading.value = false
  }
}
</script>
