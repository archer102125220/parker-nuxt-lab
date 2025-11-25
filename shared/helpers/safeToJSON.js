export function safeToJSON(data) {
  try {
    return JSON.stringify(data, (key, value) => {
      // 檢查值的型別是否為 bigint
      if (typeof value === 'bigint') {
        // 轉換為字串，並在字串前加上一個標記，以便稍後識別
        return value.toString() + "n";
      }
      return value;
    });
  } catch (error) {
    return data;
  }
}

export function safeParseJSON(data) {
  try {
    return JSON.parse(data, (key, value) => {
      // 檢查值的型別是否為字串，且以 "n" 結尾
      if (typeof value === 'string' && value.endsWith("n")) {
        const numPart = value.slice(0, -1);
        // 檢查去掉 'n' 後是否為純數字（包括負數）
        // 使用正則表達式確保是有效的數字格式
        if (/^-?\d+$/.test(numPart)) {
          try {
            return BigInt(numPart);
          } catch {
            // 如果 BigInt 轉換失敗，返回原始值
            return value;
          }
        }
      }
      return value;
    });
  } catch (error) {
    return data;
  }
}

export default {
  safeToJSON,
  safeParseJSON
}