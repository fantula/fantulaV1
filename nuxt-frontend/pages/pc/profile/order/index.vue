<template>
  <div class="orders-page">
    <!-- Header -->
    <div class="section-header">
      <h2 class="section-title">我的订单</h2>
      <div class="section-subtitle">Order History</div>
    </div>

    <!-- Tabs (Premium Glass Pill Style) -->
    <div class="order-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.value"
        :class="['tab-item', { active: currentTab === tab.value }]"
        @click="switchTab(tab.value)"
      >
        <span>{{ tab.label }}</span>
        <!-- Glow Indicator -->
        <div class="active-glow" v-if="currentTab === tab.value"></div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="orders-scroll-area">
      <div class="orders-container">
        
        <BaseInfiniteList 
            :loading="loading" 
            :finished="finished"
            :error="error" 
            @load="loadMore"
            :offset="200"
        >
          <!-- Loading (Initial) -->
          <template #loading>
              <div v-if="displayList.length === 0 && loading" class="loading-state">
                <div class="glass-loader"></div>
                <p>正在加载订单...</p>
              </div>
          </template>

          <!-- Empty -->
          <div v-if="displayList.length === 0 && !loading" class="empty-state">
            <div class="empty-icon-wrapper">
              <el-icon class="empty-icon"><Box /></el-icon>
            </div>
            <div class="empty-text">暂无{{ getCurrentTabLabel() }}记录</div>
            <button class="go-shopping-btn" @click="router.push('/')">前往选购</button>
          </div>
          
          <!-- List -->
          <div v-else class="order-list">
            <transition-group name="list">
              <div 
                v-for="item in displayList" 
                :key="item.id" 
                class="order-card"
                :class="['status-' + (item.isPending ? 'pending' : item.status)]"
                @click="handleItemClick(item)"
              >
                <!-- Card Status Line (Left Border) -->
                <div class="status-line"></div>

                <!-- Card Content -->
                <div class="card-inner">
                  <!-- Top Row: No & Status -->
                  <div class="card-header">
                    <div class="order-no-group">
                      <span class="label">NO.</span>
                      <span class="value">{{ item.order_no }}</span>
                    </div>
                    
                    <!-- Premium Status Pill -->
                    <div class="status-pill" :class="item.isPending ? 'pending' : item.status">
                      <div class="dot"></div>
                      <span>{{ item.isPending ? '待支付' : getStatusText(item.status) }}</span>
                    </div>
                  </div>

                  <!-- Main Row: Image & Info -->
                  <div class="card-body">
                    <div class="product-thumb">
                      <img v-if="item.product_image" :src="item.product_image" class="thumb-img" />
                      <div v-else class="placeholder-img"><el-icon><Picture /></el-icon></div>
                    </div>

                    <div class="product-info">
                      <div class="name-row">
                        <h3 class="product-name">{{ item.product_name }}</h3>
                        <span class="spec-tag">{{ item.spec_text || '标准规格' }}</span>
                      </div>
                      
                      <div class="price-row">
                        <div class="price">
                          <span class="amount">{{ Number(item.total_amount).toFixed(2) }}</span>
                          <span class="unit">点</span>
                        </div>
                        <div class="qty">x{{ item.quantity }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Card Footer: Time & Actions -->
                  <div class="card-footer">
                    <div class="order-time">{{ formatTime(item.created_at) }}</div>
                    
                    <!-- Actions -->
                    <div class="card-actions">
                      <!-- 待支付: 删除/去支付 -->
                      <template v-if="item.isPending || item.status === 'pending'">
                          <button class="action-btn delete" @click.stop="openConfirmModal(item, true)">
                            <el-icon><Delete /></el-icon>
                          </button>
                          <button class="action-btn pay" @click.stop="handleItemClick(item)">去支付</button>
                      </template>

                      <!-- 无效订单: 清理按钮 -->
                      <template v-else-if="['expired', 'refunded', 'cancelled'].includes(item.status)">
                          <button class="action-btn cleanup" @click.stop="openConfirmModal(item, false)">
                            <el-icon><Delete /></el-icon> 清理记录
                          </button>
                      </template>

                      <!-- 有效订单: 查看详情 -->
                      <template v-else>
                          <button class="action-btn view">查看详情 <el-icon><ArrowRight /></el-icon></button>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </BaseInfiniteList>

      </div>
    </div>

    <!-- Cleanup Confirmation Modal (BaseModal) -->
    <BaseModal
      v-model:visible="confirmModalVisible"
      :title="confirmModalType === 'pending' ? '取消订单' : '清理记录'"
      width="400px"
      confirmText="确认删除"
      confirm-type="danger"
      :loading="confirmLoading"
      show-mascot
      @confirm="handleConfirmDelete"
    >
      <div class="confirm-content">
        <div class="confirm-icon">
          <el-icon><Warning /></el-icon>
        </div>
        <p class="confirm-text">{{ confirmModalMessage }}</p>
      </div>
    </BaseModal>

  </div>
</template>

<script setup lang="ts">
/**
 * 我的订单页面 (Premium Refactor)
 * 2026-01-21: 视觉升级 & 无效订单拦截逻辑
 * 2026-01-26: 集成 useInfiniteScroll (Client Mode)
 * 优化: 使用 BaseModal 替代 ElMessageBox，限制最大宽度
 */
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Box, Picture, Delete, ArrowRight, Warning } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useOrderList } from '@/composables/client/useOrderList'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import BaseModal from '@/components/shared/BaseModal.vue'

