<template>
  <div>
    <PullRefresh
      :infinityEnd="infinityEnd"
      @refresh="handleRefresh"
      @infinityFetch="handleInfinityFetch"
    >
      <div style="height: 100dvh">
        <p>12343</p>
        <WangEditor editorHeight="300px" />
      </div>
    </PullRefresh>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const infinityEnd = ref(false);
function handleRefresh(done) {
  nuxtApp.$store.system.setLoading(true);
  console.log('handleRefresh');
  setTimeout(() => {
    console.log('handleRefresh setTimeout');
    nuxtApp.$successMessage('handleRefresh');
    nuxtApp.$store.system.setLoading(false);
    done();
  }, 500);
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
