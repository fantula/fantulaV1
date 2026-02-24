<template>
    <!-- Use AdminModuleLayout for consistent spacing and titles across tabs -->
    <AdminModuleLayout
        title="订单管理"
        :tabs="tabs"
        :active-tab="activeTab"
        @update:active-tab="handleTabChange"
    >
        <NuxtPage />
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
  { name: 'recharge', label: '虚拟充值',   route: adminRoute('orders/recharge') },
  { name: 'share',    label: '账号合租',   route: adminRoute('orders/share') },
  { name: 'cdkey',    label: '兑换码',     route: adminRoute('orders/cdkey') },
  { name: 'refund',   label: '退款管理',   route: adminRoute('orders/refund') },
  { name: 'preorders', label: '预订单统计', route: adminRoute('orders/preorders') }
]
</script>
