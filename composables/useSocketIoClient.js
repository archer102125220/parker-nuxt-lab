import * as _socketIoClient from 'socket.io-client';

export function useSocketIoClient(config = { channel: '/default' }) {
  const socketIoClient = computed(() => useNuxtApp().$socketIoClient || _socketIoClient);

  const SocketIo = ref(null);

  function initSocketIoClient(currentConfig = {}) {
    if (typeof window === 'undefined' || typeof socketIoClient?.value?.io !== 'function') return;

    if (typeof SocketIo.value?.disconnect === 'function') {
      SocketIo.value.disconnect();
    }

    const { channel: currentChannel, ...socketIoClientConfig } = (currentConfig?.value || currentConfig);

    const WEBSOCKET_BASE_URL = import.meta.env.VITE_WEBSOCKET_BASE_URL || '';
    const wsUrl = (
      currentChannel.indexOf('ws://') === 0 ||
      currentChannel.indexOf('wss://') === 0 ||
      currentChannel.indexOf('http://') === 0 ||
      currentChannel.indexOf('https://') === 0
    ) ?
      currentChannel :
      currentChannel.indexOf('/') === 0
        ? WEBSOCKET_BASE_URL + currentChannel
        : WEBSOCKET_BASE_URL + '/' + currentChannel;

    console.log({ wsUrl, currentChannel, WEBSOCKET_BASE_URL });

    const newSocketIo = socketIoClient?.value?.io(
      wsUrl,
      {
        ...socketIoClientConfig,
        autoConnect:
          typeof socketIoClientConfig?.autoConnect === 'boolean'
            ? socketIoClientConfig.autoConnect
            : false,
        transports:
          Array.isArray(socketIoClientConfig?.transports)
            ? socketIoClientConfig.transports
            : ['websocket'],
      },
    );

    newSocketIo.io.on('error', (error) => {
      console.error('Socket.IO client error', error);
    });
    newSocketIo.io.on('reconnect_error', (error) => {
      console.error('Socket.IO client reconnect_error', error);
    });
    newSocketIo.io.on('reconnect_failed', (error) => {
      console.error('Socket.IO client reconnect_failed', error);
    });
    newSocketIo.on('connect', () => {
      console.log('Socket.IO client connect', newSocketIo.connected);
    });

    newSocketIo.connect();

    SocketIo.value = newSocketIo;
  }

  onMounted(function () {
    console.log({ socketIoClient, config });

    initSocketIoClient((config?.value || config));

    console.log({ socketIoClient, config, SocketIo });
  });

  onBeforeUnmount(() => {
    if (typeof SocketIo.value?.disconnect === 'function') {
      SocketIo.value.disconnect();
      SocketIo.value = null;
    }
  });

  watch(() => (config?.value || config), initSocketIoClient, { deep: true });

  return SocketIo;
}

export default useSocketIoClient;