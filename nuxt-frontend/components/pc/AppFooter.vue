<template>
  <footer class="app-footer">
    <div class="footer-bg">
      <div class="footer-cols">
        <div class="footer-col" v-for="(col, idx) in footerGroups" :key="col.title">
          <div class="footer-title">{{ col.title }}</div>
          <div class="footer-underline"></div>
          
          <!-- Link Items -->
          <div v-if="col.items" class="footer-items">
            <template v-for="item in col.items" :key="item.text">
              <!-- Case 1: Internal NuxtLink (Standard Navigation) -->
              <NuxtLink 
                v-if="item.type === 'link' && !item.auth" 
                :to="item.path" 
                class="footer-item footer-link"
              >
                {{ item.text }}
              </NuxtLink>

              <!-- Case 2: Button/Action (Auth required or Modal trigger) -->
              <button 
                v-else-if="item.type === 'button' || item.auth" 
                @click="handleItemClick(item)"
                class="footer-item footer-link footer-button"
              >
                {{ item.text }}
              </button>

              <!-- Case 3: Plain Text fallback -->
              <div v-else class="footer-item">{{ item.text }}</div>
            </template>
          </div>

          <!-- Social Icons -->
          <div v-if="col.icons" class="footer-icons">
            <a 
              v-for="icon in col.icons" 
              :key="icon.label" 
              class="footer-icon"
              :href="icon.url || '#'"
              target="_blank"
              :aria-label="icon.label"
              :title="icon.label"
            >
              <el-icon :size="20"><component :is="icon.icon" /></el-icon>
            </a>
          </div>

          <!-- Extra Text -->
          <div v-if="col.extra" class="footer-extra">{{ col.extra }}</div>
        </div>
      </div>
      
      <div class="footer-bottom">
        © 2019-2026 凡图拉 | 云南凡图拉科技有限公司 | 滇ICP备 2025060486号-1
      </div>
    </div>
    
    <!-- 登录注册弹窗 -->
    <LoginRegisterModal :visible="showLoginModal" @close="closeLoginModal" />
    
    <!-- 联系我们弹窗 -->
    <ServiceModal v-if="showContactModal" @close="closeContactModal" />
  </footer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/client/user'
import LoginRegisterModal from '@/components/pc/modal/LoginRegisterModal.vue'
import ServiceModal from '@/components/pc/modal/ServiceModal.vue'
import { ChatDotRound, Platform, Bell, VideoPlay } from '@element-plus/icons-vue'

const showLoginModal = ref(false)
const showContactModal = ref(false)
const userStore = useUserStore()

// --- Data Structures ---

interface FooterItem {
  text: string;
  type: 'link' | 'button' | 'text';
  path?: string;
  action?: 'contact'; // Add more actions here if needed
  auth?: boolean;     // If true, requires login to navigate
}

interface FooterGroup {
  title: string;
  items?: FooterItem[];
  extra?: string;
  icons?: { label: string; icon: any; url?: string }[];
}

const footerGroups: FooterGroup[] = [
  {
    title: '关于我们',
    items: [
      { text: '公司简介', type: 'link', path: '/company' },
      { text: '我们的使命', type: 'link', path: '/about-us' },
      { text: '我们的优势', type: 'link', path: '/advantages' },
      { text: '加入我们', type: 'link', path: '/join-us' }
    ]
  },
  {
    title: '服务与支持',
    items: [
      { text: '个人中心', type: 'button', path: '/profile', auth: true },
      { text: '我的订单', type: 'button', path: '/profile/orders', auth: true },
      { text: '常见问题', type: 'link', path: '/faq' },
      { text: '联系我们', type: 'button', action: 'contact' }
    ]
  },
  {
    title: '条款与政策',
    items: [
      { text: '隐私政策', type: 'link', path: '/privacy' },
      { text: '用户协议', type: 'link', path: '/policy' },
      { text: '退款政策', type: 'link', path: '/refund' },
      { text: '免责声明', type: 'link', path: '/disclaimer' }
    ]
  },
  {
    title: '关注我们',
    extra: '获取最新促销信息和独家优惠',
    icons: [
      { label: '微信', icon: ChatDotRound, url: '#' },
      { label: '微博', icon: Platform, url: '#' },
      { label: '订阅', icon: Bell, url: '#' },
      { label: '抖音', icon: VideoPlay, url: '#' }
    ]
  }
]

// --- Actions ---

function handleItemClick(item: FooterItem) {
  // 1. Handle Auth Required Links
  if (item.auth) {
    if (userStore.isLoggedIn) {
      if (item.path) navigateTo(item.path)
    } else {
      showLoginModal.value = true
    }
    return
  }

  // 2. Handle Custom Actions
  if (item.action === 'contact') {
    showContactModal.value = true
    return
  }

  // 3. Fallback for generic buttons with paths (if any)
  if (item.path) {
    navigateTo(item.path)
  }
}

function closeContactModal() {
  showContactModal.value = false
}

function closeLoginModal() {
  showLoginModal.value = false
}

// 监听登录状态变化，登录成功后自动关闭弹窗
watch(() => userStore.isLoggedIn, (newValue) => {
  if (newValue && showLoginModal.value) {
    showLoginModal.value = false
  }
})
</script>

<style scoped>
.app-footer {
  margin-top: auto;
  flex-shrink: 0;
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255,255,255,0.05);
}

.footer-bg {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
  padding-left: 20px;
  padding-right: 20px;
}

.footer-cols {
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* Ensure wrapping on smaller screens */
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 40px 20px; /* Row gap 40px, Col gap 20px */
}

.footer-col {
  flex: 1;
  min-width: 160px; /* Slightly wider minimum to prevent cramping */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #F1F5F9;
  line-height: 24px;
  margin-bottom: 8px;
}

.footer-underline {
  width: 30px;
  height: 2px;
  background: var(--active-orange, #F97316); /* Fallback to orange if var missing */
  border-radius: 2px;
  margin-bottom: 16px;
}

.footer-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-item {
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #94A3B8;
  line-height: 24px;
  text-align: left;
}

.footer-link {
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  padding: 0;
}

.footer-link:hover {
  color: var(--active-orange, #F97316);
  transform: translateX(3px);
}

.footer-button {
  /* Inherits .footer-link styles */
}

.footer-extra {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.5;
  margin-bottom: 16px;
}

.footer-icons {
  display: flex;
  gap: 16px;
  margin: 8px 0 0 0;
}

.footer-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  color: #94A3B8;
  transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;
}

.footer-icon:hover {
  background: var(--active-orange, #F97316);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.footer-bottom {
  width: 100%;
  text-align: center;
  color: #64748B;
  font-size: 13px;
  margin-top: 40px;
  padding-bottom: 30px;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 20px;
}

/* Mobile Adaptation Example for very small screens */
@media (max-width: 640px) {
  .footer-cols {
    flex-direction: column;
    gap: 32px;
  }
  
  .footer-col {
    width: 100%;
    align-items: center;
  }
  
  .footer-title {
    text-align: center;
  }
  
  .footer-underline {
    margin: 0 auto 16px auto;
  }
  
  .footer-items {
    align-items: center;
  }
  
  .footer-item {
    text-align: center;
  }
}
</style>