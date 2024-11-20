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
import dvhSvhLvhPolyfill from '@/utils/polyfill/large-small-dynamic-viewport-units-polyfill';
import initializeDoubleTap from '@/utils/helpers/doubleTap';

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
    },
  };
});