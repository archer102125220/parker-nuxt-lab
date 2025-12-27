import { describe, it, expect } from 'vitest';
import {
  getCookie,
  getJsonCookie,
  asciiToText
} from '@app/utils/helpers/get-cookie';

/**
 * get-cookie 純函數測試
 *
 * 測試 cookie 解析功能的正確性
 */
describe('getCookie', () => {
  describe('基本取值', () => {
    it('應該正確取得指定的 cookie 值', () => {
      const cookieString = 'username=John; token=abc123; theme=dark';

      expect(getCookie('username', cookieString)).toBe('John');
      expect(getCookie('token', cookieString)).toBe('abc123');
      expect(getCookie('theme', cookieString)).toBe('dark');
    });

    it('cookie 不存在時應該返回空字串', () => {
      const cookieString = 'username=John; token=abc123';

      expect(getCookie('notexist', cookieString)).toBe('');
    });

    it('空 cookie 字串應該返回空字串', () => {
      expect(getCookie('username', '')).toBe('');
    });
  });

  describe('特殊情況', () => {
    it('應該處理 cookie 名稱前有空格', () => {
      const cookieString = 'username=John;  token=abc123';

      expect(getCookie('username', cookieString)).toBe('John');
      expect(getCookie('token', cookieString)).toBe('abc123');
    });

    it('應該處理 URL 編碼的 cookie', () => {
      const cookieString = 'name=%E5%BC%B5%E4%B8%89'; // 張三

      expect(getCookie('name', cookieString)).toBe('張三');
    });

    it('應該處理含有等號的 cookie 值', () => {
      const cookieString = 'data=key=value';

      expect(getCookie('data', cookieString)).toBe('key=value');
    });
  });
});

describe('getJsonCookie', () => {
  describe('基本轉換', () => {
    it('應該將 cookie 字串轉換為物件', () => {
      const cookieString = 'username=John;token=abc123;theme=dark';

      const result = getJsonCookie(cookieString);

      expect(result.username).toBe('John');
      expect(result.token).toBe('abc123');
      expect(result.theme).toBe('dark');
    });

    it('空字串應該返回空物件相關結構', () => {
      const result = getJsonCookie('');

      expect(typeof result).toBe('object');
    });
  });

  describe('多個 cookie', () => {
    it('應該正確解析多個 cookie', () => {
      const cookieString = 'a=1;b=2;c=3';

      const result = getJsonCookie(cookieString);

      expect(Object.keys(result).length).toBe(3);
    });
  });
});

describe('asciiToText', () => {
  describe('基本轉換', () => {
    it('沒有轉義字元時應該返回原字串', () => {
      expect(asciiToText('hello')).toBe('hello');
    });

    it('應該轉換八進位 ASCII 碼', () => {
      // \110 = H, \145 = e, \154 = l, \157 = o
      expect(asciiToText('\\110\\145\\154\\154\\157')).toBe('Hello');
    });
  });

  describe('混合內容', () => {
    it('應該處理混合普通文字和轉義字元', () => {
      // 測試 prefix + 轉義字元
      const result = asciiToText('prefix\\110');
      expect(result).toBe('prefixH');
    });
  });
});
