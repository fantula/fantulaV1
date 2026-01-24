<template>
  <div class="checkout-page">
    <div class="checkout-content">
      <!-- 头部导航 -->
      <div class="checkout-header">
        <button class="back-btn" @click="router.back()">
          <el-icon><ArrowLeft /></el-icon> 返回
        </button>
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
        <button class="action-btn" @click="router.push('/')">返回首页</button>
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

          <!-- 预订单列表 -->
          <div class="order-list">
            <div v-for="order in preOrders" :key="order.id" class="order-card glass-card">
              <div class="order-header-row">
                <span class="order-no">订单号: {{ order.order_no }}</span>
                <span class="order-status">待支付</span>
              </div>
              
              <div class="order-body">
                <div class="product-thumb">
                  <div class="sq-cover-img-container">
                    <img :src="order.product_snapshot?.image || '/images/shared/logo.png'" class="sq-cover-img" />
                  </div>
                </div>
                <div class="product-info">
                  <div class="product-name">{{ order.product_snapshot?.product_name }}</div>
                  <div class="product-spec">
                    {{ formatSpec(order.sku_snapshot?.spec_combination) }}
                  </div>
                </div>
                <div class="product-price">
                  <div class="price-val">¥{{ order.unit_price.toFixed(2) }}</div>
                  <div class="qty">x{{ order.quantity }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 温馨提示 -->
          <div class="tips-card glass-card">
            <h4><el-icon><InfoFilled /></el-icon> 温馨提示</h4>
            <ul>
              <li>资源已为您锁定，请尽快完成支付。</li>
              <li>超时未支付将自动释放，需重新下单。</li>
              <li>如遇问题，请联系在线客服。</li>
            </ul>
          </div>
        </div>

        <!-- 右侧：结算台 -->
        <div class="summary-section">
          <div class="summary-card glass-card sticky-card">
            <h3 class="card-title">支付详情</h3>
            
            <!-- 价格明细 -->
            <div class="price-rows">
              <div class="price-row">
                <span>商品总额</span>
                <span class="val">¥{{ totalProductAmount.toFixed(2) }}</span>
              </div>
              
              <!-- 优惠券选择 -->
              <div class="price-row coupon-row" @click="showCouponModal = true">
                <div class="coupon-label">
                  <span>优惠券</span>
                  <el-tag v-if="selectedCoupon" size="small" type="danger" effect="dark" class="discount-tag">
                    已抵扣 ¥{{ couponDiscount.toFixed(2) }}
                  </el-tag>
                </div>
                <div class="coupon-action">
                  <span v-if="selectedCoupon" class="val discount">-¥{{ couponDiscount.toFixed(2) }}</span>
                  <span v-else class="placeholder">选择优惠券</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
              </div>

              <div class="divider"></div>

              <div class="price-row total">
                <span>应付金额</span>
                <span class="val final">¥{{ finalPayAmount.toFixed(2) }}</span>
              </div>
            </div>

            <!-- 支付方式 (只保留余额) -->
            <div class="payment-method">
              <div class="method-title">支付方式</div>
              <div class="balance-card active">
                <div class="balance-icon">
                  <el-icon><Wallet /></el-icon>
                </div>
                <div class="balance-info">
                  <div class="method-name">余额支付</div>
                  <div class="user-balance">可用余额: ¥{{ userBalance.toFixed(2) }}</div>
                </div>
                <div class="check-mark"><el-icon><Select /></el-icon></div>
              </div>
            </div>

            <!-- 支付按钮 -->
            <div class="action-area">
              <button 
                class="pay-btn" 
                :disabled="paying || remainingSeconds <= 0"
                @click="handlePay"
              >
                <div v-if="paying" class="btn-loader"></div>
                <span v-else>立即支付 ¥{{ finalPayAmount.toFixed(2) }}</span>
              </button>
              <div class="agreement-text">
                点击支付即表示同意 <a href="#">服务协议</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗组件 -->
    <BalanceNotEnoughModal
      v-if="showBalanceModal"
      :balance="userBalance"
      :needAmount="finalPayAmount"
      @close="showBalanceModal = false"
    />
    
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Timer, InfoFilled, ArrowRight, Wallet, Select } from '@element-plus/icons-vue'
import { useCheckout } from '@/composables/client/useCheckout'
import BalanceNotEnoughModal from '@/components/BalanceNotEnoughModal.vue'
import PaySuccessModal from '@/components/PaySuccessModal.vue'
import CouponSelectorModal from '@/components/modal/business/CouponSelectorModal.vue'

