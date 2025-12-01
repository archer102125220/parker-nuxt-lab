<template>
  <section class="web_rtc_server_sent_event_page">
    <p class="web_rtc_server_sent_event_page-description">
      配合 Server-Sent Event 及 @upstash/redis 實作
    </p>

    <div class="web_rtc_server_sent_event_page-context">
      <div class="web_rtc_server_sent_event_page-context-initiate">
        <NuxtLink
          class="web_rtc_server_sent_event_page-context-initiate-link"
          :to="$localePath('/web-rtc/server-sent-event/room')"
        >
          <v-btn color="primary" height="116px" block> 建立視訊聊天 </v-btn>
        </NuxtLink>
      </div>
      <div class="web_rtc_server_sent_event_page-context-join">
        <v-text-field
          clearable
          label="room id"
          class="web_rtc_server_sent_event_page-context-join-room_id"
          v-model="roomId"
          :rules="[rules]"
        />
        <NuxtLink
          class="web_rtc_server_sent_event_page-context-join-link"
          :to="$localePath(`/web-rtc/server-sent-event/room/${roomId}`)"
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
.web_rtc_server_sent_event_page {
  /* Display & Box Model */
  padding-top: 16px;

  &-description {
    /* Display & Box Model */
    margin-bottom: 32px;
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
