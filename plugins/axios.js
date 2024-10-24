import { axiosInit } from '@/utils/request';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  return {
    provide: {
      request: axiosInit(runtimeConfig.public.API_BASE),
    },
  };
});