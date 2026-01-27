<template>
  <div class="checkout-page">
    <!-- Header -->
    <div class="header">
       <div class="btn-back" @click="router.back()">
         <el-icon><ArrowLeft /></el-icon>
       </div>
       <div class="header-title">确认订单</div>
       <div class="header-placeholder"></div>
    </div>

    <!-- Loading / Error / Content -->
    <div v-if="loading" class="state-box">
       <el-icon class="is-loading"><Loading /></el-icon>
       <span>加载订单中...</span>
    </div>
    
    <div v-else-if="errorMsg" class="state-box error">
       <el-icon><CircleCloseFilled /></el-icon>
       <span>{{ errorMsg }}</span>
       <button class="btn-retry" @click="fetchOrder">重试</button>
    </div>

    <div v-else class="content">
       <!-- Product Card -->
       <div class="card product-card">
          <div class="pc-head">
             <span class="pc-tag">商品信息</span>
             <span class="pc-order-no">No. {{ order?.order_no }}</span>
          </div>
          <div class="pc-body">
             <div class="thumb">
                <el-image :src="order?.product_snapshot?.image" fit="cover" />
             </div>
             <div class="info">
                <div class="p-name">{{ order?.product_snapshot?.product_name }}</div>
                <div class="p-sku">
                   <div v-for="(v, k) in order?.sku_snapshot?.spec_combination" :key="k" class="sku-pill">
                      {{ k }}: {{ v }}
                   </div>
                </div>
                <div class="p-price-row">
                    <div class="p-price">¥{{ formatPrice(order?.unit_price) }}</div>
                    <div class="p-qty">x {{ order?.quantity }}</div>
                </div>
             </div>
          </div>
          <div class="pc-footer">
              <div class="total-row">
                 <span>小计</span>
                 <span class="total-val">¥{{ formatPrice(order?.total_amount) }}</span>
              </div>
          </div>
       </div>

       <!-- Coupon Card -->
       <div class="card coupon-card" @click="openCouponSheet">
           <div class="cc-left">
              <el-icon><Ticket /></el-icon>
              <span>优惠券</span>
           </div>
           <div class="cc-right">
              <span v-if="selectedCoupon" class="coupon-val">- ¥{{ selectedCoupon.coupon.value }}</span>
              <span v-else class="coupon-ph">{{ availableCoupons.length > 0 ? `${availableCoupons.length} 张可用` : '暂无可用' }}</span>
              <el-icon><ArrowRight /></el-icon>
           </div>
       </div>

       <!-- Payment Method -->
       <div class="card pay-card">
          <div class="card-title">支付方式</div>
          <div class="pay-methods">
             <div 
               class="pm-item" 
               :class="{ active: payMethod === 'balance' }"    
               @click="payMethod = 'balance'"
             >
                <div class="pm-icon balance">
                   <el-icon><WalletFilled /></el-icon>
                </div>
                <div class="pm-info">
                   <div class="pm-name">余额支付</div>
                   <div class="pm-desc">当前余额: ¥{{ formatPrice(userStore.userInfo?.balance || 0) }}</div>
                </div>
                <div class="pm-check">
                   <el-icon v-if="payMethod === 'balance'"><Select /></el-icon>
                </div>
             </div>
             
             <!-- WeChat (Disabled or Placeholder) -->
             <div class="pm-item disabled">
                <div class="pm-icon wechat">
                  <span class="icon-wx">微信</span> 
                </div> 
                <div class="pm-info">
                   <div class="pm-name">微信支付</div>
                   <div class="pm-desc">暂未开放</div>
                </div>
             </div>
          </div>
       </div>

       <!-- Notice -->
       <div class="tips-box">
          <el-icon><WarningFilled /></el-icon>
          <span>虚拟商品自动发货，售出后概不退换，请确认后再支付。</span>
       </div>
    </div>

    <!-- Footer Bar -->
    <div class="footer-bar" v-if="!loading && !errorMsg">
       <div class="fb-left">
          <span class="fb-label">实付款:</span>
          <span class="fb-price">¥ <span class="fb-big">{{ formatPrice(finalAmount) }}</span></span>
          <span v-if="discountAmount > 0" class="fb-discount">已优惠 ¥{{ formatPrice(discountAmount) }}</span>
       </div>
       <button 
         class="btn-pay" 
         @click="handlePay" 
         :disabled="submitting"
       >
          {{ submitting ? '支付中...' : '立即支付' }}
       </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/client/user'
