import {
  sequelizeFindAllToken
} from '@/services/server/firebase-admin';

export default defineEventHandler(async function getMessageTokens(event) {
  // const tokens = getTokens();
  const tokens = await sequelizeFindAllToken();

  return tokens;
});