definePageMeta({
  layout: 'pc', ssr: false })

const router = useRouter()

const {
  loading: listLoading, // Rename because useInfiniteScroll has 'loading'
  filteredList,
  currentTab,
  tabs,
  loadList,
  changeTab,
  deletePreOrder,
  formatSpec,
  getCurrentTabLabel,
  formatDate,
  getOrderStatusLabel
} = useOrderList()

// === Infinite Scroll Logic (Client Mode) ===

// 1. Initialize Composable
// The source data is 'filteredList' from useOrderList composable
const { displayList, loading, finished, error, loadMore, reset } = useInfiniteScroll<any>({
    data: filteredList,
    pageSize: 10
})

// 2. Integration
onMounted(async () => {
  // Let legacy composable fetch data first
  await loadList()
  // Data update will trigger filteredList change, which triggers composable watch -> reset -> load first page
})

const switchTab = (tabValue: string) => {
    changeTab(tabValue)
    // Composable should auto-reset because filteredList changes
}

// --- Methods ---
const getStatusText = (status: string) => getOrderStatusLabel(status)
const formatTime = (time: string) => formatDate(time)

// 核心跳转逻辑 (Smart Intercept)
const handleItemClick = (item: any) => {
  // 1. 待支付 -> 结账页
  if (item.status === 'pending' || item.isPending) {
    router.push(`/checkout/${item.id}`)
    return
  }

  // 2. 无效订单 (已过期/已退款/已取消) -> 拦截 -> 询问是否删除
  const invalidStatuses = ['expired', 'refunded', 'cancelled']
  if (invalidStatuses.includes(item.status)) {
    openConfirmModal(item, false)
    return
  }

  // 3. 有效订单 -> 详情页
  router.push(`/profile/order/${item.id}`)
}

// --- Modal Logic ---
const confirmModalVisible = ref(false)
const confirmLoading = ref(false)
const confirmModalType = ref<'pending' | 'cleanup'>('cleanup')
const confirmTargetItem = ref<any>(null)

const confirmModalMessage = computed(() => {
  return confirmModalType.value === 'pending'
    ? '确定要取消这个订单吗？取消后将释放锁定库存。'
    : '该订单已无效(过期或退款)，确认要从列表中移除吗？'
})

// 打开确认框
const openConfirmModal = (item: any, isPreOrder: boolean) => {
  confirmTargetItem.value = item
  confirmModalType.value = isPreOrder ? 'pending' : 'cleanup'
  confirmModalVisible.value = true
}

