import {
  messagingRemoveToken,
  messagingFindAllToken
} from '@/services/server/firebase-admin';

export default defineEventHandler(async function cancelMessageToken(event) {
  const query = getQuery(event);

  const { platform } = query;
  const tokens = await messagingFindAllToken();
  for (let i = 0; i < tokens.length; i++) {
    const { os, token } = tokens[i];
    if (os === platform) {
      const response = await messagingRemoveToken(token);
      console.log({ ...response, platform });
    }
  }

  return { success: true, platform };
});
