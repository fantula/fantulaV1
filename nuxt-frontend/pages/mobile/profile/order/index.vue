<template>
  <div class="mobile-order-page">
    <!-- Header -->
    <div class="page-header">
       <div class="back-btn" @click="router.back()">
         <el-icon><ArrowLeft /></el-icon>
       </div>
       <div class="title">我的订单</div>
       <div class="placeholder"></div>
    </div>

    <!-- Tabs -->
    <div class="tabs-wrapper">
       <div class="tabs-scroll">
          <div 
            v-for="tab in tabs" 
            :key="tab.value" 
            class="tab-item"
            :class="{ active: currentTab === tab.value }"
            @click="switchTab(tab.value)"
          >
             {{ tab.label }}
             <div class="active-line" v-if="currentTab === tab.value"></div>
          </div>
       </div>
    </div>

    <!-- Order List -->
    <div class="list-container">
        <BaseInfiniteList 
            :loading="loading" 
            :finished="finished"
            :error="error" 
            @load="loadMore"
            :offset="200"
        >
          <template #loading>
             <div v-if="displayList.length === 0 && loading" class="loading-state">
                <div class="spinner"></div>
                <span>正在加载订单...</span>
             </div>
          </template>

          <div v-if="displayList.length === 0 && !loading" class="empty-state">
             <div class="empty-icon-wrapper">
                <el-icon class="empty-icon"><Box /></el-icon>
             </div>
             <p class="empty-text">暂无相关订单</p>
             <button class="go-shopping-btn" @click="router.push('/')">前往选购</button>
          </div>

          <div v-else class="order-list">
             <div 
               v-for="item in displayList" 
               :key="item.id" 
               class="mobile-order-card"
               :class="'status-' + (item.isPending ? 'pending' : item.status)"
               @click="handleItemClick(item)"
             >
                <!-- Card Header -->
                <div class="card-header">
                   <div class="order-no-group">
                      <span class="label">NO.</span>
                      <span class="value">{{ item.order_no.slice(-8) }}</span>
                   </div>
                   <!-- Status Pill (PC Style) -->
                   <div class="status-pill" :class="item.isPending ? 'pending' : item.status">
                      <div class="dot"></div>
                      <span>{{ item.isPending ? '待支付' : getOrderStatusLabel(item.status) }}</span>
                   </div>
                </div>

                <!-- Card Body -->
                <div class="card-body">
                   <div class="thumb">
                      <el-image :src="item.product_image || '/images/placeholder.png'" fit="cover" />
                   </div>
                   <div class="info">
                      <div class="name-row">
                          <div class="name">{{ item.product_name }}</div>
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

                <!-- Card Footer -->
                <div class="card-footer">
                   <div class="time">{{ formatDate(item.created_at) }}</div>
                   <div class="actions">
                      <template v-if="item.isPending || item.status === 'pending'">
                         <button class="btn delete" @click.stop="openConfirmModal(item, true)">
                             <el-icon><Delete /></el-icon>
                         </button>
                         <button class="btn pay" @click.stop="handleItemClick(item)">去支付</button>
                      </template>
                      <template v-else-if="['expired', 'refunded', 'cancelled'].includes(item.status)">
                          <button class="btn delete" @click.stop="openConfirmModal(item, false)">清理记录</button>
                      </template>
                      <template v-else>
                          <button class="btn view" @click.stop="handleItemClick(item)">查看详情</button>
                      </template>
                   </div>
                </div>
             </div>
          </div>
        </BaseInfiniteList>
    </div>

    <!-- Confirm Modal -->
    <div v-if="confirmModalVisible" class="modal-mask" @click="confirmModalVisible = false">
        <div class="modal-box" @click.stop>
            <div class="m-icon-wrapper">
                <el-icon class="m-icon"><WarningFilled /></el-icon>
            </div>
            <div class="m-title">{{ confirmModalType === 'pending' ? '取消订单' : '清理记录' }}</div>
            <div class="m-content">{{ confirmModalMessage }}</div>
            <div class="m-actions">
                <button class="m-btn cancel" @click="confirmModalVisible = false">取消</button>
                <button class="m-btn confirm" @click="handleConfirmDelete" :disabled="confirmLoading">
                    {{ confirmLoading ? '处理中...' : '确认删除' }}
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Box, Delete, WarningFilled } from '@element-plus/icons-vue'
import { useOrderList } from '@/composables/client/useOrderList'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import { ElMessage } from 'element-plus'

