<template>
  <div class="modal-mask" @click.self="$emit('close')">
    <div class="wallet-recharge-modal">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-content">
          <div class="modal-title">购置额度</div>
          <div class="modal-subtitle">Purchase Quota</div>
        </div>
        <button class="modal-close" @click="$emit('close')">
          <el-icon><Close /></el-icon>
        </button>
      </div>

      <div class="modal-content">
        <!-- Quota Options -->
        <div class="section-container">
          <div class="section-label">选择额度</div>
          <div class="amount-options">
            <div 
              v-for="(item, idx) in options" 
              :key="item.value" 
              :class="['amount-option', {active: selectedIdx===idx}]" 
              @click="selectOption(idx)"
            >
              <div class="amount-main">{{ item.value }} <span class="unit">点</span></div>
              <!-- Bonus Tag: Dynamic Color -->
              <div v-if="item.bonus > 0" class="bonus-tag">送 {{ item.bonus }} 点</div>
              
              <!-- Active Checkmark Decoration -->
              <div v-if="selectedIdx===idx" class="active-badge">
                <el-icon><Check /></el-icon>
              </div>
            </div>

            <!-- Custom Option -->
            <div 
              :class="['amount-option', 'custom-option', {active: selectedIdx===-1}]" 
              @click="selectOption(-1)"
            >
              <span class="custom-label">自定义</span>
              <div v-if="selectedIdx===-1" class="active-badge">
                <el-icon><Check /></el-icon>
              </div>
            </div>
          </div>
          
          <!-- Custom Input -->
          <div class="custom-input-wrapper" :class="{ visible: selectedIdx === -1 }">
             <input 
               v-model.number="inputValue" 
               type="number" 
               min="1" 
               placeholder="请输入充值点数" 
               :disabled="selectedIdx!==-1" 
             />
             <span class="input-suffix">点</span>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="section-container">
          <div class="section-label">支付方式</div>
          <div class="pay-methods">
            <div :class="['pay-method', payType==='alipay' ? 'active' : '']" @click="payType='alipay'">
              <div class="pay-content">
                <div class="icon-container alipay">
                  <img class="pay-icon" src="/images/client/pc/zhifu2.png" alt="支付宝" />
                </div>
                <span>支付宝</span>
              </div>
              <div v-if="payType==='alipay'" class="pay-check">
                <el-icon><Select /></el-icon>
              </div>
            </div>
            
            <div :class="['pay-method', payType==='wechat' ? 'active' : '']" @click="payType='wechat'">
              <div class="pay-content">
                <div class="icon-container wechat">
                  <img class="pay-icon" src="/images/client/pc/weixin.png" alt="微信支付" />
                </div>
                <span>微信支付</span>
              </div>
              <div v-if="payType==='wechat'" class="pay-check">
                <el-icon><Select /></el-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="modal-footer">
           <button 
             class="btn-confirm" 
             :disabled="!isValidAmount"
             @click="handleRecharge"
           >
             <span class="btn-text">立即支付 ¥{{ payAmount.toFixed(2) }}</span>
             <el-icon class="btn-icon"><ArrowRight /></el-icon>
           </button>
           <div class="security-tip">
             <el-icon><Lock /></el-icon>
             安全加密支付
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { authApi } from '@/api/auth'
import { Close, Check, Select, ArrowRight, Lock } from '@element-plus/icons-vue'

const emits = defineEmits(['close'])
const props = defineProps({
  initialAmount: {
    type: Number,
    default: 0
  }
})

interface RechargeOption {
  value: number
  bonus: number
}

const options = ref<RechargeOption[]>([])
const loading = ref(false)
const selectedIdx = ref(0)
const inputValue = ref<number | null>(null)
const payType = ref('alipay')

// Assuming 1 Point = 1 CNY
const payAmount = computed(() => {
  if (selectedIdx.value !== -1 && options.value[selectedIdx.value]) {
    return options.value[selectedIdx.value].value
  }
  return inputValue.value || 0
})

const isValidAmount = computed(() => {
  return payAmount.value > 0
})

function selectOption(idx:number) {
  selectedIdx.value = idx
  if(idx!==-1) inputValue.value = null
}

function handleRecharge() {
  // Recharge Logic
}

