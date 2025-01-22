export default defineEventHandler((event) => {
  console.log('api:frontend-api-cach-test.get');

  const query = getQuery(event);
  return { query };
});