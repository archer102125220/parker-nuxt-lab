<template>
  <div>
    <PullRefresh
      :infinityEnd="infinityEnd"
      @refresh="handleRefresh"
      @infinityFetch="handleInfinityFetch"
    >
      <div style="height: 100dvh">
        <!-- <NuxtRouteAnnouncer />
      <NuxtWelcome /> -->
        <!-- <template #refresh="{ isPulling }">
        <p>{{ isPulling }}</p>
      </template>
      <template #refreshing>
        <p>wow</p>
      </template>
      <template #infinityLbael="{ loading }">
        <p>{{ loading }}</p>
      </template> -->
        <p>12343</p>
      </div>
    </PullRefresh>
  </div>
</template>

<script setup>
const infinityEnd = ref(false);
function handleRefresh(done) {
  console.log("handleRefresh");
  setTimeout(() => {
    console.log("handleRefresh setTimeout");
    done();
  }, 500);
}
function handleInfinityFetch(done) {
  console.log("handleInfinityFetch");
  setTimeout(() => {
    // infinityEnd.value = true;
    console.log("handleInfinityFetch setTimeout");
    done();
  }, 1000);
}
</script>
