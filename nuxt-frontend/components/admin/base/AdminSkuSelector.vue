<template>
  <div class="admin-sku-selector">
    <div class="selector-controls">
      <!-- 1. Category Select -->
      <el-select 
        v-model="currentCategoryId" 
        placeholder="分类筛选" 
        style="width: 140px" 
        clearable
        @change="handleCategoryChange"
      >
        <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
      </el-select>
      
      <!-- 2. Product Select -->
      <el-select 
        v-model="currentProductId" 
        placeholder="选择商品" 
        style="flex: 1; margin: 0 12px" 
        filterable
        :disabled="!categories.length && !products.length"
        @change="handleProductChange"
      >
        <el-option v-for="prod in filteredProductList" :key="prod.id" :label="prod.product_name" :value="prod.id" />
      </el-select>

      <!-- 3. SKU Select (Multiple) -->
      <el-select
        v-model="currentBatchSkuIds"
        placeholder="选择 SKU (可多选)"
        style="flex: 1; max-width: 400px; margin-right: 12px"
        :loading="skuLoading"
        :disabled="!currentProductId"
        multiple
        collapse-tags
        collapse-tags-tooltip
        filterable
        @change="handleSkuSelectionChange"
        @remove-tag="handleSkuSelectionChange"
      >
         <el-option v-for="sku in currentProductSkus" :key="sku.id" :label="formatSkuName(sku)" :value="sku.id" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { adminProductApi } from '@/api/admin'

// Props
const props = defineProps<{
  modelValue: any[] // Array of SKU info objects
  categories: any[]
  products: any[]
}>()

// Emits
const emit = defineEmits(['update:modelValue'])

// State
const currentCategoryId = ref('')
const currentProductId = ref('')
const currentBatchSkuIds = ref<string[]>([]) 
const currentProductSkus = ref<any[]>([])
const skuLoading = ref(false)

// Computed
const filteredProductList = computed(() => {
  if (!currentCategoryId.value) return props.products
  return props.products.filter(p => p.category_id === currentCategoryId.value)
})

// Logic
const formatSkuName = (sku: any) => {
    let specText = ''
    if (sku.tag_name) {
        specText = sku.tag_name
    } else if (sku.spec_combination && Object.keys(sku.spec_combination).length) {
        specText = Object.entries(sku.spec_combination)
            .map(([key, val]) => `${key}:${val}`)
            .join(' | ')
    } else {
        specText = '默认规格'
    }
    const priceText = sku.price !== undefined ? ` (¥${sku.price})` : ''
    return specText + priceText
}

const handleCategoryChange = () => {
    currentProductId.value = ''
    currentBatchSkuIds.value = []
    currentProductSkus.value = []
}

const handleProductChange = async (val: string) => {
    currentBatchSkuIds.value = [] 
    currentProductSkus.value = []
    if (!val) return
    
    skuLoading.value = true
    const res = await adminProductApi.getProductWithSkus(val)
    if (res.success && res.skus) {
        currentProductSkus.value = res.skus
         // Auto-select match: Check if any of these SKUs are in the global modelValue
        const skuIdsInModel = new Set(props.modelValue.map(s => s.id))
        currentBatchSkuIds.value = res.skus
            .filter(sku => skuIdsInModel.has(sku.id))
            .map(sku => sku.id)
    }
    skuLoading.value = false
}

const handleSkuSelectionChange = () => {
    // 1. Identify SKUs from OTHER products (keep them)
    // We only know about SKUs of the *current* product.
    const currentProductSkuIds = new Set(currentProductSkus.value.map(s => s.id))
    
    // Items in modelValue that do NOT belong to the current product's loaded SKU list
    const otherProductItems = props.modelValue.filter(item => !currentProductSkuIds.has(item.id))
    
    // 2. Map current selection to New Items
    const currentProduct = props.products.find(p => p.id === currentProductId.value)
    const newItems = currentBatchSkuIds.value.map(id => {
        const sku = currentProductSkus.value.find(s => s.id === id)
        if (!sku) return null
        return {
            id: sku.id,
            productName: currentProduct?.product_name || '未知商品',
            spec: formatSkuName(sku)
        }
    }).filter(Boolean)
    
    // 3. Emit merged list
    emit('update:modelValue', [...otherProductItems, ...newItems])
}

// Watch for external removals (e.g. from the table)
watch(() => props.modelValue, (newVal) => {
    // If we are currently viewing a product
    if (currentProductSkus.value.length > 0) {
        // Update our local selection to match props
        const skuIdsInModel = new Set(newVal.map(s => s.id))
        // Intersect current product SKUs with new model value
        currentBatchSkuIds.value = currentProductSkus.value
            .filter(sku => skuIdsInModel.has(sku.id))
            .map(sku => sku.id)
    }
}, { deep: true })

</script>

<style scoped>
.selector-controls {
    display: flex;
    align-items: center;
}
</style>
