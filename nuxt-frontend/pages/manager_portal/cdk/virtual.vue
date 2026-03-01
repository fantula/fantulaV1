<template>
  <div class="virtual-cdk-page">
    <!-- Action Bar -->
    <AdminActionCard>
      <template #default>
        <span class="page-desc">集中管理所有虚拟充值资源，可直接修改库存、绑定多个商品 SKU</span>
      </template>
      <template #actions>
        <el-button @click="loadResources" :icon="Refresh">刷新</el-button>
        <el-button type="primary" @click="openCreateDialog" :icon="Plus">新建充值资源</el-button>
      </template>
    </AdminActionCard>

    <!-- Resources Grid -->
    <div v-loading="loading" class="resources-grid">
      <div v-if="resources.length === 0 && !loading" class="empty-state">
        <el-empty description="暂无虚拟充值资源">
          <el-button type="primary" @click="openCreateDialog">创建第一个充值资源</el-button>
        </el-empty>
      </div>

      <div v-for="res in resources" :key="res.id" class="resource-card">
        <!-- Card Header -->
        <div class="card-header">
          <div class="card-title-row">
            <div class="card-icon">🔋</div>
            <div class="card-title">
              <div class="title-top">
                <span class="resource-name" v-if="res.product_snapshot?.product_name">{{ res.product_snapshot.product_name }}</span>
                <span class="resource-name" v-else>虚拟充值资源</span>
                <el-tag :type="(getStatusType(res.status) as any)" size="small" effect="plain">{{ getStatusLabel(res.status) }}</el-tag>
                <el-tag v-if="res.account_data?.label" type="warning" size="small" effect="light" class="card-custom-label">{{ res.account_data.label }}</el-tag>
              </div>
              <div class="fields-display" v-if="getFields(res).length > 0">
                <el-tag v-for="f in getFields(res)" :key="f" size="small" type="info" effect="plain" class="field-tag">{{ f }}</el-tag>
              </div>
            </div>
          </div>
          <div class="header-actions">
            <el-button link size="small" type="primary" @click="openEditDialog(res)">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button link size="small" type="danger" @click="handleDeleteResource(res.id)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </div>

        <!-- Stock Control (inline) -->
        <div class="stock-section">
          <span class="stock-label">可用库存</span>
          <div class="stock-control">
            <el-input-number
              v-model="res.stock"
              :min="0"
              :max="99999"
              controls-position="right"
              class="stock-input"
              @change="(val: number | undefined) => { if (val !== undefined) handleUpdateStock(res.id, val) }"
            />
            <el-tag v-if="savingStockId === res.id" type="info" size="small" effect="plain" class="saving-tag">保存中...</el-tag>
          </div>
        </div>

        <!-- Images (inline thumbnails) -->
        <div class="images-section">
          <span class="section-label">帮助图片</span>
          <div class="images-row">
            <img v-for="(img, idx) in getImages(res)" :key="idx" :src="img" class="mini-img" />
            <div class="mini-img add-img" @click="openImageDialog(res.id)">
              <el-icon><Picture /></el-icon>
            </div>
          </div>
        </div>

        <!-- SKU Bindings (compact) -->
        <div class="sku-compact">
          <span class="section-label">绑定 SKU</span>
          <div class="sku-compact-right">
            <el-tag v-if="res.sku_mappings.length > 0" type="success" size="small" effect="light">
              {{ res.sku_mappings.length }} 个
            </el-tag>
            <el-tag v-else type="warning" size="small" effect="light">未绑定</el-tag>
            <el-button type="primary" link size="small" @click="openBindDialog(res.id)">管理</el-button>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <span class="create-time">{{ new Date(res.created_at).toLocaleDateString('zh-CN') }}</span>
          <span class="cdk-id">{{ res.id.substring(0, 8) }}</span>
        </div>
      </div>
    </div>

    <!-- 1. Create Dialog (fields + stock + initial SKU binding) -->
    <el-dialog v-model="createVisible" title="新建虚拟充值资源" width="560px" :close-on-click-modal="false">
      <el-form label-position="top">
        <el-form-item label="资源名称 (标记用途)">
          <el-input v-model="createForm.label" placeholder="如：GPT充值、Netflix代充 (可选)" />
        </el-form-item>

        <el-form-item label="可用库存数">
          <el-input-number v-model="createForm.stock" :min="1" :max="99999" style="width: 100%" />
        </el-form-item>

        <el-divider content-position="left">订单填写字段</el-divider>
        <div class="dynamic-fields">
          <div v-for="(field, idx) in createForm.fields" :key="idx" class="field-row">
            <el-input v-model="createForm.fields[idx]" placeholder="字段名 (如: 游戏账号)" />
            <el-button type="danger" circle plain size="small" @click="createForm.fields.splice(idx, 1)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
          <el-button class="add-field-btn" @click="createForm.fields.push('')">
            <el-icon><Plus /></el-icon> 添加字段
          </el-button>
          <div class="form-tip">用户下单时需要填写的辅助信息字段</div>
        </div>

        <el-divider content-position="left">绑定 SKU (可选)</el-divider>
        <AdminSkuSelector
          v-model="createSkuSelection"
          :categories="categoryList"
          :products="virtualProducts"
        />
      </el-form>
      <template #footer>
        <el-button @click="createVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCreate" :loading="createSubmitting">创建</el-button>
      </template>
    </el-dialog>

    <!-- 2. Edit Dialog (fields + stock) -->
    <el-dialog v-model="editVisible" title="编辑资源配置" width="480px" :close-on-click-modal="false">
      <el-form label-position="top">
        <el-form-item label="资源标签 (可选)">
          <el-input v-model="editForm.label" placeholder="如: 主力资源、¥26.8专用、备用A" maxlength="20" show-word-limit clearable />
          <div class="form-tip">显示在卡片上的自定义标识，方便快速识别</div>
        </el-form-item>

        <el-form-item label="可用库存数">
          <el-input-number v-model="editForm.stock" :min="0" :max="99999" style="width: 100%" />
        </el-form-item>

        <el-divider content-position="left">订单填写字段</el-divider>
        <div class="dynamic-fields">
          <div v-for="(field, idx) in editForm.fields" :key="idx" class="field-row">
            <el-input v-model="editForm.fields[idx]" placeholder="字段名" />
            <el-button type="danger" circle plain size="small" @click="editForm.fields.splice(idx, 1)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
          <el-button class="add-field-btn" @click="editForm.fields.push('')">
            <el-icon><Plus /></el-icon> 添加字段
          </el-button>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit" :loading="editSubmitting">保存</el-button>
      </template>
    </el-dialog>

    <!-- 3. Image Dialog -->
    <el-dialog v-model="imageDialogVisible" title="管理帮助图片" width="460px">
      <div class="image-manage-grid">
        <div v-for="(img, idx) in imageDialogImages" :key="idx" class="img-manage-item">
          <img :src="img" class="manage-img" />
          <el-button class="img-del-btn" type="danger" circle size="small" @click="imageDialogImages.splice(idx, 1)">
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
        <div v-if="imageDialogImages.length < 5" class="img-manage-item add-slot" @click="showImagePicker = true">
          <el-icon :size="20"><Plus /></el-icon>
          <span>添加</span>
        </div>
      </div>
      <template #footer>
        <el-button @click="imageDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitImages" :loading="imageSaving">保存图片</el-button>
      </template>
    </el-dialog>

    <!-- 4. SKU Binding Management Dialog -->
    <el-dialog v-model="bindVisible" title="管理 SKU 绑定" width="620px" :close-on-click-modal="false">
      <!-- Current bindings (grouped by product) -->
      <div class="bind-section">
        <div class="bind-section-title">当前绑定 ({{ currentBindings.length }})</div>
        <div v-if="currentBindings.length === 0" class="bind-empty">暂无绑定的 SKU</div>
        <div v-for="group in groupedBindings" :key="group.product_id" class="bind-product-group">
          <!-- Group header -->
          <div class="bind-group-header" @click="toggleBindGroup(group.product_id)">
            <div class="bind-group-left">
              <img v-if="group.product_image" :src="group.product_image" class="bind-img" />
              <div class="bind-img placeholder" v-else><el-icon><Picture /></el-icon></div>
              <div class="bind-group-meta">
                <span class="bind-product">{{ group.product_name }}</span>
                <span class="bind-group-count">{{ group.skus.length }} 个规格</span>
              </div>
            </div>
            <div class="bind-group-right">
              <el-icon class="bind-toggle-icon" :class="{ rotated: expandedGroups.has(group.product_id) }"><ArrowDown /></el-icon>
              <el-button type="danger" link size="small" @click.stop="handleUnbindProduct(group)">全部解绑</el-button>
            </div>
          </div>
          <!-- Expanded SKU list -->
          <div v-if="expandedGroups.has(group.product_id)" class="bind-sku-expand">
            <div v-for="sku in group.skus" :key="sku.mapping_id" class="bind-sku-row">
              <span class="bind-sku-spec">{{ sku.spec_label }}</span>
              <span class="bind-sku-price">¥{{ sku.price }}</span>
              <el-button type="danger" link size="small" @click="handleUnbind(sku.mapping_id)">解绑</el-button>
            </div>
          </div>
        </div>
      </div>

      <el-divider />

      <!-- Add new binding via AdminSkuSelector -->
      <div class="bind-section">
        <div class="bind-section-title">添加新绑定</div>
        <AdminSkuSelector
          v-model="bindSkuSelection"
          :categories="categoryList"
          :products="virtualProducts"
        />
        <div v-if="bindSkuSelection.length > 0" style="margin-top: 12px; text-align: right;">
          <el-button type="primary" @click="handleBatchBind" :loading="batchBinding">
            绑定选中的 {{ bindSkuSelection.length }} 个 SKU
          </el-button>
        </div>
      </div>
    </el-dialog>

    <!-- Image Picker (from media library) -->
    <AdminImagePicker v-model="showImagePicker" @select="handleImagePicked" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { Refresh, Plus, Edit, Delete, Picture, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminImagePicker from '@/components/admin/AdminImagePicker.vue'
import AdminSkuSelector from '@/components/admin/base/AdminSkuSelector.vue'
import { adminCdkApi } from '@/api/admin/cdk'
import { adminProductApi } from '@/api/admin/product'
import { adminCategoryApi } from '@/api/admin/category'

definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], title: '虚拟充值管理'
})

