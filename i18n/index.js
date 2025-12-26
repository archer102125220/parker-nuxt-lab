import en from './locales/en.json';
import zhTw from './locales/zh-tw.json';

export const debug = process.env.NODE_ENV === 'development';
export const defaultLang = 'zh';
// export const fallbackLocale = 'en';
export const fallbackLocale = 'zh';
export const strategy = 'prefix_and_default';
export const locales = [
  {
    code: 'zh',
    iso: 'zh-TW',
    file: 'zh-tw.json'
  },
  {
    code: 'en',
    iso: 'en-US',
    file: 'en.json'
  }
  // 'zh',
  // 'en'
];
export const langDir = './locales';
export const detectBrowserLanguage = {
  fallbackLocale,
  useCookie: true,
  cookieKey: 'i18n_redirected',
  cookieSecure: process.env.NODE_ENV === 'production',
  alwaysRedirect: false, // 只在第一次訪問時根據瀏覽器語言重定向，之後尊重 cookie
  redirectOn: 'root'
};
export const messages = {
  en,
  zh: zhTw
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
