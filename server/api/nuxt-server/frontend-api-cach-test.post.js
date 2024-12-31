export default defineEventHandler(async (event) => {
  console.log('api:frontend-api-cach-test.post');

  const payload = await readBody(event);
  const query = getQuery(event);
  return { query, payload };
});