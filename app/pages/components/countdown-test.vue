<template>
  <div class="countdown_test_page">
    <form class="countdown_test_page-form" @submit.prevent="handleSecondDemo">
      <p class="countdown_test_page-form-title">測試秒數：</p>
      <v-number-input
        clearable
        label="測試秒數："
        control-variant="stacked"
        class="countdown_test_page-form-input"
        :reverse="false"
        :hide-input="false"
        :inset="false"
        v-model="demoInput"
      />

      <v-radio-group v-model="demoRadio">
        <v-radio label="向上翻" value="up" />
        <v-radio label="向下翻" value="down" />
        <!-- <v-radio label="淡出淡入" value="fade" /> -->
      </v-radio-group>

      <div class="countdown_test_page-form-submit">
        <v-btn color="primary" type="submit">更新</v-btn>
      </div>
    </form>

    <Countdown
      :initial-seconds="demoNumber"
      :countdown-type="demoCountdownType"
    />

    <form class="countdown_test_page-form" @submit.prevent="handleDateDemo">
      <p class="countdown_test_page-form-title">測試秒數：</p>
      <!-- <v-number-input
        clearable
        label="測試秒數："
        control-variant="stacked"
        class="countdown_test_page-form-input"
        :reverse="false"
        :hide-input="false"
        :inset="false"
        v-model="demoInput"
      /> -->
      <DatePicker v-model="demoDate" />

      <v-radio-group v-model="demoRadio">
        <v-radio label="向上翻" value="up" />
        <v-radio label="向下翻" value="down" />
        <!-- <v-radio label="淡出淡入" value="fade" /> -->
      </v-radio-group>

      <div class="countdown_test_page-form-submit">
        <v-btn color="primary" type="submit">更新</v-btn>
      </div>
    </form>
  </div>
</template>

<script setup>
useHeadMataData({
  title: '倒數計時組件測試'
});
// const nuxtApp = useNuxtApp();

const DEMO_NUMBER = 20;

const demoNumber = ref(DEMO_NUMBER);
const demoInput = ref(DEMO_NUMBER);
const demoRadio = ref('up');
const demoCountdownType = ref('up');
const demoDate = ref(null);
const demoCountdownDate = ref(null);

function handleSecondDemo() {
  if (typeof demoInput.value !== 'number') {
    demoInput.value = 0;
    demoNumber.value = 0;
    return;
  }
  demoNumber.value = Number(demoInput.value);
  demoCountdownType.value = demoRadio.value;
}
function handleDateDemo() {}
</script>

<style lang="scss" scoped>
.countdown_test_page {
  &-form {
    &-title {
    }
    &-input {
    }
    &-submit {
    }
  }
}
</style>
