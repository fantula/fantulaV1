<template>
  <div class="tag-input-group">
    <el-tag
      v-for="tag in modelValue"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleRemove(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="inputRef"
      v-model="inputValue"
      class="input-new-tag"
      :size="size"
      :placeholder="placeholder"
      @keyup.enter="handleConfirm"
      @blur="handleConfirm"
    />
    <el-button v-else :size="size" @click="showInput">
      {{ addButtonText }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string[]
  placeholder?: string
  addButtonText?: string
  size?: 'large' | 'default' | 'small'
}>(), {
  placeholder: '输入标签',
  addButtonText: '+ 新标签',
  size: 'small'
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string[]): void
}>()

const inputVisible = ref(false)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement>()

const handleRemove = (tag: string) => {
  const newTags = props.modelValue.filter(t => t !== tag)
  emit('update:modelValue', newTags)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => inputRef.value?.focus())
}

const handleConfirm = () => {
  if (inputValue.value && !props.modelValue.includes(inputValue.value)) {
    emit('update:modelValue', [...props.modelValue, inputValue.value])
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style scoped>
.tag-input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.input-new-tag {
  width: 90px;
}
</style>
