import { dayjs } from '@app/plugins/01.day';
import { PostEventSource } from '@utils/request/post-event-source';

const DOMAIN = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_DOMAIN || window?.location?.origin) || '';
const SERVER_SENT_EVENT_BASE_PATH = import.meta.env.VITE_SERVER_SENT_EVENT_BASE_PATH || '/server-sent-event';

export function usePostEventSource(config = { channel: '/' }) {
  const PostEventSourceObj = reactive({
    croe: null,
    lastMessgTime: null,
    timeoutTimestamp: null
  });

  function handleCheckConnect() {
    if (PostEventSourceObj.timeoutTimestamp !== null) {
      clearTimeout(PostEventSourceObj.timeoutTimestamp);
    }

    const nowDayjs = dayjs();
    const lastMessgTimeDayjs = PostEventSourceObj.lastMessgTime || dayjs();
    const diff = nowDayjs.diff(lastMessgTimeDayjs, 'second');

    if (diff > 10) {
      PostEventSourceObj.lastMessgTime = null;
      return initPostEventSource(config?.value || config);
    }

    PostEventSourceObj.lastMessgTime = dayjs();
    PostEventSourceObj.timeoutTimestamp = setTimeout(handleCheckConnect, 1000 * 5);
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
    clearTimeout(PostEventSourceObj.timeoutTimestamp);
    if (typeof PostEventSourceObj.croe?.close === 'function') {
      PostEventSourceObj.croe.close();
      PostEventSourceObj.croe = null;
    }
  });

  return PostEventSourceObj;
}

export default usePostEventSource;