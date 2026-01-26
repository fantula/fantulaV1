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
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'balance', label: '额度券',   route: '/admin/coupons/balance' },
  { name: 'flat',    label: '立减券',   route: '/admin/coupons/flat' },
  { name: 'product', label: '指定商品', route: '/admin/coupons/product' },
  { name: 'stats',   label: '优惠券统计', route: '/admin/coupons/stats' }
]
</script>
