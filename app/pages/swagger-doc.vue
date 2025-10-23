<template>
  <main ref="swaggerUI" />
</template>

<script setup>
const swaggerUI = useTemplateRef('swaggerUI');

// https://www.npmjs.com/package/swagger-ui-dist
// https://github.com/nuxt/nuxt/discussions/16165
onMounted(async () => {
  const { SwaggerUIBundle, SwaggerUIStandalonePreset } = await import(
    'swagger-ui-dist'
  );

  const ui = SwaggerUIBundle({
    url: `${import.meta.env.VITE_DOMAIN}/api/nuxt-server/swagger-docs`,
    domNode: swaggerUI.value,
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: 'StandaloneLayout'
  });
  window.ui = ui;
});
</script>

<style lang="scss">
@import 'swagger-ui-dist/swagger-ui.css';
</style>
