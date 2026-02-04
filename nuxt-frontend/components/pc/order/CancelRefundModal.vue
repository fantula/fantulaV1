<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="modal-overlay" @click="handleClose">
        <div class="modal-panel" @click.stop>
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
            <div class="warning-tip">
              <el-icon><InfoFilled /></el-icon>
              <span>取消后订单将恢复正常状态，您可以继续使用商品服务。</span>
            </div>

            <div class="info-section">
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
            <button class="btn secondary" @click="handleClose">
              暂不取消
            </button>
            <button 
              class="btn primary"
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
import { ElMessage } from 'element-plus'
import { useBizFormat } from '@/composables/common/useBizFormat'

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
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const { formatDate } = useBizFormat()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const submitting = ref(false)

const handleClose = () => visible.value = false

const handleConfirm = async () => {
  if (submitting.value) return
  submitting.value = true
  
  try {
    const res = await clientOrderApi.cancelRefundRequest(props.orderId)
    if (res.success) {
      ElMessage.success('已取消退款申请')
      emit('success')
      handleClose()
    } else {
      ElMessage.error(res.error || '取消失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '系统错误')
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
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-panel {
  width: 100%;
  max-width: 440px;
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98));
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  overflow: hidden;
}

/* Header */
.modal-header {
  padding: 24px 24px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.header-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.header-icon.warning {
  background: rgba(245, 158, 11, 0.15);
  color: #F59E0B;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.modal-title {
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.close-btn {
  position: absolute;
  right: 16px;
  top: 16px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Body */
.modal-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.warning-tip {
  display: flex;
  gap: 10px;
  padding: 14px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  font-size: 13px;
  color: #93C5FD;
  line-height: 1.5;
}
.warning-tip .el-icon {
  flex-shrink: 0;
  font-size: 18px;
  margin-top: 1px;
}

.info-section {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.info-row .label {
  color: #94A3B8;
}
.info-row .value {
  color: #E2E8F0;
  font-weight: 500;
}
.info-row .value.mono {
  font-family: 'Monaco', monospace;
  font-size: 13px;
}
.info-row.highlight .value {
  color: #F59E0B;
  font-weight: 700;
}

.limit-warning {
  display: flex;
  gap: 10px;
  padding: 14px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  font-size: 13px;
  color: #FCA5A5;
  line-height: 1.5;
}
.limit-warning .el-icon {
  flex-shrink: 0;
  font-size: 18px;
  color: #F87171;
}
.limit-warning strong {
  color: #F87171;
}

/* Footer */
.modal-footer {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}
.btn.secondary {
  background: rgba(255, 255, 255, 0.06);
  color: #CBD5E1;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.btn.primary {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
}
.btn.primary:hover {
  background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.35);
}
.btn.primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-active .modal-panel,
.modal-fade-leave-active .modal-panel {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .modal-panel,
.modal-fade-leave-to .modal-panel {
  transform: scale(0.95);
  opacity: 0;
}
</style>
