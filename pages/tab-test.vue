<template>
  <div class="tab_test_page">
    <TabsBar
      class="tab_test_page-bar"
      v-model="tab"
      gap="16px"
      bottom-line-height="2px"
      bottom-line-width="30px"
      bottom-line-color="#27C5C3"
      :tab-list="tabList"
    />
    <TabsBar
      class="tab_test_page-bar"
      v-model="tab"
      gap="16px"
      is-navigation-absolute
      bottom-line-height="2px"
      bottom-line-width="30px"
      bottom-line-color="#27C5C3"
      :tab-list="tabList"
    />
    <TabsBar
      class="tab_test_page-bar"
      v-model="tab"
      gap="16px"
      bottom-line-height="2px"
      bottom-line-width="30px"
      bottom-line-color="#27C5C3"
      :tab-list="tabList"
    >
      <template #prev="{ ...arg }">
        <div v-bind="arg" v-ripple class="tab_test_page-bar-prev">
          <img
            class="tab_test_page-bar-prev-img"
            src="/img/icon/arrow/arrow-right-line-black.svg"
          />
        </div>
      </template>
    </TabsBar>
    <TabsContent
      class="tab_test_page-tab_content"
      height="100%"
      v-model="tab"
      :tab-list="tabList"
    />

    <div class="tab_test_page-complex">
      <div class="tab_test_page-complex-menu">
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
        class="tab_test_page-complex-content"
        :ios-type="false"
        :refresh-disable="false"
        height="100dvh"
        refresh-icon="/img/icon/refresh/refresh-icon.svg"
        refreshing-icon="/img/icon/refresh/refreshing-icon.svg"
        :infinityEnd="infinityEnd"
        @refresh="handleRefresh"
        @infinityFetch="handleInfinityFetch"
      >
        <div>
          <TabsBar
            v-model="tab"
            gap="16px"
            bottom-line-height="2px"
            bottom-line-width="30px"
            bottom-line-color="#27C5C3"
            :tab-list="tabList"
          />
        </div>
      </ScrollFetch>
    </div>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
useHead({
  title: '自製Tab測試'
});

const infinityEnd = ref(false);

const tab = ref(0);

const tabList = computed(() => {
  const _tabList = [];
  for (let i = 0; i <= 20; i++) {
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
.tab_test_page {
  height: 150dvh;
  overflow: hidden;
  &-bar {
    // flex: 1;
    // flex-basis: 100%;
    &-prev {
      flex-shrink: 0;
      width: var(--navigation_width);
      min-height: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-top-right-radius: var(--navigation_top_right_radius);
      border-bottom-right-radius: var(--navigation_bottom_right_radius);
      border-bottom-left-radius: var(--navigation_bottom_left_radius);

      overflow: hidden;

      transform: rotate(180deg);

      &-img {
        width: var(--navigation_img_size);
        height: var(--navigation_img_size);
      }
    }
  }
  &-tab_content {
    // flex: 1;
    // flex-basis: 100%;
    height: 30%;
  }
  &-complex {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    height: 50%;
    &-menu {
      flex-shrink: 0;
      flex-basis: 40px;
      max-height: 93%;
      overflow: hidden;
    }
    &-content {
      flex: 1;
      flex-basis: calc(100% - 40px);
      max-height: 90%;
      background-color: #fff;
    }
  }
}
</style>
