<template>
  <div class="mobile-order-page">
    <!-- Header -->
    <MobileSubPageHeader title="我的订单" />

    <!-- Tabs -->
    <div class="tabs-wrapper">
       <div class="tabs-scroll">
          <div 
            v-for="tab in tabs" 
            :key="tab.value" 
            class="tab-pill"
            :class="{ active: currentTab === tab.value }"
            @click="switchTab(tab.value)"
          >
             {{ tab.label }}
          </div>
       </div>
    </div>

    <!-- Order List -->
    <div class="list-container">
        
        <MobileInfiniteList 
            :loading="loading" 
            :finished="finished" 
            :list="displayList" 
            @load="loadMore"
        >
            <template #empty>
                 <div class="empty-state">
                    <div class="empty-icon-wrapper">
                        <el-icon class="empty-icon"><Box /></el-icon>
                    </div>
                    <p class="empty-text">暂无相关订单</p>
                    <button class="go-shopping-btn" @click="router.push('/')">前往选购</button>
                </div>
            </template>

            <!-- List Content -->
             <div class="order-list">
                 <MobileOrderCard
                   v-for="item in displayList"
                   :key="item.id"
                   :order="item"
                   @click="handleItemClick(item)"
                 >
                    <template #actions="{ order }">
                        <template v-if="order.isPending || order.status === 'pending'">
                             <button class="action-btn delete" @click.stop="openConfirmModal(order, true)">
                                 取消
                             </button>
                             <button class="action-btn pay" @click.stop="handleItemClick(order)">去支付</button>
                        </template>
                        <template v-else-if="['expired', 'refunded', 'cancelled'].includes(order.status)">
                              <button class="action-btn delete" @click.stop="openConfirmModal(order, false)">删除</button>
                        </template>
                        <template v-else>
                              <button class="action-btn view" @click.stop="handleItemClick(order)">详情</button>
                        </template>
                    </template>
                 </MobileOrderCard>
             </div>

        </MobileInfiniteList>
    </div>

    <!-- Confirm Modal -->
    <Teleport to="body">
        <div v-if="confirmModalVisible" class="modal-overlay" @click="confirmModalVisible = false">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <el-icon class="warning-icon"><WarningFilled /></el-icon>
                    <span>{{ confirmModalType === 'pending' ? '取消订单' : '删除记录' }}</span>
                </div>
                <div class="modal-body">
                    {{ confirmModalMessage }}
                </div>
                <div class="modal-footer">
                    <button class="modal-btn cancel" @click="confirmModalVisible = false">我不取消</button>
                    <button class="modal-btn confirm" @click="handleConfirmDelete" :disabled="confirmLoading">
                        {{ confirmLoading ? '处理中...' : '确认取消' }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'
import MobileInfiniteList from '@/components/mobile/list/MobileInfiniteList.vue'
import MobileOrderCard from '@/components/mobile/profile/MobileOrderCard.vue'
import { useOrderList } from '@/composables/client/useOrderList'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import { useToast } from '@/composables/mobile/useToast'
import { Box, WarningFilled } from '@element-plus/icons-vue'

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

.mobile-order-page {
    min-height: 100vh;
    display: flex; flex-direction: column;
    background: #020617; /* Very Dark BG */
    padding-bottom: 40px;
}

/* Tabs */
.tabs-wrapper {
    background: rgba(2, 6, 23, 0.8);
    backdrop-filter: blur(12px);
    position: sticky; top: 70px; z-index: 40;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    padding: 10px 0;
}
.tabs-scroll {
    display: flex; overflow-x: auto; padding: 0 16px; gap: 10px;
}
.tabs-scroll::-webkit-scrollbar { display: none; }

.tab-pill {
    padding: 6px 16px;
    background: rgba(255,255,255,0.03);
    border-radius: 99px; font-size: 14px; color: #64748B;
    transition: all 0.2s;
    border: 1px solid rgba(255,255,255,0.05);
    white-space: nowrap;
}
.tab-pill.active {
    background: #1E293B; 
    color: #F8FAFC; font-weight: 600;
    border-color: rgba(255,255,255,0.1);
}

/* List Container */
.list-container { flex: 1; padding: 16px; }

/* Empty & Loading */
.empty-state {
    padding: 60px 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.empty-icon-wrapper {
    width: 64px; height: 64px; background: rgba(255,255,255,0.03); border-radius: 50%;
    display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
}
.empty-icon { font-size: 28px; color: #475569; }
.empty-text { font-size: 14px; color: #64748B; margin-bottom: 24px; }

.go-shopping-btn {
    background: linear-gradient(90deg, #3B82F6, #2563EB); border: none; color: #fff;
    padding: 10px 40px; border-radius: 99px; font-size: 14px; font-weight: 600;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.order-list { display: flex; flex-direction: column; gap: 16px; }

/* Action Buttons */
.action-btn {
    padding: 6px 16px; border-radius: 99px; font-size: 12px; font-weight: 500;
    border: 1px solid transparent; background: transparent; transition: all 0.2s;
}
.action-btn.pay { 
    background: linear-gradient(90deg, #FF6B00, #FF2E00);
    color: #fff; box-shadow: 0 2px 10px rgba(255, 46, 0, 0.2);
}
.action-btn.delete { 
    color: #94A3B8; border-color: rgba(255,255,255,0.1);
}
.action-btn.view { 
    color: #E2E8F0; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.05);
}

/* Modal Styles */
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);
    z-index: 2000; display: flex; align-items: center; justify-content: center;
    padding: 30px; animation: fadeIn 0.2s ease;
}
.modal-content {
    background: #1E293B; width: 100%; max-width: 300px;
    border-radius: 20px; padding: 24px;
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.modal-header {
    display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
    font-size: 16px; font-weight: 600; color: #fff;
}
.warning-icon { color: #F59E0B; font-size: 20px; }

.modal-body {
    font-size: 14px; color: #94A3B8; line-height: 1.5; margin-bottom: 24px;
}

.modal-footer { display: flex; gap: 12px; }
.modal-btn {
    flex: 1; padding: 10px; border-radius: 10px; font-size: 14px; font-weight: 600; border: none;
}
.modal-btn.cancel { background: rgba(255,255,255,0.05); color: #94A3B8; }
.modal-btn.confirm { 
    background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover)); 
    color: #fff; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3); 
}
</style>
