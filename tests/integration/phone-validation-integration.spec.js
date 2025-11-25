import { describe, it, expect } from 'vitest';
import { checkPhone } from '@shared/third-party/check-phone.js';
import { safeToJSON, safeParseJSON } from '@shared/helpers/safeToJSON.js';

/**
 * 整合測試：電話驗證與資料序列化
 */
describe('Phone Validation Integration', () => {
  describe('checkPhone 基本驗證', () => {
    it('應該拒絕無效號碼', () => {
      const result = checkPhone('123', 'TW');
      expect(result.isValid).toBe(false);
    });

    it('應該拒絕空號碼', () => {
      const result = checkPhone('', 'TW');
      expect(result.isValid).toBe(false);
    });
  });

  describe('驗證結果序列化', () => {
    it('應該能夠序列化驗證結果', () => {
      const result = checkPhone('123', 'TW');

      const data = {
        phone: '123',
        country: 'TW',
        validation: result
      };

      const json = safeToJSON(data);
      const parsed = safeParseJSON(json);

      expect(parsed.phone).toBe('123');
      expect(parsed.country).toBe('TW');
      expect(parsed.validation).toBeDefined();
      expect(parsed.validation.isValid).toBe(false);
    });

    it('應該處理批量驗證結果', () => {
      const phones = ['123', '456', '789'];

      const results = phones.map(phone => ({
        phone,
        result: checkPhone(phone, 'TW')
      }));

      const json = safeToJSON(results);
      const parsed = safeParseJSON(json);

      expect(parsed).toHaveLength(3);
      expect(parsed[0].phone).toBe('123');
      expect(parsed[0].result.isValid).toBe(false);
    });
  });
});
