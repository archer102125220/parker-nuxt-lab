const LAYOUT_SETTING = [
    { name: 'index', layout: 'home' },
    { name: 'home', layout: 'home' },
    // { name: 'swagger-doc', layout: false },
    { path: '/css-drawing/triangle-full-test', layout: 'full-screen' },
    { name: 'krpano-demo', layout: 'immersive' }
  ];

  export default defineNuxtRouteMiddleware((to) => {
    const getRouteBaseName = useRouteBaseName();
    const getLocalePath = useLocalePath();

    const newLayoutName = LAYOUT_SETTING.find(({ path, exact, name }) => {
      const toHrefLocalePath =
        typeof path === 'string' && path !== '' ? getLocalePath(path) : undefined;
      // const toHrefLocalePath = typeof path === 'string' && path !== '' ? path : undefined;
      // console.log({ toHrefLocalePath, to, ['getRouteBaseName(to)']: getRouteBaseName(to) });

      return (
        (exact === true
          ? toHrefLocalePath === to.href
          : to.href?.includes(toHrefLocalePath)) || getRouteBaseName(to) === name
      );
      // to.name === name
    })?.layout;

    setPageLayout(
      typeof newLayoutName === 'string' || newLayoutName === false
        ? newLayoutName
        : 'default'
    );
  });
