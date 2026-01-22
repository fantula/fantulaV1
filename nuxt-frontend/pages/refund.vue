<template>
  <div class="refund-page">

    <!-- 页面内容 -->
    
    <div class="refund-content">
      <div class="refund-header">
        <div class="refund-header-title">退款与售后政策</div>
        <div class="refund-header-desc">本政策适用于本平台所售数字商品的退款、售后处理与服务说明</div>
      </div>
      
      <div class="refund-body">
        <div class="refund-panel">
          <div class="panel-content">
            <!-- 政策说明板块 -->
            <div class="policy-section">
              <div class="section-header">
                <div class="section-icon"><el-icon><Document /></el-icon></div>
                <div class="section-title">政策说明</div>
              </div>
              <div class="section-content">
                <div class="welcome-text">
                  欢迎您使用凡图拉平台。本政策适用于本平台所售数字商品（包括但不限于各类会员订阅、礼品卡、虚拟产品代充服务等）的退款、售后处理与服务说明。
                </div>
                <div class="highlight-notice">
                  请仔细阅读以下条款，在您购买商品时即表示您已同意本政策的所有内容。
                </div>
              </div>
            </div>

            <!-- 退款规则板块 -->
            <div class="policy-section">
              <div class="section-header">
                <div class="section-icon"><el-icon><Money /></el-icon></div>
                <div class="section-title">一、退款规则</div>
              </div>
              <div class="section-content">
                <div class="rule-item main-rule">
                  <div class="rule-dot"></div>
                  <div class="rule-text">凡图拉平台所售商品一律为虚拟数字商品，一经发货视为服务完成，不支持无理由退款或退货。</div>
                </div>
                
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">如遇下列情况，平台可支持退款：</div>
                </div>
                
                <div class="sub-rules">
                  <div class="sub-rule-item">
                    <span class="sub-rule-dot">-</span>
                    <span class="sub-rule-text">商品未能成功交付，或因平台操作问题导致下单失败；</span>
                  </div>
                  <div class="sub-rule-item">
                    <span class="sub-rule-dot">-</span>
                    <span class="sub-rule-text">商品未使用，且平台在核验后确认符合退款条件；</span>
                  </div>
                </div>
                
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">所有退款将以平台「钱包余额」形式退回，不支持原路退回或提现。</div>
                </div>
                
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">平台钱包余额可继续用于购买本平台商品，不具备法币提现功能。</div>
                </div>
              </div>
            </div>

            <!-- 申请流程板块 -->
            <div class="policy-section">
              <div class="section-header">
                <div class="section-icon"><el-icon><Guide /></el-icon></div>
                <div class="section-title">二、申请流程</div>
              </div>
              <div class="section-content">
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">用户可在订单页面点击申请售后，或通过客服提交问题描述和订单信息；</div>
                </div>
                
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">平台将在1-3个工作日内审核并给予答复，如通过审核将直接退回钱包余额；</div>
                </div>
                
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">若申请被驳回，用户仍可继续通过人工客服申诉一次。</div>
                </div>
              </div>
            </div>

            <!-- 售后支持板块 -->
            <div class="policy-section">
              <div class="section-header">
                <div class="section-icon"><el-icon><Service /></el-icon></div>
                <div class="section-title">三、售后支持</div>
              </div>
              <div class="section-content">
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">国内客服渠道：微信客服</div>
                </div>
                
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">海外客服（待上线）：Telegram / WhatsApp</div>
                </div>
                
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">服务时间：9:00 - 22:00（北京时间），节假日可能顺延</div>
                </div>
              </div>
            </div>

            <!-- 平台责任范围板块 -->
            <div class="policy-section">
              <div class="section-header">
                <div class="section-icon"><el-icon><Warning /></el-icon></div>
                <div class="section-title">四、平台责任范围</div>
              </div>
              <div class="section-content">
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">平台为第三方中介平台，代购服务完成后若因目标服务商（如会员平台）封禁、拒绝登录、地区限制等问题导致无法使用，平台将尽力协助申诉，但不承担责任赔偿或再次补发义务。</div>
                </div>
                
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">用户因账号自身问题、填错信息、误操作、遗失登录方式等，导致商品失效的，平台不予退款。</div>
                </div>
                
                <div class="rule-item">
                  <div class="rule-dot"></div>
                  <div class="rule-text">虚拟商品价格可能因汇率、地区限制、官方定价变动随时调整，用户应以下单时价格为准。</div>
                </div>
                
                <div class="important-disclaimer">
                  <div class="disclaimer-title">重要免责声明</div>
                  <div class="disclaimer-text">
                    凡图拉平台作为中介服务商，仅提供代购服务，不直接提供数字商品内容。所有商品内容由目标服务商提供，平台不承担因目标服务商政策变更、服务中断等导致的损失。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 重要提示板块 -->
      <div class="important-notice-section">
        <div class="notice-container">
          <div class="notice-header">
            <div class="notice-icon"><el-icon><InfoFilled /></el-icon></div>
            <div class="notice-title">重要提示</div>
          </div>
          <div class="notice-content">
            请在购买前仔细阅读本政策，如有疑问请联系客服咨询。购买即表示您已理解并同意本政策的所有条款。本政策可能不定期更新，请定期查阅最新版本。
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
import { Document, Money, Guide, Service, Warning, InfoFilled } from '@element-plus/icons-vue'

