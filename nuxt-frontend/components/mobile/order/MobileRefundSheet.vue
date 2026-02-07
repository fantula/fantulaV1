<template>
  <Teleport to="body">
  <Transition name="fade">
  <div v-if="visible" class="sheet-mask" @click="handleClose">
    <div class="sheet-panel-glass" @click.stop>
       <div class="sheet-header">
          <div class="title">申请退款</div>
          <div class="close-btn" @click="handleClose"><el-icon><Close /></el-icon></div>
       </div>

       <div class="sheet-body">
          <MobileOrderProductInfo v-if="order" :order="order" :compact="true" />

          <div class="warning-tip-glass">
             <div class="icon-box"><el-icon><Warning /></el-icon></div>
             <div class="content">
                <div>申请退款后服务将立即暂停。</div>
             </div>
          </div>

          <!-- Reasons -->
          <div class="form-section">
             <div class="label">退款原因</div>
             <div class="reason-chips">
                <div 
                   v-for="r in reasons" 
                   :key="r" 
                   class="chip-glass"
                   :class="{ active: form.reason === r }"
                   @click="form.reason = r"
                >
                   {{ r }}
                   <el-icon v-if="form.reason === r" class="chk"><Select /></el-icon>
                </div>
             </div>
          </div>

          <!-- Detail -->
          <div class="form-section">
             <div class="label">详细说明</div>
             <textarea 
                v-model="form.detail" 
                class="input-glass" 
                placeholder="请填写详细说明（选填）"
                rows="3"
             ></textarea>
          </div>
       </div>

       <div class="sheet-footer">
          <button 
             class="submit-btn-danger" 
             :disabled="!form.reason || submitting"
             @click="handleSubmit"
          >
             {{ submitting ? '提交中...' : '提交申请' }}
          </button>
       </div>
    </div>
  </div>
  </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Close, Warning, Select } from '@element-plus/icons-vue'
import { clientOrderApi } from '@/api/client/order'
import { ElMessage } from 'element-plus'
import MobileOrderProductInfo from './MobileOrderProductInfo.vue'

const props = defineProps<{
  modelValue: boolean
  orderId: string
  orderNo: string
  order?: any
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
    background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    display: flex; flex-direction: column; justify-content: flex-end;
}

.sheet-panel-glass {
    background: rgba(15, 23, 42, 0.95);
    border-top: 1px solid rgba(255,255,255,0.1);
    border-top-left-radius: 24px; border-top-right-radius: 24px;
    padding-bottom: calc(env(safe-area-inset-bottom) + 60px);
    max-height: 85vh; display: flex; flex-direction: column;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
}

.sheet-header { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
.title { color: #fff; font-weight: 700; font-size: 15px; }
.close-btn { color: #94A3B8; font-size: 20px; padding: 4px; }

.sheet-body { padding: 16px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }

.warning-tip-glass {
    background: rgba(245, 158, 11, 0.1); 
    border: 1px solid rgba(245, 158, 11, 0.2);
    color: #FCD34D;
    padding: 10px; border-radius: 12px; font-size: 13px;
    display: flex; gap: 10px; align-items: flex-start;
}
.icon-box { font-size: 18px; color: #F59E0B; margin-top: 1px; }
.sub { font-size: 11px; opacity: 0.8; margin-top: 2px; }

.form-section { display: flex; flex-direction: column; gap: 10px; }
.label { color: #E2E8F0; font-size: 14px; font-weight: 600; }

.reason-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chip-glass {
    padding: 10px 16px; 
    background: rgba(255,255,255,0.03); 
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; color: #94A3B8; font-size: 13px; font-weight: 500;
    display: flex; align-items: center; gap: 6px;
    transition: all 0.2s;
}
.chip-glass.active {
    background: rgba(239, 68, 68, 0.15); 
    color: #F87171; 
    border-color: rgba(239, 68, 68, 0.4);
}
.chk { font-size: 14px; }

.input-glass {
    width: 100%; box-sizing: border-box;
    background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; padding: 12px; color: #fff; font-size: 14px;
    resize: none; transition: all 0.2s;
}
.input-glass:focus { border-color: #EF4444; outline: none; background: rgba(239, 68, 68, 0.05); }

.sheet-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); }

.submit-btn-danger {
    width: 100%; padding: 14px; border-radius: 12px;
    background: #EF4444; color: #fff; font-size: 15px; font-weight: 600;
    border: none; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}
.submit-btn-danger:disabled { opacity: 0.5; box-shadow: none; filter: grayscale(1); }
</style>
