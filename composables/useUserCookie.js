export function useUserCookie(cookieKeyList = ['token', 'TTL', 'uuid', 'expires_in']) {
  const userCookie = {};

  cookieKeyList.forEach((cookieKey) => {
    userCookie[cookieKey] = useCookie(cookieKey).value;
  });

  return useState('_userCookie', () => userCookie);
}