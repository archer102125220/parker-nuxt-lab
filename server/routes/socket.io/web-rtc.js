import { useNitroApp } from '#imports';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io/web-rtc');
    const nitroApp = useNitroApp();

    nitroApp.$socketEngine.handleRequest(event.node.req, event.node.res);
    event._handled = true;
  },
  websocket: {
    open(peer) {
      console.log('[ws-socket.io] WebRTC WebSocket connected');

      const nitroApp = useNitroApp();

      nitroApp.$socketEngine.prepare(peer._internal.nodeReq);
      nitroApp.$socketEngine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
    },

    message(peer, message) {
      // console.log("[ws-socket.io] WebRTC WebSocket message", peer, message);
      console.log("[ws-socket.io] WebRTC WebSocket message", message);
    },

    close(peer) {
      console.log('[ws-socket.io] WebRTC WebSocket close');
    },

    error(peer, error) {
      console.log("[ws-socket.io] WebRTC WebSocket error", error);
    },
  },
})
