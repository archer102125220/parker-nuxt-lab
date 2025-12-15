export default defineNuxtRouteMiddleware((to, from) => {
  if (
    typeof to.params.uuId === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      to.params.uuId
    )
  ) {
    return;
  }
  console.log({ uuId: to.params.uuId });

  if (import.meta.client) {
    const nuxtApp = useNuxtApp();
    nuxtApp.$warningMessage('不是有效識別id');
    return navigateTo(from.path);
  }

  return navigateTo(`${from.path}?warnMsg=不是有效識別id`);
});
