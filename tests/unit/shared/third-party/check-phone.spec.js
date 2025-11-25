import { describe, it, expect, beforeEach } from 'vitest';
import { checkPhone, checkTelephone } from '@shared/third-party/check-phone.js';

describe('checkPhone', () => {
  describe('台灣電話號碼驗證', () => {
    it('應該驗證有效的台灣手機號碼', () => {
      const result = checkPhone('0912345678', '886');
      expect(result.isValid).toBe(true);
      expect(result.phoneError).toBe(false);
      expect(result.countryCodeError).toBe(false);
      expect(result.errorMessage).toBe('');
    });

    it('應該驗證有效的台灣手機號碼（含空格）', () => {
      const result = checkPhone('0912 345 678', '886');
      expect(result.isValid).toBe(true);
    });

    it('應該驗證有效的台灣手機號碼（含破折號）', () => {
      const result = checkPhone('0912-345-678', '886');
      expect(result.isValid).toBe(true);
    });

    it('應該驗證有效的台灣手機號碼（含括號）', () => {
      const result = checkPhone('(09)12345678', '886');
      expect(result.isValid).toBe(true);
    });

    it('應該拒絕無效的台灣手機號碼', () => {
      const result = checkPhone('0812345678', '886'); // 08 開頭無效
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
      expect(result.errorMessage).toBe('電話號碼格式不正確');
    });

    it('應該拒絕號碼長度不正確的台灣手機', () => {
      const result = checkPhone('091234567', '886'); // 少一碼
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
    });
  });

  describe('美國電話號碼驗證', () => {
    it('應該驗證有效的美國電話號碼', () => {
      const result = checkPhone('2025551234', '1');
      expect(result.isValid).toBe(true);
      expect(result.phoneError).toBe(false);
    });

    it('應該驗證有效的美國電話號碼（含格式）', () => {
      const result = checkPhone('(202) 555-1234', '1');
      expect(result.isValid).toBe(true);
    });

    it('應該拒絕無效的美國電話號碼', () => {
      const result = checkPhone('123456', '1');
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
    });
  });

  describe('日本電話號碼驗證', () => {
    it('應該驗證有效的日本手機號碼', () => {
      const result = checkPhone('09012345678', '81');
      expect(result.isValid).toBe(true);
    });

    it('應該驗證有效的日本手機號碼（含破折號）', () => {
      const result = checkPhone('090-1234-5678', '81');
      expect(result.isValid).toBe(true);
    });
  });

  describe('空值和無效輸入處理', () => {
    it('應該拒絕空電話號碼', () => {
      const result = checkPhone('', '886');
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
      expect(result.errorMessage).toBe('請輸入電話號碼');
    });

    it('應該拒絕只有空格的電話號碼', () => {
      const result = checkPhone('   ', '886');
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
      expect(result.errorMessage).toBe('請輸入電話號碼');
    });

    it('應該拒絕 null 電話號碼', () => {
      const result = checkPhone(null, '886');
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
    });

    it('應該拒絕 undefined 電話號碼', () => {
      const result = checkPhone(undefined, '886');
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
    });
  });

  describe('國碼驗證', () => {
    it('應該拒絕空國碼', () => {
      const result = checkPhone('0912345678', '');
      expect(result.isValid).toBe(false);
      expect(result.countryCodeError).toBe(true);
      expect(result.errorMessage).toBe('無效的電話國碼');
    });

    it('應該拒絕非數字國碼', () => {
      const result = checkPhone('0912345678', 'abc');
      expect(result.isValid).toBe(false);
      expect(result.countryCodeError).toBe(true);
      expect(result.errorMessage).toBe('無法識別的電話國碼');
    });

    it('應該拒絕非字串國碼', () => {
      const result = checkPhone('0912345678', 886); // 數字而非字串
      expect(result.isValid).toBe(false);
      expect(result.countryCodeError).toBe(true);
    });

    it('應該拒絕無法識別的國碼', () => {
      const result = checkPhone('0912345678', '999999');
      expect(result.isValid).toBe(false);
      expect(result.countryCodeError).toBe(true);
      expect(result.errorMessage).toBe('無法識別的電話國碼');
    });
  });

  describe('特殊字符處理', () => {
    it('應該接受包含空格的電話號碼', () => {
      const result = checkPhone('0912 345 678', '886');
      expect(result.isValid).toBe(true);
    });

    it('應該接受包含破折號的電話號碼', () => {
      const result = checkPhone('0912-345-678', '886');
      expect(result.isValid).toBe(true);
    });

    it('應該接受包含括號的電話號碼', () => {
      const result = checkPhone('(09)12-345-678', '886');
      expect(result.isValid).toBe(true);
    });

    it('應該拒絕包含字母的電話號碼', () => {
      const result = checkPhone('091234567a', '886');
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
      expect(result.errorMessage).toBe('電話號碼格式不正確');
    });

    it('應該拒絕包含特殊符號的電話號碼', () => {
      const result = checkPhone('0912#345678', '886');
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
    });
  });

  describe('錯誤訊息', () => {
    it('空電話號碼應該返回正確的錯誤訊息', () => {
      const result = checkPhone('', '886');
      expect(result.errorMessage).toBe('請輸入電話號碼');
    });

    it('無效國碼應該返回正確的錯誤訊息', () => {
      const result = checkPhone('0912345678', '');
      expect(result.errorMessage).toBe('無效的電話國碼');
    });

    it('無法識別的國碼應該返回正確的錯誤訊息', () => {
      const result = checkPhone('0912345678', '999');
      expect(result.errorMessage).toBe('無法識別的電話國碼');
    });

    it('格式錯誤的電話號碼應該返回正確的錯誤訊息', () => {
      const result = checkPhone('abc', '886');
      expect(result.errorMessage).toBe('電話號碼格式不正確');
    });

    it('無效的電話號碼應該返回正確的錯誤訊息', () => {
      const result = checkPhone('123', '886');
      expect(result.errorMessage).toBe('電話號碼格式不正確');
    });
  });

  describe('預設值處理', () => {
    it('應該使用預設電話號碼', () => {
      const result = checkPhone();
      expect(result.isValid).toBe(false);
      expect(result.phoneError).toBe(true);
    });

    it('應該使用預設國碼', () => {
      const result = checkPhone('0912345678');
      expect(result.isValid).toBe(false);
      expect(result.countryCodeError).toBe(true);
    });
  });
});

