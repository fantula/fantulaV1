<template>
  <div class="goods-card-row card-glass" @click="$emit('click')">
    <!-- Left: Image -->
    <div class="goods-thumb">
      <img :src="goods.image || goods.coverImage" loading="lazy" />
      <!-- Tag Overlay -->
      <div v-if="goods.badge_label && goods.badge_label !== '不展示'" 
           class="card-badge" 
           :class="getBadgeClass(goods.badge_label)">
         {{ goods.badge_label }}
      </div>
    </div>

    <!-- Right: Info -->
    <div class="goods-info">
      <h3 class="goods-title">{{ goods.product_name || goods.name || goods.title }}</h3>
      
      <!-- Tags (Limited to 2 to save space) -->
      <div class="goods-tags-row" v-if="tags.length">
        <span class="tag-item" v-for="(tag, idx) in tags.slice(0, 2)" :key="idx">{{ tag }}</span>
      </div>

      <!-- Stats -->
      <div class="goods-meta-row">
         <span class="stat-text">已售 {{ formatSales(goods.initial_sales || goods.sales || 0) }}</span>
      </div>
      
      <div class="goods-bottom">
        <div class="goods-price-row">
          <span class="currency">¥</span>
          <span class="price-val text-price">{{ formatPrice(goods.display_price || goods.price) }}</span>
        </div>
        
        <!-- Action Button -->
        <button class="buy-btn btn-primary">
          购买
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Goods } from '@/types/api'

const props = defineProps<{
  goods: Goods
}>()

defineEmits(['click'])

// Helpers
const tags = computed(() => {
    const t = props.goods.tags
    if (!t) return []
    if (Array.isArray(t)) return t
    if (typeof t === 'string' && t.includes(',')) return t.split(',')
    return [t as string]
})

const formatPrice = (price: number | string | undefined) => {
  if (price === undefined || price === null) return '0.00'
  const num = typeof price === 'string' ? parseFloat(price) : price
  return num.toFixed(2)
}

const formatSales = (val: number | string) => {
  const num = Number(val)
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num
}

const getBadgeClass = (label: string) => {
  const map: Record<string, string> = {
    '热卖': 'badge-hot',
    '新品': 'badge-new',
    '推荐': 'badge-hot',
    '限时': 'badge-new',
    '优惠': 'badge-hot'
  }
  return map[label] || 'badge-new'
}
</script>

<style scoped>
.goods-card-row {
  display: flex;
  gap: 12px;
  padding: 12px;
  transition: active 0.2s;
  background: var(--glass-bg); /* Explicit fallback */
}

.goods-thumb {
  width: 110px;
  height: 110px;
  flex-shrink: 0;
  background: #1E293B;
  border-radius: var(--radius-md);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
}
.goods-thumb img { 
    width: 100%; height: 100%; object-fit: cover; 
    transition: transform 0.5s;
}
.goods-card-row:active .goods-thumb img {
    transform: scale(1.05); /* Zoom effect on active */
}

.card-badge {
    position: absolute;
    top: 0; left: 0;
    padding: 2px 6px;
    border-radius: 0 0 8px 0;
    z-index: 5;
    font-size: 10px;
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 0;
  overflow: hidden; /* Prevent text overflow */
}

.goods-title {
  font-size: 15px; margin: 0; color: var(--text-primary);
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 4px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.goods-tags-row {
    display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 4px;
}
.tag-item {
    font-size: 10px;
    color: var(--secondary-color);
    border: 1px solid rgba(6, 182, 212, 0.2);
    background: rgba(6, 182, 212, 0.05);
    padding: 1px 5px;
    border-radius: 4px;
    white-space: nowrap;
}

.goods-meta-row {
    display: flex; gap: 6px; align-items: center;
    font-size: 11px; color: var(--text-muted);
    margin-bottom: auto; /* Push bottom section down */
}

.goods-bottom {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-top: 8px;
}

.goods-price-row { 
    color: var(--accent-color); 
    display: flex; 
    align-items: baseline;
    gap: 2px;
}
.currency { font-size: 12px; font-weight: 600; }
.price-val { 
    font-size: 20px; 
}

.buy-btn {
    padding: 6px 14px;
    font-size: 12px;
    border-radius: 16px; 
    /* Button styles from global class but overridden size */
}
</style>
