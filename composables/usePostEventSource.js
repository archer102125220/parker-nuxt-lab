import { PostEventSource } from '@/utils/request/PostEventSource';

const DOMAIN = (import.meta.dev === true ? window?.location?.origin : import.meta.env.VITE_DOMAIN || window?.location?.origin) || '';
const SERVER_SENT_EVENT_BASE_PATH = import.meta.env.VITE_SERVER_SENT_EVENT_BASE_PATH || '/server-sent-event';

export function usePostEventSource(config = { channel: '/' }) {
  const PostEventSourceObj = ref(null);

  function initPostEventSource(currentConfig = {}) {
    if (typeof window === 'undefined' || typeof PostEventSource !== 'function') return;

    if (typeof PostEventSourceObj.value?.close === 'function') {
      PostEventSourceObj.value.close();
    }

    const { channel: currentChannel, payload } = (currentConfig?.value || currentConfig);

    const path =
      currentChannel.indexOf('/') === 0
        ? SERVER_SENT_EVENT_BASE_PATH + currentChannel
        : SERVER_SENT_EVENT_BASE_PATH + '/' + currentChannel;

    const newPostEventSource = new PostEventSource(DOMAIN + path, { postData: payload });

    if (typeof currentConfig?.open === 'function') {
      newPostEventSource.addEventListener('open', currentConfig.open);
    }
    if (typeof currentConfig?.error === 'function') {
      newPostEventSource.addEventListener('error', currentConfig.error);
    }
    if (typeof currentConfig?.message === 'function') {
      newPostEventSource.addEventListener('message', currentConfig.message);
    }
    if (typeof currentConfig?.ping === 'function') {
      newPostEventSource.addEventListener('ping', currentConfig.message);
    }

    if (Array.isArray(currentConfig?.eventList) === true) {
      currentConfig.eventList.forEach(event => {
        if (typeof event.name === 'string' && typeof event.handler === 'function') {
          newPostEventSource.addEventListener(event.name, event.handler);
        }
      });
    }

    PostEventSourceObj.value = newPostEventSource;
  }

  onMounted(function () {
    initPostEventSource((config?.value || config));
  });

  onBeforeUnmount(function () {
    if (typeof PostEventSourceObj.value?.close === 'function') {
      PostEventSourceObj.value.close();
      PostEventSourceObj.value = null;
    }
  });

  watch(() => (config?.value || config), initPostEventSource, { deep: true });

  return PostEventSourceObj;
}

export default usePostEventSource;