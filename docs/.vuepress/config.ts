import { defaultTheme, defineUserConfig } from "vuepress";
import { searchPlugin } from '@vuepress/plugin-search';

export default defineUserConfig({
  base: '/shieldbow/',
  theme: defaultTheme({
    navbar: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/getting-started.html" },
      { text: "API Documentation", link: "/api/shieldbow.html" },
    ]
  }),
  title: 'Shieldbow',
  description: 'An all-purpose, easy-to-use API wrapper for the league of legends API.',
  plugins: [
    searchPlugin({})
  ],
});
