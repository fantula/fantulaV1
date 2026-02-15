<template>
  <div class="coupon-post-page">
    <StickyFormHeader
      :title="isEdit ? '编辑立减券' : '新增立减券'"
      :sub-title="isEdit ? '修改立减券信息' : '创建一个新的满减优惠券'"
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
                <el-input v-model="form.name" placeholder="例如：满100减10促销" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="减免金额" prop="value">
                <el-input-number 
                  v-model="form.value" 
                  :min="0.01" 
                  :precision="2" 
                  controls-position="right" 
                  style="width: 100%"
                >
                  <template #prefix>¥</template>
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最低使用金额" prop="minUsage">
                <el-input-number 
                  v-model="form.minUsage" 
                  :min="0" 
                  :precision="2" 
                  controls-position="right" 
                  style="width: 100%"
                >
                  <template #prefix>¥</template>
                </el-input-number>
                <div class="form-tip">订单满多少元可用（0表示无门槛）</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" prop="status">
                <el-switch v-model="form.status" active-text="启用" inactive-text="停用" />
              </el-form-item>
            </el-col>
          </el-row>
          
          <!-- Removed Total Quantity field per user request -->

          <el-divider content-position="left">发放规则</el-divider>

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

        <el-card shadow="never" class="form-card" style="margin-top: 24px">
           <template #header>
            <div class="card-header">
              <span>效果预览</span>
            </div>
          </template>
          <div class="preview-container">
             <div class="coupon-ticket flat-ticket">
               <div class="ticket-left">
                 <div class="ticket-amount">
                   <small>¥</small>{{ form.value || '0' }}
                 </div>
                 <div class="ticket-cond">满 {{ form.minUsage }} 可用</div>
               </div>
               <div class="ticket-right">
                 <div class="ticket-name">{{ form.name || '优惠券名称' }}</div>
                 <div class="ticket-date">{{ isUnlimitedDate ? '永久有效' : `${formatDate(form.startDate)} 至 ${form.endDate || '?'}` }}</div>
                 <div class="ticket-btn">立即领取</div>
               </div>
             </div>

          </div>
        </el-card>

      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import StickyFormHeader from '@/components/admin/base/StickyFormHeader.vue'
import { adminApi } from '@/api/admin'

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
  minUsage: 0,
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: '',
  totalQuantity: 1000,
  status: true
})

const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  value: [{ required: true, message: '请输入减免金额', trigger: 'blur' }]
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
    form.minUsage = Number(target.min_usage)
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
            type: 'flat' as const,
            value: form.value,
            product_ids: [],
            min_usage: form.minUsage,
            total_quantity: 0, // Default to 0 (unlimited)
            start_date: isUnlimitedDate.value ? null : form.startDate,
            end_date: isUnlimitedDate.value ? null : form.endDate,
            status: form.status
        }
        
        // ... (removed obsolete payload fields)

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
.flat-ticket .ticket-left {
  width: 110px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.flat-ticket .ticket-left::after {
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
  background: #ff4757;
  color: #fff;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
}
</style>