definePageMeta({ layout: 'mobile', ssr: false, middleware: 'client-auth' })

const router = useRouter()
const route = useRoute()

const {
  filteredList, currentTab, tabs, loadList, changeTab,
  deletePreOrder, getOrderStatusLabel, formatDate
} = useOrderList()

const { displayList, loading, finished, error, loadMore, reset } = useInfiniteScroll<any>({
    data: filteredList, pageSize: 10
})

const switchTab = (val: string) => {
    changeTab(val)
    reset()
    router.replace({ query: { ...route.query, tab: val } })
}

onMounted(async () => {
    if (route.query.tab) changeTab(route.query.tab as string)
    await loadList()
})

// Interaction Logic
const handleItemClick = (item: any) => {
    if (item.status === 'pending' || item.isPending) {
        router.push(`/checkout/${item.id}`) 
    } else {
        router.push(`/mobile/profile/order/${item.id}`)
    }
}

// Modal Logic
const confirmModalVisible = ref(false)
const confirmLoading = ref(false)
const confirmModalType = ref<'pending' | 'cleanup'>('cleanup')
const confirmTargetItem = ref<any>(null)

const confirmModalMessage = computed(() => 
  confirmModalType.value === 'pending'
    ? '确定要取消这个订单吗？取消后将释放锁定库存。'
    : '该订单已无效(过期或退款)，确认要从列表中移除吗？'
)

const openConfirmModal = (item: any, isPreOrder: boolean) => {
    confirmTargetItem.value = item
    confirmModalType.value = isPreOrder ? 'pending' : 'cleanup'
    confirmModalVisible.value = true
}

const handleConfirmDelete = async () => {
    if (!confirmTargetItem.value) return
    confirmLoading.value = true
    try {
        if (confirmModalType.value === 'pending') {
            const success = await deletePreOrder(confirmTargetItem.value.id)
            if (success) {
                ElMessage.success('订单已取消')
                confirmModalVisible.value = false
            } else ElMessage.error('操作失败')
        } else {
            // Mock cleanup
            setTimeout(() => {
                ElMessage.success('记录已清理')
                confirmModalVisible.value = false
                loadList()
            }, 500)
        }
    } catch(e) { console.error(e) }
    finally { confirmLoading.value = false }
}
</script>

<style scoped>
.mobile-order-page {
    min-height: 100vh;
    display: flex; flex-direction: column;
    background: #0F172A; /* Global BG */
}

