// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 兼容性日期
  compatibilityDate: '2025-07-01',

  // 开发工具 - 只在开发环境启用
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  // 模块
  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // 组件自动导入
  components: [
    { path: '~/components/admin/base', pathPrefix: false },
    { path: '~/components/pc', pathPrefix: false },
    { path: '~/components/mobile', pathPrefix: false },
    { path: '~/components/shared', pathPrefix: false },
    '~/components'
  ],

  // 自动导入配置 (Composables & Stores)
  imports: {
    dirs: [
      'composables/**',
      'stores/**'
    ]
  },

  // 应用配置
  app: {
    pageTransition: { name: 'page-slide', mode: 'out-in' },
    head: {
      title: '凡图拉｜智能海外代充代付平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '提供 Netflix、Spotify、YouTube Premium 等流媒体会员代充服务，价格稳定，售后支持' },
        { name: 'keywords', content: '凡图拉,流媒体,数字产品,Netflix,Disney+,Apple TV,技术支持,社区帮助' },
        { name: 'author', content: '凡图拉团队' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'language', content: 'zh-CN' },
        { name: 'revisit-after', content: '7 days' },
        // Open Graph
        { property: 'og:title', content: '凡图拉｜智能海外代充代付平台' },
        { property: 'og:description', content: '提供 Netflix、Spotify、YouTube Premium 等流媒体会员代充服务，价格稳定，售后支持' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '凡图拉' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:image', content: '/images/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: 'https://www.fantula.com' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '凡图拉｜智能海外代充代付平台' },
        { name: 'twitter:description', content: '提供 Netflix、Spotify、YouTube Premium 等流媒体会员代充服务，价格稳定，售后支持。' },
        { name: 'twitter:image', content: '/images/og-image.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.fantula.com' },
        { rel: 'alternate', hreflang: 'zh-CN', href: 'https://www.fantula.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://www.fantula.com' }
      ],
      // Critical: Enforce dark background immediately to prevent White Flash
      style: [
        { innerHTML: 'html, body { background-color: #020617 !important; }' },
        // Nuclear Guard: Force hide PC layout on mobile (CSS > JS execution time)
        { innerHTML: '@media (max-width: 768px) { .app-wrapper { display: none !important; } }' },
        // PC Loader: Static CSS overlay shown immediately before Vue hydrates
        // Prevents "content flash before loader appears" on first daily visit
        {
          innerHTML: `
body.show-pc-loader::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 10001;
  background-color: #020617;
  background-image: radial-gradient(circle at center, #1e293b 0%, #020617 70%);
}
body.show-pc-loader::after {
  content: '凡图拉';
  position: fixed;
  inset: 0;
  z-index: 10002;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255,255,255,0.3);
  font-family: 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
}`.trim()
        }
      ],
      // Inject inline script BEFORE Vue bundle: check localStorage and set body class
      // This runs synchronously during HTML parsing, eliminating the loader flash
      script: [
        {
          innerHTML: `(function(){
  try {
    var p = window.location.pathname;
    if (p === '/' || p === '/pc' || p.startsWith('/pc/') || p === '/pc/index') {
      var today = new Date().toDateString();
      var last = localStorage.getItem('fantula_pc_visit');
      if (last !== today) {
        localStorage.setItem('fantula_pc_visit', today);
        document.body.classList.add('show-pc-loader');
      }
    }
  } catch(e) {}
})();`,
          type: 'text/javascript'
        }
      ]
    }
  },



  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅在服务端可用）
    apiSecret: process.env.API_SECRET,
    // Supabase 配置 (服务端)
    supabaseKey: process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
    // 微信支付配置 (服务端私有)
    wechatPayMchid: process.env.WECHAT_PAY_MCHID || '',
    wechatPayAppid: process.env.WECHAT_PAY_APPID || '',
    wechatPayApiV3Key: process.env.WECHAT_PAY_API_V3_KEY || '',
    wechatPaySerialNo: process.env.WECHAT_PAY_SERIAL_NO || '',
    wechatPayPrivateKey: process.env.WECHAT_PAY_PRIVATE_KEY || '',
    wechatPayNotifyUrl: process.env.WECHAT_PAY_NOTIFY_URL || '',
    wechatAppSecret: process.env.WECHAT_APP_SECRET || '',
    wechatPlatformCert: process.env.WECHAT_PLATFORM_CERT || '',
    // 支付宝配置 (服务端私有)
    alipayAppId: process.env.ALIPAY_APP_ID || '',
    alipayPrivateKey: process.env.ALIPAY_PRIVATE_KEY || '',
    alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || '',
    alipayNotifyUrl: process.env.ALIPAY_NOTIFY_URL || 'https://www.fantula.com/api/alipay/notify',
    // 定时任务服务内部地址（服务端代理用，浏览器不可访问）
    schedulerInternalUrl: process.env.SCHEDULER_INTERNAL_URL || 'http://127.0.0.1:3001',

    // 公共配置（客户端和服务端都可用）
    public: {
      apiBase: process.env.SUPABASE_URL || 'http://127.0.0.1:54321',
      appName: '凡图拉',
      siteUrl: process.env.SITE_URL || 'https://www.fantula.com',
      // 微信公众号 AppID（前端用于构建 OAuth URL）
      wechatAppid: process.env.WECHAT_PAY_APPID || 'wxc2042fae927b28b8',
      // Supabase 公共配置
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_KEY || '',
      // Service Key Removed - Security Hardened

      // 定时任务服务地址（通过服务端代理访问）
      schedulerUrl: '/api/admin/scheduler'
    }
  },

  // Image Optimization
  image: {
    provider: 'ipx',
    ipx: {
      modifiers: {
        format: 'webp',
        quality: 80
      }
    }
  },

  // Sitemap
  site: {
    url: process.env.SITE_URL || 'https://www.fantula.com',
  },

  // 代理配置
  nitro: {
    // 路由规则 - 为 admin 路由禁用 SSR
    routeRules: {
      '/manager_portal/**': { ssr: false },
      // API Routes (proxy or direct) - no cache usually
      '/api/**': { cors: true },
      // Caching Strategy
      '/': { headers: { 'cache-control': 'no-cache' } }, // Disable cache for debugging/stability
      '/pc': { headers: { 'cache-control': 'no-cache' } },
      '/mobile': { headers: { 'cache-control': 'no-cache' } },
      '/pc/product/**': { swr: 600 }, // Product lists cached for 10 mins
      '/mobile/product/**': { swr: 600 },
      '/pc/article/**': { swr: 3600 }, // Articles cached longer
      '/mobile/article/**': { swr: 3600 },
      // User specific pages - No Cache
      '/pc/profile/**': { ssr: false },
      '/mobile/profile/**': { ssr: false },
      '/pc/checkout/**': { ssr: false },
      '/mobile/checkout/**': { ssr: false },
    },
    devProxy: {
      // 统一API代理地址为 Supabase 本地服务
      // 注意: /api/wechat 由 Nuxt Server API 处理，不代理
      // 其他 /api 路径可能需要代理到 Supabase (如有旧代码依赖)
      '/product': {
        target: 'http://127.0.0.1:54321',
        changeOrigin: true,
        prependPath: true
      },
      '/basic': {
        target: 'http://127.0.0.1:54321',
        changeOrigin: true,
        prependPath: true
      },
      '/question': {
        target: 'http://127.0.0.1:54321',
        changeOrigin: true,
        prependPath: true
      },
      '/sys': {
        target: 'http://127.0.0.1:54321',
        changeOrigin: true,
        prependPath: true
      }
    },
    // 预渲染配置
    prerender: {
      crawlLinks: false,
      routes: ['/about-us', '/faq'],
      ignore: ['/pc/**', '/mobile/**']
    }
  },

  // 构建配置
  build: {
    transpile: ['axios']
  },

  // 类型检查
  typescript: {
    strict: false,
    typeCheck: false
  },

  // 路由配置
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  // SSR配置 - 启用服务端渲染
  ssr: true,

  // 确保客户端导航正常工作
  experimental: {
    payloadExtraction: false
  },

  // SEO 优化配置
  css: [
    '@/assets/styles/tokens/index.css',
    '@/assets/styles/theme-blue-orange.css',
    '@/assets/styles/theme-article.css'
  ],

  hooks: {
    'pages:extend'(pages) {
      // 1. 找到所有在 pages/pc 下的页面
      const clientPages = pages.filter(p => p.path.startsWith('/pc'))

      // 2. 为每个 pc 页面创建一个根路径别名
      clientPages.forEach(p => {
        // 去掉 path 中的 /pc 前缀
        let newPath = p.path.replace(/^\/pc/, '')
        if (newPath === '') newPath = '/'

        // 避免重复定义
        const exists = pages.some(existing => existing.path === newPath)

        // Skip adding the generic alias for the dynamic ID route
        // This is handled explicitly in pages/pc/[id].vue with a strict regex alias
        if (newPath === '/:id' || newPath === '/:id()') {
          return
        }

        const cloneRoute = (route: any): any => {
          const cloned = { ...route }
          if (cloned.name) cloned.name = 'root-' + cloned.name
          if (cloned.children) {
            cloned.children = cloned.children.map(cloneRoute)
          }
          return cloned
        }

        if (!exists) {
          const clonedPage = cloneRoute(p)
          clonedPage.path = newPath
          pages.push(clonedPage)
        }
      })
    }
  }
}) 