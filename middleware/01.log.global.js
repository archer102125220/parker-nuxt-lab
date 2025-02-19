export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return;
  const nuxtApp = useNuxtApp();
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
  const localeCodes = nuxtApp.$i18n?.localeCodes?.value || [];
  const hrefArray = to?.href?.split?.('/');
  console.log({ hrefArray, localeCodes });

  if (
    typeof acceptLanguage === 'string' &&
    acceptLanguage !== '' &&
    (typeof i18nLocale !== 'string' || i18nLocale === '') &&
    headersLocale !== i18nLocale &&
    localeCodes.includes(hrefArray[1]) === true
  ) {
    const locale = i18nLocale || headersLocale;
    const localePath = useLocalePath();
    const localeHref = localePath(to.href, locale);
    console.log({
      pathname: url.pathname,
      href: to.href,
      localeHref,
      locales: nuxtApp.$i18n?.locales?.value,
      localeCodes,
      headersLocale,
      i18nLocale,
      cookieLocale: cookieLocale.value,
      hrefArray
    });

    if (url.pathname !== localeHref) {
      // nuxtApp.$setLocalLanguage(locale);
      return await navigateTo(localeHref);
    }
  }

  // const h = useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent']);
  // console.log(h);
});
