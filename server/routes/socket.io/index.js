// https://socket.io/how-to/use-with-nuxt
// https://github.com/socketio/socket.io/discussions/5021
import { useNitroApp } from '#imports';
import { defineEventHandler } from 'h3';

import { decodeSocketIOPayload } from '@server/utils/socket.io-decode';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io');
    const nitroApp = useNitroApp();

    nitroApp.$attachSocketIOHandler(event);
  },
  websocket: {
    open(peer) {
      console.log('[ws-socket.io] Default WebSocket connected');

      const nitroApp = useNitroApp();

      console.log('[ws-socket.io] Default WebSocket open:', peer.id);

      nitroApp.$socketIoServer
        .of('/socket.io')
        .once('connection', function (socket) {
          console.log('/socket.io connection');
          console.log('a user connected', socket.id);

          socket.on('socket.io-test', function (payload) {
            console.log({ socketIoPayload: payload });

            socket.emit('socket.io-test', payload);
          });

          socket.on('message', function (payload) {
            console.log({ socketIoPayload: payload });

            socket.emit('message', payload);
          });

          socket.on('ping', function (callback) {
            callback();
          });
        });

      nitroApp.$attachSocketIO(peer);
    },

    async message(peer, message) {
      const decodedMessage = await decodeSocketIOPayload(message.data.toString());
      console.log('[ws-socket.io] Default WebSocket decoded message', decodedMessage);

      // const nitroApp = useNitroApp();
      // if (typeof decodedMessage?.data?.[0] === 'string') {
      //   nitroApp.$socketIoServer.of('/socket.io').emit(decodedMessage.data[0], decodedMessage.data[1]);
      // }
    },

    close(peer) {
      console.log('[ws-socket.io] Default WebSocket close');
    },

    error(peer, error) {
      console.log('[ws-socket.io] Default WebSocket error', error);
    },
  },
})
