<template>
  <div class="checkout-page dark-theme">
    <div class="checkout-bg"></div>
    
    <div class="checkout-content">
      <!-- 头部导航 -->
      <div class="checkout-header">
        <button class="back-btn" @click="goBack">
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
                  <img :src="order.product_snapshot?.image || '/images/shared/logo.png'" />
                </div>
                <div class="product-info">
                  <div class="product-name">{{ order.product_snapshot?.product_name }}</div>
                  <div class="product-spec">
                    {{ formatSpec(order.sku_snapshot?.spec_combination) }}
                  </div>
                </div>
                <div class="product-price">
                  <div class="price-val">{{ order.unit_price.toFixed(2) }}</div>
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
                <span class="val">{{ totalProductAmount.toFixed(2) }}</span>
              </div>
              
              <!-- 优惠券选择 -->
              <div class="price-row coupon-row" @click="showCouponModal = true">
                <div class="coupon-label">
                  <span>优惠券</span>
                  <el-tag v-if="selectedCoupon" size="small" type="danger" effect="dark">
                    已抵扣 {{ couponDiscount.toFixed(2) }}
                  </el-tag>
                </div>
                <div class="coupon-action">
                  <span v-if="selectedCoupon" class="val discount">-{{ couponDiscount.toFixed(2) }}</span>
                  <span v-else class="placeholder">选择优惠券</span>
                  <el-icon><ArrowRight /></el-icon>
                </div>
              </div>

              <div class="divider"></div>

              <div class="price-row total">
                <span>应付金额</span>
                <span class="val final">{{ finalPayAmount.toFixed(2) }}</span>
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
                  <div class="user-balance">可用余额: {{ userBalance.toFixed(2) }}</div>
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
                <span v-else>立即支付 {{ finalPayAmount.toFixed(2) }}</span>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { supabasePreOrderApi, type PreOrder } from '@/api/supabase'
import { couponApi, type UserCoupon } from '@/api/coupon'
import { ElMessage } from 'element-plus'
import { ArrowLeft, Timer, InfoFilled, ArrowRight, Wallet, Select } from '@element-plus/icons-vue'
import BalanceNotEnoughModal from '@/components/BalanceNotEnoughModal.vue'
import PaySuccessModal from '@/components/PaySuccessModal.vue'
import CouponSelectorModal from '@/components/CouponSelectorModal.vue'

definePageMeta({ ssr: false })

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 状态
const loading = ref(true)
const error = ref('')
const preOrders = ref<PreOrder[]>([])
const paying = ref(false)
const showBalanceModal = ref(false)
const showPaySuccess = ref(false)
const showCouponModal = ref(false)

// 结算数据
const lastOrderId = ref('')
const lastOrderAmount = ref(0)
const selectedCoupon = ref<UserCoupon | null>(null)
const couponDiscount = ref(0) // 实际抵扣金额

// 倒计时
const remainingSeconds = ref(0)
let countdownTimer: any = null

// 计算属性
const preOrderIds = computed(() => {
  const id = route.params.id as string
  const ids = route.query.ids as string
  if (ids) return ids.split(',')
  if (id) return [id]
  return []
})

const totalProductAmount = computed(() => {
  return preOrders.value.reduce((sum, o) => sum + o.total_amount, 0)
})

const finalPayAmount = computed(() => {
  // preOrder.total_amount 已经被 applyCouponToPreOrder 更新为折后价了
  // 所以直接累加即可。
  // 注意：如果需要显示"原价"和"折扣"，可能需要额外字段，或者通过 couponDiscount 反推
  return preOrders.value.reduce((sum, o) => sum + o.total_amount, 0)
})

const userBalance = computed(() => userStore.user?.balance ?? 0)

const orderSkuIds = computed(() => {
  return preOrders.value.map(o => o.sku_snapshot?.sku_id).filter(Boolean)
})

const orderProductIds = computed(() => {
  return preOrders.value.map(o => o.product_snapshot?.product_id).filter(Boolean)
})

const formatCountdown = computed(() => {
  const mins = Math.floor(remainingSeconds.value / 60)
  const secs = remainingSeconds.value % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

// 生命周期
onMounted(async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push('/')
    return
  }
  await userStore.fetchUserInfo()
  await loadPreOrders()
})

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})

