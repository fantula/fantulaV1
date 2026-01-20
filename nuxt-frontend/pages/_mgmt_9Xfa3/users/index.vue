<script setup lang="ts">
// Redirect to default tab (accounts)
definePageMeta({ ssr: false })

const router = useRouter()

onMounted(() => {
  router.replace('/_mgmt_9Xfa3/users/accounts')
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
