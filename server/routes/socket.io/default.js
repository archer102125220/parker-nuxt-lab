import { useNitroApp } from 'nitropack/dist/runtime/app';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io/default');
    const nitroApp = useNitroApp();

    nitroApp.$socketEngine.handleRequest(event.node.req, event.node.res);
    event._handled = true;
  },
  websocket: {
    open(peer) {
      console.log('[ws] Default WebSocket connected');

      const nitroApp = useNitroApp();

      // We subscribe to the 'default' channel
      peer.subscribe('default');
      // We publish the number of connected users to the 'default' channel
      peer.publish('default', peer.peers.size);
      // We send the number of connected users to the client
      peer.send(peer.peers.size);

      nitroApp.$socketEngine.prepare(peer._internal.nodeReq);
      nitroApp.$socketEngine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
    },

    message(peer, message) {
      console.log('[ws] Default WebSocket message', peer, message);
      if (message.text().includes('ping')) {
        peer.send('pong');
      }
    },

    close(peer) {
      console.log('[ws] Default WebSocket disconnected');
      peer.unsubscribe('default');
      // Wait 500ms before sending the updated locations to the server
      setTimeout(() => {
        peer.publish('default', peer.peers.size);
      }, 500);
    },

    error(peer, error) {
      console.error('[ws] Default WebSocket error', peer, error);
    },
  },
})
