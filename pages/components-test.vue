<template>
  <div class="components_test_page">
    <TabsBar
      class="components_test_page-bar"
      v-model="tab"
      gap="16px"
      bottom-line-height="2px"
      bottom-line-width="30px"
      bottom-line-color="#27C5C3"
      :tab-list="tabList"
    />
    <div class="components_test_page-menu">
      <TabsBar
        v-model="tab"
        vertical
        gap="16px"
        tab-item-width="100%"
        bottom-line-width="5px"
        bottom-line-color="#27C5C3"
        :tab-list="tabList"
      />
    </div>
    <ScrollFetch
      class="components_test_page-content"
      :ios-type="false"
      :refresh-disable="false"
      height="100dvh"
      refresh-icon="/img/icon/refresh/refresh-icon.svg"
      refreshing-icon="/img/icon/refresh/refreshing-icon.svg"
      :infinityEnd="infinityEnd"
      @refresh="handleRefresh"
      @infinityFetch="handleInfinityFetch"
    >
      <div class="components_test_page-content-scroll_fetch">
        <TabsBar
          v-model="tab"
          gap="16px"
          bottom-line-height="2px"
          bottom-line-width="30px"
          bottom-line-color="#27C5C3"
          :tab-list="tabList"
        />
        <p class="components_test_page-content-scroll_fetch-text">12343</p>
        <WangEditor
          class="components_test_page-content-scroll_fetch-wang_editor"
          editorHeight="350px"
        />
        <div class="components_test_page-content-scroll_fetch-youtube">
          <Youtube video-id="RTtmcqPXwuw" autoplay />
        </div>
      </div>
    </ScrollFetch>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
useHead({
  title: '組件綜合測試'
});

const infinityEnd = ref(false);

const tab = ref(0);

const tabList = computed(() => {
  const _tabList = [];
  for (let i = 0; i <= 100; i++) {
    _tabList.push(i);
    // let tab = '';
    // for (let j = i; j >= 0; j--) {
    //   tab += j;
    // }
    // _tabList.push(tab);
  }
  return _tabList;
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
.components_test_page {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100dvh;
  &-bar {
    flex: 1;
    flex-basis: 100%;
  }
  &-menu {
    flex-shrink: 0;
    flex-basis: 40px;
    max-height: 93%;
    overflow: hidden;
  }
  &-content {
    flex: 1;
    flex-basis: calc(100% - 40px);
    max-height: 93%;
    background-color: #fff;
    &-scroll_fetch {
      // min-height: 100dvh;
      &-text {
        height: 200px;
      }
      &-wang_editor {
        // height: 350px;
        margin-bottom: 8px;
      }
      &-youtube {
        height: 80dvh;
      }
    }
  }
}
</style>
