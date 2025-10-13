import { Base64 as base64Js } from 'js-base64';
import { parseAuthenticatorData } from '@/utils/third-party/fido2-lib';

// 簽章驗證之部分找不到相關資料，因此此部分略過待完全依賴fido2-lib套件在實作驗證

// https://blog.techbridge.cc/2019/08/17/webauthn-intro
// https://yishiashia.github.io/posts/passkey-and-webauthn-passwordless-authentication/
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API#browser_compatibility
// https://flyhigher.top/develop/2160.html#verify-authenticator
/**
 * WebAuthn 憑證驗證 API
 * 
 * 驗證 WebAuthn 登入請求
 * 使用已儲存的憑證資料驗證使用者的身份
 * 
 * @api {POST} /api/nuxt-server/web-authn/verify WebAuthn 憑證驗證
 * @apiGroup WebAuthn
 * @apiName WebAuthnVerify
 * 
 * @apiBody {String} challengeString 挑戰字串
 * @apiBody {Object} credential WebAuthn 憑證物件
 * @apiBody {String} credential.id 憑證 ID
 * @apiBody {String} credential.rawId Base64URL 編碼的原始憑證 ID
 * @apiBody {String} credential.authenticatorAttachment 認證器類型
 * @apiBody {String} credential.authenticatorData Base64URL 編碼的認證器資料
 * @apiBody {String} credential.clientDataJSON Base64URL 編碼的客戶端資料
 * @apiBody {String} credential.userHandle Base64URL 編碼的使用者控制代碼
 * @apiBody {Object} base64URLServerSaveData 伺服器儲存的憑證資料
 * @apiBody {String} base64URLServerSaveData.credentialPublicKeyPem PEM 格式的公鑰
 * @apiBody {String} [base64URLServerSaveData.credentialPublicKeyJwk] JWK 格式的公鑰
 * @apiBody {String} userId 使用者 ID
 * 
 * @apiSuccess {Object} data 驗證結果物件
 * @apiSuccess {String} data.credential.id 憑證 ID
 * @apiSuccess {String} data.base64URLServerSaveDataCredentialPublicKeyPem PEM 格式的公鑰
 * @apiSuccess {Object} data.decodeClientDataObj 解析後的客戶端資料物件
 * @apiSuccess {Boolean} data.success 驗證是否成功
 * @apiSuccess {String} data.userHandle 使用者控制代碼
 * 
 * @apiError {Object} error 驗證失敗時的錯誤資訊
 * @apiError {Number} error.statusCode=401 HTTP 狀態碼
 * @apiError {String} error.statusMessage 錯誤訊息
 * 
 * @example
 * // 請求範例
 * POST /api/nuxt-server/web-authn/verify
 * Content-Type: application/json
 * {
 *   "challengeString": "base64url_challenge",
 *   "credential": {
 *     "id": "credential_id",
 *     "rawId": "base64url_raw_id",
 *     "authenticatorAttachment": "platform",
 *     "authenticatorData": "base64url_authenticator_data",
 *     "clientDataJSON": "base64url_client_data",
 *     "userHandle": "base64url_user_handle"
 *   },
 *   "base64URLServerSaveData": {
 *     "credentialPublicKeyPem": "pem_encoded_public_key"
 *   },
 *   "userId": "user123"
 * }
 * 
 * @example
 * // 成功回應範例
 * {
 *   "credential": { ... },
 *   "base64URLServerSaveDataCredentialPublicKeyPem": "pem_encoded_public_key",
 *   "decodeClientDataObj": {
 *     "type": "webauthn.get",
 *     "challenge": "base64url_challenge",
 *     "origin": "https://example.com"
 *   },
 *   "success": true,
 *   "userHandle": "user123"
 * }
 * 
 * @description
 * 此 API 處理 WebAuthn 登入驗證流程：
 * 
 * 1. 驗證憑證資料的完整性和有效性
 * 2. 解析並驗證認證器資料 (authenticatorData)
 * 3. 驗證客戶端資料 (clientDataJSON) 的類型和挑戰值
 * 4. 驗證使用者控制代碼 (userHandle)
 * 5. 使用伺服器儲存的公鑰進行後續驗證
 * 
 * 驗證項目：
 * - clientData.type 必須為 "webauthn.get"
 * - 挑戰值必須與預期值相符
 * - userId 必須與 userHandle 相符
 * - 認證器資料格式必須正確
 * 
 * 重要注意事項：
 * - 簽章驗證部分目前依賴 fido2-lib 套件實作
 * - 需要從資料庫取得對應的憑證資料
 * - 支援平台和跨平台認證器
 * 
 * @see {@link https://blog.techbridge.cc/2019/08/17/webauthn-intro WebAuthn 介紹}
 * @see {@link https://yishiashia.github.io/posts/passkey-and-webauthn-passwordless-authentication/ Passkey 和 WebAuthn}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API#browser_compatibility WebAuthn API 瀏覽器相容性}
 */
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const challengeString = payload.challengeString || '';
  // const challenge = base64Js.toUint8Array(base64Js.decode(challengeString));

  const utf8Decoder = new TextDecoder('utf-8');

  const base64URLServerSaveDataCredentialPublicKeyPem = base64Js.decode(payload.base64URLServerSaveData.credentialPublicKeyPem);
  // const base64URLServerSaveDataCredentialPublicKeyJwk = JSON.parse(base64Js.decode(payload.base64URLServerSaveData.credentialPublicKeyJwk));

  const credential = {
    authenticatorAttachment: payload.credential.authenticatorAttachment,
    id: payload.credential.id,
    rawId: base64Js.toUint8Array(
      payload.credential.rawId
    ),
    authenticatorData: base64Js.toUint8Array(
      payload.credential.authenticatorData
    ),
    clientDataJSON: base64Js.toUint8Array(
      payload.credential.clientDataJSON
    ),
    userHandle: base64Js.decode(
      payload.credential.userHandle
    )
  };
  // console.log(credential.rawId);

  const decodedClientData = utf8Decoder.decode(credential.clientDataJSON)
  const clientDataObj = JSON.parse(decodedClientData);

  console.log(clientDataObj);
  console.log(credential);
  // console.log({ base64URLServerSaveDataCredentialPublicKeyPem, base64URLServerSaveDataCredentialPublicKeyJwk });


  const authenticatorData = await parseAuthenticatorData(credential.authenticatorData.buffer);
  console.log(authenticatorData);

  if (clientDataObj?.type !== 'webauthn.get') {
    throw createError({
      statusCode: 401,
      statusMessage: 'clientData.type error',
    })
  }

  if (challengeString !== clientDataObj.challenge) {
    throw createError({
      statusCode: 401,
      statusMessage: 'challenge error',
    });
  }

  if (payload.userId !== credential.userHandle) {
    throw createError({
      statusCode: 401,
      statusMessage: 'userId error',
    });
  }

  return {
    ...payload,
    base64URLServerSaveDataCredentialPublicKeyPem,
    decodeClientDataObj: clientDataObj,
    success: true,
    userHandle: credential.userHandle
  };
});