<template>
  <div class="pc-glass-page">

    <!-- 页面内容区域 -->
    <div class="pc-glass-content-a">
              <div class="pc-glass-container">
          <div class="pc-glass-header-a">
            <h1 class="pc-glass-title">关于我们</h1>
            <h2 class="pc-glass-desc-a">我们的使命</h2>
          </div>
          
          <div class="content-section">
            <div class="mission-section">
              <h3 class="pc-glass-section-title">我们的使命</h3>
              <div class="section-content">
                <p class="pc-glass-paragraph">
                  在全球数字化浪潮推动下，人们对跨境数字权益与订阅服务的需求日益增长，而服务渠道、平台限制、地域门槛却仍然存在。凡图拉的使命，就是要打破这些壁垒，让数字服务权益触手可及、轻松获取。我们致力于打造一个安全、灵活、无需实名即可使用的数字化服务平台，帮助用户轻松获取海外订阅、虚拟会员权益、礼品卡与数字化技术支持。无论你身处何地，只需注册邮箱账户，即可进入一个稳定高效的虚拟服务生态。未来，我们希望成为华语用户首选的全球数字权益服务平台，让每一次服务订阅、每一张礼品卡、每一次权益兑换，都变得简单可靠、有温度。
                </p>
              </div>
            </div>
            
            <div class="advantages-section">
              <h3 class="section-title">我们的优势</h3>
              <div class="advantages-list">
                <div class="advantage-item">
                  <div class="advantage-icon">💎</div>
                  <div class="advantage-content">
                    <h4 class="advantage-title">五年以上稳定运营经验</h4>
                    <p class="advantage-desc">
                      自2019年起稳步发展，凡图拉拥有成熟的运营体系和用户信任基础，是市场中为数不多持续运营超过五年的数字化服务平台。
                    </p>
                  </div>
                </div>
                
                <div class="advantage-item">
                  <div class="advantage-icon">💎</div>
                  <div class="advantage-content">
                    <h4 class="advantage-title">极简账户机制，无需实名注册</h4>
                    <p class="advantage-desc">
                      平台仅需邮箱注册登录，无需手机号、无需实名验证，轻松开启安全便捷的服务体验，深受用户欢迎。
                    </p>
                  </div>
                </div>
                
                <div class="advantage-item">
                  <div class="advantage-icon">💎</div>
                  <div class="advantage-content">
                    <h4 class="advantage-title">支持多种订阅方式与售后保障</h4>
                    <p class="advantage-desc">
                      支持多种主流便捷的数字化订阅/兑换方式，支持平台服务额度返还（不具备货币兑换或转账功能），满足灵活的用户场景。
                    </p>
                  </div>
                </div>
                
                <div class="advantage-item">
                  <div class="advantage-icon">💎</div>
                  <div class="advantage-content">
                    <h4 class="advantage-title">权益订阅+礼品卡+通用权益卡 多业务融合</h4>
                    <p class="advantage-desc">
                      从数字化权益服务业务出发，逐步拓展至麦当劳、Netflix 等主流平台的权益包发售，以及通用权益卡服务，打造多元化数字服务生态。
                    </p>
                  </div>
                </div>
                
                <div class="advantage-item">
                  <div class="advantage-icon">💎</div>
                  <div class="advantage-content">
                    <h4 class="advantage-title">自动交付+双线售后体系</h4>
                    <p class="advantage-desc">
                      平台支持自动交付系统，并提供微信、Telegram、WhatsApp 客服支持，实现全天候响应与人工售后处理。
                    </p>
                  </div>
                </div>
                
                <div class="advantage-item">
                  <div class="advantage-icon">💎</div>
                  <div class="advantage-content">
                    <h4 class="advantage-title">品牌定位清晰且合规意识强</h4>
                    <p class="advantage-desc">
                      商品页面均采用合规化展示方式，规避高风险描述与敏感内容，确保平台在运营中的长期稳定性与可持续性。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>


  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import AppHeader from '@/components/pc/AppHeader.vue'
// SEO配置
useHead({
  title: '关于我们 - 凡图拉',
  meta: [
    { name: 'description', content: '了解凡图拉的使命愿景和核心优势，我们致力于为用户提供优质服务。' },
    { name: 'keywords', content: '凡图拉,关于我们,我们的使命,我们的优势,企业愿景' }
  ]
})
</script>

<style scoped>
/* Specific Styles */
.content-section {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

/* Mission Section - Blue Tint Glass */
.mission-section {
  background: rgba(59, 130, 246, 0.1);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(96, 165, 250, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.advantages-section {
  background: rgba(15, 23, 42, 0.4);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.section-content {
  margin-top: 20px;
}

.advantages-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); /* Grid layout */
  gap: 20px;
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.advantage-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.advantage-icon {
  font-size: 24px;
  min-width: 32px;
  height: 32px;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(96, 165, 250, 0.1);
  border-radius: 8px;
}

.advantage-content {
  flex: 1;
}

.advantage-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #60A5FA; /* Blue-400 */
  margin: 0 0 10px 0;
}

.advantage-desc {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #94A3B8; /* Slate-400 */
  line-height: 1.6;
  margin: 0;
  text-align: justify;
  text-justify: inter-ideograph;
}
</style> 