import { defineTheme } from 'pinceau'

export default defineTheme({
  elements: {
    backdrop: {
      background: {
        dark: '#191717cc',
        initial: '#e3dfdfcc'
      }
    },
    state: {
      info: {
        color: {
          primary: {
            initial: '#0077B8',
            dark: '#99DBFF'
          }
        },
        backgroundColor: {
          primary: {
            initial: '#d9f1ff',
            dark: '#002438'
          },
          secondary: '{prose.code.block.backgroundColor}'
        }
      },
      warning: {
        color: {
          primary: {
            initial: '#9B7B08',
            dark: '#FAE289'
          }
        },
        backgroundColor: {
          primary: {
            initial: '#fdf6db',
            dark: '#362B03'
          },
          secondary: '{prose.code.block.backgroundColor}'
        }
      },
      danger: {
        color: {
          primary: {
            initial: '#F51000',
            dark: '#FFB3AD'
          }
        },
        backgroundColor: {
          primary: {
            initial: '#ffdbd9',
            dark: '#380300'
          },
          secondary: '{prose.code.block.backgroundColor}'
        }
      }
    }
  },
  font: {
    sans: 'Quicksand, sans-serif',
    mono: '"Fira Code", monospace',
  },
  fontSize: {
    base: 18,
    sm: '1rem',
    md: '1.125rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    '4xl': '3rem',
    '5xl': '3.5rem',
    '6xl': '3.75rem',
  },
  color: {
    primary: {
      50: "#FFC9C2",
      100: "#FFA599",
      200: "#FF9385",
      300: "#FF8170",
      400: "#FF6F5C",
      500: "#FF5D47",
      600: "#FF4B33",
      700: "#FF391F",
      800: "#FF270A",
      900: "#E01A00"
    },
    secondary: {
      100: 'f6f3f3',
      900: '#282C34'
    },
    black: "#1d1d1f",
    white: "#fffafa",
  }
})
