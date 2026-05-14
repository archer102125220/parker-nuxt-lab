export default defineEventHandler((event) => {
  if (import.meta.dev === false) {
    setResponseStatus(event, 403);
    return '';
  }
});
