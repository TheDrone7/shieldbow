import { defaultTheme, defineUserConfig } from "vuepress";
import { searchPlugin } from '@vuepress/plugin-search';

export default defineUserConfig({
  base: '/shieldbow/',
  theme: defaultTheme({
    repo: 'TheDrone7/shieldbow',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    navbar: [
      { text: "Home", link: "/" },
      {
        text: "Guide",
        children: [
          { text: "Getting started", link: "/guide/getting-started.html" },
          { text: "Client", link: "/guide/client.html" },
          { text: "Data Fetching", link: "/guide/fetching.html" },
        ]
      },
      { text: "API Reference", link: "/api" },
      { text: "NPM", link: "https://www.npmjs.com/package/shieldbow" }
    ]
  }),
  title: 'Shieldbow',
  description: 'An all-purpose, easy-to-use API wrapper for the league of legends API.',
  plugins: [
    searchPlugin({})
  ],
});
