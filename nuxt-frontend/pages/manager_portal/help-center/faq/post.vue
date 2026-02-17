<template>
  <div class="faq-post-page">
    <StickyFormHeader
      :title="isEdit ? '编辑问题' : '创建问题'"
      :back-path="adminRoute('help-center/faq')"
      :loading="submitting"
      @save="submitForm"
    >
      <template #extra>
         <!-- Extra buttons if needed -->
      </template>
    </StickyFormHeader>

    <div class="split-layout" v-loading="loading">
      <!-- Left: Editor Form -->
      <div class="editor-pane">
        <div class="form-card">
          <el-form :model="form" label-width="100px" class="faq-form" label-position="top">
            
            <el-row :gutter="20">
               <el-col :span="16">
                  <el-form-item label="问题标题" required>
                    <el-input v-model="form.question" placeholder="请输入问题，例如：如何进行虚拟充值？" size="large" />
                  </el-form-item>
               </el-col>
               <el-col :span="8">
                  <el-form-item label="问题分类" required>
                    <el-select v-model="form.categoryId" placeholder="请选择分类" style="width: 100%">
                      <el-option
                        v-for="cat in categories"
                        :key="cat.id"
                        :label="cat.name"
                        :value="cat.id"
                      />
                    </el-select>
                  </el-form-item>
               </el-col>
            </el-row>

            <el-form-item label="答案内容 (支持 Markdown)" required class="answer-editor-item">
              <el-input 
                v-model="form.answer" 
                type="textarea" 
                :rows="15" 
                placeholder="在此输入详细解答，右侧将实时预览..." 
                resize="vertical"
              />
              <div class="markdown-tips">
                 <span>支持 Markdown 语法:</span>
                 <el-tag size="small" type="info">**粗体**</el-tag>
                 <el-tag size="small" type="info">- 列表</el-tag>
                 <el-tag size="small" type="info">[链接](url)</el-tag>
              </div>
            </el-form-item>

            <el-collapse class="mt-4">
              <el-collapse-item title="高级配置" name="1">
                <el-row :gutter="20">
                   <el-col :span="12">
                      <el-form-item label="关联商品">
                        <el-select
                          v-model="form.productId"
                          filterable
                          remote
                          clearable
                          placeholder="搜索并选择关联的商品（可选）"
                          :remote-method="searchProducts"
                          :loading="productSearchLoading"
                          style="width: 100%"
                        >
                          <el-option
                            v-for="item in productOptions"
                            :key="item.id"
                            :label="item.product_name"
                            :value="item.id"
                          >
                            <div class="product-option">
                              <span>{{ item.product_name }}</span>
                              <span class="product-id-sub">{{ item.id }}</span>
                            </div>
                          </el-option>
                        </el-select>
                        <div class="form-tip">绑定后优先展示在商品详情页。</div>
                      </el-form-item>
                   </el-col>
                   <el-col :span="6">
                      <el-form-item label="排序权重">
                        <el-input-number v-model="form.sortOrder" :min="0" />
                      </el-form-item>
                   </el-col>
                   <el-col :span="6">
                      <el-form-item label="是否启用">
                        <el-switch v-model="form.isActive" />
                      </el-form-item>
                   </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>

          </el-form>
        </div>
      </div>

      <!-- Right: Preview Pane -->
      <div class="preview-pane">
        <div class="preview-header">
           <span class="preview-title">实时预览 (客户端效果)</span>
        </div>
        <div class="preview-content markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminFaqApi, type AdminFaqCategory } from '@/api/admin/help-center'
import { adminProductApi } from '@/api/admin/product'
import StickyFormHeader from '@/components/admin/base/StickyFormHeader.vue'
import { marked } from 'marked'
import { adminRoute } from '@/config/admin-routes'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const submitting = ref(false)
const isEdit = computed(() => !!route.query.id)

const categories = ref<AdminFaqCategory[]>([])
const productOptions = ref<any[]>([])
const productSearchLoading = ref(false)

const form = reactive({
  id: '',
  question: '',
  answer: '',
  categoryId: '',
  productId: '',
  sortOrder: 0,
  isActive: true
})

// Markdown Compilation
const compiledMarkdown = computed(() => {
  if (!form.answer) return '<div class="empty-preview">暂无内容</div>'
  try {
     return marked(form.answer)
  } catch (e) {
     return form.answer
  }
})

