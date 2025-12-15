import _dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import isToday from 'dayjs/plugin/isToday.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import calendar from 'dayjs/plugin/calendar.js';
import duration from 'dayjs/plugin/duration.js';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-tw';

export const dayjs = _dayjs;

export default defineNuxtPlugin(() => {
  console.log('dayjs plugin loading...');

  dayjs.extend(relativeTime);
  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs.extend(calendar);
  dayjs.extend(duration);

  console.log('dayjs plugin loaded');
  return {
    provide: {
      dayjs
    }
  };
});
