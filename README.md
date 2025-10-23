# Parker Nuxt Lab

[繁體中文說明](./README.zh-TW.md)

An experimental Nuxt 4 project that integrates PWA, i18n, Pinia, Vuetify, Socket.IO, WebRTC, Firebase Cloud Messaging, Swagger, and Sequelize (PostgreSQL). It serves as a sandbox to quickly validate features and showcase example pages.

- **Framework**: Nuxt 4 (Vue 3.5.8)
- **UI**: Vuetify 3.6
- **State**: Pinia 2.1
- **i18n**: `@nuxtjs/i18n` 9.0
- **PWA**: `@vite-pwa/nuxt` 0.10 (Inject Manifest)
- **Security**: `nuxt-security` 2.2 with CSP/Permissions Policy
- **Realtime**: Socket.IO 4.8, SSE, WebSocket, WebRTC pages
- **ML / Imaging**: `face-api.js` 0.22, `@tensorflow/tfjs-node` 4.22 (with Windows DLL copy helper)
- **Notifications**: Firebase Cloud Messaging 12.1 (Service Worker included)
- **API Docs**: Swagger (`/api/nuxt-server/swagger-docs`)
- **Testing**: Playwright 1.47 E2E
- **Database**: Sequelize 6.37 + PostgreSQL (migrations/seeds scripts)
- **Additional Libraries**: WangEditor 5.1 (rich text editor), FIDO2, QR Code, Swiper 11.1, Day.js, Axios 1.7
- **Analytics**: Vercel Analytics & Speed Insights


## Key Directories

- `pages/`: Example pages such as `web-rtc/`, `socket-test/`, `server-sent-event-test/`
- `plugins/`: Custom injections (Axios, Pinia, Firebase, Socket client, Vuetify, PWA)
- `server/`: Nitro server APIs, routes, plugins
- `service-worker/`: PWA Service Worker and Firebase Messaging SW
- `models/`: Sequelize setup and migrations
- `public/models/`: `face-api.js` weight files


## Requirements

- Node.js 18+ (LTS recommended)
- Yarn 1.22+ (project default)
- PostgreSQL (if you use Sequelize features)
- On macOS, see node-canvas install notes in references


## Install

```bash
yarn install
```


## Development

Default (HTTP, bound to 0.0.0.0):

```bash
yarn dev
```

HTTPS (uses certificates in `local-ssl/`, already wired via CLI flags):

```bash
yarn dev-https
```

> Provide your own `local-ssl/cert.pem` and `local-ssl/key.pem` if needed.


## Build & Preview

Build:

```bash
yarn build
```

Local preview (Nitro preview server), or run the built server on port 3001:

```bash
yarn preview

# or run the built output
yarn start
```


## Scripts Overview

```bash
# deps/dev
yarn install
yarn dev
yarn dev-https
yarn build
yarn preview
yarn start

# analyze
yarn analyze

# i18n: export from Google Sheet to JSON (configure ./i18n/google-sheet-to-json.mjs)
yarn create-i18n

# Sequelize (configure DB in models/config/database.js or via env)
yarn createDB
yarn dropDB
yarn migrate
yarn migrate:undo
yarn seed
yarn seedAll

# DB init (drop -> create -> migrate -> seed:all)
yarn initDB

# tests
yarn test:e2e
yarn test:e2e-ui
yarn test:codegen
```


## Env & Config

Keep secrets and endpoints in `.env` (or platform env). `nuxt.config.js` exposes placeholders under `runtimeConfig.public` (mostly commented for opt-in):

- `VITE_GTM_ID`
- `VITE_API_BASE`
- `VITE_SOCKET_IO_BASE_PATH`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_FACEBOOK_APP_ID` / `VITE_FACEBOOK_API_VERSION`
- `VITE_FIREBASE_*` (API KEY, VAPID KEY, CREDENTIAL, etc.)
- `HTTPS` (control HTTPS behavior if needed)

> Some routes (e.g., Firebase Cloud Messaging) are skipped during prerender via `nitro.hooks['prerender:generate']`.


## PWA Highlights

- `@vite-pwa/nuxt` with `injectManifest`; SW file: `./service-worker/service-worker.js`
- Manifest/icons configured in `nuxt.config.js` → `pwa.manifest`
- Cache size cap: `maximumFileSizeToCacheInBytes: 22MB`
- PWA can be enabled in dev (`devOptions.enabled`)


## Security & Headers

- Integrated `nuxt-security`; production vs dev CSP variants
- Multiple Permissions Policy directives (`camera`, `microphone`, `fullscreen`, etc.)


## Styling & DX

- Vuetify 3 via `vite-plugin-vuetify`
- PostCSS includes `autoprefixer` and `postcss-pxtorem` (all properties)
- Custom `postcss-zerorem` fix to avoid `+ 0` unit issues
- Global SCSS: `style/global.scss`, `style/animation.scss`; `variable.scss` and `mixin.scss` injected via `additionalData`


## Realtime / Media Pages

- `pages/socket-test/` (Socket.IO)
- `pages/server-sent-event-test/` (SSE)
- `pages/web-rtc/` (WebRTC / Socket.IO / WebSocket / SSE variants)
- `pages/firebase/` (FCM demo)

> Socket.IO server-side routes in `server/`; client setup in `plugins/07.socket.client.js` and `composables/useSocketIoClient.js`.


## API & Swagger

- Swagger JSON: `/api/nuxt-server/swagger-docs` (prerendered via `routeRules`)
- Also see `pages/swagger-doc.vue` for UI rendering


## Testing (Playwright)

- Run: `yarn test:e2e`, `yarn test:e2e-ui`
- `yarn pretest` builds with `.env.e2e` and starts on port 3001 before tests
- Config: `playwright.config.ts`; specs in `tests/`


## Platform Notes

- Windows: on startup, `@tensorflow/tfjs-node`'s `tensorflow.dll` is copied from `napi-v9` to `napi-v8` to avoid load issues (see logic at top of `nuxt.config.js`).
- macOS: see node-canvas install notes in references.


## Assets & Models

- `public/models`: `face-api.js` weight files
  - Reference: <https://github.com/justadudewhohacks/face-api.js/tree/master>


## References

- Nuxt 4 Docs: <https://nuxt.com/docs/getting-started/introduction>
- Deployment: <https://nuxt.com/docs/getting-started/deployment>
- face-api.js models (weights): <https://github.com/justadudewhohacks/face-api.js/tree/master>
- node-canvas (macOS): <https://github.com/Automattic/node-canvas>
