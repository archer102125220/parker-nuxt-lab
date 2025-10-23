import qs from 'qs';
import { useNitroApp } from '#imports';

import { decodeSocketIOPayload } from '@utils/third-party/socket.io-decode';

export default defineEventHandler({
  handler(event) {
    console.log('/socket.io/web-rtc/webRtcId');
    const nitroApp = useNitroApp();

    nitroApp.$socketEngine.handleRequest(event.node.req, event.node.res);
    event._handled = true;
  },
  websocket: {
    open(peer) {
      console.log('[ws-socket.io] WebRTC WebSocket connected');

      const urlParts = (peer.request.url || '').split('/');
      const namespace = (decodedMessage?.nsp || '');
      const _namespace = namespace.replaceAll('/socket.io/web-rtc/', '').replaceAll('/socket.io/web-rtc', '');
      const query = qs.parse((urlParts[urlParts.length - 1] || '').replaceAll('?', ''));
      const webRtcId = _namespace || urlParts[urlParts.length - 1] || query?.webRtcId;

      const nitroApp = useNitroApp();

      // uuid v4
      // https://regex101.com/ 正規表示法測試網址
      // uuid v4 正規表示法 [0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}
      // /^\/socket.io\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      nitroApp.$socketIoServer
        .of(`/socket.io/web-rtc/${webRtcId}`)
        .once('connection', function (socket) {
          let _webRtcId = webRtcId;

          console.log(`/socket.io/web-rtc/${webRtcId} connection`, { _webRtcId });
          console.log('a user connected', socket.id);

          socket.on('webrtcJoin', async function (newWebRtcId) {
            if (typeof newWebRtcId === 'string' && newWebRtcId !== '') {
              _webRtcId = newWebRtcId;
              socket.join(newWebRtcId);
            }

            const socketsInRoom = await nitroApp.$socketIoServer
              .of(`/socket.io/web-rtc/${webRtcId}`)
              .in(_webRtcId).allSockets();

            const socketIdList = Array.from(socketsInRoom);
            const isOffer = socketIdList.length <= 1;

            socket.broadcast.to(_webRtcId).emit('newUser');
            socket.emit('webrtcJoined', {
              id: socket.id,
              newWebRtcId,
              _webRtcId,
              socketIdCount: socketIdList.length,
              isOffer
            });

          });

          socket.on('webrtcDescription', function (payload) {
            console.log({ webrtcPayload: payload, _webRtcId });

            if (typeof webRt_webRtcIdcId === 'string' && _webRtcId !== '') {
              // nitroApp.$socketIoServer
              //   .of(`/socket.io/web-rtc/${webRtcId}`)
              //   .to(webRtcId)
              //   .emit('webrtcDescription', { ...payload, webRtcId: _webRtcId });
              socket
                .broadcast
                .to(_webRtcId)
                .emit('webrtcDescription', { ...payload, webRtcId: _webRtcId });
            } else {
              // nitroApp.$socketIoServer
              //   .of(`/socket.io/web-rtc/${webRtcId}`)
              //   .emit('webrtcDescription', { ...payload, webRtcId: _webRtcId });
              socket
                .broadcast
                .emit('webrtcDescription', { ...payload, webRtcId: _webRtcId });
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

      nitroApp.$socketEngine.prepare(peer.request);
      nitroApp.$socketEngine.onWebSocket(peer.request, peer.request.socket, peer.websocket);
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
