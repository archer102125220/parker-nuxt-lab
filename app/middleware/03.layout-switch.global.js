const LAYOUT_SETTING = [
    { name: 'index', layout: 'home' },
    { name: 'home', layout: 'home' },
    // { name: 'swagger-doc', layout: false },
    { path: '/css-drawing/triangle-full-test', layout: 'full-screen' },
    { name: 'virtual-reality-krpano-demo', layout: 'immersive' }
  ];

  export default defineNuxtRouteMiddleware((to) => {
    const getRouteBaseName = useRouteBaseName();
    const getLocalePath = useLocalePath();

    const routeBaseName = getRouteBaseName(to);

    const newLayoutName = LAYOUT_SETTING.find(({ path, exact, name }) => {
      const toHrefLocalePath =
        typeof path === 'string' && path !== '' ? getLocalePath(path) : undefined;
      // const toHrefLocalePath = typeof path === 'string' && path !== '' ? path : undefined;
      // console.log({ toHrefLocalePath, to, routeBaseName });

      return (
        (exact === true
          ? toHrefLocalePath === to.href
          : to.href?.includes(toHrefLocalePath)) || routeBaseName === name
      );
      // to.name === name
    })?.layout;

    setPageLayout(
      typeof newLayoutName === 'string' || newLayoutName === false
        ? newLayoutName
        : 'default'
    );
  });
