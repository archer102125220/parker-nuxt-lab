import { decode, encode } from 'cbor-x';
import { Base64 as base64Js } from 'js-base64';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const challengeString = body.challengeString || '';
  const challenge = base64Js.toUint8Array(base64Js.decode(challengeString));


  const credential = {
    authenticatorAttachment: body.credential.authenticatorAttachment,
    id: body.credential.id,
    rawId: base64Js.toUint8Array(
      body.credential.rawId
    ),
    clientDataJSON: base64Js.toUint8Array(
      body.credential.clientDataJSON
    ),
    userHandle: base64Js.decode(
      body.credential.userHandle
    )
  };
  // console.log(credential.rawId);

  const utf8Decoder = new TextDecoder('utf-8');
  const decodedClientData = utf8Decoder.decode(credential.clientDataJSON)
  const clientDataObj = JSON.parse(decodedClientData);

  console.log(clientDataObj);

  if (clientDataObj?.type !== 'webauthn.get') {
    throw createError({
      statusCode: 401,
      statusMessage: 'clientData.type error',
    })
  }

  return {
    ...body,
    decodeClientDataObj: clientDataObj,
    success: base64Js.fromUint8Array(challenge, true) === clientDataObj.challenge,
  };
});