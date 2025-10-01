// 官方文檔推薦使用 nitroApp.use('socket.io路由', 處理函式)的方式實作
// 由於希望能維持Nuxt原有的文件式路由，因此嘗試與官方範例不同實作方式，工作上專案要使用的情況仍推薦使用官方做法
// https://socket.io/how-to/use-with-nuxt
// https://github.com/socketio/socket.io/discussions/5021

/*
// 官方推薦做法
import { Server as Engine } from 'engine.io';
import { Server } from 'socket.io';
import { defineEventHandler } from 'h3';

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on('connection', (socket) => {

    socket.on('ping', (callback) => {
      callback();
    });

    socket.on('message', (data) => {
     console.log('server plugins socket.io Received message:', data);
     // Broadcast the message to all connected clients
      io.emit('message', data);
    });
  });

  nitroApp.router.use('/socket.io/', defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        // @ts-expect-error private method and property
        engine.prepare(peer._internal.nodeReq);
        // @ts-expect-error private method and property
        engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
      }
    }
  }));
});
*/

import { Server as Engine } from 'engine.io';
import { Server } from 'socket.io';
import * as socketIo from 'socket.io';

export default defineNitroPlugin((nitroApp) => {
  console.log('server plugins socket.io');

  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.of('/socket.io').on('connection', (socket) => {
    console.log('/socket.io connection');
    console.log('a user connected', socket.id);

    socket.on('ping', (callback) => {
      callback();
    });
  });

  // io.of('/socket.io/web-rtc').on('connection', (socket) => {
  //   console.log('/socket.io/web-rtc connection');
  //   console.log('a user connected', socket.id);

  //   socket.on('ping', (callback) => {
  //     callback();
  //   });
  // });
  // uuid v4
  // https://regex101.com/ 正規表示法測試網址
  // uuid v4 正規表示法 [0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}
  // /^\/socket.io\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  io.of(/^\/socket.io\/web-rtc\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    .on('connection', (socket) => {
      console.log('/socket.io/web-rtc/[webRtcId] connection');
      console.log('a user connected', socket.id);

      socket.on('ping', (callback) => {
        callback();
      });
    });

  nitroApp.$socketEngine = engine;
  nitroApp.$socketIoServer = io;
  nitroApp.$socketIo = socketIo;


  nitroApp.hooks.hook('close', async () => {
    io.close();
    engine.close();
  });
});