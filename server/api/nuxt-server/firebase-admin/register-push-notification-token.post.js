import {
  messagingAddToken
} from '@/services/server/firebase-messaging';


export default defineEventHandler(async function registerMessageToken(event) {
  const body = await readBody(event);

  console.log({ body });
  await messagingAddToken({ token: body.token, os: body.os });

  return { success: true, token: body.token };
});
