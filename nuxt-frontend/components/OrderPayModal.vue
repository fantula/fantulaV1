<template>
  <div class="modal-mask">
    <div class="order-pay-modal">
      <div class="modal-header">
        <div class="modal-title">订单支付</div>
        <div class="modal-subtitle">请选择支付方式完成付款</div>
        <button class="modal-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-content">
        <div class="order-info-bar">
          <div class="shop-logo-icon">
            <el-icon :size="24"><Shop /></el-icon>
          </div>
          <div class="shop-info">
            <div class="shop-name">{{ shopName }}</div>
            <div class="shop-desc">{{ shopDesc }}</div>
            <div class="order-id">订单号：#{{ orderId }}</div>
          </div>
          <div class="order-amount">￥{{ price }}</div>
        </div>
        <div class="pay-section">
          <div class="pay-title">选择支付方式</div>
          <div class="pay-methods">
            <div :class="['pay-method', payType==='alipay' ? 'active' : '']" @click="payType='alipay'">
              <el-icon class="pay-icon" :size="32" color="#1677FF"><CreditCard /></el-icon>
              <div class="pay-label">支付宝支付</div>
              <div class="pay-desc">推荐已安装支付宝的用户使用</div>
              <div v-if="payType==='alipay'" class="pay-checked"></div>
            </div>
            <div :class="['pay-method', payType==='other' ? 'active' : '']" @click="payType='other'">
              <el-icon class="pay-icon" :size="32" color="#FAAD14"><Money /></el-icon>
              <div class="pay-label">其他支付</div>
              <div class="pay-desc">推荐需要其他支付的用户使用</div>
              <div v-if="payType==='other'" class="pay-checked"></div>
            </div>
          </div>
          <div class="pay-title pay-title-other">其他支付方式</div>
          <div class="pay-others">
            <div class="pay-other-item" :class="{active: payType==='balance'}" @click="payType='balance'">
              <el-icon class="pay-other-icon" :size="24" color="#F97316"><Wallet /></el-icon>
              <div class="pay-other-info">
                <div class="pay-other-label">余额支付</div>
                <div class="pay-other-desc">使用账户余额支付 ¥{{ userBalance.toFixed(2) }}</div>
              </div>
              <input type="checkbox" :checked="payType==='balance'" readonly />
            </div>
            <div class="pay-other-item" style="pointer-events:none;opacity:0.5;">
              <el-icon class="pay-other-icon" :size="24" color="#F56C6C"><Ticket /></el-icon>
              <div class="pay-other-info">
                <div class="pay-other-label">优惠券</div>
                <div class="pay-other-desc">暂无可用优惠券</div>
              </div>
              <input type="checkbox" disabled />
            </div>
          </div>
        </div>
        <div class="pay-bottom">
          <button class="btn-pay" @click="handlePay" :disabled="paying">
            <span v-if="!paying">确认支付￥{{ price }}</span>
            <span v-else>支付中...</span>
          </button>
          <div class="pay-countdown">
            支付剩余时间：<span class="countdown">{{ countdownText }}</span>
          </div>
          <div class="pay-tip">
            点击支付即表示您已同意 <a href="#" class="pay-link">《支付服务协议》</a>
          </div>
        </div>
      </div>
    </div>
    <BalanceNotEnoughModal
      v-if="showBalanceModal"
      :balance="userBalance"
      :needAmount="Number(price)"
      @close="handleBalanceClose"
    />
    <PaySuccessModal
      v-if="showSuccessModal"
      :orderId="props.orderId || 'DEFAULT_ORDER'"
      :payType="payType"
      :amount="props.price || 0"
      @close="handleSuccessClose"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BalanceNotEnoughModal from './BalanceNotEnoughModal.vue'
import PaySuccessModal from './PaySuccessModal.vue'
import { useUserStore } from '@/stores/user'
import { paymentApi } from '@/api/payment' // 引入支付API
import { ElMessage } from 'element-plus'
import { CLIENT_MESSAGES } from '@/utils/clientMessages'
import { Shop, CreditCard, Money, Wallet, Ticket } from '@element-plus/icons-vue'

