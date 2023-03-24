export default defineAppConfig({
  docus: {
    title: 'Shieldbow',
    description: 'A powerful, flexible and easy to use API wrapper for Riot Games\' League of Legends API.',
    image: '/Shieldbow.png',
    url: 'https://thedrone7.github.io/',
    socials: {
      npm: {
        label: 'NPM',
        href: 'https://www.npmjs.com/package/shieldbow',
        icon: 'simple-icons:npm'
      },
      github: 'TheDrone7/shieldbow'
    },
    aside: {
      level: 1,
      exclude: [],
      collapsed: false
    },
    header: {
      logo: true,
      fluid: true
    },
    "github": {
      "dir": "docs/content",
      "branch": "main",
      "repo": "shieldbow",
      "owner": "TheDrone7",
      "edit": true
    },
    footer: {
      fluid: true,
      credits: {
        icon: '',
        text: 'Built by TheDrone7',
        href: 'https://thedrone7.repl.co/'
      }
    },
  }
})
