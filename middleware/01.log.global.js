export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) return;
  const url = useRequestURL();
  const headers = useRequestHeaders();

  console.log(`user-agent: ${headers['user-agent']}`);
  console.log(`accept-language: ${headers['accept-language']}`);
  console.log(`referer: ${headers.referer}`);
  console.log(`host: ${headers.host}`);
  console.log(`url: ${url.href}`);

  if (typeof headers['accept-language'] === 'string' && headers['accept-language'] !== '') {
    const locale = headers['accept-language'].includes('zh-TW') ? 'zh' : 'en';
    const localePath = useLocalePath();
    const localeHref = localePath(to.href, locale);
    if (url.pathname !== localeHref) {
      return await navigateTo(localeHref);
    }
  }

  // const h = useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent']);
  // console.log(h);
});
