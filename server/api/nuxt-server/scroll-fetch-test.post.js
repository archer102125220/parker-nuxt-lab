export default defineEventHandler(async (event) => {
  console.log('api:scroll-fetch-test.post');

  const payload = await readBody(event);
  const query = getQuery(event);
  return { query, payload };
});