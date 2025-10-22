import _createWebSocket from '@/utils/helpers/web-socket';

const DOMAIN = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_DOMAIN || window?.location?.origin) || '';
const WEBSOCKET_BASE_PATH = import.meta.env.VITE_WEBSOCKET_BASE_PATH || '/web-socket';

export function useWebSocket(config = { channel: '/' }, senderSetting = {}, afterInit = () => { }) {
  const createWebSocket = computed(() => useNuxtApp().$createWebSocket || _createWebSocket);

  const WebSocket = ref(null);
  const unwatchSender = ref(null);

  function initWebSocket(currentConfig = {}) {
    if (typeof window === 'undefined' || typeof createWebSocket?.value !== 'function') return;

    if (typeof WebSocket.value?.close === 'function') {
      WebSocket.value.close();
    }

    const {
      channel: currentChannel,
      ...webSocketConfig
    } = (currentConfig?.value || currentConfig);

    const path =
      currentChannel.indexOf('/') === 0
        ? WEBSOCKET_BASE_PATH + currentChannel
        : WEBSOCKET_BASE_PATH + '/' + currentChannel;

    const newWebSocket = createWebSocket?.value(
      {
        ...webSocketConfig,
        open(event, ...arg) {
          console.log('WebSocket client open', event);

          if (this.inited === undefined && typeof afterInit === 'function') {
            handleWaitConnect(afterInit, this)
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

  watch(() => (config?.value || config), initWebSocket, { deep: true });

  onMounted(async function () {
    initWebSocket((config?.value || config));

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
              WebSocket.value.send(senderSettingKey, newSendValue);
            },
            { deep: typeof sendValue === 'object' }
          );
        }

        if (sendValue !== null && sendValue !== undefined) {
          WebSocket.value.send(senderSettingKey, sendValue);
        }
      });

      console.log({ newUnwatchSender });
      unwatchSender.value = newUnwatchSender;
    } else {
      unwatchSender.value = null;
    }
  });

  onUnmounted(() => {
    if (typeof WebSocket.value?.close === 'function') {
      WebSocket.value.close();
      WebSocket.value = null;
    }
  });

  return WebSocket;
}

function handleWaitConnect(currentAfterInit, socket) {
  if (socket.readyState !== window.WebSocket.OPEN) {
    return setTimeout(() => handleWaitConnect(currentAfterInit, socket), 500);
  }
  currentAfterInit(socket);
}

export default useWebSocket;