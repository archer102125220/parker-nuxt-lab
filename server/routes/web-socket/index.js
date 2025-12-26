// https://nitro.build/guide/websocket
// https://hub.nuxt.com/docs/features/realtime
// import { defineWebSocketHandler } from 'h3';

export default defineWebSocketHandler({
  open(peer) {
    console.log('[ws] Default WebSocket open');

    // We subscribe to the 'default' channel
    peer.subscribe('default');
    // We publish the number of connected users to the 'default' channel
    peer.publish('default', peer.peers.size);
    // We send the number of connected users to the client
    peer.send(peer.peers.size);
  },

  message(peer, message) {
    const messageJson = JSON.parse(message.text());
    // console.log('[ws] Default WebSocket message', peer, message);
    // console.log('[ws] Default WebSocket message', message);
    console.log('[ws] Default WebSocket messageJson', messageJson);

    if (messageJson.event === 'ping') {
      peer.send({
        ...messageJson,
        event: 'pong'
      });
    }

    // 廣播事件：發送給所有連線（包含發送者自己透過 peer.send）
    if (messageJson.event === 'broadcast-message') {
      // 發送給頻道內所有其他 peers（不含發送者）
      peer.publish('default', messageJson);
      // 也發送給發送者自己
      peer.send(messageJson);
    }

    // 原本的事件：只回傳給發送者
    if (
      typeof messageJson.event === 'string' &&
      messageJson.event !== '' &&
      messageJson.event !== 'broadcast-message'
    ) {
      peer.send(messageJson);
    }
  },

  close(peer) {
    console.log('[ws] Default WebSocket close');

    peer.unsubscribe('default');
    // Wait 500ms before sending the updated locations to the server
    setTimeout(() => {
      peer.publish('default', peer.peers.size);
    }, 500);
  },

  error(peer, error) {
    // console.log('[ws] Default WebSocket error', peer, error);
    console.log('[ws] Default WebSocket error', error);
  }
});
