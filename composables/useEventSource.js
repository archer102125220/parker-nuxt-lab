export function useEventSource(config = { channel: '/', afterInit() { } }) {
  const EventSourceObj = ref(null);

  function initEventSource(currentConfig = {}) {
    if (typeof window === 'undefined' || typeof window?.EventSource !== 'function') return;

    if (typeof EventSourceObj.value?.close === 'function') {
      EventSourceObj.value.close();
    }

    const { channel: currentChannel, afterInit: currentAfterInit, ...webSocketConfig } = (currentConfig?.value || currentConfig);

    const DOMAIN = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_DOMAIN || window?.location?.origin) || '';
    const SERVER_SENT_EVENT_BASE_PATH = import.meta.env.VITE_SERVER_SENT_EVENT_BASE_PATH || '/server-sent-event';
    const path =
      currentChannel.indexOf('/') === 0
        ? SERVER_SENT_EVENT_BASE_PATH + currentChannel
        : SERVER_SENT_EVENT_BASE_PATH + '/' + currentChannel;


    // const newEventSourceObj = createEventSourceObj?.value(
    //   {
    //     ...webSocketConfig,
    //     open(event, ...arg) {
    //       console.log('EventSourceObj client open', event);

    //       if (this.inited === undefined && typeof currentAfterInit === 'function') {
    //         handleWaitConnect(currentAfterInit, this)
    //         this.inited = true;
    //       }
    //       if (typeof webSocketConfig.open === 'function') {
    //         webSocketConfig.open(event, ...arg);
    //       }
    //     },
    //     url: DOMAIN + path,
    //   },
    // );
    console.log({ DOMAIN, path });
    const newEventSourceObj = new EventSource(DOMAIN + path);

    if (typeof afterInit === 'function') {
      afterInit(newEventSourceObj);
    }

    // newEventSourceObj.addEventListener('open', (payload) => { console.log('open'); console.log(payload); });
    // newEventSourceObj.addEventListener('error', (payload) => { console.log('error'); console.log(payload); });
    // newEventSourceObj.addEventListener('message', (payload) => { console.log('message'); console.log(payload); });
    // newEventSourceObj.addEventListener('ping', (payload) => { console.log('message'); console.log(payload); });
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


    EventSourceObj.value = newEventSourceObj;
  }



  onMounted(function () {
    initEventSource((config?.value || config));

    console.log({ config, EventSourceObj });
  });

  onBeforeUnmount(() => {
    if (typeof EventSourceObj.value?.close === 'function') {
      EventSourceObj.value.close();
      EventSourceObj.value = null;
    }
  });

  watch(() => (config?.value || config), initEventSource, { deep: true });

  return EventSourceObj;
}

export default useEventSource;