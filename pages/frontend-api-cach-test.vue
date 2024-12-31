<template>
  <div class="frontend_api_cach_test_page">
    <v-btn color="primary" @click="handleApi">測試</v-btn>
    <v-checkbox label="啟用快取" :value="true" v-model="useCache" />

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
const response = ref(null);

async function handleApi() {
  if ($store.system.loading === true) return;
  console.log('--test start--');
  const startTime = Date.now();
  console.time();
  $store.system.setLoading(true);
  try {
    const _response = await nuxtApp.$nuxtServer.POST_frontendApiCachTest(
      {
        query: { data: 'queryTest' },
        payload: { data: 'payloadTest' }
      },
      { useCache: useCache.value }
    );
    console.log({ response: _response });
    response.value = _response;
  } catch (error) {
    console.log(error);
  }
  $store.system.setLoading(false);
  console.timeEnd();
  timeConsuming.value = Date.now() - startTime;
  console.log('--test end--', timeConsuming.value);
}
</script>

<style lang="scss">
.frontend_api_cach_test_page {
  &-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
