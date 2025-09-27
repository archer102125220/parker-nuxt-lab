// https://nitro.build/guide/websocket
// https://hub.nuxt.com/docs/features/realtime

export default defineWebSocketHandler({
  open(peer) {
    console.log('[ws] Default WebSocket open');

    // We subscribe to the 'default' channel
    peer.subscribe('default');
    // We publish the number of connected users to the 'default' channel
    peer.publish('default', peer.peers.size);
    // We send the number of connected users to the client
    peer.send(peer.peers.size);
  },

  message(peer, message) {
    // console.log("[ws] Default WebSocket message", peer, message);
    console.log("[ws] Default WebSocket message", message);
    if (message.text().includes("ping")) {
      peer.send("pong");
    }
  },

  close(peer) {
    console.log('[ws] Default WebSocket close');

    peer.unsubscribe('default');
    // Wait 500ms before sending the updated locations to the server
    setTimeout(() => {
      peer.publish('default', peer.peers.size);
    }, 500);
  },

  error(peer, error) {
    // console.log("[ws] Default WebSocket error", peer, error);
    console.log("[ws] Default WebSocket error", error);
  },
});
