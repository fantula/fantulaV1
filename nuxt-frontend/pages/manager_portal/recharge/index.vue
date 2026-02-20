<script setup lang="ts">
import { adminRoute } from '@/config/admin-routes'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"],
  ssr: false
})

import { onMounted, onActivated, nextTick } from 'vue'

const router = useRouter()

const redirect = async () => {
    await nextTick()
    router.replace(adminRoute('recharge/tiers'))
}

onMounted(() => redirect())
onActivated(() => redirect())
</script>

<template>
</template>
