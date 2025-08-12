export default defineEventHandler((event) => {
  console.log('api:scroll-fetch-test.get');

  const query = getQuery(event);
  return { query };
});