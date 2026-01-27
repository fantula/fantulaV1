<template>
  <div class="mobile-page">
    <div class="page-header">
      <div class="back-btn" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <h1 class="page-title">兑换中心</h1>
      <div class="header-right"></div>
    </div>

    <div class="content-body">
      <!-- Input Card -->
      <div class="input-card">
        <div class="card-icon">
          <el-icon><Ticket /></el-icon>
        </div>
        <div class="card-input-group">
           <input 
            type="text" 
            v-model="redeemCode" 
            placeholder="请输入兑换码" 
            class="custom-input"
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
               <div 
                 v-for="item in displayList" 
                 :key="item.id" 
                 class="coupon-item"
                 :class="{ 'is-used': item.status !== 'unused', 'is-expired': isExpired(item) }"
               >
                  <div class="coupon-left">
                     <div class="coupon-amount">
                        <span class="symbol" v-if="item.coupon.type === 'balance'">¥</span>
                        <span class="value">{{ item.coupon.value }}</span>
                     </div>
                     <div class="coupon-type">{{ getTypeName(item.coupon.type) }}</div>
                  </div>
                  <div class="coupon-right">
                     <div class="coupon-name">{{ item.coupon.name }}</div>
                     <div class="coupon-time" v-if="item.coupon.end_date">有效期至 {{ formatDate(item.coupon.end_date) }}</div>
                     <div class="coupon-time" v-else>永久有效</div>
                     
                     <div class="coupon-status">
                        <span v-if="item.status === 'used'" class="status-tag used">已使用</span>
                        <span v-else-if="item.status === 'expired' || isExpired(item)" class="status-tag expired">已过期</span>
                        <span v-else class="status-tag unused">未使用</span>
                     </div>
                  </div>
                  
                  <!-- Circles for aesthetic -->
                  <div class="circle top"></div>
                  <div class="circle bottom"></div>
               </div>
            </div>
         </BaseInfiniteList>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Ticket, Loading } from '@element-plus/icons-vue'
import { couponApi, type UserCoupon } from '@/api/client/coupon'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const redeemCode = ref('')
const redeeming = ref(false)

// Infinite Scroll
const fetchCoupons = async () => {
    // Adapter for infinite scroll - since API returns all, we simulate paging or just return all
    // Ideally we assume the existing API returns all list
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

// Since useInfiniteScroll expects a fetch function that returns { list, ... } or data array
// But if we want Client-Side paging for ALL data:
const { displayList, loading, finished, error, loadMore, reset } = useInfiniteScroll<UserCoupon>({
    fetchData: fetchCoupons as any, // Type adaptation
    pageSize: 20
})

const handleRedeem = async () => {
   if(!redeemCode.value || redeeming.value) return
   redeeming.value = true
   try {
      const res = await couponApi.redeemCoupon(redeemCode.value)
      if(res.success) {
          ElMessage.success({
             message: '兑换成功',
             offset: 100,
             customClass: 'mobile-message'
          })
          redeemCode.value = ''
          reset() // Reload list
      } else {
          ElMessage.error({
             message: res.msg || '兑换失败',
             offset: 100,
             customClass: 'mobile-message'
          })
      }
   } catch(e) {
      ElMessage.error('网络错误')
   } finally {
      redeeming.value = false
   }
}

const isExpired = (item: UserCoupon) => {
    if (!item.coupon.end_date) return false
    return new Date(item.coupon.end_date) < new Date()
}

const getTypeName = (type: string) => {
    const map: Record<string, string> = {
        balance: '余额券',
        product: '商品券',
        flat: '满减券'
    }
    return map[type] || '优惠券'
}

const formatDate = (dateStr: string) => {
    return dateStr.split('T')[0]
}

onMounted(() => {
    // Auto load handled by infinite list? No, BaseInfiniteList calls load logic. 
    // Usually useInfiniteScroll needs manual trigger or onMounted
    // But check useInfiniteScroll impl: usually it doesn't auto-load unless configured.
    // We will let BaseInfiniteList trigger @load which calls loadMore
    // Wait, typical useInfiniteScroll in this project handles CLIENT-SIDE data nicely? 
    // In profile/exchange.vue (PC), they passed `data: filteredSource`.
    // Here I used `fetchData`. Let's stick to what works.
    // If I use fetchData, the `loadMore` will call it.
})
</script>

<style scoped>
.mobile-page {
  min-height: 100vh;
  background: #0F172A;
  padding-bottom: 40px;
  color: #fff;
}

.page-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
}
.back-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  cursor: pointer;
}
.page-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  padding-right: 32px; /* Balance back btn */
}

