<template>
  <div class="mobile-page">
    <MobileSubPageHeader title="兑换中心" />

    <div class="content-body">
      <!-- Input Card -->
      <div class="info-card-glass input-card">
        <div class="card-icon">
          <el-icon><Ticket /></el-icon>
        </div>
        <div class="card-input-group">
           <input 
            type="text" 
            v-model="redeemCode" 
            placeholder="请输入兑换码" 
            class="input-glass"
            @keyup.enter="handleRedeem"
           />
           <button class="redeem-btn" @click="handleRedeem" :disabled="!redeemCode || redeeming">
             <el-icon v-if="redeeming" class="is-loading"><Loading /></el-icon>
             <span v-else>兑换</span>
           </button>
        </div>
        <p class="tips">兑换码通常由16位字母和数字组成</p>
      </div>

      <!-- History Title -->
      <div class="section-title">我的优惠券</div>

      <!-- List -->
      <div class="coupon-list">
         <BaseInfiniteList
            :loading="loading"
            :finished="finished"
            :error="error"
            @load="loadMore"
         >
            <div v-if="displayList.length === 0 && !loading" class="empty-state">
               <el-icon class="empty-icon"><Ticket /></el-icon>
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
               />
            </div>
         </BaseInfiniteList>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Ticket, Loading } from '@element-plus/icons-vue'
import { couponApi, type UserCoupon } from '@/api/client/coupon'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'
import MobileCouponTicket from '@/components/mobile/redemption/MobileCouponTicket.vue'
import { useToast } from '@/composables/mobile/useToast'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const { showToast } = useToast()
const redeemCode = ref('')
const redeeming = ref(false)

// Infinite Scroll
const fetchCoupons = async () => {
    loading.value = true
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
    } finally {
        loading.value = false
    }
}

const { displayList, loading, finished, error, loadMore, reset } = useInfiniteScroll<UserCoupon>({
    fetchData: fetchCoupons as any, 
    pageSize: 20
})

const handleRedeem = async () => {
   if(!redeemCode.value || redeeming.value) return
   redeeming.value = true
   try {
      const res = await couponApi.redeemCoupon(redeemCode.value)
      if(res.success) {
          showToast('兑换成功', 'success')
          redeemCode.value = ''
          reset() // Reload list
      } else {
          showToast(res.msg || '兑换失败', 'error')
      }
   } catch(e) {
      showToast('网络错误', 'error')
   } finally {
      redeeming.value = false
   }
}

const getExpiryText = (dateStr?: string) => {
    if (!dateStr) return '永久有效'
    return `有效期至 ${dateStr.split('T')[0]}`
}

onMounted(() => {
    // handled by infinite scroll
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

.content-body {
  padding: 20px;
  flex: 1;
}

/* Input Card */
.info-card-glass {
    background: #1E293B; /* Slate 800 base */
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; 
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.input-card {
  padding: 24px;
  margin-bottom: 30px;
  display: flex; flex-direction: column; align-items: center;
}

.card-icon {
  width: 48px; height: 48px;
  background: rgba(249, 115, 22, 0.1);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: #F97316;
  font-size: 24px;
  margin-bottom: 20px;
  border: 1px solid rgba(249, 115, 22, 0.2);
}

.card-input-group {
    display: flex; gap: 10px; width: 100%;
    margin-bottom: 12px;
}

.input-glass {
    flex: 1;
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 0 14px;
    height: 48px;
    color: #fff;
    font-size: 14px;
    outline: none; transition: all 0.2s;
} 
.input-glass:focus { border-color: #F97316; background: rgba(0,0,0,0.3); }

.redeem-btn {
    padding: 0 24px;
    height: 48px;
    background: linear-gradient(135deg, #F97316, #EA580C);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}
.redeem-btn:disabled { opacity: 0.6; filter: grayscale(0.5); }

.tips {
    font-size: 12px; color: #64748B; margin: 0;
}

.section-title {
    font-size: 16px; font-weight: 600; margin-bottom: 16px; 
    padding-left: 12px; border-left: 3px solid #3B82F6; line-height: 1.2;
    color: #E2E8F0;
}

/* List */
.coupon-list {
    display: flex; flex-direction: column; gap: 12px;
}
.list-items {
    display: flex; flex-direction: column; gap: 12px;
}

.empty-state {
    padding: 60px 0; text-align: center; color: #64748B;
}
.empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.3; }
</style>
