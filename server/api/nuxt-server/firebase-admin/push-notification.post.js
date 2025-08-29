import firebaseAdmin from 'firebase-admin';

import {
  messagingFindAllToken
} from '@/services/server/firebase-messaging';

export default defineEventHandler(async function pushMessage(event) {
  const body = await readBody(event);

  console.log('Push Notification Body:', body);

  if (body.data === undefined || body.data === null) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing parameter: data',
    });
  }

  const [webTokens, androidTokens, iosTokens] = await Promise.all([
    messagingFindAllToken({ os: 'web' }),
    messagingFindAllToken({ os: 'android' }),
    messagingFindAllToken({ os: 'ios' })
  ]);
  // console.log(body.data, { webTokens, androidTokens, iosTokens });

  const firebaseAdminApp = event.context.$firebaseAdminApp;
  const androidFirebaseAdminApp = event.context.$androidFirebaseAdminApp;
  const iosFirebaseAdminApp = event.context.$iosFirebaseAdminApp;
  console.log({ firebaseAdminApp, androidFirebaseAdminApp, iosFirebaseAdminApp });

  const promiseArray = [];

  if (webTokens.length > 0) {
    promiseArray.push(
      firebaseAdmin.messaging(firebaseAdminApp).sendEachForMulticast({
        data: { msg: body.data, title: body.title, img: body.img },
        tokens: webTokens
      }).catch((error) => console.error('Error sending message to web tokens:', error))
    );
  }
  if (androidTokens.length > 0) {
    promiseArray.push(
      firebaseAdmin.messaging(androidFirebaseAdminApp).sendEachForMulticast({
        data: { msg: body.data, title: body.title, img: body.img },
        tokens: androidTokens
      }).catch((error) => console.error('Error sending message to android tokens:', error))
    );
  }
  if (iosTokens.length > 0) {
    promiseArray.push(
      firebaseAdmin.messaging(iosFirebaseAdminApp).sendEachForMulticast({
        data: { msg: body.data, title: body.title, img: body.img },
        tokens: iosTokens
      }).catch((error) => console.error('Error sending message to ios tokens:', error))
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
