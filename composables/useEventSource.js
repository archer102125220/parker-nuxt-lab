import { dayjs } from '@/plugins/01.day';

const DOMAIN = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_DOMAIN || window?.location?.origin) || '';
const SERVER_SENT_EVENT_BASE_PATH = import.meta.env.VITE_SERVER_SENT_EVENT_BASE_PATH || '/server-sent-event';

export function useEventSource(config = { channel: '/' }) {
  const EventSourceObj = reactive({
    croe: null,
    lastMessgTime: null,
    timeoutTimestamp: null
  });

  function handleCheckConnect() {
    const diff = dayjs().diff(dayjs(EventSourceObj.lastMessgTime), 'second');
    console.log({ diff });
    if (diff > 10) {
      EventSourceObj.lastMessgTime = null;
      return initEventSource(config?.value || config);
    }

    EventSourceObj.lastMessgTime = dayjs().unix();
    EventSourceObj.timeoutTimestamp = setTimeout(handleCheckConnect, 250);
  }
  function initEventSource(currentConfig = {}) {
    if (typeof window === 'undefined' || typeof window?.EventSource !== 'function') return;

    if (typeof EventSourceObj.croe?.close === 'function') {
      EventSourceObj.croe.close();
    }

    const { channel: currentChannel } = (currentConfig?.value || currentConfig);

    const path =
      currentChannel.indexOf('/') === 0
        ? SERVER_SENT_EVENT_BASE_PATH + currentChannel
        : SERVER_SENT_EVENT_BASE_PATH + '/' + currentChannel;

    const newEventSourceObj = new EventSource(DOMAIN + path);

    // if (typeof currentConfig?.open === 'function') {
    //   newEventSourceObj.addEventListener('open', currentConfig.open);
    // }
    newEventSourceObj.addEventListener('open', async function (...arg) {
      handleCheckConnect();

      const _config = config?.value || config;

      if (typeof _config?.open === 'function') {
        await _config.open(...arg);
      }
    });
    if (typeof currentConfig?.error === 'function') {
      newEventSourceObj.addEventListener('error', currentConfig.error);
    }
    // if (typeof currentConfig?.message === 'function') {
    //   newEventSourceObj.addEventListener('message', currentConfig.message);
    // }
    newEventSourceObj.addEventListener('message', async function (...arg) {
      handleCheckConnect();

      const _config = config?.value || config;

      if (typeof _config?.message === 'function') {
        await _config.message(...arg);
      }
    });
    if (typeof currentConfig?.ping === 'function') {
      newEventSourceObj.addEventListener('ping', currentConfig.ping);
    }

    if (Array.isArray(currentConfig?.eventList) === true) {
      currentConfig.eventList.forEach(event => {
        if (typeof event.name === 'string' && typeof event.handler === 'function') {
          newEventSourceObj.addEventListener(event.name, event.handler);
        }
      });
    }

    EventSourceObj.croe = newEventSourceObj;
  }

  watch(() => (config?.value || config), initEventSource, { deep: true });

  onMounted(function () {
    initEventSource(config?.value || config);
  });

  onBeforeUnmount(function () {
    if (typeof EventSourceObj.croe?.close === 'function') {
      clearTimeout(EventSourceObj.timeoutTimestamp);
      EventSourceObj.croe.close();
      EventSourceObj.croe = null;
    }
  });

  return EventSourceObj;
}

export default useEventSource;