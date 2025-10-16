import { createEventStream } from 'h3';

export default defineEventHandler(async function (event) {
  setResponseHeader(event, 'Content-Type', 'text/event-stream');
  setResponseHeader(event, 'Cache-Control', 'no-cache');
  setResponseHeader(event, 'Connection', 'keep-alive');

  console.log('WebRTC SSE');
  // const { uuId } = event.context.params;
  const uuId = getRouterParam(event, 'uuId');
  const query = getQuery(event);
  const body = await readBody(event);

  const eventStream = createEventStream(event);

  // const interval = setInterval(async () => {
  //   await eventStream.push({ event: 'webrtc', data: JSON.stringify({ uuId, query, body }) });
  // }, 1000);
  setTimeout(async () => {
    await eventStream.push({ event: 'webrtc', data: JSON.stringify({ uuId, query, body }) });
  }, 1500);

  eventStream.onClosed(async () => {
    // clearInterval(interval);
    await eventStream.close();
  });


  return eventStream.send();
})
