import {
  messagingRemoveToken
} from '@/services/server/firebase-admin';
import { cancelTokens } from '@/utils/helpers/firebase-admin';

export default defineEventHandler(async function cancelMessageToken(event) {
  const { token } = event.context.params;

  cancelTokens(token);
  const response = await messagingRemoveToken(token);
  console.log(response);

  return { success: true, token };
});
