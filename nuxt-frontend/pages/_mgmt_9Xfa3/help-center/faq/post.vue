<template>
  <div class="faq-post-page">
    <div class="page-header">
      <div class="header-left">
        <el-button link @click="$router.back()">
          <el-icon><ArrowLeft /></el-icon> 返回列表
        </el-button>
        <h2 class="page-title">{{ isEdit ? '编辑问题' : '创建问题' }}</h2>
      </div>
    </div>

    <div class="form-card" v-loading="loading">
      <el-form :model="form" label-width="120px" class="faq-form">
        
        <el-form-item label="问题标题" required>
          <el-input v-model="form.question" placeholder="请输入问题，例如：如何进行虚拟充值？" size="large" />
        </el-form-item>

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

        <el-divider border-style="dashed" content-position="left">详细解答</el-divider>

        <el-form-item label="答案内容" required>
          <el-input 
            v-model="form.answer" 
            type="textarea" 
            :rows="8" 
            placeholder="请输入详细解答..." 
          />
          <div class="form-tip">支持基本的文本内容，将直接显示在客户端。</div>
        </el-form-item>

        <el-divider border-style="dashed" content-position="left">高级配置</el-divider>

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
          <div class="form-tip">
            绑定后，该问题将优先展示在对应商品的详情页中。
          </div>
        </el-form-item>

        <el-form-item label="排序权重">
          <el-input-number v-model="form.sortOrder" :min="0" />
          <div class="form-tip">数值越小越靠前</div>
        </el-form-item>

        <el-form-item label="是否启用">
          <el-switch v-model="form.isActive" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="submitting" size="large">
            {{ isEdit ? '保存修改' : '立即发布' }}
          </el-button>
          <el-button @click="$router.back()" size="large">取消</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminFaqApi, type AdminFaqCategory } from '@/api/admin/help-center'
import { adminProductApi } from '@/api/admin/product'

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

// Fetch initial data
const initData = async () => {
  loading.value = true
  try {
    // 1. Load Categories
    const catRes = await adminFaqApi.getCategories()
    if (catRes.success) categories.value = catRes.categories

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
        router.push('/_mgmt_9Xfa3/help-center/faq')
      } else {
        ElMessage.error(res.error || '更新失败')
      }
    } else {
      const res = await adminFaqApi.createFaq(data)
      if (res.success) {
        ElMessage.success('创建成功')
        router.push('/_mgmt_9Xfa3/help-center/faq')
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
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.page-title {
  margin: 0;
  font-size: 24px;
}

/* ... existing styles ... */
.form-card {
  background: var(--el-bg-color);
  padding: 40px;
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-lighter);
}

.faq-form {
  max-width: 100%;
}

.form-tip {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  margin-top: 4px;
}

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
