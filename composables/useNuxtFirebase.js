export function useNuxtFirebase() {
  const nuxtApp = useNuxtApp();

  const Firebase = useState('Firebase_nuxt', () => {
    return nuxtApp.$Firebase || null;
  });

  console.log({ Firebase });

  return Firebase;
}

export default useNuxtFirebase;