import * as _socketIoClient from 'socket.io-client';

export function useSocketIoClient(config = { channel: '/', listener: {} }, senderSetting = {}, afterInit = () => { }) {
  const socketIoClient = computed(() => useNuxtApp().$socketIoClient || _socketIoClient);

  const SocketIo = reactive({
    io: null,
    connected: false
  });
  const unwatchSender = ref(null);

  function initSocketIoClient(currentConfig = {}, isReInit = false) {
    if (typeof window === 'undefined' || typeof socketIoClient?.value?.io !== 'function') return;

    if (typeof SocketIo.io?.disconnect === 'function') {
      SocketIo.io.disconnect();
    }

    const {
      channel: currentChannel,
      channelAsPath = true,
      listener = {},
      ...socketIoClientConfig
    } = (currentConfig?.value || currentConfig);

    const DOMAIN = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_DOMAIN || window?.location?.origin) || '';
    const SOCKET_IO_BASE_PATH = import.meta.env.VITE_SOCKET_IO_BASE_PATH || '/socket.io';
    const path =
      currentChannel === '/'
        ? SOCKET_IO_BASE_PATH
        : currentChannel.indexOf('/') === 0
          ? SOCKET_IO_BASE_PATH + currentChannel
          : SOCKET_IO_BASE_PATH + '/' + currentChannel;
    const socketIoUrl = (DOMAIN + path);

    const newSocketIo = socketIoClient?.value?.io(
      socketIoUrl,
      {
        path: channelAsPath === true ? path.includes('?') ? path.substring(0, path.indexOf('?')) : path : undefined,
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

    newSocketIo.on('connect', (...arg) => {
      SocketIo.connected = newSocketIo.connected;

      if (typeof listener.connect === 'function') {
        listener.connect(...arg);
      }
    });
    newSocketIo.on('disconnect', () => {
      SocketIo.connected = newSocketIo.connected;

      if (typeof listener.disconnect === 'function') {
        listener.disconnect(...arg);
      }
    });

    if (typeof listener === 'object' && listener !== null) {
      Object.keys(listener).forEach(listenerKey => {
        if (
          ['connect', 'disconnect'].includes(listenerKey) === false &&
          typeof listener[listenerKey] === 'function'
        ) {
          newSocketIo.on(listenerKey, listener[listenerKey]);
        }
      });
    }

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

    // if (import.meta.dev) {
    //   newSocketIo.on('connect', () => {
    //     console.log('Socket.IO client connect', newSocketIo.connected);
    //   });
    //   newSocketIo.on('disconnect', () => {
    //     console.log('Socket.IO client disconnect', newSocketIo.connected);
    //   });
    // }

    newSocketIo.connect();

    SocketIo.io = newSocketIo;
  }

  function handleUnwatch() {
    const safeUnwatchSender = unwatchSender.value || null;
    if (typeof safeUnwatchSender === 'object' && safeUnwatchSender !== null) {

      Object.keys(safeUnwatchSender).forEach(safeUnwatchSenderKey => {
        if (typeof safeUnwatchSender[safeUnwatchSenderKey] === 'function') {
          safeUnwatchSender[safeUnwatchSenderKey]();
        }
      });
    }
  }

  onMounted(async function () {
    initSocketIoClient((config?.value || config));

    await nextTick();
    handleUnwatch();

    if (typeof senderSetting === 'object' && senderSetting !== null) {

      const newUnwatchSender = {};
      Object.keys(senderSetting).forEach(senderSettingKey => {
        const getSendValue = () => {
          if (typeof senderSetting[senderSettingKey]?.value === 'function') {
            return senderSetting[senderSettingKey]?.value();
          }
          return senderSetting[senderSettingKey]?.value;
        }

        const sendValue = getSendValue();

        if (senderSetting[senderSettingKey]?.watch === true) {

          newUnwatchSender[senderSettingKey] = watch(
            getSendValue,
            (newSendValue) => {
              SocketIo.io.emit(senderSettingKey, newSendValue);
            },
            { deep: typeof sendValue === 'object' }
          );
        }

        if (sendValue !== null && sendValue !== undefined) {
          SocketIo.io.emit(senderSettingKey, sendValue);
        }
      });

      console.log({ newUnwatchSender });
      unwatchSender.value = newUnwatchSender;
    } else {
      unwatchSender.value = null;
    }
  });

  onBeforeUnmount(handleUnwatch);
  onUnmounted(() => {
    if (typeof SocketIo.io?.disconnect === 'function') {
      SocketIo.io.disconnect();
      SocketIo.io = null;
    }
  });

  watch(
    () => (config?.value || config),
    (newConfig) => initSocketIoClient(newConfig, true),
    { deep: true }
  );

  return SocketIo;
}

export default useSocketIoClient;