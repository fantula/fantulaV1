<template>
  <div class="goods-card-row card-glass" @click="$emit('click')">
    <!-- Left: Image -->
    <div class="goods-thumb">
      <img :src="goods.image || goods.coverImage" loading="lazy" decoding="async" />
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

      <div class="goods-tags-row" v-if="tags.length">
        <span
          v-for="(tag, idx) in tags.slice(0, 2)"
          :key="idx"
          class="aurora-tag"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Stats -->
      <div class="goods-meta-row">
         <span class="stat-text">已售 {{ formatSales(goods.initial_sales || goods.sales || 0) }}</span>
      </div>

      <div class="goods-bottom">
        <div class="goods-price-row">
          <span class="price-val text-price">{{ formatPrice(goods.display_price || goods.price) }}</span>
        </div>

        <!-- Action Button -->
        <button class="buy-btn btn-marketing-buy">
          查看详情
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Goods } from '@/types/api'
import { useBizFormat } from '@/composables/common/useBizFormat'

const props = defineProps<{
  goods: Goods
}>()

defineEmits(['click'])

const { formatPrice, formatSales } = useBizFormat()

// Helpers
const tags = computed(() => {
    const t = props.goods.tags
    if (!t) return []
    if (Array.isArray(t)) return t
    if (typeof t === 'string' && t.includes(',')) return t.split(',')
    return [t as string]
})

const getBadgeClass = (label: string) => {
  const map: Record<string, string> = {
    '热卖': 'badge-hot',
    '新品': 'badge-new',
    '推荐': 'badge-recommend',
    '限时': 'badge-limited',
    '优惠': 'badge-promo'
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
  border: 1px solid var(--primary); /* Global Border Style */
  border-radius: var(--radius-lg);
}

.goods-thumb {
  width: 110px;
  height: 110px;
  flex-shrink: 0;
  background: #1E293B;
  border-radius: var(--radius-md);
  position: relative;
  overflow: hidden;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--primary); /* Image Border */
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
    color: #fff;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
}

.badge-hot { background: linear-gradient(135deg, var(--accent) 0%, #EA580C 100%); }
.badge-new { background: linear-gradient(135deg, var(--primary) 0%, #0284C7 100%); }
.badge-recommend { background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%); }
.badge-limited { background: linear-gradient(135deg, var(--primary) 0%, #0369A1 100%); }
.badge-promo { background: linear-gradient(135deg, var(--primary) 0%, #0EA5E9 100%); }

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
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.goods-tags-row {
    display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px;
}
/* .tag-item removed, replaced by global .aurora-tag */

.aurora-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
}

.aurora-tag-default {
  background-color: var(--primary);
}

.aurora-tag-hot {
  background: linear-gradient(90deg, #FF6B6B 0%, #EE4D2D 100%);
}

.aurora-tag-new {
  background: linear-gradient(90deg, #6DD5ED 0%, #2193B0 100%);
}

.aurora-tag-recommend {
  background: linear-gradient(90deg, #FDC830 0%, #F37335 100%);
}

.aurora-tag-benefit {
  background: linear-gradient(90deg, #8360c3 0%, #2ebf91 100%);
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

/* Marketing Buy Style (to match PC) */
.btn-marketing-buy {
  background: linear-gradient(135deg, var(--primary) 0%, #0c6a96 100%);
  color: #fff;
  border: none;
  box-shadow: 0 4px 12px var(--primary-glow);

}
</style>
