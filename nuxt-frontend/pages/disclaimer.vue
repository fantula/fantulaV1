<template>
  <div class="disclaimer-page">

    <!-- 页面内容 -->
    
    <div class="disclaimer-content">
      <div class="disclaimer-header">
        <div class="disclaimer-header-title">凡图拉免责声明</div>
        <div class="disclaimer-header-desc">本声明明确了凡图拉平台的服务性质、责任范围及用户权益，请在使用服务前仔细阅读</div>
      </div>
      
      <div class="disclaimer-body">
        <div class="disclaimer-panel">
          <div class="disclaimer-container">
            <div class="panel-content">

              <div class="disclaimer-statement">
                凡图拉平台所展示的所有商品内容（包括但不限于商品名称、图片、说明等）<strong>仅为描述服务功能使用</strong>，不代表平台拥有相关商标、授权或与品牌方存在任何合作关系。
              </div>
              
              <div class="disclaimer-section">
                <div class="disclaimer-section-title">
                  <div class="section-icon">一</div>
                  <span class="disclaimer-section-title-text">服务性质说明</span>
                </div>
                <div class="disclaimer-section-content">
                  <div class="disclaimer-section-item">本平台所提供的充值服务、礼品卡、会员服务，均为第三方代购代付性质，商品来源于平台根据用户需求代理购买的结果。</div>
                  <div class="disclaimer-section-quote">平台仅作为服务中介，不直接提供或生产所购商品。</div>
                </div>
              </div>

              <div class="disclaimer-section">
                <div class="disclaimer-section-title">
                  <div class="section-icon">二</div>
                  <span class="disclaimer-section-title-text">售后服务范围</span>
                </div>
                <div class="disclaimer-section-content">
                  <div class="disclaimer-section-item">平台不参与所涉商品内容的生产、管理、售后维护，也无法代表该品牌进行售后处理。</div>
                  <div class="disclaimer-section-quote">品牌相关售后问题请直接联系原品牌方。</div>
                </div>
              </div>

              <div class="disclaimer-section">
                <div class="disclaimer-section-title">
                  <div class="section-icon">三</div>
                  <span class="disclaimer-section-title-text">知识产权声明</span>
                </div>
                <div class="disclaimer-section-content">
                  <div class="disclaimer-section-item">平台展示的任何品牌标识、商标、图像仅为服务识别之用，所有权归属于原品牌方。</div>
                  <div class="disclaimer-section-item">如任何权利人对内容使用有异议，可联系我们申请处理。</div>
                  <div class="disclaimer-section-quote">知识产权侵权投诉渠道：legal@fantula.com</div>
                </div>
              </div>

              <div class="disclaimer-section">
                <div class="disclaimer-section-title">
                  <div class="section-icon">四</div>
                  <span class="disclaimer-section-title-text">使用风险提示</span>
                </div>
                <div class="disclaimer-section-content">
                  <div class="disclaimer-section-item">因使用本平台服务而产生的因服务商政策变动、内容限制、地区封锁、账号禁用等风险，由用户自行承担，平台将尽力协助处理但不承诺赔偿责任。</div>
                  <div class="disclaimer-section-quote">平台会提供必要的技术支持，但无法保证第三方服务的稳定性。</div>
                </div>
              </div>

              <div class="disclaimer-section">
                <div class="disclaimer-section-title">
                  <div class="section-icon">五</div>
                  <span class="disclaimer-section-title-text">用户责任确认</span>
                </div>
                <div class="disclaimer-section-content">
                  <div class="disclaimer-section-item">用户在下单前应充分知晓所购商品为数字虚拟产品，具备不可撤销、不可逆、无法转售等特性，并完全同意本免责声明内容后进行使用。</div>
                  <div class="disclaimer-section-quote">点击"同意并继续"即表示您已阅读并接受本免责声明所有条款。</div>
                </div>
              </div>

              <div class="help-card">
                <div class="help-card-title">需要进一步帮助?</div>
                <div class="help-card-desc">如果您对本免责声明有任何疑问，或需要澄清某些条款，请联系我们的法律部门。</div>
                <div class="help-card-button">
                  <button class="contact-legal-btn">
                    <span class="btn-icon">📞</span>
                    联系法律部门
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <LoginRegisterModal :visible="modal.showLogin" @close="modal.closeLogin()" />
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal'
import AppHeader from '@/components/AppHeader.vue'
const modal = useModalStore()

useHead({
  title: '免责声明 - 凡图拉',
  meta: [
    { name: 'description', content: '凡图拉免责声明，了解平台责任范围和使用风险。' }
  ]
})
</script>

<style scoped>
/* Dark Aurora Theme Styles */
.disclaimer-page {
  min-height: 100vh;
  /* Transparent to reveal global particle sky */
  background: transparent;
  display: flex;
  flex-direction: column;
}

.disclaimer-content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.disclaimer-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
}

.disclaimer-header-title {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 700;
  /* Blue-Orange Gradient */
  background: linear-gradient(135deg, #60A5FA 0%, #F97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  text-align: center;
}

.disclaimer-header-desc {
  font-size: 16px;
  color: #94A3B8; /* Slate-400 */
  text-align: center;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  white-space: nowrap;
}

.disclaimer-body {
  display: flex;
  justify-content: center;
  width: 100%;
}

.disclaimer-panel {
  width: 90%;
  max-width: 800px;
  /* Dark Glass Card */
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.disclaimer-container {
  border-left: 4px solid #60A5FA; /* Blue-400 */
  padding: 32px;
  padding-left: 36px;
  background: rgba(15, 23, 42, 0.3); /* Inner darken */
  border-radius: 0 24px 24px 0;
}

.panel-content {
  padding: 0;
}

.disclaimer-statement {
  color: #E2E8F0; /* Slate-200 */
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 32px;
  padding: 24px;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.disclaimer-statement strong {
  color: #60A5FA;
  font-weight: bold;
}

.disclaimer-section {
  margin-bottom: 32px;
}

.disclaimer-section-title {
  color: #60A5FA;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  padding-left: 0;
  display: flex;
  align-items: center;
}

.disclaimer-section-title-text {
  flex: 1;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #60A5FA; /* Blue-400 */
  line-height: 1.2;
}

.section-icon {
  width: 32px;
  height: 32px;
  background: rgba(96, 165, 250, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60A5FA;
  font-size: 14px;
  font-weight: bold;
  margin-right: 12px;
}

.disclaimer-section-item {
  font-size: 15px;
  color: #CBD5E1; /* Slate-300 */
  line-height: 1.8;
  margin-bottom: 8px;
  padding-left: 8px;
}

.disclaimer-section-content {
  padding-left: 24px;
}

.disclaimer-section-quote {
  background: rgba(255, 255, 255, 0.05);
  border-left: 4px solid #64748B; /* Slate-500 */
  padding: 12px 16px;
  font-size: 14px;
  color: #94A3B8; /* Slate-400 */
  line-height: 1.8;
  margin: 12px 0;
  border-radius: 0 4px 4px 0;
}

.help-card {
  /* Blue-Indigo Gradient */
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(79, 70, 229, 0.8) 100%);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  color: white;
  margin: 32px 0 0 0;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.help-card-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
}

.help-card-desc {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
  line-height: 1.6;
}

.help-card-button {
  margin-top: 16px;
}

.contact-legal-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.contact-legal-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.btn-icon {
  margin-right: 8px;
  font-size: 18px;
}
</style>