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
import { adminRoute } from '@/config/admin-routes'

const tabs = [
  { name: 'balance', label: '额度券',   route: adminRoute('coupons/balance') },
  { name: 'flat',    label: '立减券',   route: adminRoute('coupons/flat') },
  { name: 'product', label: '指定商品', route: adminRoute('coupons/product') },
  { name: 'stats',   label: '优惠券统计', route: adminRoute('coupons/stats') }
]
</script>
