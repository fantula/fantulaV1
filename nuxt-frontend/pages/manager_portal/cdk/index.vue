<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: [
    "mgmt-auth",
    function (to, from) {
      return navigateTo('/manager_portal/cdk/virtual')
    }
  ]
})
</script>

<template>
  <div></div>
</template>
