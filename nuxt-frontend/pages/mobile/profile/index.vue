<template>
  <div class="mobile-profile-minimal">
    
    <!-- 1. Premium Member Card (Header) -->
    <div class="header-container">
        <MobileProfileHeader :user="userInfo" @click="router.push(mobileRoutes.profile())" />
    </div>

    <!-- 2. Wallet / Quota Card -->
    <div class="section-card wallet-section" @click="navigateToWallet">
        <div class="wallet-background"></div>
        <div class="wallet-content">
            <div class="wallet-left">
                <div class="wallet-label">我的额度</div>
                <div class="wallet-value text-price">{{ Number(userStore.user?.balance || 0).toFixed(2) }}</div>
            </div>
            <div class="wallet-actions">
                <button class="action-btn primary-btn pill-btn" @click.stop="handleRecharge">充值</button>
            </div>
        </div>
    </div>

    <!-- 3. Orders Card (Compact & Updated) -->
    <div class="section-card order-card bg-glass-card">
      <div class="card-header compact-header" @click="navigateToOrder('all')">
        <span class="card-title">我的订单</span>
        <div class="card-more">
          全部 <el-icon class="ml-1"><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="order-grid compact-grid">
        <!-- 待支付 -->
        <div class="order-item" @click="navigateToOrder('pending_payment')">
             <div class="icon-wrap">
                <el-icon class="order-icon"><Wallet /></el-icon>
                <div class="badge-dot" v-if="orderCounts.pending > 0">{{ orderCounts.pending }}</div>
             </div>
             <span class="order-label">待支付</span>
        </div>
        <!-- 待发货 -->
        <div class="order-item" @click="navigateToOrder('pending_delivery')">
             <div class="icon-wrap">
                <el-icon class="order-icon"><Box /></el-icon>
                <div class="badge-dot" v-if="orderCounts.paid > 0">{{ orderCounts.paid }}</div>
             </div>
             <span class="order-label">待发货</span>
        </div>
        <!-- 使用中 (In Use) -->
        <div class="order-item" @click="navigateToOrder('completed')">
             <div class="icon-wrap">
                <el-icon class="order-icon"><Monitor /></el-icon>
             </div>
             <span class="order-label">使用中</span>
        </div>
        <!-- 退款中 (Refunding) -->
        <div class="order-item" @click="navigateToOrder('refunding')">
             <div class="icon-wrap">
                <el-icon class="order-icon"><RefreshRight /></el-icon>
                <div class="badge-dot" v-if="orderCounts.refunding > 0">{{ orderCounts.refunding }}</div>
             </div>
             <span class="order-label">退款/售后</span>
        </div>
      </div>
    </div>

    <!-- 4. Feature List Group -->
    <div class="menu-list-group">
        
        <!-- 'My Orders' Link Removed -->

        <MobileMenuLink 
            label="兑换中心" 
            :icon="Ticket" 
            @click="router.push(mobileRoutes.profileRedemption())" 
        />

        <MobileMenuLink 
            label="我的收藏" 
            :icon="Star" 
            @click="router.push(mobileRoutes.profileFavorites())" 
        />

        <MobileMenuLink 
            label="我的工单" 
            :icon="Headset" 
            @click="router.push(mobileRoutes.profileTickets())" 
        />

        <MobileMenuLink 
            label="我的购物车" 
            :icon="ShoppingCart" 
            :badge="cartStore.totalCount > 0"
            @click="router.push(mobileRoutes.cart())" 
        />

        <MobileMenuLink 
            label="我的消息" 
            :icon="Bell" 
            :badge="userStore.unreadMessageCount > 0"
            @click="router.push(mobileRoutes.profileMessages())" 
        />

        <!-- Settings Link Removed as requested -->

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
  ArrowRight, Wallet, Box,
  Ticket, Star, Headset, Bell, Monitor, RefreshRight, ShoppingCart // Import ShoppingCart Icon
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import { useCartStore } from '@/stores/client/cart' // Import Cart Store
import MobileSettingsSheet from '@/components/mobile/profile/MobileSettingsSheet.vue'
import RechargeModal from '@/components/mobile/profile/modals/RechargeModal.vue'
import MobileContactModal from '@/components/mobile/modal/MobileContactModal.vue'
import MobileProfileHeader from '@/components/mobile/profile/MobileProfileHeader.vue'
import MobileMenuLink from '@/components/mobile/profile/MobileMenuLink.vue'
import { mobileRoutes } from '@/config/client-routes'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth' 
})

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
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
    const refunding = userStore.getOrdersByStatus('refunding').length 
    return { pending, paid, refunding }
})

