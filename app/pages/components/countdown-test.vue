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
const demoCountdownLimitYear = ref(0);
const demoCountdownYearStart = ref(false);
const demoCountdownMonth = ref(0);
const demoCountdownLimitMonth = ref(0);
const demoCountdownMonthStart = ref(false);
const demoCountdownDay = ref(0);
const demoCountdownLimitDay = ref(0);
const demoCountdownDayStart = ref(false);
const demoCountdownHour = ref(0);
const demoCountdownLimitHour = ref(0);
const demoCountdownHourStart = ref(false);
const demoCountdownMinute = ref(0);
const demoCountdownLimitMinute = ref(0);
const demoCountdownMinuteStart = ref(false);
const demoCountdownSecond = ref(0);
const demoCountdownLimitSecond = ref(0);
const demoCountdownSecondStart = ref(true);

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

  // Calculate the difference iteratively
  let tempDate = nowDayjs;

  // Years
  const years = newDemoDayjs.diff(tempDate, 'year');
  tempDate = tempDate.add(years, 'year');

  // Months
  const months = newDemoDayjs.diff(tempDate, 'month');
  tempDate = tempDate.add(months, 'month');

  // Days
  const days = newDemoDayjs.diff(tempDate, 'day');
  tempDate = tempDate.add(days, 'day');

  // Hours
  const hours = newDemoDayjs.diff(tempDate, 'hour');
  tempDate = tempDate.add(hours, 'hour');

  // Minutes
  const minutes = newDemoDayjs.diff(tempDate, 'minute');
  tempDate = tempDate.add(minutes, 'minute');

  // Seconds
  const seconds = newDemoDayjs.diff(tempDate, 'second');

  demoDayjs.value = newDemoDayjs;
  demoCountdownYear.value = years;
  demoCountdownMonth.value = months;
  demoCountdownLimitDay.value = days;
  demoCountdownLimitHour.value = hours;
  demoCountdownLimitMinute.value = minutes;
  demoCountdownLimitSecond.value = seconds;
}
</script>

<template>
  <div class="countdown_test_page">
    <!-- Hero Section -->
    <section class="countdown_test_page-hero">
      <div class="countdown_test_page-hero-background">
        <div class="countdown_test_page-hero-background-overlay" />
      </div>

      <div class="countdown_test_page-hero-content">
        <h1 class="countdown_test_page-hero-content-title">
          {{ $t('countdown_test_page.hero.title') }}
        </h1>
        <p class="countdown_test_page-hero-content-subtitle">
          {{ $t('countdown_test_page.hero.subtitle') }}
        </p>
        <p class="countdown_test_page-hero-content-description">
          {{ $t('countdown_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="countdown_test_page-section">
      <div class="countdown_test_page-describe">
        <p class="countdown_test_page-describe-text">
          {{ $t('countdown_test_page.describe.text') }}
        </p>
      </div>

      <form class="countdown_test_page-form" @submit.prevent="handleSecondDemo">
        <p class="countdown_test_page-form-title">測試秒數：</p>
        <v-number-input
          v-model="demoInput"
          clearable
          label="測試秒數："
          control-variant="stacked"
          class="countdown_test_page-form-input"
          :reverse="false"
          :hide-input="false"
          :inset="false"
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
          v-model="demoCountdownYear"
          v-model:is-countdown-start="demoCountdownYearStart"
          :initial-seconds="demoCountdownLimitYear"
          :countdown-type="demoCountdownType"
        />
        <p>/</p>
        <Countdown
          v-model="demoCountdownMonth"
          v-model:is-countdown-start="demoCountdownMonthStart"
          :initial-seconds="demoCountdownLimitMonth"
          :countdown-type="demoCountdownType"
        />
        <p>/</p>
        <Countdown
          v-model="demoCountdownDay"
          v-model:is-countdown-start="demoCountdownDayStart"
          :initial-seconds="demoCountdownLimitDay"
          :countdown-type="demoCountdownType"
        />
        <p>/</p>
        <Countdown
          v-model="demoCountdownHour"
          v-model:is-countdown-start="demoCountdownHourStart"
          :initial-seconds="demoCountdownLimitHour"
          :countdown-type="demoCountdownType"
        />
        <p>:</p>
        <Countdown
          v-model="demoCountdownMinute"
          v-model:is-countdown-start="demoCountdownMinuteStart"
          :initial-seconds="demoCountdownLimitMinute"
          :countdown-type="demoCountdownType"
        />
        <p>:</p>
        <Countdown
          v-model="demoCountdownSecond"
          v-model:is-countdown-start="demoCountdownSecondStart"
          :initial-seconds="demoCountdownLimitSecond"
          :countdown-type="demoCountdownType"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.countdown_test_page {
  min-height: 100vh;

  &-hero {
    position: relative;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    overflow: hidden;

    &-background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(68, 160, 141, 0.9) 0%,
          rgba(78, 205, 196, 0.85) 100%
        );
      }
    }

    &-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      text-align: center;

      &-title {
        margin: 0 0 12px 0;
        font-size: 42px;
        font-weight: 800;
        color: #ffffff;

        @media (max-width: 768px) {
          font-size: 32px;
        }
      }

      &-subtitle {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
      }

      &-description {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    padding: 40px 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  &-describe {
    margin-bottom: 24px;
    text-align: center;

    &-text,
    &-note,
    &-strikethrough {
      display: inline;
    }
  }

  &-form {
    margin-bottom: 24px;
  }

  &-count_down_date {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
  }
}
</style>
