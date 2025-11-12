<template>
  <client-only>
    <VueDatePicker v-bind="$attrs" :locale="zhTW" />
  </client-only>
</template>

<script setup>
import { zhTW } from 'date-fns/locale';
</script>
