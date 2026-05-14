<script setup></script>

<template>
  <div class="collabora_page">
    <p>Collabora</p>
    <CollaboraIframe
      class="collabora_page-collabora"
      token="testToken"
      collabora-host="http://localhost:9980"
      file-id="test.xlsx"
      wopi-host="http://192.168.139.3:3000/collabora"
    />
  </div>
</template>

<style lang="scss" scoped>
.collabora_page {
  width: 100%;
  height: 100vh;

  &-collabora {
    width: 100%;
    height: 100%;
  }
}
</style>
