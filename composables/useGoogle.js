export function useGoogle(_config = {}) {
  const config = typeof _config === 'function' ? _config() : _config;
  const {
    beforInit = () => {},
    init = () => {},
    disabled,
    getDisabled = () => {},
    mapInit
  } = config;
  const runtimeConfig = useRuntimeConfig();
  const GOOGLE_API_KEY = runtimeConfig.public.GOOGLE_API_KEY;

  const google = useState('__google', () => ({
    api: null,
    init: null
  }));

  onBeforeMount(async () => {
    await beforInit();
    google.value.init = initGoogleApi;
    if (document.querySelector('#googleOAuth') === null) {
      const script = document.createElement('script');
      script.id = 'googleOAuth';
      script.src = 'https://accounts.google.com/gsi/client';
      document.head.append(script);
    }
    if (
      document.querySelector('#googleMap') === null &&
      typeof GOOGLE_API_KEY === 'string' &&
      GOOGLE_API_KEY !== ''
    ) {
      const script = document.createElement('script');
      script.id = 'googleMap';
      let src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        GOOGLE_API_KEY +
        '&libraries=places,drawing,geometry&v=weekly';
      if (typeof mapInit === 'string' && mapInit !== '') {
        src += `&callback=${mapInit}`;
      }
      script.src = src;
      document.head.append(script);
    }
  });
  onMounted(() => {
    const _disabled = disabled || getDisabled();
    initGoogleApi(_disabled);
  });
  function initGoogleApi(_disabled) {
    if (_disabled === true) return;

    if (
      typeof window.google === 'undefined' ||
      (typeof window.google?.maps === 'undefined' &&
        typeof GOOGLE_API_KEY === 'string' &&
        GOOGLE_API_KEY !== '')
    ) {
      return setTimeout(() => initGoogleApi(_disabled), 100);
    }
    google.value.api = window.google;
    init(window.google);
  }

  return google;
}