// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module'],
  build: {
    transpile: [ 'vuetify'],
  },
  plugins: [
    '~/plugins/supabase.js',
    '~/plugins/vue3-cookies.js'
  ],
})