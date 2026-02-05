<template>
  <div class="order-list">
    <div v-for="order in orders" :key="order.id" class="order-card glass-card">
      <div class="order-header-row">
        <span class="order-no">订单号: {{ order.order_no }}</span>
        <span class="order-status">待支付</span>
      </div>
      
      <div class="order-body">
        <div class="product-thumb">
          <div class="sq-cover-img-container">
            <img :src="order.product_snapshot?.image || '/images/shared/logo.png'" class="sq-cover-img" />
          </div>
        </div>
        <div class="product-info">
          <div class="product-name">{{ order.product_snapshot?.product_name }}</div>
          <div class="product-meta-row">
             <el-tag size="small" effect="dark" class="spec-tag">{{ formatSpec(order.sku_snapshot?.spec_combination) }}</el-tag>
          </div>
        </div>
        <div class="product-price">
          <div class="price-val">{{ order.unit_price.toFixed(2) }} 点</div>
          <div class="qty">x{{ order.quantity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PreOrder } from '@/api/client/supabase'

defineProps<{
  orders: PreOrder[]
  loading?: boolean
}>()

const formatSpec = (spec: any) => {
    if (!spec) return '默认规格'
    return Object.values(spec).join(' / ')
}
</script>

<style scoped>
.order-card {
  margin-bottom: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.order-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary-blue);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.order-header-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--text-sub);
}

.order-body {
  display: flex;
  gap: 16px;
}

.product-thumb {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.2);
}

.sq-cover-img-container {
    width: 100%; height: 100%;
}
.sq-cover-img {
    width: 100%; height: 100%; object-fit: cover;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 8px;
}

.product-meta-row {
    display: flex; gap: 12px; align-items: center;
}

.spec-tag {
    /* Element Plus Tag Override */
    --el-tag-bg-color: rgba(255, 255, 255, 0.1);
    --el-tag-border-color: rgba(255, 255, 255, 0.2);
    --el-tag-text-color: var(--text-sub);
}

.product-price {
  text-align: right;
}

.price-val {
  font-size: 18px;
  font-weight: 700;
  color: var(--active-orange);
}

.qty {
  font-size: 13px;
  color: var(--text-sub);
  margin-top: 4px;
}
</style>
