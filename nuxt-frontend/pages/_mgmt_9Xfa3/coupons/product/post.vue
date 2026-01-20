<template>
  <div class="coupon-post-page">
    <StickyFormHeader
      :title="isEdit ? '编辑商品券' : '新增商品券'"
      :sub-title="isEdit ? '修改商品券信息' : '创建一个新的指定商品优惠券'"
      :submit-text="isEdit ? '保存' : '新增'"
      :loading="submitting"
      @submit="handleSubmit"
      @cancel="router.back()"
      @back="router.back()"
    />

    <div class="form-content">
      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        label-width="120px" 
        label-position="top"
        size="large"
      >
        <el-card shadow="never" class="form-card">
          <template #header>
            <div class="card-header">
              <span>基础信息</span>
            </div>
          </template>
          
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="优惠券名称" prop="name">
                <el-input v-model="form.name" placeholder="例如：iPhone 15 专属优惠券" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider content-position="left">发放规则</el-divider>

          <!-- Removed Total Quantity field per user request -->
           <el-form-item label="有效期">
            <div class="date-picker-wrapper">
              <div class="date-text" v-if="!isUnlimitedDate">
                <span class="label">开始：</span>
                <span class="value">{{ formatDate(form.startDate) }}</span>
              </div>
              <el-date-picker
                v-if="!isUnlimitedDate"
                v-model="form.endDate"
                type="date"
                placeholder="选择结束日期"
                value-format="YYYY-MM-DD"
                style="flex: 1; margin: 0 12px"
                :disabled-date="disabledDate"
              />
              <el-checkbox v-model="isUnlimitedDate" label="永久有效" border />
            </div>
            <div class="form-tip" v-if="!isUnlimitedDate">默认从今日开始生效，请选择截止日期</div>
          </el-form-item>
        </el-card>

        <!-- Product Selection -->
        <el-card shadow="never" class="form-card">
          <template #header>
            <div class="card-header">
              <span>关联商品 SKU</span>
              <el-tag type="info" size="small" style="margin-left: 8px">购买指定 SKU 时可用</el-tag>
            </div>
          </template>
          
          <div class="product-selector">
             <AdminSkuSelector 
               v-model="form.skuInfos"
               :categories="categoryList"
               :products="allProductList"
             />

             <el-table :data="form.skuInfos" style="width: 100%; margin-top: 16px" border empty-text="暂无关联 SKU">
               <el-table-column prop="productName" label="商品名称" />
               <el-table-column prop="spec" label="规格 (SKU)" />
               <el-table-column label="操作" width="100" align="center">
                 <template #default="{ $index }">
                   <el-button link type="danger" @click="handleRemoveSku($index)">移除</el-button>
                 </template>
               </el-table-column>
             </el-table>
          </div>
        </el-card>

        <!-- Preview -->
        <el-card shadow="never" class="form-card" style="margin-top: 24px">
           <template #header>
            <div class="card-header">
              <span>效果预览</span>
            </div>
          </template>
          <div class="preview-container">
             <div class="coupon-ticket product-ticket">
               <div class="ticket-left">
                 <div class="ticket-amount">
                   <small>¥</small>{{ form.value || '0' }}
                 </div>
                 <div class="ticket-cond">指定商品</div>
               </div>
               <div class="ticket-right">
                 <div class="ticket-name">{{ form.name || '优惠券名称' }}</div>
                 <div class="ticket-date">{{ isUnlimitedDate ? '永久有效' : `${formatDate(form.startDate)} 至 ${form.endDate || '?'}` }}</div>
                 <div class="ticket-btn">去购买</div>
               </div>
             </div>

          </div>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import StickyFormHeader from '@/components/admin/base/StickyFormHeader.vue'
import AdminSkuSelector from '@/components/admin/base/AdminSkuSelector.vue'
import { adminApi, adminCategoryApi, adminProductApi } from '@/api/admin-supabase'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const submitting = ref(false)
const id = route.query.id as string
const isEdit = computed(() => !!id)

const isUnlimitedDate = ref(false)
const categoryList = ref<any[]>([])
const allProductList = ref<any[]>([])

const form = reactive({
  name: '',
  value: 0,
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: '',
  skuInfos: [] as { id: string, productName: string, spec: string }[],
  totalQuantity: 1000,
  status: true
})

