<template>
  <div class="page-container">
    <PageTipHeader title="编辑账号合租订单" description="功能开发中..." />
    <AdminActionCard>
      <template #actions>
        <el-button @click="$router.back()">返回</el-button>
      </template>
    </AdminActionCard>
    <el-empty description="编辑功能正在开发中" />
  </div>
</template>

<script setup lang="ts">
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})
</script>
