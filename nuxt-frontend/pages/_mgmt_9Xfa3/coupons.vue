<template>
  <AdminModuleLayout
    :title="'优惠券管理'"
    :tabs="tabs"
    default-tab="balance"
    :hide-tabs-on="['/post']"
  >
    <router-view />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'balance', label: '额度券',   route: '/_mgmt_9Xfa3/coupons/balance' },
  { name: 'flat',    label: '立减券',   route: '/_mgmt_9Xfa3/coupons/flat' },
  { name: 'product', label: '指定商品', route: '/_mgmt_9Xfa3/coupons/product' },
  { name: 'stats',   label: '优惠券统计', route: '/_mgmt_9Xfa3/coupons/stats' }
]
</script>