const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  value: [{ required: true, message: '请输入优惠金额', trigger: 'blur' }]
}

const formatDate = (d: string) => dayjs(d).format('YYYY-MM-DD')
const disabledDate = (time: Date) => {
  return dayjs(time).isBefore(dayjs(), 'day')
}

watch(isUnlimitedDate, (val) => {
    if (val) form.endDate = ''
})



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

const loadData = async () => {
  // Load dependencies header
  try {
    const [catRes, prodRes] = await Promise.all([
        adminCategoryApi.getCategories(),
        adminProductApi.getProducts({ page_size: 1000 }) 
    ])
    if (catRes.success) categoryList.value = catRes.categories || []
    if (prodRes.success) allProductList.value = prodRes.products || []
  } catch (e) {
    console.error('Failed to load dependency data')
  }

  if (!id) return
  
  const res = await adminApi.coupon.getCouponById(id)
  if (res.success && res.coupon) {
    const target = res.coupon
    form.name = target.name
    form.value = Number(target.value)
    form.status = target.status
    form.startDate = target.start_date ? dayjs(target.start_date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
    form.totalQuantity = target.total_quantity || 1000

    if (!target.end_date) {
        isUnlimitedDate.value = true
        form.endDate = ''
    } else {
        isUnlimitedDate.value = false
        form.endDate = dayjs(target.end_date).format('YYYY-MM-DD')
    }
    
    // Restore SKUs
    if (target.sku_ids && target.sku_ids.length) {
        const skuRes = await adminProductApi.getSkusByIds(target.sku_ids)
        if (skuRes.success && skuRes.skus) {
            form.skuInfos = skuRes.skus.map(s => ({
                id: s.id,
                productName: s.productName || '未知商品',
                spec: formatSkuName(s)
            }))
        }
    }
  } else {
    ElMessage.error(res.error || '获取详情失败')
  }
}

const handleRemoveSku = (index: number) => {
    form.skuInfos.splice(index, 1)
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (form.skuInfos.length === 0) {
          ElMessage.warning('请至少添加一个关联商品 SKU')
          return
      }

      if (!isUnlimitedDate.value && !form.endDate) {
          ElMessage.warning('请选择结束日期')
          return
      }

      submitting.value = true
      try {
        const payload = {
            name: form.name,
            type: 'product' as const,
            value: form.value,
            sku_ids: form.skuInfos.map(s => s.id),
            min_usage: 0,
            total_quantity: 0,
            start_date: isUnlimitedDate.value ? null : form.startDate,
            end_date: isUnlimitedDate.value ? null : form.endDate,
            status: form.status
        }
        let res
        if (isEdit.value) {
            res = await adminApi.coupon.updateCoupon(id, payload)
        } else {
            res = await adminApi.coupon.createCoupon(payload)
        }
        if (res.success) {
            ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
            router.back()
        } else {
            ElMessage.error(res.error || '保存失败')
        }
      } catch (e) {
        ElMessage.error('保存异常')
      } finally {
        submitting.value = false
      }
    }
  })
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.form-content {
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 24px;
}
.form-card {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
}
.card-header {
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.date-picker-wrapper {
  display: flex;
  align-items: center;
}
.selector-controls {
    display: flex;
    align-items: center;
}

.preview-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}
.coupon-ticket {
  display: flex;
  width: 340px;
  height: 110px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  position: relative;
}
.product-ticket .ticket-left {
  width: 110px;
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.product-ticket .ticket-left::after {
  content: '';
  position: absolute;
  right: -5px;
  top: 0;
  bottom: 0;
  width: 10px;
  background-image: radial-gradient(#fff 5px, transparent 0);
  background-size: 10px 10px;
  background-position: -5px 0; 
}
.ticket-amount {
  font-size: 32px;
  font-weight: 800;
  line-height: 1;
}
.ticket-amount small {
  font-size: 14px;
  margin-right: 2px;
}
.ticket-cond {
  font-size: 12px;
  margin-top: 6px;
  opacity: 0.9;
}
.ticket-right {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.ticket-name {
  font-weight: bold;
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
}
.ticket-date {
  font-size: 11px;
  color: #999;
  margin-bottom: auto;
}
.ticket-btn {
  align-self: flex-end;
  background: #6a85b6;
  color: #fff;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
}
</style>
