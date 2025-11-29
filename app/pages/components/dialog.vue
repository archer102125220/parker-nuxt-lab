<template>
  <div class="dialog_page">
    <Dialog v-model="isShow" />
    <div class="dialog_page-trigger">
      <v-btn color="primary" @click="handleOpen">開啟</v-btn>
    </div>
    <div class="dialog_page-trigger">
      <v-btn color="primary" @click="handleVuetifyDialogOpen">
        vuetify dialog對照
      </v-btn>
    </div>
  </div>
</template>

<script setup>
useHeadMataData({
  title: '彈窗組件測試'
});
const nuxtApp = useNuxtApp();
const { $store } = nuxtApp;

const isShow = ref(false);

function handleOpen() {
  isShow.value = true;
}

function handleVuetifyDialogOpen() {
  $store.system.setDialog({
    trigger: true,
    width: '500px',
    content: 'DemoContent',
    bgColor: '#fff',
    radius: '4px',
    contentClass: 'dialog_content',
    contentProps: {
      // dialogCouponCnName: '優惠券名稱',
      dialogCouponCnName: '測試Dialog標題',
      dialogCodeId: '1234567890',
      dialogQrcode: 'https://example.com/qrcode'
    },
    dialogProps: {}
  });
}
</script>

<style lang="scss" scoped>
.dialog_page {
  &-trigger {
    /* Display & Box Model */
    margin: 10px 0;
  }
}
</style>
