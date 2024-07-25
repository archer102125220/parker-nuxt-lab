<template>
  <img :alt="qrCodeValue" class="qr_code" v-bind="$attrs" :src="qrCode" />
</template>
<script setup>
// https://www.npmjs.com/package/qrcode
const QRCode = await import('qrcode');

const props = defineProps({
  qrCodeValue: { type: [String, Number], default: '' }
});
const emit = defineEmits(['success', 'error']);

const canvasRef = ref(null);
const qrCode = ref('');

const qrCodeValue = computed(() => props.qrCodeValue);

function handleQRCode(_qrCodeValue) {
  QRCode.toDataURL(_qrCodeValue, function (error, url) {
    if (error) {
      console.log(error);
      emit('error', error);
      return;
    }
    qrCode.value = url;
    emit('success', { $ref: canvasRef.value, qrCodeValue: _qrCodeValue });
  });
}

watch(qrCodeValue, async (newValue) => {
  if (
    newValue !== undefined &&
    newValue !== null &&
    typeof newValue !== 'object' &&
    newValue !== ''
  ) {
    await nextTick();
    handleQRCode(newValue);
  }
});

onMounted(() => {
  handleQRCode(qrCodeValue.value);
});
</script>

<style lang="scss" scoped>
.qr_code {
  // min-height: var(--qr_code_height);
  // min-width: var(--qr_code_width);
  object-fit: contain;
}
</style>