// 确认删除
const handleConfirmDelete = async () => {
  if (!confirmTargetItem.value) return
  
  confirmLoading.value = true
  try {
    if (confirmModalType.value === 'pending') {
      const success = await deletePreOrder(confirmTargetItem.value.id)
      if (success) {
        ElMessage.success('订单已取消')
        confirmModalVisible.value = false
        // Data update done in useOrderList, filteredList updates, composable auto-updates
      } else {
        ElMessage.error('操作失败')
      }
    } else {
      // 模拟历史订单删除
      // TODO: Call API
      setTimeout(() => {
         ElMessage.success('记录已清理')
         confirmModalVisible.value = false
         // 前端临时移除效果 (需重新加载列表刷新)
         loadList() 
      }, 500)
    }
  } catch (e) {
    console.error(e)
  } finally {
    confirmLoading.value = false
  }
}
</script>

<style scoped>
.orders-page {
  display: flex; flex-direction: column; height: 100%;
  font-family: 'Outfit', sans-serif; color: #F8FAFC;
}

/* Header */
.section-header {
  flex-shrink: 0; padding: 24px 32px 16px; display: flex; align-items: baseline; gap: 12px;
}
.section-title { font-size: 20px; font-weight: 700; color: #fff; margin: 0; }
.section-subtitle { font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; }

/* Tabs (Premium Pill) */
.order-tabs {
  flex-shrink: 0; display: flex; gap: 12px; padding: 0 32px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.tab-item {
  position: relative; padding: 8px 16px; border-radius: 100px;
  color: #64748B; font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.3s;
}
.tab-item:hover { color: #94A3B8; background: rgba(255,255,255,0.03); }
.tab-item.active { color: #fff; font-weight: 600; background: rgba(255,255,255,0.05); }
.active-glow {
  position: absolute; inset: 0; border-radius: 100px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Scroll Area & Container Limit - WIDE */
.orders-scroll-area { flex: 1; overflow-y: auto; padding: 24px 32px; }
.orders-container { max-width: 900px; margin: 0 auto; }

/* List */
.order-list { display: flex; flex-direction: column; gap: 12px; padding-bottom: 40px; }

/* Premium Order Card (Aggressive Compact) */
.order-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  position: relative; overflow: hidden;
  cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-height: 100px;
}
.order-card:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -8px rgba(0,0,0,0.5);
  border-color: rgba(255,255,255,0.1);
}

/* Status Line (Left Border) */
.status-line {
  position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
  background: #64748B; opacity: 0.8;
}

/* Card Content - COMPACT PADDING */
.card-inner { 
  padding: 16px 20px; padding-left: 28px; /* Extra left for status line separation */
  display: flex; flex-direction: column; gap: 0; 
}

/* Header */
.card-header { 
  display: flex; justify-content: space-between; align-items: center; 
  margin-bottom: 12px;
}
.order-no-group { display: flex; gap: 6px; font-family: 'Monaco', monospace; font-size: 13px; color: #64748B; }
.order-no-group .value { color: #94A3B8; }

/* Status Pill */
.status-pill {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 100px;
  font-size: 12px; font-weight: 700;
  background: rgba(255,255,255,0.05); color: #94A3B8;
  letter-spacing: 0.5px;
}
.status-pill .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 6px currentColor; }

/* Body - COMPACT */
.card-body { display: flex; gap: 16px; align-items: center; }
.product-thumb {
  width: 56px; height: 56px; border-radius: 12px; background: rgba(0,0,0,0.3); overflow: hidden; border: 1px solid rgba(255,255,255,0.05); flex-shrink: 0;
}
.thumb-img { width: 100%; height: 100%; object-fit: cover; }
.placeholder-img { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #334155; }

.product-info { flex: 1; display: flex; flex-direction: column; gap: 2px; justify-content: center; } /* Gap reduced */

/* INLINE NAME & SPEC */
.name-row {
  display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
}
.product-name { font-size: 15px; font-weight: 600; color: #fff; margin: 0; line-height: 1.4; }

.spec-tag {
  font-size: 11px; font-weight: 500; color: #94A3B8;
  background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.05);
}

.price-row { display: flex; align-items: baseline; gap: 10px; margin-top: 2px; }
.price { display: flex; align-items: baseline; gap: 2px; }
.price .amount { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.5px; font-family: 'Outfit', sans-serif; }
.price .unit { font-size: 12px; color: #F59E0B; font-weight: 600; }
.qty { font-size: 12px; color: #64748B; font-weight: 500; }

/* Footer - TIGHTER */
.card-footer {
  display: flex; justify-content: space-between; align-items: center; 
  margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.05);
}
.order-time { font-size: 12px; color: #475569; }

.card-actions { display: flex; gap: 10px; }
.action-btn {
  padding: 6px 14px; border-radius: 10px; border: 1px solid transparent;
  font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.03); color: #94A3B8; transition: all 0.2s;
  border: 1px solid rgba(255,255,255,0.05);
}
.action-btn:hover { background: rgba(255,255,255,0.08); color: #fff; border-color: rgba(255,255,255,0.1); transform: translateY(-1px); }

/* Swipe Pay Button */
.action-btn.pay {
  background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
  color: #fff; border: none; padding: 6px 18px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
}
.action-btn.pay:hover { 
  background: linear-gradient(135deg, #EA580C 0%, #F97316 100%);
  box-shadow: 0 6px 15px rgba(249, 115, 22, 0.35);
  transform: translateY(-1px);
}

.action-btn.delete { color: #64748B; padding: 6px 10px; }
.action-btn.delete:hover { color: #EF4444; background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); }

.action-btn.cleanup { color: #64748B; padding: 6px 12px; }
.action-btn.cleanup:hover { color: #F87171; background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2); }

/* --- Status Colors (Generated by class) --- */
/* Pending */
.order-card.status-pending .status-line { background: #F97316; box-shadow: 0 0 10px rgba(249, 115, 22, 0.4); }
.status-pill.pending { color: #F97316; background: rgba(249, 115, 22, 0.1); border: 1px solid rgba(249, 115, 22, 0.2); }

/* Pending Delivery */
.order-card.status-pending_delivery .status-line { background: #3B82F6; box-shadow: 0 0 10px rgba(59, 130, 246, 0.4); }
.status-pill.pending_delivery { color: #3B82F6; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); }

/* Active */
.order-card.status-active .status-line { background: #22C55E; box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
.status-pill.active { color: #22C55E; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); }

/* Refunding */
.order-card.status-refunding .status-line { background: #EAB308; }
.status-pill.refunding { color: #EAB308; background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.2); }

/* Expired/Refunded */
.order-card.status-expired .status-line, .order-card.status-refunded .status-line, .order-card.status-cancelled .status-line { background: #475569; }
.order-card.status-expired, .order-card.status-refunded { opacity: 0.7; }
.order-card.status-expired:hover, .order-card.status-refunded:hover { opacity: 1; }

/* Empty/Loading */
.loading-state, .empty-state {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #64748B; min-height: 400px;
}
.glass-loader { width: 32px; height: 32px; border: 3px solid rgba(255,255,255,0.1); border-top-color: #3B82F6; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 20px; }
@keyframes spin { to { transform: rotate(360deg); } }
.empty-icon-wrapper {
  width: 80px; height: 80px; background: rgba(255, 255, 255, 0.03); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
}
.empty-icon { font-size: 32px; opacity: 0.4; }
.go-shopping-btn {
  margin-top: 24px; background: linear-gradient(135deg, #3B82F6, #2563eb); border: none; color: #fff; padding: 10px 28px; border-radius: 100px; cursor: pointer; font-weight: 600;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); transition: all 0.2s;
}
.go-shopping-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4); }

/* Confirm Content */
.confirm-content { display: flex; align-items: center; gap: 16px; padding: 12px 0; }
.confirm-icon { 
  width: 48px; height: 48px; border-radius: 50%; background: rgba(239, 68, 68, 0.1); color: #EF4444; 
  display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;
}
.confirm-text { color: #E2E8F0; font-size: 15px; line-height: 1.5; margin: 0; }
</style>