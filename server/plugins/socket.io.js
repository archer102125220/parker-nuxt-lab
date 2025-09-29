import { Server as Engine } from 'engine.io';
import { Server } from 'socket.io';
import * as socketIo from 'socket.io';

export default defineNitroPlugin((nitroApp) => {
  console.log('server plugins socket.io');

  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('ping', (callback) => {
      callback();
    });

    // socket.on('message', (data) => {
    //   console.log('server plugins socket.io Received message:', data);
    //   // Broadcast the message to all connected clients
    //   io.emit('message', data);
    // });
    // socket.on('socket.io-test', (data) => {
    //   console.log('server plugins socket.io Received socket.io-test:', data);
    //   // Broadcast the message to all connected clients
    //   io.emit('socket.io-test', data);
    // });
  });

  nitroApp.$socketEngine = engine;
  nitroApp.$socketIoServer = io;
  nitroApp.$socketIo = socketIo;


  nitroApp.hooks.hook('close', async () => {
    io.close();
  });
});