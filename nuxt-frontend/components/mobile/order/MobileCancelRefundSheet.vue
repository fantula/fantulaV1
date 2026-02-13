<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="modal-overlay" @click="handleClose">
        <div class="modal-panel-glass aurora-sheet-panel" @click.stop>
          <!-- Header -->
          <div class="modal-header">
            <div class="header-icon warning">
              <el-icon><Warning /></el-icon>
            </div>
            <h3 class="modal-title">取消退款申请</h3>
            <button class="close-btn" @click="handleClose">
              <el-icon><Close /></el-icon>
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <div class="warning-tip-glass">
              <div class="tip-icon"><el-icon><InfoFilled /></el-icon></div>
              <div class="tip-content">取消后订单将恢复正常状态，您可以继续使用商品服务。</div>
            </div>

            <MobileOrderProductInfo v-if="order" :order="order" :compact="true" style="margin-bottom: 12px;" />

            <div class="info-card-glass">
              <div class="info-row">
                <span class="label">订单号</span>
                <span class="value mono">{{ orderNo }}</span>
              </div>
              <div v-if="refundRequest" class="info-row">
                <span class="label">申请时间</span>
                <span class="value">{{ formatDate(refundRequest.created_at) }}</span>
              </div>
              <div v-if="refundRequest" class="info-row">
                <span class="label">退款原因</span>
                <span class="value">{{ refundRequest.reason }}</span>
              </div>
              <div v-if="cancelledCount > 0" class="info-row highlight">
                <span class="label">已取消次数</span>
                <span class="value">{{ cancelledCount }} / 3 次</span>
              </div>
            </div>

            <div v-if="cancelledCount >= 2" class="limit-warning">
              <el-icon><WarningFilled /></el-icon>
              <span>注意：您还剩 <strong>{{ 3 - cancelledCount }}</strong> 次取消机会，达到上限后将无法再申请退款。</span>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="btn-glass secondary" @click="handleClose">
              暂不取消
            </button>
            <button 
              class="btn-glass primary"
              :disabled="submitting"
              @click="handleConfirm"
            >
              {{ submitting ? '处理中...' : '确认取消' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Close, Warning, WarningFilled, InfoFilled } from '@element-plus/icons-vue'
import { clientOrderApi } from '@/api/client/order'
import { useNotify } from '@/composables/useNotify'
import { useBizFormat } from '@/composables/common/useBizFormat'
import MobileOrderProductInfo from './MobileOrderProductInfo.vue'

const props = defineProps<{
  modelValue: boolean
  orderId: string
  orderNo: string
  refundRequest?: {
    id: string
    reason: string
    created_at: string
  } | null
  cancelledCount: number
  order?: any
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const { formatDate } = useBizFormat()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const { success, error } = useNotify()

const submitting = ref(false)

const handleClose = () => visible.value = false

const handleConfirm = async () => {
  if (submitting.value) return
  submitting.value = true
  
  try {
    const res = await clientOrderApi.cancelRefundRequest(props.orderId)
    if (res.success) {
      success('已取消退款申请')
      emit('success')
      handleClose()
    } else {
      error(res.error || '取消失败')
    }
  } catch (e: any) {
    error(e.message || '系统错误')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  padding: 0;
  align-items: flex-end; /* Bottom sheet */
}

.modal-panel-glass {
    /* Global Aurora Style */
}

/* Header */
.modal-header {
  padding: 20px 20px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.header-icon {
  width: 40px; height: 40px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
}
.header-icon.warning {
  background: rgba(245, 158, 11, 0.15);
  color: #F59E0B;
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.modal-title {
  flex: 1; font-size: 16px; font-weight: 700; color: #fff; margin: 0;
}

.close-btn {
  position: absolute; right: 16px; top: 16px;
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: none; color: #94A3B8;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 16px;
}

/* Body */
.modal-body {
  padding: 20px;
  display: flex; flex-direction: column; gap: 16px;
}

.warning-tip-glass {
  display: flex; gap: 10px; padding: 12px 14px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  font-size: 13px; color: #93C5FD; line-height: 1.5;
}
.tip-icon { flex-shrink: 0; font-size: 16px; margin-top: 2px; }

.info-card-glass {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px; padding: 16px;
  display: flex; flex-direction: column; gap: 10px;
}

.info-row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px;
}
.info-row .label { color: #94A3B8; }
.info-row .value { color: #E2E8F0; font-weight: 500; text-align: right; }
.info-row .value.mono { font-family: 'Monaco', monospace; font-size: 12px; }
.info-row.highlight .value { color: #F59E0B; font-weight: 700; }

.limit-warning {
  display: flex; gap: 8px; padding: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px; font-size: 12px; color: #FCA5A5; line-height: 1.5;
}

/* Footer */
.modal-footer {
  padding: 0 20px 20px; display: flex; gap: 12px;
}

.btn-glass {
  flex: 1; padding: 12px; border-radius: 12px;
  font-size: 14px; font-weight: 600; cursor: pointer; border: none;
}
.btn-glass.secondary {
  background: rgba(255, 255, 255, 0.05); color: #CBD5E1;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.btn-glass.primary {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.25);
}
.btn-glass.primary:disabled { opacity: 0.5; cursor: not-allowed; }

/* Transition */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-active .modal-panel-glass { animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-fade-leave-active .modal-panel-glass { animation: pop-out 0.25s ease; }

@keyframes pop-in {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes pop-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
}
</style>
