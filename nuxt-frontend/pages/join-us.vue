<template>
  <div class="join-us-page">
    <div class="page-content">
      <div class="content-container">
        
        <!-- Header -->
        <div class="header-section">
          <h1 class="main-title">招贤纳士</h1>
          <h2 class="sub-title">加入凡图拉，共同构建全球化的数字权益服务生态</h2>
        </div>

        <!-- Intro -->
        <div class="intro-section">
          <p class="intro-text">
            凡图拉正在寻找充满激情、富有创新精神的伙伴。我们是一个推崇“远程优先、结果导向”的数字化团队。在这里，没有复杂的办公室政治，只有对卓越服务的共同追求。如果你对全球互联网服务、数字化产品感兴趣，渴望在一个自由开放的氛围中工作，欢迎加入我们。
          </p>
        </div>

        <!-- Values Grid -->
        <div class="values-grid">
          <div class="value-item">
            <div class="value-icon"><el-icon><Monitor /></el-icon></div>
            <div class="value-info">
              <h3>远程协作</h3>
              <p>100% 远程办公文化，灵活安排时间，让工作与生活完美平衡。</p>
            </div>
          </div>
          <div class="value-item">
            <div class="value-icon"><el-icon><Flag /></el-icon></div>
            <div class="value-info">
              <h3>全球视野</h3>
              <p>接触全球前沿的数字权益产品，拓展国际化的互联网视野。</p>
            </div>
          </div>
          <div class="value-item">
            <div class="value-icon"><el-icon><UserFilled /></el-icon></div>
            <div class="value-info">
              <h3>用户至上</h3>
              <p>我们用心服务每一位用户，每一份反馈都值得被认真对待。</p>
            </div>
          </div>
        </div>

        <!-- Open Positions -->
        <div class="positions-section">
          <h3 class="section-title">开放职位</h3>
          
          <!-- Position 1 -->
          <div class="position-card">
            <div class="pos-header">
              <div class="pos-info">
                <h4 class="pos-title">数字化服务专员 (客服方向)</h4>
                <div class="pos-tags">
                  <span class="tag">远程办公</span>
                  <span class="tag">全职/兼职</span>
                  <span class="tag">急聘</span>
                </div>
              </div>
              <div class="pos-action">
                <a href="mailto:hr@fantula.com?subject=应聘-数字化服务专员" class="apply-btn">投递简历</a>
              </div>
            </div>
            <div class="pos-desc">
              <p><strong>岗位职责：</strong></p>
              <ul>
                <li>通过在线工单系统（WeChat/Telegram）回复用户关于权益订阅、兑换流程的咨询；</li>
                <li>协助用户解决订单交付中的异常问题，维护良好的用户满意度；</li>
                <li>收集由于服务商政策调整带来的常见问题，反馈给运营团队。</li>
              </ul>
              <p><strong>任职要求：</strong></p>
              <ul>
                <li>熟悉主流互联网产品（如 Netflix, Spotify 等）的订阅机制；</li>
                <li>具备良好的沟通耐心和服务意识，中英文读写流利者优先；</li>
                <li>有稳定的网络环境与电脑设备。</li>
              </ul>
            </div>
          </div>

          <!-- Position 2 -->
          <div class="position-card">
            <div class="pos-header">
              <div class="pos-info">
                <h4 class="pos-title">数字权益运营专员</h4>
                <div class="pos-tags">
                  <span class="tag">远程办公</span>
                  <span class="tag">全职</span>
                </div>
              </div>
              <div class="pos-action">
                <a href="mailto:hr@fantula.com?subject=应聘-数字权益运营" class="apply-btn">投递简历</a>
              </div>
            </div>
            <div class="pos-desc">
              <p><strong>岗位职责：</strong></p>
              <ul>
                <li>负责拓展与维护全球数字权益供应商关系，确保供应链稳定；</li>
                <li>监控各类权益商品的市场价格波动与库存情况，及时调整上架策略；</li>
                <li>优化自动化交付流程，协同技术团队降低订单失败率。</li>
              </ul>
              <p><strong>任职要求：</strong></p>
              <ul>
                <li>对数字虚拟商品行业有敏锐的洞察力；</li>
                <li>具备数据分析能力，能根据销售数据优化选品策略；</li>
                <li>严谨细致，具有较强的风险合规意识。</li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Contact HR -->
        <div class="hr-contact">
          <p>更多职位正在开放中，如果您认为自己足够优秀，欢迎直接发送简历至</p>
          <a href="mailto:hr@fantula.com" class="hr-email">hr@fantula.com</a>
          <p class="hr-tip">邮件标题请注明：姓名+应聘岗位</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Flag, UserFilled } from '@element-plus/icons-vue'

useHead({
  title: '招贤纳士 - 凡图拉',
  meta: [
    { name: 'description', content: '加入凡图拉，探索全球数字化权益服务。远程办公，全球视野，期待您的加入。' }
  ]
})
</script>

<style scoped>
/* Dark Aurora Theme Consistency */
.join-us-page {
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  width: 100%;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
}

.content-container {
  width: 100%;
  max-width: 1100px; /* Slightly narrower for reading */
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 60px 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 50px;
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
}

.sub-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  color: #94A3B8;
  font-weight: 400;
  margin: 0;
}

.intro-section {
  text-align: center;
  margin-bottom: 60px;
  max-width: 800px;
  align-self: center;
}

.intro-text {
  font-size: 16px;
  color: #CBD5E1;
  line-height: 1.8;
}

/* Values Grid */
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.value-item {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.value-item:hover {
  transform: translateY(-5px);
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(96, 165, 250, 0.3);
}

.value-icon {
  width: 50px;
  height: 50px;
  background: rgba(96, 165, 250, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #60A5FA;
}

.value-info h3 {
  font-size: 18px;
  color: #F8FAFC;
  margin: 0 0 10px 0;
}

.value-info p {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.6;
  margin: 0;
}

/* Positions */
.positions-section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 24px;
  color: #E2E8F0;
  margin-bottom: 30px;
  border-left: 4px solid #F97316;
  padding-left: 15px;
  font-weight: 600;
}

.position-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.position-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(96, 165, 250, 0.3);
}

.pos-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 20px;
}

.pos-title {
  font-size: 20px;
  color: #60A5FA;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.pos-tags {
  display: flex;
  gap: 10px;
}

.tag {
  font-size: 12px;
  background: rgba(96, 165, 250, 0.1);
  color: #93C5FD;
  padding: 4px 10px;
  border-radius: 4px;
}

.apply-btn {
  background: transparent;
  border: 1px solid #F97316;
  color: #F97316;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 14px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.apply-btn:hover {
  background: #F97316;
  color: white;
}

.pos-desc {
  font-size: 15px;
  color: #CBD5E1;
  line-height: 1.8;
}

.pos-desc strong {
  color: #E2E8F0;
  display: block;
  margin-bottom: 8px;
  margin-top: 15px;
}

.pos-desc ul {
  padding-left: 20px;
  margin: 0;
}

.pos-desc li {
  margin-bottom: 6px;
}

/* Contact HR */
.hr-contact {
  text-align: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.hr-contact p {
  color: #94A3B8;
  margin-bottom: 12px;
}

.hr-email {
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
  color: #60A5FA;
  text-decoration: none;
  margin-bottom: 12px;
}

.hr-tip {
  font-size: 13px !important;
  color: #64748B !important;
  margin-bottom: 0 !important;
}

@media (max-width: 768px) {
  .content-container {
    padding: 30px 20px;
  }
}
</style>
