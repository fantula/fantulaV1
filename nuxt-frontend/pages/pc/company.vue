<template>
  <div class="pc-glass-page">
    <!-- 顶部导航 -->


    <!-- 页面内容区域 -->
    <div class="pc-glass-content-a">
      <div class="pc-glass-container">
        <div class="pc-glass-header-a">
          <h1 class="pc-glass-title">关于我们</h1>
          <h2 class="pc-glass-desc-a">公司简介</h2>
        </div>
        
        <div class="content-section">
          <div class="content-blocks-container">
            <div class="highlighted-block top-block">
              <p class="pc-glass-paragraph highlighted-merged">
                凡图拉成立于 2019 年，是一家面向全球用户的数字化服务平台，专注于为用户提供便捷、稳定、可持续的数字消费支持解决方案。
              </p>
              
              <p class="pc-glass-paragraph highlighted-merged">
                自成立之初，凡图拉始终坚持「简单实用」的产品理念，围绕用户在跨境数字消费过程中的实际需求，不断优化服务流程与系统架构，致力于降低使用门槛、提升整体体验的稳定性与可靠性。
              </p>
            </div>
            
            <div class="white-block">
              <p class="pc-glass-paragraph white-merged">
                在早期阶段，平台主要由一支具备技术与内容平台经验的团队进行维护，通过人工与半自动方式处理用户需求，并逐步积累了对不同地区数字消费环境的理解。随着用户规模的增长与业务复杂度的提升，凡图拉持续进行系统升级，于 2021 年完成了核心系统的模块化重构，逐步形成了标准化、流程化的平台运营体系。
              </p>
              
              <p class="pc-glass-paragraph white-merged">
                截至目前，凡图拉已稳定运行超过五年，累计服务用户超过 10,000 人，用户分布覆盖 30 多个国家和地区。平台支持多种主流数字化支付方式，并为用户提供统一的账户体系与额度管理机制，以满足不同使用场景下的消费需求。
              </p>
            </div>
            
            <div class="highlighted-block bottom-block">
              <p class="pc-glass-paragraph highlighted-merged">
                凡图拉注重系统安全与服务稳定性，平台采用自动化处理机制结合人工支持的方式，确保服务流程清晰可控。同时，我们建立了多渠道客服支持体系，为用户在使用过程中提供及时、有效的协助。
              </p>
              
              <p class="pc-glass-paragraph highlighted-merged">
                面向未来，凡图拉将持续拓展服务边界，优化系统性能，并探索更具弹性与韧性的全球化部署方案，努力为用户打造一个长期可信赖的数字化服务平台，真正实现高效、稳定、无地域限制的数字消费体验。
              </p>
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

// SEO配置
useHead({
  title: '公司简介 - 凡图拉',
  meta: [
    { name: 'description', content: '了解凡图拉公司的发展历程、企业文化和核心价值观。' },
    { name: 'keywords', content: '凡图拉,公司简介,企业介绍,关于我们' }
  ]
})
</script>

<style scoped>
/* Specific Styles */
.content-section {
  width: 760px;
  height: 909px;
  background: rgba(15, 23, 42, 0.4);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  line-height: 1.8;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
}

/* Custom Scrollbar for Content Section */
.content-section::-webkit-scrollbar {
  width: 6px;
}
.content-section::-webkit-scrollbar-thumb {
  background: rgba(96, 165, 250, 0.3);
  border-radius: 3px;
}
.content-section::-webkit-scrollbar-track {
  background: transparent;
}

.pc-glass-paragraph {
  margin-bottom: 20px;
}

.pc-glass-paragraph:last-child {
  margin-bottom: 0;
}

.content-blocks-container {
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.highlighted-block {
  background: rgba(59, 130, 246, 0.15); /* Blue Tint Glass */
  padding: 20px 25px;
  margin: 0;
}

.top-block {
  border-radius: 12px 12px 0 0;
}

.bottom-block {
  border-radius: 0 0 12px 12px;
}

.white-block {
  background: rgba(30, 41, 59, 0.6); /* Darker Glass */
  padding: 20px 25px;
  margin: 0;
  border-left: 1px solid rgba(96, 165, 250, 0.1);
  border-right: 1px solid rgba(96, 165, 250, 0.1);
}

.content-paragraph.highlighted-merged,
.content-paragraph.white-merged {
  background: transparent;
  padding: 0;
  margin-bottom: 20px;
}

.content-paragraph.highlighted-merged:last-child,
.content-paragraph.white-merged:last-child {
  margin-bottom: 0;
}
</style>