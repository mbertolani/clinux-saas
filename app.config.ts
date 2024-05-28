export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'cool',
    container: {
      base: 'mx-auto',
      padding: 'px-4 sm:px-6 lg:px-4',
      constrained: 'max-w-full'
    },
    button: {
      rounded: 'rounded-full',
      default: {
        size: 'md'
      }
    },
    input: {
      default: {
        size: 'md'
      }
    },
    card: {
      rounded: 'rounded-xl'
    },
    footer: {
      top: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
        container: 'py-8 lg:py-16'
      },
      bottom: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    },
    page: {
      hero: {
        wrapper: 'lg:py-24'
      }
    }
    // header: {
    //   links: {
    //     trailingIcon: {
    //       name: 'i-ph-caret-down' // Defaults to `ui.icons.chevron`
    //     }
    //   },
    //   button: {
    //     base: 'lg:hidden',
    //     icon: {
    //       open: 'i-heroicons-bars-3-20-solid',
    //       close: 'i-heroicons-x-mark-20-solid'
    //     }
    //   }
    // }
  }
})
