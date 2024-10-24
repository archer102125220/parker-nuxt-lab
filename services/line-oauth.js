export function POST_lineOauthVerify(payload) {
  const { $request } = useNuxtApp();

  return $request.post('/line-oauth-verify', payload);
}