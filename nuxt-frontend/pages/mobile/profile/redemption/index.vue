<template>
  <div class="mobile-page">
    <div class="mobile-bg-fixed"></div>
    <MobileSubPageHeader title="兑换中心" />

    <div class="content-body">
      <!-- Input Card -->
      <div class="info-card-glass input-card">
        <div class="card-glow-bg"></div>
        <div class="card-icon">
          <el-icon><Ticket /></el-icon>
        </div>
        <div class="card-input-group">
           <div class="input-wrapper">
             <input 
              type="text" 
              v-model="redeemCode" 
              placeholder="请输入兑换码" 
              class="input-glass"
              @keyup.enter="handleRedeem"
              :disabled="redeeming"
             />
           </div>
           <button class="redeem-btn" @click="handleRedeem" :disabled="!redeemCode || redeeming">
             <div v-if="redeeming" class="spinner-sm"></div>
             <span v-else>兑换</span>
           </button>
        </div>
        <p class="tips">兑换码通常由16位字母和数字组成</p>
      </div>

      <!-- History Title -->
      <div class="section-header">
         <div class="title-left">
            <span class="icon-box"><el-icon><List /></el-icon></span>
            <span class="title-text">我的优惠券</span>
         </div>
         <span class="subtitle">点击券面可直接使用或管理</span>
      </div>

      <!-- List -->
      <div class="coupon-list">
         <BaseInfiniteList
            :loading="loading"
            :finished="finished"
            :error="error"
            @load="loadMore"
         >
            <!-- 1. Skeleton Loading -->
            <div v-if="loading && displayList.length === 0" class="list-items">
               <div v-for="i in 4" :key="i" class="info-card-glass skeleton-card" style="padding: 0; min-height: 90px; height: 90px; border-radius: 12px; display: flex; overflow: hidden; margin-bottom: 12px;">
                    <div style="width: 100%; height: 100%; background: rgba(30,41,59,0.5);">
                        <el-skeleton animated style="width: 100%; height: 100%;">
                           <template #template>
                              <div style="display: flex; height: 100%;">
                                 <!-- Left Stub -->
                                 <div style="width: 90px; display: flex; align-items: center; justify-content: center; border-right: 1px dashed rgba(255,255,255,0.1);">
                                     <el-skeleton-item variant="circle" style="width: 40px; height: 40px;" />
                                 </div>
                                 <!-- Right Info -->
                                 <div style="flex: 1; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between;">
                                     <div style="width: 100%;">
                                         <el-skeleton-item variant="h3" style="width: 50%; margin-bottom: 8px;" />
                                         <el-skeleton-item variant="text" style="width: 30%;" />
                                     </div>
                                     <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                         <el-skeleton-item variant="text" style="width: 40%;" />
                                         <el-skeleton-item variant="button" style="width: 48px; height: 20px; border-radius: 10px;" />
                                     </div>
                                 </div>
                              </div>
                           </template>
                        </el-skeleton>
                    </div>
               </div>
            </div>

            <!-- 2. Empty State -->
            <div v-else-if="displayList.length === 0" class="empty-state">
               <div class="empty-icon-box"><el-icon><Ticket /></el-icon></div>
               <p>暂无优惠券记录</p>
            </div>

            <div v-else class="list-items">
               <MobileCouponTicket 
                 v-for="item in displayList"
                 :key="item.id"
                 :type="item.coupon.type"
                 :value="item.coupon.value"
                 :title="item.coupon.name"
                 :expiryText="getExpiryText(item.coupon.end_date || undefined)"
                 :status="item.status"
                 @click="handleCouponClick(item)"
               />
            </div>
         </BaseInfiniteList>
      </div>

    </div>

    <!-- Confirm Modal -->
    <MobileConfirmModal 
        v-model:visible="showConfirm"
        :title="confirmTitle"
        :content="confirmContent"
        :confirmText="confirmBtnText"
        :type="confirmType"
        :loading="confirmLoading"
        @confirm="handleConfirmAction"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Ticket, List } from '@element-plus/icons-vue'
import { couponApi, type UserCoupon } from '@/api/client/coupon'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'
import MobileCouponTicket from '@/components/mobile/redemption/MobileCouponTicket.vue'
import MobileConfirmModal from '@/components/mobile/base/MobileConfirmModal.vue'
import { useToast } from '@/composables/mobile/useToast'
import { useUserStore } from '@/stores/client/user'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const userStore = useUserStore()
const { showToast } = useToast()
const redeemCode = ref('')
const redeeming = ref(false)

// Confirm Modal State
const showConfirm = ref(false)
const confirmLoading = ref(false)
const confirmType = ref<'info' | 'danger'>('info')
const confirmTitle = ref('')
const confirmContent = ref('')
const confirmBtnText = ref('确认')
const currentItem = ref<UserCoupon | null>(null)
const actionType = ref<'use_balance' | 'delete'>('use_balance')

// Infinite Scroll
const fetchCoupons = async () => {
    // FIX: Do NOT set loading.value = true here, let useInfiniteScroll handle it
    // loading.value = true 
    try {
        const res = await couponApi.getUserCoupons()
        if (res.success && res.data) {
             return {
                list: res.data,
                hasMore: false, 
                total: res.data.length
             }
        }
        return { list: [], hasMore: false }
    } catch (e) {
        return { list: [], hasMore: false } 
    } 
    // finally {
    //    loading.value = false
    // }
}

const { displayList, loading, finished, error, loadMore, reset } = useInfiniteScroll<UserCoupon>({
    fetchData: fetchCoupons as any, 
    pageSize: 20
})

