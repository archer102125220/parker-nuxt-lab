<template>
  <div class="scroll_fetch_test_page">
    <ScrollFetch
      :ios-type="false"
      :refresh-disable="false"
      height="100dvh"
      refresh-icon="/img/icon/refresh-icon.svg"
      refreshing-icon="/img/icon/refreshing-icon.svg"
      :infinityEnd="infinityEnd"
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

const infinityEnd = ref(false);

const dataList = computed(() => {
  const _dataList = [];
  for (let i = 0; i <= 100; i++) {
    // _dataList.push(i);
    let data = '';
    for (let j = i; j >= 0; j--) {
      data += j;
    }
    _dataList.push(data);
  }
  return _dataList;
});

function handleRefresh(done) {
  nuxtApp.$store.system.setLoading(true);
  console.log('handleRefresh');
  setTimeout(() => {
    console.log('handleRefresh setTimeout');
    // nuxtApp.$successMessage('handleRefresh');
    nuxtApp.$store.system.setLoading(false);
    done();
  }, 1000);
}
function handleInfinityFetch(done) {
  nuxtApp.$store.system.setLoading(true);
  console.log('handleInfinityFetch');
  setTimeout(() => {
    // infinityEnd.value = true;
    console.log('handleInfinityFetch setTimeout');
    // nuxtApp.$successMessage('handleInfinityFetch');
    nuxtApp.$store.system.setLoading(false);
    done();
  }, 1000);
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
