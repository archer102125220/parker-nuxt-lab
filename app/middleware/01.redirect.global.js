export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('01.redirect.global.js', to, from);
  const safeUrl = to?.href || '';
  if (['/home', '/zh/home', '/zh-tw/home', '/en/home'].includes(safeUrl)) {
    return await navigateTo('/');
  } else if (
    [
      '/components/scroll-fetch-test',
      '/zh/components/scroll-fetch-test',
      '/zh-tw/components/scroll-fetch-test',
      '/en/components/scroll-fetch-test'
    ].includes(safeUrl)
  ) {
    return await navigateTo('/components/scroll-fetch');
  }
});
