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
        // 移除 "n"，並轉換為 bigint
        return BigInt(value.slice(0, -1));
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