import { useNitroApp } from '#imports';

import { decodeSocketIOPayload } from '@server/utils/socket.io-decode';

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

      const urlParts = (peer.request.url || '').split('/');
      const namespace = (decodedMessage?.nsp || '');
      const _namespace = namespace.replaceAll('/socket.io/room/', '').replaceAll('/socket.io/room', '');
      const query = qs.parse((urlParts[urlParts.length - 1] || '').replaceAll('?', ''));
      const uuId = urlParts[urlParts.length - 1] || query?.uuId || _namespace;

      // uuid v4
      // https://regex101.com/ 正規表示法測試網址
      // uuid v4 正規表示法 [0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}
      // /^\/socket.io\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      nitroApp.$socketIoServer
        .of(/^\/socket.io\/room\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
        .once('connection', function (socket) {
          console.log('/socket.io/room/[uuId] connection', { uuId });
          console.log('a user connected', socket.id);

          // socket.on('room', function (payload) {
          //   console.log({ roomPayload: payload, uuId });

          //   if (typeof uuId === 'string' && uuId !== '') {
          //     nitroApp.$socketIoServer
          //       .of(/^\/socket.io\/room\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
          //       .in(uuId)
          //       .emit('room', { ...payload, uuId });
          //   } else {
          //     socket.emit('room', { ...payload, uuId });
          //   }
          // });

          socket.on('ping', function (callback) {
            callback();
          });
        });

      nitroApp.$socketEngine.prepare(peer.request);
      nitroApp.$socketEngine.onWebSocket(peer.request, peer.request.socket, peer.websocket);
    },

    async message(peer, message) {
      const decodedMessage = await decodeSocketIOPayload(message.data.toString());
      console.log('[ws-socket.io] Room WebSocket decoded message', decodedMessage);
    },

    close(peer) {
      console.log('[ws-socket.io] Room WebSocket close');
    },

    error(peer, error) {
      console.log('[ws-socket.io] Room WebSocket error', error);
    },
  },
})
