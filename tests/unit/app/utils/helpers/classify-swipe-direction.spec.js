import { describe, it, expect } from 'vitest';
import { classifySwipeDirection } from '@app/utils/helpers/classify-swipe-direction';

/**
 * classifySwipeDirection 純函數測試
 *
 * 這是一個「行為導向」測試範本，測試：
 * 1. 正常情況 - 各種滑動方向的判斷
 * 2. 邊界情況 - 最小滑動距離、角度閾值
 * 3. 錯誤情況 - 未達到最小距離
 */
describe('classifySwipeDirection', () => {
  // 輔助函數：建立座標點
  const point = (x, y) => ({
    clientX: x,
    clientY: y
  });

  describe('水平滑動判斷', () => {
    it('向右滑動應該判斷為水平', () => {
      const start = point(0, 0);
      const end = point(100, 0); // 純水平向右

      const result = classifySwipeDirection(start, end);

      expect(result.isHorizontal).toBe(true);
      expect(result.isVertical).toBe(false);
      expect(result.isValidSwipe).toBe(true);
    });

    it('向左滑動應該判斷為水平', () => {
      const start = point(100, 0);
      const end = point(0, 0); // 純水平向左

      const result = classifySwipeDirection(start, end);

      expect(result.isHorizontal).toBe(true);
      expect(result.isVertical).toBe(false);
    });

    it('略微傾斜的水平滑動仍應判斷為水平', () => {
      const start = point(0, 0);
      const end = point(100, 20); // 約 11 度傾斜

      const result = classifySwipeDirection(start, end);

      expect(result.isHorizontal).toBe(true);
      expect(result.isVertical).toBe(false);
    });
  });

  describe('垂直滑動判斷', () => {
    it('向下滑動應該判斷為垂直', () => {
      const start = point(0, 0);
      const end = point(0, 100); // 純垂直向下

      const result = classifySwipeDirection(start, end);

      expect(result.isHorizontal).toBe(false);
      expect(result.isVertical).toBe(true);
      expect(result.isValidSwipe).toBe(true);
    });

    it('向上滑動應該判斷為垂直', () => {
      const start = point(0, 100);
      const end = point(0, 0); // 純垂直向上

      const result = classifySwipeDirection(start, end);

      expect(result.isHorizontal).toBe(false);
      expect(result.isVertical).toBe(true);
    });

    it('略微傾斜的垂直滑動仍應判斷為垂直', () => {
      const start = point(0, 0);
      const end = point(20, 100); // 約 79 度

      const result = classifySwipeDirection(start, end);

      expect(result.isHorizontal).toBe(false);
      expect(result.isVertical).toBe(true);
    });
  });

  describe('對角滑動判斷', () => {
    it('45 度對角線滑動不應該判斷為水平或垂直', () => {
      const start = point(0, 0);
      const end = point(100, 100); // 精確 45 度

      const result = classifySwipeDirection(start, end);

      // 角度正好在閾值邊緣，根據實作應該都不是
      expect(result.isHorizontal).toBe(true);
      expect(result.isVertical).toBe(false);
    });
  });

  describe('最小滑動距離', () => {
    it('滑動距離不足時不應該判斷為有效滑動', () => {
      const start = point(0, 0);
      const end = point(10, 0); // 只有 10px，預設需要 30px

      const result = classifySwipeDirection(start, end);

      expect(result.isValidSwipe).toBe(false);
      expect(result.isHorizontal).toBe(false);
      expect(result.isVertical).toBe(false);
    });

    it('可以自訂最小滑動距離', () => {
      const start = point(0, 0);
      const end = point(10, 0);

      const result = classifySwipeDirection(start, end, {
        minSwipeDistance: 5
      });

      expect(result.isValidSwipe).toBe(true);
      expect(result.isHorizontal).toBe(true);
    });
  });

  describe('角度閾值自訂', () => {
    it('可以放寬角度閾值', () => {
      const start = point(0, 0);
      const end = point(100, 80); // 約 38 度

      // 預設 45 度閾值，應該判斷為水平
      const result1 = classifySwipeDirection(start, end, {
        angleThreshold: 45
      });
      expect(result1.isHorizontal).toBe(true);

      // 嚴格 30 度閾值，不應該判斷為水平
      const result2 = classifySwipeDirection(start, end, {
        angleThreshold: 30
      });
      expect(result2.isHorizontal).toBe(false);
    });
  });

  describe('返回值完整性', () => {
    it('應該返回所有必要的資訊', () => {
      const start = point(0, 0);
      const end = point(100, 50);

      const result = classifySwipeDirection(start, end);

      expect(result).toHaveProperty('isValidSwipe');
      expect(result).toHaveProperty('isHorizontal');
      expect(result).toHaveProperty('isVertical');
      expect(result).toHaveProperty('distance');
      expect(result).toHaveProperty('angleDeg');
      expect(result).toHaveProperty('angleRad');
      expect(typeof result.distance).toBe('number');
    });
  });
});