onMounted(async () => {
  loading.value = true
  try {
    const res = await authApi.getActiveTiers()
    if (res.success && res.data) {
      options.value = res.data.map(item => ({
        value: item.value,
        bonus: parseInt(item.desc.replace(/[^0-9]/g, '') || '0')
      }))
    }
  } catch (e) {
    console.error('加载充值档位失败', e)
  } finally {
    loading.value = false
  }

  if (props.initialAmount > 0 && options.value.length > 0) {
    const idx = options.value.findIndex(o => o.value === props.initialAmount)
    if (idx !== -1) {
      selectedIdx.value = idx
    } else {
      selectedIdx.value = -1
      inputValue.value = props.initialAmount
    }
  }
})
</script>

<style scoped>
/* Modal Glass Container */
.modal-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
  cursor: pointer; /* Click to close prompt */
}

/* Prevent clicks inside modal from closing */
.wallet-recharge-modal {
  width: 780px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default; /* Reset cursor */
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(20px) scale(0.96); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 40px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.modal-subtitle {
  font-size: 13px;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
}

.modal-close {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #94A3B8;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #EF4444;
  transform: rotate(90deg);
}

/* Content */
.modal-content {
  padding: 32px 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: #94A3B8;
  margin-bottom: 16px;
}

/* Options Grid */
.amount-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

/* Option Card: Blue Default -> Orange Active */
.amount-option {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(59, 130, 246, 0.3); /* Default Blue Hue */
  border-radius: 16px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 100px;
}

.amount-option:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3B82F6;
  transform: translateY(-2px);
}

/* Active State: Orange */
.amount-option.active {
  background: rgba(249, 115, 22, 0.1) !important;
  border-color: #F97316 !important;
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.15);
}

.amount-main {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  font-family: 'Outfit', sans-serif;
}

.unit {
  font-size: 14px;
  font-weight: 500;
  color: #94A3B8;
}

.active-badge {
  position: absolute;
  top: -8px; right: -8px;
  width: 20px; height: 20px;
  background: #F97316;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #0F172A;
}

/* Bonus Tag: Default Blue -> Active Orange */
.bonus-tag {
  margin-top: 8px;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 500;
  /* Default Blue */
  background: rgba(59, 130, 246, 0.2);
  color: #60A5FA; 
  transition: all 0.2s;
}

.amount-option.active .bonus-tag {
  /* Active Orange */
  background: rgba(249, 115, 22, 0.2);
  color: #F97316;
}

.custom-label {
  font-size: 16px;
  color: #94A3B8;
  font-weight: 500;
}

/* Custom Input */
.custom-input-wrapper {
  position: relative;
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

.custom-input-wrapper.visible {
  height: 56px;
  opacity: 1;
  margin-top: 8px;
}

.custom-input-wrapper input {
  width: 100%;
  height: 56px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3); /* Blue Line */
  border-radius: 16px;
  padding: 0 48px 0 20px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  outline: none;
  font-family: 'Outfit', sans-serif;
}

.custom-input-wrapper input:focus {
  border-color: #F97316; /* Orange Focus */
}

.input-suffix {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748B;
  font-weight: 500;
}

/* Pay Methods */
.pay-methods {
  display: flex;
  gap: 16px;
}

.pay-method {
  flex: 1;
  height: 64px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(59, 130, 246, 0.3); /* Default Blue */
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.pay-method:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3B82F6;
}

/* Active Orange */
.pay-method.active {
  background: rgba(249, 115, 22, 0.1) !important;
  border-color: #F97316 !important;
}

.pay-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Icon Container for better visibility */
.icon-container {
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.pay-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pay-method span {
  color: #E2E8F0;
  font-weight: 500;
  font-size: 16px;
}

.pay-check {
  color: #F97316;
  font-size: 18px;
  display: flex;
}

/* Footer */
.modal-footer {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Button: Blue Default -> Orange Hover */
.btn-confirm {
  width: 100%;
  height: 60px;
  /* Blue Gradient Default */
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border: none;
  border-radius: 100px; /* Pill */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
}

/* Shine Effect */
.btn-confirm::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn-confirm:hover::before {
  left: 100%;
}

.btn-confirm:hover {
  /* Orange Gradient Hover */
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  box-shadow: 0 12px 32px rgba(234, 88, 12, 0.4);
  transform: translateY(-2px);
}

.btn-confirm:disabled {
  background: #334155;
  color: #64748B;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}

.btn-text {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.btn-icon {
  font-size: 18px;
  color: #fff;
}

.security-tip {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748B;
  font-size: 12px;
}
</style> 