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

const IS_DEBUG = process.env.VITE_DEBUG === 'true';
const IS_DEV = process.env.NODE_ENV !== 'production';

const CONTENT_SECURITY_POLICY = IS_DEV !== true ? {
  'default-src': ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://www.googletagmanager.com', 'https://*.youtube.com', 'https://*.ytimg.com', 'https://connect.facebook.net', 'https://*.facebook.com', 'https://*.fbcdn.net'],
  'base-uri': ["'self'"],
  'font-src': ["'self'", 'data:', 'blob:', 'https://fonts.gstatic.com', 'https://*.fbcdn.net'],
  'form-action': ["'self'", 'https://*.facebook.com'],
  'img-src': ["'self'", 'data:', 'blob:', 'https://*.ytimg.com', 'https://*.youtube.com', 'https://*.facebook.com', 'https://*.fbcdn.net', 'https://*.googletagmanager.com', 'https://validator.swagger.io'],
  'object-src': ["'none'"],
  'script-src-attr': ["'none'"],
  // 'script-src': ["'unsafe-inline'", "'unsafe-eval'", "'strict-dynamic'", "'self'", 'https://www.googletagmanager.com', 'https://*.youtube.com', 'https://*.ytimg.com', 'https://connect.facebook.net', 'https://*.facebook.com', 'https://*.fbcdn.net', 'https://*.googleapis.com'],
  'script-src': ["'unsafe-inline'", "'unsafe-eval'", "'strict-dynamic'", 'https://www.googletagmanager.com', 'https://*.youtube.com', 'https://*.ytimg.com', 'https://connect.facebook.net', 'https://*.facebook.com', 'https://*.fbcdn.net', 'https://*.googleapis.com', 'https://vercel.live'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://*.youtube.com', 'https://*.facebook.com', 'https://*.fbcdn.net'],
  'connect-src': ["'self'", 'https://assets.vercel.com', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://*.youtube.com', 'https://*.ytimg.com', 'https://*.facebook.com', 'https://*.fbcdn.net', 'https://graph.facebook.com', 'https://*.google-analytics.com', 'https://*.googleapis.com', 'https://api.github.com'],
  'frame-ancestors': ["'self'", 'https://*.youtube.com', 'https://*.ytimg.com', 'https://*.facebook.com'],
  'frame-src': ["'self'", 'https://*.youtube.com', 'https://*.ytimg.com', 'https://www.googletagmanager.com', 'https://*.facebook.com'],
  'media-src': ["'self'", 'https://*.youtube.com', 'https://*.ytimg.com', 'https://*.facebook.com', 'https://*.fbcdn.net'],
  'upgrade-insecure-requests': true
} : {
  'img-src': ["'self'", 'data:', 'blob:', 'https://*.ytimg.com', 'https://*.youtube.com', 'https://*.facebook.com', 'https://*.fbcdn.net', 'https://*.googletagmanager.com'],
};

const osType = os.type().toLocaleLowerCase();
// const windowsAlias = osType.includes('windows') && IS_DEV ? { '@': new URL('./', import.meta.url).href } : {};

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
    '/api/nuxt-server/swagger-docs': { prerender: true },
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
    '/firebase': { isr: 60 * 60 * 24 },
    '/firebase/cloud-messaging': { swr: 15 },

    // '/articles/*': { swr: 3600 },
    // '/admin/**': { ssr: false }
  },
  nitro: {
    experimental: {
      websocket: true
    },
    hooks: {
      'prerender:generate'(route) {
        const routesToSkip = ['/firebase/cloud-messaging'];
        if (routesToSkip.includes(route.route)) {
          route.skip = true;
        }
      }
    }
  },
  alias: {
    // ...windowsAlias,
    '@': __dirname,
    '@app': path.join(__dirname, 'app'),
    '@server': path.join(__dirname, 'server'),
    '@i18n': path.join(__dirname, 'i18n'),
    '@public': path.join(__dirname, 'public'),
    '@models': path.join(__dirname, 'models'),
    '@services': path.join(__dirname, 'services'),
    '@shared': path.join(__dirname, 'shared'),
    '@utils': path.join(__dirname, 'utils'),
    '@service-worker': path.join(__dirname, 'service-worker'),
    '@modules': path.join(__dirname, 'modules'),

    '~': __dirname,
    '~app': path.join(__dirname, 'app'),
    '~server': path.join(__dirname, 'server'),
    '~i18n': path.join(__dirname, 'i18n'),
    '~style': path.join(__dirname, 'style'),
    '~public': path.join(__dirname, 'public'),
    '~models': path.join(__dirname, 'models'),
    '~services': path.join(__dirname, 'services'),
    '~shared': path.join(__dirname, 'shared'),
    '~utils': path.join(__dirname, 'utils'),
    '~service-worker': path.join(__dirname, 'service-worker'),
    '~modules': path.join(__dirname, 'modules'),
  },
  vite: {
    ...(IS_DEBUG === true ? {
      esbuild: {
        // 默认情况下，esbuild 可能会移除 'debugger' 和 'console'
        // 明确设置为不移除 'console.log' 等
        drop: ['debugger'], // 仍然移除 debugger
        pure: [],
      }
    } : {}),

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
            '@use "@app/assets/styles/variable.scss" as *; @use "@app/assets/styles/mixin.scss" as *;'
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
  app: {
    head: {
      htmlAttrs: {
        lang: defaultLang || 'zh-TW',
      },
      // https://realfavicongenerator.net/
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/ico/favicon.ico' }],
      noscript: [
        // Google Tag Manager (noscript)
        { textContent: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.VITE_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }
      ]
    }
  },
  css: ['@app/assets/styles/global.scss', '@app/assets/styles/animation.scss'],
  imports: {
    // presets: [
    //   {
    //     from: '@gtm-support/vue-gtm',
    //     imports: ['createGtm', 'useGtm']
    //   }
    // ],
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
    '@nuxt/eslint',
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
    strategies: 'injectManifest',
    // default -> 'public', nuxt4 build -> 'app/public'
    srcDir: '../service-worker',
    // default -> 'sw.js'
    filename: 'service-worker.js',

    registerType: 'autoUpdate',

    // https://www.fotor.com/tw/features/crop.html 圖片編輯（包含裁切功能）
    // https://www.photoroom.com/zh-tw/tools/background-remover 去除背景
    // https://remove-white-background.imageonline.co/cn/ 去除背景
    // https://www.freeconvert.com/image-converter 圖片轉檔
    // https://cloudconvert.com/png-to-webp 圖片轉檔
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

    injectManifest: {
      // https://vite-pwa-org-zh.netlify.app/guide/faq.html#missing-assets-from-sw-precache-manifest
      // https://www.elecfans.com/tools/zijiehuansuan.html
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 5, // 5MB - 降低限制，只快取核心資源

      // https://vite-pwa-org.netlify.app/guide/static-assets.html#globpatterns
      // 只預快取核心應用資源，大型文件使用運行時快取
      globPatterns: [
        '**/*.{js,css,html}',
        'img/ico/**/*.{png,ico,svg}', // 只快取圖標
        'robots.txt'
      ],

      // 排除大型文件和不必要的資源
      globIgnores: [
        '**/models/**', // 排除 face-api 模型文件（15MB），改用運行時快取
        '**/node_modules/**',
        '**/*.map',
      ],
    },

    devOptions: {
      enabled: IS_DEV,
      suppressWarnings: true,
    }
  },

  security: {
    removeLoggers: IS_DEBUG === false,

    headers: {
      contentSecurityPolicy: CONTENT_SECURITY_POLICY,
      // reportOnly 模式:https://nuxt-security.vercel.app/advanced/faq#set-content-security-policy-report-only
      crossOriginEmbedderPolicy: false,
      // crossOriginEmbedderPolicy: 'credentialless',
      // crossOriginEmbedderPolicy: 'require-corp',
      // crossOriginOpenerPolicy: 'same-origin',
      // crossOriginResourcePolicy: 'cross-origin',
      permissionsPolicy: {
        // notifications: ['self'], // 允許同源使用通知
        accelerometer: ['self', '"https://*.youtube.com"'], // 允許同源和YouTube使用加速計
        autoplay: ['self', '"https://*.youtube.com"'],      // 允許同源和YouTube自動播放媒體
        camera: ['self', '"https://*.youtube.com"'],       // 允許同源使用攝影機和YouTube自動播放媒體
        // 'cross-origin-isolated': [], // 根據需求設定
        // displaycapture: [],      // 螢幕截取，謹慎使用
        fullscreen: ['self', '"https://*.youtube.com"'],    // 允許同源和YouTube使用全螢幕和YouTube自動播放媒體
        geolocation: ['self'],   // 允許同源獲取地理位置，若需特定外部來源，可加入如 "https://example.com"
        // gyroscope: ['self'],     // 允許同源使用陀螺儀
        // magnetometer: ['self'],  // 允許同源使用磁力計
        microphone: ['self', '"https://*.youtube.com"'],   // 允許同源使用麥克風和YouTube自動播放媒體
        // midi: [],                // MIDI 裝置
        // payment: ['self'],       // 允許同源使用支付請求 API
        // usb: [],                 // USB 裝置
        // xrspatialtracking: [],   // XR 空間追蹤
      },
    }
  },

  build: {
    transpile: IS_DEV === true ? ['vuetify', 'date-fns', '@vuepic/vue-datepicker'] : ['vuetify', 'date-fns', 'lodash', '@vuepic/vue-datepicker']
  },

  runtimeConfig: {
    public: {
      // VITE_APP_ID: process.env.VITE_APP_ID,
      // VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
      // VITE_ANDROID_FIREBASE_CREDENTIAL: process.env.VITE_ANDROID_FIREBASE_CREDENTIAL,
      // VITE_FIREBASE_CREDENTIAL: process.env.VITE_FIREBASE_CREDENTIAL,
      // VITE_IOS_FIREBASE_CREDENTIAL: process.env.VITE_IOS_FIREBASE_CREDENTIAL,
      // VITE_FIREBASE_VAPID_KEY: process.env.VITE_FIREBASE_VAPID_KEY,
      // VITE_MESSAGING_SENDER_ID: process.env.VITE_MESSAGING_SENDER_ID,

      // VITE_GTM_ID: process.env.VITE_GTM_ID,
      // VITE_API_BASE: process.env.VITE_API_BASE || '/api',

      // VITE_SOCKET_IO_BASE_PATH:
      //   process.env.VITE_SOCKET_IO_BASE_PATH || '/',
      // VITE_GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID,
      // VITE_FACEBOOK_APP_ID: process.env.VITE_FACEBOOK_APP_ID,
      // VITE_FACEBOOK_API_VERSION: process.env.VITE_FACEBOOK_API_VERSION,
      // VITE_LINE_CLIENT_ID: process.env.VITE_LINE_CLIENT_ID,
      // VITE_LINE_CLIENT_SECRET: process.env.VITE_LINE_CLIENT_SECRET,
      // VITE_LINE_CALLBACK_URI: process.env.VITE_LINE_CALLBACK_URI,

      HTTPS:
        process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production',
      isDev: IS_DEV,
    }
  },
});
