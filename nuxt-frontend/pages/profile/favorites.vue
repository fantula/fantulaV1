<template>
  <div class="favorites-section">
    <!-- Header (Same as Exchange) -->
    <div class="section-header">
      <h2 class="section-title">我的收藏</h2>
      <div class="section-subtitle">My Collection</div>
    </div>

    <!-- Tabs (Scrollable) -->
    <div class="favorites-tabs">
      <div 
        v-for="cat in categories" 
        :key="cat.id"
        class="tab-item"
        :class="{ active: activeTab === cat.id }"
        @click="activeTab = cat.id"
      >
        {{ cat.name }}
        <div class="active-indicator" v-if="activeTab === cat.id"></div>
      </div>
    </div>

    <!-- Scrollable Content Area -->
    <div class="favorites-list-container">
      <!-- Loading -->
      <div v-if="loading" class="loading-grid">
        <el-skeleton animated class="skeleton-item" v-for="i in 6" :key="i">
          <template #template>
            <el-skeleton-item variant="image" class="skeleton-img" />
            <div style="padding: 14px">
              <el-skeleton-item variant="h3" style="width: 50%" />
              <div style="margin-top: 10px"><el-skeleton-item variant="text" style="width: 30%" /></div>
            </div>
          </template>
        </el-skeleton>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredFavorites.length === 0" class="empty-state">
        <el-icon class="empty-icon"><StarFilled /></el-icon>
        <div class="empty-text">暂无收藏商品</div>
        <div class="empty-desc">去探索更多好物，填满您的收藏夹吧</div>
        <button class="go-shopping-btn" @click="goShopping">
          前往商城
          <el-icon><Right /></el-icon>
        </button>
      </div>

      <!-- List Grid -->
      <div v-else class="favorites-grid">
        <transition-group name="list">
          <div 
            v-for="item in filteredFavorites" 
            :key="item.id" 
            class="favorite-card"
            @click="goToProduct(item.productId)"
          >
            <!-- Image Area (Homepage Style) -->
            <div class="card-image-container">
              <img :src="item.productImage" :alt="item.productName" class="product-img" />
            </div>

            <!-- Content Area -->
            <div class="card-content">
              <h3 class="product-title">{{ item.productName }}</h3>
              
              <!-- Specs -->
              <div class="spec-row" v-if="item.specName">
                <el-icon class="spec-icon"><Operation /></el-icon>
                <span class="spec-text">{{ item.specName }}</span>
              </div>
              
              <!-- Price -->
              <div class="price-row">
                <span class="amount">{{ Number(item.price).toFixed(2) }}</span>
                <span class="unit">点</span>
              </div>

              <!-- Actions -->
              <div class="card-actions">
                <button class="action-btn cancel-btn" @click.stop="removeFavorite(item.id)">
                  取消收藏
                </button>
                <button class="action-btn buy-btn" @click.stop="buyNow(item)" :disabled="submitting">
                  {{ submitting ? '处理中...' : '立即购买' }}
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 收藏页面
 * 重构版 - 使用 clientOrderApi
 */
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { favoriteApi } from '@/api/common'
import { clientOrderApi } from '@/api/client'
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modal'
import { ElMessage } from 'element-plus'
import { StarFilled, Right, Operation } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const modal = useModalStore()

const loading = ref(true)
const submitting = ref(false)
const categories = ref<any[]>([])
const favorites = ref<any[]>([])
const activeTab = ref('all')

const fetchFavorites = async () => {
  loading.value = true
  try {
    const res = await favoriteApi.getFavoritesData()
    if (res.success && res.data) {
      categories.value = res.data.categories
      favorites.value = res.data.favorites
    }
  } finally {
    loading.value = false
  }
}

onMounted(fetchFavorites)

const filteredFavorites = computed(() => {
  if (activeTab.value === 'all') return favorites.value
  return favorites.value.filter(item => item.categoryId === activeTab.value)
})

const goToProduct = (id: string) => {
  router.push(`/goods/${id}`)
}

const removeFavorite = async (favoriteId: string) => {
  const res = await favoriteApi.removeFavorite(favoriteId)
  if (res.success) {
    favorites.value = favorites.value.filter(item => item.id !== favoriteId)
    ElMessage.success('已取消收藏')
  }
}

const buyNow = async (item: any) => {
  if (!userStore.isLoggedIn) {
    modal.showLogin = true
    return
  }
  if (!item.skuId) {
    ElMessage.warning('请先选择商品规格')
    router.push(`/goods/${item.productId}`)
    return
  }
  
  if (submitting.value) return
  submitting.value = true
  
  try {
    const result = await clientOrderApi.createPreOrder(
      item.skuId,
      1,
      'buy_now'
    )
    
    if (!result.success) {
      if (result.error?.includes('DUPLICATE_ORDER') || result.error?.includes('未支付')) {
        ElMessage.warning('您已经下过该商品的订单了')
        router.push('/profile/orders?tab=待支付')
        return
      }
      ElMessage.error(result.error || '创建订单失败')
      return
    }
    router.push(`/checkout/${result.preOrderId}`)
  } catch (e) {
    ElMessage.error('创建订单失败')
  } finally {
    submitting.value = false
  }
}