// 方法
const loadPreOrders = async () => {
  loading.value = true
  try {
    if (preOrderIds.value.length === 0) throw new Error('缺少订单 ID')
    
    const list: PreOrder[] = []
    for (const id of preOrderIds.value) {
      const res = await supabasePreOrderApi.getPreOrder(id)
      if (res.success && res.pre_order) list.push(res.pre_order)
    }
    
    if (list.length === 0) throw new Error('订单不存在或已过期')
    preOrders.value = list
    
    // 初始化倒计时
    const minExpires = Math.min(...list.map(o => new Date(o.expires_at).getTime()))
    startCountdown(minExpires)
    
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const startCountdown = (expiresTime: number) => {
  const update = () => {
    const now = Date.now()
    remainingSeconds.value = Math.max(0, Math.floor((expiresTime - now) / 1000))
    if (remainingSeconds.value <= 0) {
      error.value = '订单已过期，请重新下单'
      if (countdownTimer) clearInterval(countdownTimer)
    }
  }
  update()
  countdownTimer = setInterval(update, 1000)
}

const handleCouponSelect = async (coupon: UserCoupon | null) => {
  selectedCoupon.value = coupon
  
  // 1. 调用 API 持久化应用优惠券到预订单
  // 注意：如果是取消优惠券，coupon?.id 为 undefined，API 会处理为清除
  const couponId = coupon?.id || null
  
  // 假设只处理单个订单（目前逻辑）
  const preOrder = preOrders.value[0]
  if (!preOrder) return

  loading.value = true // 短暂 loading 避免闪烁
  try {
      const res = await supabasePreOrderApi.applyCouponToPreOrder(preOrder.id, couponId)
      
      if (res.success) {
          // 2. 更新本地数据
          if (res.total_amount !== undefined) {
             // 更新该订单的 total_amount (虽然前端显示的 sum 是 computed，但源数据变了会自动更新)
             preOrder.total_amount = res.total_amount
             
             // 更新显示的折扣金额
             couponDiscount.value = res.discount_amount || 0
          }
          
          if (!coupon) {
             ElMessage.success('已取消优惠券')
          } else {
             ElMessage.success('优惠券使用成功')
          }
      } else {
          ElMessage.error(res.error || '应用优惠券失败')
          // 回滚选择
          if (coupon) selectedCoupon.value = null
          couponDiscount.value = 0
      }
  } catch (e: any) {
      ElMessage.error('系统异常: ' + (e.message || JSON.stringify(e)))
      console.error(e)
  } finally {
      loading.value = false
  }
}

const handlePay = async () => {
  if (paying.value) return
  
  // 余额预检
  if (userBalance.value < finalPayAmount.value) {
    showBalanceModal.value = true
    return
  }
  
  paying.value = true
  try {
    // 假设只支持单订单支付，如果是批量，需循环调用或后端支持批量
    // 目前逻辑先取第一个 (如需支持批量，需后端改造)
    const preOrder = preOrders.value[0]
    
    const res = await supabasePreOrderApi.confirmPreOrder(
        preOrder.id, 
        'balance',
        selectedCoupon.value?.id // 传入优惠券ID
    )
    
    if (!res.success) {
      if (res.error?.includes('余额不足')) {
        showBalanceModal.value = true
      } else {
        ElMessage.error(res.error || '支付失败')
      }
      return
    }
    
    // 成功
    lastOrderId.value = res.order_no || ''
    lastOrderAmount.value = finalPayAmount.value
    showPaySuccess.value = true
    await userStore.fetchUserInfo() // 刷新余额
    
  } catch (e: any) {
    ElMessage.error(e.message || '系统异常')
  } finally {
    paying.value = false
  }
}

const formatSpec = (spec: any) => {
  if (!spec) return '默认规格'
  return Object.values(spec).join(' / ')
}

const goBack = () => router.back()

const handlePaySuccessClose = () => {
  showPaySuccess.value = false
  if (preOrders.value.length === 1) {
    router.push(`/profile/orders`) // 简化跳转逻辑
  } else {
    router.push('/profile/orders')
  }
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  position: relative;
  background: #0F172A;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

.checkout-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: radial-gradient(circle at 50% 0%, rgba(76, 122, 224, 0.15), transparent 70%);
  pointer-events: none;
}

.checkout-content {
  position: relative;
  max-width: 1100px;
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
  color: #94A3B8;
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
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-left: 20px;
}

/* Glass Card */
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
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
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.2);
  color: #EAB308;
  padding: 12px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-size: 14px;
}

.time-highlight {
  font-family: monospace;
  font-size: 16px;
}

.order-card {
  margin-bottom: 20px;
}

.order-header-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #94A3B8;
}

.order-body {
  display: flex;
  gap: 16px;
}

.product-thumb img {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  object-fit: cover;
  background: rgba(0,0,0,0.2);
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 15px;
  font-weight: 500;
  color: #F1F5F9;
  margin-bottom: 6px;
}

.product-spec {
  font-size: 13px;
  color: #64748B;
}

.product-price {
  text-align: right;
}

.price-val {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.qty {
  font-size: 13px;
  color: #64748B;
  margin-top: 4px;
}

.tips-card h4 {
  font-size: 14px;
  color: #F1F5F9;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tips-card ul {
  margin: 0;
  padding-left: 20px;
  color: #64748B;
  font-size: 13px;
  line-height: 1.6;
}

/* Summary Section */
.sticky-card {
  position: sticky;
  top: 100px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.price-rows {
  margin-bottom: 24px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #94A3B8;
}

.val {
  color: #F1F5F9;
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

.coupon-action {
  display: flex;
  align-items: center;
  gap: 4px;
}

.placeholder {
  color: #64748B;
  font-size: 13px;
}

.val.discount {
  color: #EF4444;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 16px 0;
}

.price-row.total .val.final {
  font-size: 24px;
  color: #4C7AE0;
  font-weight: 600;
}

/* Payment Method */
.method-title {
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 12px;
}

.balance-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(76, 122, 224, 0.1);
  border: 1px solid rgba(76, 122, 224, 0.3);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  position: relative;
}

.balance-icon {
  font-size: 24px;
  color: #4C7AE0;
}

.method-name {
  font-size: 15px;
  font-weight: 500;
  color: #fff;
}

.user-balance {
  font-size: 12px;
  color: #94A3B8;
  margin-top: 2px;
}

.check-mark {
  margin-left: auto;
  color: #4C7AE0;
  font-weight: bold;
}

/* Action Area */
.pay-btn {
  width: 100%;
  background: #4C7AE0;
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pay-btn:hover {
  background: #3B66C5;
  transform: translateY(-1px);
}

.pay-btn:disabled {
  background: #334155;
  color: #64748B;
  cursor: not-allowed;
  transform: none;
}

.agreement-text {
  text-align: center;
  font-size: 12px;
  color: #64748B;
  margin-top: 12px;
}

.agreement-text a {
  color: #4C7AE0;
  text-decoration: none;
}

/* Loading/Error */
.checkout-loading, .checkout-error {
  text-align: center;
  padding: 100px 0;
  color: #94A3B8;
}

.action-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 24px;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
}

.btn-loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
