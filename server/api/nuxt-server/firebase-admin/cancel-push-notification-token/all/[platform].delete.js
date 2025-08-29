import {
  messagingRemoveToken,
  messagingFindAllToken
} from '@/services/server/firebase-messaging';

export default defineEventHandler(async function cancelMessageToken(event) {
  const { platform } = event.context.params;

  const tokens = await messagingFindAllToken({ os: platform });
  for (let i = 0; i < tokens.length; i++) {
    const { os, token } = tokens[i];
    if (os === platform) {
      const response = await messagingRemoveToken(token);
      console.log({ ...response, platform });
    }
  }

  return { success: true, platform };
});
