<script setup lang="ts">
import { adminRoute } from '@/config/admin-routes'

// Redirect to default tab (accounts)
definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], ssr: false })

import { onMounted, onActivated, nextTick } from 'vue'

const router = useRouter()

const redirect = async () => {
  await nextTick()
  router.replace(adminRoute('users/accounts'))
}

onMounted(() => redirect())
onActivated(() => redirect())
</script>

<template>
  <div class="redirect-loading">
    <el-skeleton :rows="5" animated />
  </div>
</template>

<style scoped>
.redirect-loading {
  padding: 24px;
}
</style>
