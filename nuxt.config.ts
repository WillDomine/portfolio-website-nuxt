import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Portfolio",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "description",
          content:
            "Professional Portfolio of Will Domine, a Full-Stack Developer specializing in Vue, Nuxt, and modern web technologies. Explore my latest projects, technical skills, and professional experience in software engineering.",
        },
      ],
    },
  },
  features: {
    inlineStyles: true,
  },
  routeRules: {
    "/": { prerender: true },
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 500,
      sourcemap: false,
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
        tag: "en",
      },
      {
        code: "ja",
        iso: "ja-JP",
        file: "ja.json",
        name: "日本語",
        tag: "ja",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: true,
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
    githubToken: process.env.GITHUB_TOKEN,
  },
  nitro: {
    routeRules: {
      "/memoji_waving.jpg": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/_nuxt/image/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },
  },
  modules: [
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
  ],
});
