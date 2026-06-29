import crypto from 'crypto';

// 在正式環境中，這應該來自環境變數 (例如 process.env.WOPI_SECRET)
// 為了 lab 方便，我們先寫死一個隨機的 Secret
const WOPI_SECRET =
  process.env.WOPI_SECRET ||
  import.meta.env.WOPI_SECRET ||
  'my-super-secret-wopi-key-parker-lab';

/**
 * 產生一個帶有 HMAC 簽章的 Base64 Token
 */
export function generateWopiToken(userId, userName, permissions = {}) {
  const payload = {
    userId,
    userName,
    permissions,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24小時後過期
  };

  const payloadStr = JSON.stringify(payload);
  const payloadB64 = Buffer.from(payloadStr).toString('base64url');

  // 建立 HMAC 簽章
  const signature = crypto
    .createHmac('sha256', WOPI_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * 驗證並解析 WOPI Token
 * @returns 解析成功回傳 payload，失敗則拋出 Error
 */
export function verifyWopiToken(token) {
  if (!token) {
    throw new Error('No token provided');
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    throw new Error('Invalid token format');
  }

  const [payloadB64, signature] = parts;

  // 重新計算簽章進行比對
  const expectedSignature = crypto
    .createHmac('sha256', WOPI_SECRET)
    .update(payloadB64)
    .digest('base64url');

  if (signature !== expectedSignature) {
    throw new Error('Invalid token signature');
  }

  try {
    const payloadStr = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload = JSON.parse(payloadStr);

    if (Date.now() > payload.exp) {
      throw new Error('Token has expired');
    }

    return payload;
  } catch (_err) {
    throw new Error('Failed to parse token payload');
  }
}
