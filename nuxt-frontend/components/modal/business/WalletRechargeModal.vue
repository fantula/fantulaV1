<template>
  <BaseModal
    :visible="true"
    title="购置额度"
    width="860px"
    :show-footer="false"
    theme-id="suit-002"
    @close="$emit('close')"
  >

    <template #default>
      <div class="recharge-content">
        <div class="modal-subtitle">Purchase Quota</div>

        <div class="split-layout">
          <div class="left-panel">
            <!-- 1. Select Quota -->
            <div class="section-container">
              <div class="section-label">选择额度</div>
              <div class="amount-grid">
                <div 
                  v-for="(item, idx) in options" 
                  :key="item.value" 
                  :class="['amount-option', {active: selectedIdx===idx}]" 
                  @click="selectOption(idx)"
                >
                  <div class="option-content">
                    <div class="amount-row">
                      <span class="amount-main">{{ item.value }}</span>
                      <span class="unit">点</span>
                    </div>
                    <div v-if="item.bonus > 0" class="bonus-tag">
                      <el-icon><Present /></el-icon> 送 {{ item.bonus }}
                    </div>
                  </div>
                </div>

                <!-- Custom Option -->
                <div 
                  :class="['amount-option', 'custom-option', {active: selectedIdx===-1}]" 
                  @click="selectOption(-1)"
                >
                   <span class="custom-label">自定义</span>
                </div>
              </div>
              
              <!-- Custom Input -->
              <div class="custom-input-wrapper" :class="{ visible: selectedIdx === -1 }">
                  <input 
                    v-model.number="inputValue" 
                    type="number" 
                    min="1" 
                    placeholder="请输入充值金额" 
                    :disabled="selectedIdx!==-1" 
                  />
                  <span class="input-suffix">点</span>
              </div>
            </div>

            <!-- 2. Pay Method -->
            <div class="section-container">
              <div class="section-label">支付方式</div>
              <div class="pay-methods">
                <div :class="['pay-method', payType==='alipay' ? 'active' : '']" @click="payType='alipay'">
                  <div class="icon-container alipay">
                    <img class="pay-icon" src="/images/client/pc/zhifu2.png" alt="支付宝" />
                  </div>
                  <span>支付宝</span>
                  <div v-if="payType==='alipay'" class="pay-check"><el-icon><Select /></el-icon></div>
                </div>
                
                <div :class="['pay-method', payType==='wechat' ? 'active' : '']" @click="payType='wechat'">
                  <div class="icon-container wechat">
                    <img class="pay-icon" src="/images/client/pc/weixin.png" alt="微信" />
                  </div>
                  <span>微信</span>
                  <div v-if="payType==='wechat'" class="pay-check"><el-icon><Select /></el-icon></div>
                </div>
              </div>
            </div>

            <!-- 3. Footer Action -->
            <div class="modal-footer">
                <!-- Dynamic Actual Amount Info -->
                <div class="actual-arrival-info" v-if="isValidAmount">
                  <span class="label">实际到账:</span>
                  <span class="value">{{ totalPoints }} 点</span>
                  <span class="bonus-hint" v-if="currentBonus > 0">(含赠送 {{ currentBonus }} 点)</span>
                </div>

                <div class="action-row">
                  <button 
                    class="btn-confirm" 
                    :disabled="!isValidAmount"
                    @click="handleRecharge"
                  >
                    <span class="btn-text">立即支付 ¥{{ payAmount.toFixed(2) }}</span>
                    <el-icon class="btn-icon"><ArrowRight /></el-icon>
                  </button>
                </div>
                
                <div class="security-tip">
                  <el-icon><Lock /></el-icon>
                  安全加密支付
                </div>
            </div>
          </div>
          
          <!-- Right Spacer for Phantom Visuals -->
          <div class="right-spacer"></div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { authApi } from '@/api/auth'
import { Check, Select, ArrowRight, Lock, Present } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

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

const currentBonus = computed(() => {
   if (selectedIdx.value !== -1 && options.value[selectedIdx.value]) {
    return options.value[selectedIdx.value].bonus
  }
  return 0
})

const totalPoints = computed(() => {
  return payAmount.value + currentBonus.value
})

const isValidAmount = computed(() => {
  return payAmount.value > 0
})

function selectOption(idx:number) {
  selectedIdx.value = idx
  if(idx!==-1) inputValue.value = null
}

function handleRecharge() {
  loading.value = true
  // Mock Pay
  setTimeout(() => {
      ElMessage.success(`已发起充值 ¥${payAmount.value.toFixed(2)} (${payType.value === 'alipay' ? '支付宝' : '微信'})`)
      loading.value = false
      emits('close')
  }, 800)
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

  if (props.initialAmount > 0) {
     const idx = options.value.findIndex(o => o.value === props.initialAmount)
     if (idx !== -1) selectedIdx.value = idx
     else { selectedIdx.value = -1; inputValue.value = props.initialAmount }
  }
})
</script>



