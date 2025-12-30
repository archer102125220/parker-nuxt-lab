import { describe, it, expect, vi } from 'vitest';
import amountFormat from '@shared/helpers/amount-format.js';

describe('amountFormat', () => {
  describe('基本千分位格式化', () => {
    it('應該正確格式化整數', () => {
      expect(amountFormat(1000)).toBe('1,000');
      expect(amountFormat(10000)).toBe('10,000');
      expect(amountFormat(100000)).toBe('100,000');
      expect(amountFormat(1000000)).toBe('1,000,000');
    });

    it('應該正確格式化小數', () => {
      expect(amountFormat(1000.5)).toBe('1,000.5');
      expect(amountFormat(10000.99)).toBe('10,000.99');
      expect(amountFormat(1234567.89)).toBe('1,234,567.89');
    });

    it('應該處理小於 1000 的數字（不加千分位）', () => {
      expect(amountFormat(0)).toBe('0');
      expect(amountFormat(1)).toBe('1');
      expect(amountFormat(99)).toBe('99');
      expect(amountFormat(999)).toBe('999');
    });

    it('應該處理負數', () => {
      expect(amountFormat(-1000)).toBe('-1,000');
      expect(amountFormat(-10000)).toBe('-10,000');
      expect(amountFormat(-1234567.89)).toBe('-1,234,567.89');
    });
  });

  describe('自訂分隔符號', () => {
    it('應該使用自訂分隔符號', () => {
      expect(amountFormat(1000, undefined, ' ')).toBe('1 000');
      expect(amountFormat(1000, undefined, '.')).toBe('1.000');
      expect(amountFormat(1000000, undefined, '_')).toBe('1_000_000');
    });
  });

  describe('自訂正則表達式', () => {
    it('應該接受陣列格式的正則表達式', () => {
      const customRegex = ['\\B(?=(\\d{3})+(?!\\d))', 'g'];
      const result = amountFormat(1000, customRegex, ',');
      expect(result).toBe('1,000');
    });

    it('應該接受 RegExp 物件', () => {
      const customRegex = /\B(?=(\d{3})+(?!\d))/g;
      expect(amountFormat(1000, customRegex, ',')).toBe('1,000');
    });

    it('應該處理空陣列', () => {
      const result = amountFormat(1000, [], ',');
      // 空陣列會讓 formater 為 undefined，但仍然會執行 replace
      expect(typeof result).toBe('string');
    });
  });

  describe('邊界情況', () => {
    it('應該處理 null 和 undefined', () => {
      expect(amountFormat(null)).toBe('null');
      expect(amountFormat(undefined)).toBe(undefined);
    });

    it('應該處理非數字字串', () => {
      expect(amountFormat('abc')).toBe('abc');
      expect(amountFormat('')).toBe('');
    });

    it('應該處理數字字串', () => {
      expect(amountFormat('1000')).toBe('1,000');
      expect(amountFormat('1234567.89')).toBe('1,234,567.89');
    });

    it('應該處理零', () => {
      expect(amountFormat(0)).toBe('0');
      expect(amountFormat(0.0)).toBe('0');
    });
  });

  describe('Safari 降級處理', () => {
    it('應該在正則表達式錯誤時觸發降級處理', () => {
      // 使用無效的正則表達式觸發錯誤
      const invalidRegex = ['(', 'g'];
      const result = amountFormat(1000, invalidRegex, ',');

      // 降級處理應該返回包含數字的結果
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toContain('1');
      expect(result).toContain('0');
    });

    it('降級處理應該正確處理整數', () => {
      const invalidRegex = ['(', 'g'];
      const result = amountFormat(1234, invalidRegex, ',');
      // 降級處理會產生分離的數字
      expect(result).toContain('1');
      expect(result).toContain('2');
    });

    it('降級處理應該正確處理小數', () => {
      const invalidRegex = ['(', 'g'];
      const result = amountFormat(1234.56, invalidRegex, ',');
      expect(result).toContain('1');
      expect(result).toContain('2');
      expect(result).toContain('5');
    });

    it('降級處理應該使用自訂分隔符號', () => {
      const invalidRegex = ['(', 'g'];
      const result = amountFormat(1000, invalidRegex, '_');
      expect(result).toContain('_');
    });
  });

  describe('自訂錯誤處理函數', () => {
    it('應該使用自訂錯誤處理函數', () => {
      const customErrorHandler = vi.fn((amount) => `ERROR: ${amount}`);
      // 使用無效的正則表達式觸發錯誤
      const invalidRegex = ['(', 'g']; // 不完整的正則表達式

      const result = amountFormat(1000, invalidRegex, ',', customErrorHandler);

      // 自訂錯誤處理函數應該被呼叫
      expect(customErrorHandler).toHaveBeenCalled();
      expect(result).toBe('ERROR: 1000');
    });

    it('自訂錯誤處理函數應該接收正確的參數', () => {
      const customErrorHandler = vi.fn();
      const invalidRegex = ['(', 'g']; // 不完整的正則表達式

      amountFormat(1000, invalidRegex, '_', customErrorHandler);

      // 自訂錯誤處理函數應該被呼叫
      expect(customErrorHandler).toHaveBeenCalled();
      expect(customErrorHandler).toHaveBeenCalledWith(
        1000,
        '_',
        expect.any(Error)
      );
    });

    it('應該處理非函數的錯誤處理器', () => {
      const invalidRegex = ['(', 'g'];
      const result = amountFormat(1000, invalidRegex, ',', undefined);

      // 沒有錯誤處理函數時會使用預設的 handleSafari
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('特殊格式', () => {
    it('應該處理已經包含千分位的數字', () => {
      expect(amountFormat('1,000')).toBe('1,000');
    });

    it('應該處理科學記號', () => {
      expect(amountFormat(1e6)).toBe('1,000,000');
      expect(amountFormat(1.5e3)).toBe('1,500');
    });

    it('應該處理極大的數字', () => {
      expect(amountFormat(1000000000)).toBe('1,000,000,000');
      expect(amountFormat(999999999999)).toBe('999,999,999,999');
    });

    it('應該處理極小的小數', () => {
      expect(amountFormat(0.001)).toBe('0.001');
      expect(amountFormat(1000.0001)).toBe('1,000.0001');
    });
  });
});
