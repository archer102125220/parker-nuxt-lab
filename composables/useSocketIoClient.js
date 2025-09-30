import * as _socketIoClient from 'socket.io-client';

export function useSocketIoClient(config = { channel: '/socket.io' }, afterInit = () => { }) {
  const runtimeConfig = useRuntimeConfig();
  const socketIoClient = computed(() => useNuxtApp().$socketIoClient || _socketIoClient);

  const SocketIo = ref(null);

  function initSocketIoClient(currentConfig = {}) {
    if (typeof window === 'undefined' || typeof socketIoClient?.value?.io !== 'function') return;

    if (typeof SocketIo.value?.disconnect === 'function') {
      SocketIo.value.disconnect();
    }

    const { channel: currentChannel, ...socketIoClientConfig } = (currentConfig?.value || currentConfig);

    const DOMAIN = (runtimeConfig?.public?.isDev === true ? window?.location?.origin : import.meta.env.VITE_SOCKET_IO_BASE_PATH || window?.location?.origin) || '';
    const SOCKET_IO_BASE_PATH = import.meta.env.VITE_SOCKET_IO_BASE_PATH || '/socket.io';
    const path =
      currentChannel === '/'
        ? SOCKET_IO_BASE_PATH
        : currentChannel.indexOf('/') === 0
          ? SOCKET_IO_BASE_PATH + currentChannel
          : SOCKET_IO_BASE_PATH + '/' + currentChannel;
    const socketIoUrl = DOMAIN + path;

    const newSocketIo = socketIoClient?.value?.io(
      // DOMAIN,
      socketIoUrl,
      {
        // path,
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

    if (typeof afterInit === 'function') {
      afterInit(newSocketIo);
    }

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
    newSocketIo.on('disconnect', () => {
      console.log('Socket.IO client disconnect', newSocketIo.connected);
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