export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  css: [
    '@fontsource/quicksand',
    '@fontsource/fira-code',
    '@/assets/overwrites.css'
  ],
  runtimeConfig: {
    public: {
      algolia: {
        apiKey: '9ec0159c389f1b462ece11c3d5a70431',
        applicationId: 'BU2EAYG78F',
        docSearch: {
          indexName: 'shieldbow'
        }
      }
    },
  },
  experimental: {
    payloadExtraction: false
  }
})
