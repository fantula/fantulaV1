<script setup lang="ts">
definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"],
  middleware: [
    function (to, from) {
      return navigateTo('/admin/backend-settings/storage')
    }
  ]
})
</script>
