<template>
  <div class="index_page">
    <PullRefresh
      :infinityEnd="infinityEnd"
      @refresh="handleRefresh"
      @infinityFetch="handleInfinityFetch"
    >
      <div class="index_page-content">
        <TabsBar
          v-model="tab"
          :tabList="['a', 'bb', 'ccc', 'dddd', 'eeeee']"
        />
        <p class="index_page-content-text">12343</p>
        <WangEditor
          class="index_page-content-wang_editor"
          editorHeight="350px"
        />
        <div class="index_page-content-youtube">
          <Youtube video-id="RTtmcqPXwuw" autoplay />
        </div>
      </div>
    </PullRefresh>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();

const infinityEnd = ref(false);

const tab = ref(0);

function handleRefresh(done) {
  nuxtApp.$store.system.setLoading(true);
  console.log('handleRefresh');
  setTimeout(() => {
    console.log('handleRefresh setTimeout');
    nuxtApp.$successMessage('handleRefresh');
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
    nuxtApp.$successMessage('handleInfinityFetch');
    nuxtApp.$store.system.setLoading(false);
    done();
  }, 1000);
}
</script>

<style lang="scss" scoped>
.index_page {
  &-content {
    min-height: 100dvh;
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
</style>