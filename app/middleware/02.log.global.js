export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('02.log.global.js', to, from);
  if (import.meta.client) return;
  console.log('02.log.global.js SSR start');

  const nuxtApp = useNuxtApp();
  console.log('02.log.global.js useNuxtApp done');

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
  const localeCodes = nuxtApp.$i18n?.localeCodes?.value || [];
  const hrefArray = to?.href?.split?.('/');
  // console.log({ hrefArray, localeCodes });

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
    // console.log({
    //   pathname: url.pathname,
    //   href: to.href,
    //   localeHref,
    //   locales: nuxtApp.$i18n?.locales?.value,
    //   localeCodes,
    //   headersLocale,
    //   i18nLocale,
    //   cookieLocale: cookieLocale.value,
    //   hrefArray
    // });

    if (url.pathname !== localeHref) {
      // nuxtApp.$setLocalLanguage(locale);
      return await navigateTo(localeHref);
    }
  }

  // const h = useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent']);
  // console.log(h);
});
