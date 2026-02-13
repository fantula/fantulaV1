<template>
  <div class="order-info-card" :class="{ loading: loading }">
    <!-- Loading State -->
    <template v-if="loading">
      <div class="loading-content">
        <span class="loading-spinner"></span>
        <span>加载订单信息...</span>
      </div>
    </template>

    <!-- Order Content -->
    <template v-else-if="order">
      <div class="card-image">
        <img :src="getImage()" alt="Product" />
      </div>
      <div class="card-info">
        <div class="info-top">
          <span class="order-no">订单号 {{ order.order_no }}</span>
          <span class="status-badge" :class="order.status">{{ formatStatus(order.status) }}</span>
        </div>
        <div class="product-row">
          <span class="product-name">{{ getProductName() }}</span>
          <span v-if="getSpecs().length" class="specs">
            <span v-for="spec in getSpecs()" :key="spec" class="spec-tag">{{ spec }}</span>
          </span>
        </div>
        <div class="price-row">
          <span class="price">¥{{ formatPrice() }}</span>
          <span class="quantity">x{{ order.quantity || 1 }}</span>
        </div>
      </div>
    </template>

    <!-- Fallback -->
    <template v-else>
      <div class="empty-state">
        暂无订单信息
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ClientOrder } from '@/api/client/order'

const props = defineProps<{
  order?: ClientOrder | null
  loading?: boolean
}>()

const getImage = () => {
  return props.order?.product_snapshot?.image || '/images/placeholder.png'
}

const getProductName = () => {
  return props.order?.product_snapshot?.product_name || '商品'
}

const getSpecs = (): string[] => {
  const specs = props.order?.sku_snapshot?.spec_combination
  if (!specs || typeof specs !== 'object') return []
  return Object.values(specs) as string[]
}

const formatPrice = () => {
  const amount = props.order?.total_amount
  return typeof amount === 'number' ? amount.toFixed(2) : '0.00'
}

const formatStatus = (status?: string) => {
  const map: Record<string, string> = {
    'pending_payment': '待支付',
    'pending_delivery': '待发货',
    'active': '使用中',
    'completed': '已完成',
    'expired': '已过期',
    'refunding': '退款中',
    'refunded': '已退款',
    'cancelled': '已取消'
  }
  return map[status || ''] || status || '未知'
}
</script>

<style scoped>
.order-info-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 14px;
  display: flex;
  gap: 14px;
  transition: all 0.3s ease;
}
.order-info-card:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}
.order-info-card.loading {
  justify-content: center;
  min-height: 100px;
}

/* Image */
.card-image {
  width: 72px;
  height: 72px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: linear-gradient(135deg, #0F172A, #1E293B);
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info */
.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

/* Top Row */
.info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.order-no {
  font-size: 12px;
  color: #64748B;
  font-family: 'Monaco', monospace;
}

/* Status Badge */
.status-badge {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 600;
  white-space: nowrap;
  /* Default style */
  background: rgba(100, 116, 139, 0.15);
  color: #94A3B8;
  border: 1px solid rgba(100, 116, 139, 0.2);
}
.status-badge.pending_delivery {
  background: rgba(59, 130, 246, 0.12);
  color: #60A5FA;
  border-color: rgba(59, 130, 246, 0.25);
}
.status-badge.active {
  background: rgba(16, 185, 129, 0.12);
  color: #34D399;
  border-color: rgba(16, 185, 129, 0.25);
}
.status-badge.completed {
  background: rgba(139, 92, 246, 0.12);
  color: #A78BFA;
  border-color: rgba(139, 92, 246, 0.25);
}
.status-badge.refunding {
  background: rgba(245, 158, 11, 0.12);
  color: #FBBF24;
  border-color: rgba(245, 158, 11, 0.25);
}
.status-badge.refunded {
  background: rgba(239, 68, 68, 0.12);
  color: #F87171;
  border-color: rgba(239, 68, 68, 0.25);
}

/* Product Row */
.product-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}
.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #F1F5F9;
  line-height: 1.3;
}
.specs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.spec-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.1);
  color: #60A5FA;
  border: 1px solid rgba(59, 130, 246, 0.15);
}

/* Price Row */
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 6px;
}
.price {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-accent);
  font-family: 'Outfit', 'Inter', sans-serif;
}
.quantity {
  font-size: 12px;
  color: #64748B;
}

/* Loading */
.loading-content {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #64748B;
  font-size: 13px;
}
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Empty */
.empty-state {
  width: 100%;
  text-align: center;
  color: #64748B;
  font-size: 13px;
  padding: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
