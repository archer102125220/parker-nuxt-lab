export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', 'text/event-stream');
  setResponseHeader(event, 'Cache-Control', 'no-cache');
  setResponseHeader(event, 'Connection', 'keep-alive');

  console.log('WebRTC SSE');
  // const { webRtcId } = event.context.params;
  const webRtcId = getRouterParam(event, 'webRtcId')
  const query = getQuery(event);

  const eventStream = createEventStream(event);

  // const interval = setInterval(async () => {
  //   await eventStream.push({ data: { webRtcId, query } });
  // }, 1000);
  await eventStream.push({ event: 'webrtc', data: { webRtcId, query } });

  eventStream.onClosed(async () => {
    // clearInterval(interval);
    await eventStream.close();
  });

  return eventStream.send();
})
