import { describe, it, expect } from 'vitest';
import {
  getDistanceBetweenPoints,
  distanceCalculation
} from '@app/utils/helpers/distance-between-points';

/**
 * distance-between-points 純函數測試
 *
 * 測試地理距離計算的正確性
 * 注意：getCurrentPosition 依賴瀏覽器 API，不適合單元測試
 */
describe('getDistanceBetweenPoints', () => {
  // 已知的地理座標對照
  // 參考：https://www.movable-type.co.uk/scripts/latlong.html

  describe('基本距離計算', () => {
    it('相同座標距離應該為 0', () => {
      const distance = getDistanceBetweenPoints(
        25.033,
        121.5654,
        25.033,
        121.5654
      );

      expect(distance).toBeCloseTo(0, 1);
    });

    it('台北到高雄約 350 公里', () => {
      // 台北 101: 25.0330, 121.5654
      // 高雄 85 大樓: 22.6127, 120.2995
      const distance = getDistanceBetweenPoints(
        25.033,
        121.5654,
        22.6127,
        120.2995
      );

      // 實際距離約 298 公里，允許一些誤差
      expect(distance).toBeGreaterThan(280);
      expect(distance).toBeLessThan(400);
    });

    it('東京到台北約 2100 公里', () => {
      // 東京塔: 35.6586, 139.7454
      // 台北 101: 25.0330, 121.5654
      const distance = getDistanceBetweenPoints(
        35.6586,
        139.7454,
        25.033,
        121.5654
      );

      // 實際距離約 2100 公里
      expect(distance).toBeGreaterThan(2000);
      expect(distance).toBeLessThan(2300);
    });
  });

  describe('單位轉換', () => {
    it('km 單位應該返回公里', () => {
      const distanceKm = getDistanceBetweenPoints(
        25.033,
        121.5654,
        22.6127,
        120.2995,
        'km'
      );

      expect(distanceKm).toBeGreaterThan(280);
    });

    it('miles 單位應該返回英里', () => {
      const distanceMiles = getDistanceBetweenPoints(
        25.033,
        121.5654,
        22.6127,
        120.2995,
        'miles'
      );

      // 英里小於公里 (1 英里 ≈ 1.609 公里)
      expect(distanceMiles).toBeGreaterThan(180); // 約 210 英里
      expect(distanceMiles).toBeLessThan(250);
    });

    it('英里應該小於公里數值', () => {
      const km = getDistanceBetweenPoints(
        25.033,
        121.5654,
        22.6127,
        120.2995,
        'km'
      );
      const miles = getDistanceBetweenPoints(
        25.033,
        121.5654,
        22.6127,
        120.2995,
        'miles'
      );

      expect(miles).toBeLessThan(km);
      expect(km / miles).toBeCloseTo(1.609, 1); // 換算比例
    });
  });

  describe('對稱性', () => {
    it('A 到 B 和 B 到 A 距離應該相同', () => {
      const distanceAB = getDistanceBetweenPoints(
        25.033,
        121.5654,
        22.6127,
        120.2995
      );
      const distanceBA = getDistanceBetweenPoints(
        22.6127,
        120.2995,
        25.033,
        121.5654
      );

      expect(distanceAB).toBeCloseTo(distanceBA, 5);
    });
  });
});

describe('distanceCalculation', () => {
  describe('時間計算', () => {
    it('100 公里 / 50 km/h = 2 小時', () => {
      const time = distanceCalculation(100, 50);

      expect(time).toBe(2);
    });

    it('預設速度 40 km/h', () => {
      const time = distanceCalculation(80);

      expect(time).toBe(2); // 80 / 40 = 2
    });
  });

  describe('錯誤處理', () => {
    it('無效距離應該返回 null', () => {
      expect(distanceCalculation('invalid')).toBe(null);
      expect(distanceCalculation(undefined)).toBe(null);
      expect(distanceCalculation(null)).toBe(null);
    });
  });
});