// ============ State ============
const loading = ref(false)
const resources = ref<any[]>([])
const savingStockId = ref<string | null>(null)
const productList = ref<any[]>([])
const categoryList = ref<any[]>([])

// Filter products to only show those with virtual SKUs
const virtualProducts = computed(() => productList.value)

// ============ Load ============
const loadResources = async () => {
  loading.value = true
  try {
    const res = await adminCdkApi.getVirtualCdkResources()
    if (res.success) resources.value = res.resources
    else ElMessage.error(res.error || '加载失败')
  } catch (e: any) {
    ElMessage.error(e.message || '系统错误')
  } finally {
    loading.value = false
  }
}

const loadProducts = async () => {
  const [prodRes, catRes] = await Promise.all([
    adminProductApi.getProducts(),
    adminCategoryApi.getCategories()
  ])
  if (prodRes.success) productList.value = prodRes.products
  if (catRes.success) categoryList.value = catRes.categories
}

onMounted(() => {
  loadResources()
  loadProducts()
})

// ============ Helpers ============
const getFields = (res: any): string[] => {
  try {
    const parsed = JSON.parse(res.code || '{}')
    if (parsed.fields && Array.isArray(parsed.fields)) return parsed.fields.filter((f: string) => f.trim())
  } catch { /* not JSON */ }
  if (res.account_data?.fields) return res.account_data.fields
  return []
}

