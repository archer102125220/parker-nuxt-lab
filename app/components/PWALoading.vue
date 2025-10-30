<template>
  <div class="pwa_loading">
    <v-progress-circular
      v-if="$store.system.pwaUpdataing"
      indeterminate
      color="primary"
    />
    <!-- <v-progress-circular indeterminate color="primary" /> -->
  </div>
</template>

<script setup></script>

<style lang="scss">
.pwa_loading {
  position: sticky;
  // right: 8px;
  bottom: 8px;
  display: flex;
  justify-content: flex-end;
  padding: 0 8px;
}
</style>
