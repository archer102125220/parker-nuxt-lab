const prefix = '/nuxt-server/firebase-admin';

export function GET_getMessageTokens() {
  const { $request } = useNuxtApp();

  return $request.get(`${prefix}/get-push-notification-tokens`);
}

export function POST_registerMessageToken(payload) {
  const { $request } = useNuxtApp();

  return $request.post(
    `${prefix}/register-push-notification-token`,
    payload
  );
}

export function POST_pushNotification(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/push-notification`, payload);
}

export function DELETE_cancelMessageToken(payload) {
  const { $request } = useNuxtApp();

  return $request.delete(
    `${prefix}/cancel-push-notification-token/${payload}`
  );
}

export function DELETE_cancelAllMessageToken(payload) {
  const { $request } = useNuxtApp();

  return $request.delete(
    `${prefix}/cancel-push-notification-token/all/${payload}`
  );
}

export function POST_androidPushNotification(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/android-push-notification`, payload);
}

export function POST_iosPushNotification(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/ios-push-notification`, payload);
}

export function POST_webPushMessage(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/web-push-notification`, payload);
}
