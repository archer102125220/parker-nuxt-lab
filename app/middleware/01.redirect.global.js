export default defineNuxtRouteMiddleware(async (to, from) => {
  const safeUrl = to?.href || '';
  if (['/home', '/zh/home', '/zh-tw/home', '/en/home'].includes(safeUrl)) {
    return await navigateTo('/');
  }
});
