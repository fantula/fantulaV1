<template>
  <div class="sku-editor">
    <!-- 规格配置区域 -->
    <div class="spec-editor">
      <div class="spec-editor-header">
        <div class="panel-title">规格配置</div>
      </div>
      
      <div class="spec-list-grid">
        <div v-for="(spec, index) in specs" :key="index" class="spec-group">
          <div class="spec-header">
            <el-input v-model="spec.name" placeholder="规格名 (如: 颜色)" style="width: 150px;" :disabled="readOnly" />
            <el-button v-if="!readOnly" type="danger" link @click="removeSpec(index)" :icon="Delete" circle />
          </div>
          <div class="spec-values">
            <el-tag 
              v-for="(val, vIndex) in spec.values" 
              :key="vIndex" 
              :closable="!readOnly"
              @close="removeSpecValue(index, vIndex)"
              class="spec-tag"
            >
              {{ val }}
            </el-tag>
            <el-input 
              v-if="spec.inputVisible"
              ref="saveTagInput"
              v-model="spec.inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter="handleInputConfirm(index)"
              @blur="handleInputConfirm(index)"
            />
            <el-button v-else-if="!readOnly" class="button-new-tag" size="small" @click="showInput(index)">+ 添加值</el-button>
          </div>
        </div>
      </div>

      <!-- 添加规格按钮 -->
      <div class="add-spec-btn-container" v-if="!readOnly">
        <div class="premium-add-btn" @click="addSpec">
          <div class="btn-icon"><Plus /></div>
          <div class="btn-text">
            <span class="t1">添加规格项目</span>
            <span class="t2">支持自定义规格名与属性值</span>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <!-- SKU 表格 -->
    <div class="sku-table-container">
      <div class="panel-title">SKU 配置</div>
      <el-table :data="skus" border style="width: 100%">
        <!-- 动态规格列 -->
        <el-table-column 
          v-for="(spec, index) in specs" 
          :key="index"
          :label="spec.name || '规格'" 
          min-width="100"
        >
          <template #default="{ row }">
            {{ row.specValues[spec.name] }}
          </template>
        </el-table-column>

        <!-- 类型选择列 -->
        <el-table-column label="类型" width="140" align="center">
          <template #default="{ row }">
            <el-select v-model="row.product_type" size="small" placeholder="选择类型" style="width: 100%;" :disabled="readOnly">
              <el-option label="虚拟充值" value="virtual" />
              <el-option label="账号合租" value="shared_account" />
              <el-option label="激活码" value="one_time_cdk" />
            </el-select>
          </template>
        </el-table-column>

        <!-- SKU 图片 -->
        <el-table-column label="SKU图片" width="100" align="center">
          <template #default="{ row }">
            <div class="sku-img-uploader small-box" @click="!readOnly && openSkuImagePicker(row)" :class="{ disabled: readOnly }">
              <img v-if="row.image" :src="row.image" class="sku-img" />
              <div v-else class="sku-upload-placeholder">
                <el-icon><Picture /></el-icon>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- 简介 -->
        <el-table-column label="简介" min-width="150" v-if="!readOnly">
          <template #default="{ row }">
            <el-input v-model="row.intro" size="small" placeholder="简短描述" />
          </template>
        </el-table-column>

        <!-- 时长 -->
        <el-table-column label="时长(天)" width="100">
          <template #default="{ row }">
            <el-input-number v-model="row.duration" size="small" :min="0" :controls="false" style="width: 100%;" :disabled="readOnly" />
          </template>
        </el-table-column>

        <!-- 售价 -->
        <el-table-column label="售价 (元)" width="140" align="center">
          <template #default="{ row }">
            <el-input-number v-model="row.price" :min="0" :precision="2" :step="1" size="small" style="width: 100%;" :controls="false" :disabled="readOnly" />
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!-- 全局图片选择器 -->
    <AdminImageSelector 
        v-model="imagePickerVisible"
        :multiple="false"
        @select="handleImageSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { Plus, Delete, Picture } from '@element-plus/icons-vue'
import AdminImageSelector from '@/components/admin/base/AdminImageSelector.vue'

// ========================================
// Props
// ========================================
interface SkuItem {
  id?: string
  key: string
  specValues: Record<string, string>
  product_type: 'virtual' | 'shared_account' | 'one_time_cdk'
  price: number
  duration: number | null
  intro: string
  image: string
  tag?: number
}

interface SpecItem {
  name: string
  values: string[]
  inputVisible: boolean
  inputValue: string
}