// Fetch initial data
const initData = async () => {
  loading.value = true
  try {
    // 1. Load Categories
    const catRes = await adminFaqApi.getCategories()
    if (catRes.success) categories.value = catRes.categories
    else categories.value = []

    // 2. If Edit, load FAQ
    if (isEdit.value) {
      const id = route.query.id as string
      const res = await adminFaqApi.getFaqById(id)
      if (res.success && res.faq) {
        form.id = res.faq.id
        form.question = res.faq.question
        form.answer = res.faq.answer
        form.categoryId = res.faq.category_id || ''
        form.productId = res.faq.product_id || ''
        form.sortOrder = res.faq.sort_order
        form.isActive = res.faq.is_active

        // Pre-load the product option if existing
        if (res.faq.product) {
          productOptions.value = [res.faq.product]
        }
      } else {
        ElMessage.error('加载问题数据失败')
        router.back()
      }
    }
  } finally {
    loading.value = false
  }
}

// Product Search
const searchProducts = async (query: string) => {
  if (query) {
    productSearchLoading.value = true
    try {
      const res = await adminProductApi.getProducts({ keyword: query, page_size: 10 })
      if (res.success) {
        productOptions.value = res.products
      }
    } finally {
      productSearchLoading.value = false
    }
  } else {
    productOptions.value = []
  }
}

const submitForm = async () => {
  if (!form.question || !form.answer || !form.categoryId) {
    ElMessage.warning('请填写完整信息')
    return
  }

  submitting.value = true
  try {
    const data = {
      question: form.question,
      answer: form.answer,
      category_id: form.categoryId,
      product_id: form.productId || undefined,
      sort_order: form.sortOrder,
      is_active: form.isActive
    }

    if (isEdit.value) {
      const res = await adminFaqApi.updateFaq(form.id, data)
      if (res.success) {
        ElMessage.success('更新成功')
        router.push(adminRoute('help-center/faq'))
      } else {
        ElMessage.error(res.error || '更新失败')
      }
    } else {
      const res = await adminFaqApi.createFaq(data)
      if (res.success) {
        ElMessage.success('创建成功')
        router.push(adminRoute('help-center/faq'))
      } else {
        ElMessage.error(res.error || '创建失败')
      }
    }
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  initData()
})
</script>

<style scoped>
.faq-post-page {
  /* Allow full width for split layout */
  padding: 0;
  height: calc(100vh - 140px); /* Adjust based on header */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.split-layout {
  display: flex;
  flex: 1;
  gap: 24px;
  padding: 24px;
  overflow: hidden;
}

.editor-pane {
  flex: 1;
  overflow-y: auto;
  min-width: 500px;
}

.preview-pane {
  flex: 1;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--el-border-color-lighter);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--el-box-shadow-lighter);
}

.preview-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  flex-shrink: 0;
}

.preview-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  line-height: 1.6;
}

.form-card {
  background: var(--el-bg-color);
  padding: 32px;
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-lighter);
  min-height: 100%;
}

.markdown-tips {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.empty-preview {
  color: #ccc;
  text-align: center;
  margin-top: 100px;
  font-style: italic;
}

.form-tip {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  margin-top: 4px;
}

/* Basic Markdown Styles for Preview */
.markdown-body :deep(h1), .markdown-body :deep(h2) {
    border-bottom: 1px solid #eaecef;
    padding-bottom: 0.3em;
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
}
.markdown-body :deep(h1) { font-size: 2em; }
.markdown-body :deep(h2) { font-size: 1.5em; }
.markdown-body :deep(p) { margin-top: 0; margin-bottom: 16px; }
.markdown-body :deep(ul), .markdown-body :deep(ol) { padding-left: 2em; margin-bottom: 16px; }
.markdown-body :deep(blockquote) {
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    padding: 0 1em;
    margin: 0 0 16px 0;
}
.markdown-body :deep(code) {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27,31,35,0.05);
    border-radius: 3px;
}
.markdown-body :deep(pre) {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
    margin-bottom: 16px;
}
.markdown-body :deep(pre code) {
    background-color: transparent;
    padding: 0;
}
.markdown-body :deep(a) { color: #0366d6; text-decoration: none; }
.markdown-body :deep(a:hover) { text-decoration: underline; }
.markdown-body :deep(img) { max-width: 100%; box-sizing: content-box; background-color: #fff; }

.product-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-id-sub {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
</style>
