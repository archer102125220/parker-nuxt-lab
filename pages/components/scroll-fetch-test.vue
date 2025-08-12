<template>
  <div class="scroll_fetch_test_page">
    <ScrollFetch
      :ios-style="false"
      :refresh-disable="false"
      height="85dvh"
      refresh-icon="/img/icon/refresh/refresh-icon.svg"
      refreshing-icon="/img/icon/refresh/refreshing-icon.svg"
      :loading="$store.system.loading"
      :infinity-buffer="500"
      :infinity-end="infinityEnd"
      @refresh="handleRefresh"
      @infinityFetch="handleInfinityFetch"
    >
      <div class="scroll_fetch_test_page-content">
        <p
          v-for="(data, index) in dataList"
          :key="index"
          class="scroll_fetch_test_page-content-text"
        >
          {{ data }}
        </p>
      </div>
    </ScrollFetch>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
useHead({
  title: '自製下拉重整及無限滾動測試'
});

const refreshLoading = ref(false);
const infinityLoading = ref(false);
const infinityEnd = ref(false);
const page = ref(1);

const limit = computed(() => page.value * 20);
const dataList = computed(() => {
  const _dataList = [];
  for (let i = 0; i <= page.value * limit.value; i++) {
    // _dataList.push(i);
    let data = '';
    for (let j = i; j >= 0; j--) {
      data += j;
    }
    _dataList.push(data);
  }
  return _dataList;
});

async function handleRefresh(done) {
  if (
    refreshLoading.value === true ||
    infinityLoading.value === true ||
    nuxtApp.$store.system.loading === true
  ) {
    done();
    return;
  }

  refreshLoading.value = true;
  nuxtApp.$store.system.setLoading(true);
  console.log('handleRefresh');

  page.value = 1;
  const response = await nuxtApp.$nuxtServer.GET_scrollFetchTest(
    { page: page.value },
    { useCache: false, useCacheRefresh: true }
  );
  await new Promise((resolve) => nextTick(setTimeout(() => resolve(), 1000)));

  console.log({ response });

  console.log('handleRefresh setTimeout');
  done();
  // nuxtApp.$successMessage('handleRefresh');
  nuxtApp.$store.system.setLoading(false);
  refreshLoading.value = false;
}
async function handleInfinityFetch(done) {
  if (
    refreshLoading.value === true ||
    infinityLoading.value === true ||
    nuxtApp.$store.system.loading === true
  ) {
    done();
    return;
  }

  infinityLoading.value = true;
  nuxtApp.$store.system.setLoading(true);
  console.log('handleInfinityFetch');

  page.value = page.value + 1;
  const response = await nuxtApp.$nuxtServer.GET_scrollFetchTest(
    { page: page.value },
    { useCache: true, useCacheRefresh: false }
  );
  await new Promise((resolve) => nextTick(setTimeout(() => resolve(), 1000)));

  console.log({ response });

  // infinityEnd.value = true;
  console.log('handleInfinityFetch setTimeout');
  done();
  // nuxtApp.$successMessage('handleInfinityFetch');
  nuxtApp.$store.system.setLoading(false);
  infinityLoading.value = false;
}
</script>

<style lang="scss" scoped>
.scroll_fetch_test_page {
  // height: 100dvh;
  &-content {
    background-color: #fff;
    &-scroll_fetch {
      // min-height: 100dvh;
      &-text {
        height: 200px;
      }
    }
  }
}
</style>