const getImages = (res: any): string[] => {
  if (res.account_data?.images && Array.isArray(res.account_data.images)) return res.account_data.images
  if (res.account_data?.image) return [res.account_data.image]
  return []
}

const getStatusType = (s: string) => ({ idle: 'success', using: 'warning', used: 'info', disabled: 'danger' }[s] || 'info')
const getStatusLabel = (s: string) => ({ idle: '正常', using: '使用中', used: '已用完', disabled: '已下架' }[s] || s)


// ============ Inline Stock ============
const handleUpdateStock = async (cdkId: string, val: number) => {
  savingStockId.value = cdkId
  try {
    const res = await adminCdkApi.updateVirtualCdkStock(cdkId, val)
    if (res.success) ElMessage.success('库存已更新')
    else ElMessage.error(res.error || '更新失败')
  } finally {
    savingStockId.value = null
  }
}

// ============ Create Dialog ============
const createVisible = ref(false)
const createSubmitting = ref(false)
const createSkuSelection = ref<any[]>([])
const createForm = reactive({
  label: '',
  stock: 10,
  fields: [''] as string[]
})

const openCreateDialog = () => {
  createForm.label = ''
  createForm.stock = 10
  createForm.fields = ['']
  createSkuSelection.value = []
  createVisible.value = true
}