const goShopping = () => {
  router.push('/')
}
</script>

<style scoped>
/* Main Layout - Same as Exchange */
.favorites-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow: hidden; /* Important */
}

/* Header */
.section-header {
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.section-subtitle {
  font-size: 12px;
  font-family: 'Outfit', sans-serif;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Tabs */
.favorites-tabs {
  flex-shrink: 0;
  display: flex;
  gap: 32px;
  padding: 0 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  overflow-x: auto;
  scrollbar-width: none;
}
.favorites-tabs::-webkit-scrollbar { display: none; }

.tab-item {
  padding: 16px 0;
  color: #94A3B8;
  cursor: pointer;
  font-size: 16px; /* Increased from 14px */
  font-weight: 500;
  position: relative;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-item:hover { color: #CBD5E1; }
.tab-item.active { color: #fff; font-weight: 600; }

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #3B82F6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  border-radius: 2px;
}

/* Content Container */
.favorites-list-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px 64px 32px;
  min-height: 0;
}

/* Grid - Slightly more compact */
.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Reduced from 240px */
  gap: 20px; /* Reduced gap */
}

/* --- Card Design (Refined V4) --- */
.favorite-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px; /* Slightly reduced radius for compact feel */
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.favorite-card:hover {
  transform: translateY(-4px);
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

/* Image Container (Dark + Highlight) */
.card-image-container {
  position: relative;
  width: 100%;
  padding-top: 80%;
  /* Changed from white radial gradient to dark glass subtle gradient */
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%);
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.product-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 65%; /* Increased slightly from 60% to keep it prominent in smaller card */
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  border: 2px solid #3B82F6;
  box-sizing: border-box;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3)); /* Darker shadow for dark bg */
  transition: transform 0.6s cubic-bezier(0.2, 0, 0.2, 1);
}

.favorite-card:hover .product-img {
  transform: translate(-50%, -50%) scale(1.1) rotate(3deg);
  border-color: #F97316;
}

/* Content */
.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
}

.product-title {
  font-size: 16px;
  font-weight: 600;
  color: #F1F5F9;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spec-row {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.spec-icon { font-size: 12px; color: #64748B; }
.spec-text { font-size: 12px; color: #94A3B8; }

.price-row {
  margin-top: 4px;
  display: flex;
  align-items: baseline;
  gap: 2px;
}
.amount {
  font-size: 20px;
  font-weight: 700;
  color: #FB923C;
  font-family: 'DIN Alternate', sans-serif;
}
.unit { font-size: 12px; color: #fff; opacity: 0.8; }

/* Buttons */
.card-actions {
  margin-top: auto;
  display: flex;
  gap: 8px;
  padding-top: 12px;
}

.action-btn {
  flex: 1;
  padding: 8px 0; /* Slimmer */
  border-radius: 100px; /* Pill Shape */
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.cancel-btn {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.1);
  color: #94A3B8;
}
.cancel-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #EF4444;
}

.buy-btn {
  background: linear-gradient(135deg, #3B82F6, #2563EB); /* Blue Gradient */
  color: #fff;
  border: none;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}
.buy-btn:hover {
  background: linear-gradient(135deg, #F97316, #EA580C); /* Orange Gradient */
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(249, 115, 22, 0.4);
}
.buy-btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* Responsive */
@media (max-width: 1400px) { .favorites-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); } }
@media (max-width: 768px) { .favorites-grid { grid-template-columns: repeat(2, 1fr); } }

/* Empty/Loading */
.loading-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 24px; }
.skeleton-item { background: rgba(255, 255, 255, 0.02) !important; border-radius: 20px; overflow: hidden; }
.skeleton-img { width: 100%; padding-top: 80%; }

.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 0; }
.empty-icon { font-size: 48px; color: #475569; margin-bottom: 16px; }
.empty-text { font-size: 16px; font-weight: 600; color: #CBD5E1; margin-bottom: 8px; }
.empty-desc { font-size: 13px; color: #64748B; margin-bottom: 24px; }
.go-shopping-btn { display: flex; align-items: center; gap: 8px; padding: 10px 24px; background: linear-gradient(135deg, #3B82F6, #2563EB); border: none; border-radius: 100px; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; }

.list-move, .list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: scale(0.9); }
.list-leave-active { position: absolute; }
</style>