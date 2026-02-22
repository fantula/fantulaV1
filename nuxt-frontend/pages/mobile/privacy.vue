<template>
  <div class="mobile-page">
    <MobileSubPageHeader title="隐私政策" />

    <div class="privacy-content">
      <!-- 页面头部 -->
      <div class="privacy-header-card">
        <div class="privacy-logo-row">
          <img src="/images/shared/logo.png" alt="logo" class="privacy-logo" />
          <span class="privacy-brand">凡图拉</span>
        </div>
        <div class="privacy-main-title">凡图拉平台隐私政策</div>
        <div class="privacy-desc" v-if="currentLang === 'cn'">我们深知个人信息对您的重要性，并承诺依法收集、合理使用并保护您的信息安全</div>
        <div class="privacy-desc" v-else>We value your privacy and are committed to protecting your data through industry-standard security.</div>
      </div>

      <!-- 双语切换 Tab -->
      <div class="lang-tabs-wrapper">
        <div class="lang-tabs">
          <div class="lang-tab" :class="{ active: currentLang === 'cn' }" @click="currentLang = 'cn'">中文版 (CN)</div>
          <div class="lang-tab" :class="{ active: currentLang === 'en' }" @click="currentLang = 'en'">English (EN)</div>
        </div>
      </div>

      <!-- 中文版内容 -->
      <div class="privacy-card" v-show="currentLang === 'cn'">
        <div class="privacy-overview-box">
          <div class="overview-title">隐私政策概览</div>
          <div class="overview-text">
            本政策适用于凡图拉平台提供的所有服务。我们深知个人信息对您的重要性，并致力于通过符合行业高标准的安全技术与管理机制，保护您的个人信息安全。本政策旨在详尽说明我们在您使用服务过程中如何收集、使用、存储及保护您的信息。
          </div>
        </div>

        <div class="section-title">一、我们如何收集与使用信息</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc">1.1 为向您提供数字化权益服务协助（如账户管理、权益兑换记录），我们仅遵循"最小化原则"收集必要信息：</div>
          <ul class="privacy-list">
            <li>电子邮箱地址：用于创建唯一用户标识、账户安全验证及接收服务通知。</li>
            <li>服务交互日志：包括登录时间、操作记录、服务兑换流水，用于保障系统稳定运行及故障排查。</li>
            <li>设备及网络信息：匿名化的设备标识符与网络状态，用于反舞弊安全风控。</li>
          </ul>

          <div class="section-highlight-inline">1.2 本平台严格承诺不收集任何非必要的敏感个人信息，包括但不限于：</div>
          <ul class="privacy-list">
            <li>居民身份证号码、护照等任何法定身份证明文件</li>
            <li>个人生物识别信息（如面部识别特征、指纹、声纹）</li>
            <li>银行卡号、信用卡CVV码等金融支付敏感信息</li>
            <li>个人基因、健康医疗等特殊敏感数据</li>
          </ul>

          <div class="section-desc">1.3 信息的合法使用场景：</div>
          <ul class="privacy-list">
            <li>为您提供账户安全管理、防范安全风险</li>
            <li>基于您的主动请求，提供权益查询、售后支持服务</li>
            <li>生成去标识化的统计数据，用于优化平台的数字化服务流程</li>
          </ul>
        </div>

        <div class="section-title">二、Cookies 与同类技术的使用</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc">2.1 为确保网站正常运转，我们会在您的计算机或移动设备上存储名为 Cookie 的小数据文件。我们使用该技术主要为了：</div>
          <ul class="privacy-list">
            <li>维持您的登录状态，避免您重复执行已授权的操作</li>
            <li>保障数据安全性，排查异常登录行为</li>
            <li>分析服务使用情况，帮助我们需要改进服务内容</li>
          </ul>
          <div class="section-desc">2.2 您可根据自己的偏好管理或删除 Cookie。您应当知晓，若禁用 Cookie，某些服务功能可能无法正常运作。</div>
        </div>

        <div class="section-title">三、信息的共享、披露与转让</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc"><strong>3.1</strong> 我们严格限制信息共享范围，仅在以下必要情况下：</div>
          <ul class="privacy-list">
            <li>获得您明确的单独同意或授权</li>
            <li>为完成权益兑换与交付所必需：仅向合作的数字化权益服务商提供必要的兑换标识信息</li>
            <li>依据法律法规或行政、司法机关的强制性要求</li>
          </ul>

          <div class="highlight-box">
            <strong>3.2</strong> 我们承诺绝不出售您的个人信息给任何第三方用于商业营销。
          </div>

          <div class="section-desc"><strong>3.3</strong> 如涉及到平台运营主体变更（如合并、重组），我们会要求新的主体继续受本隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。</div>
        </div>

        <div class="section-title">四、您对个人信息的管理权</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc"><strong>4.1</strong> 您有权随时登录账户，查阅、更正您的基础注册信息。</div>
          <div class="section-desc"><strong>4.2</strong> 在符合法律法规要求的前提下，您有权要求删除您的特定信息。</div>
          <div class="section-desc"><strong>4.3</strong> 您可以随时申请注销账户。注销后，我们将停止为您提供产品或服务，并依据法律规定对您的个人信息进行匿名化处理或删除。</div>
        </div>

        <div class="section-title">五、信息安全保障措施</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc"><strong>5.1</strong> 我们采用符合业界标准的安全防护措施，包括：</div>
          <ul class="privacy-list">
            <li>使用 SSL/TLS 加密技术传输数据，防止传输链路泄露</li>
            <li>建立严格的数据访问权限控制与多重身份认证机制</li>
            <li>部署定期的数据安全审计与网络漏洞扫描</li>
          </ul>
          <div class="highlight-box">
            <strong>5.2</strong> 您的信息将存储于中华人民共和国境内的安全服务器中，除非法律法规另有规定，我们不会向境外传输。
          </div>
        </div>

        <div class="section-title">六、未成年人保护</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc">本平台仅面向 18 周岁及以上成年人提供服务。若您未满 18 周岁，请立即停止使用本平台。如果你是未成年人的监护人，且认为我们在不知情的情况下收集了未成年人的信息，请联系我们需要删除。</div>
        </div>

        <div class="section-title">七、政策更新</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc">随着业务发展及法律法规变化，我们可能会修订本政策。所有变更将通过网站公告或邮件通知的方式告知。若您在政策更新后继续使用服务，即表示您已充分阅读、理解并接受更新后的政策内容。</div>
        </div>
      </div>

      <!-- 英文版内容 -->
      <div class="privacy-card" v-show="currentLang === 'en'">
        <div class="privacy-overview-box">
          <div class="overview-title">Ventura Privacy Policy</div>
          <div class="overview-text">
            Welcome to Ventura! We value your privacy and are committed to protecting your data through industry-standard security technologies and management mechanisms. This policy details how we collect, use, store, and protect your information during your use of our services.
          </div>
        </div>

        <div class="section-title">1. Information Collection and Use</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc">1.1 To provide you with digital equity service assistance (such as account management and redemption records), we collect only necessary information following the "Minimization Principle":</div>
          <ul class="privacy-list">
            <li>Email Address: For unique user identification, account security verification, and service notifications.</li>
            <li>Service Logs: Including login timestamps, operation records, and service redemption flows for system stability.</li>
            <li>Device/Network Info: Anonymized device identifiers for security risk control.</li>
          </ul>

          <div class="section-highlight-inline">1.2 We strictly DO NOT collect sensitive personal information, including:</div>
          <ul class="privacy-list">
            <li>ID cards, passports, or other legal identity documents</li>
            <li>Biometric data (facial features, fingerprints, etc.)</li>
            <li>Bank card numbers, CVV codes, or other financial payment secrets</li>
            <li>Genetic or health-related sensitive data</li>
          </ul>

          <div class="section-desc">1.3 Legitimate Usage Scenarios:</div>
          <ul class="privacy-list">
            <li>Provide account security management and risk prevention</li>
            <li>Provide equity inquiry and after-sales support upon your request</li>
            <li>Generate de-identified statistics to optimize digital service processes</li>
          </ul>
        </div>

        <div class="section-title">2. Cookies & Similar Technologies</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc">2.1 We use Cookies or similar local storage technologies to ensure the website functions properly. We use this primarily to:</div>
          <ul class="privacy-list">
            <li>Maintain your login session status</li>
            <li>Ensure data security and detect abnormal login behaviors</li>
            <li>Analyze service usage to improve our offerings</li>
          </ul>
          <div class="section-desc">2.2 You can manage or delete Cookies based on your preferences. Please note that disabling Cookies may affect some service functions.</div>
        </div>

        <div class="section-title">3. Information Sharing & Disclosure</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc"><strong>3.1</strong> We strictly limit information sharing to necessary circumstances:</div>
          <ul class="privacy-list">
            <li>With your explicit separate consent</li>
            <li>Necessary for service fulfillment: Sharing only necessary redemption identifiers with equity service partners</li>
            <li>Compliance with laws, regulations, or mandatory government requests</li>
          </ul>

          <div class="highlight-box">
            <strong>3.2</strong> We strictly promise NOT to sell your personal information to any third party.
          </div>

          <div class="section-desc"><strong>3.3</strong> In the event of a merger or restructuring, we will require the new entity to continue to be bound by this policy, otherwise, we will ask them to seek your authorization again.</div>
        </div>

        <div class="section-title">4. Your Data Management Rights</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc"><strong>4.1</strong> You have the right to access and correct your basic registration information.</div>
          <div class="section-desc"><strong>4.2</strong> You have the right to request deletion of specific information as permitted by law.</div>
          <div class="section-desc"><strong>4.3</strong> You can request account cancellation at any time. Upon cancellation, we will stop providing services and anonymize or delete your data according to laws.</div>
        </div>

        <div class="section-title">5. Information Security Measures</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc"><strong>5.1</strong> We adopt industry-standard security measures, including:</div>
          <ul class="privacy-list">
            <li>SSL/TLS encryption for data transmission</li>
            <li>Strict data access controls and multi-factor authentication</li>
            <li>Regular security audits and vulnerability scanning</li>
          </ul>
          <div class="highlight-box">
            <strong>5.2</strong> Your data is stored on secure servers within the PRC and will not be transferred cross-border unless required by law.
          </div>
        </div>

        <div class="section-title">6. Protection of Minors</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc">This platform is intended for adults aged 18 and above. If you are under 18, please stop using this platform immediately. If you are a guardian and believe we collected a minor's data unknowingly, please contact us for deletion.</div>
        </div>

        <div class="section-title">7. Policy Updates</div>
        <div class="section-divider"></div>
        <div class="section-body">
          <div class="section-desc">We may revise this policy as our business evolves. Changes will be notified via website announcements or emails. Continued use after updates implies acceptance of the revised policy.</div>
        </div>
      </div>

      <!-- 联系我们与附则 (通用) -->
      <div class="privacy-contact-card">
        <div class="contact-title">联系我们<br /><span>Contact Us</span></div>
        <div class="contact-email">support@fantura.com</div>
        <div class="contact-desc">如您对本隐私政策有任何疑问、投诉或建议，请通过以下方式联系数据安全专员。我们将于15个工作日内作出答复。<br />If you have questions or suggestions, please contact our Data Security Officer. We will process your request within 15 working days.</div>
        <div class="contact-tip">
          本隐私政策提供英文翻译版本供参考，若中英文版本存在理解歧义，应以中文版表述为准。<br />
          The English version is for reference only. In case of discrepancy, the Chinese version shall prevail.
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

