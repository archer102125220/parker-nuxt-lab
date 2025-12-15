import * as socketIoClient from 'socket.io-client';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      socketIoClient
    }
  };
});
