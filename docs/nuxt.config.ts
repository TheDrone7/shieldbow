export default defineNuxtConfig({
  app: {
    baseURL: '/shieldbow/'
  },
  extends: '@nuxt-themes/docus',
  css: [
    '@fontsource/quicksand',
    '@fontsource/fira-code',
    '@/assets/overwrites.css'
  ],
  runtimeConfig: {
    public: {
      algolia: {
        docSearch: {
          appId: 'BU2EAYG78F',
          apiKey: '9ec0159c389f1b462ece11c3d5a70431',
          indexName: 'shieldbow'
        }
      }
    },
  },
  experimental: {
    payloadExtraction: false
  }
})
