import { axiosInit, request as axiosRequest } from '@shared/request';

export default defineNuxtPlugin(() => {
  console.log('axios plugin loading...');

  const isInitialized = useState(
    'axiosInitialized',
    () => typeof axiosRequest.ax === 'object' && axiosRequest.ax !== null
  );

  const request = axiosInit(import.meta.env.VITE_API_BASE);

  isInitialized.value = true;

  console.log('axios plugin loaded');

  return {
    provide: {
      request
    }
  };
});
