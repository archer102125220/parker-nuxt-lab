import qs from 'qs';
import { useNitroApp } from '#imports';

// import { defineEventHandler } from 'h3';

import { decodeSocketIOPayload } from '@/utils/third-party/socket.io-decode';

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

      const urlParts = (peer._internal.nodeReq.url || '').split('/');
      const query = qs.parse((urlParts[urlParts.length - 1] || '').replaceAll('?', ''));
      const queryWebRtcId = query?.webRtcId || '';

      nitroApp.$socketIoServer
        .of('/socket.io/web-rtc')
        .once('connection', function (socket) {
          let webRtcId = queryWebRtcId;

          console.log('/socket.io/web-rtc connection', { webRtcId });
          console.log('a user connected', socket.id);

          socket.on('webrtcJoin', function (newWebRtcId) {
            console.log({ newWebRtcId: newWebRtcId, ['socket.rooms.size']: socket.rooms.size });

            if (typeof newWebRtcId === 'string' && newWebRtcId !== '') {
              webRtcId = newWebRtcId;
              socket.join(newWebRtcId);
            }

            socket.emit('webrtcJoined', { newWebRtcId, webRtcId, webRtcId, roomsSize: socket.rooms.size });
          });

          socket.on('webrtc', function (payload) {
            console.log({ webrtcPayload: payload, webRtcId });

            if (typeof webRtcId === 'string' && webRtcId !== '') {
              nitroApp.$socketIoServer
                .of('/socket.io/web-rtc')
                .in(webRtcId)
                .emit('webrtc', { ...payload, webRtcId });
            } else {
              nitroApp.$socketIoServer
                .of('/socket.io/web-rtc')
                .emit('webrtc', { ...payload, webRtcId });
            }
          });

          socket.on('ping', function (callback) {
            callback();
          });
        });

      nitroApp.$socketEngine.prepare(peer._internal.nodeReq);
      nitroApp.$socketEngine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
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
