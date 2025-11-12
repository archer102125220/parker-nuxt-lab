<template>
  <div class="pwa_loading">
    <v-snackbar
      :model-value="$store.system.pwaUpdataing"
      :timeout="-1"
      :attach="true"
      color="info"
      position="sticky"
      variant="outlined"
      location="bottom right"
      class="pwa_loading-block"
    >
      <v-alert type="info">
        <p>PWA安裝中...</p>

        <v-progress-circular indeterminate />
      </v-alert>
    </v-snackbar>
    <!-- <v-progress-circular indeterminate color="primary" /> -->
  </div>
</template>

<script setup></script>

<style lang="scss">
.pwa_loading {
  // position: sticky;
  // // right: 8px;
  // bottom: 16px;
  // display: flex;
  // justify-content: flex-end;
  // padding: 0 16px;

  .v-overlay {
    // position: sticky;
    bottom: 32px;
    right: 8px;
    z-index: 9 !important;
  }
  &-block {
    .v-snackbar__content {
      padding: 0;
      border-radius: 4px;
      .v-alert__prepend {
        align-self: unset;
        margin-right: 8px;
      }
      .v-alert__content {
        display: flex;
        align-items: center;
        .v-progress-circular {
          margin-left: 8px;
        }
      }
      .v-alert--density-default {
        max-width: 100vw;
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    }
    .v-snackbar__wrapper {
      // width: 60%;
      min-width: unset;
      min-height: unset;
      max-width: unset;
    }
  }
}
</style>
