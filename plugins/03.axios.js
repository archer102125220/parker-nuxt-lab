import { axiosInit, request as axiosRequest } from '@/utils/request';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const isInitialized = useState(
    'axiosInitialized',
    () => typeof axiosRequest.ax === 'object' && axiosRequest.ax !== null
  );

  const request = axiosInit(runtimeConfig.public.VITE_API_BASE || import.meta.env.VITE_API_BASE || '/');

  isInitialized.value = true;

  return {
    provide: {
      request,
    },
  };
});