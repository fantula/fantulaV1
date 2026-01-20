<template>
  <div class="coupon-post-page">
    <StickyFormHeader
      :title="isEdit ? '编辑额度券' : '新增额度券'"
      :sub-title="isEdit ? '修改额度券信息' : '创建一个新的余额充值券'"
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
        <!-- Basic Info -->
        <el-card shadow="never" class="form-card">
          <template #header>
            <div class="card-header">
              <span>基础信息</span>
            </div>
          </template>
          
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="优惠券名称" prop="name">
                <el-input v-model="form.name" placeholder="例如：新用户首充福利" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="赠送余额 (元)" prop="value">
                <el-input-number 
                  v-model="form.value" 
                  :min="0.01" 
                  :precision="2" 
                  controls-position="right" 
                  style="width: 100%"
                >
                  <template #prefix>¥</template>
                </el-input-number>
                <div class="form-tip">用户领券后直接增加到账户余额的金额</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
            </el-col>
          </el-row>

          <!-- Removed Total Quantity field per user request -->

          <el-divider content-position="left">发放规则</el-divider>

          <!-- Removed Distribution Mode fields as they are handled in Step 2 now -->

          <el-form-item label="状态" prop="status">
            <el-switch v-model="form.status" active-text="立即启用" inactive-text="暂不启用" />
          </el-form-item>
        </el-card>

        <!-- Preview (Optional) -->
        <el-card shadow="never" class="form-card" style="margin-top: 24px">
           <template #header>
            <div class="card-header">
              <span>效果预览</span>
            </div>
          </template>
          <div class="preview-container">
             <div class="coupon-ticket">
               <div class="ticket-left">
                 <div class="ticket-amount">¥{{ form.value || '0' }}</div>
                 <div class="ticket-label">余额红包</div>
               </div>
               <div class="ticket-right">
                 <div class="ticket-name">{{ form.name || '优惠券名称' }}</div>
                 <div class="ticket-date">{{ isUnlimitedDate ? '永久有效' : `${formatDate(form.startDate)} 至 ${form.endDate || '?'}` }}</div>
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
import { adminApi } from '@/api/admin-supabase'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const submitting = ref(false)
const id = route.query.id as string
const isEdit = computed(() => !!id)

const isUnlimitedDate = ref(false)

const form = reactive({
  name: '',
  value: 0,
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: '',
  totalQuantity: 1000,
  status: true
})

const rules = {
  name: [{ required: true, message: '请输入优惠券名称', trigger: 'blur' }],
  value: [{ required: true, message: '请输入赠送金额', trigger: 'blur' }]
}

const formatDate = (d: string) => dayjs(d).format('YYYY-MM-DD')
const disabledDate = (time: Date) => {
  return dayjs(time).isBefore(dayjs(), 'day')
}

watch(isUnlimitedDate, (val) => {
    if (val) form.endDate = ''
})

const loadData = async () => {
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
  } else {
    ElMessage.error(res.error || '获取详情失败')
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (!isUnlimitedDate.value && !form.endDate) {
          ElMessage.warning('请选择结束日期')
          return
      }
      
      submitting.value = true
      try {
        const payload = {
            name: form.name,
            type: 'balance' as const,
            value: form.value,
            product_ids: [],
            min_usage: 0,
            total_quantity: 0,
            start_date: isUnlimitedDate.value ? null : form.startDate,
            end_date: isUnlimitedDate.value ? null : form.endDate,
            status: form.status
        }
// ...

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
}
.form-tip {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  line-height: 1.4;
  margin-top: 4px;
}
.date-picker-wrapper {
  display: flex;
  align-items: center;
}

/* Coupon Preview Style */
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
  height: 100px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow: hidden;
  border: 1px solid #eba441;
}
.ticket-left {
  width: 100px;
  background: linear-gradient(135deg, #fce38a 0%, #f38181 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.ticket-amount {
  font-size: 24px;
  font-weight: bold;
}
.ticket-label {
  font-size: 12px;
  opacity: 0.9;
}
.ticket-right {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ticket-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}
.ticket-date {
  font-size: 12px;
  color: #999;
}
</style>
