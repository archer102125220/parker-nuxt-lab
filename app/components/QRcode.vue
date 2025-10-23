<template>
  <img :alt="qrCodeValue" class="qr_code" v-bind="$attrs" :src="qrCode" />
</template>
<script setup>
// https://www.npmjs.com/package/qrcodeqrcode
import QRCode from 'qrcode';

const props = defineProps({
  qrCodeValue: { type: [String, Number], default: '' }
});
const emit = defineEmits([
  'beforeCreate',
  'loading',
  'success',
  'error',
  'created'
]);

const canvasRef = ref(null);
const qrCode = ref('');

function handleQRCode(_qrCodeValue) {
  emit('beforeCreate');
  emit('loading', true);
  QRCode.toDataURL(_qrCodeValue, function (error, url) {
    emit('created');
    emit('loading', false);
    if (error) {
      console.error(error);
      emit('error', error);
      return;
    }
    qrCode.value = url;
    emit('success', { $ref: canvasRef.value, qrCodeValue: _qrCodeValue });
  });
}

watch(
  () => props.qrCodeValue,
  async (newValue) => {
    if (
      newValue !== undefined &&
      newValue !== null &&
      typeof newValue !== 'object' &&
      newValue !== ''
    ) {
      await nextTick();
      handleQRCode(newValue);
    }
  }
);

onMounted(() => {
  handleQRCode(props.qrCodeValue);
});
</script>

<style lang="scss" scoped>
.qr_code {
  // min-height: var(--qr_code_height);
  // min-width: var(--qr_code_width);
  object-fit: contain;
}
</style>
