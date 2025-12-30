import { Base64 as base64Js } from 'js-base64';

// 簽章驗證之部分找不到相關資料，因此此部分略過待完全依賴fido2-lib套件在實作驗證
/**
 * @openapi
 * /nuxt-server/web-authn/generate-challenge:
 *    get:
 *      description: 生成 WebAuthn 挑戰
 *      responses:
 *        200:
 *          description: Base64URL 編碼的挑戰值
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                description: Base64URL 編碼的挑戰值
 *                example: "base64url_encoded_challenge_string"
 */
/**
 * WebAuthn 挑戰生成 API
 *
 * 生成 WebAuthn 認證所需的隨機挑戰值
 * 使用加密安全的隨機數生成器產生 32 位元組的挑戰值
 *
 * @api {GET} /api/nuxt-server/web-authn/generate-challenge 生成 WebAuthn 挑戰
 * @apiGroup WebAuthn
 * @apiName GenerateWebAuthnChallenge
 *
 * @apiSuccess {String} data Base64URL 編碼的挑戰值
 *
 * @example
 * // 請求範例
 * GET /api/nuxt-server/web-authn/generate-challenge
 *
 * @example
 * // 成功回應範例
 * "base64url_encoded_challenge_string"
 *
 * @description
 * 此 API 生成用於 WebAuthn 認證流程的挑戰值：
 *
 * 1. 使用 crypto.getRandomValues() 生成 32 位元組的加密安全隨機數
 * 2. 將隨機數轉換為 Base64URL 編碼格式
 * 3. 回傳編碼後的挑戰字串
 *
 * 使用場景：
 * - WebAuthn 註冊流程中的挑戰生成
 * - WebAuthn 登入流程中的挑戰生成
 * - 防止重放攻擊的安全機制
 *
 * 注意事項：
 * - 挑戰值應在每次認證請求中唯一
 * - 挑戰值應在合理的時間內過期
 * - 簽章驗證部分目前依賴 fido2-lib 套件實作
 */
export default defineEventHandler((event) => {
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  // console.log({ challenge }, challenge.toLocaleString());

  return base64Js.fromUint8Array(challenge, true);
});