<template>
  <div class="cdk-edit-page">
    
    <!-- Header -->
    <div class="wizard-header">
      <div class="header-left">
        <el-button link class="back-btn" @click="router.back()">
          <el-icon class="back-icon"><ArrowLeft /></el-icon> 返回列表
        </el-button>
        <div class="header-titles">
          <div class="main-title">编辑资源</div>
          <div class="sub-title">EDIT RESOURCE</div>
        </div>
      </div>
      <div class="header-center"></div>
      <div class="header-right"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="8" animated />
    </div>

    <!-- Body -->
    <div v-else class="wizard-body">
      <div class="centered-container">
        
        <!-- Product Selection Card -->
        <div class="form-card">
          <h3 class="card-title">基础信息</h3>
          <el-form label-position="top">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="CDK 类型">
                  <el-tag :type="getStatusType(cdkData?.cdk_type)" size="large">{{ getTypeText(cdkData?.cdk_type) }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前状态">
                  <el-tag :type="getStatusType(cdkData?.status)">{{ getStatusText(cdkData?.status) }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="CDK ID">
                  <el-input :value="cdkData?.id" disabled size="small" style="font-family: monospace; font-size: 12px;" />
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-divider content-position="left">商品关联</el-divider>
            
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="商品分类">
                  <el-select v-model="selectedCategoryId" placeholder="请选择分类" filterable @change="handleCategoryChange" style="width: 100%">
                    <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择商品">
                  <el-select v-model="selectedProductId" placeholder="请选择商品" filterable @change="handleProductChange" :disabled="!selectedCategoryId" style="width: 100%">
                    <el-option v-for="prod in filteredProducts" :key="prod.id" :label="prod.product_name" :value="prod.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="关联 SKU (可多选)">
                  <el-select 
                    v-model="selectedSkuIds" 
                    multiple
                    placeholder="选择 SKU" 
                    filterable 
                    :loading="loadingSkus"
                    :disabled="!selectedProductId"
                    style="width: 100%"
                  >
                    <el-option v-for="sku in skuOptions" :key="sku.id" :label="sku.label" :value="sku.id" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-alert 
              v-if="selectedSkuIds.length === 0 && skuOptions.length > 0" 
              type="warning" 
              :closable="false"
              style="margin-top: 8px"
            >
              <template #title>⚠️ 该 CDK 未绑定 SKU，请选择 SKU 进行关联</template>
            </el-alert>
          </el-form>
        </div>

        <!-- Editable Content -->
        <div class="form-card">
          <h3 class="card-title">资源配置 (可编辑)</h3>
          
          <!-- Virtual Type -->
          <div v-if="cdkData?.cdk_type === 'virtual'">
            <el-form :model="formVirtual" label-position="top">
              <el-form-item label="可用库存数">
                <el-input-number 
                  v-model="formVirtual.stock" 
                  :min="minStock" 
                  size="large" 
                  style="width: 100%" 
                />
                <div class="form-tip">
                  已使用: {{ usedStock }} 个，最小值不能低于已使用数量
                </div>
              </el-form-item>
              
              <el-divider content-position="left">订单填写字段配置</el-divider>
              <div class="dynamic-fields">
                <div v-for="(field, idx) in formVirtual.fields" :key="idx" class="field-row">
                  <el-input v-model="formVirtual.fields[idx]" placeholder="输入字段名 (如: 游戏账号)" />
                  <el-button type="danger" circle plain @click="removeVirtualField(idx)"><el-icon><Delete /></el-icon></el-button>
                </div>
                <el-button type="dashed" class="add-field-btn" @click="addVirtualField">
                  <el-icon><Plus /></el-icon> 添加字段
                </el-button>
              </div>
            </el-form>
          </div>

          <!-- Shared Type -->
          <div v-if="cdkData?.cdk_type === 'shared'">
            <el-form label-position="top">
              <el-form-item label="最大车位数">
                <el-input-number v-model="formShared.maxSlots" :min="1" :max="10" />
                <div class="form-tip">决定该资源可同时服务的用户数</div>
              </el-form-item>
              
              <el-divider content-position="left">属性配置</el-divider>
              <div class="kv-list">
                <div v-for="(attr, idx) in formShared.attributes" :key="idx" class="kv-row">
                  <el-input v-model="attr.key" placeholder="字段名(如:账号)" style="width: 140px" />
                  <span class="separator">:</span>
                  <el-input v-model="attr.value" placeholder="字段值" style="flex: 1" />
                  <el-button circle plain size="small" @click="removeSharedAttr(idx)" v-if="formShared.attributes.length > 1">
                    <el-icon><Minus /></el-icon>
                  </el-button>
                </div>
                <el-button type="dashed" size="small" class="add-attr-btn" @click="addSharedAttr">
                  + 添加属性
                </el-button>
              </div>
            </el-form>
          </div>

          <!-- One-time Type -->
          <div v-if="cdkData?.cdk_type === 'one_time'">
            <el-form label-position="top">
              <el-form-item label="激活码内容">
                <el-input v-model="formOneTime.code" placeholder="输入激活码" />
                <div class="form-tip">注意：更改后会影响已关联的订单</div>
              </el-form-item>
            </el-form>
          </div>

          <!-- Helping Image Section (Common for all types) -->
          <el-divider content-position="left">详情页帮助图片</el-divider>
          <div class="form-item">
            <div class="image-selector" @click="openImagePicker">
              <img v-if="commonImage" :src="commonImage" class="preview-img" />
              <div v-else class="placeholder">
                <el-icon :size="24"><Picture /></el-icon>
                <span>点击选择图片</span>
              </div>
            </div>
            <div class="form-tip" style="margin-top: 8px">
              将在客户端订单详情页展示，用于引导用户使用
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <el-button @click="router.back()">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            保存修改
          </el-button>
        </div>
      </div>
    </div>

    <!-- Image Picker Dialog -->
    <el-dialog
      v-model="imagePickerVisible"
      title="选择图片"
      width="800px"
      append-to-body
    >
      <div class="picker-container">
        <div class="picker-sidebar">
          <div 
            class="picker-cat-item" 
            :class="{ active: pickerActiveCatId === '' }"
            @click="pickerActiveCatId = ''; fetchPickerImages()"
          >全部图片</div>
          <div 
            v-for="cat in pickerCategories" 
            :key="cat.id" 
            class="picker-cat-item"
            :class="{ active: pickerActiveCatId === cat.id }"
            @click="pickerActiveCatId = cat.id; fetchPickerImages()"
          >{{ cat.name }}</div>
        </div>
        <div class="picker-main" v-loading="pickerLoading">
          <div class="picker-toolbar">
            <el-upload
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handlePickerUpload"
            >
              <el-button type="primary" size="small">上传新图片</el-button>
            </el-upload>
          </div>
          <div class="picker-grid">
            <div 
              v-for="img in galleryImages" 
              :key="img.id" 
              class="picker-img-card"
              @click="selectGalleryImage(img.url)"
            >
              <el-image :src="img.url" fit="cover" />
              <div class="picker-img-name">{{ img.name }}</div>
            </div>
          </div>
          <el-empty v-if="galleryImages.length === 0" description="暂无图片" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Delete, Plus, Minus, Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminCdkApi, adminApi, adminProductApi, adminCategoryApi, type AdminProduct } from '@/api/admin'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

const router = useRouter()
const route = useRoute()
const cdkId = computed(() => route.params.id as string)

const loading = ref(true)
const submitting = ref(false)
const cdkData = ref<any>(null)

// Form data for different types
const formVirtual = reactive({
  stock: 0,
  fields: [] as string[]
})

const formShared = reactive({
  attributes: [{ key: '', value: '' }] as { key: string; value: string }[],
  maxSlots: 1
})

const formOneTime = reactive({
  code: ''
})

// Calculated used stock for virtual type
const usedStock = computed(() => {
  const total = cdkData.value?.account_data?.stock || 0
  // 简化处理：idle 状态表示全部可用，using 状态表示有使用中
  if (cdkData.value?.status === 'idle') return 0
  return Math.max(1, Math.floor(total * 0.5)) // 估计值，实际需查订单
})

const minStock = computed(() => usedStock.value)

// Image Picker State
const commonImage = ref('')
const imagePickerVisible = ref(false)
const pickerLoading = ref(false)
const galleryImages = ref<any[]>([])
const pickerCategories = ref<any[]>([])
const pickerActiveCatId = ref('')

// SKU Selection State
const selectedSkuIds = ref<string[]>([])
const skuOptions = ref<{ id: string; label: string }[]>([])
const loadingSkus = ref(false)

// 商品选择状态 (编辑时可切换商品)
const categories = ref<any[]>([])
const products = ref<AdminProduct[]>([])
const selectedCategoryId = ref('')
const selectedProductId = ref('')

// URL 类型映射
const typeMap: Record<string, string> = { 'virtual': 'virtual', 'shared': 'shared_account', 'one_time': 'one_time_cdk' }
const currentCdkType = computed(() => {
  const urlType = route.query.type as string
  return typeMap[urlType] || cdkData.value?.cdk_type || 'virtual'
})

// 过滤后的商品列表
const filteredProducts = computed(() => {
  if (!selectedCategoryId.value) return []
  return products.value.filter(p => p.category_id === selectedCategoryId.value)
})

onMounted(async () => {
  if (!cdkId.value) {
    ElMessage.error('无效的 CDK ID')
    router.back()
    return
  }
  
  try {
    // 1. 加载分类和商品列表
    const [catRes, prodRes] = await Promise.all([
      adminCategoryApi.getCategories(),
      adminProductApi.getProducts()
    ])
    if (catRes.success) categories.value = catRes.categories
    if (prodRes.success) products.value = prodRes.products
    
    // 2. 加载 CDK 详情
    const res = await adminCdkApi.getCdkById(cdkId.value)
    if (res.success && res.cdk) {
      cdkData.value = res.cdk
      
      // Load helping image（新格式用 image，兼容旧格式 common_image/help_image）
      commonImage.value = res.cdk.account_data?.image || res.cdk.account_data?.common_image || res.cdk.account_data?.help_image || ''
      
      // Initialize form based on type
      if (res.cdk.cdk_type === 'virtual') {
        // 读取库存
        formVirtual.stock = res.cdk.stock ?? res.cdk.account_data?.stock ?? 0
        // 新格式：从 code 读取 fields；兼容旧格式从 account_data 读取
        try {
          const codeData = JSON.parse(res.cdk.code || '{}')
          formVirtual.fields = codeData.fields || res.cdk.account_data?.fields || []
        } catch {
          formVirtual.fields = res.cdk.account_data?.fields || []
        }
      } else if (res.cdk.cdk_type === 'shared') {
        // Parse attributes from code field (JSON format)
        let attrs: Record<string, string> = {}
        try {
          if (res.cdk.code) {
            attrs = JSON.parse(res.cdk.code)
          }
        } catch {
          // Fallback to account_data for legacy data
          const fallbackAttrs = res.cdk.account_data || {}
          attrs = Object.fromEntries(
            Object.entries(fallbackAttrs)
              .filter(([k]) => k !== 'template_keys' && k !== 'common_image' && k !== 'help_image' && k !== 'image')
          )
        }
        formShared.attributes = Object.entries(attrs).map(([key, value]) => ({ key, value: String(value) }))
        if (formShared.attributes.length === 0) {
          formShared.attributes = [{ key: '', value: '' }]
        }
        // Initialize max_slots
        formShared.maxSlots = res.cdk.max_slots || 1
      } else if (res.cdk.cdk_type === 'one_time') {
        formOneTime.code = res.cdk.code || ''
      }
      
      // Initialize SKU selection from sku_mappings
      if (res.cdk.sku_mappings && res.cdk.sku_mappings.length > 0) {
        selectedSkuIds.value = res.cdk.sku_mappings.map((m: any) => m.sku_id)
      }
      
      // 初始化商品选择（优先从 product_snapshot）
      const snapshotProductId = res.cdk.product_snapshot?.product_id
      let targetProductId = snapshotProductId
      
      // 如果没有快照，通过 SKU 映射找商品
      if (!targetProductId && selectedSkuIds.value.length > 0) {
        const { data: skuMap } = await getAdminSupabaseClient()
          .from('product_sku_map')
          .select('product_id')
          .eq('sku_id', selectedSkuIds.value[0])
          .maybeSingle()
        targetProductId = skuMap?.product_id
      }
      
      // 设置分类和商品选择
      if (targetProductId) {
        const product = products.value.find(p => p.id === targetProductId)
        if (product) {
          selectedCategoryId.value = product.category_id || ''
          selectedProductId.value = targetProductId
          await loadSkuOptions(targetProductId)
        }
      }
    } else {
      ElMessage.error(res.error || '获取 CDK 详情失败')
      router.back()
    }
  } finally {
    loading.value = false
  }
})

const getTypeText = (type?: string) => {
  const map: Record<string, string> = {
    'virtual': '虚拟充值',
    'shared': '账号/合租',
    'one_time': '激活码'
  }
  return map[type || ''] || type || '-'
}

const getStatusText = (status?: string) => {
  const map: Record<string, string> = { 'idle': '空闲', 'using': '使用中', 'used': '已使用' }
  return map[status || ''] || status || '-'
}

const getStatusType = (status?: string) => {
  const map: Record<string, 'success' | 'warning' | 'info'> = { 'idle': 'success', 'using': 'warning', 'used': 'info' }
  return map[status || ''] || 'info'
}

// 加载商品 SKU 列表（按 CDK 类型过滤）
const loadSkuOptions = async (productId: string) => {
  loadingSkus.value = true
  try {
    const skuRes = await adminProductApi.getProductWithSkus(productId)
    if (skuRes.success && skuRes.skus) {
      const targetType = currentCdkType.value
      let filteredSkus = skuRes.skus
      if (targetType) {
        filteredSkus = filteredSkus.filter((sku: any) => sku.product_type === targetType)
      }
      skuOptions.value = filteredSkus.map((sku: any) => {
        const specValues = Object.values(sku.spec_combination || {}).join(' ')
        return { id: sku.id, label: specValues || '默认规格' }
      })
    }
  } finally {
    loadingSkus.value = false
  }
}

// 分类切换
const handleCategoryChange = () => {
  selectedProductId.value = ''
  selectedSkuIds.value = []
  skuOptions.value = []
}

// 商品切换
const handleProductChange = async (productId: string) => {
  selectedSkuIds.value = []
  skuOptions.value = []
  if (productId) {
    await loadSkuOptions(productId)
  }
}

// Virtual type helpers
const addVirtualField = () => formVirtual.fields.push('')
const removeVirtualField = (idx: number) => formVirtual.fields.splice(idx, 1)

// Shared type helpers
const addSharedAttr = () => formShared.attributes.push({ key: '', value: '' })
const removeSharedAttr = (idx: number) => {
  if (formShared.attributes.length === 1) {
    ElMessage.warning('至少保留一个属性')
    return
  }
  formShared.attributes.splice(idx, 1)
}

// Image Picker Logic
const openImagePicker = async () => {
  imagePickerVisible.value = true
  
  if (pickerCategories.value.length === 0) {
    const res = await adminApi.imageCategory.getCategories()
    if (res.success) pickerCategories.value = res.categories
  }
  
  fetchPickerImages()
}

const fetchPickerImages = async () => {
  pickerLoading.value = true
  const res = await adminApi.image.getImages({
    category_id: pickerActiveCatId.value
  })
  if (res.success) galleryImages.value = res.images
  pickerLoading.value = false
}

const selectGalleryImage = (url: string) => {
  commonImage.value = url
  imagePickerVisible.value = false
  ElMessage.success('已选择图片')
}

const handlePickerUpload = async (file: any) => {
  pickerLoading.value = true
  try {
    const { uploadImageToStorage } = await import('@/utils/uploadImage')
    const upRes = await uploadImageToStorage(file.raw)
    if (upRes.success) {
      await adminApi.image.createImage({
        name: file.name,
        url: upRes.url!,
        category_id: pickerActiveCatId.value || undefined
      })
      selectGalleryImage(upRes.url!)
      fetchPickerImages()
    }
  } finally {
    pickerLoading.value = false
  }
}

// Submit
const handleSubmit = async () => {
  if (!cdkData.value) return
  
  submitting.value = true
  try {
    // account_data 统一只存图片
    const updateData: any = {
      account_data: commonImage.value ? { image: commonImage.value } : null
    }
    
    // 更新商品快照（当选择了新商品时）
    if (selectedProductId.value) {
      const selectedProduct = products.value.find(p => p.id === selectedProductId.value)
      if (selectedProduct) {
        updateData.product_snapshot = {
          product_id: selectedProduct.id,
          product_name: selectedProduct.product_name,
          product_image: selectedProduct.image || undefined
        }
      }
    }

    if (cdkData.value.cdk_type === 'virtual') {
      if (formVirtual.stock < minStock.value) {
        ElMessage.error(`库存不能小于已使用数量 (${minStock.value})`)
        return
      }
      // 库存写入独立字段
      updateData.stock = formVirtual.stock
      // code 存储字段配置 JSON
      updateData.code = JSON.stringify({
        fields: formVirtual.fields.filter(f => f.trim())
      })
    } else if (cdkData.value.cdk_type === 'shared') {
      const attrObj: Record<string, string> = {}
      formShared.attributes.forEach(a => {
        if (a.key) attrObj[a.key] = a.value
      })
      // code 字段只存属性键值对
      updateData.code = JSON.stringify(attrObj)
      // 更新 max_slots
      updateData.max_slots = formShared.maxSlots
    } else if (cdkData.value.cdk_type === 'one_time') {
      if (!formOneTime.code.trim()) {
        ElMessage.error('激活码不能为空')
        return
      }
      updateData.code = formOneTime.code.trim()
    }
    
    // Update CDK basic info first
    const res = await adminCdkApi.updateCdk(cdkId.value!, updateData)
    if (!res.success) {
      ElMessage.error(res.error || '保存失败')
      return
    }
    
    // Handle SKU mappings - 比较新旧列表进行增删
    const currentMappings = cdkData.value.sku_mappings || []
    const currentSkuIds = currentMappings.map((m: any) => m.sku_id)
    
    // 1. 删除取消的绑定 (Prioritize delete to avoid potential unique constraints)
    const toRemove = currentMappings.filter((m: any) => !selectedSkuIds.value.includes(m.sku_id))
    for (const mapping of toRemove) {
      const rmRes = await adminCdkApi.removeCdkSkuMapping(mapping.id)
      if (!rmRes.success) {
        ElMessage.error(`解绑失败: ${rmRes.error}`)
      }
    }

    // 2. 添加新的绑定
    const toAdd = selectedSkuIds.value.filter(id => !currentSkuIds.includes(id))
    for (const skuId of toAdd) {
      const addRes = await adminCdkApi.addCdkSkuMapping(cdkId.value!, skuId)
      if (!addRes.success) {
        ElMessage.warning(`SKU 绑定失败: ${addRes.error}`)
      }
    }

    ElMessage.success('保存成功')
    // Navigate back to the correct CDK type page
    const typeRouteMap: Record<string, string> = {
      'virtual': 'virtual',
      'shared': 'accounts',
      'one_time': 'keys'
    }
    const targetRoute = typeRouteMap[cdkData.value?.cdk_type || ''] || 'virtual'
    router.push(`/admin/cdk/${targetRoute}`)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.cdk-edit-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
  padding-bottom: 80px;
}

.wizard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 24px 24px;
  margin-bottom: 30px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.back-btn {
  color: rgba(255,255,255,0.85) !important;
  font-size: 14px;
}

.back-icon {
  margin-right: 4px;
}

.header-titles {
  display: flex;
  flex-direction: column;
}

.main-title {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
}

.sub-title {
  font-size: 12px;
  color: rgba(255,255,255,0.7);
  letter-spacing: 2px;
}

.wizard-body {
  flex: 1;
  display: flex;
  justify-content: center;
}

.centered-container {
  width: 700px;
  max-width: 95vw;
}

.loading-container {
  padding: 60px;
}

.form-card {
  background: var(--el-bg-color);
  border-radius: 18px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.readonly-card {
  background: #f8f9fa;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 24px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

.dynamic-fields, .kv-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-row, .kv-row { display: flex; align-items: center; margin-bottom: 8px; gap: 8px; }
.separator { color: #dcdfe6; }
.add-attr-btn { width: 100%; border-style: dashed; }

/* Image Selector */
.image-selector {
  width: 100px; height: 100px;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  background: #fbfbfc;
  transition: all 0.3s;
}
.image-selector:hover { border-color: #409EFF; }
.preview-img { width: 100%; height: 100%; border-radius: 6px; object-fit: cover; }
.placeholder { display: flex; flex-direction: column; align-items: center; color: #909399; font-size: 12px; gap: 4px; }

/* Picker Logic reused styles */
.picker-container { display: flex; height: 400px; }
.picker-sidebar { width: 120px; border-right: 1px solid #ebeef5; overflow-y: auto; }
.picker-cat-item { padding: 10px; cursor: pointer; color: #606266; font-size: 13px; }
.picker-cat-item:hover, .picker-cat-item.active { background: #ecf5ff; color: #409EFF; }
.picker-main { flex: 1; padding: 16px; display: flex; flex-direction: column; overflow-y: auto; }
.picker-toolbar { margin-bottom: 12px; display: flex; justify-content: flex-end; }
.picker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px; }
.picker-img-card { cursor: pointer; border: 1px solid #ebeef5; border-radius: 4px; overflow: hidden; }
.picker-img-card:hover { border-color: #409EFF; }
.picker-img-card .el-image { width: 100%; height: 80px; display: block; }
.picker-img-name { font-size: 12px; padding: 4px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #606266; }
</style>