const navigateToOrder = (tab: string) => {
    router.push({ path: mobileRoutes.profileOrders(), query: { tab } })
}

const navigateToWallet = () => {
    router.push(mobileRoutes.profileWallet())
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
        router.push(mobileRoutes.home())
    } else {
        userStore.fetchUserInfo()
        userStore.loadOrders() 
        cartStore.loadCart()
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
    padding: var(--sp-5) var(--sp-5) var(--sp-2) var(--sp-5);
}

/* 2. Wallet Card specific */
.wallet-section {
    position: relative; overflow: hidden;
    /* Glass Effect */
    background: var(--cyber-bg-glass, rgba(15, 23, 42, 0.6));
    backdrop-filter: blur(16px);
    border: 1px solid var(--cyber-border, rgba(6, 182, 212, 0.3));
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.wallet-background {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    /* Subtle Cyan/Orange mix */
    background: 
        radial-gradient(circle at top right, rgba(249, 115, 22, 0.15), transparent 60%),
        radial-gradient(circle at bottom left, rgba(6, 182, 212, 0.1), transparent 60%);
    pointer-events: none;
}

.wallet-content {
    position: relative; z-index: 2;
    display: flex; justify-content: space-between; align-items: flex-end; /* Align bottom */
}

.wallet-left { display: flex; flex-direction: column; gap: 2px; }
.wallet-label { 
    font-size: var(--text-sm); color: #94A3B8; font-weight: 500; letter-spacing: 0.5px; 
}
.wallet-value { 
    font-size: 32px; font-weight: 800; color: #E0F2FE; 
    font-family: var(--font-digit);
    letter-spacing: -1px; line-height: 1.1;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
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
    background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%);
    color: #fff; border: none;
    box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}
.outline-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: #E0F2FE;
}

/* 3. Order Card & Common Section */
.section-card {
    margin: 0 var(--sp-5) var(--sp-6) var(--sp-5);
    padding: var(--sp-5);
    border-radius: 20px;
    
    /* Cyber Glass */
    background: var(--cyber-bg-glass, rgba(15, 23, 42, 0.6));
    backdrop-filter: blur(16px);
    border: 1px solid var(--cyber-border, rgba(6, 182, 212, 0.3));
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}
.card-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 20px;
}
/* Titles */
.card-title { font-size: var(--text-base); font-weight: 600; color: #fff; letter-spacing: 0.5px; }
.card-more { font-size: var(--text-xs); color: #64748B; display: flex; align-items: center; cursor: pointer; }
.card-more:hover { color: #38BDF8; }

.order-grid { display: flex; justify-content: space-between; }
.order-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
/* Order Icons */
.icon-wrap {
    position: relative; width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    color: #94A3B8;
    background: rgba(255,255,255,0.03);
    /* Order Card (Glass handled by utility) */
    background: rgba(255,255,255,0.03);
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.05);
    transition: all 0.2s;
}


.compact-header {
    padding-bottom: 8px !important;
    border-bottom: 1px solid rgba(255,255,255,0.05); /* Separator for clarity */
    margin-bottom: 8px;
}
.compact-grid {
    padding-top: 4px;
}

.order-grid {
    display: flex; justify-content: space-around;
}
.order-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }

.icon-wrap {
    position: relative; width: 36px; height: 36px; /* Slightly smaller */
    display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary);
    transition: all 0.2s;
}

.order-item:active .icon-wrap { 
    color: var(--cyber-primary); 
    background: rgba(6, 182, 212, 0.1);
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
}

.order-icon { font-size: 24px; }
.order-label { font-size: 11px; color: #94A3B8; transition: color 0.2s; }
.order-item:active .order-label { color: #E0F2FE; }

.badge-dot {
    position: absolute; top: -2px; right: -2px;
    /* Neon Badge Style */
    width: 6px; height: 6px; 
    background: var(--cyber-primary, #06B6D4);
    border-radius: 50%;
    box-shadow: 0 0 5px var(--cyber-primary);
    animation: breathe 2s infinite;
}

/* 3. Menu List Group */
.menu-list-group {
    margin: 0 20px;
}

/* Tailwind sizes */
.w-3 { width: 12px; } .h-3 { height: 12px; }
.w-4 { width: 16px; } .h-4 { height: 16px; }
.w-5 { width: 20px; } .h-5 { height: 20px; }
.w-6 { width: 24px; } .h-6 { height: 24px; }
.ml-1 { margin-left: 4px; }
.mr-1 { margin-right: 4px; }
</style>
