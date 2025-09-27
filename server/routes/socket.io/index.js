// https://nitro.build/guide/websocket
// https://hub.nuxt.com/docs/features/realtime
// https://socket.io/how-to/use-with-nuxt
import { useNitroApp } from '#imports';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io');
    const nitroApp = useNitroApp();

    nitroApp.$socketEngine.handleRequest(event.node.req, event.node.res);
    event._handled = true;
  },
  websocket: {
    open(peer) {
      console.log('[ws] Default WebSocket connected');

      const nitroApp = useNitroApp();

      // 
      nitroApp.$socketEngine.prepare(peer._internal.nodeReq);
      nitroApp.$socketEngine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
    },
  },
})
