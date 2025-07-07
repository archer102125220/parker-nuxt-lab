export function useNuxtGtm() {
  if (import.meta.server === true) return null;
  const nuxtApp = useNuxtApp();

  const gtm = useState('gtm_nuxt', () => {
    return nuxtApp.$gtm || null;
  });

  console.log({ gtm });

  return gtm;
}

export default useNuxtGtm;