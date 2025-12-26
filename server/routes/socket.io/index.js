// https://socket.io/how-to/use-with-nuxt
// https://github.com/socketio/socket.io/discussions/5021
import { useNitroApp } from '#imports';
import { defineEventHandler } from 'h3';

import { decodeSocketIOPayload } from '@server/utils/socket.io-decode';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io');
    const nitroApp = useNitroApp();

    nitroApp.$registerSocketIOHandlers(event);
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

          // 取得該 namespace 的 io 實例，用於廣播
          const io = nitroApp.$socketIoServer.of('/socket.io');

          // 原本的事件：只回傳給發送者
          socket.on('socket.io-test', function (payload) {
            console.log({
              socketIoPayload: payload
            });
            socket.emit('socket.io-test', payload);
          });

          // 原本的事件：只回傳給發送者
          socket.on('message', function (payload) {
            console.log({
              socketIoPayload: payload
            });
            socket.emit('message', payload);
          });

          // 廣播事件：發送給所有連線（包含發送者）
          socket.on('broadcast-message', function (payload) {
            console.log({
              broadcastPayload: payload
            });
            io.emit('broadcast-message', payload);
          });

          // 廣播事件：發送給其他連線（不包含發送者）
          socket.on('broadcast-to-others', function (payload) {
            console.log({
              broadcastToOthersPayload: payload
            });
            socket.broadcast.emit('broadcast-to-others', payload);
          });

          socket.on('ping', function (callback) {
            callback();
          });
        });

      nitroApp.$adaptSocketIO(peer);
    },

    async message(peer, message) {
      const decodedMessage = await decodeSocketIOPayload(
        message.data.toString()
      );
      console.log(
        '[ws-socket.io] Default WebSocket decoded message',
        decodedMessage
      );

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
    }
  }
});
