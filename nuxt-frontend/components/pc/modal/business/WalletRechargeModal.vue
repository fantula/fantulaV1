<template>
  <BaseModal
    :visible="true"
    title="购置额度"
    width="660px"
    :show-footer="false"
    theme-id="suit-002"
    @close="handleClose"
  >

    <template #default>
      <div class="recharge-content">
        <!-- 支付选择界面 -->
        <template v-if="!showQrCode">
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
                  <!-- 微信支付（默认选中） -->
                  <div :class="['pay-method', payType==='wechat' ? 'active' : '']" @click="payType='wechat'">
                    <div class="icon-container wechat">
                      <img class="pay-icon" src="/images/client/pc/weixin.png" alt="微信" />
                    </div>
                    <span>微信</span>
                    <div v-if="payType==='wechat'" class="pay-check"><el-icon><Select /></el-icon></div>
                  </div>

                  <!-- 支付宝（即将开通） -->
                  <div :class="['pay-method', 'disabled']" title="支付宝暂未开通">
                    <div class="icon-container alipay">
                      <img class="pay-icon" src="/images/client/pc/zhifu2.png" alt="支付宝" />
                    </div>
                    <span>支付宝</span>
                    <span class="coming-soon">即将开通</span>
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
                    <BaseButton 
                      themeId="primary-orange"
                      block
                      :disabled="!isValidAmount || loading"
                      :loading="loading"
                      @click="handleRecharge"
                    >
                      <template v-if="!loading">
                        <span class="btn-text">立即支付 {{ payAmount.toFixed(2) }}点</span>
                        <el-icon class="btn-icon"><ArrowRight /></el-icon>
                      </template>
                      <template v-else>正在发起支付...</template>
                    </BaseButton>
                  </div>
                  
                  <div class="security-tip">
                    <el-icon><Lock /></el-icon>
                    安全加密支付
                  </div>
              </div>
            </div>
            
          </div>
        </template>

        <!-- 二维码支付界面 -->
        <template v-else>
          <div class="qrcode-container">
            <div class="qrcode-header">
              <img src="/images/client/pc/weixin.png" alt="微信" class="wechat-icon" />
              <span>微信扫码支付</span>
            </div>
            
            <div class="qrcode-wrapper">
              <img v-if="qrcodeDataUrl" :src="qrcodeDataUrl" alt="Payment QR Code" class="qrcode-img" />
              <!-- 状态条：显示在二维码下方，不遮盖 -->
              <div class="qrcode-status-bar" :class="paymentStatus">
                <template v-if="paymentStatus === 'checking'">
                  <div class="checking-spinner"></div>
                  <span>正在检查支付状态...</span>
                </template>
                <template v-else-if="paymentStatus === 'success'">
                  <el-icon class="success-icon"><CircleCheck /></el-icon>
                  <span>支付成功！</span>
                </template>
                <template v-else>
                  <span class="pending-hint">请使用微信扫码支付</span>
                </template>
              </div>
            </div>
            
            <div class="qrcode-info">
              <div class="amount-display">
                <span class="label">支付金额</span>
                <span class="amount">{{ payAmount.toFixed(2) }}点</span>
              </div>
              <div class="order-no">
                订单号: {{ currentOrderNo }}
              </div>
            </div>
            
            <div class="qrcode-tips">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码完成支付</p>
            </div>
            
            <div class="qrcode-actions">
              <BaseButton 
                themeId="secondary"
                @click="cancelPayment" 
                :disabled="paymentStatus === 'checking'"
              >
                返回重新选择
              </BaseButton>
            </div>
          </div>
        </template>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { authApi } from '@/api/client/auth'
import { wechatPayApi } from '@/api/client/wechat-payment'
import BaseButton from '@/components/shared/BaseButton.vue'
import { Check, Select, ArrowRight, Lock, Present, CircleCheck } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import QRCode from 'qrcode'
import { useUserStore } from '@/stores/client/user'

const emits = defineEmits(['close', 'success'])
const props = defineProps({
  initialAmount: {
    type: Number,
    default: 0
  }
})

const userStore = useUserStore()

interface RechargeOption {
  value: number
  bonus: number
}

const options = ref<RechargeOption[]>([])
const loading = ref(false)
const selectedIdx = ref(0)
const inputValue = ref<number | null>(null)
const payType = ref('wechat')  // 默认微信支付

// 二维码相关
const showQrCode = ref(false)
const qrcodeDataUrl = ref('')
const currentOrderNo = ref('')
const paymentStatus = ref<'pending' | 'checking' | 'success'>('pending')
let pollTimer: ReturnType<typeof setInterval> | null = null

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

