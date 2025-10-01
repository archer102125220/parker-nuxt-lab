export default defineWebSocketHandler({
  open(peer) {
    console.log('[ws] WebRTC WebSocket open');

    // We subscribe to the `web-rtc-${peer.webRtcId}` channel
    peer.subscribe(`web-rtc-${peer.webRtcId}`);
    // We publish the number of connected users to the `web-rtc-${peer.webRtcId}` channel
    peer.publish(`web-rtc-${peer.webRtcId}`, peer.peers.size);
    // We send the number of connected users to the client
    peer.send(peer.peers.size);
  },

  message(peer, message) {
    const messageJson = JSON.parse(message.text());
    // console.log('[ws] WebRTC WebSocket message', peer, message);
    // console.log('[ws] WebRTC WebSocket message', message);
    console.log('[ws] WebRTC WebSocket peer.webRtcId', peer.webRtcId);
    console.log('[ws] WebRTC WebSocket messageJson', messageJson);

    if (messageJson.event === 'ping') {
      peer.send({ ...messageJson, event: 'pong' });
    }
  },

  close(peer) {
    console.log('[ws] WebRTC WebSocket close');

    peer.unsubscribe(`web-rtc-${peer.webRtcId}`);
    // Wait 500ms before sending the updated locations to the server
    setTimeout(() => {
      peer.publish(`web-rtc-${peer.webRtcId}`, peer.peers.size);
    }, 500);
  },


  error(peer, error) {
    // console.log("[ws] WebRTC WebSocket error", peer, error);
    console.log("[ws] WebRTC WebSocket error", error);
  },
});
