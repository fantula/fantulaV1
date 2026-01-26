<template>
  <BaseFormModal
    v-model:visible="visible"
    title="申请退款"
    subtitle="退款申请将在 1-3 个工作日内处理"
    submit-text="提交申请"
    :loading="submitting"
    :submit-disabled="!isValid"
    show-mascot
    @close="handleClose"
    @cancel="handleClose"
    @submit="handleSubmit"
  >
    <div class="refund-form">
      <!-- Order Info -->
      <div class="info-box">
        <div class="label">订单号</div>
        <div class="value">{{ orderNo }}</div>
      </div>

      <!-- Warning -->
      <div class="warning-box">
        <el-icon><Warning /></el-icon>
        <span>申请退款后，商品将立即冻结无法使用。如有疑问建议先联系客服。</span>
      </div>

      <!-- Reason Selection -->
      <div class="form-group">
        <label>退款原因 <span class="required">*</span></label>
        <div class="reason-options">
          <div 
            v-for="r in reasons" 
            :key="r"
            class="reason-tag"
            :class="{ active: form.reason === r }"
            @click="form.reason = r"
          >
            {{ r }}
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label>补充说明</label>
        <textarea 
          v-model="form.detail" 
          class="form-textarea" 
          rows="3" 
          placeholder="请填写详细说明（选填）..."
        ></textarea>
      </div>

    </div>
  </BaseFormModal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import BaseFormModal from '@/components/pc/modal/base/BaseFormModal.vue'
import { Warning } from '@element-plus/icons-vue'
import { clientOrderApi } from '@/api/client/order'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: boolean
  orderId: string
  orderNo: string
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const submitting = ref(false)
const form = reactive({
  reason: '',
  detail: ''
})

const reasons = [
  '买错了/不需要了',
  '商品无法使用',
  '发货速度太慢',
  '商品描述不符',
  '其他原因'
]

const isValid = computed(() => !!form.reason)

const handleClose = () => {
  visible.value = false
}

const handleSubmit = async () => {
  if (!isValid.value) return
  
  submitting.value = true
  try {
    const res = await clientOrderApi.createRefundRequest(
      props.orderId,
      form.reason,
      form.detail
    )
    
    if (res.success) {
      ElMessage.success('退款申请已提交')
      emit('success')
      handleClose()
    } else {
      ElMessage.error(res.error || '提交失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '系统错误')
  } finally {
    submitting.value = false
  }
}

// Reset form on open
watch(() => props.modelValue, (val) => {
  if (val) {
    form.reason = ''
    form.detail = ''
  }
})
</script>

<style scoped>
.refund-form {
  display: flex; flex-direction: column; gap: 20px;
}

.info-box {
  background: rgba(255,255,255,0.03);
  padding: 12px 16px; border-radius: 8px;
  display: flex; justify-content: space-between;
  font-size: 14px;
}
.info-box .label { color: #94A3B8; }
.info-box .value { color: #E2E8F0; font-family: monospace; }

.warning-box {
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.2);
  border-radius: 8px;
  padding: 12px;
  display: flex; gap: 8px; align-items: start;
  color: #FCD34D; font-size: 13px; line-height: 1.4;
}

.form-group label {
  display: block; font-size: 14px; color: #E2E8F0; margin-bottom: 8px; font-weight: 500;
}
.required { color: #EF4444; }

.reason-options {
  display: flex; flex-wrap: wrap; gap: 10px;
}
.reason-tag {
  padding: 10px 18px;
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  color: #94A3B8; font-size: 13px; cursor: pointer;
  transition: all 0.3s;
  position: relative;
}
.reason-tag:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.2);
  color: #F1F5F9;
  transform: translateY(-1px);
}
.reason-tag.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.1));
  border-color: rgba(59, 130, 246, 0.5);
  color: #60A5FA;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  font-weight: 600;
}

.form-textarea {
  width: 100%;
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 12px;
  color: #F1F5F9;
  font-size: 14px;
  resize: vertical;
  transition: border-color 0.2s;
}
.form-textarea:focus {
  outline: none;
  border-color: #3B82F6;
}
</style>
