export function useFacebook(initFn = () => { }) {
  const runtimeConfig = useRuntimeConfig();
  const APP_ID = runtimeConfig.public.FACEBOOK_APP_ID;
  const API_VERSION = runtimeConfig.public.FACEBOOK_API_VERSION;

  const facebook = useState('__facebook', () => null);

  onBeforeMount(() => {
    if (document.querySelector('#facebookOAuth') === null) {
      window.fbAsyncInit = function (...arg) {
        facebook.value = window.FB;
        window.FB.init({
          appId: APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: API_VERSION
        });
        window.FB.AppEvents.logPageView();
        initFn(window.FB, ...arg);

        // window.FB.getLoginStatus(function (response) {
        //   // console.log(response);
        //   if (response.status === 'connected') {
        //     handleGetData(response);
        //   }
        // }, true);
        // window.FB.logout();
      };
      const script = document.createElement('script');
      script.id = 'facebookOAuth';
      script.src = 'https://connect.facebook.net/zh_TW/sdk.js';
      script.crossorigin = 'anonymous';
      script.setAttribute('crossorigin', 'anonymous');
      document.head.append(script);
    } else if (typeof window.FB === 'object') {
      facebook.value = window.FB;
    }
  });

  return facebook;
}