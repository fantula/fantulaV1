<template>
  <BaseCouponTicket
    color="gold"
    :value="couponData.coupon.value"
    unit="点"
    :title="couponData.coupon.name"
    desc="直接存入余额，可购买任意服务"
    type-label="额度券"
    :expiry-text="expiryText"
    :status="status"
    :disabled="isExpired"
    action-text="立即充值"
    @click="handleClick"
    @action="handleAction"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCouponTicket from './BaseCouponTicket.vue'
import type { UserCoupon } from '@/api/client/coupon'

const props = defineProps<{
  couponData: UserCoupon
  isExpired?: boolean
}>()

const emit = defineEmits(['use', 'click'])

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

const handleAction = () => {
  emit('use', props.couponData)
}

const handleClick = () => {
  emit('click', props.couponData)
}
</script>
