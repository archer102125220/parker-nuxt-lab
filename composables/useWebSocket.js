import _createWebSocket from '@/utils/helpers/web-socket';

export function useWebSocket(config = { channel: '/web-socket', afterInit() { } }) {
  const createWebSocket = computed(() => useNuxtApp().$createWebSocket || _createWebSocket);

  const WebSocket = ref(null);

  function initWebSocket(currentConfig = {}) {
    if (typeof window === 'undefined' || typeof createWebSocket?.value !== 'function') return;

    if (typeof WebSocket.value?.close === 'function') {
      WebSocket.value.close();
    }

    const { channel: currentChannel, afterInit: currentAfterInit, ...webSocketConfig } = (currentConfig?.value || currentConfig);

    const DOMAIN = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_WEBSOCKET_BASE_PATH || window?.location?.origin) || '';
    const WEBSOCKET_BASE_PATH = import.meta.env.VITE_WEBSOCKET_BASE_PATH || '/web-socket';
    const path =
      currentChannel.indexOf('/') === 0
        ? WEBSOCKET_BASE_PATH + currentChannel
        : WEBSOCKET_BASE_PATH + '/' + currentChannel;


    const newWebSocket = createWebSocket?.value(
      {
        ...webSocketConfig,
        open(event, ...arg) {
          console.log('WebSocket client open', event);

          if (this.inited === undefined && typeof currentAfterInit === 'function') {
            handleWaitConnect(currentAfterInit, this)
            this.inited = true;
          }
          if (typeof webSocketConfig.open === 'function') {
            webSocketConfig.open(event, ...arg);
          }
        },
        url: DOMAIN + path,
      },
    );

    WebSocket.value = newWebSocket;
  }

  onMounted(function () {
    console.log({ createWebSocket, config });

    initWebSocket((config?.value || config));

    console.log({ createWebSocket, config, WebSocket });
  });

  onBeforeUnmount(() => {
    if (typeof WebSocket.value?.close === 'function') {
      WebSocket.value.close();
      WebSocket.value = null;
    }
  });

  watch(() => (config?.value || config), initWebSocket, { deep: true });

  return WebSocket;
}

function handleWaitConnect(currentAfterInit, socket) {
  if (socket.readyState !== WebSocket.OPEN) {
    return setTimeout(() => handleWaitConnect(currentAfterInit, socket), 500);
  }
  currentAfterInit(socket);
}

export default useWebSocket;