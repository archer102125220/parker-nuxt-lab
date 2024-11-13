<template>
  <div class="qr_code">
    <v-text-field
      clearable
      label="id"
      class="qr_code-qr_code_value"
      v-model="qrCodeValue"
    />
    <QRcode :qr-code-value="qrCodeValue" />
  </div>
</template>

<script setup>
const qrCodeValue = ref('QRcodeTest');
</script>

<style lang="scss" scoped>
.qr_code {
}
</style>
