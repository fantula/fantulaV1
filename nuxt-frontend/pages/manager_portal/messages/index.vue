<script setup lang="ts">
import { adminRoute } from '@/config/admin-routes'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"],
  ssr: false
})

const router = useRouter()
onMounted(() => {
  router.replace(adminRoute('messages/batch-send'))
})
</script>

<template>
  <div></div>
</template>
