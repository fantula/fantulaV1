<script setup lang="ts">
definePageMeta({
  middleware: [
    (to, from) => {
      return navigateTo('/_mgmt_9Xfa3/messages/batch-send')
    }
  ]
})
</script>