const submitCreate = async () => {
  const fields = createForm.fields.filter(f => f.trim())
  if (fields.length === 0) return ElMessage.warning('请至少添加一个订单字段')
  createSubmitting.value = true
  try {
    const skuIds = createSkuSelection.value.map((s: any) => s.id)
    const snapshot = createForm.label
      ? { product_id: '', product_name: createForm.label }
      : undefined
    const res = await adminCdkApi.createVirtualCdk({
      code: JSON.stringify({ fields }),
      stock: createForm.stock,
      product_snapshot: snapshot,
      sku_ids: skuIds
    })
    if (res.success) {
      ElMessage.success('资源已创建')
      createVisible.value = false
      await loadResources()
    } else {
      ElMessage.error(res.error || '创建失败')
    }
  } finally {
    createSubmitting.value = false
  }
}

// ============ Edit Dialog (fields + stock) ============
const editVisible = ref(false)
const editSubmitting = ref(false)
const editTargetId = ref('')
const editForm = reactive({
  stock: 0,
  fields: [] as string[],
  label: ''
})

const openEditDialog = (res: any) => {
  editTargetId.value = res.id
  editForm.stock = res.stock
  editForm.fields = [...getFields(res)]
  editForm.label = res.account_data?.label || ''
  if (editForm.fields.length === 0) editForm.fields = ['']
  editVisible.value = true
}

const submitEdit = async () => {
  const fields = editForm.fields.filter(f => f.trim())
  editSubmitting.value = true
  try {
    // Preserve existing account_data (images), only update label
    const existing = resources.value.find(r => r.id === editTargetId.value)
    const accountData: Record<string, any> = { ...(existing?.account_data || {}) }
    if (editForm.label.trim()) accountData.label = editForm.label.trim()
    else delete accountData.label

    const res = await adminCdkApi.updateCdk(editTargetId.value, {
      stock: editForm.stock,
      code: JSON.stringify({ fields }),
      account_data: Object.keys(accountData).length > 0 ? accountData : undefined
    })
    if (res.success) {
      ElMessage.success('已保存')
      editVisible.value = false
      await loadResources()
    } else {
      ElMessage.error(res.error || '保存失败')
    }
  } finally {
    editSubmitting.value = false
  }
}

// ============ Image Dialog ============
const imageDialogVisible = ref(false)
const imageSaving = ref(false)
const imageTargetId = ref('')
const imageDialogImages = ref<string[]>([])
const showImagePicker = ref(false)

const openImageDialog = (cdkId: string) => {
  imageTargetId.value = cdkId
  const res = resources.value.find(r => r.id === cdkId)
  imageDialogImages.value = res ? [...getImages(res)] : []
  imageDialogVisible.value = true
}

const handleImagePicked = (image: { url: string }) => {
  if (image?.url && imageDialogImages.value.length < 5) {
    imageDialogImages.value.push(image.url)
  }
}

const submitImages = async () => {
  imageSaving.value = true
  try {
    const accountData: Record<string, any> | undefined = imageDialogImages.value.length > 0
      ? { images: imageDialogImages.value, image: imageDialogImages.value[0] }
      : undefined
    const res = await adminCdkApi.updateCdk(imageTargetId.value, { account_data: accountData })
    if (res.success) {
      ElMessage.success('图片已保存')
      imageDialogVisible.value = false
      await loadResources()
    } else {
      ElMessage.error(res.error || '保存失败')
    }
  } finally {
    imageSaving.value = false
  }
}

// ============ SKU Binding Dialog ============
const bindVisible = ref(false)
const bindTargetId = ref('')
const currentBindings = ref<any[]>([])
const bindSkuSelection = ref<any[]>([])
const batchBinding = ref(false)
const expandedGroups = ref<Set<string>>(new Set())

// Group current bindings by product
const groupedBindings = computed(() => {
  const map = new Map<string, { product_id: string; product_name: string; product_image: string; skus: any[] }>()
  for (const b of currentBindings.value) {
    const key = b.product_id || b.product_name || 'unknown'
    if (!map.has(key)) {
      map.set(key, { product_id: key, product_name: b.product_name || '未知商品', product_image: b.product_image || '', skus: [] })
    }
    map.get(key)!.skus.push(b)
  }
  return [...map.values()]
})

