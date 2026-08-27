<script setup></script>

<template>
  <div class="pdf_read_page">
    <ClientOnly>
      <PdfReader src="/pdf/1.量測系統準備.pdf" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.pdf_read_page {
  height: 80vh;
}
</style>
