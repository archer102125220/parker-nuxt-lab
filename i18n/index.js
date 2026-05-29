export const debug = process.env.NODE_ENV === 'development';
export const defaultLang = 'zh';
// export const fallbackLocale = 'en';
export const fallbackLocale = 'zh';
export const strategy = 'prefix_and_default';
export const locales = [
  {
    code: 'zh',
    iso: 'zh-TW',
    // file: 'zh-tw.json'
    file: 'zh-tw.js'
  },
  {
    code: 'en',
    iso: 'en-US',
    // file: 'en.json'
    file: 'en.js'
  }
];
export const langDir = './locales';

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
  // langDir,
  locale: defaultLang,
  locales,
  strategy,
  detectBrowserLanguage,
  bundle
};
