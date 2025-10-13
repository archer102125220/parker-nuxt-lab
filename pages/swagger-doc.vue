<template>
  <div id="swagger-ui" />
</template>

<script setup>
// https://github.com/nuxt/nuxt/discussions/16165
useHead({
  script: [
    {
      type: 'text/javascript',
      src: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui-bundle.min.js',
      async: true
    },
    {
      type: 'text/javascript',
      src: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui-standalone-preset.min.js',
      async: true
    }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui.min.css'
    }
  ]
});
if (import.meta.client) {
  const ui = SwaggerUIBundle({
    url: `${import.meta.env.VITE_DOMAIN}/api/nuxt-server/swagger-docs`,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: 'StandaloneLayout'
  });
  window.ui = ui;
}
</script>
