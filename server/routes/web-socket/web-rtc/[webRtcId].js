import qs from 'qs';

let isOffer = false;
export default defineWebSocketHandler({
  open(peer) {
    console.log('[ws] WebRTC WebSocket open');

    const urlParts = (peer.request?.url || '').split('/');
    const query = qs.parse((urlParts[urlParts.length - 1] || '').replaceAll('?', ''));
    const webRtcId = query?.webRtcId || urlParts[urlParts.length - 1] || '';

    isOffer = peer.peers.size <= 1;

    // We subscribe to the `web-rtc-${peer.id}` channel
    peer.subscribe(`web-rtc-${peer.id}`);
    // We publish the number of connected users to the `web-rtc-${peer.id}` channel
    peer.publish(`web-rtc-${peer.id}`, `${peer.peers.size}`);

    // We subscribe to the `web-rtc-${webRtcId}` channel
    peer.subscribe(`web-rtc-${webRtcId}`);
    // We publish the number of connected users to the `web-rtc-${webRtcId}` channel
    peer.publish(`web-rtc-${webRtcId}`, `${peer.peers.size}`);

    // We send the number of connected users to the client
    peer.send(peer.peers.size);
  },

  message(peer, message) {
    const urlParts = (peer.request?.url || '').split('/');
    const query = qs.parse((urlParts[urlParts.length - 1] || '').replaceAll('?', ''));
    const webRtcId = query?.webRtcId || urlParts[urlParts.length - 1] || '';

    const messageJson = JSON.parse(message.text());
    // console.log('[ws] WebRTC WebSocket message', peer, message);
    // console.log('[ws] WebRTC WebSocket message', message);
    console.log('[ws] WebRTC WebSocket webRtcId', webRtcId);
    console.log('[ws] WebRTC WebSocket messageJson', messageJson);

    if (messageJson.event === 'webrtcJoin') {
      peer.publish(`web-rtc-${webRtcId}`, JSON.stringify({ event: 'newUser' }));

      peer.send(
        JSON.stringify({
          event: 'webrtcJoined',
          data: {
            isOffer,
            webRtcId,
            id: peer.id,
            peersCount: peer.peers.size
          }
        })
      );
    } else if (messageJson.event === 'webrtcDescription') {
      peer.publish(`web-rtc-${webRtcId}`,
        JSON.stringify({
          ...messageJson,
          event: 'webrtcDescription'
        })
      );
    } else if (messageJson.event === 'sendPrivate') {
      const targetSocketId = messageJson.targetId;
      peer.publish(targetSocketId,
        JSON.stringify({
          ...messageJson,
          event: 'privateMsg'
        })
      );
    } else if (messageJson.event === 'ping') {
      peer.send({ ...messageJson, event: 'pong' });
    }
  },

  close(peer, event) {
    // console.log('[ws] WebRTC WebSocket close', peer, event);
    console.log('[ws] WebRTC WebSocket close');

    peer.unsubscribe(`web-rtc-${peer.id}`);
    peer.unsubscribe(`web-rtc-${peer.webRtcId}`);

    // Wait 500ms before sending the updated locations to the server
    setTimeout(() => {
      peer.publish(`web-rtc-${peer.id}`, `${peer.peers.size}`);
      peer.publish(`web-rtc-${peer.webRtcId}`, `${peer.peers.size}`);
    }, 500);
  },

  error(peer, error) {
    // console.log("[ws] WebRTC WebSocket error", peer, error);
    console.log("[ws] WebRTC WebSocket error", error);
  },
});
