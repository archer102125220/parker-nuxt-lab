import {
  messagingRemoveToken
} from '@/services/server/firebase-admin';
import { cancelTokens } from '@/utils/helpers/firebase-admin';

export default defineEventHandler(async function cancelMessageToken(event) {
  const query = getQuery(event);

  const { token } = query;
  cancelTokens(token);
  const response = await messagingRemoveToken(token);
  console.log(response);

  return { success: true, token };
});
