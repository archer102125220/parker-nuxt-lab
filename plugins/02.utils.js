import amountFormat from '@/utils/helpers/amount-format';
import { createWebSocket } from '@/utils/helpers/web-socket';
import {
  getDistanceBetweenPoints,
  getCurrentPosition,
  distanceCalculation,
  handleDistanceCalculation,
  handleCurrentCalculation,
} from '@/utils/helpers/distance-between-points';
import { googleGAInit } from '@/utils/third-party/ga';
import { googleGTMInit } from '@/utils/third-party/gtm';
import { googleGtagInit } from '@/utils/third-party/gtag';
import dvhSvhLvhPolyfill from '@/utils/polyfill/large-small-dynamic-viewport-units-polyfill';
import initializeDoubleTap from '@/utils/helpers/doubleTap';
import getScrollEndLimit from '@/utils/helpers/get-scroll-end-limit';
import getLocalLanguage from '@/utils/third-party/get-local-language';
import setLocalLanguage from '@/utils/third-party/set-local-language';
import { classifySwipeDirection } from '@/utils/helpers/classify-swipe-direction';

if (typeof window !== 'undefined') {
  dvhSvhLvhPolyfill();
  initializeDoubleTap();
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      amountFormat,
      createWebSocket,
      getDistanceBetweenPoints,
      getCurrentPosition,
      distanceCalculation,
      handleDistanceCalculation,
      handleCurrentCalculation,
      googleGAInit,
      googleGTMInit,
      googleGtagInit,
      getScrollEndLimit,
      getLocalLanguage,
      setLocalLanguage,
      classifySwipeDirection
    },
  };
});