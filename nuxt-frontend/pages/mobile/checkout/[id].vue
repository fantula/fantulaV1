<template>
  <div class="checkout-page-glass">
    <!-- Header -->
    <MobileSubPageHeader title="确认订单" :back="() => router.back()" />

    <!-- Loading / Error -->
    <div v-if="loading" class="state-box">
       <div class="spinner"></div>
       <span>加载订单中...</span>
    </div>
    
    <div v-else-if="error" class="state-box error">
       <div class="error-icon"><el-icon><CircleCloseFilled /></el-icon></div>
       <span>{{ error }}</span>
       <button class="btn-retry" @click="router.replace('/')">返回首页</button>
    </div>

    <!-- Main Content -->
    <div v-else-if="preOrders.length > 0" class="content">
       
       <!-- Countdown Timer -->
       <div class="countdown-bar-glass" v-if="remainingSeconds > 0">
          <el-icon><Timer /></el-icon>
          <span>请在 <span class="time-val">{{ formatCountdown }}</span> 内支付</span>
       </div>

       <!-- Product List -->
       <div class="info-card-glass" v-for="order in preOrders" :key="order.id">
          <div class="card-head">
             <span class="card-title-sm">商品信息</span>
             <span class="order-no">{{ order.order_no }}</span>
          </div>
          <div class="product-body">
             <div class="thumb-glow">
                <el-image :src="order.product_snapshot?.image" fit="cover" loading="lazy" />
             </div>
             <div class="product-info">
                <div class="p-name">{{ order.product_snapshot?.product_name }}</div>
                <div class="p-sku">
                   <div class="sku-pill-glass">{{ formatSpec(order.sku_snapshot?.spec_combination) }}</div>
                </div>
                <div class="p-price-row">
                    <div class="p-price">{{ order.unit_price.toFixed(2) }} <span class="unit">点</span></div>
                    <div class="p-qty">x {{ order.quantity }}</div>
                </div>
             </div>
          </div>
       </div>

       <!-- Coupon Card -->
       <div class="info-card-glass clickable" @click="showCouponModal = true">
           <div class="row-between">
               <div class="row-left">
                  <div class="icon-box-glass"><el-icon><Ticket /></el-icon></div>
                  <span class="label">优惠券</span>
               </div>
               <div class="row-right">
                  <span v-if="selectedCoupon" class="coupon-val">- {{ couponDiscount.toFixed(2) }} 点</span>
                  <span v-else class="coupon-ph">选择优惠券</span>
                  <el-icon><ArrowRight /></el-icon>
               </div>
           </div>
       </div>

       <!-- FAQ Section (Accordion) -->
       <div class="faq-section" v-if="checkoutFaqs.length > 0">
           <div class="section-title">
               <el-icon><QuestionFilled /></el-icon> 常见问题
           </div>
           <div class="faq-list-glass">
               <div 
                   v-for="(faq, index) in checkoutFaqs" 
                   :key="faq.id" 
                   class="faq-item"
                   :class="{ active: activeFaq === index }"
                   @click="activeFaq = activeFaq === index ? null : index"
               >
                   <div class="faq-q">
                       <span>{{ faq.question }}</span>
                       <el-icon class="arrow" :class="{ rotate: activeFaq === index }"><ArrowDown /></el-icon>
                   </div>
                   <div class="faq-a" v-show="activeFaq === index">
                       {{ faq.answer }}
                   </div>
               </div>
           </div>
       </div>

       <!-- Payment Method -->
       <div class="info-card-glass">
          <div class="card-title">支付方式</div>
          <div class="pay-methods">
             <div class="pm-item-glass active">
                <div class="pm-icon balance">
                   <el-icon><WalletFilled /></el-icon>
                </div>
                <div class="pm-info">
                   <div class="pm-name">额度支付</div>
                   <div class="pm-desc">
                       可用额度: {{ userBalance.toFixed(2) }} 点
                       <div class="refresh-btn" @click.stop="refreshBalance">
                           <el-icon :class="{ spinning: refreshingBalance }"><Refresh /></el-icon>
                       </div>
                   </div>
                </div>
                <div class="pm-check">
                   <el-icon><Select /></el-icon>
                </div>
             </div>
          </div>
       </div>

       <!-- Tips -->
       <div class="tips-box-glass">
          <el-icon><WarningFilled /></el-icon>
          <span>虚拟商品自动发货，售出后概不退换。超时未支付将自动释放库存。</span>
       </div>
    </div>

    <!-- Footer Bar -->
    <div class="footer-bar-glass" v-if="!loading && !error && preOrders.length > 0">
       <div class="fb-left">
          <span class="fb-label">应付:</span>
          <span class="fb-price"><span class="fb-big">{{ finalPayAmount.toFixed(2) }}</span> 点</span>
       </div>
       <button 
         class="btn-pay-glow" 
         :class="{ 'insufficient': isBalanceInsufficient }"
         @click="handlePayAction" 
         :disabled="paying || remainingSeconds <= 0"
       >
          <div v-if="paying" class="spinner-sm"></div>
          <span v-else-if="isBalanceInsufficient">额度不足，去充值</span>
          <span v-else>立即支付</span>
       </button>
    </div>

    <!-- Modals -->
    <MobileCouponSelectorSheet
        v-model="showCouponModal"
        :orderAmount="totalProductAmount"
        :skuIds="orderSkuIds"
        :productIds="orderProductIds"
        :currentCouponId="selectedCoupon?.id"
        @select="handleCouponSelect"
    />

    <RechargeModal
        :visible="showRechargeModal"
        @close="handleRechargeClose"
        @success="handleRechargeClose"
    />
    
    <!-- Success Modal -->
    <MobilePaySuccessModal
        v-if="showPaySuccess"
        :visible="showPaySuccess"
        :orderNo="lastOrderId"
        :amount="lastOrderAmount.toFixed(2)"
        @viewOrder="goToOrder"
        @goHome="goToHome"
        @close="goToOrder"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ArrowRight, CircleCloseFilled, WalletFilled, Select, WarningFilled,
  Ticket, Timer, QuestionFilled, ArrowDown, Refresh
} from '@element-plus/icons-vue'
import { useCheckout } from '@/composables/client/useCheckout'
import { clientFaqApi, type ClientFaq } from '@/api/client/help-center'
import { ElMessage } from 'element-plus'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'

