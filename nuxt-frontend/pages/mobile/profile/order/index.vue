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
                Loading...
             </div>
          </template>

          <div v-if="displayList.length === 0 && !loading" class="empty-state">
             <el-icon class="empty-icon"><Box /></el-icon>
             <p>暂无相关订单</p>
          </div>

          <div v-else class="order-list">
             <div 
               v-for="item in displayList" 
               :key="item.id" 
               class="mobile-order-card"
               @click="handleItemClick(item)"
             >
                <!-- Card Header -->
                <div class="card-header">
                   <span class="order-no">No. {{ item.order_no.slice(-8) }}</span>
                   <span class="status-text" :class="item.isPending ? 'pending' : item.status">
                      {{ item.isPending ? '待支付' : getOrderStatusLabel(item.status) }}
                   </span>
                </div>

                <!-- Card Body -->
                <div class="card-body">
                   <div class="thumb">
                      <img :src="item.product_image || '/images/placeholder.png'" />
                   </div>
                   <div class="info">
                      <div class="name">{{ item.product_name }}</div>
                      <div class="spec">{{ item.spec_text || '标准规格' }}</div>
                      <div class="price-row">
                         <span class="price">{{ Number(item.total_amount).toFixed(2) }}</span>
                         <span class="unit">点</span>
                         <span class="qty">x{{ item.quantity }}</span>
                      </div>
                   </div>
                </div>

                <!-- Card Footer -->
                <div class="card-footer">
                   <div class="time">{{ formatDate(item.created_at) }}</div>
                   <div class="actions">
                      <template v-if="item.isPending || item.status === 'pending'">
                         <button class="btn delete" @click.stop="openConfirmModal(item, true)">删除</button>
                         <button class="btn pay" @click.stop="handleItemClick(item)">去支付</button>
                      </template>
                      <template v-else-if="['expired', 'refunded', 'cancelled'].includes(item.status)">
                          <button class="btn delete" @click.stop="openConfirmModal(item, false)">清理</button>
                      </template>
                      <template v-else>
                          <button class="btn view">详情</button>
                      </template>
                   </div>
                </div>
             </div>
          </div>
        </BaseInfiniteList>
    </div>

    <!-- Confirm Modal (Simple Mobile Version) -->
    <div v-if="confirmModalVisible" class="modal-mask" @click="confirmModalVisible = false">
        <div class="modal-box" @click.stop>
            <div class="m-title">{{ confirmModalType === 'pending' ? '取消订单' : '清理记录' }}</div>
            <div class="m-content">{{ confirmModalMessage }}</div>
            <div class="m-actions">
                <button class="m-btn cancel" @click="confirmModalVisible = false">取消</button>
                <button class="m-btn confirm" @click="handleConfirmDelete" :disabled="confirmLoading">
                    {{ confirmLoading ? '处理中...' : '确认' }}
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Box } from '@element-plus/icons-vue'
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
        // Mobile Checkout (Assuming /mobile/checkout exists, or reuse PC checkout adapted)
        // For now, redirect to PC checkout or show message if mobile checkout not ready
        // But requested to reuse logic, ideally responsive checkout.
        // Let's assume /checkout/[id] is responsive or we make it responsive later.
        router.push(`/checkout/${item.id}`) 
    } else {
        // Detail page (to be implemented or just show toast)
        // router.push(`/mobile/profile/order/${item.id}`)
    }
}

// Modal Logic
const confirmModalVisible = ref(false)
const confirmLoading = ref(false)
const confirmModalType = ref<'pending' | 'cleanup'>('cleanup')
const confirmTargetItem = ref<any>(null)

const confirmModalMessage = computed(() => 
  confirmModalType.value === 'pending' ? '确定要取消这个订单吗？' : '确认移除该记录吗？'
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
                ElMessage.success('已取消')
                confirmModalVisible.value = false
            } else ElMessage.error('失败')
        } else {
            // Mock cleanup
            setTimeout(() => {
                ElMessage.success('已清理')
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
}

.page-header {
    height: 50px; display: flex; align-items: center; justify-content: space-between;
    padding: 0 16px; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px);
    position: sticky; top: 0; z-index: 100;
}
.back-btn { color: #fff; font-size: 20px; }
.title { color: #fff; font-weight: 700; font-size: 17px; }
.placeholder { width: 20px; }

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
}

/* List */
.list-container { flex: 1; padding: 12px; }
.empty-state, .loading-state {
    padding: 40px; text-align: center; color: #64748B; font-size: 14px;
}
.empty-icon { font-size: 40px; margin-bottom: 10px; opacity: 0.5; }

.order-list { display: flex; flex-direction: column; gap: 12px; }

/* Card */
.mobile-order-card {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px;
    padding: 12px;
}

.card-header {
    display: flex; justify-content: space-between; margin-bottom: 12px;
    font-size: 12px;
}
.order-no { color: #64748B; font-family: 'Monaco', monospace; }
.status-text { color: #94A3B8; font-weight: 600; }
.status-text.pending { color: #F97316; }

.card-body { display: flex; gap: 12px; margin-bottom: 12px; }
.thumb {
    width: 60px; height: 60px; border-radius: 8px; overflow: hidden; background: #1E293B;
}
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.info { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.name { color: #fff; font-size: 14px; font-weight: 500; margin-bottom: 4px; line-height: 1.3; }
.spec { color: #64748B; font-size: 11px; margin-bottom: 4px; }
.price-row { display: flex; align-items: baseline; gap: 4px; }
.price { color: #fff; font-size: 16px; font-weight: 700; }
.unit { color: #F59E0B; font-size: 11px; }
.qty { color: #64748B; font-size: 12px; margin-left: auto; }

.card-footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;
}
.time { font-size: 11px; color: #475569; }
.actions { display: flex; gap: 8px; }
.btn {
    padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 500;
    border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #94A3B8;
}
.btn.pay { background: linear-gradient(135deg, #F97316, #EA580C); color: #fff; border: none; }
.btn.delete { color: #EF4444; border-color: rgba(239,68,68,0.3); }

/* Confirm Modal */
.modal-mask {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 2000;
    display: flex; align-items: center; justify-content: center;
}
.modal-box {
    width: 80%; background: #1E293B; border-radius: 16px; padding: 20px;
    border: 1px solid rgba(255,255,255,0.1);
}
.m-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 12px; text-align: center; }
.m-content { font-size: 14px; color: #CBD5E1; text-align: center; margin-bottom: 20px; }
.m-actions { display: flex; gap: 12px; }
.m-btn { flex: 1; padding: 10px; border-radius: 8px; font-size: 14px; border: none; }
.m-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
.m-btn.confirm { background: #3B82F6; color: #fff; }
</style>
