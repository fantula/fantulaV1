<script setup lang="ts">
import { adminRoute } from '@/config/admin-routes'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"],
  ssr: false
})

import { onMounted, nextTick } from 'vue'

const router = useRouter()

onMounted(async () => {
    await nextTick()
    const target = adminRoute('cdk/virtual')
    if (router.currentRoute.value.path !== target) {
        router.replace(target).catch(() => {})
    }
})
</script>

<template>
</template>
