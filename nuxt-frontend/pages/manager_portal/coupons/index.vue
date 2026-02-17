<template>
  <div class="loading-redirect">
    <!-- Redirecting to default tab -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { onMounted, onActivated, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { adminRoute } from '@/config/admin-routes'

const router = useRouter()

const redirect = async () => {
  await nextTick()
  router.replace(adminRoute('coupons/balance'))
}

onMounted(() => redirect())
onActivated(() => redirect())
</script>
