import amountFormat from '@/utils/amount-format';
import { createWebSocket } from '@/utils/web-socket';
import {
  getDistanceBetweenPoints,
  getCurrentPosition,
  distanceCalculation,
  handleDistanceCalculation,
  handleCurrentCalculation,
} from '@/utils/distance-between-points';
import { googleGAInit } from '@/utils/ga';
import dvhSvhLvhPolyfill from '@/utils/large-small-dynamic-viewport-units-polyfill';
import initializeDoubleTap from '@/utils/doubleTap';

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