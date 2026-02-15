<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: [
    "mgmt-auth",
    function (to, from) {
      return navigateTo('/manager_portal/messages/batch-send')
    }
  ]
})
</script>

<template>
  <div></div>
</template>
