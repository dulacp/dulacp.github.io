import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: ['"Roboto Slab"', ...defaultTheme.fontFamily.sans].join(','),
              fontSize: "2.75em",
            }
          }
        }
      }
    }
  }
}
