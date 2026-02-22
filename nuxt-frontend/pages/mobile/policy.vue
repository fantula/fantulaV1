<template>
  <div class="mobile-page">
    <MobileSubPageHeader title="用户协议" />

    <div class="policy-content">
      <!-- 页面头部 -->
      <div class="policy-header-card">
        <div class="policy-logo-row">
          <img src="/images/shared/logo.png" alt="logo" class="policy-logo" />
          <span class="policy-brand">凡图拉</span>
        </div>
        <div class="policy-main-title">用户协议</div>
        <div class="policy-desc" v-if="currentLang === 'cn'">欢迎使用凡图拉平台服务，请您仔细阅读并充分理解本用户协议的各项条款</div>
        <div class="policy-desc" v-else>Welcome to Ventura Platform! Before using platform services, please carefully read all contents of this agreement.</div>
      </div>

      <!-- 双语切换 Tab -->
      <div class="lang-tabs-wrapper">
        <div class="lang-tabs">
          <div class="lang-tab" :class="{ active: currentLang === 'cn' }" @click="currentLang = 'cn'">中文版 (CN)</div>
          <div class="lang-tab" :class="{ active: currentLang === 'en' }" @click="currentLang = 'en'">English (EN)</div>
        </div>
      </div>

      <!-- 中文版内容 -->
      <div class="policy-card" v-show="currentLang === 'cn'">
        <div class="policy-overview-box">
          <div class="overview-title">服务说明</div>
          <div class="overview-text">
            欢迎您使用凡图拉平台！在您注册成为用户、使用平台服务之前，请您务必仔细阅读、充分理解本协议全部内容，特别是以加粗方式标注的免责、限制责任、用户义务条款。若您不同意本协议内容，或无法准确理解相关条款，请停止使用凡图拉平台。
            <br /><br />
            一旦您注册、登录或使用凡图拉平台，即视为您已阅读、理解并接受本协议的全部内容。
          </div>
        </div>

        <div class="section-title">一、服务说明</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>1.1</strong> 凡图拉平台为用户提供数字权益的订阅、兑换服务，包括但不限于会员订阅兑换、礼品卡兑换、虚拟权益转发等。平台以"礼品卡/权益包"形式对外展示服务，实际服务内容为数字化权益服务协助。</div>
          <div class="section-item"><strong>1.2</strong> 本平台所提供服务并非目标服务商官方渠道，凡图拉为第三方服务平台，所提供服务基于用户自主委托行为完成。</div>
          <div class="section-item"><strong>1.3</strong> 本平台不保证某一权益长期有效或目标服务商政策始终保持不变，如因政策调整导致权益无法使用、价格波动、服务中断等，平台将尽合理范围内协助处理，但不承担由此产生的法律责任。</div>
        </div>

        <div class="section-title">二、用户注册与使用</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>2.1</strong> 用户可通过电子邮箱完成注册流程，注册即视为同意本协议内容。</div>
          <div class="section-item"><strong>2.2</strong> 平台不会收集身份证、手机号、居住地址等敏感信息，亦不提供实名验证功能。</div>
          <div class="section-item"><strong>2.3</strong> 用户账户仅限本人使用。如因用户自行泄露登录信息、误操作等造成损失，平台不承担责任。</div>
          <div class="section-item"><strong>2.4</strong> 用户不得使用平台进行任何违法违规活动，包括但不限于：倒卖账号、洗钱、网络诈骗、传播违法内容等。一经发现，平台有权立即封禁账号并配合司法机关处理。</div>
        </div>

        <div class="section-title">三、服务额度与售后规则</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>3.1</strong> 如需申请售后经平台审核确认后，将退回至用户在平台内的服务额度中。</div>
          <div class="section-item"><strong>3.2</strong> 平台服务额度可用于兑换平台其他服务权益，不支持兑换现金或转账至其他人账户。</div>
          <div class="section-item"><strong>3.3</strong> 平台有权依据权益类型、交付状态决定是否支持返还或部分返还额度。</div>
        </div>

        <div class="section-title">四、售后服务与责任范围</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>4.1</strong> 凡图拉提供国内微信客服，国际将支持 Telegram 或 WhatsApp。</div>
          <div class="section-item"><strong>4.2</strong> 平台协助处理充值失败等问题，但不对目标平台自身政策变动等承担责任。</div>
          <div class="section-item"><strong>4.3</strong> 虚拟商品一经发货即无法退货，若用户提供错误信息导致问题，平台不承担责任。</div>
        </div>

        <div class="section-title">五、知识产权与免责声明</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>5.1</strong> 商标、品牌标识归属原品牌方所有，平台仅作功能识别之用。</div>
          <div class="section-item"><strong>5.2</strong> 平台展示内容不代表授权或官方合作，若权利方认为展示不当，平台将配合处理。</div>
          <div class="section-item"><strong>5.3</strong> 用户下单即视为同意平台为第三方中介，并承担因服务变动带来的使用风险。</div>
        </div>

        <div class="section-title">六、法律适用与争议解决</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>6.1</strong> 本协议适用中华人民共和国法律。</div>
          <div class="section-item"><strong>6.2</strong> 如发生争议，双方应协商解决，协商不成的，由平台所在地人民法院管辖。</div>
          <div class="section-item"><strong>6.3</strong> 凡图拉保留本协议最终解释权及修改权。</div>
        </div>

        <div class="section-title">七、附则</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>7.1</strong> 协议自注册日起生效，平台将通过公告形式更新协议内容。</div>
        </div>
      </div>

      <!-- 英文版内容 -->
      <div class="policy-card" v-show="currentLang === 'en'">
        <div class="policy-overview-box">
          <div class="overview-title">Terms of Service</div>
          <div class="overview-text">
            Welcome to Ventura Platform! Before registering as a user or using platform services, please carefully read and fully understand all contents of this agreement, especially the disclaimer, limitation of liability, and user obligation clauses marked in bold. If you do not agree with the contents of this agreement or cannot accurately understand relevant clauses, please stop using Ventura Platform.
            <br /><br />
            Once you register, log in or use Ventura Platform, you are deemed to have read, understood and accepted all contents of this agreement.
          </div>
        </div>

        <div class="section-title">1. Service Description</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>1.1</strong> Ventura Platform provides users with digital equity subscription and redemption services, including but not limited to membership subscription redemption, gift card redemption, virtual equity forwarding, etc. The platform displays services in the form of "gift cards/equity packages", and the actual service content is digital equity service assistance.</div>
          <div class="section-item"><strong>1.2</strong> The services provided by this platform are not official channels of target service providers. Ventura is a third-party service platform, and the services provided are completed based on users' autonomous entrustment behavior.</div>
          <div class="section-item"><strong>1.3</strong> This platform does not guarantee that a certain equity will be valid for a long time or that the target service provider's policies will remain unchanged. If equities cannot be used, prices fluctuate, services are interrupted, etc. due to policy adjustments, the platform will assist in handling within a reasonable scope, but will not bear legal responsibility arising therefrom.</div>
        </div>

        <div class="section-title">2. User Registration and Usage</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>2.1</strong> Users can complete the registration process through email, and registration is deemed as agreement to the contents of this agreement.</div>
          <div class="section-item"><strong>2.2</strong> The platform will not collect sensitive information such as ID cards, mobile phone numbers, residential addresses, nor provide real-name verification functions.</div>
          <div class="section-item"><strong>2.3</strong> User accounts are limited to personal use only. If losses are caused by users' own disclosure of login information, misoperations, etc., the platform will not bear responsibility.</div>
          <div class="section-item"><strong>2.4</strong> Users shall not use the platform for any illegal activities, including but not limited to: reselling accounts, money laundering, online fraud, spreading illegal content, etc. Once discovered, the platform has the right to immediately ban the account and cooperate with judicial authorities.</div>
        </div>

        <div class="section-title">3. Service Quota & After-Sales Rules</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>3.1</strong> If an after-sales application is approved by the platform, the amount will be returned to the user's service quota on the platform.</div>
          <div class="section-item"><strong>3.2</strong> The platform service quota can be used to redeem other platform service rights, but cannot be exchanged for cash or transferred to other accounts.</div>
          <div class="section-item"><strong>3.3</strong> The platform has the right to determine whether to support a full or partial quota return based on the type of equity and delivery status.</div>
        </div>

        <div class="section-title">4. Responsibility Scope</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>4.1</strong> Ventura provides domestic WeChat customer service, and international support will be provided through Telegram or WhatsApp.</div>
          <div class="section-item"><strong>4.2</strong> The platform assists in handling issues such as failed top-up, but does not bear responsibility for changes in the target platform's policy itself.</div>
          <div class="section-item"><strong>4.3</strong> Virtual goods cannot be returned once shipped. If the user provides incorrect information causing issues, the platform will not bear responsibility.</div>
        </div>

        <div class="section-title">5. Intellectual Property & Disclaimer</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>5.1</strong> The trademarks and brand identifiers belong to the original brand owners, and the platform is used for functional recognition only.</div>
          <div class="section-item"><strong>5.2</strong> The platform content does not represent authorization or official cooperation. If the rights holder believes that the display is inappropriate, the platform will cooperate with processing.</div>
          <div class="section-item"><strong>5.3</strong> Users' placing orders is deemed as agreeing to the platform as a third-party intermediary and accepting the usage risks brought by service changes.</div>
        </div>

        <div class="section-title">6. Law Applicable & Dispute Resolution</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>6.1</strong> This agreement applies to the laws of the People's Republic of China.</div>
          <div class="section-item"><strong>6.2</strong> If disputes arise, both parties should resolve them through consultation. If consultation fails, the court where the platform is located shall have jurisdiction.</div>
          <div class="section-item"><strong>6.3</strong> Ventura reserves the final interpretation and modification rights of this agreement.</div>
        </div>

        <div class="section-title">7. Final Provisions</div>
        <div class="section-divider"></div>
        <div class="section-highlight-box">
          <div class="section-item"><strong>7.1</strong> This agreement takes effect from the date of registration, and the platform will update the agreement content through announcements.</div>
        </div>
      </div>

      <!-- 底部共同区域 -->
      <div class="policy-legal-card">
        <div class="legal-title">法律声明与附则<br /><span>Legal Notice & Appendix</span></div>
        <div class="legal-contact">
          <div class="contact-label">联系我们 Contact Us</div>
          <div class="contact-email">support@fantura.com</div>
        </div>
        <div class="legal-disclaimer">
          本用户协议提供英文翻译版本供参考，若中英文版本存在理解歧义，应以中文版表述为准。<br />
          In case of any discrepancy between the Chinese and English versions, the Chinese version shall prevail.
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'

