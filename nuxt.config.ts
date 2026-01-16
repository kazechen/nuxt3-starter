import process from 'node:process'
import { appDescription } from './constants/index'
import { currentLocales } from './i18n'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-lodash',
    '@unocss/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    'dayjs-nuxt',
  ],

  plugins: ['~/plugins/permission.ts'],

  vite: {
    optimizeDeps: {
      exclude: ['element-plus'],
    },
  },

  elementPlus: {
    installMethods: [
      'ElLoading',
      'ElMessage',
      'ElMessageBox',
      'ElNotification',
    ],
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
  },

  devtools: {
    enabled: false,
  },

  css: [
    '@/public/css/normalize.css',
    '@/public/css/font.css',
    // 'element-plus/dist/index.css',
  ],

  runtimeConfig: {
    // Private keys are only available on the server
    apiBase: process.env.NUXT_API_BASE,
    // apiBase: process.env.NUXT_API_BASE || '192.168.2.169/api/',

    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      stripeKey: process.env.NUXT_PUBLIC_STRIPE_KEY,
    },
  },

  i18n: {
    locales: currentLocales,
    restructureDir: '',
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
    // 啟用瀏覽器語言檢測，以便在訪問者第一次訪問您的站點時自動將其重定向到首選語言環境。
    detectBrowserLanguage: {
      // 啟動 cookie
      useCookie: true,
      // 用於存儲當前語言環境的變量名
      cookieKey: 'i18n_redirected',
      // (建議用於改進SEO) -僅檢測站點根路徑(/)上的瀏覽器區域設置。只有當使用策略而不是“no_prefix”時才有效。
      redirectOn: 'root',
    },
  },

  nitro: {
    // 為 PM2 多實例部署優化
    // preset: 'node-cluster',  記得開啟
    // devProxy: {
    //   '/dev': { // 需要代理的路徑前綴
    //     target: 'http://api.xxxxx.com/api/', // 目標服務器地址
    //     // target: 'http://192.168.2.169/api/', // 目標服務器地址
    //     changeOrigin: true, // 修改請求頭 Origin 為目標地址（解決跨域關鍵）
    //     prependPath: true, // 自動拼接路徑（如 /api/user → 目標域名/api/user）
    //   },
    // },
    routeRules: {
      '/_nuxt_icon/**': { proxy: '/api/_nuxt_icon/**' },
    },
  },
  icon: {
    provider: 'iconify',
    customCollections: [
      {
        prefix: 'carbon',
        dir: './assets/icons/carbon',
      },
    ],
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/nuxt3-starter/' : '/',
    buildAssetsDir: '/static/',
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        // { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        // { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ],
      script: [
        {
          src: 'https://js.stripe.com/basil/stripe.js',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  compatibilityDate: '2025-04-14',
})
