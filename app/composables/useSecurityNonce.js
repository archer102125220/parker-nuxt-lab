const NONCE_STATE_KEY = '__securityNonce';

export function useSecurityNonce(nonceStateKey = NONCE_STATE_KEY) {
  const nonceValue = useState(nonceStateKey, () => null);

  if (import.meta.server) {
    const event = useRequestEvent();

    nonceValue.value = event?.context?.security?.nonce || event?.node?.res?.locals?.nonce || null;
  }

  return nonceValue;
}

export default useSecurityNonce;