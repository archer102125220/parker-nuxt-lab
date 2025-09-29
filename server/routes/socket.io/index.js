// https://socket.io/how-to/use-with-nuxt
// https://github.com/socketio/socket.io/discussions/5021
import { useNitroApp } from '#imports';

import { decodeSocketIOPayload } from '@/utils/third-party/socket.io-decode';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io');
    const nitroApp = useNitroApp();

    event.node.req.context = event.context;

    nitroApp.$socketEngine.handleRequest(event.node.req, event.node.res);
    event._handled = true;
  },
  websocket: {
    open(peer) {
      console.log('[ws-socket.io] Default WebSocket connected');

      const nitroApp = useNitroApp();

      // console.log(peer._internal.nodeReq);
      console.log('[ws-socket.io] Default WebSocket open:', peer.id);

      nitroApp.$socketEngine.prepare(peer._internal.nodeReq);
      nitroApp.$socketEngine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
    },

    async message(peer, message) {
      console.log('[ws-socket.io] Default WebSocket message', message);
      console.log('[ws-socket.io] Default WebSocket message.data.toString()', message.data.toString());

      const decodedMessage = await decodeSocketIOPayload(message.data.toString());
      console.log('[ws-socket.io] Default WebSocket decoded message', decodedMessage);

      const nitroApp = useNitroApp();
      if (typeof decodedMessage?.data?.[0] === 'string') {
        nitroApp.$socketIoServer.emit(decodedMessage.data[0], decodedMessage.data[1]);
      }
    },

    close(peer) {
      console.log('[ws-socket.io] Default WebSocket close');
    },

    error(peer, error) {
      console.log('[ws-socket.io] Default WebSocket error', error);
    },
  },
})
