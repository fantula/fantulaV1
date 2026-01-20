<template>
  <div class="orders-page">
    <!-- Header -->
    <div class="section-header">
      <h2 class="section-title">我的订单</h2>
      <div class="section-subtitle">Order History</div>
    </div>

    <!-- Tabs -->
    <div class="order-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.value"
        :class="['tab-item', { active: currentTab === tab.value }]"
        @click="currentTab = tab.value"
      >
        {{ tab.label }}
        <div class="active-indicator" v-if="currentTab === tab.value"></div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="orders-scroll-area">
      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="glass-loader"></div>
        <p>正在加载订单...</p>
      </div>

      <!-- Empty -->
      <div v-else-if="filteredList.length === 0" class="empty-state">
        <div class="empty-icon-wrapper">
          <el-icon class="empty-icon"><Box /></el-icon>
        </div>
        <div class="empty-text">暂无{{ getCurrentTabLabel() }}记录</div>
        <button class="go-shopping-btn" @click="router.push('/')">前往选购</button>
      </div>
      
      <!-- List -->
      <div v-else class="order-list">
        <div class="order-item" v-for="item in filteredList" :key="item.id" @click="handleItemClick(item)">
          <!-- Header -->
          <div class="order-header">
            <div class="order-no">
              <span class="no-label">订单号</span> 
              <span class="no-val">{{ item.order_no }}</span>
            </div>
            <div class="order-status" :class="item.status">
              {{ getStatusText(item.status) }}
            </div>
          </div>
          
          <!-- Content -->
          <div class="order-content">
            <div class="order-image-box">
              <img v-if="item.product_image" :src="item.product_image" class="product-img" />
              <div v-else class="placeholder-img"><el-icon><Picture /></el-icon></div>
            </div>
            
            <div class="order-info">
              <div class="order-title">{{ item.product_name }}</div>
              <div class="order-spec" v-if="item.spec_text">{{ item.spec_text }}</div>
              <div class="order-meta">
                <span class="order-amount">￥{{ item.total_amount }}</span>
                <span class="order-qty">x{{ item.quantity }}</span>
              </div>
              <div class="order-time">{{ formatTime(item.created_at) }}</div>
            </div>
            
            <!-- 删除按钮（仅待支付订单显示） -->
            <div v-if="item.status === 'pending'" class="order-actions" @click.stop>
              <button class="delete-btn" @click="handleDeletePreOrder(item)">
                <el-icon><Delete /></el-icon>
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 我的订单页面
 * 重构版 - 使用 clientOrderApi 和 useOrderList composable
 * 遵循 CLIENT_DEVELOPMENT_GUIDE.md 规范
 */
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Box, Picture, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useOrderList } from '@/composables/client/useOrderList'

definePageMeta({ ssr: false })

const router = useRouter()

// 使用 composable 获取订单数据和方法
const {
  loading,
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

// --- Lifecycle ---
onMounted(() => {
  loadList()
})

// --- Methods ---
const getStatusText = (status: string) => getOrderStatusLabel(status)

const formatTime = (time: string) => formatDate(time)

const handleItemClick = (item: any) => {
  if (item.status === 'pending' || item.isPending) {
    router.push(`/checkout/${item.id}`)
  } else {
    router.push(`/profile/order/${item.id}`)
  }
}

// 删除预订单
const handleDeletePreOrder = async (item: any) => {
  try {
    await ElMessageBox.confirm(
      '删除后将释放锁定的资源，确定要删除这个待支付订单吗？',
      '确认删除',
      { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
    )
    
    const success = await deletePreOrder(item.id)
    if (success) {
      ElMessage.success('订单已删除')
    } else {
      ElMessage.error('删除失败')
    }
  } catch {
    // 用户取消
  }
}
</script>

<style scoped>
.orders-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Inter', sans-serif;
  color: #F8FAFC;
}

/* Header */
.section-header {
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  padding: 24px 32px 16px;
  gap: 12px;
}
.section-title { font-size: 20px; font-weight: 700; margin: 0; }
.section-subtitle { font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; }

/* Tabs */
.order-tabs {
  flex-shrink: 0;
  display: flex;
  gap: 24px;
  padding: 0 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.tab-item {
  padding: 12px 0;
  color: #64748B;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  transition: all 0.2s;
}
.tab-item:hover { color: #94A3B8; }
.tab-item.active { color: #fff; font-weight: 600; }
.active-indicator {
  position: absolute;
  bottom: 0; left: 0; width: 100%; height: 2px;
  background: #3B82F6;
}

/* Scroll Area */
.orders-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
}

/* List */
.order-list { display: flex; flex-direction: column; gap: 16px; }

.order-item {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}
.order-item:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
}

.order-header {
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-no { font-size: 12px; color: #64748B; }
.order-no .no-val { color: #94A3B8; font-family: monospace; }

.order-status {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}
.order-status.pending { color: #F97316; background: rgba(249, 115, 22, 0.1); }
.order-status.pending_delivery { color: #3B82F6; background: rgba(59, 130, 246, 0.1); }
.order-status.active { color: #22C55E; background: rgba(34, 197, 94, 0.1); }
.order-status.expired, .order-status.completed { color: #94A3B8; background: rgba(148, 163, 184, 0.1); }

/* Content */
.order-content {
  padding: 16px;
  display: flex;
  gap: 16px;
}
.order-image-box {
  width: 72px; height: 72px;
  border-radius: 8px;
  overflow: hidden;
  background: #0F172A;
  flex-shrink: 0;
}
.product-img { width: 100%; height: 100%; object-fit: cover; }
.placeholder-img { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #334155; font-size: 24px; }

.order-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.order-title { font-size: 14px; font-weight: 500; color: #E2E8F0; }
.order-spec { font-size: 12px; color: #64748B; }
.order-meta { display: flex; align-items: center; gap: 12px; margin-top: 4px; }
.order-amount { font-size: 15px; font-weight: 600; color: #fff; }
.order-qty { font-size: 13px; color: #64748B; }
.order-time { font-size: 12px; color: #475569; margin-top: auto; }

/* Empty/Loading */
.loading-state, .empty-state {
  height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #64748B;
}
.glass-loader {
  width: 24px; height: 24px; border: 2px solid rgba(255,255,255,0.1); border-top-color: #3B82F6; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 12px;
}
@keyframes spin { to { transform: rotate(360deg); } }
.empty-icon-wrapper {
  width: 64px; height: 64px; background: rgba(255, 255, 255, 0.03); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
}
.empty-icon { font-size: 24px; opacity: 0.5; }
.go-shopping-btn {
  margin-top: 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; padding: 8px 20px; border-radius: 20px; cursor: pointer; transition: all 0.2s;
}
.go-shopping-btn:hover { background: rgba(255, 255, 255, 0.1); }

/* Delete Button */
.order-actions {
  display: flex;
  align-items: center;
  padding-left: 16px;
}
.delete-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #EF4444;
  font-size: 13px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.delete-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #EF4444;
}
</style>