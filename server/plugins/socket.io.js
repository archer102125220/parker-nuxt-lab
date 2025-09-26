import { Server as Engine } from 'engine.io';
import { Server } from 'socket.io';
import * as socketIo from 'socket.io';

export default defineNitroPlugin((nitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
  });

  nitroApp.$socketEngine = engine;
  nitroApp.$socketIoServer = io;
  nitroApp.$socketIo = socketIo;
});