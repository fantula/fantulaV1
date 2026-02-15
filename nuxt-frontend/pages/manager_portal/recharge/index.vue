<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: [
    "mgmt-auth",
    function (to, from) {
      return navigateTo('/manager_portal/recharge/tiers')
    }
  ]
})
</script>

<template>
  <div></div>
</template>
