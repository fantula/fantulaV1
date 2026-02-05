<template>
  <div class="mobile-profile-minimal">
    
    <!-- Top Bar with Settings -->
    <div class="top-nav">
        <div class="page-title">个人中心</div>
        <button class="settings-btn" @click="showSettings = true">
            <el-icon class="settings-icon"><Setting /></el-icon>
        </button>
    </div>
    
    <!-- 1. Premium Member Card (Header) -->
    <div class="header-container">
        <MobileProfileHeader :user="userInfo" @click="router.push('/mobile/profile/account')" />
    </div>

    <!-- 2. Wallet / Quota Card -->
    <div class="section-card wallet-section">
        <div class="wallet-background"></div>
        <div class="wallet-content">
            <div class="wallet-left">
                <div class="wallet-label">我的额度</div>
                <div class="wallet-value">{{ Number(userStore.user?.balance || 0).toFixed(2) }}</div>
            </div>
            <div class="wallet-actions">
                <button class="action-btn primary-btn pill-btn" @click="handleRecharge">充值</button>
                <button class="action-btn outline-btn pill-btn" @click="navigateToWallet">
                    详情
                </button>
            </div>
        </div>
    </div>

    <!-- 3. Orders Card -->
    <div class="section-card order-card">
      <div class="card-header" @click="navigateToOrder('all')">
        <span class="card-title">我的订单</span>
        <div class="card-more">
          全部订单 <el-icon class="ml-1"><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="order-grid">
        <div class="order-item" @click="navigateToOrder('pending_payment')">
             <div class="icon-wrap">
                <el-icon class="order-icon"><Wallet /></el-icon>
                <div class="badge-dot" v-if="orderCounts.pending > 0">{{ orderCounts.pending }}</div>
             </div>
             <span class="order-label">待支付</span>
        </div>
        <div class="order-item" @click="navigateToOrder('pending_delivery')">
             <div class="icon-wrap">
                <el-icon class="order-icon"><Box /></el-icon>
                <div class="badge-dot" v-if="orderCounts.paid > 0">{{ orderCounts.paid }}</div>
             </div>
             <span class="order-label">待发货</span>
        </div>
        <div class="order-item" @click="navigateToOrder('completed')">
             <div class="icon-wrap">
                <el-icon class="order-icon"><CircleCheck /></el-icon>
             </div>
             <span class="order-label">已完成</span>
        </div>
        <div class="order-item" @click="handleContactService">
             <div class="icon-wrap">
                <el-icon class="order-icon"><Service /></el-icon>
             </div>
             <span class="order-label">售后</span>
        </div>
      </div>
    </div>

    <!-- 4. Feature List Group -->
    <div class="menu-list-group">
        
        <!-- Using MobileMenuLink Component -->
        <MobileMenuLink 
            label="我的订单" 
            :icon="List" 
            @click="navigateToOrder('all')" 
        />

        <MobileMenuLink 
            label="兑换中心" 
            :icon="Ticket" 
            @click="router.push('/mobile/profile/redemption')" 
        />

        <MobileMenuLink 
            label="我的收藏" 
            :icon="Star" 
            @click="router.push('/mobile/profile/favorites')" 
        />

        <MobileMenuLink 
            label="我的工单" 
            :icon="Headset" 
            @click="router.push('/mobile/profile/tickets')" 
        />

        <MobileMenuLink 
            label="我的消息" 
            :icon="Bell" 
            :badge="userStore.unreadMessageCount > 0"
            @click="router.push('/mobile/profile/messages')" 
        />

    </div>

    <!-- Settings Sheet -->
    <MobileSettingsSheet
        :visible="showSettings"
        @close="showSettings = false"
    />

    <!-- Recharge Modal -->
    <RechargeModal
        :visible="showRecharge"
        @close="showRecharge = false"
        @success="userStore.fetchUserInfo()"
    />

    <!-- Contact Modal -->
    <MobileContactModal v-model="showContactModal" />

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
    ArrowRight, Wallet, Box, CircleCheck, Service, 
    Ticket, Star, Headset, Bell, List, Setting
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import MobileSettingsSheet from '@/components/mobile/profile/MobileSettingsSheet.vue'
import RechargeModal from '@/components/mobile/profile/modals/RechargeModal.vue'
import MobileContactModal from '@/components/mobile/modal/MobileContactModal.vue'
import MobileProfileHeader from '@/components/mobile/profile/MobileProfileHeader.vue'
import MobileMenuLink from '@/components/mobile/profile/MobileMenuLink.vue'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth' 
})

const router = useRouter()
const userStore = useUserStore()
const showSettings = ref(false)
const showRecharge = ref(false)
const showContactModal = ref(false)