.privacy-content {
  padding: 16px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 页头卡片 */
.privacy-header-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
}

.privacy-logo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.privacy-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.3);
}

.privacy-brand {
  font-size: 22px;
  font-weight: bold;
  background: linear-gradient(135deg, var(--color-brand-highlight, #60A5FA) 0%, var(--color-accent, #F97316) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.privacy-main-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary, #FFFFFF);
  margin-bottom: 8px;
}

.privacy-desc {
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
.privacy-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 16px;
}

/* 概述框 */
.privacy-overview-box {
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

/* 章节内容区 */
.section-body {
  margin-bottom: 8px;
}

.section-desc {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary, #CBD5E1);
  margin-bottom: 8px;
}

.section-highlight-inline {
  font-size: 14px;
  font-weight: 600;
  color: #60A5FA;
  margin: 10px 0 6px 0;
  line-height: 1.6;
}

/* 列表 */
.privacy-list {
  margin: 0 0 12px 16px;
  padding: 0;
  list-style: disc;
}

.privacy-list li {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary, #CBD5E1);
  margin-bottom: 4px;
}

.privacy-list li::marker {
  color: #60A5FA;
}

/* 高亮框 */
.highlight-box {
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid #3B82F6;
  border-radius: 0 8px 8px 0;
  padding: 12px 14px;
  margin: 12px 0;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary, #E2E8F0);
}

/* 联系卡片 */
.privacy-contact-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 20px 16px;
  text-align: center;
}

.contact-title {
  font-size: 16px;
  font-weight: 700;
  color: #60A5FA;
  line-height: 1.5;
  margin-bottom: 12px;
}

.contact-title span {
  font-size: 14px;
  font-weight: normal;
  color: #94A3B8;
}

.contact-desc {
  font-size: 13px;
  color: var(--text-muted, #94A3B8);
  line-height: 1.6;
  margin-bottom: 16px;
  background: rgba(30, 41, 59, 0.4);
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.contact-email {
  font-size: 18px;
  font-weight: 700;
  color: #60A5FA;
  margin-bottom: 12px;
}

.contact-tip {
  font-size: 12px;
  color: var(--text-muted, #64748B);
  line-height: 1.6;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-style: italic;
}
</style>
