import {
  messagingRemoveToken
} from '@/services/server/firebase-admin';

export default defineEventHandler(async function cancelMessageToken(event) {
  const { token } = event.context.params;

  const response = await messagingRemoveToken(token);
  console.log(response);

  return { success: true, token };
});
