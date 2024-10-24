// https://nuxt.com/docs/api/configuration/nuxt-config
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

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
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
            '@import "@/style/variable.scss"; @import "@/style/mixin.scss";'
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
      // htmlAttrs: {
      //   lang: defaultLang || 'zh-TW',
      // },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }]
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
      'composables/**'
    ]
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        config.plugins.push(vuetify())
      );
    }
  ],
  i18n: {
    strategy,
    locales,
    langDir,
    defaultLocale: defaultLang,
    fallbackLocale,
    detectBrowserLanguage
  },

  build: {
    transpile: ['vuetify', 'date-fns']
  },

  runtimeConfig: {
    public: {
      // apiBaseUrl: 'https://dev-zack.jiapin.online',
      API_BASE: process.env.API_BASE,
      // websocketBaseUrl:
      //   'wss://dev-zack2.jiapin.online:3000/ws?role=STORE&cid=',
      WEBSOCKET_BASE_URL:
        process.env.WEBSOCKET_BASE_URL ||
        'wss://dev-zack2.jiapin.online:3000/ws?role=STORE&cid=',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
      FACEBOOK_API_VERSION: process.env.FACEBOOK_API_VERSION,
      LINE_CLIENT_ID: process.env.LINE_CLIENT_ID,
      LINE_CLIENT_SECRET: process.env.LINE_CLIENT_SECRET,
      LINE_CALLBACK_URI: process.env.LINE_CALLBACK_URI,
      HTTPS:
        process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production',
      isDev: process.env.NODE_ENV !== 'production'
    }
  }
});
