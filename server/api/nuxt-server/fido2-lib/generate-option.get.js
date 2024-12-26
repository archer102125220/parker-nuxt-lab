import { Base64 as base64Js } from 'js-base64';
import { Fido2Lib } from 'fido2-lib';

// import { fido2LibInitialize, getFido2Lib, fido2LibIsInitialized } from '@/utils/fido2-lib';

// https://webauthn-open-source.github.io/fido2-lib/index.html

// 前端透過 GET_fido2LibGenerateOption 呼叫這隻http get的api
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const f2l = new Fido2Lib({
    timeout: 60000,
    rpId: process.env.NODE_ENV === 'development' ? 'localhost' : 'nuxt-lab.vercel.app',
    rpName: "Nuxt Lab",
    // rpIcon: "https://example.com/logo.png",
    challengeSize: 128,
    attestation: "direct",
    cryptoParams: [-7, -257],
    authenticatorRequireResidentKey: true,
    // authenticatorAttachment: "platform",
    // authenticatorRequireResidentKey: false,
    // authenticatorUserVerification: "required"
  });

  let output;
  if (query?.isLogin === true) {
    // query?.credentialId 檢查資料庫裡使否存在，想不到模擬的方法
    const publicKeyCredentialCreationOptions = await f2l.assertionOptions();
    output = {
      ...publicKeyCredentialCreationOptions,
      challenge: base64Js.fromUint8Array(publicKeyCredentialCreationOptions.challenge, true),
    };
  } else {
    // let publicKeyCredentialCreationOptions = {};
    // if (fido2LibIsInitialized() === false) {
    //   const f2l = fido2LibInitialize({
    //     timeout: 60000,
    //     // rpId: "example.com",
    //     rpName: "Nuxt Lab",
    //     // rpIcon: "https://example.com/logo.png",
    //     challengeSize: 128,
    //     attestation: "direct",
    //     cryptoParams: [-7, -257],
    //     // authenticatorAttachment: "platform",
    //     // authenticatorRequireResidentKey: false,
    //     // authenticatorUserVerification: "required"
    //   });
    //   publicKeyCredentialCreationOptions = await f2l.attestationOptions();
    // } else {
    //   const f2l = getFido2Lib();
    //   publicKeyCredentialCreationOptions = await f2l.attestationOptions();
    // }

    const publicKeyCredentialCreationOptions = await f2l.attestationOptions();
    output = {
      ...publicKeyCredentialCreationOptions,
      challenge: base64Js.fromUint8Array(publicKeyCredentialCreationOptions.challenge, true),
      user: {
        id: query.userId,
        name: query.userName,
        displayName: query.userDisplayName
      }
    };
  }


  return output;
});