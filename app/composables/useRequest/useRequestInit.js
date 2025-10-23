import { axiosInit, request as axiosRequest } from '@utils/request';

export function useRequestInit(apiBase, errorAdapter, defaultExtendOption) {
  const isInitialized = useState(
    'axiosInitialized',
    () => typeof axiosRequest.ax === 'object' && axiosRequest.ax !== null
  );
  const isLoading = ref(false);
  const error = ref(null);

  function initialize() {
    if (!isInitialized.value && (typeof axiosRequest.ax !== 'object' || axiosRequest.ax === null)) {
      isLoading.value = true;
      error.value = null;

      try {
        const baseURL = apiBase || import.meta.env.VITE_API_BASE;
        console.log({ baseURL });
        if (typeof baseURL !== 'string' || baseURL === '') {
          console.warn('VITE_API_BASE 環境變數未設定');
        }
        axiosInit(baseURL, errorAdapter, defaultExtendOption);
        isInitialized.value = true;
      } catch (err) {
        error.value = err;
        console.error('初始化 axios 失敗:', err);
      }

      isLoading.value = false;
    }
  }

  onBeforeMount(() => {
    initialize();
  });

  return {
    request: axiosRequest,
    isInitialized,
    isLoading,
    error,
    reinitialize: initialize
  };
}

export default useRequestInit;