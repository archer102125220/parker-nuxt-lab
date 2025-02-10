// https://nuxt.com/docs/getting-started/deployment
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import autoprefixer from 'autoprefixer';
import postcssPxtorem from 'postcss-pxtorem';

import {
  strategy,
  locales,
  langDir,
  defaultLang,
  fallbackLocale,
  detectBrowserLanguage
} from './i18n';

const IS_DEV = process.env.NODE_ENV !== 'production';

const windowsAlias = IS_DEV ? { '@': new URL('./', import.meta.url).href } : {};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: IS_DEV },
  alias: {
    ...windowsAlias
  },
  vite: {
    server: {
      hmr: process.env.HMR !== 'false' ? undefined : false
    },
    vue: {
      template: {
        transformAssetUrls
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern", "legacy"
          additionalData:
            '@use "~/style/variable.scss" as *; @use "~/style/mixin.scss" as *;'
        }
      },
      postcss: {
        plugins: [
          autoprefixer,
          postcssPxtorem({
            rootValue: 16, // 1rem 對應的 px
            propWhiteList: ['*']
          }),
          // https://github.com/cuth/postcss-pxtorem/blob/master/index.js#L119C37-L119C37
          // https://juejin.cn/post/7033773414363955230#heading-3
          {
            postcssPlugin: 'postcss-zerorem',
            Declaration(decl) {
              if (/\+\s0\)/gi.test(decl.value)) {
                decl.value = decl.value.replace(/\+\s0\)/gi, '+ 0rem)');
              }
            }
          }
        ]
      }
    }
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: defaultLang || 'zh-TW',
      },
      // https://realfavicongenerator.net/
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/ico/favicon.ico' }]
    }
  },
  css: ['@/style/global.scss', '@/style/animation.scss'],
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',

      'store',
      'store/*/index.{ts,js,mjs,mts}',
      'store/**'
    ]
  },
  modules: [
    '@pinia/nuxt',
    (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        config.plugins.push(vuetify())
      );
    },
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt'
  ],
  i18n: {
    strategy,
    locales,
    langDir,
    defaultLocale: defaultLang,
    fallbackLocale,
    detectBrowserLanguage
  },
  // https://vite-pwa-org-zh.netlify.app/guide/
  pwa: {
    injectRegister: 'script-defer',

    manifest: {
      name: 'Parker的Nuxt實驗室',
      short_name: 'Nuxt Lab',
      icons: [
        {
          src: '/img/ico/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/img/ico/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/img/ico/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/img/ico/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/img/ico/favicon.ico',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'monochrome'
        }
      ],
      theme_color: '#2c64e3',
      background_color: '#2c64e3',
      display: 'standalone'
    },

    // https://github.com/vite-pwa/nuxt/issues/53#issuecomment-1615266204
    workbox: {
      runtimeCaching: [
        // {
        //   urlPattern: new RegExp(`^${process.env.API_BASE || '/api'}`, 'i'),
        //   handler: 'StaleWhileRevalidate',
        //   // POST做快取會因為Service Workers會再背景再叫一次api，而瀏覽器並不允許這種呼叫兩次同隻POST API的行為，
        //   // 因此會出現error並無法有效將資料做快取，經查找資料疑似與幕等性有關
        //   // 關於http的冪等性：https://medium.com/willhanchen/%E9%97%9C%E6%96%BChttp%E7%9A%84%E5%86%AA%E7%AD%89%E6%80%A7-4438381d0a70
        //   // Service Workers 的 Cache API 不能快取 POST https://stackoverflow.com/questions/53639134/request-method-post-is-unsupported
        //   method: 'POST',
        //   options: {
        //     cacheName: 'post-api-cache',
        //     expiration: {
        //       maxEntries: 10,
        //       maxAgeSeconds: 60 * 2
        //     },
        //     plugins: [
        //       {
        //         handlerWillStart: async (willStartResponse) => {
        //           console.log({ willStartResponse });
        //         },
        //         requestWillFetch: async (willFetchResponse) => {
        //           console.log({ willFetchResponse });

        //           return willFetchResponse.request;
        //         },
        //         // handlerDidRespond 之後還會再執行一次 cacheKeyWillBeUsed
        //         cacheKeyWillBeUsed: async (cacheKeyResponse) => {
        //           console.log({ cacheKeyResponse });

        //           return cacheKeyResponse.request;
        //         },
        //         cachedResponseWillBeUsed: async (response) => {
        //           console.log({ response });
        //           const { cachedResponse } = response;

        //           if (typeof cachedResponse?.clone === 'function') {
        //             const responseClone = cachedResponse.clone();
        //             console.log({ response, responseClone });
        //             return responseClone;
        //           }

        //           // return response;
        //         },
        //         fetchDidSucceed: async (fetchResponse) => {
        //           console.log({ fetchResponse });
        //           const { response } = fetchResponse

        //           if (typeof response?.clone === 'function') {
        //             const responseClone = response.clone();
        //             console.log({ response, responseClone });
        //             return responseClone;
        //           }

        //           return response;
        //         },
        //         handlerWillRespond: async (willResponse) => {
        //           console.log({ willResponse });

        //           return willResponse.response;
        //         },
        //         handlerDidRespond: async (didResponse) => {
        //           console.log({ didResponse });
        //         },
        //         cacheWillUpdate: async (cacheWillUpdate) => {
        //           console.log({ cacheWillUpdate });

        //           return cacheWillUpdate.response;
        //         },
        //         handlerDidComplete: async (didCompleteResponse) => {
        //           console.log({ didCompleteResponse });
        //         },

        //         cacheDidUpdate: async (cacheDidUpdate) => {
        //           console.log({ cacheDidUpdate });

        //           return cacheDidUpdate.response;
        //         },
        //         fetchDidFail: async (fetchFailResponse) => {
        //           console.log({ fetchFailResponse });
        //         },
        //         handlerDidError: async (didErrorResponse) => {
        //           console.log({ didErrorResponse });
        //         },
        //       },
        //     ],
        //   }
        // },
        {
          urlPattern: new RegExp(`^${process.env.API_BASE || '/api'}`, 'i'),
          handler: 'CacheFirst',
          method: 'GET',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 2
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
            plugins: [
              {
                cacheKeyWillBeUsed: (cacheKeyResponse) => {
                  const request = cacheKeyResponse.request;
                  if (
                    cacheKeyResponse.mode === 'write' ||
                    (typeof request?.headers?.get === 'function' && request.headers.get('X-Is-Cacheable') === 'true')
                  ) {

                    return cacheKeyResponse.request;
                  }
                }
              },
            ],
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
          }
        }
      ],

      // https://vite-pwa-org-zh.netlify.app/guide/faq.html#missing-assets-from-sw-precache-manifest
      // https://www.elecfans.com/tools/zijiehuansuan.html
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 22, // 22MB
      // Only precache these files - html should be excluded
      globPatterns: ['**/*'],
      // Don't fallback on document based (e.g. `/some-page`) requests
      // Even though this says `null` by default, I had to set this specifically to `null` to make it work
      navigateFallback: null,
    }
  },

  build: {
    transpile: ['vuetify', 'date-fns']
  },

  runtimeConfig: {
    public: {
      API_BASE: process.env.API_BASE || '/api',
      WEBSOCKET_BASE_URL:
        process.env.WEBSOCKET_BASE_URL || 'wss://url',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
      FACEBOOK_API_VERSION: process.env.FACEBOOK_API_VERSION,
      LINE_CLIENT_ID: process.env.LINE_CLIENT_ID,
      LINE_CLIENT_SECRET: process.env.LINE_CLIENT_SECRET,
      LINE_CALLBACK_URI: process.env.LINE_CALLBACK_URI,
      HTTPS:
        process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production',
      isDev: IS_DEV
    }
  }
});
