<script setup lang="ts">
definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"],
  middleware: [
    (to, from) => {
      return navigateTo('/admin/messages/batch-send')
    }
  ]
})
</script>
