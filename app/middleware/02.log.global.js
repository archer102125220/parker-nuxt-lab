export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return;

  const headers = useRequestHeaders();
  const url = useRequestURL();

  console.log(`user-agent: ${headers['user-agent']}`);
  console.log(`accept-language: ${headers['accept-language']}`);
  console.log(`referer: ${headers.referer}`);
  console.log(`host: ${headers.host}`);
  console.log(`url: ${url.href}`);
});
