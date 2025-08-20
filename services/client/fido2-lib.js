const prefix = '/nuxt-server/fido2-lib';

export function GET_fido2LibGenerateOption(payload) {
  const { $request } = useNuxtApp();

  return $request.get(`${prefix}/generate-option`, payload);
}

export function POST_fido2LibRegistration(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/registration`, payload);
}

export function POST_fido2LibVerify(payload) {
  const { $request } = useNuxtApp();

  return $request.post(`${prefix}/verify`, payload);
}