import { supabasePreOrderApi } from '@/api/client/supabase'
import { couponApi } from '@/api/client/coupon'
import { 
  ArrowLeft, ArrowRight, Loading, CircleCloseFilled, WalletFilled, Select, WarningFilled,
  Ticket, Close 
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const orderId = route.params.id as string
const order = ref<any>(null)
const loading = ref(true)
const submitting = ref(false)
const errorMsg = ref('')
const payMethod = ref('balance') // default

// Coupon State
const coupons = ref<any[]>([])
const showCouponSheet = ref(false)
const selectedCoupon = ref<any>(null)
const discountAmount = ref(0)

const finalAmount = computed(() => order.value?.total_amount || 0)

const availableCoupons = computed(() => {
    return coupons.value.filter(c => isCouponValid(c))
})

const formatPrice = (p: any) => Number(p).toFixed(2)

const isCouponValid = (c: any) => {
    if (c.status !== 'unused') return false
    const total = (order.value?.sku_snapshot?.price || 0) * (order.value?.quantity || 1)
    if (total < (c.coupon.min_usage || 0)) return false
    return true
}

const fetchOrder = async () => {
    loading.value = true
    errorMsg.value = ''
    try {
        const res = await supabasePreOrderApi.getPreOrder(orderId)
        if (res.success) {
            order.value = res.pre_order
            if (order.value.status !== 'pending') {
               errorMsg.value = '订单状态异常或已过期'
            }
        } else {
            errorMsg.value = res.error || '获取订单失败'
        }
    } catch(e) {
        errorMsg.value = '网络错误'
    } finally {
        loading.value = false
    }
}

const fetchCoupons = async () => {
    const res = await couponApi.getUserCoupons()
    if (res.success) {
        coupons.value = (res.data || []).filter(c => c.coupon.type === 'flat' && c.status === 'unused')
    }
}

const openCouponSheet = () => {
    if (coupons.value.length === 0) fetchCoupons()
    showCouponSheet.value = true
}

const handleSelectCoupon = async (item: any) => {
    if (!isCouponValid(item)) return
    if (selectedCoupon.value?.id === item.id) return
    
    const loadingInstance = ElLoading.service({ text: '应用中...', background: 'rgba(0,0,0,0.7)' })
    try {
        const res = await supabasePreOrderApi.applyCouponToPreOrder(orderId, item.coupon.id)
        if (res.success) {
            selectedCoupon.value = item
            order.value.total_amount = res.total_amount
            discountAmount.value = res.discount_amount || 0
            showCouponSheet.value = false
            ElMessage.success(`已优惠 ¥${res.discount_amount}`)
        } else {
            ElMessage.error(res.error || '应用失败')
        }
    } finally {
        loadingInstance.close()
    }
}

const handleClearCoupon = async () => {
    if (!selectedCoupon.value) {
        showCouponSheet.value = false
        return
    }
    const loadingInstance = ElLoading.service({ text: '取消中...', background: 'rgba(0,0,0,0.7)' })
    try {
        const res = await supabasePreOrderApi.applyCouponToPreOrder(orderId, null)
        if (res.success) {
            selectedCoupon.value = null
            order.value.total_amount = res.total_amount
            discountAmount.value = 0
            showCouponSheet.value = false
        } else {
             ElMessage.error(res.error || '取消失败')
        }
    } finally {
        loadingInstance.close()
    }
}

const handlePay = async () => {
    if (!order.value) return
    
    if (payMethod.value === 'balance') {
       const bal = Number(userStore.userInfo?.balance || 0)
       if (bal < finalAmount.value) {
           ElMessage.error('余额不足，请充值')
           return
       }
    }

    submitting.value = true
    try {
       const res = await supabasePreOrderApi.confirmPreOrder(
           orderId, 
           payMethod.value as any,
           selectedCoupon.value?.coupon?.id
       )
       if (res.success) {
           ElMessage.success('支付成功')
           await userStore.fetchUserInfo()
           router.replace('/mobile/profile') 
       } else {
           ElMessage.error(res.error || '支付失败')
       }
    } catch(e) {
       ElMessage.error('支付请求异常')
    } finally {
       submitting.value = false
    }
}

onMounted(async () => {
   if (!orderId) {
       errorMsg.value = '无效的订单ID'
       loading.value = false
       return
   }
   await fetchOrder()
   fetchCoupons()
   userStore.fetchUserInfo()
})
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #0F172A;
  color: #fff;
  padding-bottom: 90px;
}

