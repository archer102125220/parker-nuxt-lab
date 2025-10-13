import { Base64 as base64Js } from 'js-base64';
import { Fido2Lib } from 'fido2-lib';

// https://webauthn-open-source.github.io/fido2-lib/index.html

// 前端透過 POST_fido2LibVerify 呼叫這隻http post的api
/**
 * FIDO2 憑證驗證 API
 * 
 * 驗證 FIDO2/WebAuthn 登入請求
 * 使用已儲存的憑證資料驗證使用者的身份
 * 
 * @api {POST} /api/nuxt-server/fido2-lib/verify FIDO2 憑證驗證
 * @apiGroup FIDO2
 * @apiName Fido2Verify
 * 
 * @apiBody {String} challengeString 挑戰字串
 * @apiBody {Object} credential WebAuthn 憑證物件
 * @apiBody {String} credential.id 憑證 ID
 * @apiBody {String} credential.rawId Base64URL 編碼的原始憑證 ID
 * @apiBody {String} credential.type 憑證類型
 * @apiBody {Object} credential.response 憑證回應物件
 * @apiBody {String} credential.response.authenticatorData Base64URL 編碼的認證器資料
 * @apiBody {String} credential.response.clientDataJSON Base64URL 編碼的客戶端資料
 * @apiBody {String} credential.response.signature Base64URL 編碼的簽章
 * @apiBody {String} credential.response.userHandle Base64URL 編碼的使用者控制代碼
 * @apiBody {Object} base64URLServerSaveData 伺服器儲存的憑證資料
 * @apiBody {String} base64URLServerSaveData.credentialPublicKeyPem PEM 格式的公鑰
 * @apiBody {String} base64URLServerSaveData.userId 使用者 ID
 * @apiBody {Number} base64URLServerSaveData.counter 計數器值
 * 
 * @apiSuccess {Object} data 驗證結果物件
 * @apiSuccess {String} data.credential.id 憑證 ID
 * @apiBody {Object} data.assertionResult 斷言結果物件
 * 
 * @apiError {Object} error 驗證失敗時的錯誤資訊
 * @apiError {Number} error.statusCode=401 HTTP 狀態碼
 * @apiError {String} error.statusMessage 錯誤訊息
 * 
 * @example
 * // 請求範例
 * POST /api/nuxt-server/fido2-lib/verify
 * Content-Type: application/json
 * {
 *   "challengeString": "base64url_challenge",
 *   "credential": {
 *     "id": "credential_id",
 *     "rawId": "base64url_raw_id",
 *     "type": "public-key",
 *     "response": {
 *       "authenticatorData": "base64url_authenticator_data",
 *       "clientDataJSON": "base64url_client_data",
 *       "signature": "base64url_signature",
 *       "userHandle": "base64url_user_handle"
 *     }
 *   },
 *   "base64URLServerSaveData": {
 *     "credentialPublicKeyPem": "pem_encoded_public_key",
 *     "userId": "user123",
 *     "counter": 1
 *   }
 * }
 * 
 * @example
 * // 成功回應範例
 * {
 *   "credential": { ... },
 *   "assertionResult": { ... }
 * }
 * 
 * @description
 * 此 API 處理 FIDO2/WebAuthn 登入驗證流程：
 * 
 * 1. 驗證憑證資料的完整性和有效性
 * 2. 使用伺服器儲存的公鑰驗證簽章
 * 3. 驗證挑戰值是否正確
 * 4. 檢查計數器值防止重放攻擊
 * 5. 驗證使用者控制代碼
 * 
 * 重要注意事項：
 * - 需要從資料庫取得對應的憑證資料 (base64URLServerSaveData)
 * - 驗證成功後應更新計數器值
 * - 支援跨平台和平台認證器
 * 
 * @see {@link https://webauthn-open-source.github.io/fido2-lib/index.html FIDO2-Lib 文檔}
 */
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const challengeString = payload.challengeString || '';

  const f2l = new Fido2Lib({
    timeout: 60000,
    // rpId: "example.com",
    rpId: process.env.NODE_ENV === 'development' ? 'localhost' : 'parker-nuxt-lab.vercel.app',
    rpName: "Nuxt Lab",
    // rpIcon: "https://example.com/logo.png",
    challengeSize: 128,
    attestation: "direct",
    cryptoParams: [-7, -257],
    // authenticatorAttachment: "platform",
    // authenticatorRequireResidentKey: false,
    // authenticatorUserVerification: "required"
  });

  const signature = base64Js.toUint8Array(payload.credential.response.signature).buffer;

  // 驗證用物件，大多數資料由後端寫死或透過env做設定，其餘公鑰及使用者資訊需由資料庫取出，使用者資訊需轉成Uint8Array後再帶入
  // type登入時固定為webauthn.get
  const expected = {
    type: 'webauthn.get',
    origin: process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : 'https://parker-nuxt-lab.vercel.app',
    // https://webauthn-open-source.github.io/fido2-lib/Fido2Lib.html#assertionResult
    factor: 'second',
    challenge: challengeString,
    publicKey: base64Js.decode(payload.base64URLServerSaveData.credentialPublicKeyPem),
    // prevCounter: signature.byteLength,
    // prevCounter: 0,
    prevCounter: payload.base64URLServerSaveData.counter,
    userHandle: base64Js.toUint8Array(payload.base64URLServerSaveData.userId)
  };
  console.log({ expected });

  let output = {
    ...payload,
  }
  try {
    const assertionResult = await f2l.assertionResult({
      ...payload.credential,
      rawId: base64Js.toUint8Array(payload.credential.rawId).buffer,
      response: {
        ...payload.credential.response,
        authenticatorData: base64Js.toUint8Array(payload.credential.response.authenticatorData).buffer,
        clientDataJSON: base64Js.toUint8Array(payload.credential.response.clientDataJSON).buffer,
        signature,
        userHandle: base64Js.toUint8Array(payload.credential.response.userHandle).buffer,
      }
    }, expected);
    console.log({ assertionResult });

    // 可執行可不執行，建立assertionResult實例時會一並檢查是否正確，無回傳值，無效直接拋出例外
    // await assertionResult.validate();

    output = {
      ...output,
      assertionResult
      // base64URLServerSaveDataCredentialPublicKeyPem,
      // decodeClientDataObj: clientDataObj,
      // success: true,
      // userHandle: credential.userHandle
    }
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 401,
      statusMessage: error.message,
    });
  }

  return output;
});