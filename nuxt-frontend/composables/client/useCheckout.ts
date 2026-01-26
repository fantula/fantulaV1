
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/client/user'
import { supabasePreOrderApi, type PreOrder } from '@/api/client/supabase'
import { type UserCoupon } from '@/api/client/coupon'
import { ElMessage } from 'element-plus'

export function useCheckout() {
  const router = useRouter()
  const userStore = useUserStore()

  // --- State ---
  const loading = ref(true)
  const error = ref('')
  const preOrders = ref<PreOrder[]>([])
  const paying = ref(false)
  // const showBalanceModal = ref(false) // Removed
  const showPaySuccess = ref(false)
  const refreshingBalance = ref(false) // New
  
  // Settlement Data
  const lastOrderId = ref('')
  const lastOrderAmount = ref(0)
  const selectedCoupon = ref<UserCoupon | null>(null)
  const couponDiscount = ref(0)
  
  // Countdown
  const remainingSeconds = ref(0)
  let countdownTimer: any = null
  let pollTimer: any = null

  // --- Computed ---
  const totalProductAmount = computed(() => {
    return preOrders.value.reduce((sum, o) => sum + o.total_amount, 0)
  })

  // Since preOrder.total_amount is updated by the backend when a coupon is applied,
  // we can use it directly as the final amount.
  const finalPayAmount = computed(() => {
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

  // --- Methods ---

  const refreshBalance = async () => {
    if (refreshingBalance.value) return
    refreshingBalance.value = true
    try {
        await userStore.fetchUserInfo()
        ElMessage.success('额度已更新')
    } catch (e) {
        ElMessage.error('更新失败')
    } finally {
        refreshingBalance.value = false
    }
  }

  const startCountdown = (expiresTime: number) => {
    const update = () => {
      const now = Date.now()
      remainingSeconds.value = Math.max(0, Math.floor((expiresTime - now) / 1000))
      if (remainingSeconds.value <= 0) {
        handleExpire()
        if (countdownTimer) clearInterval(countdownTimer)
      }
    }
    update()
    countdownTimer = setInterval(update, 1000)
  }

  const handleExpire = async () => {
    error.value = '订单已过期，请重新下单'
    if (preOrders.value.length > 0) {
      try {
        await supabasePreOrderApi.expirePreOrder(preOrders.value[0].id)
      } catch (e) {
        console.error('Failed to expire order', e)
      }
    }
  }

  const startPolling = () => {
    if (pollTimer) clearInterval(pollTimer)
    pollTimer = setInterval(async () => {
      if (error.value || paying.value) return 
      if (preOrders.value.length === 0) return
      
      const orderId = preOrders.value[0].id
      const res = await supabasePreOrderApi.getPreOrder(orderId)
      if (res.success && res.pre_order) {
        const status = res.pre_order.status
        
        if (status === 'converted' || status === 'confirmed') {
          if (!showPaySuccess.value) {
            lastOrderId.value = res.pre_order.order_no
            lastOrderAmount.value = res.pre_order.total_amount
            showPaySuccess.value = true
            clearInterval(pollTimer)
            clearInterval(countdownTimer)
          }
          return
        }
        
        if (status === 'expired' || status === 'cancelled') {
          error.value = '订单已失效或已关闭'
          clearInterval(pollTimer)
          clearInterval(countdownTimer)
          return
        }
        
        if (res.pre_order.total_amount !== preOrders.value[0].total_amount) {
          preOrders.value[0].total_amount = res.pre_order.total_amount
        }
      }
    }, 3000)
  }

  const loadPreOrders = async (ids: string[]) => {
    loading.value = true
    error.value = ''
    try {
      if (!userStore.isLoggedIn) {
        await userStore.fetchUserInfo()
        if (!userStore.isLoggedIn) {
          ElMessage.warning('请先登录')
          router.push('/')
          return
        }
      }

      if (ids.length === 0) throw new Error('缺少订单 ID')
      
      const list: PreOrder[] = []
      for (const id of ids) {
        const res = await supabasePreOrderApi.getPreOrder(id)
        if (res.success && res.pre_order) list.push(res.pre_order)
      }
      
      if (list.length === 0) throw new Error('订单不存在或已过期')
      preOrders.value = list
      
      const minExpires = Math.min(...list.map(o => new Date(o.expires_at).getTime()))
      startCountdown(minExpires)
      startPolling()
      
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const handleCouponSelect = async (coupon: UserCoupon | null) => {
    selectedCoupon.value = coupon
    const couponId = coupon?.id || null
    const preOrder = preOrders.value[0]
    if (!preOrder) return

    loading.value = true
    try {
      const res = await supabasePreOrderApi.applyCouponToPreOrder(preOrder.id, couponId)
      
      if (res.success) {
        if (res.total_amount !== undefined) {
          preOrder.total_amount = res.total_amount
          couponDiscount.value = res.discount_amount || 0
        }
        
        if (!coupon) {
          ElMessage.success('已取消优惠券')
        } else {
          ElMessage.success('优惠券使用成功')
        }
      } else {
        ElMessage.error(res.error || '应用优惠券失败')
        // Rollback
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
    
    if (preOrders.value.length > 0 && preOrders.value[0].status !== 'pending') {
      ElMessage.error('订单状态异常，请刷新页面')
      return
    }

    if (userBalance.value < finalPayAmount.value) {
      // showBalanceModal.value = true // Removed
      // Should be handled by UI button state now
      ElMessage.warning('额度不足，请先充值')
      router.push('/profile/recharge')
      return
    }
    
    paying.value = true
    try {
      const preOrder = preOrders.value[0]
      const res = await supabasePreOrderApi.confirmPreOrder(
        preOrder.id, 
        'balance',
        selectedCoupon.value?.id
      )
      
      if (!res.success) {
        // if (res.error?.includes('余额不足')) {
        //   showBalanceModal.value = true
        // } else {
          ElMessage.error(res.error || '支付失败')
        // }
        return
      }
      
      lastOrderId.value = res.order_no || ''
      lastOrderAmount.value = finalPayAmount.value
      showPaySuccess.value = true
      await userStore.fetchUserInfo()
      
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

  // Cleanup
  onUnmounted(() => {
    if (countdownTimer) clearInterval(countdownTimer)
    if (pollTimer) clearInterval(pollTimer)
  })

  return {
    // State
    loading,
    error,
    preOrders,
    paying,
    // showBalanceModal, // Removed
    showPaySuccess,
    refreshingBalance, // New
    lastOrderId,
    lastOrderAmount,
    selectedCoupon,
    couponDiscount,
    remainingSeconds,
    
    // Computed
    totalProductAmount,
    finalPayAmount,
    userBalance,
    orderSkuIds,
    orderProductIds,
    formatCountdown,
    
    // Methods
    loadPreOrders,
    handleCouponSelect,
    handlePay,
    formatSpec,
    refreshBalance // New
  }
}
