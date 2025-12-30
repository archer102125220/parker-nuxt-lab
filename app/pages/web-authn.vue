<template>
  <div class="web_authn_page">
    <!-- Hero Section -->
    <section class="web_authn_page-hero">
      <div class="web_authn_page-hero-background">
        <img
          src="/img/web-authn/web-authn-v.06.webp"
          alt="Web Authn Test"
          class="web_authn_page-hero-background-image"
        />
        <div class="web_authn_page-hero-background-overlay" />
      </div>

      <div class="web_authn_page-hero-content">
        <h1 class="web_authn_page-hero-content-title">
          {{ $t('web_authn_page.hero.title') }}
        </h1>
        <p class="web_authn_page-hero-content-subtitle">
          {{ $t('web_authn_page.hero.subtitle') }}
        </p>
        <p class="web_authn_page-hero-content-description">
          {{ $t('web_authn_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="web_authn_page-intro">
      <div class="web_authn_page-intro-container">
        <p class="web_authn_page-intro-text">
          {{ $t('web_authn_page.intro') }}
        </p>
        <div class="web_authn_page-intro-link">
          <span class="web_authn_page-intro-link-text">
            {{ $t('web_authn_page.note_label') }}
          </span>
          <a
            href="https://www.notion.so/Web-Authn-6480f13abf224ef59a41571df1531f6a"
            target="_blank"
            rel="noopener noreferrer"
            class="web_authn_page-intro-link-anchor"
          >
            {{ $t('web_authn_page.notion_link') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Registration and Login Forms -->
    <section class="web_authn_page-section">
      <div class="web_authn_page-section-container">
        <!-- Registration Form -->
        <div class="web_authn_page-card">
          <h2 class="web_authn_page-card-title">
            {{ $t('web_authn_page.register.title') }}
          </h2>

          <form class="web_authn_page-card-form" @submit.prevent="handleWebAuthnRegister">
            <v-text-field
              v-model="registerId"
              :label="$t('web_authn_page.register.id_label')"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="web_authn_page-card-form-field"
            />

            <v-text-field
              v-model="registerAccount"
              :label="$t('web_authn_page.register.account_label')"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="web_authn_page-card-form-field"
            />

            <v-text-field
              v-model="registerName"
              :label="$t('web_authn_page.register.name_label')"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="web_authn_page-card-form-field"
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              class="web_authn_page-card-form-submit"
            >
              {{ $t('web_authn_page.register.submit_button') }}
            </v-btn>
          </form>

          <!-- Registration Output -->
          <div class="web_authn_page-card-output">
            <h3 class="web_authn_page-card-output-title">
              {{ $t('web_authn_page.register.webapi_output') }}
            </h3>
            <pre class="web_authn_page-card-output-content">{{ JSON.stringify(registerWebApiOutput, null, 2) }}</pre>
          </div>

          <div class="web_authn_page-card-output">
            <h3 class="web_authn_page-card-output-title">
              {{ $t('web_authn_page.register.server_output') }}
            </h3>
            <pre class="web_authn_page-card-output-content">{{ JSON.stringify(registerOutput, null, 2) }}</pre>
          </div>
        </div>

        <!-- Login Form -->
        <div class="web_authn_page-card">
          <h2 class="web_authn_page-card-title">
            {{ $t('web_authn_page.login.title') }}
          </h2>

          <form class="web_authn_page-card-form" @submit.prevent="handleWebAuthnLogin">
            <v-text-field
              v-model="loginId"
              :label="$t('web_authn_page.login.account_label')"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="web_authn_page-card-form-field"
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              class="web_authn_page-card-form-submit"
            >
              {{ $t('web_authn_page.login.submit_button') }}
            </v-btn>
          </form>

          <!-- Login Output -->
          <div class="web_authn_page-card-output">
            <h3 class="web_authn_page-card-output-title">
              {{ $t('web_authn_page.login.webapi_output') }}
            </h3>
            <pre class="web_authn_page-card-output-content">{{ JSON.stringify(loginWebApiOutput, null, 2) }}</pre>
          </div>

          <div class="web_authn_page-card-output">
            <h3 class="web_authn_page-card-output-title">
              {{ $t('web_authn_page.login.server_output') }}
            </h3>
            <pre class="web_authn_page-card-output-content">{{ JSON.stringify(loginOutput, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// https://blog.techbridge.cc/2019/08/17/webauthn-intro
// https://yishiashia.github.io/posts/passkey-and-webauthn-passwordless-authentication/
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API#browser_compatibility
// https://flyhigher.top/develop/2160.html#verify-authenticator
import { Base64 as base64Js } from 'js-base64';

const { t } = useI18n();

useHeadMataData({
  title: t('web_authn_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('web_authn_page.hero.description')
    }
  ]
});

const nuxtApp = useNuxtApp();

const credentialId = ref(null);
const credentialPublicKeyPem = ref(null);
const credentialPublicKeyJwk = ref(null);

const registerId = ref('testId');
const registerAccount = ref('testAccount');
const registerName = ref('testName');
const registerWebApiOutput = ref(null);
const registerOutput = ref(null);

const loginId = ref('testId');
const loginWebApiOutput = ref(null);
const loginOutput = ref(null);

async function handleGeneratePublicKeySetting() {
  const challengeString =
    await nuxtApp.$webAuthn.GET_webAuthnGenerateChallenge();
  const challenge = base64Js.toUint8Array(challengeString);

  const rpId =
    typeof location?.hostname === 'string' ? location.hostname : undefined;
  const publicKeyCredentialCreationOptions = {
    challenge,
    rp: {
      name: 'Nuxt Lab',
      rpId
      // id: 'techbridge.inc'
    },

    // This Relying Party will accept either RS256 or ES256 credential
    // RS256 is prioritized for TPM (Trusted Platform Module) compatibility
    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -257 // "RS256" - Required for TPM support
      },
      {
        type: 'public-key',
        alg: -7 // "ES256" as registered in the IANA COSE Algorithms registry
      }
    ],

    authenticatorSelection: {
      // authenticatorAttachment: 'platform'
      requireResidentKey: true
    },
    timeout: 60000,
    attestation: 'direct'
  };

  return { publicKeyCredentialCreationOptions, challengeString, challenge };
}

async function handleWebAuthnRegister() {
  if (nuxtApp.$store.system.loading === true) return;
  nuxtApp.$store.system.setLoading(true);
  console.log('---create start---');
  try {
    const {
      publicKeyCredentialCreationOptions: publicKeySetting,
      challengeString
    } = await handleGeneratePublicKeySetting();

    console.log({ publicKeySetting });

    // const encodedData = window.btoa("Hello, world"); // 编码
    // const decodedData = window.atob(encodedData); // 解码

    // const userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=';
    // const id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));
    // const id = Uint8Array.from(registerId.value, (c) => c.charCodeAt(0));
    const id = Uint8Array.from(registerId.value, (c) => c.charCodeAt(0));
    publicKeySetting.user = {
      id,
      name: registerAccount.value,
      displayName: registerName.value
    };

    const credential = await navigator.credentials.create({
      publicKey: publicKeySetting
    });
    registerWebApiOutput.value = credential;
    console.log(credential);

    // const credentialJSON = credential.toJSON(); // ios safari 的憑證沒有toJSON方法
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

    const response = await nuxtApp.$webAuthn.POST_webAuthnRegistration({
      challengeString,
      credential: credentialJSON
    });

    // const transports = credential.response.getTransports();
    // console.log({ transports });

    const _credentialPublicKeyPem = base64Js.decode(
      response.base64URLServerSaveData.credentialPublicKeyPem
    );
    const _credentialPublicKeyJwk = JSON.parse(
      base64Js.decode(response.base64URLServerSaveData.credentialPublicKeyJwk)
    );

    console.log({
      response,
      credentialJSON,
      credentialPublicKeyPem: _credentialPublicKeyPem,
      credentialPublicKeyJwk: _credentialPublicKeyJwk,
      credentialId: base64Js.toUint8Array(
        response?.base64URLServerSaveData?.credentialId
      )
    });
    registerOutput.value = response;
    credentialId.value = response?.base64URLServerSaveData?.credentialId;

    credentialPublicKeyPem.value = _credentialPublicKeyPem;
    credentialPublicKeyJwk.value = _credentialPublicKeyJwk;

    nuxtApp.$successMessage('憑證註冊成功');
  } catch (error) {
    nuxtApp.$errorMessage('登入憑證失敗');
    console.error(error);
  }
  console.log('---create end---');
  nuxtApp.$store.system.setLoading(false);
}

async function handleWebAuthnLogin() {
  if (nuxtApp.$store.system.loading === true) return;
  nuxtApp.$store.system.setLoading(true);
  console.log('---get start---');

  try {
    // console.log({
    //   loginId: loginId.value,
    //   credentialId: base64Js.toUint8Array(credentialId.value)
    // });

    const {
      publicKeyCredentialCreationOptions: publicKeySetting,
      challengeString
    } = await handleGeneratePublicKeySetting();

    // publicKeySetting.user = undefined;

    // const id = Uint8Array.from(loginId.value, (c) => c.charCodeAt(0));
    const allowCredentials = [
      {
        // id, // from registration
        // id: base64Js.toUint8Array(credentialId.value), // from registration
        id: credentialId.value, // from registration
        type: 'public-key',
        transports: ['internal', 'usb', 'ble', 'nfc']
      }
    ];

    const credential = await navigator.credentials.get({
      publicKey: publicKeySetting,
      allowCredentials
    });
    console.log(credential);
    loginWebApiOutput.value = credential;

    console.log(new Uint8Array(credential.response.userHandle));

    // const credentialJSON = credential.toJSON(); // ios safari 的憑證沒有toJSON方法
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

    const response = await nuxtApp.$webAuthn.POST_webAuthnVerify({
      userId: loginId.value,
      challengeString,
      credential: credentialJSON,
      base64URLServerSaveData: {
        credentialId: credentialId.value,
        credentialPublicKeyPem: base64Js.encodeURL(
          credentialPublicKeyPem.value
        ),
        credentialPublicKeyJwk: base64Js.encodeURL(
          JSON.stringify(credentialPublicKeyJwk.value)
        )
      }
    });

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
.web_authn_page-hero {
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
.web_authn_page-intro {
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
.web_authn_page-section {
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

.web_authn_page-card {
  // Display & Box Model
  padding: 32px;
  border-radius: 12px;


  // Visual
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  // Animation
  animation: fade-in-up 0.6s ease-out 0.3s both;

  overflow: hidden;

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
