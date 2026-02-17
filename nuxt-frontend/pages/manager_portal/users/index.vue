<script setup lang="ts">
import { adminRoute } from '@/config/admin-routes'

// Redirect to default tab (accounts)
definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], ssr: false })

const router = useRouter()

onMounted(() => {
  router.replace(adminRoute('users/accounts'))
})
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
