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

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { adminRoute } from '@/config/admin-routes'

const router = useRouter()

onMounted(() => {
  router.replace(adminRoute('coupons/balance'))
})
</script>
