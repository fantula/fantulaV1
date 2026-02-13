<template>
  <header class="mobile-header" :class="{ 'is-scrolled': isScrolled }">
    <!-- Top Row: Logo & Actions -->
    <div class="header-top">
<div class="logo-area">
         <img src="/images/shared/logo_v3.png" class="logo-img" alt="FANTULA" />
         <span class="site-name">凡图拉</span>
      </div>
      
      <div class="header-actions">
          <!-- 1. Cart (First/Left) -->
          <div class="cart-wrapper-rel" ref="cartWrapperRef">
              <button class="icon-btn" @click.stop="toggleMiniCart">
                 <el-icon><ShoppingCart /></el-icon>
                 <div v-if="cartStore.totalCount > 0" class="badge-dot-header"></div>
              </button>
              
              <MobileMiniCart 
                 :visible="showMiniCart" 
                 @close="showMiniCart = false"
              />
          </div>

          <!-- 2. Favorites (Middle) -->
          <button class="icon-btn" @click="router.push('/mobile/profile/favorites')">
             <el-icon><Star /></el-icon>
          </button>

          <!-- 3. User/Login (Last/Right) -->
          <template v-if="!userStore.isLoggedIn">
              <button class="icon-btn" @click="$emit('open-login')">
                 <el-icon><User /></el-icon>
              </button>
          </template>
          <template v-else>
             <div class="header-avatar" @click="router.push('/mobile/profile')">
                <div v-if="userStore.loading" class="avatar-skeleton"></div>
                <template v-else>
                    <img 
                      :src="userStore.user?.avatar || '/images/client/pc/avatars/avatar-cat.png'" 
                      @error="(e) => (e.target as HTMLImageElement).src = '/images/client/pc/avatars/avatar-cat.png'"
                    />
                    <div class="avatar-ring"></div>
                </template>
             </div>
          </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/client/user'
import { useCartStore } from '@/stores/client/cart'
import { ShoppingCart, User, Star } from '@element-plus/icons-vue'
import MobileMiniCart from '@/components/mobile/cart/MobileMiniCart.vue'

defineProps<{
  isScrolled: boolean
}>()

defineEmits(['open-login'])

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const showMiniCart = ref(false)
const cartWrapperRef = ref<HTMLElement | null>(null)

const toggleMiniCart = () => {
    showMiniCart.value = !showMiniCart.value
}

// Click Outside to Close
const handleClickOutside = (event: MouseEvent) => {
  if (showMiniCart.value && cartWrapperRef.value && !cartWrapperRef.value.contains(event.target as Node)) {
    showMiniCart.value = false
  }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.mobile-header {
  position: absolute; /* Overlay content */
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: env(safe-area-inset-top) 16px 12px;
  background: linear-gradient(to bottom, rgba(2, 6, 23, 0.4) 0%, transparent 100%); /* Ambient Shade */
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
}

.mobile-header.is-scrolled {
  background: rgba(15, 23, 42, 0.75); /* Deep Glass */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  /* Replaced solid border with gradient line below */
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

/* Gradient Bottom Line for Scrolled State */
.mobile-header.is-scrolled::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent 100%);
}

/* Top Row */
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
}


/* Logo Area */
/* Logo Area - Floating Effect */
.logo-area {
  display: flex; align-items: center; padding-left: 4px; 
}
.logo-img {
  height: 42px; 
  width: auto; object-fit: contain;
  /* Removed hard border, added projection glow */
  filter: drop-shadow(0 0 8px var(--color-brand-glow));
  padding: 0;
  border: none;
  background: transparent;
}
.site-name {
  font-size: 20px; font-weight: 800; margin-left: 10px;
  color: #fff; letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3); /* Lift text */
  font-family: 'PingFang SC', sans-serif;
}

/* Actions */
.header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-right: 8px; /* More breathing room */
}

/* Relative wrapper for cart to anchor popup */
.cart-wrapper-rel {
    position: relative;
    z-index: 110; /* Above other icons */
}

.icon-btn {
  width: 42px; height: 42px; /* Standard Touch Target */
  display: flex; align-items: center; justify-content: center;
  border-radius: 16px; /* Smooth Squircle */
  
  /* Crystal/Liquid Glass Texture */
  background: rgba(255,255,255,0.02);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-glass-light); /* Ultra thin */
  
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2); /* Float depth */
  position: relative;
  overflow: hidden;
}

/* Inner Glow & Hover */
.icon-btn::before {
  content: ''; position: absolute; inset: 0;
  border-radius: 16px;
  /* Radial micro-glow for crystal feel */
  background: radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%);
  opacity: 0.5; transition: opacity 0.3s;
}

.icon-btn:active { 
  transform: scale(0.94); 
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.2);
  color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.icon-btn:active::before { opacity: 1; }

.badge-dot-header {
    position: absolute; top: 8px; right: 8px;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--cyber-primary);
    box-shadow: 0 0 4px var(--cyber-primary);
}

.header-avatar {
  width: 38px; height: 38px; 
  border-radius: 50%; 
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
.header-avatar img { 
  width: 100%; height: 100%; 
  object-fit: cover; 
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
}
.avatar-ring {
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  border-radius: 50%;
  border: 1px solid var(--color-brand-primary);
  opacity: 0.6; /* Slightly stronger ring */
  box-shadow: 0 0 8px var(--color-brand-glow);
}

/* Skeleton Loading */
.avatar-skeleton {
  width: 100%; height: 100%;
  border-radius: 50%;
  background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
