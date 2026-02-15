<template>
  <div class="sku-manager-page">
    <!-- Header -->
    <div class="page-header">
      <div class="header-left">
        <el-button @click="router.back()" :icon="ArrowLeft" circle class="back-btn" />
        <div class="product-info" v-if="product">
          <img v-if="product.image" :src="product.image" class="product-thumb" />
          <div class="product-details">
            <h1 class="page-title">规格管理: {{ product.product_name }}</h1>
            <span class="product-id">ID: {{ product.id }}</span>
          </div>
        </div>
      </div>
      <div class="header-actions">
         <el-button type="primary" size="large" @click="handleSave" :loading="saving">保存配置</el-button>
      </div>
    </div>
    
    <div class="main-content" v-loading="loading">
       <div class="content-card">
          <!-- Mode Switch -->
          <div class="spec-editor-header">
             <div class="panel-title">配置模式</div>
             <div class="spec-mode-switch">
                <el-radio-group v-model="specMode" @change="handleSpecModeChange">
                  <el-radio-button label="custom">自定义规格</el-radio-button>
                  <el-radio-button label="shared">引用共享规格</el-radio-button>
                </el-radio-group>
             </div>
          </div>

          <!-- Shared Mode Selector -->
          <div v-if="specMode === 'shared'" class="shared-spec-selector">
             <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;">
                <template #title>引用共享规格组后，此商品的 SKU 将自动与该组保持同步。如需修改，请前往“共享规格库”。</template>
             </el-alert>
             <div class="selector-row">
                <span class="label">选择规格组:</span>
                <el-select 
                    v-model="sharedSkuTag" 
                    placeholder="请选择共享规格组" 
                    style="width: 300px"
                    @change="handleSharedGroupChange"
                >
                    <el-option 
                      v-for="group in sharedGroups" 
                      :key="group.tag" 
                      :label="`#${group.tag} (${group.skus.length} SKU)`" 
                      :value="group.tag"
                    />
                </el-select>
                <el-button type="primary" link @click="goToSharedManager" style="margin-left: 10px;">管理共享库</el-button>
             </div>
          </div>

          <!-- Sku Editor Component -->
          <AdminSkuEditor
             v-if="shouldShowEditor"
             ref="skuEditorRef"
             :key="editorKey"
             :mode="specMode === 'shared' ? 'linked' : 'standalone'"
             :read-only="specMode === 'shared'"
             :initial-specs="currentSpecs"
             :initial-skus="currentSkus"
             :product-id="productId"
             :tag="specMode === 'shared' ? sharedSkuTag : undefined"
          />
          
          <div v-else-if="specMode === 'shared' && !sharedSkuTag" class="empty-tip">
             请选择一个共享规格组预览
          </div>

       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import AdminSkuEditor from '@/components/admin/SkuEditor.vue'
import { useAdminSkuEditor } from '@/composables/admin/useAdminSkuEditor'

const router = useRouter()
const skuEditorRef = ref<InstanceType<typeof AdminSkuEditor> | null>(null)

const {
    productId,
    loading,
    saving,
    product,
    specMode,
    sharedSkuTag,
    sharedGroups,
    currentSpecs,
    currentSkus,
    editorKey,
    shouldShowEditor,

    handleSpecModeChange,
    handleSharedGroupChange,
    goToSharedManager,
    saveSkus
} = useAdminSkuEditor()

const handleSave = () => saveSkus(skuEditorRef.value)

</script>

<style scoped>
.sku-manager-page {
    padding: 20px;
    background: #f8f9fa;
    min-height: 100vh;
}
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    margin-bottom: 20px;
}
.header-left {
    display: flex;
    align-items: center;
    gap: 20px;
}
.product-info {
    display: flex;
    align-items: center;
    gap: 15px;
}
.product-thumb {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid #eee;
}
.product-details h1 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 5px 0;
}
.product-id {
    font-size: 12px;
    color: #999;
    font-family: monospace;
}
.main-content {
    background: #fff;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
.spec-editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
}
.panel-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
}
.empty-tip {
    text-align: center;
    color: #999;
    padding: 40px;
}
.selector-row {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