describe('checkTelephone', () => {
  describe('有效的市話號碼', () => {
    it('應該驗證台北市話（02）', () => {
      expect(checkTelephone('12345678', '02')).toBe(true);
      expect(checkTelephone('23456789', '02')).toBe(true);
    });

    it('應該驗證台中市話（04）', () => {
      expect(checkTelephone('12345678', '04')).toBe(true);
    });

    it('應該驗證高雄市話（07）', () => {
      expect(checkTelephone('1234567', '07')).toBe(true);
    });

    it('應該驗證三碼區碼的市話', () => {
      expect(checkTelephone('123456', '037')).toBe(true);
      expect(checkTelephone('1234567', '037')).toBe(true);
    });

    it('應該驗證四碼區碼的市話', () => {
      expect(checkTelephone('12345', '0836')).toBe(true);
      expect(checkTelephone('123456', '0836')).toBe(true);
    });
  });

  describe('無效的市話號碼', () => {
    it('應該拒絕號碼太短', () => {
      expect(checkTelephone('1234', '02')).toBe(false);
    });

    it('應該拒絕號碼太長', () => {
      expect(checkTelephone('123456789', '02')).toBe(false);
    });

    it('應該拒絕不是 0 開頭的區碼', () => {
      expect(checkTelephone('12345678', '12')).toBe(false);
    });

    it('應該拒絕格式不正確的號碼', () => {
      expect(checkTelephone('abc', '02')).toBe(false);
    });
  });

  describe('預設值處理', () => {
    it('應該使用預設電話號碼', () => {
      expect(checkTelephone()).toBe(true); // 預設值符合格式
    });

    it('應該使用預設區碼', () => {
      expect(checkTelephone('12345678')).toBe(true);
    });
  });

  describe('邊界情況', () => {
    it('應該處理空字串', () => {
      expect(checkTelephone('', '02')).toBe(false);
    });

    it('應該處理 null', () => {
      expect(checkTelephone(null, '02')).toBe(false);
    });

    it('應該處理 undefined', () => {
      expect(checkTelephone(undefined, '02')).toBe(true); // undefined 會使用預設值 '00000'
    });
  });
});
