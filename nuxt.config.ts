export default defineNuxtConfig({
  extends: 'content-wind',
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    display: 'swap',
    prefetch: false,
    preconnect: false,
    preload: false,
    download: true,
    base64: true,
    families: {
      'Roboto+Slab': [400, 700],
    }
  },
})
