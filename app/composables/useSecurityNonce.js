const NONCE_STATE_KEY = '__securityNonce';

export function useSecurityNonce(nonceStateKey = NONCE_STATE_KEY) {
  const nonceValue = useState(nonceStateKey, () => null);

  if (import.meta.server) {
    const event = useRequestEvent();

    console.log(event?.context?.security?.nonce);
    console.log(event?.node?.res?.locals?.nonce);
    console.log(event?.context?.security?.nonce || event?.node?.res?.locals?.nonce);

    nonceValue.value = event?.context?.security?.nonce || event?.node?.res?.locals?.nonce || null;
  }

  console.log(nonceValue.value);

  return nonceValue;
}

export default useSecurityNonce;