const userInfo = computed(() => {
  const u = userStore.user
  if (!u) return { nickname: '用户', avatar: '', uid: '---' }
  return {
    nickname: u.nickName || (u as any).nickname || u.email?.split('@')[0] || '用户',
    avatar: u.avatar || '',
    uid: u.uid || u.id?.toString().slice(0, 8) || '---'
  }
})

const orderCounts = computed(() => {
    // Note: Adjust status strings to match backend ENUMs if needed
    const pending = userStore.getOrdersByStatus('pending_payment').length
    const paid = userStore.getOrdersByStatus('pending_delivery').length 
    return { pending, paid }
})

const navigateToOrder = (tab: string) => {
    router.push({ path: '/mobile/profile/order', query: { tab } })
}

const navigateToWallet = () => {
    router.push('/mobile/profile/wallet')
}

const handleRecharge = () => {
   showRecharge.value = true
}

const handleContactService = () => {
    showContactModal.value = true
}

// Logout logic moved to SettingsSheet

onMounted(() => {
    if(!userStore.isLoggedIn) {
        router.push('/mobile')
    } else {
        userStore.fetchUserInfo()
        userStore.loadOrders() 
    }
})
</script>

<style scoped>
.mobile-profile-minimal {
  padding-bottom: 90px; 
  min-height: 100vh;
  padding-top: 20px;
}

/* 1. Header Container */
.header-container {
    padding: 20px 20px 10px 20px;
}

/* 2. Wallet Card specific */
.wallet-section {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.08);
}

.wallet-background {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at top right, rgba(249, 115, 22, 0.1), transparent 60%);
    pointer-events: none;
}

.wallet-content {
    position: relative; z-index: 2;
    display: flex; justify-content: space-between; align-items: flex-end; /* Align bottom */
}

.wallet-left { display: flex; flex-direction: column; gap: 2px; }
.wallet-label { 
    font-size: 13px; color: #94A3B8; font-weight: 500; letter-spacing: 0.5px; 
}
.wallet-value { 
    font-size: 32px; font-weight: 800; color: #fff; 
    font-family: 'DIN Alternate', 'Outfit', sans-serif; /* Try to use a number font */
    letter-spacing: -1px; line-height: 1.1;
}

.wallet-actions { display: flex; gap: 12px; align-items: center; }
.action-btn {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 8px 20px; font-size: 14px; font-weight: 600; cursor: pointer; 
    transition: all 0.2s;
    min-width: 70px;
}
.pill-btn { border-radius: 99px; } /* High border radius for rounded buttons */

.primary-btn {
    background: linear-gradient(90deg, #F97316, #EA580C); 
    color: #fff; border: none;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}
.primary-btn:active { transform: scale(0.96); box-shadow: 0 2px 6px rgba(249, 115, 22, 0.2); }

.outline-btn {
    background: rgba(255,255,255,0.05); color: #CBD5E1; 
    border: 1px solid rgba(255,255,255,0.1);
}
.outline-btn:active { background: rgba(255,255,255,0.1); transform: scale(0.96); color: #fff; }

/* 3. Order Card & Common Section */
.section-card {
    margin: 0 20px 24px 20px;
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 20px;
}
.card-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 20px;
}
.card-title { font-size: 15px; font-weight: 600; color: #fff; }
.card-more { font-size: 12px; color: #64748B; display: flex; align-items: center; }

.order-grid { display: flex; justify-content: space-between; }
.order-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.icon-wrap {
    position: relative; width: 40px; height: 40px;
    display: flex; align-items: center; justify-content: center;
    color: #CBD5E1;
}
.order-icon { font-size: 24px; }
.badge-dot {
    position: absolute; top: -5px; right: -5px;
    background: #F43F5E; color: white; font-size: 10px; font-weight: 700;
    min-width: 16px; height: 16px; line-height: 16px; text-align: center;
    border-radius: 8px; border: 2px solid #1E293B;
}
.order-label { font-size: 12px; color: #94A3B8; }


/* 3. Menu List Group */
.menu-list-group {
    margin: 0 20px;
    /* Optional: background for whole list or just transparent */
}

/* Tailwind sizes */
.w-3 { width: 12px; } .h-3 { height: 12px; }
.w-4 { width: 16px; } .h-4 { height: 16px; }
.w-5 { width: 20px; } .h-5 { height: 20px; }
.w-6 { width: 24px; } .h-6 { height: 24px; }
.ml-1 { margin-left: 4px; }
.mr-1 { margin-right: 4px; } /* Added mr-1 */

/* Top Nav */
.top-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 20px 0 20px;
    margin-bottom: 10px;
}
.page-title {
    font-size: 24px; font-weight: 800; color: #fff;
}
.settings-btn {
    width: 40px; height: 40px; 
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    color: #fff; cursor: pointer;
    transition: all 0.2s;
}
.settings-btn:active {
    background: rgba(255,255,255,0.1); transform: scale(0.95);
}
</style>
