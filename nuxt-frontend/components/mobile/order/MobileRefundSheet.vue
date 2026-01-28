<template>
  <div v-if="visible" class="sheet-mask" @click="handleClose">
    <div class="sheet-panel" @click.stop>
       <div class="sheet-header">
          <div class="title">申请退款</div>
          <div class="close-btn" @click="handleClose"><el-icon><Close /></el-icon></div>
       </div>

       <div class="sheet-body">
          <div class="warning-tip">
             <el-icon><Warning /></el-icon>
             申请退款后商品将立即冻结，如有疑问请先联系客服。
             订单号: {{ orderNo }}
          </div>

          <!-- Reasons -->
          <div class="form-section">
             <div class="label">退款原因</div>
             <div class="reason-chips">
                <div 
                   v-for="r in reasons" 
                   :key="r" 
                   class="chip"
                   :class="{ active: form.reason === r }"
                   @click="form.reason = r"
                >
                   {{ r }}
                </div>
             </div>
          </div>

          <!-- Detail -->
          <div class="form-section">
             <div class="label">详细说明</div>
             <textarea 
                v-model="form.detail" 
                class="desc-input" 
                placeholder="请填写详细说明（选填）"
                rows="3"
             ></textarea>
          </div>

          <button 
             class="submit-btn" 
             :disabled="!form.reason || submitting"
             @click="handleSubmit"
          >
             {{ submitting ? '提交中...' : '提交申请' }}
          </button>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Close, Warning } from '@element-plus/icons-vue'
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

const reasons = ['买错了/不需要了', '商品无法使用', '发货速度太慢', '商品描述不符', '其他原因']

const handleClose = () => visible.value = false

const handleSubmit = async () => {
    if (!form.reason) return
    submitting.value = true
    try {
        const res = await clientOrderApi.createRefundRequest(props.orderId, form.reason, form.detail)
        if (res.success) {
            ElMessage.success('已提交申请')
            emit('success')
            handleClose()
            // Reset
            form.reason = ''
            form.detail = ''
        } else {
            ElMessage.error(res.error || '提交失败')
        }
    } catch(e: any) { ElMessage.error(e.message) }
    finally { submitting.value = false }
}
</script>

<style scoped>
.sheet-mask {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(2px);
    display: flex; flex-direction: column; justify-content: flex-end;
}

.sheet-panel {
    background: #1E293B;
    border-top-left-radius: 20px; border-top-right-radius: 20px;
    padding-bottom: env(safe-area-inset-bottom);
    animation: slideUp 0.3s ease-out;
    max-height: 85vh; display: flex; flex-direction: column;
}

@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

.sheet-header {
    padding: 16px; display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.title { font-size: 16px; font-weight: 700; color: #fff; }
.close-btn { color: #94A3B8; font-size: 20px; padding: 4px; }

.sheet-body { padding: 16px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; }

.warning-tip {
    background: rgba(234, 179, 8, 0.1); color: #FCD34D;
    padding: 10px; border-radius: 8px; font-size: 12px;
    display: flex; gap: 6px; line-height: 1.4;
}

.form-section { display: flex; flex-direction: column; gap: 10px; }
.label { color: #E2E8F0; font-size: 14px; font-weight: 500; }

.reason-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
    padding: 8px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px; color: #94A3B8; font-size: 12px;
}
.chip.active {
    background: #3B82F6; color: #fff; border-color: #3B82F6;
}

.desc-input {
    width: 100%; box-sizing: border-box;
    background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; padding: 10px; color: #fff; font-size: 14px;
}

.submit-btn {
    width: 100%; padding: 14px; border-radius: 12px;
    background: #EF4444; color: #fff; font-size: 15px; font-weight: 600;
    border: none; margin-top: 10px;
}
.submit-btn:disabled { opacity: 0.5; }
</style>
