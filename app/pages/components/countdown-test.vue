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
        <v-radio label="向上翻" value="up" color="primary" />
        <v-radio label="向下翻" value="down" color="primary" />
        <!-- <v-radio label="淡出淡入" value="fade" color="primary" /> -->
      </v-radio-group>

      <div class="countdown_test_page-form-submit">
        <v-btn color="primary" type="submit">更新</v-btn>
      </div>
    </form>

    <Countdown
      :initial-seconds="demoNumber"
      :countdown-type="demoCountdownType"
    />

    <p style="margin: 16px 0">*製作中↓</p>

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

      <v-radio-group v-model="demoDateRadio">
        <v-radio label="向上翻" value="up" color="primary" />
        <v-radio label="向下翻" value="down" color="primary" />
        <!-- <v-radio label="淡出淡入" value="fade" color="primary" /> -->
      </v-radio-group>

      <div class="countdown_test_page-form-submit">
        <v-btn color="primary" type="submit">更新</v-btn>
      </div>
    </form>

    <div class="countdown_test_page-count_down_date">
      <Countdown
        :initial-seconds="demoCountdownYear"
        :countdown-type="demoCountdownType"
      />
      <p>/</p>
      <Countdown
        :initial-seconds="demoCountdownMonth"
        :countdown-type="demoCountdownType"
      />
      <p>/</p>
      <Countdown
        :initial-seconds="demoCountdownMonth"
        :countdown-type="demoCountdownType"
      />
      <p>/</p>
      <Countdown
        :initial-seconds="demoCountdownDay"
        :countdown-type="demoCountdownType"
      />
      <p>/</p>
      <Countdown
        :initial-seconds="demoCountdownDay"
        :countdown-type="demoCountdownType"
      />
      <p></p>
      <Countdown
        :initial-seconds="demoCountdownHour"
        :countdown-type="demoCountdownType"
      />
      <p>:</p>
      <Countdown
        :initial-seconds="demoCountdownMinute"
        :countdown-type="demoCountdownType"
      />
      <p>:</p>
      <Countdown
        :initial-seconds="demoCountdownSecond"
        :countdown-type="demoCountdownType"
      />
    </div>
  </div>
</template>

<script setup>
useHeadMataData({
  title: '倒數計時組件測試'
});
// const nuxtApp = useNuxtApp();
const dayjs = useDayjs();

const DEMO_NUMBER = 20;

const demoNumber = ref(DEMO_NUMBER);
const demoInput = ref(DEMO_NUMBER);
const demoRadio = ref('up');
const demoCountdownType = ref('up');

const demoDate = ref(null);
const demoDateRadio = ref('up');
const demoDateCountdownType = ref('up');
const demoDayjs = ref(null);
const demoCountdownYear = ref(0);
const demoCountdownMonth = ref(0);
const demoCountdownDay = ref(0);
const demoCountdownHour = ref(0);
const demoCountdownMinute = ref(0);
const demoCountdownSecond = ref(0);

function handleSecondDemo() {
  if (typeof demoInput.value !== 'number') {
    demoInput.value = 0;
    demoNumber.value = 0;
    return;
  }
  demoNumber.value = Number(demoInput.value);
  demoCountdownType.value = demoRadio.value;
}
function handleDateDemo() {
  demoDateCountdownType.value = demoDateRadio.value;

  const nowDayjs = dayjs();
  const newDemoDayjs = dayjs(demoDate.value);
  const newCountdownYear = newDemoDayjs.diff(nowDayjs, 'year');
  const newCountdownMonth = newDemoDayjs.diff(nowDayjs, 'month');
  const newCountdownDay = newDemoDayjs.diff(nowDayjs, 'day');
  const newCountdownHour = newDemoDayjs.diff(nowDayjs, 'hour');
  const newCountdownMinute = newDemoDayjs.diff(nowDayjs, 'minute');
  const newCountdownSecond = newDemoDayjs.diff(nowDayjs, 'Second');

  demoDayjs.value = newDemoDayjs;
  // demoCountdownYear.value = newCountdownYear;
  // demoCountdownMonth.value = newCountdownMonth;
  // demoCountdownDay.value = newCountdownDay;
  // demoCountdownHour.value = newCountdownHour;
  // demoCountdownMinute.value = newCountdownMinute;
  // demoCountdownSecond.value = newCountdownSecond;
  console.log({
    demoDate: demoDate.value,
    nowDayjs,
    newCountdownYear,
    newCountdownMonth,
    newCountdownDay,
    newCountdownHour,
    newCountdownMinute,
    newCountdownSecond
  });
}
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
  &-count_down_date {
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
