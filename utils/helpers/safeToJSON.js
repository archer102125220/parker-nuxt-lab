export function safeToJSON(data) {
  try {
    return JSON.stringify(data);
  } catch (error) {
    return data;
  }
}

export function safeParseJSON(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}

export default {
  safeToJSON,
  safeParseJSON
}