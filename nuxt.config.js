// https://nuxt.com/docs/getting-started/deployment
import os from 'os';
import fs from 'fs-extra';
import path from 'path';

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

const CONTENT_SECURITY_POLICY = IS_DEV !== true ? {
  'base-uri': ["'self'"],
  'font-src': ["'self'", 'https:', 'data:'],
  'form-action': ["'self'"],
  'frame-ancestors': ["'self'"],
  'img-src': ["'self'", 'data:'],
  'object-src': ["'none'"],
  'script-src-attr': ["'none'"],
  'style-src': ["'self'", 'https:', "'unsafe-inline'"],
  'script-src': ["'self'", 'https:', "'unsafe-inline'", "'strict-dynamic'"],
  'upgrade-insecure-requests': true
} : null;

const osType = os.type().toLocaleLowerCase();
const windowsAlias = osType.includes('windows') && IS_DEV ? { '@': new URL('./', import.meta.url).href } : {};

if (osType.includes('windows') === true) {
  const targetDir = path.join(__dirname, 'node_modules/@tensorflow/tfjs-node/lib/napi-v8');
  const sourceDir = path.join(__dirname, 'node_modules/@tensorflow/tfjs-node/lib/napi-v9/tensorflow.dll');

  if (fs.existsSync(targetDir) === false) {
    fs.ensureDirSync(targetDir);
  }

  if (fs.existsSync(sourceDir) === true) {
    fs.copySync(sourceDir, path.join(targetDir, '/tensorflow.dll'), { overwrite: true });
  } else {
    console.warn('Source models directory not found:', sourceDir);
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: IS_DEV },
  routeRules: {
    // '/': { isr: true },
    // '/en': { isr: true },
    // '/': { prerender: true },
    // '/en': { prerender: true },
    // '/components/**': { prerender: true },
    // '/components/**': { isr: true },

    // 若ISR 為整份專案，則可能導致部分api出現異常，prerender整份專案能使PWA快取整份專案至service worker
    '/**': { prerender: true },
    '/': { isr: true },
    '/zh': { isr: true },
    '/zh/**': { isr: 60 * 60 * 24 },
    '/en': { isr: true },
    '/en/**': { isr: 60 * 60 * 24 },
    '/components': { isr: 60 * 60 * 24 },
    '/components/**': { isr: 60 * 60 * 24 },
    '/directives': { isr: 60 * 60 * 24 },
    '/directives/**': { isr: 60 * 60 * 24 },
    '/css-drawing': { isr: 60 * 60 * 24 },
    '/css-drawing/**': { isr: 60 * 60 * 24 },
    '/route': { isr: 60 * 60 * 24 },
    '/route/**': { isr: 60 * 60 * 24 },
    '/components-test': { isr: 60 * 60 * 24 },
    '/face-api': { isr: 60 * 60 * 24 },
    '/fido2-lib': { isr: 60 * 60 * 24 },
    '/frontend-api-cach-test': { isr: 60 * 60 * 24 },
    '/home': { isr: 60 * 60 * 24 },
    '/web-authn': { isr: 60 * 60 * 24 },
    '/web-cam': { isr: 60 * 60 * 24 },

    // '/articles/*': { swr: 3600 },
    // '/admin/**': { ssr: false }
  },
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
  // nitro: {
  //   prerender: {
  //     routes: ['/', '/en']
  //   }
  // },
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
    '@vite-pwa/nuxt',
    'nuxt-security'
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

    registerType: 'autoUpdate',

    // https://www.photoroom.com/zh-tw/tools/background-remover
    // https://remove-white-background.imageonline.co/cn/
    // https://www.freeconvert.com/image-converter
    // https://realfavicongenerator.net/
    manifest: {
      name: 'Parker Chen 的Nuxt實驗室',
      short_name: 'Parker Chen\'s Nuxt Lab',
      // lang: 'zh-tw',
      lang: defaultLang,
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
        //           const request = cacheKeyResponse.request;

        //           if (
        //             cacheKeyResponse.mode === 'write' ||
        //             (typeof request?.headers?.get === 'function' && request.headers.get('X-Is-Cacheable') === 'true')
        //           ) {

        //             return cacheKeyResponse.request;
        //           }
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
      navigateFallback: undefined,
    },
    devOptions: {
      enabled: IS_DEV,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^[\/api\/_nuxt\/]/]
    }
  },

  security: {
    headers: {
      contentSecurityPolicy: CONTENT_SECURITY_POLICY,
      // reportOnly 模式:https://nuxt-security.vercel.app/advanced/faq#set-content-security-policy-report-only
      permissionsPolicy: {
        accelerometer: ["'self'"], // 允許同源使用加速計
        autoplay: ["'self'"],      // 允許同源自動播放媒體
        camera: ["'self'"],       // 允許同源使用攝影機
        // 'cross-origin-isolated': [], // 根據需求設定
        // displaycapture: [],      // 螢幕截取，謹慎使用
        fullscreen: ["'self'"],    // 允許同源使用全螢幕
        geolocation: ["'self'"],   // 允許同源獲取地理位置，若需特定外部來源，可加入如 "https://example.com"
        // gyroscope: ["'self'"],     // 允許同源使用陀螺儀
        // magnetometer: ["'self'"],  // 允許同源使用磁力計
        microphone: ["'self'"],   // 允許同源使用麥克風
        // midi: [],                // MIDI 裝置
        // payment: ["'self'"],       // 允許同源使用支付請求 API
        // usb: [],                 // USB 裝置
        // xrspatialtracking: [],   // XR 空間追蹤
      },
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
