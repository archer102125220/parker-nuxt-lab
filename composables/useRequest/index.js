import _cloneDeep from 'lodash/cloneDeep';

import { useRequestInit } from '@/hooks/useRequest/useRequestInit';

// import { axiosInit, request as axiosRequest } from '@/utils/request';

export function useRequest(
  method = 'get',
  path = '',
  payload = {},
  checkPayload,
  isErrorAdapter,
  extendOption = { retry: 3 },
  requestOption = {}
) {
  const { apiBase, errorAdapter, defaultExtendOption } = requestOption;

  const runtimeConfig = useRuntimeConfig();
  const { request: axiosRequest } = useRequestInit(
    apiBase || runtimeConfig.public.API_BASE,
    errorAdapter,
    defaultExtendOption
  );

  const response = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const retryCount = ref(0);

  function cancelRequest() {
    const _method = typeof method === 'string' ? method : '';
    return axiosRequest.cancel(_method.toLocaleLowerCase(), path, payload);
  }

  async function handleRequest() {
    if (typeof path !== 'string' || path === '' ||
      (
        typeof checkPayload === 'function' &&
        checkPayload(payload, path, extendOption) === false
      )
    ) {
      return;
    }

    isLoading.value = true;

    try {
      error.value = null;

      const _extendOption = _cloneDeep(extendOption);

      delete _extendOption.retry;

      if (/GET/i.test(method) === true) {
        _extendOption.useCache =
          typeof _extendOption.useCache === 'boolean' ?
            _extendOption.useCache :
            true;
        _extendOption.useServiceWorkerCache =
          typeof _extendOption.useServiceWorkerCache === 'boolean' ?
            _extendOption.useServiceWorkerCache :
            true;
      } else if (/POST|PUT|DELETE/i.test(method) === true) {
        _extendOption.useServiceWorkerCache = false;
      }

      const newResponse = await axiosRequest(
        method,
        path,
        payload,
        _extendOption,
        isErrorAdapter
      );

      response.value = newResponse

      return newResponse;
    } catch (_error) {
      error.value = _error;
    } finally {
      isLoading.value = false;
    }

  }

  async function handleRetry() {
    if (error !== null && isLoading === false) return response;
    retryCount.value = retryCount.value + 1;
    return await handleRequest();
  }

  onBeforeMount(() => {
    handleRequest();
  });
  watch(
    () => [error, extendOption, retryCount],
    ([newError = null, newExtendOption = {}, newRetryCount] = []) => {
      if (newError === null) return;
      const { retry } = newExtendOption;
      const _retry = typeof retry === 'number' ? retry : 3;
      if (newRetryCount <= _retry) {
        handleRetry();
      }
    }
  );


  return {
    cancelRequest,
    response,
    isLoading,
    error,
    refetch: handleRetry
  };
}

export const useGetRequest = (...arg) => {
  return useRequest('get', ...arg);
};

export const usePostRequest = (...arg) => {
  return useRequest('post', ...arg);
};

export const usePatchRequest = (...arg) => {
  return useRequest('patch', ...arg);
};

export const usePutRequest = (...arg) => {
  return useRequest('put', ...arg);
};

export const useDeleteRequest = (...arg) => {
  return useRequest('delete', ...arg);
};

export default useRequest;