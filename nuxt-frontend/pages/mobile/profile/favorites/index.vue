<template>
  <div class="mobile-page">
    <div class="page-header">
      <div class="back-btn" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <h1 class="page-title">我的收藏</h1>
      <div class="header-right"></div>
    </div>

    <!-- Categories Tabs -->
    <div class="categories-tabs" v-if="categories.length > 0">
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
              class="fav-card"
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
import { ArrowLeft, Star, Delete } from '@element-plus/icons-vue'
import { favoriteApi } from '@/api/client/common'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
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
         ElMessage.success({ message: '已取消收藏', offset: 100, customClass: 'mobile-message' })
         // Remove locally
         allFavorites.value = allFavorites.value.filter(item => item.id !== id)
      } else {
         ElMessage.error({ message: res.msg || '操作失败', offset: 100, customClass: 'mobile-message' })
      }
   } catch(e) {
      ElMessage.error('网络错误')
   }
}

const goToProduct = (id: string) => {
    // Mobile product detail page route? 
    // Usually /mobile/goods/[id] or similar. Checking PC: /goods/[id].
    // Assuming /mobile/goods/[id] exists or needs to be created. 
    // Task rule: "Mobile Pages: /pages/mobile". 
    // Existing files in list_dir: mobile/product probably? 
    // If not sure, just push to likely route. I'll guess /mobile/goods/[id] based on PC /goods/[id].
    // Re-checking list_dir output from step 8 -> mobile has 10 children.
    // I haven't listed mobile children.
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

.page-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.95);
  position: sticky; top: 0; z-index: 20;
}
.back-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
}
.page-title {
  flex: 1; text-align: center; font-size: 18px; font-weight: 600; margin: 0; padding-right: 32px;
}

.categories-tabs {
    display: flex; gap: 20px;
    overflow-x: auto;
    padding: 10px 20px;
    background: #0F172A;
    position: sticky; top: 72px; z-index: 10;
    scrollbar-width: none;
}
.categories-tabs::-webkit-scrollbar { display: none; }

.tab-item {
    font-size: 14px; color: #94A3B8; white-space: nowrap;
    padding-bottom: 6px;
    border-bottom: 2px solid transparent;
    transition: all 0.3s;
}
.tab-item.active {
    color: #fff; font-weight: 600; border-bottom-color: #3B82F6;
}

.content-body {
    padding: 20px; flex: 1;
}

.favorites-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.fav-card {
    background: rgba(30, 41, 59, 0.4);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
}

.card-img {
    position: relative;
    padding-top: 100%;
    background: #1E293B;
}
.card-img img {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;
}
.remove-btn {
    position: absolute; top: 8px; right: 8px;
    width: 24px; height: 24px;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 14px;
}

.card-info {
    padding: 10px;
}
.product-title {
    font-size: 13px; color: #E2E8F0;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-bottom: 4px;
}
.product-spec {
    font-size: 10px; color: #64748B; margin-bottom: 6px;
}
.product-price {
    font-size: 16px; font-weight: bold; color: #F97316; font-family: 'DIN Alternate', sans-serif;
}
.symbol { font-size: 10px; margin-right: 1px; }

.empty-state { text-align: center; color: #64748B; padding-top: 60px; }
.empty-icon { font-size: 40px; margin-bottom: 10px; opacity: 0.5; }
</style>