const props = defineProps({
  shopLogo: { type: String, default: '/images/shop-logo.png' },
  shopName: { type: String, default: '某旗舰店' },
  shopDesc: { type: String, default: '' },
  orderId: { type: String, default: '' },
  price: { type: [String, Number], default: '' },
  countdown: { type: Number, default: 900 }, // 秒
})

const emits = defineEmits(['close','timeout','paySuccess'])

const userStore = useUserStore()
const payType = ref('alipay') // alipay | other | balance
const remain = ref(props.countdown)
const showBalanceModal = ref(false)
const showSuccessModal = ref(false)
const paying = ref(false) // 支付中状态

const userBalance = computed(() => userStore.user?.balance ?? 0)
const countdownText = computed(() => {
  const m = String(Math.floor(remain.value/60)).padStart(2,'0')
  const s = String(remain.value%60).padStart(2,'0')
  return `${m}:${s}`
})

let timer: any = null

onMounted(() => {
  timer = setInterval(() => {
    if(remain.value>0) remain.value--
    else {
      clearInterval(timer)
      // emit取消事件
      emits('timeout')
    }
  }, 1000)
})

onUnmounted(() => { 
  timer && clearInterval(timer) 
})

async function handlePay() {
  if (paying.value) return // 防止重复点击
  
  paying.value = true
  console.log('🚀 开始支付流程')
  console.log('💳 支付方式:', payType.value)
  console.log('💰 支付金额:', props.price)
  console.log('📝 订单ID:', props.orderId)
  
  try {
    if(payType.value === 'balance') {
      if(Number(userBalance.value) < Number(props.price)) {
        showBalanceModal.value = true
        paying.value = false
        return
      }
      
      console.log('💰 使用余额支付...')
      // 🎨 前端UI设计阶段 - 模拟支付过程（已注释，用于检查页面功能）
      /*
      await simulatePayment()
      console.log('✅ 余额支付成功，扣除金额:', props.price)
      */
      
      // ✅ 真实API调用（已启用）
      const response = await paymentApi.getPaymentUrl({
        orderId: props.orderId,
        payType: 'balance',
        amount: props.price
      })
      
      if (response.success) {
        console.log('✅ 余额支付成功，扣除金额:', props.price)
      } else {
        throw new Error(response.msg || '支付失败')
      }
      
    } else if(payType.value === 'alipay') {
      console.log('💙 跳转支付宝支付...')
      // 🎨 前端UI设计阶段 - 模拟支付过程（已注释，用于检查页面功能）
      /*
      await simulatePayment()
      console.log('✅ 支付宝支付成功')
      */
      
      // ✅ 真实API调用（已启用）
      const response = await paymentApi.getPaymentUrl({
        orderId: props.orderId,
        payType: 'alipay',
        amount: props.price
      })
      
      if (response.success && response.data) {
        // 跳转到支付宝支付页面
        window.location.href = response.data
        return
      } else {
        throw new Error(response.msg || '获取支付链接失败')
      }
      
    } else {
      console.log('🔧 使用其他支付方式...')
      // 🎨 前端UI设计阶段 - 模拟支付过程（已注释，用于检查页面功能）
      /*
      await simulatePayment()
      console.log('✅ 其他支付方式支付成功')
      */
      
      // ✅ 真实API调用（已启用）
      const response = await paymentApi.getPaymentUrl({
        orderId: props.orderId,
        payType: payType.value,
        amount: props.price
      })
      
      if (response.success && response.data) {
        // 跳转到支付页面
        window.location.href = response.data
        return
      } else {
        throw new Error(response.msg || '获取支付链接失败')
      }
    }
    
    console.log('🎉 支付完成，准备显示成功弹窗...')
    
    // 确保支付状态先重置
    paying.value = false
    
    // 立即显示成功弹窗
    console.log('📱 设置showSuccessModal为true')
    showSuccessModal.value = true
    console.log('📱 showSuccessModal当前值:', showSuccessModal.value)
    
    // 触发支付成功事件
    const paymentInfo = {
      orderId: props.orderId || 'DEFAULT_ORDER',
      payType: payType.value,
      amount: props.price || 0
    }
    console.log('📤 触发支付成功事件:', paymentInfo)
    emits('paySuccess', paymentInfo)
    
    // 等待一下再检查弹窗状态
    setTimeout(() => {
      console.log('⏰ 1秒后检查弹窗状态:', showSuccessModal.value)
    }, 1000)
    
  } catch (error) {
    console.error('❌ 支付失败:', error)
    ElMessage.error(CLIENT_MESSAGES.GLOBAL.UNKNOWN_ERROR)
    paying.value = false
  }
}

