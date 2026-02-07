<template>
  <div class="mobile-page">
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
            <el-icon class="empty-icon"><Star /></el-icon>
            <p>暂无收藏商品</p>
         </div>

         <div v-else class="favorites-grid">
            <div 
              v-for="item in displayList" 
              :key="item.id" 
              class="info-card-glass fav-card"
              @click="goToProduct(item.productId)"
            >
               <div class="card-img">
                  <img :src="item.productImage" :alt="item.productName" />
                  <div class="remove-btn" @click.stop="handleRemove(item.id)">
                     <el-icon><Delete /></el-icon>
                  </div>
               </div>
               <div class="card-info">
                  <div class="product-title">{{ item.productName }}</div>
                  <div class="product-spec" v-if="item.specName">{{ item.specName }}</div>
                  <div class="product-price">
                     <span class="symbol">¥</span>{{ item.price }}
                  </div>
               </div>
            </div>
         </div>
      </BaseInfiniteList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Star, Delete } from '@element-plus/icons-vue'
import { favoriteApi } from '@/api/client/common'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'
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
   loading.value = true
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
   // Confirm dialog could be nice but direct action is faster on mobile
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
      showToast('网络错误', 'error')
   }
}

const goToProduct = (id: string) => {
    router.push(`/mobile/goods/${id}`)
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
  min-height: 100vh;
  background: #0F172A;
  padding-bottom: 40px;
  color: #fff;
  display: flex; flex-direction: column;
}

/* Glass Tabs */
.glass-tabs {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.categories-tabs {
    display: flex; gap: 20px;
    overflow-x: auto;
    padding: 0 20px;
    position: sticky; top: 70px; z-index: 40; /* top: 70px to sit below header */
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
}

.content-body {
    padding: 20px; flex: 1;
}

.favorites-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

/* Glass Card */
.info-card-glass {
    background: #1E293B; /* Slate 800 base */
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; 
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.fav-card {
    display: flex; flex-direction: column;
}

.card-img {
    position: relative;
    padding-top: 100%;
    background: #0F172A;
}
.card-img img {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;
}
.remove-btn {
    position: absolute; top: 8px; right: 8px;
    width: 28px; height: 28px;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 14px;
    border: 1px solid rgba(255,255,255,0.1);
}
.remove-btn:active { background: rgba(239, 68, 68, 0.8); }

.card-info {
    padding: 12px;
}
.product-title {
    font-size: 13px; color: #E2E8F0;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-bottom: 4px; line-height: 1.4;
}
.product-spec {
    font-size: 11px; color: #64748B; margin-bottom: 8px;
}
.product-price {
    font-size: 16px; font-weight: bold; color: #F97316; font-family: 'DIN Alternate', sans-serif;
    display: flex; align-items: baseline;
}
.symbol { font-size: 11px; margin-right: 2px; }

.empty-state { text-align: center; color: #64748B; padding-top: 60px; }
.empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.3; }
</style>
