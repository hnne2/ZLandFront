// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // Настройки структуры файлов для Nuxt 4 при версии использовании Nuxt 3
  compatibilityDate: '2024-11-01',

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false,
    },
  },

  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@nuxtjs/google-fonts'],

  app: {
    head: {
      title: 'Zland',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-96x96.png',
          sizes: '96x96',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [{ name: 'apple-mobile-web-app-title', content: 'Zland' }],
    },
  },

  css: ['@/assets/scss/index.scss'],

  googleFonts: {
    display: 'swap',
    families: {
      Inter: true,
    },
  },
})
