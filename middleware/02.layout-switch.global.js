const LAYOUT_SETTING = [
  { name: 'index', layout: 'home' },
  { name: 'home', layout: 'home' },
  { path: '/css-drawing/triangle-full-test', layout: 'full-screen' },
  { path: '/css-drawing/triangle-full-test', layout: 'full-screen' }
];

export default defineNuxtRouteMiddleware((to) => {
  const getRouteBaseName = useRouteBaseName();
  const getLocalePath = useLocalePath();

  const newLayoutName = LAYOUT_SETTING.find(
    ({ path, exact, name }) => {
      const toHrefLocalePath = typeof path === 'string' && path !== '' ? getLocalePath(path) : undefined;
      // console.log({ toHrefLocalePath });

      return (exact === true
        ? toHrefLocalePath === to.href
        : to.href?.includes(toHrefLocalePath)) ||
        getRouteBaseName(to) === name
    }
  )?.layout;

  setPageLayout(typeof newLayoutName === 'string'
    ? newLayoutName
    : 'default');
})