/* Header */
.header {
  height: 56px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px);
  position: sticky; top: 0; z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.btn-back {
  width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; background: rgba(255,255,255,0.05);
  cursor: pointer;
}
.header-title { font-size: 16px; font-weight: 600; }
.header-placeholder { width: 32px; }

/* State */
.state-box {
   padding: 40px; display: flex; flex-direction: column; align-items: center; gap: 16px; color: #94A3B8;
}
.state-box .el-icon { font-size: 32px; }
.state-box.error { color: #EF4444; }
.btn-retry {
   padding: 6px 16px; border-radius: 20px; border: 1px solid #334155; 
   background: transparent; color: #fff; font-size: 12px;
}

/* Content */
.content { padding: 16px; }

.card {
  background: #1E293B; border-radius: 16px; padding: 16px; margin-bottom: 16px;
  border: 1px solid rgba(255,255,255,0.05);
}

/* Product Card */
.pc-head { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 12px; }
.pc-tag { color: #94A3B8; }
.pc-order-no { color: #64748B; font-family: monospace; }
.pc-body { display: flex; gap: 12px; margin-bottom: 12px; }
.thumb {
   width: 80px; height: 80px; border-radius: 8px; background: #0F172A; overflow: hidden; flex-shrink: 0;
}
.thumb .el-image { width: 100%; height: 100%; }
.info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.p-name { font-size: 14px; font-weight: 500; line-height: 1.4; color: #F1F5F9; }
.p-sku { display: flex; flex-wrap: wrap; gap: 4px; }
.sku-pill { font-size: 10px; padding: 2px 6px; background: #334155; border-radius: 4px; color: #CBD5E1; }
.p-price-row { display: flex; justify-content: space-between; align-items: center; }
.p-price { color: #F97316; font-weight: 600; font-family: 'DIN Alternate'; font-size: 16px; }
.p-qty { color: #94A3B8; font-size: 12px; }

.pc-footer { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px; }
.total-row { display: flex; justify-content: flex-end; align-items: baseline; gap: 8px; font-size: 13px; color: #E2E8F0; }
.total-val { font-size: 18px; color: #F97316; font-weight: 700; font-family: 'DIN Alternate'; }

/* Pay Card */
.card-title { font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #E2E8F0; }
.pay-methods { display: flex; flex-direction: column; gap: 10px; }
.pm-item {
  display: flex; align-items: center; gap: 12px; padding: 12px;
  background: #0F172A; border-radius: 12px; border: 1px solid transparent;
  transition: all 0.2s; cursor: pointer;
}
.pm-item.active { border-color: #F97316; background: rgba(249, 115, 22, 0.05); }
.pm-item.disabled { opacity: 0.5; filter: grayscale(1); pointer-events: none; }

.pm-icon {
   width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
   font-size: 20px;
}
.pm-icon.balance { background: rgba(249, 115, 22, 0.2); color: #F97316; }
.pm-icon.wechat { background: #07C16020; color: #07C160; }
.icon-wx { font-size: 10px; font-weight: 600; border: 1px solid currentColor; padding: 0 2px; border-radius: 4px; }

.pm-info { flex: 1; }
.pm-name { font-size: 14px; font-weight: 500; color: #F1F5F9; }
.pm-desc { font-size: 11px; color: #64748B; margin-top: 2px; }
.pm-check { color: #F97316; font-size: 18px; width: 20px; text-align: right; }

/* Tips */
.tips-box {
   padding: 12px; background: rgba(245, 158, 11, 0.1); border-radius: 8px; 
   display: flex; gap: 8px; align-items: flex-start; 
   color: #F59E0B; font-size: 12px; line-height: 1.5;
}
.tips-box .el-icon { margin-top: 2px; }

/* Footer Bar */
.footer-bar {
   position: fixed; bottom: 0; left: 0; right: 0;
   height: 80px; background: #1E293B; border-top: 1px solid rgba(255,255,255,0.05);
   padding: 10px 16px 30px; /* Safe area handled */
   display: flex; align-items: center; justify-content: space-between;
   z-index: 100;
   box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
}
.fb-left { font-size: 13px; color: #E2E8F0; }
.fb-price { color: #F97316; font-weight: 600; margin-left: 4px; }
.fb-big { font-size: 20px; font-family: 'DIN Alternate'; }

.btn-pay {
   background: linear-gradient(135deg, #F97316, #EA580C);
   border: none; color: #fff; font-weight: 600; font-size: 15px;
   padding: 0 32px; height: 44px; border-radius: 22px;
   box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
   cursor: pointer;
}
.btn-pay:disabled { opacity: 0.6; cursor: not-allowed; background: #64748B; box-shadow: none; }

/* Coupon Card */
.coupon-card {
   display: flex; justify-content: space-between; align-items: center;
   cursor: pointer;
}
.cc-left { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: #E2E8F0; }
.cc-right { display: flex; align-items: center; gap: 4px; font-size: 12px; }
.coupon-ph { color: #F97316; }
.coupon-val { color: #EF4444; font-weight: 600; }

/* Coupon Sheet */
.coupon-sheet-mask {
   position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 2000;
   display: flex; flex-direction: column; justify-content: flex-end;
   backdrop-filter: blur(2px);
}
.coupon-sheet {
   background: #1E293B; border-radius: 20px 20px 0 0;
   max-height: 70vh; display: flex; flex-direction: column;
   padding-bottom: env(safe-area-inset-bottom);
}
.cs-header {
   padding: 16px; display: flex; justify-content: space-between; align-items: center;
   border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 16px; font-weight: 600;
}
.cs-body { flex: 1; overflow-y: auto; padding: 16px; min-height: 200px; }
.cs-footer { padding: 16px; border-top: 1px solid rgba(255,255,255,0.05); }

.coupon-item {
   background: linear-gradient(90deg, #1e293b, #0f172a);
   border: 1px solid rgba(255,255,255,0.05);
   border-radius: 8px; display: flex; align-items: center;
   margin-bottom: 12px; overflow: hidden; position: relative;
   transition: all 0.2s;
}
.coupon-item.active { border-color: #F97316; background: rgba(249, 115, 22, 0.1); }
.coupon-item.disabled { opacity: 0.5; filter: grayscale(1); }

.ci-left {
   width: 90px; display: flex; flex-direction: column; align-items: center; justify-content: center;
   background: rgba(249, 115, 22, 0.1); height: 80px; color: #F97316;
   border-right: 1px dashed rgba(255,255,255,0.1);
}
.ci-val { font-size: 24px; font-weight: 700; font-family: 'DIN Alternate'; }
.ci-unit { font-size: 12px; margin-right: 2px; }
.ci-type { font-size: 10px; margin-top: 4px; }

.ci-mid { flex: 1; padding: 0 12px; }
.ci-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.ci-cond { font-size: 11px; color: #94A3B8; }
.ci-date { font-size: 10px; color: #64748B; margin-top: 4px; }

.ci-check { width: 40px; display: flex; justify-content: center; color: #F97316; font-size: 18px; }

.btn-no-use {
   width: 100%; height: 44px; border-radius: 22px; border: 1px solid rgba(255,255,255,0.1);
   background: transparent; color: #94A3B8; font-size: 14px;
}
.fb-discount { font-size: 10px; color: #F97316; margin-left: 8px; background: rgba(249, 115, 22, 0.1); display: inline-block; transform: translateY(-3px); }

.sheet-slide-enter-active, .sheet-slide-leave-active { transition: transform 0.3s; }
.sheet-slide-enter-from, .sheet-slide-leave-to { transform: translateY(100%); }
</style>
