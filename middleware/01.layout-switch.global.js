const LAYOUT_SETTING = [
  { name: 'index', layout: 'index' },
  { path: '/css-drawing/triangle-full-test', layout: 'full-screen' },
  { path: '/css-drawing/triangle-full-test', layout: 'full-screen' }
];

export default defineNuxtRouteMiddleware((to) => {
  const getRouteBaseName = useRouteBaseName();

  const newLayoutName = LAYOUT_SETTING.find(
    ({ path, exact, name }) =>
      (exact === true
        ? path === to.href
        : to.href?.includes(path)) ||
      getRouteBaseName(to) === name
  )?.layout;

  setPageLayout(typeof newLayoutName === 'string'
    ? newLayoutName
    : 'default');
})