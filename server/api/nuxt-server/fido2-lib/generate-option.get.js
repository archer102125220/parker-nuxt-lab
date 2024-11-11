import { Base64 as base64Js } from 'js-base64';
import { Fido2Lib } from 'fido2-lib';

// import { fido2LibInitialize, getFido2Lib, fido2LibIsInitialized } from '@/utils/fido2-lib';

// https://webauthn-open-source.github.io/fido2-lib/index.html

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const user = {
    id: query.userId,
    name: query.userName,
    displayName: query.userDisplayName
  }

  const f2l = new Fido2Lib({
    timeout: 60000,
    // rpId: "example.com",
    rpName: "Nuxt Lab",
    // rpIcon: "https://example.com/logo.png",
    challengeSize: 128,
    attestation: "direct",
    cryptoParams: [-7, -257],
    // authenticatorAttachment: "platform",
    // authenticatorRequireResidentKey: false,
    // authenticatorUserVerification: "required"
  });

  const publicKeyCredentialCreationOptions = await f2l.attestationOptions();

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

  return {
    ...publicKeyCredentialCreationOptions,
    challenge: base64Js.fromUint8Array(publicKeyCredentialCreationOptions.challenge, true),
    user
  };
});