const toggleBindGroup = (productId: string) => {
  const next = new Set(expandedGroups.value)
  if (next.has(productId)) next.delete(productId)
  else next.add(productId)
  expandedGroups.value = next
}

const openBindDialog = (cdkId: string) => {
  bindTargetId.value = cdkId
  bindSkuSelection.value = []
  const res = resources.value.find(r => r.id === cdkId)
  currentBindings.value = res ? [...res.sku_mappings] : []
  // Default: expand all groups
  expandedGroups.value = new Set(currentBindings.value.map(b => b.product_id || b.product_name || 'unknown'))
  bindVisible.value = true
}

const handleBatchBind = async () => {
  const skuIds = bindSkuSelection.value.map((s: any) => s.id)
  if (skuIds.length === 0) return
  batchBinding.value = true
  try {
    const res = await adminCdkApi.addVirtualCdkSkuMapping(bindTargetId.value, skuIds)
    if (res.success) {
      ElMessage.success(`成功绑定 ${skuIds.length} 个 SKU`)
      bindSkuSelection.value = []
      await loadResources()
      const updated = resources.value.find(r => r.id === bindTargetId.value)
      currentBindings.value = updated ? [...updated.sku_mappings] : []
    } else {
      ElMessage.error(res.error || '绑定失败')
    }
  } finally {
    batchBinding.value = false
  }
}

const handleUnbind = async (mappingId: string) => {
  try {
    await ElMessageBox.confirm('确定解除此 SKU 绑定？', '确认', { type: 'warning' })
    const res = await adminCdkApi.removeVirtualCdkSkuMapping(mappingId)
    if (res.success) {
      ElMessage.success('已解绑')
      await loadResources()
      const updated = resources.value.find(r => r.id === bindTargetId.value)
      currentBindings.value = updated ? [...updated.sku_mappings] : []
      expandedGroups.value = new Set(currentBindings.value.map(b => b.product_id || b.product_name || 'unknown'))
    }
  } catch { /* cancelled */ }
}

const handleUnbindProduct = async (group: { product_id: string; product_name: string; skus: any[] }) => {
  try {
    await ElMessageBox.confirm(
      `确定解绑「${group.product_name}」下全部 ${group.skus.length} 个规格？`,
      '批量解绑确认',
      { type: 'warning', confirmButtonText: '全部解绑', cancelButtonText: '取消' }
    )
    for (const sku of group.skus) {
      await adminCdkApi.removeVirtualCdkSkuMapping(sku.mapping_id)
    }
    ElMessage.success(`已解绑 ${group.skus.length} 个规格`)
    await loadResources()
    const updated = resources.value.find(r => r.id === bindTargetId.value)
    currentBindings.value = updated ? [...updated.sku_mappings] : []
    expandedGroups.value = new Set(currentBindings.value.map(b => b.product_id || b.product_name || 'unknown'))
  } catch { /* cancelled */ }
}

// ============ Delete ============
const handleDeleteResource = async (cdkId: string) => {
  try {
    await ElMessageBox.confirm('确定删除此充值资源？', '确认删除', { type: 'warning' })
    const res = await adminCdkApi.deleteCdk(cdkId)
    if (res.success) {
      ElMessage.success('已删除')
      await loadResources()
    } else {
      ElMessage.error(res.error || '删除失败')
    }
  } catch { /* cancelled */ }
}
</script>

<style scoped>
.virtual-cdk-page {}
.page-desc { font-size: 13px; color: #909399; }

/* Grid */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
  margin-top: 16px;
  min-height: 200px;
}
.empty-state { grid-column: 1 / -1; display: flex; justify-content: center; padding: 60px 0; }

/* Card */
.resource-card {
  background: var(--el-bg-color);
  border-radius: 12px;
  border: 1px solid var(--el-border-color-lighter);
  padding: 16px;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.resource-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border-color: var(--el-color-primary-light-5);
}

/* Header */
.card-header { display: flex; justify-content: space-between; align-items: flex-start; }
.card-title-row { display: flex; align-items: center; gap: 10px; flex: 1; overflow: hidden; }
.card-icon {
  font-size: 20px; width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px; flex-shrink: 0;
}
.card-title { display: flex; flex-direction: column; gap: 4px; overflow: hidden; }
.fields-display { display: flex; gap: 4px; flex-wrap: wrap; }
.field-tag { font-size: 11px; }
.code-label { font-size: 14px; font-weight: 600; color: var(--el-text-color-primary); }
.header-actions { display: flex; gap: 2px; flex-shrink: 0; }

