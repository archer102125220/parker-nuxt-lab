export function useNuxtGtm() {
  const nuxtApp = useNuxtApp();

  const gtm = useState('gtm_nuxt', () => {
    if (import.meta.server === true) return null;
    return nuxtApp.$gtm || null;
  });

  // console.log({ gtm });

  return gtm;
}

export default useNuxtGtm;