// Lazy Load Heavy Components
const MobileCouponSelectorSheet = defineAsyncComponent(() => import('@/components/mobile/checkout/MobileCouponSelectorSheet.vue'))
const RechargeModal = defineAsyncComponent(() => import('@/components/mobile/profile/modals/RechargeModal.vue'))
const MobilePaySuccessModal = defineAsyncComponent(() => import('@/components/mobile/checkout/MobilePaySuccessModal.vue'))

definePageMeta({ 
  layout: 'mobile',
  hideTabBar: true
})

const route = useRoute()
const router = useRouter()
const showCouponModal = ref(false)
const showRechargeModal = ref(false)
const checkoutFaqs = ref<ClientFaq[]>([])
const activeFaq = ref<number | null>(null)

// Destructure Composable
const {
  loading,
  error,
  preOrders,
  paying,
  showPaySuccess,
  
  // Data
  selectedCoupon,
  couponDiscount,
  remainingSeconds,
  formatCountdown,
  totalProductAmount,
  finalPayAmount,
  userBalance,
  lastOrderId,      // Get Last Order ID
  lastOrderAmount,  // Get Last Payment Amount
  orderSkuIds,
  orderProductIds,
  
  // Actions
  loadPreOrders,
  handleCouponSelect,
  handlePay,
  formatSpec,
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

const isBalanceInsufficient = computed(() => {
    return userBalance.value < finalPayAmount.value
})

const handlePayAction = () => {
    if (isBalanceInsufficient.value) {
        showRechargeModal.value = true
        return
    }
    handlePay()
}

const handleRechargeClose = () => {
    showRechargeModal.value = false
    refreshBalance()
}

const fetchFaqs = async () => {
    const res = await clientFaqApi.getCheckoutFaqs()
    if (res.success) {
        checkoutFaqs.value = res.faqs
    }
}

const goToOrder = () => {
    router.replace('/mobile/profile/order')
}

const goToHome = () => {
    router.replace('/mobile')
}

onMounted(() => {
   loadPreOrders(preOrderIds.value)
   fetchFaqs()
})
</script>

<style scoped>
.checkout-page-glass {
  min-height: 100vh;
  background: #0F172A;
  color: #fff;
  padding-bottom: 100px; /* Space for footer */
}

/* States */
.state-box {
   padding: 100px 0; display: flex; flex-direction: column; align-items: center; gap: 16px; color: #94A3B8;
}
.error-icon { font-size: 48px; color: #EF4444; margin-bottom: 10px; }
.spinner {
   width: 32px; height: 32px; border: 3px solid rgba(255,255,255,0.1); border-top-color: #38BDF8;
   border-radius: 50%; animation: spin 0.8s linear infinite;
}
.btn-retry {
   padding: 10px 24px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); 
   background: rgba(255,255,255,0.05); color: #fff; font-size: 14px; margin-top: 10px;
}

/* Content */
.content { padding: 16px; display: flex; flex-direction: column; gap: 16px; }

.countdown-bar-glass {
   background: rgba(249, 115, 22, 0.1); border: 1px solid rgba(249, 115, 22, 0.2);
   border-radius: 12px; padding: 12px 16px; display: flex; align-items: center; justify-content: center;
   gap: 8px; color: var(--color-accent); font-size: 14px;
   backdrop-filter: blur(5px);
}
.time-val { font-weight: 700; font-family: monospace; font-size: 16px; }

/* Info Card Glass */
.info-card-glass {
  background: rgba(30, 41, 59, 0.6); 
  backdrop-filter: blur(10px);
  border-radius: 16px; padding: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
.info-card-glass.clickable:active { background: rgba(30, 41, 59, 0.8); }

/* Product Info */
.card-head { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 12px; }
.card-title-sm { color: #94A3B8; }
.order-no { color: #64748B; font-family: monospace; }
.product-body { display: flex; gap: 12px; }
.thumb-glow {
   width: 72px; height: 72px; border-radius: 10px; background: #0F172A; overflow: hidden;
   box-shadow: 0 0 15px rgba(59, 130, 246, 0.1); border: 1px solid rgba(255,255,255,0.05);
}
.thumb-glow .el-image { width: 100%; height: 100%; }
.product-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.p-name { font-size: 14px; font-weight: 500; color: #F1F5F9; line-height: 1.4; }
.sku-pill-glass { 
   font-size: 10px; padding: 2px 8px; background: rgba(255,255,255,0.05); 
   border-radius: 4px; color: #94A3B8; display: inline-block; 
   border: 1px solid rgba(255,255,255,0.05);
}
.p-price-row { display: flex; justify-content: space-between; align-items: flex-end; }
.p-price { color: #38BDF8; font-weight: 700; font-family: 'DIN Alternate'; font-size: 18px; text-shadow: 0 0 10px rgba(56, 189, 248, 0.3); }
.p-price .unit { font-size: 12px; font-weight: normal; margin-left: 2px; }
.p-qty { color: #64748B; font-size: 12px; }

/* Coupon Row */
.row-between { display: flex; justify-content: space-between; align-items: center; }
.row-left { display: flex; align-items: center; gap: 8px; }
.icon-box-glass {
   width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.05);
   display: flex; align-items: center; justify-content: center; color: #F472B6; /* Pink tint for coupon */
}
.label { font-size: 14px; font-weight: 500; color: #E2E8F0; }
.row-right { display: flex; align-items: center; gap: 4px; font-size: 13px; }
.coupon-ph { color: #94A3B8; }
.coupon-val { color: #F472B6; font-weight: 600; }

/* FAQ */
.faq-section { margin-top: 8px; }
.section-title { 
    display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; 
    color: #E2E8F0; margin-bottom: 12px; padding-left: 4px; 
}
.faq-list-glass { 
    background: rgba(30, 41, 59, 0.3); border-radius: 16px; overflow: hidden; 
    border: 1px solid rgba(255,255,255,0.05); 
}
.faq-item { border-bottom: 1px solid rgba(255,255,255,0.05); }
.faq-item:last-child { border-bottom: none; }
.faq-q { padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #94A3B8; cursor: pointer; }
.faq-q .arrow { transition: transform 0.3s; }
.faq-q .arrow.rotate { transform: rotate(180deg); color: #38BDF8; }
.active .faq-q { color: #E2E8F0; }
.faq-a { padding: 0 16px 14px; font-size: 12px; color: #64748B; line-height: 1.6; }

/* Pay Method */
.card-title { font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #E2E8F0; }
.pm-item-glass {
  display: flex; align-items: center; gap: 12px; padding: 12px;
  background: rgba(56, 189, 248, 0.1); border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.1) inset;
}
.pm-icon {
   width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
   background: rgba(56, 189, 248, 0.2); color: #38BDF8; font-size: 20px;
}
.pm-info { flex: 1; }
.pm-name { font-size: 14px; font-weight: 600; color: #fff; }
.pm-desc { font-size: 11px; color: #94A3B8; margin-top: 2px; display: flex; align-items: center; gap: 6px; }
.refresh-btn { display: inline-flex; padding: 4px; cursor: pointer; color: #38BDF8; }
.spinning { animation: spin 1s linear infinite; }
.pm-check { color: #38BDF8; font-size: 20px; text-shadow: 0 0 10px rgba(56, 189, 248, 0.5); }

/* Tips */
.tips-box-glass {
   padding: 12px; background: rgba(245, 158, 11, 0.1); border-radius: 12px; 
   display: flex; gap: 8px; align-items: flex-start; 
   color: #F59E0B; font-size: 12px; line-height: 1.5;
   border: 1px solid rgba(245, 158, 11, 0.2);
}

/* Footer */
.footer-bar-glass {
   position: fixed; bottom: 0; left: 0; right: 0;
   height: 80px; 
   background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(10px);
   border-top: 1px solid rgba(255,255,255,0.05);
   padding: 10px 16px 30px; display: flex; align-items: center; justify-content: space-between;
   z-index: 100; box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
}
.fb-left { font-size: 13px; color: #94A3B8; }
.fb-price { color: #38BDF8; font-weight: 600; margin-left: 6px; text-shadow: 0 0 10px rgba(56, 189, 248, 0.3); }
.fb-big { font-size: 22px; font-family: 'DIN Alternate'; }

.btn-pay-glow {
   background: linear-gradient(135deg, #3B82F6, #2563EB);
   border: none; color: #fff; font-weight: 600; font-size: 15px;
   padding: 0 32px; height: 44px; border-radius: 22px;
   box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); cursor: pointer;
   display: flex; align-items: center; justify-content: center; gap: 8px;
   transition: all 0.2s;
}
.btn-pay-glow:active { transform: scale(0.98); }
.btn-pay-glow.insufficient { 
    background: rgba(255,255,255,0.1); color: #94A3B8; 
    box-shadow: none; border: 1px solid rgba(255,255,255,0.1); 
}
.btn-pay-glow:disabled:not(.insufficient) { opacity: 0.7; filter: grayscale(0.5); }
.spinner-sm {
    width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
    border-radius: 50%; animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