// 发起微信支付
async function handleRecharge() {
  if (!isValidAmount.value || loading.value) return
  
  loading.value = true
  
  try {
    const res = await wechatPayApi.nativePayRecharge(
      payAmount.value,
      currentBonus.value,
      `凡图拉-充值${payAmount.value}点`
    )
    
    if (!res.success || !res.data) {
      ElMessage.error(res.error || '支付发起失败')
      return
    }
    
    // 显示二维码
    currentOrderNo.value = res.data.out_trade_no
    showQrCode.value = true
    
    // 生成二维码
    try {
      const url = await QRCode.toDataURL(res.data!.code_url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
      qrcodeDataUrl.value = url
    } catch (qrErr) {
      if (import.meta.dev) console.error('QR Code generation failed:', qrErr)
    }
    
    // 开始轮询支付状态
    startPolling()
    
  } catch (err: any) {
    ElMessage.error(err.message || '网络错误')
  } finally {
    loading.value = false
  }
}

// 轮询支付状态
function startPolling() {
  if (pollTimer) clearInterval(pollTimer)
  
  pollTimer = setInterval(async () => {
    if (!currentOrderNo.value) return
    
    paymentStatus.value = 'checking'
    
    try {
      const res = await wechatPayApi.queryOrder(currentOrderNo.value)
      if (import.meta.dev) console.log('[Polling] Response:', JSON.stringify(res))
      
      if (res.success && res.data?.paid) {
        // 支付成功
        paymentStatus.value = 'success'
        stopPolling()
        
        ElMessage.success('充值成功！')
        
        // 刷新用户余额
        await userStore.fetchUserInfo()
        
        // 延迟关闭
        setTimeout(() => {
          emits('success')
          emits('close')
        }, 1500)
        
        return
      }
      
      paymentStatus.value = 'pending'
      
    } catch (err) {
      if (import.meta.dev) console.error('Query order error:', err)
      paymentStatus.value = 'pending'
    }
  }, 3000)  // 每3秒查询一次
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

function cancelPayment() {
  stopPolling()
  showQrCode.value = false
  currentOrderNo.value = ''
  qrcodeDataUrl.value = ''
  paymentStatus.value = 'pending'
}

function handleClose() {
  stopPolling()
  emits('close')
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
    if (import.meta.dev) console.error('加载充值档位失败', e)
  } finally {
    loading.value = false
  }

  if (props.initialAmount > 0) {
     const idx = options.value.findIndex(o => o.value === props.initialAmount)
     if (idx !== -1) selectedIdx.value = idx
     else { selectedIdx.value = -1; inputValue.value = props.initialAmount }
  }
})

onUnmounted(() => {
  stopPolling()
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
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%) !important;
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
  color: var(--color-accent);
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
.pay-method.disabled { opacity: 0.5; cursor: not-allowed; }

.icon-container { width: 24px; height: 24px; background: #fff; border-radius: 5px; padding: 3px; display: flex; align-items: center; justify-content: center; }
.pay-icon { width: 100%; height: 100%; object-fit: contain; }
.pay-method span { color: #fff; font-size: 14px; font-weight: 500; }
.pay-check { color: #F97316; font-size: 16px; }
.coming-soon { font-size: 11px !important; color: #94A3B8 !important; }

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

.actual-arrival-info .bonus-hint { font-size: 12px; color: #10B981; }

.security-tip { font-size: 12px; color: #64748B; display: flex; align-items: center; justify-content: center; gap: 4px; }
.security-tip { font-size: 12px; color: #64748B; display: flex; align-items: center; justify-content: center; gap: 4px; }

/* QR Code Container */
.qrcode-container {
  display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 20px 0;
}

.qrcode-header {
  display: flex; align-items: center; gap: 10px; color: #10B981; font-size: 18px; font-weight: 600;
}
.qrcode-header .wechat-icon { width: 28px; height: 28px; }

.qrcode-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  gap: 10px;
}

.qrcode-img {
  display: block;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
}

/* 状态条：显示在二维码正下方，不遮盖 */
.qrcode-status-bar {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
  background: #f5f7fa;
  color: #64748B;
  transition: all 0.3s;
  min-height: 32px;
}
.qrcode-status-bar.checking {
  background: rgba(249, 115, 22, 0.08);
  color: #F97316;
}
.qrcode-status-bar.success {
  background: rgba(16, 185, 129, 0.1);
  color: #10B981;
  font-weight: 600;
}
.pending-hint { color: #94A3B8; font-size: 12px; }

.checking-spinner {
  width: 32px; height: 32px; border: 3px solid #E2E8F0;
  border-top-color: #F97316; border-radius: 50%; animation: spin 0.8s linear infinite;
}

.qrcode-info {
  text-align: center;
}
.amount-display { display: flex; align-items: baseline; gap: 8px; justify-content: center; }
.amount-display .label { font-size: 14px; color: #94A3B8; }
.amount-display .amount { font-size: 28px; font-weight: 700; color: #F97316; font-family: 'Outfit', sans-serif; }
.order-no { font-size: 12px; color: #64748B; margin-top: 8px; }

.qrcode-tips {
  text-align: center; color: #94A3B8; font-size: 13px; line-height: 1.6;
}
.qrcode-tips p { margin: 0; }

.qrcode-actions { margin-top: 10px; display: flex; justify-content: center; }

@keyframes spin { to { transform: rotate(360deg); } }
</style>