definePageMeta({
  layout: 'mobile'
})

const currentLang = ref<'cn' | 'en'>('cn')
</script>

<style scoped>
/* §模式1：移动端滚动容器铁律 */
.mobile-page {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: transparent;
}

.policy-content {
  padding: 16px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 页头卡片 */
.policy-header-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
}

.policy-logo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.policy-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.3);
}

.policy-brand {
  font-size: 22px;
  font-weight: bold;
  background: linear-gradient(135deg, var(--color-brand-highlight, #60A5FA) 0%, var(--color-accent, #F97316) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.policy-main-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-primary, #FFFFFF);
  margin-bottom: 8px;
}

.policy-desc {
  font-size: 13px;
  color: var(--text-muted, #64748B);
  line-height: 1.6;
}

/* 语言切换 Tab */
.lang-tabs-wrapper {
  display: flex;
  justify-content: center;
}

.lang-tabs {
  display: flex;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 20px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.lang-tab {
  padding: 8px 24px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary, #94A3B8);
  cursor: pointer;
  transition: all 0.3s ease;
}

.lang-tab.active {
  background: var(--color-brand-highlight, #3B82F6);
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

/* 主内容卡片 */
.policy-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 16px;
}

/* 概述框 */
.policy-overview-box {
  background: rgba(30, 41, 59, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  margin-bottom: 20px;
}

.overview-title {
  font-size: 15px;
  font-weight: 600;
  color: #60A5FA;
  margin-bottom: 8px;
}

.overview-text {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary, #CBD5E1);
}

/* 章节标题 */
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #60A5FA;
  border-left: 3px solid #60A5FA;
  padding-left: 8px;
  margin-top: 20px;
  margin-bottom: 0;
  line-height: 1.5;
}

.section-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 8px 0 12px 0;
}

/* 条款高亮块 */
.section-highlight-box {
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid #3B82F6;
  border-radius: 0 8px 8px 0;
  padding: 12px 14px;
  margin-bottom: 8px;
}

.section-item {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary, #CBD5E1);
  margin-bottom: 10px;
}

.section-item:last-child {
  margin-bottom: 0;
}

.section-item strong {
  font-weight: bold;
  color: var(--text-primary, #F8FAFC);
}

/* 底部法律声明卡片 */
.policy-legal-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 16px;
  text-align: center;
}

.legal-title {
  font-size: 16px;
  font-weight: 700;
  color: #60A5FA;
  line-height: 1.5;
  margin-bottom: 12px;
}

.legal-title span {
  font-size: 14px;
  font-weight: normal;
  color: #94A3B8;
}

.legal-contact {
  background: rgba(30, 41, 59, 0.4);
  border-radius: 10px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 16px;
}

.contact-label {
  font-size: 14px;
  color: var(--text-secondary, #94A3B8);
  margin-bottom: 6px;
}

.contact-email {
  font-size: 16px;
  font-weight: 600;
  color: #60A5FA;
}

.legal-disclaimer {
  font-size: 12px;
  color: #64748B;
  line-height: 1.6;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-style: italic;
}
</style>
