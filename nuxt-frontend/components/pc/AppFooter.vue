<template>
  <footer class="app-footer">
    <div class="footer-bg">
      <div class="footer-cols">
        <div class="footer-col" v-for="(col, idx) in cols" :key="col.title">
          <div class="footer-title">{{ col.title }}</div>
          <div class="footer-underline"></div>
          <div v-if="col.items && !col.icons" class="footer-items">
            <template v-for="item in col.items" :key="item">
              <button 
                v-if="item === '个人中心'" 
                @click="handleNavClick('/profile')"
                class="footer-item footer-link footer-button"
              >
                {{ item }}
              </button>
              <button 
                v-else-if="item === '我的订单'" 
                @click="handleNavClick('/profile/orders')"
                class="footer-item footer-link footer-button"
              >
                {{ item }}
              </button>

              <NuxtLink 
                v-else-if="item === '社区帮助'" 
                to="/community" 
                class="footer-item footer-link"
              >
                {{ item }}
              </NuxtLink>
              <NuxtLink 
                v-else-if="item === '隐私政策'" 
                to="/privacy" 
                class="footer-item footer-link"
              >
                {{ item }}
              </NuxtLink>
              <NuxtLink 
                v-else-if="item === '用户协议'" 
                to="/policy" 
                class="footer-item footer-link"
              >
                {{ item }}
              </NuxtLink>
              <NuxtLink 
                v-else-if="item === '退款政策'" 
                to="/refund" 
                class="footer-item footer-link"
              >
                {{ item }}
              </NuxtLink>
              <NuxtLink 
                v-else-if="item === '免责声明'" 
                to="/disclaimer" 
                class="footer-item footer-link"
              >
                {{ item }}
              </NuxtLink>
              <NuxtLink 
                v-else-if="item === '公司简介'" 
                to="/company" 
                class="footer-item footer-link"
              >
                {{ item }}
              </NuxtLink>
              <NuxtLink 
                v-else-if="item === '我们的使命'" 
                to="/about-us" 
                class="footer-item footer-link"
              >
                {{ item }}
              </NuxtLink>
              <NuxtLink 
                v-else-if="item === '我们的优势'" 
                to="/advantages" 
                class="footer-item footer-link"
              >
                {{ item }}
              </NuxtLink>
              <NuxtLink 
                v-else-if="item === '常见问题'" 
                to="/faq" 
                class="footer-item footer-link"
              >
                {{ item }}
              </NuxtLink>
              <button 
                v-else-if="item === '加入我们'" 
                @click="navigateTo('/join-us')" 
                class="footer-item footer-link footer-button"
              >
                {{ item }}
              </button>
              <button 
                v-else-if="item === '联系我们'" 
                @click="openContactModal" 
                class="footer-item footer-link footer-button"
              >
                {{ item }}
              </button>
              <div v-else class="footer-item">{{ item }}</div>
            </template>
          </div>
          <div v-if="col.icons" class="footer-icons">
            <span v-for="icon in col.icons" :key="icon.label" class="footer-icon">
              <el-icon :size="20"><component :is="icon.icon" /></el-icon>
            </span>
          </div>
          <div v-if="col.extra && !col.partner" class="footer-extra">{{ col.extra }}</div>
        </div>
      </div>
      <div class="footer-bottom">
        © 2019-2026 凡图拉 | 云南凡图拉科技有限公司 | 滇ICP备 2025060486号-1
      </div>
    </div>
    
    <!-- 加入我们弹窗 (保留备用，目前已改为页面) -->
    <JoinUsModal :visible="showJoinUs" @close="closeJoinUs" />
    
    <!-- 登录注册弹窗 -->
    <LoginRegisterModal :visible="showLoginModal" @close="closeLoginModal" />
    
    <!-- 联系我们弹窗 -->
    <ContactModal :visible="showContactModal" @close="closeContactModal" />
  </footer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/client/user'
import LoginRegisterModal from '@/components/pc/modal/LoginRegisterModal.vue'
import ContactModal from '@/components/pc/modal/ContactModal.vue'
import { ChatDotRound, Platform, Bell, VideoPlay } from '@element-plus/icons-vue'

const showJoinUs = ref(false)
const showLoginModal = ref(false)
const showContactModal = ref(false)
const userStore = useUserStore()

function openJoinUs() {
  showJoinUs.value = true
}

function closeJoinUs() {
  showJoinUs.value = false
}

function openContactModal() {
  showContactModal.value = true
}

function closeContactModal() {
  showContactModal.value = false
}

function closeLoginModal() {
  showLoginModal.value = false
}

// 处理需要登录的导航点击
function handleNavClick(route: string) {
  if (userStore.isLoggedIn) {
    // 已登录，直接跳转
    navigateTo(route)
  } else {
    // 未登录，显示登录弹窗
    showLoginModal.value = true
  }
}

// 监听登录状态变化，登录成功后自动关闭弹窗
watch(() => userStore.isLoggedIn, (newValue) => {
  if (newValue && showLoginModal.value) {
    // 用户登录成功，关闭登录弹窗
    showLoginModal.value = false
  }
})

const cols = [
  {
    title: '关于我们',
    items: ['公司简介', '我们的使命', '我们的优势', '加入我们']
  },
  {
    title: '服务与支持',
    items: ['个人中心', '我的订单', '常见问题', '联系我们']
  },
  {
    title: '条款与政策',
    items: ['隐私政策', '用户协议', '退款政策', '免责声明']
  },
  {
    title: '关注我们',
    extra: '获取最新促销信息和独家优惠',
    icons: [
      { label: '微信', icon: ChatDotRound },
      { label: '微博', icon: Platform },
      { label: '订阅', icon: Bell },
      { label: '抖音', icon: VideoPlay }
    ],
    partner: false
  }
]
</script>

<style scoped>
.footer-root {
  width: 100%; /* Fix: Remove 1920px hardcode */
  background: transparent !important;
  border-radius: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
}

.footer-bg {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
}

.footer-cols {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 20px;
}

.footer-col {
  flex: 1;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-title {
  font-family: system-ui, sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #F1F5F9; /* Theme Title */
  line-height: 24px;
  margin-bottom: 8px;
  position: relative;
}

.footer-underline {
  width: 30px;
  height: 2px;
  background: var(--active-orange); /* Theme Color */
  border-radius: 2px;
  margin-bottom: 16px;
}

.footer-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-item {
  font-family: system-ui, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #94A3B8; /* Theme Sub Text */
  line-height: 24px;
  text-align: left;
}

.footer-link {
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.footer-link:hover {
  color: var(--active-orange);
  transform: translateX(3px);
}

.footer-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
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
}

.footer-icon:hover {
  background: var(--active-orange);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.footer-partner-block {
  margin-top: 32px;
}

.footer-partner-list {
  font-size: 14px;
  color: #64748B;
  margin-top: 8px;
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

.app-footer {
  margin-top: auto;
  flex-shrink: 0;
  background: rgba(15, 23, 42, 0.4) !important; /* Semi-transparent base */
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255,255,255,0.05);
}
</style>