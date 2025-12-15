export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return;

  const nuxtApp = useNuxtApp();
  const localeCodes = nuxtApp.$i18n?.localeCodes?.value || [];
  const hrefArray = to?.href?.split?.('/') || [];

  // 如果當前路徑已經包含 locale 前綴，直接返回，避免無限循環
  // Fix for Nuxt 4: 防止 locale 重定向造成無限循環
  if (hrefArray.length > 1 && localeCodes.includes(hrefArray[1])) {
    return;
  }

  const i18nLocale = nuxtApp.$getLocalLanguage('');
  const cookieLocale = useCookieLocale();
  const url = useRequestURL();
  const headers = useRequestHeaders();
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
      return await navigateTo(localeHref);
    }
  }
});
