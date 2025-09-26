export default defineEventHandler(async (event) => {
  console.log('WebRTC SSE');

  const query = getQuery(event);

  const eventStream = createEventStream(event);

  const interval = setInterval(async () => {
    await eventStream.push(query);
  }, 1000);

  eventStream.onClosed(async () => {
    clearInterval(interval);
    await eventStream.close();
  });

  return eventStream.send();
})
