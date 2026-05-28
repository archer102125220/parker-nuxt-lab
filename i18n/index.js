import _merge from 'lodash/merge';

import en from './locales/en.json';
import zhTw from './locales/zh-tw.json';

// Import Univer specific locales
import univerCustomEnUS from '../app/utils/third-party/univer/i18n/en-US.js';
import univerCustomZhTw from '../app/utils/third-party/univer/i18n/zh-TW.js';

export const debug = process.env.NODE_ENV === 'development';
export const defaultLang = 'zh';
// export const fallbackLocale = 'en';
export const fallbackLocale = 'zh';
export const strategy = 'prefix_and_default';
export const locales = [
  {
    code: 'zh',
    iso: 'zh-TW'
    // file: 'zh-tw.json'
  },
  {
    code: 'en',
    iso: 'en-US'
    // file: 'en.json'
  }
];
export const langDir = './locales';

export const messages = {
  en: _merge({}, en, univerCustomEnUS),
  zh: _merge({}, zhTw, univerCustomZhTw)
};

export const detectBrowserLanguage = {
  fallbackLocale,
  useCookie: true,
  cookieKey: 'i18n_redirected',
  cookieSecure: process.env.NODE_ENV === 'production',
  cookieCrossOrigin: true,
  alwaysRedirect: false, // 只在第一次訪問時根據瀏覽器語言重定向，之後尊重 cookie
  redirectOn: 'no prefix' // 只在沒有語言前綴的路徑才做重定向，避免覆蓋用戶選擇
};

export const bundle = {
  compositionOnly: true,
  runtimeOnly: true,
  fullInstall: true
};

export default {
  debug,
  legacy: false,
  defaultLocale: defaultLang,
  langDir,
  locale: defaultLang,
  locales,
  messages,
  strategy,
  detectBrowserLanguage,
  bundle
};
