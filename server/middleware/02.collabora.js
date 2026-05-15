export default defineEventHandler((event) => {
  const url = event.node.req?.url ?? '';
  if (url.includes('/collabora/wopi/files') && import.meta.dev === false) {
    setResponseStatus(event, 403);
    return '';
  }
});
