<template>
  <div class="fulfillment-recharge">
    <div class="fulfillment-header">为完成本次充值，请填写以下必要信息：</div>

    <!-- Form Area -->
    <div class="form-container" :class="{ 'is-locked': isLocked }">
      <div v-for="field in orderFulfillmentFields" :key="field.id" class="form-item">
        <label :for="field.id" class="form-label">
          {{ field.label }}
          <span v-if="field.required" class="required-star">*</span>
        </label>
        <div class="input-wrapper">
          <input
            :id="field.id"
            v-model="formData[field.id]"
            :placeholder="'请输入' + field.label"
            :disabled="isLocked"
            class="form-input"
          />
        </div>
      </div>

      <!-- Action Button -->
      <div v-if="!isLocked || isRejected" class="form-actions">
        <button 
          class="submit-btn" 
          @click="handleSubmit"
          :disabled="isSubmitting"
        >
          {{ isRejected ? '修改并重新提交' : '提交信息' }}
        </button>
      </div>
      <div v-else-if="isPending" class="status-msg info">
        已提交，待处理
      </div>
    </div>

    <!-- Records Area -->
    <div v-if="records && records.length > 0" class="records-container">
      <div class="records-title">提交记录</div>
      <div class="records-list">
        <div v-for="(record, index) in sortedRecords" :key="index" class="record-item">
          <div class="record-dot"></div>
          <div class="record-main">
            <div class="record-header">
              <span class="record-time">{{ record.create_time }}</span>
              <span class="record-status" :class="record.status">
                {{ getStatusText(record.status) }}
              </span>
            </div>
            <div v-if="record.reject_reason" class="reject-reason">
              驳回原因：{{ record.reject_reason }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Field {
  id: string;
  label: string;
  required: boolean;
}

interface Record {
  create_time: string;
  status: 'submitted' | 'rejected' | 'processed';
  reject_reason?: string;
}

const props = defineProps<{
  orderFulfillmentFields: Field[];
  records: Record[];
  orderStatus: string;
}>()

const emit = defineEmits(['submit'])

const formData = ref<{ [key: string]: string }>({})
const isSubmitting = ref(false)

// Logic states based on records
const sortedRecords = computed(() => {
  return [...props.records].sort((a, b) => 
    new Date(b.create_time).getTime() - new Date(a.create_time).getTime()
  )
})

const lastRecord = computed(() => sortedRecords.value[0])
const isLocked = computed(() => {
  if (!lastRecord.value) return false
  return lastRecord.value.status === 'submitted' || lastRecord.value.status === 'processed'
})
const isRejected = computed(() => lastRecord.value?.status === 'rejected')
const isPending = computed(() => lastRecord.value?.status === 'submitted')

const getStatusText = (status: string) => {
  const map: any = {
    'submitted': '已提交',
    'rejected': '已驳回',
    'processed': '已处理'
  }
  return map[status] || status
}

const handleSubmit = async () => {
  // Simple validation
  for (const field of props.orderFulfillmentFields) {
    if (field.required && !formData.value[field.id]) {
      alert(`请填写${field.label}`)
      return
    }
  }

  isSubmitting.value = true
  // In real implementation, this would call an API
  emit('submit', { ...formData.value })
  isSubmitting.value = false
}

// Initializing form data if needed (e.g. from previous records or empty)
onMounted(() => {
  props.orderFulfillmentFields.forEach(f => {
    formData.value[f.id] = ''
  })
})
</script>

<style scoped>
.fulfillment-recharge {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.fulfillment-header {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-left: 12px;
  border-left: 4px solid #2563EB;
}

.form-container {
  margin-bottom: 32px;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.required-star {
  color: #DC2626;
  margin-left: 4px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-input:disabled {
  background: #F9FAFB;
  cursor: not-allowed;
}

.form-actions {
  margin-top: 24px;
  text-align: center;
}

.submit-btn {
  background: #2563EB;
  color: #fff;
  padding: 12px 48px;
  border-radius: 24px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.submit-btn:hover {
  background: #1D4ED8;
  transform: translateY(-1px);
}

.submit-btn:active {
  transform: translateY(0);
}

.status-msg {
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
}
.status-msg.info {
  background: #EFF6FF;
  color: #2563EB;
}

/* Records */
.records-container {
  border-top: 1px solid #F3F4F6;
  padding-top: 24px;
}

.records-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.record-item {
  display: flex;
  gap: 12px;
}

.record-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #D1D5DB;
  margin-top: 6px;
  flex-shrink: 0;
}

.record-main {
  flex: 1;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.record-time {
  font-size: 13px;
  color: #999;
}

.record-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.record-status.submitted { background: #E0F2FE; color: #0369A1; }
.record-status.rejected { background: #FEE2E2; color: #B91C1C; }
.record-status.processed { background: #DCFCE7; color: #15803D; }

.reject-reason {
  font-size: 13px;
  color: #B91C1C;
  background: #FEF2F2;
  padding: 8px 12px;
  border-radius: 6px;
  margin-top: 8px;
}
</style>
