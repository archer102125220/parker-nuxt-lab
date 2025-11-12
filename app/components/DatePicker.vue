<template>
  <client-only>
    <VueDatePicker v-bind="$attrs" :locale="zhTW" />
  </client-only>
</template>

<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { zhTW } from 'date-fns/locale';
</script>
