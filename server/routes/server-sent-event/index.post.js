// https://nitro.build/guide/websocket#server-sent-events-sse
// https://tehub.com/a/cHJ76vwCFv

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', 'text/event-stream');
  setResponseHeader(event, 'Cache-Control', 'no-cache');
  setResponseHeader(event, 'Connection', 'keep-alive');

  const query = getQuery(event);
  const body = await readBody(event);
  console.log({ query, body });

  const eventStream = createEventStream(event);

  const interval = setInterval(async () => {
    /*
    {
      id?: string;
      event?: string;
      retry?: number;
      data: string;
    }
     */
    // await eventStream.push(`Message @ ${new Date().toLocaleTimeString()}`);
    await eventStream.push({ data: `Message @ ${new Date().toLocaleTimeString()}` });
  }, 1000);

  eventStream.onClosed(async () => {
    console.log('server/routes/server-sent-event/index.post');
    clearInterval(interval);
    await eventStream.close();
  });

  return eventStream.send();
});