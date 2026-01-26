<template>
  <AdminModuleLayout
    :title="'订单管理'"
    :tabs="tabs"
    default-tab="recharge"
    :hide-tabs-on="['/post', '/detail']"
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
  { name: 'recharge', label: '虚拟充值',   route: '/admin/orders/recharge' },
  { name: 'share',    label: '账号合租',   route: '/admin/orders/share' },
  { name: 'cdkey',    label: '兑换码',     route: '/admin/orders/cdkey' },
  { name: 'refund',   label: '退款管理',   route: '/admin/orders/refund' },
  { name: 'cancelled-refunds', label: '退款统计', route: '/admin/orders/cancelled-refunds' },
  { name: 'preorders', label: '预订单统计', route: '/admin/orders/preorders' }
]
</script>
