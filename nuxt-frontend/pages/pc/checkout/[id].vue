<template>
  <div class="checkout-page">
    <div class="checkout-content">
      <!-- 头部导航 -->
      <div class="checkout-header">
        <BaseButton themeId="secondary" @click="router.back()">
          <el-icon><ArrowLeft /></el-icon> 返回
        </BaseButton>
        <div class="page-title">订单结算</div>
      </div>

      <!-- 加载中 -->
      <div class="checkout-loading" v-if="loading">
        <div class="glass-loader"></div>
        <p>正在加载订单信息...</p>
      </div>

      <!-- 错误状态 -->
      <div class="checkout-error" v-else-if="error">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
        <BaseButton themeId="secondary" @click="router.push(pcRoutes.home())">返回首页</BaseButton>
      </div>

      <!-- 正常结算 -->
      <div class="checkout-main" v-else-if="preOrders.length > 0">
        <!-- 左侧：订单预览 -->
        <div class="order-section">
          <!-- 倒计时提示 -->
          <div class="countdown-bar" v-if="remainingSeconds > 0">
            <el-icon><Timer /></el-icon>
            <span>请在 <strong class="time-highlight">{{ formatCountdown }}</strong> 内完成支付，超时将释放库存</span>
          </div>

          <!-- 预订单列表 (Extract: CheckoutOrderList) -->
          <CheckoutOrderList :orders="preOrders" />
          
          <!-- FAQ Section -->
          <div class="faq-section" v-if="checkoutFaqs.length > 0">
            <div class="faq-card glass-card">
              <h4><el-icon><QuestionFilled /></el-icon> 常见问题</h4>
              <div class="faq-list">
                <div 
                  v-for="(faq, index) in checkoutFaqs" 
                  :key="faq.id" 
                  class="faq-item"
                  :class="{ active: activeFaq === index }"
                >
                  <div class="faq-question" @click="toggleFaq(index)">
                    <span class="q-text">{{ faq.question }}</span>
                    <el-icon class="arrow-icon"><ArrowDown /></el-icon>
                  </div>
                  <div class="faq-answer-wrapper" :style="{ maxHeight: activeFaq === index ? '200px' : '0' }">
                    <div class="faq-answer">{{ faq.answer }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 温馨提示 moved to bottom of left section -->
          <div class="tips-container">
             <div class="tips-card glass-card">
              <h4><el-icon><InfoFilled /></el-icon> 温馨提示</h4>
              <ul>
                <li>资源已为您锁定，请尽快完成支付。</li>
                <li>超时未支付将自动释放，需重新下单。</li>
                <li>如遇问题，请联系在线客服。</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 右侧：结算台 (Extract: CheckoutSummary) -->
        <div class="summary-section">
          <CheckoutSummary 
            :amount-details="{
                total: totalProductAmount,
                discount: couponDiscount,
                final: finalPayAmount
            }"
            :user-balance="userBalance"
            :countdown-seconds="remainingSeconds"
            :loading="refreshingBalance"
            :paying="paying"
            :coupon="selectedCoupon"
            @select-coupon="showCouponModal = true"
            @refresh-balance="refreshBalance"
            @pay="handlePayActionFromComponent"
          />
        </div>
      </div>
    </div>

    <!-- 弹窗组件 -->
    
    <PaySuccessModal 
      v-if="showPaySuccess" 
      :orderId="lastOrderId" 
      :amount="lastOrderAmount" 
      :payType="'balance'"
      @close="handlePaySuccessClose"
    />

    <CouponSelectorModal
      v-model="showCouponModal"
      :orderAmount="totalProductAmount"
      :skuIds="orderSkuIds"
      :productIds="orderProductIds"
      :currentCouponId="selectedCoupon?.id"
      @select="handleCouponSelect"
    />

    <!-- Recharge Modal -->
    <WalletRechargeModal
      v-if="showRechargeModal"
      @close="handleRechargeClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pcRoutes } from '@/config/client-routes'
