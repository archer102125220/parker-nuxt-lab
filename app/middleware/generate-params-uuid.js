import { v4 as uuidv4 } from 'uuid';

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('generate-params-uuid.js', to, from);

  if (typeof to.params.uuId === 'string' && to.params.uuId !== '') return;

  return navigateTo(`${to.path}/${uuidv4()}`.replaceAll('//', '/'));
});
