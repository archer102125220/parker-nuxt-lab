import { useNitroApp } from '#imports';

import { decodeSocketIOPayload } from '@/utils/third-party/socket.io-decode';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io/room/uuid');
    const nitroApp = useNitroApp();

    nitroApp.$socketEngine.handleRequest(event.node.req, event.node.res);
    event._handled = true;
  },
  websocket: {
    open(peer) {
      console.log('[ws-socket.io] Room WebSocket connected');

      const nitroApp = useNitroApp();

      nitroApp.$socketEngine.prepare(peer._internal.nodeReq);
      nitroApp.$socketEngine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
    },

    async message(peer, message) {
      // console.log('[ws-socket.io] Room WebSocket message', peer, message);
      // console.log('[ws-socket.io] Room WebSocket message', message);
      console.log('[ws-socket.io]  Room WebSocket peer.uuId', peer.uuId);
      console.log('[ws-socket.io] Room WebSocket message.data.toString()', message.data.toString());

      const decodedMessage = await decodeSocketIOPayload(message.data.toString());
      console.log('[ws-socket.io] Room WebSocket decoded message', decodedMessage);

      const nitroApp = useNitroApp();
      if (typeof decodedMessage?.data?.[0] === 'string') {
        // nitroApp.$socketIoServer.of('/socket.io/web-rtc').emit(decodedMessage.data[0], decodedMessage.data[1]);
        nitroApp.$socketIoServer.of(`/socket.io/${peer.uuId}`).emit(decodedMessage.data[0], decodedMessage.data[1]);
      }
    },

    close(peer) {
      console.log('[ws-socket.io] Room WebSocket close');
    },

    error(peer, error) {
      console.log('[ws-socket.io] Room WebSocket error', error);
    },
  },
})