import { ArrowLeft, Timer, InfoFilled, QuestionFilled, ArrowDown } from '@element-plus/icons-vue'
import { useCheckout } from '@/composables/client/useCheckout'
// BalanceNotEnoughModal import removed
const PaySuccessModal = defineAsyncComponent(() => import('@/components/pc/modal/PaySuccessModal.vue'))
const CouponSelectorModal = defineAsyncComponent(() => import('@/components/pc/modal/business/CouponSelectorModal.vue'))
const WalletRechargeModal = defineAsyncComponent(() => import('@/components/pc/modal/business/WalletRechargeModal.vue'))
import { clientFaqApi, type ClientFaq } from '@/api/client/help-center'
import CheckoutOrderList from '@/components/pc/checkout/CheckoutOrderList.vue'
import CheckoutSummary from '@/components/pc/checkout/CheckoutSummary.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

definePageMeta({
  layout: 'pc', ssr: false })

const route = useRoute()
const router = useRouter()
const showCouponModal = ref(false)
const showRechargeModal = ref(false)
const checkoutFaqs = ref<ClientFaq[]>([])
const activeFaq = ref<number | null>(null)

// Use Composable
const {
  loading,
  error,
  preOrders,
  paying,
  showPaySuccess,
  
  lastOrderId,
  lastOrderAmount,
  selectedCoupon,
  couponDiscount,
  
  remainingSeconds,
  formatCountdown,
  
  totalProductAmount,
  finalPayAmount,
  userBalance,
  orderSkuIds,
  orderProductIds,
  
  loadPreOrders,
  handleCouponSelect,
  handlePay,
  refreshBalance, 
  refreshingBalance 
} = useCheckout()

// Computed
const preOrderIds = computed(() => {
  const id = route.params.id as string
  const ids = route.query.ids as string
  if (ids) return ids.split(',')
  if (id) return [id]
  return []
})

const handlePayActionFromComponent = (insufficient: boolean) => {
    if (insufficient) {
        showRechargeModal.value = true
        return
    }
    handlePay()
}

const toggleFaq = (index: number) => {
    activeFaq.value = activeFaq.value === index ? null : index
}

const fetchFaqs = async () => {
    const res = await clientFaqApi.getCheckoutFaqs()
    if (res.success) {
        checkoutFaqs.value = res.faqs
    }
}

const handleRechargeClose = () => {
  showRechargeModal.value = false
  refreshBalance()
}

// Lifecycle
onMounted(() => {
  loadPreOrders(preOrderIds.value)
  fetchFaqs()
})

const handlePaySuccessClose = () => {
  showPaySuccess.value = false
  router.push(pcRoutes.profileOrders())
}
</script>

<style scoped>
.checkout-page {
  /* Using global background, no need for specific background here as per theme */
  min-height: calc(100vh - 80px); /* Adjust for header */
  position: relative;
  font-family: 'PingFang SC', system-ui, sans-serif;
  color: var(--text-main);
}

.checkout-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

/* Header */
.checkout-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-left: 20px;
  color: #fff;
  text-shadow: 0 0 10px rgba(23, 143, 198, 0.4);
}

/* Glass Card Global Override for Local Use if needed, 
   but ideally we use global .glass-card if available, 
   here we define local specific tweaks */
.glass-card {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Main Layout */
.checkout-main {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
}

/* Order Section */
.countdown-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.2);
  color: var(--active-orange);
  padding: 12px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-size: 14px;
}

.time-highlight {
  font-family: monospace;
  font-size: 16px;
  font-weight: 700;
}

/* FAQ Section */
.faq-section {
    margin-top: 24px;
    margin-bottom: 24px;
}

.faq-card h4 {
  font-size: 15px;
  color: var(--text-main);
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.faq-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.faq-item:last-child {
    border-bottom: none;
}

.faq-question {
    padding: 12px 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: var(--text-sub);
    transition: color 0.2s;
}

.faq-question:hover, .faq-item.active .faq-question {
    color: var(--active-orange);
}

.faq-question .arrow-icon {
    transition: transform 0.3s;
    font-size: 12px;
}

.faq-item.active .arrow-icon {
    transform: rotate(180deg);
}

.faq-answer-wrapper {
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
}

.faq-answer {
    padding-bottom: 12px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.6;
}

.tips-container {
    margin-top: auto;
}

.tips-card h4 {
  font-size: 15px;
  color: var(--text-main);
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tips-card ul {
  margin: 0;
  padding-left: 20px;
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.8;
}

/* Summary Section */
.summary-section {
  display: flex;
  flex-direction: column;
}

/* Loading/Error */
.checkout-loading, .checkout-error {
  text-align: center;
  padding: 100px 0;
  color: var(--text-sub);
}

.glass-loader {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: var(--primary-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
