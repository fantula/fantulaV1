<template>
  <PageTipHeader title="虚拟充值订单详情" type="info" />
  <AdminActionCard>
    <template #actions>
      <el-button @click="goBack" :icon="ArrowLeft">返回</el-button>
      <el-button type="primary" @click="openEdit" :icon="Edit">编辑</el-button>
    </template>
  </AdminActionCard>

  <div class="detail-wrapper">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="订单号">{{ order.order_no }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag :type="order.status === 'paid' ? 'success' : 'warning'">{{ order.status }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ new Date(order.created_at).toLocaleString() }}</el-descriptions-item>
      <el-descriptions-item label="金额">¥{{ order.amount }}</el-descriptions-item>
    </el-descriptions>

    <h3 class="mt-4">标签</h3>
    <TagInputGroup v-model="order.tags" add-button-text="+ 新标签" />

    <h3 class="mt-4">订单商品</h3>
    <AdminDataTable :data="order.items" :show-header="false" :border="true">
      <el-table-column label="商品信息" min-width="260">
        <template #default="{ row }">
          <OrderItemCell :image="row.image" :name="row.name" :id="row.id" />
        </template>
      </el-table-column>
      <el-table-column label="数量" width="80" align="center">
        <template #default="{ row }">{{ row.quantity }}</template>
      </el-table-column>
      <el-table-column label="单价" width="100" align="center">
        <template #default="{ row }">¥{{ row.price }}</template>
      </el-table-column>
    </AdminDataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowLeft, Edit } from '@element-plus/icons-vue'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import TagInputGroup from '@/components/admin/base/TagInputGroup.vue'
import OrderItemCell from '@/components/admin/base/OrderItemCell.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { adminOrderApi } from '@/api/admin-supabase'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const order = ref<any>({})

onMounted(async () => {
  const id = route.query.id as string
  const res = await adminOrderApi.getVirtualRechargeDetail(id)
  if (res.success) order.value = res.data
})

function goBack() { router.back() }
function openEdit() { router.push(`/_mgmt_9Xfa3/orders/recharge/post?id=${order.value.id}`) }
</script>

<style scoped>
.detail-wrapper { padding: 20px; background: #fff; border-radius: 8px; }
.mt-4 { margin-top: 24px; }
</style>
