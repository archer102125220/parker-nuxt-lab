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
  title: 'Server Sent Event Post route param分組測試'
});
definePageMeta({
  middleware: 'check-params-uuid'
});
import _cloneDeep from 'lodash/cloneDeep';
const route = useRoute();

const SSEMessageList = ref([]);
const postEventSource = usePostEventSource({
  channel: `/room/${route.params.uuId}`,
  payload: {
    test: 'test'
  },
  eventList: [
    {
      name: 'room',
      handler(payload) {
        console.log({ payload });
        const newSSEMessageList = _cloneDeep(SSEMessageList.value);
        newSSEMessageList.push(payload?.data);
        SSEMessageList.value = newSSEMessageList;
      }
    }
  ]
});
watch(
  () => postEventSource.croe,
  (newPostEventSource) => {
    console.log({ newPostEventSource });
  },
  { deep: true }
);
</script>

<style lang="scss">
.server_sent_event_route_param_page {
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