const modal = useModalStore()

// SEO配置
useHead({
  title: '退款与售后政策 - 凡图拉',
  meta: [
    { name: 'description', content: '凡图拉退款与售后政策，了解数字商品退款规则和服务说明。' }
  ]
})
</script>

<style scoped>
/* Dark Aurora Theme Styles */
.refund-page {
  min-height: 100vh;
  /* Transparent to reveal global particle sky */
  background: transparent;
  display: flex;
  flex-direction: column;
}

.refund-content {
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

.refund-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
}

.refund-header-title {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 700;
  /* Blue-Orange Gradient */
  background: linear-gradient(135deg, #60A5FA 0%, #F97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  text-align: center;
  text-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
}

.refund-header-desc {
  font-size: 16px;
  color: #94A3B8; /* Slate-400 */
  text-align: center;
  line-height: 1.6;
}

.refund-body {
  display: flex;
  justify-content: center;
  width: 100%;
}

.refund-panel {
  width: 100%;
  max-width: 900px;
  /* Dark Glass Card */
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}

.panel-content {
  padding: 40px;
}

.policy-section {
  background: rgba(15, 23, 42, 0.4);
  border-radius: 12px;
  padding: 0;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.policy-section:last-child {
  margin-bottom: 0;
}

.section-header {
  width: 100%;
  height: auto;
  min-height: 80px;
  /* Blue Gradient Header */
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 0;
  padding: 20px 30px;
  box-sizing: border-box;
}

.section-icon {
  width: 50px;
  height: 50px;
  background: rgba(96, 165, 250, 0.1);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  flex-shrink: 0;
}

.section-icon .el-icon {
  font-size: 24px;
  color: #60A5FA;
}

.section-title {
  flex: 1;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #60A5FA; /* Blue-400 */
  line-height: 1.2;
}

.section-content {
  padding: 30px;
  background: transparent;
}

.welcome-text {
  font-size: 16px;
  color: #CBD5E1; /* Slate-300 */
  line-height: 1.8;
  margin-bottom: 20px;
}

.highlight-notice {
  background: rgba(245, 158, 11, 0.1); /* Amber Tint */
  border-left: 4px solid #F59E0B; /* Amber-500 */
  padding: 12px 16px;
  font-size: 14px;
  color: #fbbf24; /* Amber-400 */
  border-radius: 4px;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 1.7;
}

.rule-item.main-rule {
  font-weight: 600;
  color: #F8FAFC; /* Slate-50 */
}

.rule-dot {
  width: 8px;
  height: 8px;
  background: #60A5FA; /* Blue-400 */
  border-radius: 50%;
  margin-right: 12px;
  margin-top: 8px;
  flex-shrink: 0;
}

.rule-text {
  color: #CBD5E1; /* Slate-300 */
  flex: 1;
}

.sub-rules {
  margin-left: 20px;
  margin-bottom: 16px;
}

.sub-rule-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  font-size: 15px;
  line-height: 1.6;
}

.sub-rule-dot {
  color: #EF4444; /* Red-500 */
  font-weight: bold;
  margin-right: 8px;
  margin-top: 2px;
  flex-shrink: 0;
}

.sub-rule-text {
  color: #94A3B8; /* Slate-400 */
  flex: 1;
}

.important-disclaimer {
  background: rgba(239, 68, 68, 0.1); /* Red Tint */
  border-left: 4px solid #EF4444; /* Red-500 */
  border-radius: 4px;
  padding: 16px 20px;
  margin-top: 24px;
}

.disclaimer-title {
  font-size: 16px;
  font-weight: bold;
  color: #F87171; /* Red-400 */
  margin-bottom: 8px;
}

.disclaimer-text {
  font-size: 14px;
  color: #CBD5E1;
  line-height: 1.6;
}

.important-notice-section {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.notice-container {
  width: 100%;
  max-width: 900px;
  /* Blue-Indigo Gradient */
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(79, 70, 229, 0.9) 100%);
  border-radius: 16px;
  padding: 32px;
  color: white;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.notice-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.notice-icon {
  font-size: 28px;
  margin-right: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notice-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.notice-content {
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
}

@media (max-width: 768px) {
  .refund-content {
    padding: 20px 16px;
  }
  
  .panel-content {
    padding: 24px;
  }
  
  .section-header {
    height: auto;
    min-height: 80px;
    padding: 20px 24px;
  }
  
  .section-content {
    padding: 24px;
  }
  
  .refund-header-title {
    font-size: 24px;
  }
  
  .notice-container {
    padding: 24px;
  }
  
  .notice-title {
    font-size: 20px;
  }
  
  .notice-content {
    font-size: 14px;
  }
}
</style>