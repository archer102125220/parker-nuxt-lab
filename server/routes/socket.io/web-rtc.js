import { useNitroApp } from 'nitropack/dist/runtime/app';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io/web-rtc');
    const nitroApp = useNitroApp();

    nitroApp.$socketEngine.handleRequest(event.node.req, event.node.res);
    event._handled = true;
  },
  websocket: {
    open(peer) {
      console.log('[ws] WebRTC WebSocket connected');

      const nitroApp = useNitroApp();

      // We subscribe to the 'webrtc' channel
      peer.subscribe('webrtc');
      // We publish the number of connected users to the 'webrtc' channel
      peer.publish('webrtc', peer.peers.size);
      // We send the number of connected users to the client
      peer.send(peer.peers.size);

      nitroApp.$socketEngine.prepare(peer._internal.nodeReq);
      nitroApp.$socketEngine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
    },

    message(peer, message) {
      console.log('[ws] WebRTC WebSocket message', peer, message);
      if (message.text().includes('ping')) {
        peer.send('pong');
      }
    },

    close(peer) {
      console.log('[ws] WebRTC WebSocket disconnected');
      peer.unsubscribe('webrtc');
      // Wait 500ms before sending the updated locations to the server
      setTimeout(() => {
        peer.publish('webrtc', peer.peers.size);
      }, 500);
    },

    error(peer, error) {
      console.error('[ws] WebRTC WebSocket error', peer, error);
    },
  },
})
