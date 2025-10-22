import { dayjs } from '@/plugins/01.day';
import { PostEventSource } from '@/utils/request/PostEventSource';

const DOMAIN = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_DOMAIN || window?.location?.origin) || '';
const SERVER_SENT_EVENT_BASE_PATH = import.meta.env.VITE_SERVER_SENT_EVENT_BASE_PATH || '/server-sent-event';

export function usePostEventSource(config = { channel: '/' }) {
  const PostEventSourceObj = reactive({
    croe: null,
    lastMessgTime: null,
    timeoutTimestamp: null
  });

  function handleCheckConnect() {
    const diff = dayjs().diff(dayjs(PostEventSourceObj.lastMessgTime), 'second');
    console.log({ diff });
    if (diff > 10) {
      PostEventSourceObj.lastMessgTime = null;
      return initPostEventSource(config?.value || config);
    }

    PostEventSourceObj.lastMessgTime = dayjs().unix();
    PostEventSourceObj.timeoutTimestamp = setTimeout(handleCheckConnect, 250);
  }
  function initPostEventSource(currentConfig = {}) {
    console.log('initPostEventSource');
    if (typeof window === 'undefined' || typeof PostEventSource !== 'function') return;

    if (typeof PostEventSourceObj.croe?.close === 'function') {
      PostEventSourceObj.croe.close();
    }

    const { channel: currentChannel, payload } = (currentConfig?.value || currentConfig);

    const path =
      currentChannel.indexOf('/') === 0
        ? SERVER_SENT_EVENT_BASE_PATH + currentChannel
        : SERVER_SENT_EVENT_BASE_PATH + '/' + currentChannel;

    const newPostEventSource = new PostEventSource(DOMAIN + path, { postData: payload });

    // if (typeof currentConfig?.open === 'function') {
    //   newPostEventSource.addEventListener('open', currentConfig.open);
    // }
    newPostEventSource.addEventListener('open', async function (...arg) {
      handleCheckConnect();

      const _config = config?.value || config;

      if (typeof _config?.open === 'function') {
        await _config.open(...arg);
      }
    });
    if (typeof currentConfig?.error === 'function') {
      newPostEventSource.addEventListener('error', currentConfig.error);
    }
    // if (typeof currentConfig?.message === 'function') {
    //   newPostEventSource.addEventListener('message', currentConfig.message);
    // }
    newPostEventSource.addEventListener('message', async function (...arg) {
      handleCheckConnect();

      const _config = config?.value || config;

      if (typeof _config?.message === 'function') {
        await _config.message(...arg);
      }
    });
    if (typeof currentConfig?.ping === 'function') {
      newPostEventSource.addEventListener('ping', currentConfig.ping);
    }

    if (Array.isArray(currentConfig?.eventList) === true) {
      currentConfig.eventList.forEach(event => {
        if (typeof event.name === 'string' && typeof event.handler === 'function') {
          newPostEventSource.addEventListener(event.name, event.handler);
        }
      });
    }

    PostEventSourceObj.croe = newPostEventSource;
  }

  watch(() => (config?.value || config), initPostEventSource, { deep: true });

  onMounted(function () {
    initPostEventSource(config?.value || config);
  });

  onBeforeUnmount(function () {
    if (typeof PostEventSourceObj.croe?.close === 'function') {
      clearTimeout(PostEventSourceObj.timeoutTimestamp);
      PostEventSourceObj.croe.close();
      PostEventSourceObj.croe = null;
    }
  });

  return PostEventSourceObj;
}

export default usePostEventSource;