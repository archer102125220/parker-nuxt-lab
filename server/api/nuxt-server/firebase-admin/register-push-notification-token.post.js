import {
  sequelizeAddToken
} from '@/services/server/firebase-admin';


export default defineEventHandler(async function registerMessageToken(event) {
  const body = await readBody(event);

  // registerTokens(body.token);
  await sequelizeAddToken(body);

  return { success: true, token: body.token };
});
