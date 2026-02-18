<template>
  <div 
    class="goods-card"
    @click="$emit('click', goods.id)"
  >
    <!-- Badge -->
    <div 
      v-if="goods.badge_label && goods.badge_label !== '不展示'" 
      class="badge-label"
      :class="getBadgeClass(goods.badge_label)"
    >
      {{ goods.badge_label }}
    </div>

    <!-- Image -->
    <div class="goods-image-container">
      <el-image 
        :src="goods.image" 
        fit="cover" 
        class="goods-image"
        loading="lazy"
      >
        <template #placeholder>
          <div class="image-placeholder">
            <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
          </div>
        </template>
      </el-image>
    </div>

    <!-- Content -->
    <div class="goods-card-content">
      <h3 class="goods-title" :title="goods.product_name">{{ goods.product_name }}</h3>
      
      <div class="goods-price-row">
        <!-- Use useBizFormat for price -->
        <span class="price-val">{{ formatPrice(goods.display_price) }}</span>
        <span class="price-unit">/起</span>
      </div>

      <div class="selling-tags" v-if="tagsList.length">
        <span 
          v-for="(tag, tIdx) in tagsList.slice(0, 3)" 
          :key="tIdx" 
          class="sell-tag"
        >
          {{ tag }}
        </span>
      </div>

      <div class="goods-stats">
        <div class="stat-item">
          <span class="stat-label">销量</span> 
          <span class="stat-value">{{ formatSales(goods.initial_sales || 0) }}</span>
        </div>
        <div class="stat-item rating">
          <span class="stat-label">好评度</span> 
          <span class="stat-value">{{ goods.rating }}%</span>
        </div>
      </div>

       <div class="action-btn-wrap">
         <BaseButton themeId="marketing-buy" block class="product-action-btn">
           查看详情
           <template #icon>
             <el-icon class="btn-icon"><ArrowRight /></el-icon>
           </template>
         </BaseButton>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { useBizFormat } from '@/composables/common/useBizFormat'

// Define the interface for the goods prop
interface GoodsItem {
  id: string | number
  product_name?: string
  image?: string
  display_price?: number | string
  initial_sales?: number
  rating?: number
  badge_label?: string
  tags?: string | string[]
}

const props = defineProps<{
  goods: GoodsItem
}>()

const emit = defineEmits<{
  (e: 'click', id: string | number): void
}>()

const { formatPrice, formatSales } = useBizFormat()

// Helper Functions
const getBadgeClass = (label: string) => {
  const map: Record<string, string> = {
    '热卖': 'bg-hot',
    '新品': 'bg-new',
    '推荐': 'bg-recommend',
    '限时': 'bg-limited',
    '优惠': 'bg-promo'
  }
  return map[label] || ''
}

const tagsList = computed(() => {
  const tags = props.goods.tags
  if (!tags) return []
  if (Array.isArray(tags)) return tags
  if (typeof tags === 'string' && tags.includes(',')) return tags.split(',')
  return []
})
</script>

<style scoped>
/* Card Styling - Structure Only */
.goods-card {
  position: relative;
  /* background: #fff;  Removed to use global dark glass */
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

/* Badge */
.badge-label {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 6px 18px; /* Increased padding */
  font-size: 13px;   /* Increased font size */
  font-weight: 700;
  color: #fff;
  border-radius: 20px 0 20px 0; /* More organic curve */
  box-shadow: 2px 4px 10px rgba(0,0,0,0.2);
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Fix text vertical alignment */
  line-height: normal; 
}
.bg-hot { background: linear-gradient(135deg, var(--active-orange), #EA580C); }
.bg-new { background: linear-gradient(135deg, var(--primary-blue), #0284C7); }
.bg-recommend { background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover)); }
.bg-limited { background: linear-gradient(135deg, var(--primary-blue), #0369A1); color: #fff; }
.bg-promo { background: linear-gradient(135deg, var(--primary-blue), #0EA5E9); }

/* Image Container */
.goods-image-container {
  position: relative;
  width: 100%;
  padding-top: 75% !important; /* Revert to 4:3 Original Ratio */
  background: radial-gradient(circle at center, #ffffff 0%, #f9f9fb 100%);
}

.goods-image {
  /* ... */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;     /* Auto width based on height */
  height: 55%;     /* Reduced further to 55% for more whitespace */
  aspect-ratio: 1 / 1; /* Force Square */
  transition: transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
  border-radius: 12px;
  border-radius: 12px;
  border: 2px solid var(--primary-blue);
  box-sizing: border-box;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.05));
}

.goods-card:hover .goods-image {
  transform: translate(-50%, -50%) scale(1.1) rotate(3deg); /* Zoom & Tilt */
  border-color: var(--active-orange);
}

/* Content */
.goods-card-content {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.goods-title {
  font-size: 17px; /* Increased from 15px */
  font-weight: 600;
  color: #F1F5F9;
  text-align: center;
  margin: 0 0 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
}

.goods-price-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  color: var(--active-orange);
  margin-bottom: 12px;
}
.goods-price-row .currency { font-size: 14px; font-weight: 600; }
.goods-price-row .price-val { font-size: 26px; font-weight: 800; margin: 0 2px; }
.goods-price-row .price-unit { font-size: 12px; opacity: 0.7; font-weight: 500; }

/* Tags */
.selling-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 15px;
  min-height: 22px;
}
.sell-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  line-height: 1;
  font-size: 10px;
  color: #38bdf8;
  background: rgba(255, 255, 255, 0.05);
  padding: 0 8px;
  border-radius: 6px;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

/* Stats */
.goods-stats {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px dashed rgba(255,255,255,0.1);
  color: #94A3B8;
  font-size: 11px;
  margin-bottom: 15px;
}
.stat-item .stat-value {
  color: #F1F5F9; /* Bright gray/white */
  font-weight: 600;
  margin-left: 3px;
}
.stat-item.rating .stat-value {
  color: var(--active-orange);
}

/* Button */
.action-btn-wrap {
  margin-top: auto;
}

.goods-card:hover .product-action-btn {
  background: var(--active-orange) !important;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4) !important;
  border-color: transparent;
}

.btn-icon {
  transition: transform 0.3s;
}
.goods-card:hover .btn-icon {
  transform: translateX(3px);
}
</style>
