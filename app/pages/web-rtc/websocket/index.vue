<template>
  <section class="web_rtc_websocket_page">
    <p class="web_rtc_websocket_page-description">
      配合 Nuxt4 內建的 WebSocket 實作
    </p>

    <p
      v-if="$store.system.supportWebsocket === false"
      class="web_rtc_websocket_page-warning"
    >
      *當前部署環境可能不支援 Websocket （如：vercel等部署平台），可能會無效
    </p>

    <div class="web_rtc_websocket_page-context">
      <div class="web_rtc_websocket_page-context-initiate">
        <NuxtLink
          class="web_rtc_websocket_page-context-initiate-link"
          :to="$localePath('/web-rtc/websocket/room')"
        >
          <v-btn color="primary" height="116px" block> 建立視訊聊天 </v-btn>
        </NuxtLink>
      </div>
      <div class="web_rtc_websocket_page-context-join">
        <v-text-field
          clearable
          label="room id"
          class="web_rtc_websocket_page-context-join-room_id"
          v-model="roomId"
          :rules="[rules]"
        />
        <NuxtLink
          class="web_rtc_websocket_page-context-join-link"
          :to="$localePath(`/web-rtc/websocket/room/${roomId}`)"
          :disabled="disabledJoinLink"
        >
          <v-btn
            color="primary"
            variant="tonal"
            block
            :disabled="disabledJoinLink"
          >
            加入視訊聊天
          </v-btn>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const roomId = ref('');
const disabledJoinLink = computed(
  () =>
    typeof roomId.value !== 'string' ||
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      roomId.value
    ) === false
);
const rules = computed(
  () => () =>
    disabledJoinLink.value === false || roomId.value === '' || '無效視訊Id'
);
</script>

<style lang="scss">
.web_rtc_websocket_page {
  /* Display & Box Model */
  padding-top: 16px;

  &-description {
    /* Display & Box Model */
    margin-bottom: 32px;
  }

  &-warning {
    /* Display & Box Model */
    margin-bottom: 8px;

    /* Typography */
    font-size: 16px;
    font-weight: 600;
  }

  &-context {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    gap: 16px;
    width: 70dvw;
    margin: auto;

    &-initiate {
      /* Display & Box Model */
      flex: 1;
      // height: 100%;
      &-link {
        /* Display & Box Model */
        display: block;
        // width: 100%;
        // height: 100%;
      }
    }

    &-join {
      /* Display & Box Model */
      flex: 1;
      &-link {
        /* Display & Box Model */
        display: block;
        // height: 100%;
      }
    }
  }
}
</style>
