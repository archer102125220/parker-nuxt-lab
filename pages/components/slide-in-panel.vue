<template>
  <div class="slide_in_panel_list_page">
    <div class="slide_in_panel_list_page-describe">
      <p>為了避免公司專案上的套件衝突，因此手刻一版訊息佇列</p>
      <span>（</span>
      <del>我也想既優雅又輕鬆愜意的使用套件，但事實不允許</del>
      <span>）</span>
    </div>
    <form
      class="slide_in_panel_list_page-content"
      @submit.prevent="handleUpdateShowMessage"
    >
      <v-text-field
        clearable
        label="新增彈跳訊息"
        class="slide_in_panel_list_page-message"
        v-model="message"
      />

      <div class="slide_in_panel_list_page-message-submit">
        <v-btn color="primary" type="submit">測試彈跳訊息</v-btn>
      </div>
    </form>
    <SlideInPanel bottom="10vh" v-model="showMessage" />
  </div>
</template>

<script setup>
const message = ref('');
const showMessage = ref('');

function handleUpdateShowMessage() {
  showMessage.value = message.value;
}
</script>

<style lang="scss">
.slide_in_panel_list_page {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  &-describe {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  &-content {
    flex: 1;
    flex-basis: 400px;
  }
}
</style>
