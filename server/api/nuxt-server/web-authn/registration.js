import { Base64 as base64Js } from 'js-base64';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const challengeString = body.challengeString || '';
  const challenge = Uint8Array.from(challengeString.split?.(','));

  const credentials = {
    authenticatorAttachment: body.credentials.authenticatorAttachment,
    id: body.credentials.id,
    rawId: base64Js.decode(body.credentials.rawId),
    // response: {
    //   attestationObject: body.credentials.response.attestationObject,
    //   clientDataJSON: body.credentials.response.clientDataJSON
    // },
    attestationObject: base64Js.decode(
      body.credentials.attestationObject
    ),
    clientDataJSON: base64Js.decode(body.credentials.clientDataJSON)
  }
  const attestationObject = credentials.attestationObject;
  const clientDataJSON = credentials.clientDataJSON;

  console.log(attestationObject, clientDataJSON);
  console.log({ body, challenge, credentials, attestationObject, clientDataJSON });

  return body;
});