import { Base64 as base64Js } from 'js-base64';
import { Fido2Lib } from 'fido2-lib';

// import { getFido2Lib, reNewFido2Lib } from '@/utils/fido2-lib';

// https://webauthn-open-source.github.io/fido2-lib/index.html

export default defineEventHandler(async (event) => {
  const payload = await readBody(event);

  // console.log(payload.credential);

  // const f2l = getFido2Lib();
  // const f2l = reNewFido2Lib();
  const f2l = new Fido2Lib({
    timeout: 60000,
    // rpId: "example.com",
    rpId: process.env.NODE_ENV === 'development' ? 'localhost' : 'nuxt-lab.vercel.app',
    rpName: "Nuxt Lab",
    // rpIcon: "https://example.com/logo.png",
    challengeSize: 128,
    attestation: "direct",
    cryptoParams: [-7, -257],
    // authenticatorAttachment: "platform",
    // authenticatorRequireResidentKey: false,
    // authenticatorUserVerification: "required"
  });

  const signature = base64Js.toUint8Array(payload.credential.response.signature).buffer

  const utf8Decoder = new TextDecoder('utf-8');
  const decodedClientData = utf8Decoder.decode(base64Js.toUint8Array(
    payload.credential.response.clientDataJSON
  ));
  const clientDataObj = JSON.parse(decodedClientData);
  // https://webauthn-open-source.github.io/fido2-lib/Fido2Lib.html#assertionOptions
  clientDataObj.factor = 'second';
  clientDataObj.publicKey = base64Js.decode(payload.base64URLServerSaveData.credentialPublicKeyPem);
  // clientDataObj.prevCounter = signature.byteLength;
  // clientDataObj.prevCounter = 0;
  clientDataObj.prevCounter = payload.base64URLServerSaveData.counter;
  clientDataObj.userHandle = base64Js.toUint8Array(payload.userId);
  console.log({ clientDataObj });

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
  }, clientDataObj);
  console.log({ assertionResult });

  // 無回傳值，無效直接拋出例外
  await assertionResult.validate();

  // 驗證沒問題後，比對資料庫內的使用者資訊及金鑰資訊，大多還是ArrayBuffer型別，因此需要還原為字串或者json物件

  return {
    ...payload,
    assertionResult
    // base64URLServerSaveDataCredentialPublicKeyPem,
    // decodeClientDataObj: clientDataObj,
    // success: true,
    // userHandle: credential.userHandle
  };
});