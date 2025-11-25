import { describe, it, expect } from 'vitest';
import { safeToJSON, safeParseJSON } from '@shared/helpers/safeToJSON.js';
import amountFormat from '@shared/helpers/amount-format.js';
import { numberUnit } from '@shared/helpers/number-unit.js';

/**
 * 整合測試：工具函數之間的互動
 */
describe('Helper Functions Integration', () => {
  describe('safeToJSON + amountFormat', () => {
    it('應該能夠序列化格式化後的金額資料', () => {
      const amount = 1234567.89;
      const formatted = amountFormat(amount);

      const data = {
        original: amount,
        formatted: formatted,
        currency: 'TWD'
      };

      const json = safeToJSON(data);
      const parsed = safeParseJSON(json);

      expect(parsed.original).toBe(amount);
      expect(parsed.formatted).toBe(formatted);
    });

    it('應該處理包含 BigInt 的金額資料', () => {
      const data = {
        amount: BigInt('9007199254740991'),
        formatted: '9,007,199,254,740,991'
      };

      const json = safeToJSON(data);
      const parsed = safeParseJSON(json);

      expect(parsed.amount).toBe(BigInt('9007199254740991'));
      expect(parsed.formatted).toBe('9,007,199,254,740,991');
    });
  });

  describe('safeToJSON + numberUnit', () => {
    it('應該能夠序列化數字單位轉換結果', () => {
      const number = 15000;
      const formatted = numberUnit(number);

      const data = {
        original: number,
        formatted: formatted
      };

      const json = safeToJSON(data);
      const parsed = safeParseJSON(json);

      expect(parsed.original).toBe(number);
      expect(parsed.formatted).toBeDefined();
    });
  });

  describe('複雜資料結構', () => {
    it('應該處理包含多種格式化資料的物件', () => {
      const complexData = {
        user: {
          id: BigInt('123456789'),
          balance: amountFormat(1234567.89),
          followers: numberUnit(15000)
        }
      };

      const json = safeToJSON(complexData);
      const parsed = safeParseJSON(json);

      expect(parsed.user.id).toBe(BigInt('123456789'));
      expect(typeof parsed.user.balance).toBe('string');
      expect(parsed.user.followers).toBeDefined();
    });

    it('應該處理陣列資料', () => {
      const data = {
        items: [
          { value: amountFormat(1000) },
          { value: amountFormat(2000) }
        ]
      };

      const json = safeToJSON(data);
      const parsed = safeParseJSON(json);

      expect(parsed.items).toHaveLength(2);
      expect(typeof parsed.items[0].value).toBe('string');
    });
  });

  describe('錯誤處理', () => {
    it('應該優雅處理無效的 JSON', () => {
      const invalidJson = '{invalid}';
      const result = safeParseJSON(invalidJson);
      expect(result).toBe(invalidJson);
    });

    it('應該處理邊界情況', () => {
      const results = [
        amountFormat(0),
        amountFormat(null),
        numberUnit(0)
      ];

      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });
  });

  describe('資料往返轉換', () => {
    it('應該能夠完整序列化和反序列化複雜物件', () => {
      const original = {
        id: BigInt('999'),
        name: 'Test',
        amount: amountFormat(12345),
        count: numberUnit(5000),
        nested: {
          value: BigInt('123456789')
        }
      };

      const json = safeToJSON(original);
      const restored = safeParseJSON(json);

      expect(restored.id).toBe(BigInt('999'));
      expect(restored.name).toBe('Test');
      expect(restored.nested.value).toBe(BigInt('123456789'));
    });
  });
});
