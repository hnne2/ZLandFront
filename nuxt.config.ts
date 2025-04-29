import checker from 'vite-plugin-checker'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@vee-validate/nuxt', 'nuxt-icons'],
  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],
  vite: {
    plugins: [
      checker({
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "**/*.{js,ts,vue}"',
        },
        stylelint: {
          lintCommand: 'stylelint "**/*.{css,scss,vue}"',
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
          additionalData: `@use "@/assets/scss/general/variables.scss" as *; @use "@/assets/scss/abstracts/mixins.scss" as *;`,
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
})
