<template>
  <header class="mobile-header" :class="{ 'is-scrolled': isScrolled }">
    <!-- Top Row: Logo & Actions -->
    <div class="header-top">
      <div class="logo-area">
         <img src="/images/shared/logo_v3.png" class="logo-img" alt="FANTULA" />
      </div>
      
      <div class="header-actions">
         <!-- Search Icon -->
         <button class="icon-btn" @click="$emit('open-search')">
            <el-icon><Search /></el-icon>
         </button>
         
         <!-- Favorites Icon -->
         <button class="icon-btn" @click="router.push('/mobile/profile/favorites')">
            <el-icon><Star /></el-icon>
         </button>

         <!-- Cart Icon -->
         <button class="icon-btn" @click="showCartSheet = true">
            <el-icon><ShoppingCart /></el-icon>
             <div v-if="cartStore.totalCount > 0" class="badge-dot-header"></div>
         </button>

         <!-- User/Login Icon -->
         <template v-if="!userStore.isLoggedIn">
             <button class="icon-btn" @click="$emit('open-login')">
                <el-icon><User /></el-icon>
             </button>
         </template>
         <template v-else>
            <div class="header-avatar" @click="router.push('/mobile/profile')">
               <img :src="userStore.user?.avatar || '/images/default-avatar.png'" />
               <div class="avatar-ring"></div>
            </div>
         </template>
      </div>
    </div>
    
    <!-- Cart Sheet -->
    <ClientOnly>
        <MobileCartSheet 
          :visible="showCartSheet" 
          @close="showCartSheet = false" 
        />
    </ClientOnly>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/client/user'
import { useCartStore } from '@/stores/client/cart'
import { Search, ShoppingCart, User, Star } from '@element-plus/icons-vue'
import MobileCartSheet from '@/components/mobile/cart/MobileCartSheet.vue'

defineProps<{
  isScrolled: boolean
}>()

defineEmits(['open-login'])

const router = useRouter()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const showCartSheet = ref(false)
</script>

<style scoped>
.mobile-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--safe-area-top) 16px 12px;
  background: transparent;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.mobile-header.is-scrolled {
  background: rgba(15, 23, 42, 0.95); /* More solid for clarity */
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

/* Top Row */
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
}

.logo-area {
  display: flex; align-items: center;
}
.logo-img {
  height: 28px; width: auto; object-fit: contain;
}

/* Actions */
/* Actions */
.icon-btn {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.05); /* Glassy button */
  border: 1px solid var(--glass-border);
  color: #fff;
  font-size: 18px;
  margin-left: 8px;
  cursor: pointer;
}
/* Button Active State */
.icon-btn:active { background: rgba(255,255,255,0.1); }
.icon-btn { position: relative; }

.badge-dot-header {
    position: absolute; top: 8px; right: 8px;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 4px var(--accent);
}

.header-avatar {
  width: 36px; height: 36px; 
  border-radius: 50%; 
  position: relative;
  cursor: pointer;
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
  border: 1px solid var(--primary-color);
  opacity: 0.3; /* Subtle ring */
}
</style>
