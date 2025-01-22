<template>
  <div class="frontend_api_cach_test_page">
    <v-btn color="primary" @click="handleSubmit">測試</v-btn>
    <v-checkbox
      class="frontend_api_cach_test_page-checkbox"
      label="啟用快取(同時使用情況下優先生效)"
      color="primary"
      :value="true"
      v-model="useCache"
    />
    <v-checkbox
      class="frontend_api_cach_test_page-checkbox"
      label="啟用ServiceWorker快取(只適用HTTP GET方法)"
      color="primary"
      :value="true"
      v-model="useServiceWorkerCache"
    />

    <div class="frontend_api_cach_test_page-content">
      <p>耗時約：</p>
      <p>{{ timeConsuming }}</p>
      <p>s</p>
    </div>
    <p>回傳值：</p>
    <p>{{ JSON.stringify(response) }}</p>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const { $store } = nuxtApp;

const timeConsuming = ref('');
const useCache = ref(false);
const useServiceWorkerCache = ref(false);
const response = ref(null);

function handleSubmit() {
  if (useServiceWorkerCache.value === true) {
    handleGetApi();
  } else {
    handlePostApi();
  }
}

async function handlePostApi() {
  if ($store.system.loading === true) return;
  console.log('--test post api start--');
  const startTime = Date.now();
  console.time();
  $store.system.setLoading(true);
  try {
    const _response = await nuxtApp.$nuxtServer.POST_frontendApiCachTest(
      {
        query: { data: 'queryTest' },
        payload: { data: 'payloadTest' }
      },
      {
        useCache: useCache.value
      }
    );
    console.log({ response: _response });
    response.value = _response;
  } catch (error) {
    console.log(error);
  }
  $store.system.setLoading(false);
  console.timeEnd();
  timeConsuming.value = Date.now() - startTime;
  console.log('--test post api end--', timeConsuming.value);
}

async function handleGetApi() {
  if ($store.system.loading === true) return;
  console.log('--test get api start--');
  const startTime = Date.now();
  console.time();
  $store.system.setLoading(true);
  try {
    const _response = await nuxtApp.$nuxtServer.GET_frontendApiCachTest(
      {
        query: { data: 'queryTest' }
      },
      {
        useCache: useCache.value,
        useServiceWorkerCache: useServiceWorkerCache.value
      }
    );
    console.log({ response: _response });
    response.value = _response;
  } catch (error) {
    console.log(error);
  }
  $store.system.setLoading(false);
  console.timeEnd();
  timeConsuming.value = Date.now() - startTime;
  console.log('--test get api end--', timeConsuming.value);
}
</script>

<style lang="scss" scoped>
.frontend_api_cach_test_page {
  &-checkbox {
    :deep(.v-input__details) {
      display: none;
    }
  }
  &-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
