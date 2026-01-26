<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: [
    "mgmt-auth",
    function (to, from) {
      return navigateTo('/admin/recharge/tiers')
    }
  ]
})
</script>

<template>
  <div></div>
</template>