<style scoped>
/* Content Layout */
.recharge-content {
  position: relative;
  z-index: 10; 
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-subtitle {
  font-size: 13px; color: #64748B; text-transform: uppercase; letter-spacing: 1px;
  margin-top: -24px; margin-bottom: 8px; margin-left: 2px;
}

.split-layout {
  display: flex;
  gap: 20px;
}

.left-panel {
  flex: 1;
  display: flex; flex-direction: column; gap: 20px; /* Reduced gap */
}

.right-spacer {
  width: 200px; /* Reduced slightly */
  flex-shrink: 0;
}

/* Section Labels */
.section-label {
  font-size: 14px; font-weight: 600; color: #E2E8F0; margin-bottom: 10px;
  display: flex; align-items: center; gap: 8px;
}
.section-label::before { content: ''; width: 3px; height: 14px; background: #F97316; border-radius: 2px; }

/* Grid Options - Compact */
.amount-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; /* Tighter gap */
}

/* Base Option Card - Compact */
.amount-option {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px; /* Smaller radius */
  padding: 12px 8px; /* Compact padding */
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-height: 80px; /* Reduced height */
  overflow: hidden;
}

.amount-option:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.amount-option.active {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%) !important;
  border-color: #FB923C !important;
  box-shadow: 0 8px 24px -6px rgba(234, 88, 12, 0.5);
  transform: translateY(-2px) scale(1.02);
}

.option-content {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
}

.amount-row { display: flex; align-items: baseline; gap: 2px; }
.amount-main { 
  font-size: 20px; /* Smaller font */
  font-weight: 800; color: #fff; line-height: 1;
  font-family: 'Outfit', sans-serif;
}
.unit { font-size: 12px; font-weight: 500; color: #94A3B8; }
.amount-option.active .unit { color: rgba(255,255,255,0.9); }

/* Bonus Tag - Compact */
.bonus-tag { 
  margin-top: 4px;
  font-size: 11px; /* Smaller font */
  font-weight: 700;
  padding: 2px 8px; /* Tighter padding */
  border-radius: 100px;
  background: rgba(249, 115, 22, 0.15);
  color: #F97316;
  border: 1px solid rgba(249, 115, 22, 0.3);
  display: flex; align-items: center; gap: 2px;
}
.amount-option.active .bonus-tag {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}

.custom-option { border-style: dashed; }
.custom-label { font-size: 14px; font-weight: 600; color: #94A3B8; }
.amount-option.active .custom-label { color: #fff; }

.custom-input-wrapper { height: 0; overflow: hidden; opacity: 0; transition: all 0.3s; margin-top: 0; }
.custom-input-wrapper.visible { height: 44px; opacity: 1; margin-top: 10px; }
.custom-input-wrapper input {
  width: 100%; height: 44px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; padding: 0 40px 0 16px; color: #fff; font-size: 15px; outline: none;
}

/* Pay Methods - Compact */
.pay-methods { display: flex; gap: 12px; }
.pay-method {
  flex: 1; height: 50px; /* Reduced height */
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; display: flex; align-items: center; justify-content: space-between; padding: 0 14px;
  cursor: pointer; transition: all 0.2s;
}
.pay-method.active { background: rgba(249, 115, 22, 0.1) !important; border-color: #F97316 !important; }

.icon-container { width: 24px; height: 24px; background: #fff; border-radius: 5px; padding: 3px; display: flex; align-items: center; justify-content: center; }
.pay-icon { width: 100%; height: 100%; object-fit: contain; }
.pay-method span { color: #fff; font-size: 14px; font-weight: 500; }
.pay-check { color: #F97316; font-size: 16px; }

/* Footer */
.modal-footer { margin-top: 20px; display: flex; flex-direction: column; align-items: stretch; gap: 12px; }

.actual-arrival-info {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 8px; 
  margin-bottom: -4px;
}
.actual-arrival-info .label { font-size: 13px; color: #94A3B8; }
.actual-arrival-info .value { font-size: 16px; font-weight: 700; color: #F97316; font-family: 'Outfit', sans-serif; }
.actual-arrival-info .bonus-hint { font-size: 12px; color: #10B981; }

.btn-confirm {
  width: 100%; height: 50px; background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  border: none; border-radius: 100px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.3); transition: all 0.3s;
}
.btn-confirm:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(234, 88, 12, 0.4); }
.btn-confirm:disabled { background: #334155; box-shadow: none; cursor: not-allowed; opacity: 0.6; }
.btn-text { font-size: 16px; font-weight: 700; color: #fff; }
.security-tip { font-size: 12px; color: #64748B; display: flex; align-items: center; justify-content: center; gap: 4px; }
</style>