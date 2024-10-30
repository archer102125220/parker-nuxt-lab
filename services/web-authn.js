const prefix = '/nuxt-server/web-authn';

export function GET_webAuthnGenerateChallenge(payload) {
  const { $request } = useNuxtApp();

  return $request.get(`${prefix}/generate-challenge`, payload);
}

export function POST_webAuthnRegistration(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/registration`, payload);
}

export function POST_webAuthnVerify(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/verify`, payload);
}