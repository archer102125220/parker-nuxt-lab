<template>
  <section class="server_sent_event_route_param_page">
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
  title: 'Server Sent Event route param分組測試'
});
definePageMeta({
  middleware: 'check-params-uuid'
});
import _cloneDeep from 'lodash/cloneDeep';
const route = useRoute();

const SSEMessageList = ref([]);
const eventSource = useEventSource({
  channel: `/room/${route.params.uuId}`,
  message(payload) {
    console.log({ payload });
    const newSSEMessageList = _cloneDeep(SSEMessageList.value);
    newSSEMessageList.push(payload?.data);
    SSEMessageList.value = newSSEMessageList;
  }
});
watch(
  () => eventSource.value,
  (newEventSource) => {
    console.log({ newEventSource });
  },
  { deep: true }
);
</script>

<style lang="scss">
.server_sent_event_route_param_page {
  &-description {
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;

    &-link {
      flex: 1;
      flex-basis: 400px;
    }
  }
}
</style>
