import * as _socketIoClient from 'socket.io-client';

export function useSocketIoClient(config = { channel: '/', listener: {} }, senderSetting = {}, afterInit = () => { }) {
  const socketIoClient = computed(() => useNuxtApp().$socketIoClient || _socketIoClient);

  const SocketIo = ref(null);
  const unwatchSender = ref(null);

  function initSocketIoClient(currentConfig = {}, isReInit = false) {
    if (typeof window === 'undefined' || typeof socketIoClient?.value?.io !== 'function') return;

    if (typeof SocketIo.value?.disconnect === 'function') {
      SocketIo.value.disconnect();
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

    if (typeof listener === 'object' && listener !== null) {
      Object.keys(listener).forEach(listenerKey => {
        if (typeof listener[listenerKey] === 'function') {
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

    SocketIo.value = newSocketIo;
  }

  function handleUnwatch() {
    const safeUnwatchSender = unwatchSender.value || null;
    if (typeof safeUnwatchSender === 'object' && safeUnwatchSender !== null) {
      console.log({ safeUnwatchSender });

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
      console.log({ senderSetting });

      const newUnwatchSender = {};
      Object.keys(senderSetting).forEach(senderSettingKey => {
        const getSendValue = () => {
          if (typeof senderSetting[senderSettingKey]?.value === 'function') {
            return senderSetting[senderSettingKey]?.value();
          }
          return senderSetting[senderSettingKey]?.value;
        }

        const sendValue = getSendValue() || null;
        console.log({ sendValue });

        if (senderSetting[senderSettingKey]?.watch === true) {
          console.log(senderSetting[senderSettingKey]?.watch);
          newUnwatchSender[senderSettingKey] = watch(
            getSendValue,
            (newSendValue) => {
              console.log({ newSendValue });
              SocketIo.value.emit(senderSettingKey, newSendValue);
            },
            { deep: typeof sendValue === 'object' }
          );
        }

        if (sendValue !== null && sendValue !== undefined) {
          SocketIo.value.emit(senderSettingKey, sendValue);
        }
      });

      console.log({ newUnwatchSender });
      unwatchSender.value = newUnwatchSender;
    } else {
      unwatchSender.value = null;
    }
  });

  onBeforeUnmount(() => {
    if (typeof SocketIo.value?.disconnect === 'function') {
      SocketIo.value.disconnect();
      SocketIo.value = null;
    }

    handleUnwatch();
  });

  watch(
    () => (config?.value || config),
    (newConfig) => initSocketIoClient(newConfig, true),
    { deep: true }
  );

  return SocketIo;
}

export default useSocketIoClient;