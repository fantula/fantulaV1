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

const router = useRouter()

onMounted(() => {
  router.replace('/admin/coupons/balance')
})
</script>
