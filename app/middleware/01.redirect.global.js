export default defineNuxtRouteMiddleware(async (to, from) => {
  const safeUrl = to?.href || '';
  if (['/home', '/zh/home', '/zh-tw/home', '/en/home'].includes(safeUrl)) {
    return await navigateTo('/');
  } else if (['/components/scroll-fetch-test', '/zh/components/scroll-fetch-test', '/zh-tw/components/scroll-fetch-test', '/en/components/scroll-fetch-test']) {
    return await navigateTo('/components/scroll-fetch');
  }
});
