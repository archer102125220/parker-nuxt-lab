import { Base64 as base64Js } from 'js-base64';

export default defineEventHandler((event) => {
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  // console.log({ challenge }, challenge.toLocaleString());

  return base64Js.fromUint8Array(challenge, true);
});