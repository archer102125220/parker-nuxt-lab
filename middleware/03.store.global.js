export default defineNuxtRouteMiddleware(async () => {
  const { $store } = useNuxtApp();

  if (import.meta.client) {
    return;
  }

  const headers = useRequestHeaders();
  const userAgent = headers?.['user-agent'] || '';

  $store.system.setIsTablet(
    userAgent.includes('Tablet') || userAgent.includes('iPad')
  );
  $store.system.setIsMobile(
    userAgent.includes('Android') || userAgent.includes('iPhone')
  );

  if (typeof $store.serverInit === 'function') {
    await $store.serverInit();
  }
});
