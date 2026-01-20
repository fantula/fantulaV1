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
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'recharge', label: '虚拟充值',   route: '/_mgmt_9Xfa3/orders/recharge' },
  { name: 'share',    label: '账号合租',   route: '/_mgmt_9Xfa3/orders/share' },
  { name: 'cdkey',    label: '激活码',     route: '/_mgmt_9Xfa3/orders/cdkey' },
  { name: 'refund',   label: '退款管理',   route: '/_mgmt_9Xfa3/orders/refund' },
  { name: 'preorders', label: '预订单统计', route: '/_mgmt_9Xfa3/orders/preorders' }
]
</script>
