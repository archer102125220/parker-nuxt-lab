<template>
  <section class="server_sent_event_global_page">
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
  title: 'Server Sent Event全域測試'
});
import _cloneDeep from 'lodash/cloneDeep';

const SSEMessageList = ref([]);
const eventSource = useEventSource({
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
console.log({ eventSource });
watch(
  () => eventSource.croe,
  (newEventSource) => {
    console.log({ newEventSource });
  },
  { deep: true }
);
</script>

<style lang="scss">
.server_sent_event_global_page {
  &-description {
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;

    &-link {
      flex: 1;
      flex-basis: 150px;
    }
  }
}
</style>
