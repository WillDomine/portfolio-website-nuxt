import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  
  app: {
    head: {
      title: "Will Domine - Full Stack Developer",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "description",
          content:
            "Professional Portfolio of Will Domine, a Full-Stack Developer specializing in Vue, Nuxt, and modern web technologies. Explore my latest projects, technical skills, and professional experience in software engineering.",
        },
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  features: {
    inlineStyles: true,
  },

  routeRules: {
    "/": { prerender: true },
    "/api/**": { cors: true, cache: { maxAge: 60 * 5 } },
  },

  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 500,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
          },
        },
      },
    },
    css: {
      devSourcemap: false,
    },
  },

  i18n: {
    langDir: "locales",
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        name: "English",
      },
      {
        code: "ja",
        iso: "ja-JP",
        file: "ja.json",
        name: "日本語",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
      fallbackLocale: "en",
    },
  },

  fonts: {
    families: [{ name: "Noto Sans JP", preload: true, weights: [400, 700] }],
  },

  icon: {
    clientBundle: {
      scan: true,
    },
  },

  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN || "",
  },

  nitro: {
    preset: "cloudflare-pages",
    compressPublicAssets: true,
    minify: true,
    sourceMap: false,
  },

  modules: [
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
  ],

  // Experimental features for better performance
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
  },
})