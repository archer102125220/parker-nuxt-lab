<template>
  <section class="server_sent_event_global_post_page">
    <p>接收到的data：</p>
    <div>
      <p v-for="(SSEMessage, index) in SSEMessageList" :key="index">
        {{ SSEMessage }}
      </p>
    </div>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'Server Sent Event Post全域測試'
});
import _cloneDeep from 'lodash/cloneDeep';

const SSEMessageList = ref([]);
const postEventSource = usePostEventSource({
  channel: '/',
  open(event) {
    console.log({ event });
  },
  ping(event) {
    console.log({ pingEvent: event });
  },
  message(payload) {
    console.log({ payload });
    const newSSEMessageList = _cloneDeep(SSEMessageList.value);
    newSSEMessageList.push(payload?.data);
    SSEMessageList.value = newSSEMessageList;
  }
});
console.log({ postEventSource });
watch(
  () => postEventSource.croe,
  (newPostEventSource) => {
    console.log({ newPostEventSource });
  },
  { deep: true }
);
</script>

<style lang="scss">
.server_sent_event_global_post_page {
  &-content {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;

    &-link {
      /* Display & Box Model */
      flex: 1;
      flex-basis: 150px;
    }
  }
}
</style>
