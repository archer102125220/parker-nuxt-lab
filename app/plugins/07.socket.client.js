import * as socketIoClient from 'socket.io-client';

export default defineNuxtPlugin(() => {
  console.log('socket.io client');

  return {
    provide: {
      socketIoClient
    }
  };
});
