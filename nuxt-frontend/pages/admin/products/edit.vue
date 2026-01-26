<template>
  <div class="product-post-page">
    <!-- Header -->
    <StickyFormHeader
      :title="isEdit ? '编辑商品' : '创建商品'"
      :subtitle="isEdit ? 'Edit Product' : 'New Product'"
      :loading="loading"
      submit-text="保存商品"
      @back="goBack"
      @cancel="goBack"
      @submit="submitProduct"
    />

    <!-- Main Content -->
    <div class="main-body">
      <div class="content-wrapper">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" class="main-form">
          
          <!-- Card 1: Basic Information -->
          <el-card shadow="never" class="form-card">
            <template #header>
              <div class="card-header">基本信息</div>
            </template>
            
            <el-row :gutter="40">
                <el-col :span="16">
                    <el-form-item label="商品名称" prop="name">
                      <el-input v-model="form.name" placeholder="请输入商品主标题" size="large" />
                    </el-form-item>

                    <el-row :gutter="20">
                      <el-col :span="12">
                        <el-form-item label="商品分类" prop="categoryId">
                          <el-select v-model="form.categoryId" placeholder="请选择分类" style="width: 100%;">
                            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                         <el-form-item label="商品排序">
                           <el-input-number v-model="form.sortOrder" :min="0" style="width: 100%;" placeholder="数值越小越靠前" />
                         </el-form-item>
                      </el-col>
                    </el-row>
                    
                    <el-form-item label="商品标签">
                      <TagInputGroup v-model="form.tags" add-button-text="+ 新标签" />
                    </el-form-item>

                    <el-form-item label="上架状态">
                      <el-switch v-model="form.status" active-text="立即上架" inactive-text="暂不上架" />
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="商品图片" prop="image" class="img-upload-item">
                      <div class="image-gallery-trigger" @click="openImagePicker('image')">
                        <el-image v-if="form.image" :src="form.image" class="trigger-img" fit="cover" />
                        <div v-else class="trigger-content">
                          <el-icon class="trigger-icon"><PictureFilled /></el-icon>
                          <span>封面图</span>
                        </div>
                        <div class="trigger-overlay" v-if="form.image">更换图片</div>
                      </div>
                      <div class="form-tip">建议尺寸 800x800</div>
                    </el-form-item>
                </el-col>
            </el-row>
          </el-card>

          <!-- Card 2: Marketing & Pricing -->
          <el-card shadow="never" class="form-card">
            <template #header>
              <div class="card-header">营销与展示</div>
            </template>
            <el-row :gutter="40">
               <el-col :span="8">
                 <el-form-item label="展示价格">
                    <el-input-number v-model="form.displayPrice" :min="0" :precision="2" style="width: 100%;" />
                    <div class="form-tip">列表页起步价</div>
                 </el-form-item>
               </el-col>
               <el-col :span="8">
                 <el-form-item label="初始销量">
                    <el-input-number v-model="form.initialSales" :min="0" style="width: 100%;" />
                 </el-form-item>
               </el-col>
               <el-col :span="8">
                 <el-form-item label="好评度(%)">
                    <el-slider v-model="form.rating" :min="80" :max="100" show-input />
                 </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="40">
                <el-col :span="8">
                    <el-form-item label="角标标签">
                      <el-select v-model="form.badgeLabel" placeholder="请选择" clearable style="width: 100%;">
                        <el-option label="热卖" value="热卖" />
                        <el-option label="新品" value="新品" />
                        <el-option label="推荐" value="推荐" />
                        <el-option label="限量" value="限量" />
                        <el-option label="优惠" value="优惠" />
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                     <el-form-item label="加购配置">
                        <el-checkbox v-model="form.allowAddon">允许用户在下单时增加购买数量</el-checkbox>
                     </el-form-item>
                </el-col>
            </el-row>
          </el-card>

          <!-- Card 3: Details -->
          <el-card shadow="never" class="form-card">
            <template #header>
              <div class="card-header">
                  <span>商品详情</span>
                  <div class="header-actions">
                      <el-button size="small" @click="addDetailText"><el-icon><Document /></el-icon> 添加文本</el-button>
                      <el-button size="small" @click="addDetailImage"><el-icon><Picture /></el-icon> 添加图片</el-button>
                  </div>
              </div>
            </template>
            
            <div class="detail-module-list">
                 <div 
                    v-for="(mod, idx) in form.detailModules" 
                    :key="idx" 
                    class="detail-module-item"
                  >
                   <div class="module-actions">
                     <el-tag size="small" effect="plain">{{ mod.type === 'image' ? '图片模块' : '文本模块' }}</el-tag>
                     <div class="action-btns">
                        <el-button link :disabled="idx===0" @click="moveDetailModule(idx, -1)"><el-icon><ArrowUp /></el-icon></el-button>
                        <el-button link :disabled="idx===form.detailModules.length-1" @click="moveDetailModule(idx, 1)"><el-icon><ArrowDown /></el-icon></el-button>
                        <el-button link type="danger" @click="removeDetailModule(idx)"><el-icon><Delete /></el-icon></el-button>
                     </div>
                   </div>

                   <div class="module-display">
                      <div v-if="mod.type==='image'" class="module-image-trigger" @click="openImagePicker(idx)">
                        <el-image v-if="mod.content" :src="mod.content" class="module-img-preview" fit="contain" />
                        <div v-else class="image-placeholder">
                          <el-icon><Picture /></el-icon>
                          <span>点击选择图片</span>
                        </div>
                      </div>
                      <el-input 
                        v-else 
                        v-model="mod.content" 
                        type="textarea" 
                        :rows="3" 
                        placeholder="请输入段落文本" 
                      />
                   </div>
                 </div>
                 
                 <div v-if="form.detailModules.length === 0" class="empty-detail-tip">
                    暂无详情内容，请点击上方按钮添加
                 </div>
            </div>
          </el-card>

        </el-form>
      </div>
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
import { PictureFilled, Document, Picture, ArrowUp, ArrowDown, Delete } from '@element-plus/icons-vue'
import AdminImageSelector from '@/components/admin/base/AdminImageSelector.vue'
import StickyFormHeader from '@/components/admin/base/StickyFormHeader.vue'
import TagInputGroup from '@/components/admin/base/TagInputGroup.vue'
import { useAdminProductForm } from '@/composables/admin/useAdminProductForm'

definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], title: '商品编辑' })

const {
    formRef,
    form,
    rules,
    loading,
    isEdit,
    categories,
    imagePickerVisible,
    submitProduct,
    goBack,
    addDetailText,
    addDetailImage,
    removeDetailModule,
    moveDetailModule,
    openImagePicker,
    handleImageSelected
} = useAdminProductForm()

</script>

<style scoped>
.product-post-page { background-color: #f5f7fa; min-height: 100vh; padding-bottom: 40px; }
.main-body { max-width: 1000px; margin: 30px auto; padding: 0 20px; }
.form-card { margin-bottom: 20px; border-radius: 8px; border: none; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
.card-header { font-weight: 600; font-size: 15px; display: flex; justify-content: space-between; align-items: center; }
.img-upload-item :deep(.el-form-item__content) { justify-content: center; flex-direction: column; align-items: flex-start; }
.image-gallery-trigger { width: 140px; height: 140px; border: 1px dashed #dcdfe6; border-radius: 6px; cursor: pointer; position: relative; overflow: hidden; transition: all 0.3s; background: #fafafa; display: flex; align-items: center; justify-content: center; }
.image-gallery-trigger:hover { border-color: #409eff; }
.trigger-content { display: flex; flex-direction: column; align-items: center; color: #909399; }
.trigger-icon { font-size: 24px; margin-bottom: 8px; }
.trigger-img { width: 100%; height: 100%; }
.trigger-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.6); color: #fff; font-size: 12px; padding: 4px; text-align: center; opacity: 0; transition: opacity 0.3s; }
.image-gallery-trigger:hover .trigger-overlay { opacity: 1; }
.form-tip { font-size: 12px; color: #909399; margin-top: 4px; line-height: 1.4; }
.detail-module-item { background: #fdfdfd; border: 1px solid #ebeef5; border-radius: 6px; padding: 15px; margin-bottom: 15px; }
.module-actions { display: flex; justify-content: space-between; margin-bottom: 10px; }
.module-image-trigger { height: 200px; background: #f5f7fa; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px dashed #dcdfe6; }
.module-img-preview { max-height: 100%; max-width: 100%; }
.image-placeholder { display: flex; flex-direction: column; align-items: center; color: #c0c4cc; }
.empty-detail-tip { text-align: center; padding: 40px; color: #909399; background: #fafafa; border-radius: 6px; border: 1px dashed #dcdfe6; }
</style>
