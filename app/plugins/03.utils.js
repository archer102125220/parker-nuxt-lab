import amountFormat from '@shared/helpers/amount-format';
import { createWebSocket } from '@app/utils/helpers/web-socket';
import {
  getDistanceBetweenPoints,
  getCurrentPosition,
  distanceCalculation,
  handleDistanceCalculation,
  handleCurrentCalculation
} from '@app/utils/helpers/distance-between-points';
import { googleGAInit } from '@app/utils/third-party/ga';
import { googleGTMInit } from '@app/utils/third-party/gtm';
import { googleGtagInit } from '@app/utils/third-party/gtag';
import initializeDoubleTap from '@app/utils/helpers/doubleTap';
import getScrollEndLimit from '@app/utils/helpers/get-scroll-end-limit';
import getLocalLanguage from '@app/utils/third-party/get-local-language';
import setLocalLanguage from '@app/utils/third-party/set-local-language';
import { classifySwipeDirection } from '@app/utils/helpers/classify-swipe-direction';

if (typeof window !== 'undefined') {
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
    }
  };
});
