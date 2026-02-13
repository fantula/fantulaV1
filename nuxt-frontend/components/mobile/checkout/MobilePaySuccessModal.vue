<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="modal-overlay" @click="$emit('close')">
        <div class="modal-content" @click.stop>
          
          <div class="success-header">
            <div class="icon-circle">
               <el-icon class="check-icon"><Check /></el-icon>
            </div>
            <div class="success-title">支付成功</div>
          </div>

          <div class="success-body">
             <div class="info-row">
                <span class="label">订单编号</span>
                <span class="val link">{{ orderNo }}</span>
             </div>
             <div class="info-row">
                <span class="label">支付金额</span>
                <span class="val amount">{{ amount }} <span class="unit">点</span></span>
             </div>
          </div>

          <div class="modal-footer">
             <button class="btn-primary" @click="$emit('viewOrder')">查看订单</button>
             <button class="btn-secondary" @click="$emit('goHome')">返回首页</button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'

defineProps<{
  visible: boolean
  orderNo: string
  amount: number | string
}>()

defineEmits(['close', 'viewOrder', 'goHome'])
</script>

<style scoped>
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
    z-index: 3000; display: flex; align-items: center; justify-content: center;
    padding: 30px; /* More global padding */
}

.modal-content {
    background: rgba(15, 23, 42, 0.85); /* Slightly more transparent */
    width: 100%; max-width: 280px; /* Smaller width as requested */
    border-radius: 20px; padding: 24px;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    display: flex; flex-direction: column; align-items: center;
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes popIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.success-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; }

.icon-circle {
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, #10B981, #059669); /* Green for success */
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}
.check-icon { font-size: 32px; color: #fff; font-weight: bold; }

.success-title { font-size: 18px; font-weight: 700; color: #fff; margin: 0; }

.success-body {
    width: 100%; margin-bottom: 24px;
    background: rgba(255,255,255,0.03); 
    border-radius: 12px; padding: 12px 16px;
    border: 1px solid rgba(255,255,255,0.05);
}

.info-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; padding: 6px 0; }
.label { color: #94A3B8; }
.val { color: #E2E8F0; font-weight: 500; }
.link { color: #38BDF8; font-family: monospace; }
.amount { color: var(--active-orange); font-weight: 700; font-size: 18px; font-family: 'DIN Alternate'; }
.unit { font-size: 12px; font-weight: normal; margin-left: 2px; }

.modal-footer { width: 100%; display: flex; flex-direction: column; gap: 10px; }

.btn-primary {
    width: 100%; height: 40px; border-radius: 20px; border: none;
    background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover));
    color: #fff; font-weight: 600; font-size: 14px;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}
.btn-secondary {
    width: 100%; height: 40px; border-radius: 20px;
    background: transparent; border: 1px solid rgba(255,255,255,0.1);
    color: #94A3B8; font-size: 13px;
}

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
