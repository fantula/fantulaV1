<template>
  <div class="recharge-orders-skeleton">
     <!-- 顶部筛选骨架 -->
     <AdminActionCard>
        <el-skeleton animated :rows="1" />
     </AdminActionCard>

     <!-- 列表骨架 -->
     <el-card shadow="never" class="mt-4">
        <el-skeleton animated :rows="10" />
     </el-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
</script>

<style scoped>
.mt-4 {
    margin-top: 16px;
}
</style>
