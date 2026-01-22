<template>
  <BaseCouponTicket
    color="cyan"
    :value="displayValue"
    :unit="displayUnit"
    :title="couponData.coupon.name"
    :desc="displayDesc"
    type-label="商品券"
    :expiry-text="expiryText"
    :status="status"
    :disabled="isExpired"
    action-text="去购买"
    @click="handleClick"
    @action="handleAction"
  >
    <!-- Custom Value Slot if needed, but passing props is cleaner for BaseTicket -->
  </BaseCouponTicket>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCouponTicket from './BaseCouponTicket.vue'
import type { UserCoupon } from '@/api/coupon'
import { useRouter } from 'vue-router'

const props = defineProps<{
  couponData: UserCoupon
  isExpired?: boolean
}>()

const emit = defineEmits(['click'])
const router = useRouter()

const status = computed(() => {
  if (props.couponData.status === 'used') return 'used'
  if (props.isExpired || props.couponData.status === 'expired') return 'expired'
  return 'unused'
})

const expiryText = computed(() => {
  if (!props.couponData.coupon.end_date) return '永久有效'
  const date = new Date(props.couponData.coupon.end_date)
  return `有效期至 ${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}`
})

// === Display Logic ===

// If value is 0, we assume it's a "Free Exchange" or "Special Item" coupon.
// Show "兑换" instead of "0".
const displayValue = computed(() => {
  const val = props.couponData.coupon.value
  if (!val || Number(val) === 0) return '兑换'
  return val
})

// Hide unit if it's text "兑换"
const displayUnit = computed(() => {
  const val = props.couponData.coupon.value
  if (!val || Number(val) === 0) return ''
  return '点'
})

// Dynamic Description
const displayDesc = computed(() => {
  // Check if we have a specific product name in 'extra' metadata
  // Assuming couponData.coupon.extra may contain target info
  const extra = (props.couponData.coupon as any).extra
  if (extra && extra.product_name) {
     return `${extra.product_name} 专用`
  }
  
  // Fallback: User said "change to [Product Name] available"
  // If we can't find it, use safer default.
  return '指定商品专用优惠'
})

const handleAction = () => {
  const extra = (props.couponData.coupon as any).extra
  if (extra && extra.product_id) {
      router.push(`/product/${extra.product_id}`)
  } else {
      router.push('/')
  }
}

const handleClick = () => {
  emit('click', props.couponData)
}
</script>
