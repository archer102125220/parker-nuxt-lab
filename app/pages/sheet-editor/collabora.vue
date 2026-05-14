<script setup>
const testToken = 'testToken';
const collaboraHost = 'http://localhost:9980';
const wopiHost = 'http://192.168.139.3:3000/collabora';
const fileId = 'test.xlsx';
const iframeUrl = computed(() => {
  const encodedWopiSrc = encodeURIComponent(
    `${wopiHost}/wopi/files/${fileId}?token=${testToken}`
  );
  return `${collaboraHost}/browser/dist/cool.html?WOPISrc=${encodedWopiSrc}`;
});
</script>

<template>
  <div>
    <p>Collabora</p>
    <ClientOnly>
      <iframe :src="iframeUrl" frameborder="0" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 100vh;
}
</style>
