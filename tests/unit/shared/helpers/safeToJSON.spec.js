import { describe, it, expect } from 'vitest';
import { safeToJSON, safeParseJSON } from '@shared/helpers/safeToJSON.js';

describe('safeToJSON', () => {
  describe('正常序列化', () => {
    it('應該正確序列化簡單物件', () => {
      const obj = { name: 'test', age: 25 };
      expect(safeToJSON(obj)).toBe('{"name":"test","age":25}');
    });

    it('應該正確序列化陣列', () => {
      const arr = [1, 2, 3, 'test'];
      expect(safeToJSON(arr)).toBe('[1,2,3,"test"]');
    });

    it('應該正確序列化巢狀物件', () => {
      const obj = {
        user: {
          name: 'test',
          profile: {
            age: 25
          }
        }
      };
      expect(safeToJSON(obj)).toBe('{"user":{"name":"test","profile":{"age":25}}}');
    });

    it('應該正確序列化基本型別', () => {
      expect(safeToJSON('string')).toBe('"string"');
      expect(safeToJSON(123)).toBe('123');
      expect(safeToJSON(true)).toBe('true');
      expect(safeToJSON(null)).toBe('null');
    });
  });

  describe('BigInt 處理', () => {
    it('應該正確序列化 BigInt', () => {
      const obj = { id: BigInt(123456789012345) };
      const result = safeToJSON(obj);
      expect(result).toBe('{"id":"123456789012345n"}');
    });

    it('應該正確序列化包含 BigInt 的陣列', () => {
      const arr = [1, BigInt(999), 'test'];
      const result = safeToJSON(arr);
      expect(result).toBe('[1,"999n","test"]');
    });

    it('應該正確序列化巢狀物件中的 BigInt', () => {
      const obj = {
        user: {
          id: BigInt(123),
          balance: BigInt(1000000)
        }
      };
      const result = safeToJSON(obj);
      expect(result).toBe('{"user":{"id":"123n","balance":"1000000n"}}');
    });

    it('應該處理非常大的 BigInt', () => {
      const bigNum = BigInt('9007199254740991999999');
      const obj = { value: bigNum };
      const result = safeToJSON(obj);
      expect(result).toContain('9007199254740991999999n');
    });
  });

  describe('循環引用處理', () => {
    it('應該處理循環引用而不拋出錯誤', () => {
      const obj = { name: 'test' };
      obj.self = obj; // 創建循環引用

      const result = safeToJSON(obj);
      // 應該返回原物件而不是拋出錯誤
      expect(result).toBe(obj);
    });

    it('應該處理複雜的循環引用', () => {
      const obj1 = { name: 'obj1' };
      const obj2 = { name: 'obj2' };
      obj1.ref = obj2;
      obj2.ref = obj1; // 創建循環引用

      const result = safeToJSON(obj1);
      expect(result).toBe(obj1);
    });
  });

  describe('特殊值處理', () => {
    it('應該處理 undefined', () => {
      const result = safeToJSON(undefined);
      // JSON.stringify(undefined) 返回 undefined
      expect(result).toBe(undefined);
    });

    it('應該處理包含 undefined 的物件', () => {
      const obj = { name: 'test', value: undefined };
      expect(safeToJSON(obj)).toBe('{"name":"test"}');
    });

    it('應該處理 Symbol', () => {
      const obj = { name: 'test', [Symbol('key')]: 'value' };
      // Symbol 會被 JSON.stringify 忽略
      expect(safeToJSON(obj)).toBe('{"name":"test"}');
    });

    it('應該處理 Function', () => {
      const obj = { name: 'test', fn: () => { } };
      // Function 會被 JSON.stringify 忽略
      expect(safeToJSON(obj)).toBe('{"name":"test"}');
    });
  });

  describe('錯誤處理', () => {
    it('發生錯誤時應該返回原始資料', () => {
      const obj = { name: 'test' };
      obj.self = obj;

      const result = safeToJSON(obj);
      expect(result).toBe(obj);
    });
  });
});

