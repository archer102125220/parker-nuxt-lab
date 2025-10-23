import qs from 'qs';

export function useAsyncDataError(error = { value: null }) {
  const { $store } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  if (error.value !== null) {
    onBeforeMount(async () => {
      const routePath = route.path;
      console.dir(error.value);
      const errorPath = error.value?.cause?.path || '';
      const errorStatus = error.value?.cause?.response?.status;
      if (typeof errorPath === 'string' && errorPath !== '') {
        await navigateTo({ path: errorPath });

        setTimeout(() => {
          if (route.path === routePath) {
            router.push({ path: errorPath });
          }
        }, 100);
      } else {
        const query = {
          targetPath: route.path + `?${qs.stringify(route.query)}`
        };
        if (errorStatus === 401) {
          if (import.meta.client) {
            $store.system.setMessageState({
              text: '登入超時，或權限被修改，請重新登入',
              type: 'error'
            });
          } else {
            query.errorMsg = '登入超時，或權限被修改，請重新登入';
          }
        } else if (errorStatus === 500) {
          $store.system.setMessageState({
            text: '伺服器500錯誤，請稍後再試',
            type: 'error'
          });
        }
        console.log({ query, 'route.path': route.path });
        await navigateTo({
          path: '/',
          query
        });

        setTimeout(() => {
          if (route.path === routePath) {
            router.push({
              path: '/',
              query
            });
          }
        }, 100);
      }
    });
  }
}