<template>
  <div class="loading-redirect">
    <!-- Redirecting to default tab -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.replace('/_mgmt_9Xfa3/coupons/balance')
})
</script>
