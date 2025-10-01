export function useEventSource(config = { channel: '/' }) {
  const EventSourceObj = ref(null);

  function initEventSource(currentConfig = {}) {
    if (typeof window === 'undefined' || typeof window?.EventSource !== 'function') return;

    if (typeof EventSourceObj.value?.close === 'function') {
      EventSourceObj.value.close();
    }

    const { channel: currentChannel } = (currentConfig?.value || currentConfig);

    const DOMAIN = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_DOMAIN || window?.location?.origin) || '';
    const SERVER_SENT_EVENT_BASE_PATH = import.meta.env.VITE_SERVER_SENT_EVENT_BASE_PATH || '/server-sent-event';
    const path =
      currentChannel.indexOf('/') === 0
        ? SERVER_SENT_EVENT_BASE_PATH + currentChannel
        : SERVER_SENT_EVENT_BASE_PATH + '/' + currentChannel;

    const newEventSourceObj = new EventSource(DOMAIN + path);

    if (typeof currentConfig?.open === 'function') {
      newEventSourceObj.addEventListener('open', currentConfig.open);
    }
    if (typeof currentConfig?.error === 'function') {
      newEventSourceObj.addEventListener('error', currentConfig.error);
    }
    if (typeof currentConfig?.message === 'function') {
      newEventSourceObj.addEventListener('message', currentConfig.message);
    }
    if (typeof currentConfig?.ping === 'function') {
      newEventSourceObj.addEventListener('ping', currentConfig.message);
    }

    if (Array.isArray(currentConfig?.eventList) === true) {
      currentConfig.eventList.forEach(event => {
        if (typeof event.name === 'string' && typeof event.handler === 'function') {
          newEventSourceObj.addEventListener(event.name, event.handler);
        }
      });
    }

    EventSourceObj.value = newEventSourceObj;
  }

  onMounted(function () {
    initEventSource((config?.value || config));
  });

  onBeforeUnmount(function () {
    if (typeof EventSourceObj.value?.close === 'function') {
      EventSourceObj.value.close();
      EventSourceObj.value = null;
    }
  });

  watch(() => (config?.value || config), initEventSource, { deep: true });

  return EventSourceObj;
}

export default useEventSource;