/* Stock */
.stock-section {
  background: var(--el-fill-color-light); border-radius: 8px;
  padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;
}
.stock-label { font-size: 13px; color: var(--el-text-color-regular); font-weight: 500; }
.stock-control { display: flex; align-items: center; gap: 8px; }
.stock-input { width: 140px; }
.saving-tag { animation: pulse 1s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

/* Images */
.images-section {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 0;
}
.section-label { font-size: 12px; color: var(--el-text-color-secondary); flex-shrink: 0; width: 56px; }
.images-row { display: flex; gap: 6px; flex-wrap: wrap; }
.mini-img {
  width: 36px; height: 36px; border-radius: 4px; object-fit: cover;
  border: 1px solid var(--el-border-color-lighter); cursor: pointer;
}
.add-img {
  display: flex; align-items: center; justify-content: center;
  background: var(--el-fill-color-lighter); color: var(--el-text-color-placeholder);
  border: 1px dashed var(--el-border-color); font-size: 14px;
}
.add-img:hover { border-color: var(--el-color-primary); color: var(--el-color-primary); }

/* SKU Compact */
.sku-compact {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0;
}
.sku-compact-right { display: flex; align-items: center; gap: 8px; }

/* Footer */
.card-footer {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 11px; color: var(--el-text-color-placeholder);
  border-top: 1px solid var(--el-border-color-extra-light);
  padding-top: 8px;
}
.cdk-id { font-family: monospace; }

/* Forms common */
.dynamic-fields { margin-bottom: 12px; }
.field-row { display: flex; gap: 8px; margin-bottom: 8px; }
.add-field-btn { width: 100%; border-style: dashed; }
.form-tip { font-size: 12px; color: #909399; margin-top: 4px; }

/* Image manage dialog */
.image-manage-grid { display: flex; flex-wrap: wrap; gap: 12px; }
.img-manage-item {
  width: 80px; height: 80px; border-radius: 6px;
  position: relative; border: 1px solid var(--el-border-color-lighter);
}
.manage-img { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; }
.img-del-btn {
  position: absolute; top: -8px; right: -8px; opacity: 0; transition: 0.2s;
  z-index: 10; height: 20px; width: 20px; padding: 2px;
}
.img-manage-item:hover .img-del-btn { opacity: 1; }
.add-slot {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; font-size: 12px; color: var(--el-text-color-placeholder);
  border: 1px dashed var(--el-border-color); cursor: pointer; background: var(--el-fill-color-lighter);
}
.add-slot:hover { border-color: var(--el-color-primary); color: var(--el-color-primary); }

/* Card custom label */
.card-custom-label { cursor: default; }

/* SKU Binding dialog */
.bind-section { margin-bottom: 8px; }
.bind-section-title { font-size: 13px; font-weight: 600; color: var(--el-text-color-primary); margin-bottom: 10px; }
.bind-empty { font-size: 12px; color: var(--el-text-color-placeholder); text-align: center; padding: 12px; }

/* Grouped binding */
.bind-product-group {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}

.bind-group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--el-fill-color-light);
  cursor: pointer;
  transition: background 0.15s;
  user-select: none;
}
.bind-group-header:hover { background: var(--el-fill-color); }

.bind-group-left { display: flex; align-items: center; gap: 10px; overflow: hidden; }
.bind-group-meta { display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
.bind-group-count { font-size: 11px; color: var(--el-text-color-secondary); }

.bind-group-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

.bind-toggle-icon {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  transition: transform 0.2s;
}
.bind-toggle-icon.rotated { transform: rotate(180deg); }

.bind-img {
  width: 32px; height: 32px; border-radius: 4px; object-fit: cover; flex-shrink: 0;
}
.bind-img.placeholder {
  display: flex; align-items: center; justify-content: center;
  background: var(--el-fill-color); color: var(--el-text-color-placeholder); font-size: 14px;
}
.bind-product { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Expanded SKU rows */
.bind-sku-expand { background: var(--el-bg-color); }
.bind-sku-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 54px; /* indent to align under product name */
  border-top: 1px solid var(--el-border-color-extra-light);
}
.bind-sku-spec { flex: 1; font-size: 13px; color: var(--el-text-color-primary); }
.bind-sku-price { font-size: 12px; color: var(--el-color-danger); font-weight: 600; flex-shrink: 0; }
</style>
