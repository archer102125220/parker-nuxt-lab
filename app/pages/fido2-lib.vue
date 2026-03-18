<template>
  <div class="fido2_lib_page">
    <!-- Hero Section -->
    <section class="fido2_lib_page-hero">
      <div class="fido2_lib_page-hero-background">
        <img
          src="/img/fido2-lib/fido2-lib-v.09.webp"
          alt="FIDO2 Lib Test"
          class="fido2_lib_page-hero-background-image"
        />
        <div class="fido2_lib_page-hero-background-overlay" />
      </div>

      <div class="fido2_lib_page-hero-content">
        <h1 class="fido2_lib_page-hero-content-title">
          {{ $t('fido2_lib_page.hero.title') }}
        </h1>
        <p class="fido2_lib_page-hero-content-subtitle">
          {{ $t('fido2_lib_page.hero.subtitle') }}
        </p>
        <p class="fido2_lib_page-hero-content-description">
          {{ $t('fido2_lib_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="fido2_lib_page-intro">
      <div class="fido2_lib_page-intro-container">
        <p class="fido2_lib_page-intro-text">
          {{ $t('fido2_lib_page.intro') }}
        </p>
        <div class="fido2_lib_page-intro-link">
          <span class="fido2_lib_page-intro-link-text">
            {{ $t('fido2_lib_page.note_label') }}
          </span>
          <a
            href="https://www.notion.so/Web-Authn-6480f13abf224ef59a41571df1531f6a"
            target="_blank"
            rel="noopener noreferrer"
            class="fido2_lib_page-intro-link-anchor"
          >
            {{ $t('fido2_lib_page.notion_link') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Registration and Login Forms -->
    <section class="fido2_lib_page-section">
      <div class="fido2_lib_page-section-container">
        <!-- Registration Form -->
        <div class="fido2_lib_page-card">
          <h2 class="fido2_lib_page-card-title">
            {{ $t('fido2_lib_page.register.title') }}
          </h2>

          <form class="fido2_lib_page-card-form" @submit.prevent="handleFido2LibRegister">
            <v-text-field
              v-model="registerId"
              :label="$t('fido2_lib_page.register.id_label')"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="fido2_lib_page-card-form-field"
            />

            <v-text-field
              v-model="registerAccount"
              :label="$t('fido2_lib_page.register.account_label')"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="fido2_lib_page-card-form-field"
            />

            <v-text-field
              v-model="registerName"
              :label="$t('fido2_lib_page.register.name_label')"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="fido2_lib_page-card-form-field"
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              class="fido2_lib_page-card-form-submit"
            >
              {{ $t('fido2_lib_page.register.submit_button') }}
            </v-btn>
          </form>

          <!-- Registration Output -->
          <div class="fido2_lib_page-card-output">
            <h3 class="fido2_lib_page-card-output-title">
              {{ $t('fido2_lib_page.register.webapi_output') }}
            </h3>
            <pre class="fido2_lib_page-card-output-content">{{ JSON.stringify(registerWebApiOutput, null, 2) }}</pre>
          </div>

          <div class="fido2_lib_page-card-output">
            <h3 class="fido2_lib_page-card-output-title">
              {{ $t('fido2_lib_page.register.server_output') }}
            </h3>
            <pre class="fido2_lib_page-card-output-content">{{ JSON.stringify(registerOutput, null, 2) }}</pre>
          </div>
        </div>

        <!-- Login Form -->
        <div class="fido2_lib_page-card">
          <h2 class="fido2_lib_page-card-title">
            {{ $t('fido2_lib_page.login.title') }}
          </h2>

          <form class="fido2_lib_page-card-form" @submit.prevent="handleFido2LibLogin">
            <v-text-field
              v-model="serverSaveUserId"
              :label="$t('fido2_lib_page.login.saved_account_label')"
              variant="outlined"
              color="primary"
              density="comfortable"
              disabled
              class="fido2_lib_page-card-form-field"
            />

            <v-checkbox
              v-model="rememberMe"
              :value="true"
              color="primary"
              :label="$t('fido2_lib_page.login.remember_me_label')"
              :disabled="rememberMeDisable"
              hide-details
              class="fido2_lib_page-card-form-checkbox"
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              class="fido2_lib_page-card-form-submit"
            >
              {{ $t('fido2_lib_page.login.submit_button') }}
            </v-btn>
          </form>

          <!-- Login Output -->
          <div class="fido2_lib_page-card-output">
            <h3 class="fido2_lib_page-card-output-title">
              {{ $t('fido2_lib_page.login.webapi_output') }}
            </h3>
            <pre class="fido2_lib_page-card-output-content">{{ JSON.stringify(loginWebApiOutput, null, 2) }}</pre>
          </div>

          <div class="fido2_lib_page-card-output">
            <h3 class="fido2_lib_page-card-output-title">
              {{ $t('fido2_lib_page.login.server_output') }}
            </h3>
            <pre class="fido2_lib_page-card-output-content">{{ JSON.stringify(loginOutput, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Base64 as base64Js } from 'js-base64';

const { t } = useI18n();

useHeadMataData({
  title: t('fido2_lib_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('fido2_lib_page.hero.description')
    }
  ]
});

const DOMAIN = import.meta.env.VITE_DOMAIN || '';
const localePath = useLocalePath();

// Schema.org 結構化資料 (nuxt-schema-org)
useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: t('fido2_lib_page.hero.title'),
    description: t('fido2_lib_page.hero.description'),
    url: `${DOMAIN}${localePath('/fido2-lib')}`,
    inLanguage: ['zh-TW', 'en'],
    image: `${DOMAIN}/img/fido2-lib/fido2-lib-v.09.webp`
  })
]);

const nuxtApp = useNuxtApp();
const system = nuxtApp.$store?.system;

const credentialId = ref(null);
const credentialPublicKeyPem = ref(null);
const credentialTransports = ref(null);
const credentialType = ref(null);
const serverSaveUserId = ref(null);

const registerId = ref('testId');
const registerAccount = ref('testAccount');
const registerName = ref('testName');
const registerWebApiOutput = ref(null);
const registerOutput = ref(null);

const loginWebApiOutput = ref(null);
const loginOutput = ref(null);
const rememberMe = ref(false);
const rememberMeDisable = ref(false);

onMounted(() => {
  const { isAndroid, isIphone } = system.broswerInfo;
  if (isAndroid === true || isIphone === true) {
    rememberMe.value = true;
    rememberMeDisable.value = true;
  }
});

async function handleFido2LibRegister() {
  if (nuxtApp.$store.system.loading === true) return;
  nuxtApp.$store.system.setLoading(true);

  console.log('---create start---');
  try {
    const id = base64Js.fromUint8Array(
      Uint8Array.from(registerId.value, (c) => c.charCodeAt(0)),
      true
    );
    const publicKeySetting = await nuxtApp.$fido2Lib.GET_fido2LibGenerateOption(
      {
        userId: id,
        userName: registerAccount.value,
        userDisplayName: registerName.value
      }
    );

    console.log({
      publicKeySetting: {
        ...publicKeySetting,
        rp: {
          ...(publicKeySetting?.rp || {})
        },
        challenge: base64Js.toUint8Array(publicKeySetting.challenge),
        user: {
          ...publicKeySetting.user,
          id: base64Js.toUint8Array(publicKeySetting.user.id)
        }
      }
    });

    const credential = await navigator.credentials.create({
      publicKey: {
        ...publicKeySetting,
        rp: {
          ...(publicKeySetting?.rp || {})
        },
        challenge: base64Js.toUint8Array(publicKeySetting.challenge),
        user: {
          ...publicKeySetting.user,
          id: base64Js.toUint8Array(publicKeySetting.user.id)
        }
      }
    });
    registerWebApiOutput.value = credential;
    console.log(credential);

    const credentialJSON = {
      authenticatorAttachment: credential.authenticatorAttachment,
      id: credential.id,
      rawId: base64Js.fromUint8Array(new Uint8Array(credential.rawId), true),
      response: {
        originalAttestationObject: credential.response.attestationObject,
        attestationObject: base64Js.fromUint8Array(
          new Uint8Array(credential.response.attestationObject),
          true
        ),
        originalAuthenticatorData: credential.response.getAuthenticatorData(),
        authenticatorData: base64Js.fromUint8Array(
          new Uint8Array(credential.response.getAuthenticatorData()),
          true
        ),
        originalClientDataJSON: credential.response.clientDataJSON,
        clientDataJSON: base64Js.fromUint8Array(
          new Uint8Array(credential.response.clientDataJSON),
          true
        ),
        originalPublicKey: credential.response.getPublicKey(),
        publicKey: base64Js.fromUint8Array(
          new Uint8Array(credential.response.getPublicKey()),
          true
        ),
        publicKeyAlgorithm: credential.response.getPublicKeyAlgorithm(),
        transports: credential.response.getTransports()
      },
      type: credential.type
    };
    console.log({ credentialJSON });

    const response = await nuxtApp.$fido2Lib.POST_fido2LibRegistration({
      challengeString: publicKeySetting.challenge,
      credential: credentialJSON,
      user: publicKeySetting.user
    });
    console.log({ response });

    const transports = credential.response.getTransports();
    console.log({ transports });

    const _credentialPublicKeyPem = base64Js.decode(
      response.base64URLServerSaveData.credentialPublicKeyPem
    );

    console.log({
      response,
      credentialJSON,
      credentialPublicKeyPem: _credentialPublicKeyPem,
      credentialId: base64Js.toUint8Array(
        response?.base64URLServerSaveData?.resultId
      )
    });
    registerOutput.value = response;
    credentialId.value = response?.base64URLServerSaveData?.resultId;
    credentialTransports.value = credential.response.getTransports();
    credentialType.value = credential.type;
    serverSaveUserId.value = response?.base64URLServerSaveData?.userId;

    credentialPublicKeyPem.value = _credentialPublicKeyPem;

    nuxtApp.$successMessage('憑證註冊成功');
  } catch (error) {
    nuxtApp.$errorMessage('登入憑證失敗');
    console.error(error);
  }
  console.log('---create end---');
  nuxtApp.$store.system.setLoading(false);
}

async function handleFido2LibLogin() {
  if (nuxtApp.$store.system.loading === true) return;
  nuxtApp.$store.system.setLoading(true);
  console.log('---get start---');

  try {
    const publicKeySetting = await nuxtApp.$fido2Lib.GET_fido2LibGenerateOption(
      {
        isLogin: true,
        credentialId: credentialId.value
      }
    );

    console.log(publicKeySetting);

    let allowCredentials;
    if (rememberMe.value === true) {
      allowCredentials = [
        {
          id: base64Js.toUint8Array(credentialId.value),
          type: credentialType.value,
          transports: credentialTransports.value
        }
      ];
    }

    const credential = await navigator.credentials.get({
      publicKey: {
        ...publicKeySetting,
        challenge: base64Js.toUint8Array(publicKeySetting.challenge),
        allowCredentials
      }
    });
    console.log(credential);
    loginWebApiOutput.value = credential;

    const credentialJSON = {
      authenticatorAttachment: credential.authenticatorAttachment,
      id: credential.id,
      rawId: base64Js.fromUint8Array(new Uint8Array(credential.rawId), true),
      response: {
        originalAuthenticatorData: credential.response.authenticatorData,
        authenticatorData: base64Js.fromUint8Array(
          new Uint8Array(credential.response.authenticatorData),
          true
        ),
        originalClientDataJSON: credential.response.clientDataJSON,
        clientDataJSON: base64Js.fromUint8Array(
          new Uint8Array(credential.response.clientDataJSON),
          true
        ),
        originalSignature: credential.response.signature,
        signature: base64Js.fromUint8Array(
          new Uint8Array(credential.response.signature),
          true
        ),
        originalUserHandle: credential.response.userHandle,
        userHandle: base64Js.fromUint8Array(
          new Uint8Array(credential.response.userHandle),
          true
        )
      },
      type: credential.type
    };
    console.log({ credentialJSON });

    const userId = base64Js.fromUint8Array(
      Uint8Array.from(serverSaveUserId.value, (c) => c.charCodeAt(0)),
      true
    );

    console.log(registerOutput.value);
    const response = await nuxtApp.$fido2Lib.POST_fido2LibVerify({
      challengeString: publicKeySetting.challenge,
      credential: credentialJSON,
      base64URLServerSaveData: {
        prevCounter:
          (registerOutput.value?.base64URLServerSaveData?.counter || 0) + 1,
        credentialId: credentialId.value,
        credentialPublicKeyPem: base64Js.encodeURL(
          credentialPublicKeyPem.value
        ),
        counter: registerOutput.value?.base64URLServerSaveData?.counter || 0,
        userId
      }
    });
    console.log(response);
    loginOutput.value = response;

    nuxtApp.$successMessage('登入憑證成功');
  } catch (error) {
    console.error(error);
    nuxtApp.$errorMessage('登入憑證失敗');
  }

  console.log('---get end---');
  nuxtApp.$store.system.setLoading(false);
}
</script>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.fido2_lib_page-hero {
  // Positioning
  position: relative;

  // Display & Box Model
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;

  // Visual
  overflow: hidden;

  &-background {
    // Positioning
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    // Display & Box Model
    width: 100%;
    height: 100%;

    &-image {
      // Display & Box Model
      width: 100%;
      height: 100%;

      // Visual
      object-fit: cover;
    }

    &-overlay {
      // Positioning
      position: absolute;
      top: 0;
      left: 0;

      // Display & Box Model
      width: 100%;
      height: 100%;

      // Visual
      background: linear-gradient(135deg, rgba(68, 160, 141, 0.9) 0%, rgba(78, 205, 196, 0.85) 100%);
    }
  }

  &-content {
    // Positioning
    position: relative;
    z-index: 1;

    // Display & Box Model
    max-width: 800px;
    text-align: center;

    &-title {
      // Display & Box Model
      margin: 0 0 16px 0;

      // Typography
      font-size: 48px;
      font-weight: 800;
      color: #ffffff;

      // Animation
      animation: fade-in-up 0.6s ease-out;

      @media (max-width: 768px) {
        font-size: 36px;
      }
    }

    &-subtitle {
      // Display & Box Model
      margin: 0 0 24px 0;

      // Typography
      font-size: 24px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.95);

      // Animation
      animation: fade-in-up 0.6s ease-out 0.1s both;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    &-description {
      // Display & Box Model
      margin: 0;

      // Typography
      font-size: 18px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);

      // Animation
      animation: fade-in-up 0.6s ease-out 0.2s both;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
}

// ========================================
// Introduction
// ========================================
.fido2_lib_page-intro {
  // Display & Box Model
  padding: 60px 20px;

  // Visual
  background: var(--color-bg-secondary, #f7fafc);

  &-container {
    // Display & Box Model
    max-width: 1200px;
    margin: 0 auto;
  }

  &-text {
    // Typography
    font-size: 18px;
    line-height: 1.8;
    color: var(--color-text-secondary, #4a5568);
    text-align: center;

    // Display & Box Model
    max-width: 800px;
    margin: 0 auto 24px auto;
  }

  &-link {
    // Display & Box Model
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;

    &-text {
      // Typography
      font-size: 16px;
      color: var(--color-text-secondary, #4a5568);
    }

    &-anchor {
      // Typography
      font-size: 16px;
      font-weight: 600;
      color: var(--color-primary, #44A08D);
      text-decoration: none;

      // Animation
      transition: color 0.3s;

      &:hover {
        color: var(--color-primary-dark, #2d6a5a);
        text-decoration: underline;
      }
    }
  }
}

// ========================================
// Forms Section
// ========================================
.fido2_lib_page-section {
  // Display & Box Model
  padding: 60px 20px;

  &-container {
    // Display & Box Model
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;

    @media (min-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
  }
}

.fido2_lib_page-card {
  // Display & Box Model
  padding: 32px;
  border-radius: 12px;

  // Visual
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  // Animation
  animation: fade-in-up 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }

  &-title {
    // Display & Box Model
    margin: 0 0 24px 0;

    // Typography
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text-primary, #2d3748);
    text-align: center;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  &-form {
    // Display & Box Model
    margin-bottom: 32px;

    &-field {
      // Display & Box Model
      margin-bottom: 16px;
    }

    &-checkbox {
      // Display & Box Model
      margin-bottom: 16px;
    }

    &-submit {
      // Display & Box Model
      margin-top: 8px;
    }
  }

  &-output {
    // Display & Box Model
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      // Display & Box Model
      margin: 0 0 12px 0;

      // Typography
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary, #2d3748);
    }

    &-content {
      // Display & Box Model
      padding: 16px;
      margin: 0;
      border-radius: 8px;
      max-height: 300px;

      // Typography
      font-family: 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.6;
      color: var(--color-text-primary, #2d3748);

      // Visual
      background: var(--color-bg-secondary, #f7fafc);
      border: 1px solid #e2e8f0;
      overflow: auto;
      word-wrap: break-word;
    }
  }
}

// ========================================
// Animations
// ========================================
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
