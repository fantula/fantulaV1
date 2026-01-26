<template>
  <div class="advantages-page">
    <div class="page-content">
      <div class="content-container">
        <div class="header-section">
          <h1 class="main-title">我们的核心优势</h1>
          <h2 class="sub-title">为何选择凡图拉？五大维度重新定义数字化权益体验</h2>
        </div>
        
        <div class="cards-grid">
          <!-- Card 1 -->
          <div class="advantage-card">
            <div class="card-icon-wrapper">
              <el-icon><Lock /></el-icon>
            </div>
            <h3 class="card-title">合规稳健的运营体系</h3>
            <p class="card-desc">
              自 2019 年深耕数字化权益领域，我们建立了成熟的市场运营机制与严格的合规风控体系。凡图拉始终坚持“服务合规、用户至上”的原则，规避金融风险，专注权益交付，为您提供一个长期、稳定、可信赖的服务平台。
            </p>
          </div>

          <!-- Card 2 -->
          <div class="advantage-card">
            <div class="card-icon-wrapper">
              <el-icon><Compass /></el-icon>
            </div>
            <h3 class="card-title">全球化的权益网络</h3>
            <p class="card-desc">
              打破地域限制，链接全球优质数字资源。无论是流媒体订阅、工具软件授权还是游戏权益，凡图拉助您轻松获取全球主流平台的数字化服务，让“数字无国界”成为现实。
            </p>
          </div>

          <!-- Card 3 -->
          <div class="advantage-card">
            <div class="card-icon-wrapper">
              <el-icon><User /></el-icon>
            </div>
            <h3 class="card-title">极简的无障碍体验</h3>
            <p class="card-desc">
              摒弃繁琐的实名认证流程，只需一个电子邮箱即可开启服务。我们尊重用户隐私，采用“最小化信息收集”原则，让您在享受便捷订阅服务的同时，无需担忧个人敏感信息泄露。
            </p>
          </div>

          <!-- Card 4 -->
          <div class="advantage-card">
            <div class="card-icon-wrapper">
              <el-icon><Timer /></el-icon>
            </div>
            <h3 class="card-title">专业的自动化交付</h3>
            <p class="card-desc">
              全天候自研自动化交付系统，确保您的权益订阅即时响应。从下单到权益兑换，毫秒级处理流程，告别传统代购的漫长等待，让服务体验如丝般顺滑。
            </p>
          </div>

          <!-- Card 5 -->
          <div class="advantage-card">
            <div class="card-icon-wrapper">
              <el-icon><Service /></el-icon>
            </div>
            <h3 class="card-title">贴心的双语售后保障</h3>
            <p class="card-desc">
              提供中文/英文双语客服支持（微信/Telegram/WhatsApp），配合完善的“服务额度”售后机制。若遇服务不可用，我们提供快速的权益回退保障，让您的每一次订阅都无后顾之忧。
            </p>
          </div>

          <!-- Card 6 -->
          <div class="advantage-card">
            <div class="card-icon-wrapper">
              <el-icon><Link /></el-icon>
            </div>
            <h3 class="card-title">多元化支付与订阅</h3>
            <p class="card-desc">
              兼容主流数字化支付方式，支持灵活的权益组合订阅。无论是个人单次兑换还是团队批量采购，我们都能提供高效、便捷的支付与结算解决方案，满足不同场景需求。
            </p>
          </div>
        </div>

        <div class="cta-section">
          <div class="cta-text">准备好体验更优质的数字服务了吗？</div>
          <NuxtLink to="/register" class="cta-button">立即注册账户</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { Lock, Compass, User, Timer, Service, Link } from '@element-plus/icons-vue'

// SEO Meta
useHead({
  title: '我们的优势 - 凡图拉',
  meta: [
    { name: 'description', content: '凡图拉核心优势：合规运营、全球权益、极简体验、自动交付与双语售后。' }
  ]
})
</script>

<style scoped>
/* Dark Aurora Theme Consistency */
.advantages-page {
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
}

.content-container {
  width: 100%;
  max-width: 1200px;
  /* Glassmorphism base consistent with other pages */
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 60px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 60px;
}

.main-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 42px;
  background: linear-gradient(135deg, #60A5FA 0%, #F97316 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.sub-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #94A3B8;
  margin: 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 30px;
  width: 100%;
  margin-bottom: 60px;
}

.advantage-card {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.advantage-card:hover {
  transform: translateY(-5px);
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(96, 165, 250, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 28px;
  color: #60A5FA;
}

.card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #F1F5F9;
  margin-bottom: 12px;
}

.card-desc {
  font-size: 15px;
  color: #94A3B8;
  line-height: 1.7;
  margin: 0;
  text-align: justify;
}

.cta-section {
  width: 100%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.cta-text {
  font-size: 20px;
  color: #E2E8F0;
  font-weight: 600;
  margin-bottom: 24px;
}

.cta-button {
  display: inline-block;
  padding: 12px 40px;
  background: linear-gradient(135deg, #60A5FA 0%, #F97316 100%);
  border-radius: 30px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
  filter: brightness(1.1);
}

@media (max-width: 768px) {
  .page-content {
    padding: 30px 16px;
  }
  
  .content-container {
    padding: 30px 20px;
  }
  
  .main-title {
    font-size: 32px;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