definePageMeta({ ssr: false })

const route = useRoute()
const router = useRouter()
const showCouponModal = ref(false)

// Use Composable
const {
  loading,
  error,
  preOrders,
  paying,
  showBalanceModal,
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
  formatSpec
} = useCheckout()

// Computed
const preOrderIds = computed(() => {
  const id = route.params.id as string
  const ids = route.query.ids as string
  if (ids) return ids.split(',')
  if (id) return [id]
  return []
})

// Lifecycle
onMounted(() => {
  loadPreOrders(preOrderIds.value)
})

const handlePaySuccessClose = () => {
  showPaySuccess.value = false
  router.push('/profile/orders')
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

.back-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-sub);
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: var(--active-orange);
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

.order-card {
  margin-bottom: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.order-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary-blue);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.order-header-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--text-sub);
}

.order-body {
  display: flex;
  gap: 16px;
}

.product-thumb {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 6px;
}

.product-spec {
  font-size: 13px;
  color: var(--text-sub);
}

.product-price {
  text-align: right;
}

.price-val {
  font-size: 18px;
  font-weight: 700;
  color: var(--active-orange);
}

.qty {
  font-size: 13px;
  color: var(--text-sub);
  margin-top: 4px;
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
.sticky-card {
  position: sticky;
  top: 100px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #fff;
  border-left: 4px solid var(--primary-blue);
  padding-left: 12px;
}

.price-rows {
  margin-bottom: 24px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  font-size: 14px;
  color: var(--text-sub);
}

.val {
  color: var(--text-main);
  font-weight: 500;
}

/* Coupon Row */
.coupon-row {
  cursor: pointer;
  padding: 8px 0;
  transition: opacity 0.2s;
}

.coupon-row:hover {
  opacity: 0.8;
}

.coupon-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discount-tag {
  border: none;
  background: rgba(239, 68, 68, 0.2);
  color: #F87171;
}

.coupon-action {
  display: flex;
  align-items: center;
  gap: 4px;
}

.placeholder {
  color: var(--text-sub);
  font-size: 13px;
}

.val.discount {
  color: #EF4444;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 20px 0;
}

.price-row.total .val.final {
  font-size: 28px;
  color: var(--active-orange);
  font-weight: 700;
  text-shadow: 0 0 15px rgba(249, 115, 22, 0.3);
}

/* Payment Method */
.method-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-sub);
  margin-bottom: 16px;
}

.balance-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(23, 143, 198, 0.1);
  border: 1px solid rgba(23, 143, 198, 0.3);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 32px;
  position: relative;
  transition: all 0.2s;
}

.balance-card.active {
  background: rgba(23, 143, 198, 0.15);
  border-color: var(--primary-blue);
  box-shadow: 0 4px 20px rgba(23, 143, 198, 0.15);
}

.balance-icon {
  font-size: 28px;
  color: var(--primary-blue);
}

.balance-info {
  flex: 1;
}

.method-name {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.user-balance {
  font-size: 13px;
  color: var(--text-sub);
  margin-top: 4px;
}

.check-mark {
  margin-left: auto;
  color: var(--primary-blue);
  font-weight: bold;
  font-size: 18px;
}

/* Action Area */
.pay-btn {
  width: 100%;
  background: linear-gradient(90deg, var(--active-orange) 0%, #FB923C 100%);
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.pay-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
}

.pay-btn:disabled {
  background: #334155;
  color: #64748B;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.agreement-text {
  text-align: center;
  font-size: 12px;
  color: var(--text-sub);
  margin-top: 16px;
}

.agreement-text a {
  color: var(--primary-blue);
  text-decoration: none;
  transition: color 0.2s;
}

.agreement-text a:hover {
  color: var(--active-orange);
}

/* Loading/Error */
.checkout-loading, .checkout-error {
  text-align: center;
  padding: 100px 0;
  color: var(--text-sub);
}

.action-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 16px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
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
