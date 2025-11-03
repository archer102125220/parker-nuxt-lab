import qs from 'qs';
import { useNitroApp } from '#imports';

// import { defineEventHandler } from 'h3';

// import { decodeSocketIOPayload } from '@server/utils/socket.io-decode';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io/web-rtc');
    const nitroApp = useNitroApp();

    nitroApp.$attachSocketIOHandler(event);
  },
  websocket: {
    open(peer) {
      console.log('[ws-socket.io] WebRTC WebSocket connected');

      const urlParts = (peer.request.url || '').split('/');
      const query = qs.parse((urlParts[urlParts.length - 1] || '').replaceAll('?', ''));
      const queryWebRtcId = query?.webRtcId || '';

      const nitroApp = useNitroApp();

      nitroApp.$attachSocketIO(peer, function (_peer, _nitroApp) {
        _nitroApp.$socketIoServer
          .of('/socket.io/web-rtc')
          .once('connection', function (socket) {
            let webRtcId = queryWebRtcId;

            console.log('/socket.io/web-rtc connection', { webRtcId });
            console.log('a user connected', socket.id);

            socket.on('webrtcJoin', async function (newWebRtcId) {
              if (typeof newWebRtcId === 'string' && newWebRtcId !== '') {
                webRtcId = newWebRtcId;
                socket.join(newWebRtcId);
              }

              const socketsInRoom = await _nitroApp.$socketIoServer
                .of('/socket.io/web-rtc')
                .in(webRtcId).allSockets();

              const socketIdList = Array.from(socketsInRoom);
              const isOffer = socketIdList.length <= 1;

              socket.broadcast.to(webRtcId).emit('newUser');
              socket.emit('webrtcJoined', {
                id: socket.id,
                newWebRtcId,
                webRtcId,
                socketIdCount: socketIdList.length,
                isOffer
              });

            });

            socket.on('webrtcDescription', function (payload) {
              console.log({ webrtcPayload: payload, webRtcId });

              if (typeof webRtcId === 'string' && webRtcId !== '') {
                // _nitroApp.$socketIoServer
                //   .of('/socket.io/web-rtc')
                //   .to(webRtcId)
                //   .emit('webrtcDescription', { ...payload, webRtcId });
                socket
                  .broadcast
                  .to(webRtcId)
                  .emit('webrtcDescription', { ...payload, webRtcId });
              } else {
                // _nitroApp.$socketIoServer
                //   .of('/socket.io/web-rtc')
                //   .emit('webrtcDescription', { ...payload, webRtcId });
                socket
                  .broadcast
                  .emit('webrtcDescription', { ...payload, webRtcId });
              }
            });

            socket.on('sendPrivate', function (data) {
              const { targetId: targetSocketId, ...payload } = data; // 假設客戶端在數據中傳遞了目標ID

              // 使用 socket.to(socketId)
              socket.broadcast.to(targetSocketId).emit('privateMsg', payload);
            });

            socket.on('ping', function (callback) {
              console.log({ callback });
              if (typeof callback === 'function') {
                callback();
              }
            });
          });
      });
    },

    async message(peer, message) {
      console.log('[ws-socket.io] WebRTC WebSocket message');
      // console.log('[ws-socket.io] WebRTC WebSocket message.data.toString()', message.data.toString());
      // const decodedMessage = await decodeSocketIOPayload(message.data.toString());
      // console.log('[ws-socket.io] WebRTC WebSocket decoded message', decodedMessage);
    },

    close(peer) {
      console.log('[ws-socket.io] WebRTC WebSocket close');
    },

    error(peer, error) {
      console.log('[ws-socket.io] WebRTC WebSocket error', error);
    },
  },
})
