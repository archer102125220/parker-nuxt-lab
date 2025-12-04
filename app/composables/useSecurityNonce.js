const NONCE_STATE_KEY = '__securityNonce';

export function useSecurityNonce(nonceStateKey = NONCE_STATE_KEY) {
  const nonceValue = useState(nonceStateKey, () => null);
  const defaultNonceValue = useState(NONCE_STATE_KEY, () => null);

  if (import.meta.server) {
    const event = useRequestEvent();

    defaultNonceValue.value = event?.context?.security?.nonce || event?.node?.res?.locals?.nonce || defaultNonceValue.value || null;
    nonceValue.value = event?.context?.security?.nonce || event?.node?.res?.locals?.nonce || nonceValue.value || defaultNonceValue.value || null;
  }

  return nonceValue || defaultNonceValue;
}

export default useSecurityNonce;