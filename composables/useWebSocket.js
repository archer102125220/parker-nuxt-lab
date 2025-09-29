import _createWebSocket from '@/utils/helpers/web-socket';

export function useWebSocket(config = { channel: '/web-socket' }) {
  const runtimeConfig = useRuntimeConfig();
  const createWebSocket = computed(() => useNuxtApp().$createWebSocket || _createWebSocket);

  const WebSocket = ref(null);

  function initWebSocket(currentConfig = {}) {
    if (typeof window === 'undefined' || typeof createWebSocket?.value !== 'function') return;

    if (typeof WebSocket.value?.close === 'function') {
      WebSocket.value.close();
    }

    const { channel: currentChannel, ...webSocketConfig } = (currentConfig?.value || currentConfig);

    const DOMAIN = (runtimeConfig?.public?.isDev === true ? window?.location?.origin : import.meta.env.VITE_SOCKET_IO_BASE_PATH || window?.location?.origin) || '';
    const WEBSOCKET_BASE_PATH = import.meta.env.VITE_WEBSOCKET_BASE_PATH || '/web-socket';
    const path =
      currentChannel.indexOf('/') === 0
        ? WEBSOCKET_BASE_PATH + currentChannel
        : WEBSOCKET_BASE_PATH + '/' + currentChannel;

    const newWebSocket = createWebSocket?.value(
      {
        ...webSocketConfig,
        url: DOMAIN + path,
      },
    );

    newWebSocket.addEventListener('error', (error) => {
      console.error('WebSocket client error', error);
    });
    newWebSocket.addEventListener('open', () => {
      console.log('WebSocket client open', newWebSocket);
    });
    newWebSocket.addEventListener('close', () => {
      console.log('WebSocket client close', newWebSocket);
    });

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

export default useWebSocketClient;