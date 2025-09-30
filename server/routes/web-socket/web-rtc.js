export default defineWebSocketHandler({
  open(peer) {
    console.log('[ws] webRTC WebSocket open');

    // We subscribe to the 'webrtc' channel
    peer.subscribe('webrtc');
    // We publish the number of connected users to the 'webrtc' channel
    peer.publish('webrtc', peer.peers.size);
    // We send the number of connected users to the client
    peer.send(peer.peers.size);
  },

  message(peer, message) {
    const messageJson = JSON.parse(message.text());
    // console.log('[ws] Default WebSocket message', peer, message);
    // console.log('[ws] Default WebSocket message', message);
    console.log('[ws] Default WebSocket messageJson', messageJson);

    if (messageJson.event === 'ping') {
      peer.send({ ...messageJson, event: 'pong' });
    }
  },

  close(peer) {
    console.log('[ws] webRTC WebSocket close');

    peer.unsubscribe('webrtc');
    // Wait 500ms before sending the updated locations to the server
    setTimeout(() => {
      peer.publish('webrtc', peer.peers.size);
    }, 500);
  },


  error(peer, error) {
    // console.log("[ws] Default WebSocket error", peer, error);
    console.log("[ws] webRTC WebSocket error", error);
  },
});