const handleRedeem = async () => {
   if(!redeemCode.value || redeeming.value) return
   redeeming.value = true
   
   // Min timeout protection
   const minTime = new Promise(resolve => setTimeout(resolve, 500))
   
   try {
      const [res] = await Promise.all([
          couponApi.redeemCoupon(redeemCode.value),
          minTime
      ])

      if(res.success) {
          showToast('兑换成功', 'success')
          redeemCode.value = ''
          reset() // Reload list
      } else {
          showToast(res.msg || '兑换失败', 'error')
      }
   } catch(e) {
      showToast('网络请求失败', 'error')
   } finally {
      redeeming.value = false
   }
}

const handleCouponClick = (item: UserCoupon) => {
    currentItem.value = item
    
    // Case 1: Unused Balance Coupon -> Deposit
    if (item.status === 'unused' && item.coupon.type === 'balance') {
        actionType.value = 'use_balance'
        confirmType.value = 'info'
        confirmTitle.value = '使用余额券'
        confirmContent.value = `确认将 "${item.coupon.name}" 充值到余额？`
        confirmBtnText.value = '立即充值'
        showConfirm.value = true
        return
    }

    // Case 2: Used or Expired -> Delete
    if (item.status === 'used' || item.status === 'expired') {
        actionType.value = 'delete'
        confirmType.value = 'danger'
        confirmTitle.value = '删除记录'
        confirmContent.value = '确定要删除这条优惠券记录吗？此操作不可恢复。'
        confirmBtnText.value = '确认删除'
        showConfirm.value = true
        return
    }

    // Case 3: Unused Product/Flat -> Navigate
    if (item.status === 'unused') {
        router.push('/mobile')
    }
}

const handleConfirmAction = async () => {
    if (!currentItem.value) return
    confirmLoading.value = true
    
    try {
        if (actionType.value === 'use_balance') {
             const res = await couponApi.useBalanceCoupon(currentItem.value.id)
             if (res.success) {
                showToast('充值成功', 'success')
                await userStore.fetchUserInfo()
                reset()
             } else {
                showToast(res.msg || '使用失败', 'error')
             }
        } else if (actionType.value === 'delete') {
             const res = await couponApi.deleteUserCoupon(currentItem.value.id)
             if (res.success) {
                showToast('删除成功', 'success')
                reset()
             } else {
                showToast(res.msg || '删除失败', 'error')
             }
        }
        showConfirm.value = false
    } catch (e) {
        showToast('操作失败', 'error')
    } finally {
        confirmLoading.value = false
    }
}

const getExpiryText = (dateStr?: string) => {
    if (!dateStr) return '永久有效'
    return `有效期至 ${dateStr.split('T')[0]}`
}
</script>

<style scoped>
.mobile-page {
  min-height: 100vh;
  padding-bottom: 40px;
  color: #fff;
  display: flex; flex-direction: column;
  position: relative;
}
.mobile-bg-fixed {
  position: fixed; inset: 0; z-index: -1;
  background: #0F172A; /* Fallback */
}

.content-body {
  padding: 16px;
  flex: 1;
}

/* Input Card */
.info-card-glass {
    position: relative;
    background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; 
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    margin-bottom: 24px;
}
.card-glow-bg {
    position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 60%);
    pointer-events: none; z-index: 0;
}

.input-card {
  padding: 24px 20px;
  display: flex; flex-direction: column; align-items: center;
  z-index: 1;
}

.card-icon {
  width: 56px; height: 56px;
  background: rgba(249, 115, 22, 0.1);
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  color: #F97316;
  font-size: 28px;
  margin-bottom: 20px;
  border: 1px solid rgba(249, 115, 22, 0.2);
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.2);
  position: relative; z-index: 1;
}

.card-input-group {
    display: flex; gap: 10px; width: 100%;
    margin-bottom: 12px; position: relative; z-index: 1;
}

.input-wrapper { flex: 1; position: relative; }

.input-glass {
    width: 100%;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 0 16px;
    height: 48px;
    color: #fff;
    font-size: 15px;
    outline: none; transition: all 0.2s;
} 
.input-glass:focus { 
    border-color: #38BDF8; 
    background: rgba(15, 23, 42, 0.8);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}
.input-glass:disabled { opacity: 0.5; }

.redeem-btn {
    width: 80px;
    height: 48px;
    background: linear-gradient(135deg, #F97316, #EA580C);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
}
.redeem-btn:active { transform: scale(0.96); }
.redeem-btn:disabled { 
    background: rgba(255,255,255,0.1); color: #64748B; 
    box-shadow: none; cursor: not-allowed; 
}

.tips {
    font-size: 12px; color: #64748B; margin: 0; position: relative; z-index: 1;
}

.spinner-sm {
    width: 20px; height: 20px; 
    border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
    border-radius: 50%; animation: spin 0.8s linear infinite;
}

/* History Header */
.section-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 16px; padding: 0 4px;
}
.title-left { display: flex; align-items: center; gap: 8px; }
.icon-box {
    width: 24px; height: 24px; border-radius: 6px; 
    background: rgba(56, 189, 248, 0.1); color: #38BDF8;
    display: flex; align-items: center; justify-content: center; font-size: 14px;
}
.title-text { font-size: 16px; font-weight: 600; color: #E2E8F0; }
.subtitle { font-size: 12px; color: #64748B; }

/* List */
.coupon-list { display: flex; flex-direction: column; gap: 12px; }
.list-items { display: flex; flex-direction: column; gap: 12px; }

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

@keyframes spin { to { transform: rotate(360deg); } }
</style>
