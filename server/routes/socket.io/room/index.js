import qs from 'qs';
import { useNitroApp } from '#imports';

// import { defineEventHandler } from 'h3';

import { decodeSocketIOPayload } from '@server/utils/socket.io-decode';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io/room');
    const nitroApp = useNitroApp();

    nitroApp.$registerSocketIOHandlers(event);
  },
  websocket: {
    open(peer) {
      console.log('[ws-socket.io] WebRTC WebSocket connected');

      const urlParts = (peer.request.url || '').split('/');
      const query = qs.parse((urlParts[urlParts.length - 1] || '').replaceAll('?', ''));
      const uuId = query?.uuId || '';

      const nitroApp = useNitroApp();

      nitroApp.$socketIoServer.of('/socket.io/room')
        .on('connection', function (socket) {
          console.log('/socket.io/room connection');
          console.log('a user connected', socket.id);

          if (typeof uuId === 'string' && uuId !== '') {
            socket.join(uuId);
          }

          socket.on('ping', function (callback) {
            callback();
          });
        });

      nitroApp.$adaptSocketIO(peer);
    },

    async message(peer, message) {
      // console.log('[ws-socket.io] WebRTC WebSocket message.data.toString()', message.data.toString());
      const decodedMessage = await decodeSocketIOPayload(message.data.toString());
      console.log('[ws-socket.io] WebRTC WebSocket decoded message', decodedMessage);
    },

    close(peer) {
      console.log('[ws-socket.io] WebRTC WebSocket close');
    },

    error(peer, error) {
      console.log('[ws-socket.io] WebRTC WebSocket error', error);
    },
  },
})
