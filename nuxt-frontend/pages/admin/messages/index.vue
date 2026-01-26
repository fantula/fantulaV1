<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: [
    "mgmt-auth",
    function (to, from) {
      return navigateTo('/admin/messages/batch-send')
    }
  ]
})
</script>

<template>
  <div></div>
</template>
