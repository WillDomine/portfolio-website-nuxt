import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app : {
    head : {
      title: 'Portfolio',
      htmlAttrs: {
        lang:'en'
      }
    },
  },
  experimental: {
    inlineRouteRules: true
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English'
      },
      {
        code: 'jp',
        iso: 'ja-JP',
        file: 'jp.json',
        name: '日本語'
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
  },
  fonts : {
    families: [
      {name: 'Inter', preload:true, weights:[400, 700]},
      {name: 'Noto Sans JP', preload:true, weights:[400, 700]}
    ],
  },
  modules: ['shadcn-nuxt', '@nuxtjs/i18n', '@nuxt/fonts'],
})