<template>
  <BaseCouponTicket
    color="purple"
    :value="couponData.coupon.value"
    unit="点"
    :title="couponData.coupon.name"
    :desc="conditionText"
    type-label="立减券"
    :expiry-text="expiryText"
    :status="status"
    :disabled="isExpired"
    action-text="去使用"
    @click="handleClick"
    @action="handleAction"
  />
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

const conditionText = computed(() => {
  const min = props.couponData.coupon.min_usage
  return min && min > 0 ? `满 ${min} 点可用` : '无门槛使用'
})

const expiryText = computed(() => {
  if (!props.couponData.coupon.end_date) return '永久有效'
  const date = new Date(props.couponData.coupon.end_date)
  return `有效期至 ${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}`
})

const handleAction = () => {
  // Flat coupons usually redirect to shop
  router.push('/')
}

const handleClick = () => {
  emit('click', props.couponData)
}
</script>