.page-header {
    height: 50px; display: flex; align-items: center; justify-content: space-between;
    padding: 0 16px; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px);
    position: sticky; top: 0; z-index: 100;
}
.back-btn { 
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    border-radius: 50%; background: rgba(255,255,255,0.05); color: #fff; font-size: 16px;
}
.title { color: #fff; font-weight: 700; font-size: 17px; }
.placeholder { width: 32px; }

/* Tabs */
.tabs-wrapper {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(10px);
    position: sticky; top: 50px; z-index: 99;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.tabs-scroll {
    display: flex; overflow-x: auto; padding: 0 10px;
}
.tabs-scroll::-webkit-scrollbar { display: none; }
.tab-item {
    padding: 12px 16px; color: #94A3B8; font-size: 14px; font-weight: 500;
    white-space: nowrap; position: relative;
    transition: color 0.3s;
}
.tab-item.active { color: #fff; font-weight: 700; }
.active-line {
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 20px; height: 3px; background: #3B82F6; border-radius: 2px;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* List Container */
.list-container { flex: 1; padding: 16px; }

/* Loading & Empty */
.loading-state, .empty-state {
    padding: 60px 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; color: #64748B;
}
.spinner {
    width: 24px; height: 24px; border: 2px solid rgba(255,255,255,0.1); border-top-color: #3B82F6;
    border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.empty-icon-wrapper {
    width: 64px; height: 64px; background: rgba(255,255,255,0.03); border-radius: 50%;
    display: flex; align-items: center; justify-content: center; margin-bottom: 8px;
}
.empty-icon { font-size: 28px; opacity: 0.5; }
.empty-text { font-size: 14px; margin-bottom: 16px; }

.go-shopping-btn {
    background: linear-gradient(135deg, #3B82F6, #2563eb); border: none; color: #fff;
    padding: 8px 24px; border-radius: 20px; font-size: 14px; font-weight: 600;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.order-list { display: flex; flex-direction: column; gap: 16px; }

/* Mobile Order Card */
.mobile-order-card {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 16px;
    position: relative; overflow: hidden;
}
/* Left Status Line */
.mobile-order-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #64748B; opacity: 0.6;
}
.mobile-order-card.status-pending::before { background: #F97316; }
.mobile-order-card.status-active::before { background: #22C55E; }
.mobile-order-card.status-pending_delivery::before { background: #3B82F6; }

/* Card Header */
.card-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
}
.order-no-group { font-size: 12px; font-family: 'Monaco', monospace; color: #64748B; display: flex; gap: 4px; }
.order-no-group .value { color: #94A3B8; }

.status-pill {
    display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 100px;
    background: rgba(255,255,255,0.05); color: #94A3B8; font-size: 11px; font-weight: 600;
}
.status-pill .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 5px currentColor; }
.status-pill.pending { color: #F97316; background: rgba(249, 115, 22, 0.1); }
.status-pill.active { color: #22C55E; background: rgba(34, 197, 94, 0.1); }
.status-pill.pending_delivery { color: #3B82F6; background: rgba(59, 130, 246, 0.1); }
.status-pill.refunding { color: #EAB308; background: rgba(234, 179, 8, 0.1); }

/* Card Body */
.card-body { display: flex; gap: 12px; margin-bottom: 12px; }
.thumb {
    width: 64px; height: 64px; border-radius: 8px; overflow: hidden; background: #1E293B; flex-shrink: 0;
}
.thumb .el-image { width: 100%; height: 100%; }
.info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 0; }
.name-row { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
.name { color: #fff; font-size: 14px; font-weight: 500; line-height: 1.3; }
.spec-tag {
    font-size: 10px; color: #94A3B8; background: rgba(255,255,255,0.08);
    padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.05);
}

.price-row { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 4px; }
.price { color: #fff; font-family: 'DIN Alternate'; font-weight: 700; display: flex; align-items: baseline; gap: 2px; }
.price .amount { font-size: 18px; }
.price .unit { font-size: 11px; color: #F59E0B; }
.qty { font-size: 12px; color: #64748B; }

/* Card Footer */
.card-footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px;
}
.time { font-size: 11px; color: #475569; }
.actions { display: flex; gap: 8px; }

.btn {
    padding: 6px 14px; border-radius: 14px; font-size: 12px; font-weight: 500;
    border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #94A3B8;
    display: flex; align-items: center; justify-content: center;
}
.btn.pay { 
    background: linear-gradient(135deg, #F97316, #EA580C); color: #fff; border: none; 
    box-shadow: 0 4px 10px rgba(249, 115, 22, 0.2);
}
.btn.delete { color: #64748B; padding: 6px 10px; }
.btn.view { color: #fff; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }

/* Confirm Modal */
.modal-mask {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 2000;
    display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);
}
.modal-box {
    width: 80%; max-width: 320px; background: #1E293B; border-radius: 16px; padding: 24px;
    border: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; align-items: center;
}
.m-icon-wrapper {
    width: 48px; height: 48px; border-radius: 50%; background: rgba(239, 68, 68, 0.1);
    display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
    color: #EF4444; font-size: 24px;
}
.m-title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.m-content { font-size: 14px; color: #CBD5E1; text-align: center; margin-bottom: 24px; line-height: 1.5; }
.m-actions { display: flex; gap: 12px; width: 100%; }
.m-btn { 
    flex: 1; padding: 10px; border-radius: 10px; font-size: 14px; border: none; font-weight: 600;
}
.m-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
.m-btn.confirm { background: #EF4444; color: #fff; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); }
</style>
