<template>
  <div class="mobile-submit-form">
    <!-- Header Tip -->
    <div class="form-tip">
       <el-icon><InfoFilled /></el-icon>
       <span>请填写以下信息以进行充值</span>
    </div>

    <!-- Form Fields -->
    <div class="fields-container">
       <div v-for="field in fields" :key="field.key" class="field-item">
          <label>{{ field.label }}</label>
          <div class="input-wrapper">
             <input v-model="formData[field.key]" :placeholder="'请输入' + field.label" class="input-glass" />
          </div>
       </div>
    </div>

    <!-- Status Feedback -->
    <div v-if="latestStatus" class="status-banner" :class="latestStatus">
       <!-- Submitted -->
       <div v-if="latestStatus === 'submitted'" class="status-content">
          <div class="icon-spin"><el-icon><Loading /></el-icon></div>
          <div class="text">
             <div class="t-title">审核中</div>
             <div class="t-desc">您的回执已提交，请耐心等待...</div>
          </div>
       </div>
       <!-- Approved -->
       <div v-else-if="latestStatus === 'approved'" class="status-content">
          <div class="icon"><el-icon><CircleCheck /></el-icon></div>
          <div class="text">
             <div class="t-title">已通过</div>
             <div class="t-desc">充值已完成，请检查到账情况。</div>
          </div>
       </div>
       <!-- Rejected -->
       <div v-else-if="latestStatus === 'rejected'" class="status-content">
          <div class="icon"><el-icon><CircleClose /></el-icon></div>
          <div class="text">
             <div class="t-title">已驳回</div>
             <div class="t-desc">原因: {{ latestRejectReason }}</div>
          </div>
       </div>
    </div>

    <!-- Actions -->
    <div class="form-actions">
        <button 
           v-if="!latestStatus || latestStatus === 'rejected'" 
           class="action-btn primary" 
           :disabled="isSubmitting"
           @click="handleInsert"
        >
           {{ isSubmitting ? '提交中...' : (latestStatus === 'rejected' ? '重新提交' : '提交回执') }}
        </button>

        <button 
           v-if="latestStatus === 'submitted'" 
           class="action-btn secondary" 
           :disabled="isSubmitting"
           @click="handleUpdate"
        >
           {{ isSubmitting ? '保存中...' : '修改信息' }}
        </button>
        
        <button 
           v-if="latestStatus === 'approved'" 
           class="action-btn outline" 
           :disabled="isSubmitting"
           @click="handleInsert"
        >
           再次提交
        </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useToast } from '@/composables/mobile/useToast'
import { Loading, CircleCheck, CircleClose, InfoFilled } from '@element-plus/icons-vue'
import { useFulfillmentSubmit } from '@/composables/client/useFulfillmentSubmit'

interface FulfillmentField {
  key: string
  label: string
}

const props = defineProps<{
  orderId: string
  orderStatus: string
  cdkFields: FulfillmentField[]
  cdkId?: string
}>()

const emit = defineEmits(['submit-success'])
const { showToast } = useToast()

const {
  formData,
  latestStatus,
  latestRejectReason,
  isSubmitting,
  fields,
  fetchLatestFulfillment,
  handleInsert,
  handleUpdate
} = useFulfillmentSubmit({
  orderId: () => props.orderId,
  cdkId: () => props.cdkId,
  cdkFields: () => props.cdkFields,
  onSuccess: (msg) => showToast(msg, 'success'),
  onError: (msg) => showToast(msg, 'error'),
  onCallback: () => emit('submit-success')
})

onMounted(fetchLatestFulfillment)
</script>

<style scoped>
.mobile-submit-form {
    display: flex; flex-direction: column; gap: 16px;
    background: #1E293B; border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; padding: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.form-tip {
    font-size: 13px; color: #94A3B8; display: flex; align-items: center; gap: 6px;
    padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
}

.fields-container { display: flex; flex-direction: column; gap: 16px; margin-top: 4px; }
.field-item label { 
    display: block; font-size: 12px; color: #CBD5E1; margin-bottom: 6px; font-weight: 500;
}
.input-glass {
    width: 100%;
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 12px;
    color: #fff; font-size: 14px;
    transition: all 0.2s;
}
.input-glass:focus {
    outline: none; border-color: #3B82F6; background: rgba(59, 130, 246, 0.1);
}

/* Status Banner */
.status-banner {
    background: rgba(255,255,255,0.05); border-radius: 12px; padding: 12px;
    border: 1px solid rgba(255,255,255,0.05);
}
.status-content { display: flex; gap: 12px; align-items: flex-start; }
.icon, .icon-spin { font-size: 20px; margin-top: 2px; }
.icon-spin { animation: spin 1s linear infinite; color: #3B82F6; }

.status-banner.approved { background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); }
.status-banner.approved .icon { color: #10B981; }
.status-banner.approved .t-title { color: #10B981; }

.status-banner.rejected { background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); }
.status-banner.rejected .icon { color: #EF4444; }
.status-banner.rejected .t-title { color: #EF4444; }

.text { flex: 1; }
.t-title { font-size: 14px; font-weight: 600; margin-bottom: 2px; color: #E2E8F0; }
.t-desc { font-size: 12px; color: #94A3B8; line-height: 1.4; }

@keyframes spin { 100% { transform: rotate(360deg); } }

/* Actions */
.form-actions { display: flex; gap: 12px; margin-top: 4px; }
.action-btn {
    flex: 1; padding: 12px; border-radius: 12px; font-weight: 600; font-size: 14px;
    border: none; cursor: pointer; display: flex; justify-content: center; align-items: center;
}
.action-btn.primary {
    background: linear-gradient(90deg, #3B82F6, #2563EB); color: #fff;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}
.action-btn.secondary {
    background: rgba(255,255,255,0.1); color: #E2E8F0;
}
.action-btn.outline {
    background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #CBD5E1;
}
.action-btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
