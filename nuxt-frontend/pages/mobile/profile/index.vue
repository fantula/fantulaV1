<template>
  <div class="mobile-profile-minimal">
    
    <!-- 1. Premium Member Card (Header) -->
    <div class="header-container">
        <div class="member-card" @click="router.push('/mobile/profile/account')"> <!-- Placeholder route for details -->
            <div class="card-content">
                <div class="avatar-wrap">
                    <img :src="userInfo.avatar || '/images/default-avatar.png'" class="avatar-img" />
                </div>
                <div class="user-details">
                    <h1 class="username">{{ userInfo.nickname }}</h1>
                    <div class="tags-row">
                        <div class="tag-pill blue-pill">FANTULA Member</div>
                        <div class="tag-pill green-pill">
                            <CircleCheckFilled class="w-3 h-3 mr-1" /> 安全等级: 高
                        </div>
                    </div>
                </div>
                <ArrowRight class="card-arrow" />
            </div>
            <!-- Decorative background glow -->
            <div class="card-glow"></div>
        </div>
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
                <button class="action-btn primary-btn pill-btn" @click="handleNotImplemented">充值</button>
                <button class="action-btn outline-btn pill-btn" @click="openWalletSheet">
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
          全部订单 <ArrowRight class="w-3 h-3 ml-1" />
        </div>
      </div>
      <div class="order-grid">
        <div class="order-item" @click="navigateToOrder('pending')">
             <div class="icon-wrap">
                <Wallet class="w-6 h-6" />
                <div class="badge-dot" v-if="orderCounts.pending > 0">{{ orderCounts.pending }}</div>
             </div>
             <span class="order-label">待支付</span>
        </div>
        <div class="order-item" @click="navigateToOrder('paid')">
             <div class="icon-wrap">
                <Box class="w-6 h-6" />
                <div class="badge-dot" v-if="orderCounts.paid > 0">{{ orderCounts.paid }}</div>
             </div>
             <span class="order-label">待发货</span>
        </div>
        <div class="order-item" @click="navigateToOrder('completed')">
             <div class="icon-wrap">
                <CircleCheck class="w-6 h-6" />
             </div>
             <span class="order-label">已完成</span>
        </div>
        <div class="order-item" @click="handleContactService">
             <div class="icon-wrap">
                <Service class="w-6 h-6" />
             </div>
             <span class="order-label">售后</span>
        </div>
      </div>
    </div>

    <!-- 4. Feature List Group -->
    <div class="menu-list-group">
        
        <!-- Wallet removed from list -->

        <div class="menu-item" @click="navigateToOrder('all')">
             <!-- Replicating "My Orders" in list? No, already have card. PC has separate "My Orders" menu? 
                  The screenshot shows "My Orders" in list. But we have the card. 
                  Let's stick to the card for orders as it's more functional, but continue with other items.
             -->
             <div class="menu-left">
                <List class="w-5 h-5 text-icon" />
                <span class="menu-text">我的订单</span>
            </div>
             <ArrowRight class="w-4 h-4 text-arrow" />
        </div>

        <div class="menu-item" @click="router.push('/mobile/profile/redemption')">
            <div class="menu-left">
                <Ticket class="w-5 h-5 text-icon" />
                <span class="menu-text">兑换中心</span>
            </div>
             <ArrowRight class="w-4 h-4 text-arrow" />
        </div>

        <div class="menu-item" @click="router.push('/mobile/profile/favorites')">
            <div class="menu-left">
                <Star class="w-5 h-5 text-icon" />
                <span class="menu-text">我的收藏</span>
            </div>
             <ArrowRight class="w-4 h-4 text-arrow" />
        </div>

        <div class="menu-item" @click="router.push('/mobile/profile/tickets')">
            <div class="menu-left">
                <Headset class="w-5 h-5 text-icon" />
                <span class="menu-text">我的工单</span>
            </div>
             <ArrowRight class="w-4 h-4 text-arrow" />
        </div>

        <div class="menu-item" @click="router.push('/mobile/profile/messages')">
            <div class="menu-left">
                <Bell class="w-5 h-5 text-icon" />
                <span class="menu-text">我的消息</span>
                 <div class="list-dot" v-if="userStore.unreadMessageCount > 0"></div>
            </div>
             <ArrowRight class="w-4 h-4 text-arrow" />
        </div>
        
         <div class="menu-item" @click="handleLogout">
            <div class="menu-left">
                <SwitchButton class="w-5 h-5 text-red-400" />
                <span class="menu-text text-red-400">退出登录</span>
            </div>
             <ArrowRight class="w-4 h-4 text-arrow" />
        </div>

    </div>

    <!-- Wallet History Sheet -->
    <MobileWalletSheet 
        :visible="showWalletSheet" 
        :transactions="userStore.transactions"
        :loading="loadingWallet"
        @close="showWalletSheet = false" 
    />

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
    ArrowRight, Wallet, Box, CircleCheck, Service, 
    WalletFilled, Ticket, Star, Headset, Bell, List, SwitchButton, CircleCheckFilled
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/client/user'
import MobileWalletSheet from '@/components/mobile/profile/MobileWalletSheet.vue'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth' 
})

