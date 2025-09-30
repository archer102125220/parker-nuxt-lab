<template>
  <div class="web_rtc_server_sent_event_page">
    <p>接收到的data：</p>
    <div>
      <p
        v-for="(serverSentEventMessage, index) in serverSentEventMessageList"
        :key="index"
      >
        {{ serverSentEventMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
useHeadMataData({
  title: 'Server Sent Event測試'
});
import _cloneDeep from 'lodash/cloneDeep';

const serverSentEventMessageList = ref([]);
</script>

<style lang="scss" scoped>
.web_rtc_server_sent_event_page {
}
</style>
