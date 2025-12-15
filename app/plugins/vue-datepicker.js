import { VueDatePicker } from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('vue-datepicker');

  nuxtApp.vueApp.component('VueDatePicker', VueDatePicker);
});
