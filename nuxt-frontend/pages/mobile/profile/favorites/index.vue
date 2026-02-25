<template>
  <div class="mobile-page">
    <div class="mobile-bg-fixed"></div>
    <MobileSubPageHeader title="我的收藏" />

    <!-- Categories Tabs -->
    <div class="categories-tabs glass-tabs" v-if="categories.length > 0">
      <div 
        v-for="cat in categories" 
        :key="cat.id"
        class="tab-item"
        :class="{ active: activeTab === cat.id }"
        @click="activeTab = cat.id"
      >
        {{ cat.name }}
      </div>
    </div>

    <div class="content-body">
      <BaseInfiniteList 
         :loading="loading" 
         :finished="finished"
         :error="error" 
         @load="loadMore"
      >
         <div v-if="displayList.length === 0 && !loading" class="empty-state">
            <div class="empty-icon-box"><el-icon><Star /></el-icon></div>
            <p>暂无收藏商品</p>
         </div>

         <div v-else class="favorites-grid">
            <div 
              v-for="item in displayList" 
              :key="item.id" 
              class="info-card-glass fav-card"
              @click="openProductDetail(item.productId)"
            >
               <!-- Image Section -->
               <div class="card-img">
                  <NuxtImg :src="item.productImage" :alt="item.productName" loading="lazy" decoding="async" width="80" quality="80" format="webp" />
                  <!-- Status Overlay (e.g. No Stock) -->
                  <div class="stock-overlay" v-if="item.stock === 0">
                      <span>缺货</span>
                  </div>
               </div>

               <!-- Info Section -->
               <div class="card-info">
                  <div class="product-title">{{ item.productName }}</div>
                  
                  <div class="info-row-bottom">
                      <div class="price-wrap">
                         <span class="amount">{{ Number(item.price || 0).toFixed(2) }}点</span>
                      </div>
                      
                      <!-- Cancel Collection Toggle -->
                      <div class="fav-action" @click.stop="handleRemove(item.id)">
                         <el-icon class="fav-icon filled"><StarFilled /></el-icon>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </BaseInfiniteList>
    </div>

    <!-- Integrated Product Detail Sheet -->
    <ProductDetailSheet 
        v-model:visible="sheetVisible" 
        :goodsId="selectedGoodsId"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Star, StarFilled } from '@element-plus/icons-vue'
import { favoriteApi } from '@/api/client/common'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'
const ProductDetailSheet = defineAsyncComponent(() => import('@/components/mobile/goods/ProductDetailSheet.vue'))
import { useToast } from '@/composables/mobile/useToast'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const { showToast } = useToast()
const categories = ref<any[]>([])
const allFavorites = ref<any[]>([])
const activeTab = ref('all')

// Product Detail Sheet State
const sheetVisible = ref(false)
const selectedGoodsId = ref('')

const filteredList = computed(() => {
    if(activeTab.value === 'all') return allFavorites.value
    return allFavorites.value.filter(item => item.categoryId === activeTab.value)
})

// Client-side pagination adaptation
const { displayList, loading, finished, error, loadMore, reset } = useInfiniteScroll<any>({
    data: filteredList,
    pageSize: 10
})

const fetchFavorites = async () => {
    // let useInfiniteScroll handle loading during scroll, but we need manual load here for cats
    loading.value = true // Initial full page load
    try {
      const res = await favoriteApi.getFavoritesData()
      if(res.success && res.data) {
         categories.value = res.data.categories
         allFavorites.value = res.data.favorites
      }
    } catch(e) {
      error.value = true
    } finally {
      loading.value = false
    }
}

const handleRemove = async (id: string) => {
   try {
      const res = await favoriteApi.removeFavorite(id)
      if(res.success) {
         showToast('已取消收藏', 'success')
         // Remove locally
         allFavorites.value = allFavorites.value.filter(item => item.id !== id)
      } else {
         showToast(res.msg || '操作失败', 'error')
      }
   } catch(e) {
      showToast('服务繁忙，请稍后再试', 'error')
   }
}

const openProductDetail = (productId: string) => {
    selectedGoodsId.value = productId
    sheetVisible.value = true
}

onMounted(() => {
   fetchFavorites()
})

// Reset scroll when tab changes
watch(activeTab, () => {
    // handled by useInfiniteScroll watcher on data usually, but here we change source computed
    // Display list should update automatically via composable
})
</script>

<style scoped>
.mobile-page {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 40px;
  color: #fff;
  display: flex; flex-direction: column;
  position: relative;
}
.mobile-bg-fixed {
  position: fixed; inset: 0; z-index: -1;
  background: #0F172A; /* Fallback */
}

/* Glass Tabs */
.glass-tabs {
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.categories-tabs {
    display: flex; gap: 24px;
    overflow-x: auto;
    padding: 0 20px;
    position: sticky; top: 44px; /* Adjust based on header */
    z-index: 40;
    scrollbar-width: none;
    height: 48px; align-items: center;
}
.categories-tabs::-webkit-scrollbar { display: none; }

.tab-item {
    font-size: 14px; color: #94A3B8; white-space: nowrap;
    padding: 6px 0;
    position: relative;
    transition: all 0.3s;
}
.tab-item.active {
    color: #fff; font-weight: 600; 
}
.tab-item.active::after {
    content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 20px; height: 3px; background: #3B82F6; border-radius: 2px;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.content-body {
    padding: 16px; flex: 1;
}

.favorites-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

/* Glass Card */
.info-card-glass {
    background: #1E293B; 
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; 
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: transform 0.2s;
}
.info-card-glass:active { transform: scale(0.98); }

.fav-card {
    display: flex; flex-direction: column;
}

.card-img {
    position: relative;
    padding-top: 100%; /* Square */
    background: #0F172A;
}
.card-img img {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;
}

.stock-overlay {
    position: absolute; inset: 0; background: rgba(0,0,0,0.6);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(2px);
}
.stock-overlay span {
    padding: 4px 10px; background: rgba(255,255,255,0.2); 
    border-radius: 4px; font-size: 12px; color: #fff;
    border: 1px solid rgba(255,255,255,0.3);
}

.card-info {
    padding: 12px;
    display: flex; flex-direction: column; justify-content: space-between;
    flex: 1;
}
.product-title {
    font-size: 13px; color: #E2E8F0;
    display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 8px; line-height: 1.4; height: 36px;
}

.info-row-bottom {
    display: flex; align-items: flex-end; justify-content: space-between;
}

.price-wrap {
    color: var(--color-accent); font-family: 'DIN Alternate', sans-serif; font-weight: bold;
    display: flex; align-items: baseline;
}
.symbol { font-size: 12px; margin-right: 1px; }
.amount { font-size: 18px; }

.fav-action {
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
}
.fav-icon { font-size: 20px; color: #64748B; transition: all 0.3s; }
.fav-icon.filled { color: #F59E0B; filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.4)); }

.empty-state { 
    padding: 60px 0; text-align: center; color: #64748B;
    display: flex; flex-direction: column; align-items: center;
}
.empty-icon-box {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    font-size: 32px; color: #475569; margin-bottom: 16px;
}
</style>
