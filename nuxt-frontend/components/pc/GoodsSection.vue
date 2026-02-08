<template>
  <section class="goods-section">
    <div class="container">
      <div class="goods-grid" v-if="loading">
        <ProductCardSkeleton v-for="i in 8" :key="i" />
      </div>

      <div class="goods-grid" v-else-if="goodsList && goodsList.length > 0">
        <ProductCard 
          v-for="item in goodsList" 
          :key="item.id" 
          :goods="item"
          @click="navigateToGoods"
        />
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="error-state">
         <el-result icon="error" title="加载失败" sub-title="请检查网络后重试">
            <template #extra>
              <el-button type="primary" @click="$emit('retry')">重试</el-button>
            </template>
         </el-result>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <el-empty description="暂无相关商品" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '@/components/pc/ProductCard.vue'
import ProductCardSkeleton from '@/components/pc/base/ProductCardSkeleton.vue'

// Prop type matches the fields defined in AdminProduct for high fidelity
interface GoodsDisplayItem {
  id: string | number
  product_name?: string
  image?: string
  display_price?: number | string
  initial_sales?: number
  rating?: number
  badge_label?: string
  tags?: string | string[]
}

defineProps<{
  goodsList: GoodsDisplayItem[]
  loading?: boolean
  error?: boolean
}>()

const emit = defineEmits<{
  (e: 'retry'): void
}>()

const navigateToGoods = (id: number | string) => {
  navigateTo(`/goods/${id}`)
}
</script>

<style scoped>
.goods-section {
  padding: 10px 0 80px; 
  background: transparent;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px; 
}

/* Skeleton Container to match Grid */
.goods-card-skeleton {
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02); /* Subtle placeholder bg */
}

/* Responsive */
@media (max-width: 1100px) {
  .goods-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 850px) {
  .goods-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .goods-grid { grid-template-columns: 1fr; }
}
</style>
