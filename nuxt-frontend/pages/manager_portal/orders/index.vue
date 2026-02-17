<script setup lang="ts">
import AdminPageSkeleton from '@/components/admin/base/AdminPageSkeleton.vue'
import { adminRoute } from '@/config/admin-routes'

// Redirect to default tab (recharge)
definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], ssr: false })

const router = useRouter()

onMounted(() => {
  router.replace(adminRoute('orders/recharge'))
})
</script>

<template>
  <div class="redirect-loading">
    <AdminPageSkeleton type="list" />
    <div class="mt-4 text-center text-gray-400">正在进入订单管理...</div>
  </div>
</template>

<style scoped>
.redirect-loading {
  padding: 20px;
}
</style>