const router = useRouter()
const userStore = useUserStore()
const showWalletSheet = ref(false)
const loadingWallet = ref(false)

const userInfo = computed(() => {
  const u = userStore.user || {}
  return {
    nickname: u.nickName || u.nickname || u.email?.split('@')[0] || '用户',
    avatar: u.avatar || '',
    uid: u.uid || u.id?.toString().slice(0, 8) || '---'
  }
})

const orderCounts = computed(() => {
    const pending = userStore.getOrdersByStatus('待支付').length
    const paid = userStore.getOrdersByStatus('已发货').length 
    return { pending, paid }
})

const navigateToOrder = (tab: string) => {
    router.push({ path: '/mobile/profile/order', query: { tab } })
}

const handleNotImplemented = () => {
   // alert('功能暂未开放 / Feature Coming Soon')
}

const openWalletSheet = async () => {
    showWalletSheet.value = true
    loadingWallet.value = true
    await userStore.fetchWalletData()
    loadingWallet.value = false
}

const handleContactService = () => {
    // alert('请联系客服 / Contact Support')
}

const handleLogout = () => {
    if (confirm('确定要退出登录吗?')) {
        userStore.logout()
        router.push('/mobile')
    }
}

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

/* Premium Member Card */
.member-card {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
    border: 1px solid rgba(255,255,255,0.08); /* Subtle border */
    border-radius: 20px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px -5px rgba(0,0,0,0.4);
}

/* Card Glow Effect */
.card-glow {
    position: absolute; top: -50px; right: -50px;
    width: 150px; height: 150px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
}

.card-content {
    display: flex; align-items: center; gap: 16px;
    position: relative; z-index: 2;
}

.avatar-wrap {
    width: 60px; height: 60px; border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.9); /* Strong white border as in reference */
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    overflow: hidden; flex-shrink: 0;
    background: #fff; /* White background for transparent avatars */
}
.avatar-img { width: 100%; height: 100%; object-fit: cover; }

.user-details { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 6px; }
.username { 
    font-size: 22px; font-weight: 800; color: #fff; margin: 0; 
    line-height: 1.2; letter-spacing: 0.5px;
}

.tags-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

.tag-pill {
    font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 6px;
    display: inline-flex; align-items: center;
    border: 1px solid transparent;
}
.blue-pill {
    background: rgba(30, 58, 138, 0.6); color: #60A5FA; border-color: rgba(96, 165, 250, 0.3);
}
.green-pill {
    background: rgba(6, 78, 59, 0.6); color: #34D399; border-color: rgba(52, 211, 153, 0.3);
}

.card-arrow {
    width: 18px; height: 18px; color: #64748B; 
    transition: transform 0.2s;
}
.member-card:active .card-arrow { transform: translateX(3px); }

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
.menu-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:active { opacity: 0.7; }

.menu-left { display: flex; align-items: center; gap: 12px; }
.text-icon { color: #94A3B8; } /* Uniform icon color */
.menu-text { font-size: 15px; color: #E2E8F0; font-weight: 500; }
.text-arrow { color: #475569; }
.text-red-400 { color: #F87171; }

.list-dot {
    width: 6px; height: 6px; background: #EF4444; border-radius: 50%; margin-left: 8px;
}

/* Tailwind sizes */
.w-3 { width: 12px; } .h-3 { height: 12px; }
.w-4 { width: 16px; } .h-4 { height: 16px; }
.w-5 { width: 20px; } .h-5 { height: 20px; }
.w-6 { width: 24px; } .h-6 { height: 24px; }
.ml-1 { margin-left: 4px; }
</style>
