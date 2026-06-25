export default defineEventHandler((event) => {
  const method = event.node.req?.method ?? '';
  const headers = event.node.req?.headers || {};
  const url = event.node.req?.url ?? '';

  console.log('-------------server log-------------');
  console.log(`user-agent: ${headers['user-agent']}`);
  console.log(`accept-language: ${headers['accept-language']}`);
  console.log(`referer: ${headers.referer}`);
  console.log(`host: ${headers.host}`);
  console.log(`method: ${method}`);
  console.log(`url: ${url}`);
  console.log('-------------end server log-----------');
});
