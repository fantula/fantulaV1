<template>
  <div class="spec-editor">
    <div class="spec-editor-header">
      <div class="panel-title">规格配置</div>
    </div>
    
    <div class="spec-list-grid">
      <div v-for="(spec, index) in modelValue" :key="index" class="spec-group">
        <div class="spec-header">
          <el-input v-model="spec.name" placeholder="规格名 (如: 颜色)" style="width: 150px;" />
          <el-button type="danger" link @click="removeSpec(index)" :icon="Delete" circle />
        </div>
        <div class="spec-values">
          <el-tag 
            v-for="(val, vIndex) in spec.values" 
            :key="vIndex" 
            closable 
            @close="removeSpecValue(index, vIndex)"
            class="spec-tag"
          >
            {{ val }}
          </el-tag>
          <el-input 
            v-if="spec.inputVisible"
            :ref="(el) => setInputRef(index, el)"
            v-model="spec.inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter="handleInputConfirm(index)"
            @blur="handleInputConfirm(index)"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ 添加值</el-button>
        </div>
      </div>
    </div>

    <!-- Add Spec Button -->
    <div class="add-spec-btn-container">
      <div class="premium-add-btn" @click="addSpec">
        <div class="btn-icon"><Plus /></div>
        <div class="btn-text">
          <span class="t1">添加规格项目</span>
          <span class="t2">支持自定义规格名与属性值</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'

export interface Spec {
  name: string
  values: string[]
  inputVisible: boolean
  inputValue: string
}

const props = defineProps<{
  modelValue: Spec[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Spec[]): void
}>()

// Input refs
const inputRefs: Record<number, any> = {}
const setInputRef = (index: number, el: any) => {
  if (el) inputRefs[index] = el
}

const addSpec = () => {
  const newSpecs = [...props.modelValue, { name: '', values: [], inputVisible: false, inputValue: '' }]
  emit('update:modelValue', newSpecs)
}

const removeSpec = (index: number) => {
  const newSpecs = [...props.modelValue]
  newSpecs.splice(index, 1)
  emit('update:modelValue', newSpecs)
}

const showInput = (index: number) => {
  const newSpecs = [...props.modelValue]
  newSpecs[index] = { ...newSpecs[index], inputVisible: true }
  emit('update:modelValue', newSpecs)
  nextTick(() => {
    inputRefs[index]?.focus?.()
  })
}

const handleInputConfirm = (index: number) => {
  const newSpecs = [...props.modelValue]
  const spec = newSpecs[index]
  if (spec.inputValue && !spec.values.includes(spec.inputValue)) {
    spec.values = [...spec.values, spec.inputValue]
  }
  spec.inputVisible = false
  spec.inputValue = ''
  emit('update:modelValue', newSpecs)
}

const removeSpecValue = (specIndex: number, valIndex: number) => {
  const newSpecs = [...props.modelValue]
  newSpecs[specIndex].values = newSpecs[specIndex].values.filter((_, i) => i !== valIndex)
  emit('update:modelValue', newSpecs)
}
</script>

<style scoped>
.spec-editor { margin-bottom: 30px; }

.spec-editor-header { margin-bottom: 16px; }

.panel-title {
  font-size: 16px; 
  margin-bottom: 16px;
  border-left: 4px solid #409EFF;
  padding-left: 12px;
  font-weight: 600;
  color: #303133;
}

.spec-list-grid { 
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 24px; 
}
@media (max-width: 1100px) {
  .spec-list-grid { grid-template-columns: 1fr; }
}

.spec-group { 
  background: #ffffff; 
  padding: 20px; 
  border-radius: 8px; 
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
  transition: all 0.3s;
}
.spec-group:hover { 
  box-shadow: 0 4px 15px rgba(0,0,0,0.06); 
  border-color: #dcdfe6;
}

.spec-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 16px; 
}

.spec-values { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 10px; 
  align-items: center; 
}

.spec-tag { height: 32px; line-height: 30px; font-size: 13px; }
.input-new-tag { width: 100px; }
.button-new-tag { height: 32px; padding: 0 15px; }

.add-spec-btn-container {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.premium-add-btn {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px dashed #409EFF;
  padding: 16px 32px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  gap: 20px;
  color: #409EFF;
}

.premium-add-btn:hover {
  background: #f0f9ff;
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 20px rgba(64,158,255,0.15);
}

.btn-icon {
  width: 44px;
  height: 44px;
  background: #ecf5ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.btn-text { display: flex; flex-direction: column; }
.btn-text .t1 { font-size: 16px; font-weight: 700; }
.btn-text .t2 { font-size: 12px; opacity: 0.7; }
</style>