const props = defineProps<{
  mode: 'standalone' | 'linked'
  productId?: string
  tag?: number
  initialSpecs?: SpecItem[]
  initialSkus?: SkuItem[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:specs', specs: SpecItem[]): void
  (e: 'update:skus', skus: SkuItem[]): void
}>()

// ========================================
// State
// ========================================
const specs = ref<SpecItem[]>([])
const skus = ref<SkuItem[]>([])

// 监听初始数据变化（支持异步加载）
watch(() => props.initialSpecs, (newSpecs) => {
  console.log('[SkuEditor] initialSpecs changed:', newSpecs)
  if (newSpecs && newSpecs.length > 0) {
    specs.value = JSON.parse(JSON.stringify(newSpecs))
  }
}, { immediate: true, deep: true })

watch(() => props.initialSkus, (newSkus) => {
  console.log('[SkuEditor] initialSkus changed:', newSkus)
  if (newSkus && newSkus.length > 0) {
    skus.value = JSON.parse(JSON.stringify(newSkus))
  }
}, { immediate: true, deep: true })

// ========================================
// 规格管理
// ========================================
const addSpec = () => {
  specs.value.push({
    name: '',
    values: [],
    inputVisible: false,
    inputValue: ''
  })
}

const removeSpec = (index: number) => {
  specs.value.splice(index, 1)
  generateSKUs()
}

const removeSpecValue = (specIndex: number, valueIndex: number) => {
  specs.value[specIndex].values.splice(valueIndex, 1)
  generateSKUs()
}

const saveTagInput = ref<any[]>([])

const showInput = (index: number) => {
  specs.value[index].inputVisible = true
  nextTick(() => {
    const inputRefs = saveTagInput.value
    if (inputRefs && inputRefs[index]) {
      inputRefs[index]?.focus?.()
    }
  })
}

const handleInputConfirm = (index: number) => {
  const inputVal = specs.value[index].inputValue.trim()
  if (inputVal && !specs.value[index].values.includes(inputVal)) {
    specs.value[index].values.push(inputVal)
    generateSKUs()
  }
  specs.value[index].inputVisible = false
  specs.value[index].inputValue = ''
}

// ========================================
// SKU 生成
// ========================================
const generateSKUs = () => {
  const validSpecs = specs.value.filter(s => s.name && s.values.length > 0)
  
  if (validSpecs.length === 0) {
    skus.value = []
    emitUpdates()
    return
  }

  // 生成笛卡尔积
  const cartesian = (arrays: string[][]): string[][] => {
    if (arrays.length === 0) return [[]]
    const [first, ...rest] = arrays
    const restCartesian = cartesian(rest)
    return first.flatMap(item => restCartesian.map(r => [item, ...r]))
  }

  const specArrays = validSpecs.map(s => s.values)
  const combinations = cartesian(specArrays)

  // 保留现有 SKU 数据（按 key 匹配）
  const existingMap = new Map<string, SkuItem>()
  skus.value.forEach(sku => {
    existingMap.set(sku.key, sku)
  })

  skus.value = combinations.map(combo => {
    const specValues: Record<string, string> = {}
    validSpecs.forEach((spec, idx) => {
      specValues[spec.name] = combo[idx]
    })
    const key = combo.join('::')
    
    const existing = existingMap.get(key)
    if (existing) {
      return { ...existing, specValues }
    }

    return {
      key,
      specValues,
      product_type: 'virtual' as const,
      price: 0,
      duration: null,
      intro: '',
      image: '',
      tag: props.tag
    }
  })

  emitUpdates()
}

const emitUpdates = () => {
  emit('update:specs', specs.value)
  emit('update:skus', skus.value)
}

watch(() => specs.value, () => {
  // 不自动生成，只在值确认时生成
}, { deep: true })

// ========================================
// 图片选择
// ========================================
const imagePickerVisible = ref(false)
const currentSkuRow = ref<SkuItem | null>(null)

const openSkuImagePicker = (row: SkuItem) => {
  currentSkuRow.value = row
  imagePickerVisible.value = true
}

const handleImageSelected = (urls: string[]) => {
    if (urls.length > 0 && currentSkuRow.value) {
        currentSkuRow.value.image = urls[0]
        emitUpdates()
    }
}

// ========================================
// 公开方法
// ========================================
defineExpose({
  getSpecs: () => specs.value,
  getSkus: () => skus.value,
  setSpecs: (newSpecs: SpecItem[]) => {
    specs.value = JSON.parse(JSON.stringify(newSpecs))
  },
  setSkus: (newSkus: SkuItem[]) => {
    skus.value = JSON.parse(JSON.stringify(newSkus))
  }
})
</script>

<style scoped>
.sku-editor { width: 100%; }
.panel-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--el-text-color-primary); }
.spec-editor { margin-bottom: 20px; }
.spec-list-grid { display: flex; flex-wrap: wrap; gap: 16px; }
.spec-group { background: var(--el-fill-color-light); border-radius: 8px; padding: 12px 16px; min-width: 200px; }
.spec-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.spec-values { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.spec-tag { margin: 0; }
.input-new-tag { width: 90px; }
.button-new-tag { height: 24px; padding: 0 10px; }
.add-spec-btn-container { margin-top: 16px; }
.premium-add-btn { display: flex; align-items: center; gap: 12px; padding: 16px 20px; background: linear-gradient(135deg, rgba(64,158,255,0.08) 0%, rgba(64,158,255,0.02) 100%); border: 1px dashed var(--el-color-primary-light-5); border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.premium-add-btn:hover { background: linear-gradient(135deg, rgba(64,158,255,0.12) 0%, rgba(64,158,255,0.05) 100%); border-color: var(--el-color-primary); }
.premium-add-btn .btn-icon { width: 40px; height: 40px; border-radius: 50%; background: var(--el-color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.premium-add-btn .btn-text { display: flex; flex-direction: column; gap: 2px; }
.premium-add-btn .btn-text .t1 { font-size: 14px; font-weight: 500; color: var(--el-text-color-primary); }
.premium-add-btn .btn-text .t2 { font-size: 12px; color: var(--el-text-color-secondary); }
.sku-table-container { margin-top: 20px; }
.sku-img-uploader { width: 50px; height: 50px; border: 1px dashed var(--el-border-color); border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden; margin: 0 auto; }
.sku-img-uploader:hover { border-color: var(--el-color-primary); }
.sku-img-uploader .sku-img { width: 100%; height: 100%; object-fit: cover; }
.sku-img-uploader .sku-upload-placeholder { color: var(--el-text-color-placeholder); font-size: 16px; }
</style>
