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
        <!-- Loading State -->
        <div v-if="loading && displayList.length === 0" class="loading-state">
            <div class="spinner"></div>
            <span>正在加载订单...</span>
        </div>

        <!-- Empty State -->
        <div v-else-if="displayList.length === 0" class="empty-state">
            <div class="empty-icon-wrapper">
                <el-icon class="empty-icon"><Box /></el-icon>
            </div>
            <p class="empty-text">暂无相关订单</p>
            <button class="go-shopping-btn" @click="router.push('/')">前往选购</button>
        </div>

        <!-- List -->
        <div v-else class="order-list">
             <MobileOrderCard
               v-for="item in displayList"
               :key="item.id"
               :order="item"
               @click="handleItemClick(item)"
             >
                <template #actions="{ order }">
                    <template v-if="order.isPending || order.status === 'pending'">
                         <button class="btn delete" @click.stop="openConfirmModal(order, true)">
                             <el-icon><Delete /></el-icon>
                         </button>
                         <button class="btn pay" @click.stop="handleItemClick(order)">去支付</button>
                    </template>
                    <template v-else-if="['expired', 'refunded', 'cancelled'].includes(order.status)">
                          <button class="btn delete" @click.stop="openConfirmModal(order, false)">清理记录</button>
                    </template>
                    <template v-else>
                          <button class="btn view" @click.stop="handleItemClick(order)">查看详情</button>
                    </template>
                </template>
             </MobileOrderCard>

             <!-- Load More Trigger -->
             <div v-if="!finished" class="load-more" @click="loadMore">
                {{ loading ? '加载中...' : '点击加载更多' }}
             </div>
             <div v-if="finished" class="no-more">--- 到底了 ---</div>
        </div>
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
import MobileOrderCard from '@/components/mobile/profile/MobileOrderCard.vue'
import { useToast } from '@/composables/mobile/useToast'

definePageMeta({ layout: 'mobile', ssr: false, middleware: 'client-auth' })

const router = useRouter()
const route = useRoute()

const {
  filteredList, currentTab, tabs, loadList, changeTab,
  deletePreOrder
} = useOrderList()

const { displayList, loading, finished, loadMore, reset } = useInfiniteScroll<any>({
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
        // Assume checkout route exists or navigate to generic order detail
        // Checking Mobile Order Detail implementation plan, it is /mobile/profile/order/[id]
        // But for pending payment, usually it goes to a cashier. 
        // For now, let's keep it consistent.
        router.push(`/mobile/checkout/${item.id}`) 
    } else {
        router.push(`/mobile/profile/order/${item.id}`)
    }
}

// Modal Logic
const confirmModalVisible = ref(false)
const confirmLoading = ref(false)
const confirmModalType = ref<'pending' | 'cleanup'>('cleanup')
const confirmTargetItem = ref<any>(null)
const { showToast } = useToast()

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
                showToast('订单已取消', 'success')
                confirmModalVisible.value = false
            } else showToast('操作失败', 'error')
        } else {
            // Mock cleanup
            setTimeout(() => {
                showToast('记录已清理', 'success')
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

/* List Status Indicators */
.load-more, .no-more {
    text-align: center; color: #64748B; font-size: 12px; padding: 10px;
}

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
