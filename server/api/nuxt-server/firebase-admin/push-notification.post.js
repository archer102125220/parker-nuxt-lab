import firebaseAdmin from 'firebase-admin';

import {
  sequelizeFindAllToken
} from '@/services/server/firebase-admin';
import {
  getFirebaseAdminApp,
  getAndroidFirebaseAdminApp,
  getIosFirebaseAdminApp
} from '@/utils/helpers/firebase-admin';

export default defineEventHandler(async function pushMessage(event) {
  const body = await readBody(event);

  if (body.data === undefined || body.data === null) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing parameter: data',
    });
  } else if (Array.isArray(body.token) === false || body.token.length <= 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing parameter: token',
    });
  }
  const tokens = await sequelizeFindAllToken();

  const webTokens = tokens
    .filter(({ os }) => os === 'web')
    .map(({ token }) => token);
  const androidTokens = tokens
    .filter(({ os }) => os === 'android')
    .map(({ token }) => token);
  const iosTokens = tokens
    .filter(({ os }) => os === 'ios')
    .map(({ token }) => token);
  // console.log(body.data, { webTokens, androidTokens, iosTokens });

  const firebaseAdminApp = getFirebaseAdminApp();
  const androidFirebaseAdminApp = getAndroidFirebaseAdminApp();
  const iosFirebaseAdminApp = getIosFirebaseAdminApp();

  const promiseArray = [];

  if (webTokens.length > 0) {
    promiseArray.push(
      firebaseAdmin.messaging(firebaseAdminApp).sendEachForMulticast({
        data: { msg: body.data, title: body.title, img: body.img },
        tokens: webTokens
      })
    );
  }
  if (androidTokens.length > 0) {
    promiseArray.push(
      firebaseAdmin.messaging(androidFirebaseAdminApp).sendEachForMulticast({
        data: { msg: body.data, title: body.title, img: body.img },
        tokens: androidTokens
      })
    );
  }
  if (iosTokens.length > 0) {
    promiseArray.push(
      firebaseAdmin.messaging(iosFirebaseAdminApp).sendEachForMulticast({
        data: { msg: body.data, title: body.title, img: body.img },
        tokens: iosTokens
      })
    );
  }

  const responseArray = await Promise.all(promiseArray);

  const response = { failureCount: 0, successCount: 0, responses: [] };
  responseArray.forEach(_response => {
    response.failureCount += _response.failureCount;
    response.successCount += _response.successCount;
    const responses = [...response.responses];
    response.responses = responses.concat(_response.responses);
  });

  return response;
});
