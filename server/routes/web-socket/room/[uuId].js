export default defineWebSocketHandler({
  open(peer) {
    console.log('[ws] Room WebSocket open');

    // We subscribe to the `room-${peer.webRtcId}` channel
    peer.subscribe(`room-${peer.webRtcId}`);
    // We publish the number of connected users to the `room-${peer.webRtcId}` channel
    peer.publish(`room-${peer.webRtcId}`, peer.peers.size);
    // We send the number of connected users to the client
    peer.send(peer.peers.size);
  },

  message(peer, message) {
    const messageJson = JSON.parse(message.text());
    // console.log('[ws] Room WebSocket message', peer, message);
    // console.log('[ws] Room WebSocket message', message);
    console.log('[ws] Room WebSocket peer.uuId', peer.uuId);
    console.log('[ws] Room WebSocket messageJson', messageJson);

    if (messageJson.event === 'ping') {
      peer.send({ ...messageJson, event: 'pong' });
    }
  },

  close(peer) {
    console.log('[ws] Room WebSocket close');

    peer.unsubscribe(`room-${peer.webRtcId}`);
    // Wait 500ms before sending the updated locations to the server
    setTimeout(() => {
      peer.publish(`room-${peer.webRtcId}`, peer.peers.size);
    }, 500);
  },


  error(peer, error) {
    // console.log("[ws] Room WebSocket error", peer, error);
    console.log("[ws] Room WebSocket error", error);
  },
});
