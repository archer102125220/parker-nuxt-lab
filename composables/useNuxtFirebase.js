export function useNuxtFirebase() {
  const nuxtApp = useNuxtApp();

  const Firebase = useState('gtm_Firebase', () => {
    return nuxtApp.$Firebase || null;
  });

  console.log({ Firebase });

  return Firebase;
}

export default useNuxtFirebase;