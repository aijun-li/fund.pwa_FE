import { Options } from 'vite-plugin-pwa'

const userOptions: Partial<Options> = {
  strategies: 'generateSW',
  registerType: 'prompt',
  injectRegister: 'inline',
  includeAssets: ['favicon.svg', 'robots.txt'],
  manifest: {
    name: 'Fund.PWA',
    short_name: 'Fund.PWA',
    theme_color: '#ffffff',
    description: 'A simple fund application',
    icons: [
      {
        src: 'pwa-48x48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: 'pwa-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fund.bytecask.com\/api\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'site-api-cache',
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
}

export default userOptions