.content-body {
  padding: 20px;
}

/* Input Card */
.input-card {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8));
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
}

.card-icon {
  width: 40px; height: 40px;
  background: rgba(249, 115, 22, 0.1);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: #F97316;
  font-size: 20px;
  margin-bottom: 16px;
}

.card-input-group {
    display: flex; gap: 10px;
    margin-bottom: 12px;
}

.custom-input {
    flex: 1;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 0 12px;
    height: 44px;
    color: #fff;
    font-size: 14px;
    outline: none;
} 
.custom-input:focus { border-color: #F97316; }

.redeem-btn {
    padding: 0 20px;
    height: 44px;
    background: linear-gradient(90deg, #F97316, #EA580C);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
}
.redeem-btn:disabled { opacity: 0.5; }

.tips {
    font-size: 12px; color: #64748B; margin: 0;
}

.section-title {
    font-size: 16px; font-weight: 600; margin-bottom: 16px; 
    padding-left: 4px; border-left: 3px solid #3B82F6; line-height: 1;
}

/* List */
.coupon-list {
    display: flex; flex-direction: column; gap: 12px;
}

.coupon-item {
    background: #1E293B;
    border-radius: 12px;
    display: flex;
    position: relative;
    overflow: hidden;
    height: 100px;
}

.coupon-left {
    width: 100px;
    background: rgba(59, 130, 246, 0.1);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: #3B82F6;
    border-right: 2px dashed rgba(255,255,255,0.1);
}
.coupon-item.is-used .coupon-left, .coupon-item.is-expired .coupon-left {
    background: rgba(148, 163, 184, 0.1); color: #94A3B8;
}

.coupon-amount { font-family: 'DIN Alternate', sans-serif; font-weight: bold; }
.coupon-amount .symbol { font-size: 14px; }
.coupon-amount .value { font-size: 28px; }

.coupon-type { font-size: 12px; margin-top: 4px; opacity: 0.8; }

.coupon-right {
    flex: 1;
    padding: 12px 16px;
    display: flex; flex-direction: column; justify-content: center;
}

.coupon-name { font-size: 15px; font-weight: 600; color: #E2E8F0; margin-bottom: 6px; }
.coupon-time { font-size: 12px; color: #64748B; }

.coupon-status {
    position: absolute; right: 12px; top: 12px;
}
.status-tag {
    font-size: 10px; padding: 2px 6px; border-radius: 4px;
}
.status-tag.unused { background: rgba(59, 130, 246, 0.1); color: #3B82F6; }
.status-tag.used { background: rgba(148, 163, 184, 0.1); color: #94A3B8; }
.status-tag.expired { background: rgba(239, 68, 68, 0.1); color: #EF4444; }

.circle {
    position: absolute; left: 94px; /* 100 - 6 */
    width: 12px; height: 12px;
    background: #0F172A; /* Match page bg */
    border-radius: 50%;
}
.circle.top { top: -6px; }
.circle.bottom { bottom: -6px; }

.empty-state {
    padding: 40px 0; text-align: center; color: #64748B;
}
.empty-icon { font-size: 40px; margin-bottom: 10px; opacity: 0.5; }
</style>