// 🎨 前端UI设计阶段 - 模拟支付过程（已注释，用于检查页面功能）
/*
const simulatePayment = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('💳 模拟支付处理中...')
      resolve(true)
    }, 2000)
  })
}
*/

function handleBalanceClose() {
  showBalanceModal.value = false
}

function handleSuccessClose() {
  showSuccessModal.value = false
  emits('close')
}
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.order-pay-modal {
  width: 420px;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
}
.modal-header {
  background: linear-gradient(135deg, #2196F3 0%, #2575FC 100%);
  padding: 32px 32px 18px 32px;
  position: relative;
  text-align: center;
}
.modal-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}
.modal-subtitle {
  color: #e3f0ff;
  font-size: 16px;
  margin-bottom: 0;
}
.modal-close {
  position: absolute;
  top: 18px;
  right: 24px;
  background: none;
  border: none;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
  border-radius: 4px;
  transition: background 0.2s;
}
.order-info-bar {
  display: flex;
  align-items: center;
  padding: 18px 24px 18px 24px;
  border-bottom: 1px solid #e3eaf2;
  background: #fff;
}
.shop-logo-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
  border: 1.5px dashed #b3c6e6;
  background: #f0f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2196F3;
}
.shop-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.shop-name {
  font-size: 18px;
  font-weight: 900;
  color: #222;
}
.shop-desc {
  font-size: 14px;
  color: #888;
}
.order-id {
  font-size: 13px;
  color: #b3b3b3;
  margin-top: 2px;
}
.order-amount {
  font-size: 26px;
  color: #ff4d4f;
  font-weight: 900;
  margin-left: 12px;
}
.pay-section {
  padding: 18px 24px 0 24px;
}
.pay-title {
  font-size: 18px;
  font-weight: 900;
  color: #222;
  margin-bottom: 12px;
}
.pay-methods {
  display: flex;
  gap: 18px;
  margin-bottom: 18px;
}
.pay-method {
  flex: 1;
  background: #f8fbff;
  border: 2px solid #e3eaf2;
  border-radius: 16px;
  padding: 18px 0 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: border 0.2s, box-shadow 0.2s;
}
.pay-method.active {
  border-color: #2196F3;
  box-shadow: 0 2px 8px rgba(33,150,243,0.10);
}
.pay-icon {
  width: 38px;
  height: 38px;
  margin-bottom: 8px;
}
.pay-label {
  font-size: 17px;
  font-weight: 700;
  color: #222;
  margin-bottom: 2px;
}
.pay-desc {
  font-size: 13px;
  color: #b3b3b3;
}
.pay-checked {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: #2196F3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pay-checked::after {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
}
.pay-title-other {
  margin-top: 18px;
  margin-bottom: 10px;
}
.pay-others {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pay-other-item {
  display: flex;
  align-items: center;
  background: #f8fbff;
  border-radius: 12px;
  padding: 10px 16px;
  margin-bottom: 0;
}
.pay-other-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}
.pay-other-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pay-other-label {
  font-size: 15px;
  color: #222;
  font-weight: 600;
}
.pay-other-desc {
  color: #b3b3b3;
  font-size: 13px;
}
.pay-bottom {
  padding: 24px 24px 18px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.btn-pay {
  width: 100%;
  background: linear-gradient(90deg, #2196F3 0%, #2575FC 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 16px 0;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 6px;
  box-shadow: 0 2px 8px rgba(33,150,243,0.10);
  transition: background 0.2s;
}
.btn-pay:disabled {
  background: #b3c6e6;
  cursor: not-allowed;
}
.pay-countdown {
  color: #ff4d4f;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
}
.countdown {
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 1px;
}
.pay-tip {
  color: #888;
  font-size: 13px;
  margin-top: 2px;
}
.pay-link {
  color: #2196F3;
  text-decoration: underline;
}
.pay-other-item.active {
  border: 2px solid #2196F3;
  background: #f0f7ff;
}
.pay-other-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #2196F3;
  cursor: pointer;
}
</style> 