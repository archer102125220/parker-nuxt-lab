export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('02.log.global.js', to, from);
  if (import.meta.client) return;
  console.log('02.log.global.js SSR start');

  const nuxtApp = useNuxtApp();
  console.log('02.log.global.js useNuxtApp done');

  const localeCodes = nuxtApp.$i18n?.localeCodes?.value || [];
  const hrefArray = to?.href?.split?.('/') || [];

  // 如果當前路徑已經包含 locale 前綴，直接返回，避免無限循環
  if (hrefArray.length > 1 && localeCodes.includes(hrefArray[1])) {
    console.log(
      '02.log.global.js: path already has locale prefix, skipping redirect'
    );
    return;
  }

  const i18nLocale = nuxtApp.$getLocalLanguage('');
  console.log('02.log.global.js getLocalLanguage done');

  const cookieLocale = useCookieLocale();
  console.log('02.log.global.js useCookieLocale done');

  const url = useRequestURL();
  console.log('02.log.global.js useRequestURL done');

  const headers = useRequestHeaders();
  console.log('02.log.global.js useRequestHeaders done');

  const acceptLanguage = headers['accept-language'];

  console.log(`user-agent: ${headers['user-agent']}`);
  console.log(`accept-language: ${acceptLanguage}`);
  console.log(`referer: ${headers.referer}`);
  console.log(`host: ${headers.host}`);
  console.log(`url: ${url.href}`);

  const headersLocale = acceptLanguage?.includes?.('zh-TW') ? 'zh' : 'en';

  if (
    typeof acceptLanguage === 'string' &&
    acceptLanguage !== '' &&
    (typeof i18nLocale !== 'string' || i18nLocale === '') &&
    headersLocale !== i18nLocale
  ) {
    const locale = i18nLocale || headersLocale;
    const localePath = useLocalePath();
    const localeHref = localePath(to.href, locale);

    if (url.pathname !== localeHref) {
      console.log('02.log.global.js: redirecting to', localeHref);
      return await navigateTo(localeHref);
    }
  }

  console.log('02.log.global.js: no redirect needed');
});
