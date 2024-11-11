import { Base64 as base64Js } from 'js-base64';

import { getFido2Lib } from '@/utils/fido2-lib';

export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  // f2l.assertionResult 取得登入資訊登入

  return {
    ...payload,
    // base64URLServerSaveDataCredentialPublicKeyPem,
    // decodeClientDataObj: clientDataObj,
    // success: true,
    // userHandle: credential.userHandle
  };
});