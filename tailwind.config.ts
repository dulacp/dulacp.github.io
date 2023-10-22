import type { Config } from 'tailwindcss'
import type { PluginUtils } from 'tailwindcss/types/config'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [],
  theme: {
    extend: {
      borderColor: ({theme}: { theme: PluginUtils['theme'] }) => ({
        DEFAULT: theme('colors.gray.400', 'currentColor'),
      }),
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

export default config
