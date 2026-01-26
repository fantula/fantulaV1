<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: [
    "mgmt-auth",
    function (to, from) {
      return navigateTo('/admin/backend-settings/storage')
    }
  ]
})
</script>

<template>
  <div></div>
</template>
