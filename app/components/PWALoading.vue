<script setup></script>

<template>
  <div class="pwa_loading">
    <v-snackbar
      :model-value="$store.system.pwaLoading"
      :timeout="-1"
      :attach="true"
      color="info"
      position="sticky"
      variant="outlined"
      location="bottom right"
      class="pwa_loading-block"
    >
      <v-alert type="info">
        <p>PWA安裝/更新中...</p>

        <v-progress-circular indeterminate />
      </v-alert>
    </v-snackbar>
    <!-- <v-progress-circular indeterminate color="primary" /> -->
  </div>
</template>

<style lang="scss">
.pwa_loading {
  // position: sticky;
  // // right: 8px;
  // bottom: 16px;
  // display: flex;
  // justify-content: flex-end;
  // padding: 0 16px;

  .v-overlay {
    // Positioning
    bottom: 32px;
    right: 8px;
    z-index: 9 !important;
  }
  &-block {
    .v-snackbar__content {
      // Display & Box Model
      padding: 0;
      border-radius: 4px;

      .v-alert__prepend {
        // Display & Box Model
        margin-right: 8px;

        // Misc
        align-self: unset;
      }

      .v-alert__content {
        // Display & Box Model
        display: flex;
        align-items: center;

        .v-progress-circular {
          // Display & Box Model
          margin-left: 8px;
        }
      }

      .v-alert--density-default {
        // Display & Box Model
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        max-width: 100vw;
        padding: 0 10px;
      }
    }

    .v-snackbar__wrapper {
      // Display & Box Model
      min-width: unset;
      min-height: unset;
      max-width: unset;
    }
  }
}
</style>