describe('safeParseJSON', () => {
  describe('正常反序列化', () => {
    it('應該正確解析 JSON 字串', () => {
      const json = '{"name":"test","age":25}';
      const result = safeParseJSON(json);
      expect(result).toEqual({ name: 'test', age: 25 });
    });

    it('應該正確解析陣列', () => {
      const json = '[1,2,3,"test"]';
      const result = safeParseJSON(json);
      expect(result).toEqual([1, 2, 3, 'test']);
    });

    it('應該正確解析巢狀物件', () => {
      const json = '{"user":{"name":"test","profile":{"age":25}}}';
      const result = safeParseJSON(json);
      expect(result).toEqual({
        user: {
          name: 'test',
          profile: {
            age: 25
          }
        }
      });
    });

    it('應該正確解析基本型別', () => {
      expect(safeParseJSON('"string"')).toBe('string');
      expect(safeParseJSON('123')).toBe(123);
      expect(safeParseJSON('true')).toBe(true);
      expect(safeParseJSON('null')).toBe(null);
    });
  });

  describe('BigInt 反序列化', () => {
    it('應該正確解析 BigInt', () => {
      const json = '{"id":"123456789012345n"}';
      const result = safeParseJSON(json);
      expect(result.id).toBe(BigInt(123456789012345));
    });

    it('應該正確解析包含 BigInt 的陣列', () => {
      const json = '[1,"999n","test"]';
      const result = safeParseJSON(json);
      expect(result).toEqual([1, BigInt(999), 'test']);
    });

    it('應該正確解析巢狀物件中的 BigInt', () => {
      const json = '{"user":{"id":"123n","balance":"1000000n"}}';
      const result = safeParseJSON(json);
      expect(result.user.id).toBe(BigInt(123));
      expect(result.user.balance).toBe(BigInt(1000000));
    });

    it('應該處理非常大的 BigInt', () => {
      const json = '{"value":"9007199254740991999999n"}';
      const result = safeParseJSON(json);
      expect(result.value).toBe(BigInt('9007199254740991999999'));
    });

    it('應該正確處理以 n 結尾的普通字串', () => {
      const json = '{"text":"common"}';
      const result = safeParseJSON(json);
      // 改進後的實作使用正則表達式檢查，"common" 不會被誤判為 BigInt
      expect(result).toEqual({ text: 'common' });
    });
  });

  describe('錯誤處理', () => {
    it('應該處理無效的 JSON 字串', () => {
      const invalidJson = '{invalid json}';
      const result = safeParseJSON(invalidJson);
      expect(result).toBe(invalidJson);
    });

    it('應該處理空字串', () => {
      const result = safeParseJSON('');
      expect(result).toBe('');
    });

    it('應該處理非字串輸入', () => {
      expect(safeParseJSON(123)).toBe(123);
      expect(safeParseJSON(null)).toBe(null);
      expect(safeParseJSON(undefined)).toBe(undefined);
      expect(safeParseJSON({ name: 'test' })).toEqual({ name: 'test' });
    });

    it('應該處理格式錯誤的 JSON', () => {
      const malformed = '{"name": test}'; // 缺少引號
      const result = safeParseJSON(malformed);
      expect(result).toBe(malformed);
    });
  });

  describe('特殊字元處理', () => {
    it('應該正確處理轉義字元', () => {
      const json = '{"text":"Hello\\nWorld"}';
      const result = safeParseJSON(json);
      expect(result).toEqual({ text: 'Hello\nWorld' });
    });

    it('應該正確處理 Unicode', () => {
      const json = '{"text":"你好世界"}';
      const result = safeParseJSON(json);
      expect(result).toEqual({ text: '你好世界' });
    });

    it('應該正確處理特殊符號', () => {
      const json = '{"text":"Test \\"quoted\\" text"}';
      const result = safeParseJSON(json);
      expect(result).toEqual({ text: 'Test "quoted" text' });
    });
  });
});

describe('safeToJSON 和 safeParseJSON 整合', () => {

  it('應該處理複雜的資料結構', () => {
    const original = {
      users: [
        { id: 1, name: 'User 1', active: true },
        { id: 2, name: 'User 2', active: false }
      ],
      metadata: {
        total: 2,
        page: 1
      }
    };

    const json = safeToJSON(original);
    const parsed = safeParseJSON(json);
    expect(parsed).toEqual(original);
  });

  it('BigInt 序列化後反序列化應該保持類型', () => {
    const original = {
      id: BigInt(123),
      balance: BigInt(1000000),
      data: {
        value: BigInt('9007199254740991999999')
      }
    };

    const json = safeToJSON(original);
    const parsed = safeParseJSON(json);

    expect(parsed.id).toBe(BigInt(123));
    expect(parsed.balance).toBe(BigInt(1000000));
    expect(parsed.data.value).toBe(BigInt('9007199254740991999999'));
  });

  it('混合資料類型應該正確處理', () => {
    const original = {
      string: 'test',
      number: 123,
      bigint: BigInt(999),
      boolean: true,
      null: null,
      array: [1, BigInt(2), 'three'],
      nested: {
        id: BigInt(456)
      }
    };

    const json = safeToJSON(original);
    const parsed = safeParseJSON(json);

    expect(parsed.string).toBe('test');
    expect(parsed.number).toBe(123);
    expect(parsed.bigint).toBe(BigInt(999));
    expect(parsed.boolean).toBe(true);
    expect(parsed.null).toBe(null);
    expect(parsed.array).toEqual([1, BigInt(2), 'three']);
    expect(parsed.nested.id).toBe(BigInt(456));
  });
});
