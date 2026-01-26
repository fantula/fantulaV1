<template>
  <section class="about-section">
    <div class="about-bg">
      <div class="about-title">关于我们</div>
      <div class="about-subtitle">提供高品质优质服务</div>
      <div class="about-cards">
        <div class="about-card" v-for="item in cards" :key="item.title">
          <div class="about-icon">
            <el-icon :size="48"><component :is="item.icon" /></el-icon>
          </div>
          <div class="about-card-title">{{ item.title }}</div>
          <div class="about-card-desc">{{ item.desc }}</div>
        </div>
      </div>
      <button class="about-more-btn" @click="navigateTo('/faq')">查看更多 →</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Monitor, Service, Trophy, Share } from '@element-plus/icons-vue'

const cards = [
  {
    icon: Monitor, // Team -> Monitor/Screen
    title: '大团队开发',
    desc: '所有商品均为团队开发，品质保障'
  },
  {
    icon: Service, // Service -> Headset/Service
    title: '人工客服服务',
    desc: '提供完善的售后服务，购物无忧'
  },
  {
    icon: Trophy, // Platform -> Trophy/Medal
    title: '大平台更放心',
    desc: '十年开发经验，服务千万用户'
  },
  {
    icon: Share, // Network -> Share/Connection
    title: '全网矩阵',
    desc: '覆盖全国平台，快速送达'
  }
]
</script>


<style scoped>
.about-section {
  width: 100%; /* Fix: Remove 1920px hardcode */
  background: transparent !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.about-bg {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-title {
  font-size: 32px;
  font-weight: bold;
  color: #F8FAFC; /* Theme Light Text */
  margin-bottom: 8px;
  text-align: center;
}

.about-subtitle {
  font-size: 16px;
  color: #94A3B8; /* Theme Sub Text */
  margin-bottom: 48px;
  text-align: center;
}

.about-cards {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap; /* Responsive */
  margin-bottom: 48px;
  width: 100%;
}

.about-card {
  width: 260px;
  /* Background managed by global theme (Glass) */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  transition: all 0.3s;
}

/* Icons are styled by parent color, handled by global theme or here */
.about-icon {
  margin-bottom: 20px;
  color: var(--primary-blue); /* Use Global Theme Color */
  transition: all 0.3s;
}

.about-card:hover .about-icon {
  color: var(--active-orange);
  transform: scale(1.1);
}

.about-card-title {
  font-size: 18px;
  font-weight: bold;
  color: #F1F5F9;
  margin-bottom: 10px;
  text-align: center;
}

.about-card-desc {
  font-size: 14px;
  color: #94A3B8;
  text-align: center;
  line-height: 1.5;
}

.about-more-btn {
  margin-top: 0;
  width: 160px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.2);
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.about-more-btn:hover {
  background: var(--active-orange);
  border-color: var(--active-orange);
  transform: translateY(-2px);
}
</style> 