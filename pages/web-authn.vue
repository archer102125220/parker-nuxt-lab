<template>
  <div class="web_authn_page">
    <h1>原生方式為主，套件用來編碼、解碼的方式實作</h1>
    <div class="web_authn_page-outbound_link">
      <p>記錄筆記：</p>
      <a
        href="https://www.notion.so/Web-Authn-6480f13abf224ef59a41571df1531f6a"
        target="_blank"
      >
        notion筆記連結
      </a>
    </div>
    <div class="web_authn_page-register">
      <form @submit.prevent="handleWebAuthnRegister">
        <p class="web_authn_page-register-title">向伺服器註冊生物辨識資料</p>
        <v-text-field
          clearable
          label="id"
          class="web_authn_page-register-id"
          v-model="registerId"
        />
        <v-text-field
          clearable
          label="帳號"
          class="web_authn_page-register-account"
          v-model="registerAccount"
        />
        <v-text-field
          clearable
          label="名稱"
          class="web_authn_page-register-name"
          v-model="registerName"
        />
        <div class="web_authn_page-register-submit">
          <v-btn color="primary" type="submit">註冊</v-btn>
        </div>
      </form>
      <p class="web_authn_page-register-output_title">web authn回傳：</p>
      <div class="web_authn_page-register-output">
        <p>{{ registerWebApiOutput }}</p>
      </div>
      <p class="web_authn_page-register-output_title">伺服端回傳：</p>
      <div class="web_authn_page-register-output">
        <p>{{ registerOutput }}</p>
      </div>
    </div>

    <div class="web_authn_page-login">
      <form @submit.prevent="handleWebAuthnLogin">
        <p class="web_authn_page-login-title">執行身份驗證</p>
        <v-text-field
          clearable
          label="帳號"
          class="web_authn_page-login-id"
          v-model="loginId"
        />
        <div class="web_authn_page-login-submit">
          <v-btn color="primary" type="submit">驗證</v-btn>
        </div>
      </form>
      <p class="web_authn_page-login-output_title">web authn回傳：</p>
      <div class="web_authn_page-login-output">
        <p>{{ loginWebApiOutput }}</p>
      </div>
      <p class="web_authn_page-login-output_title">web 伺服端回傳：</p>
      <div class="web_authn_page-login-output">
        <p>{{ loginOutput }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// https://blog.techbridge.cc/2019/08/17/webauthn-intro
// https://yishiashia.github.io/posts/passkey-and-webauthn-passwordless-authentication/
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API#browser_compatibility
// https://flyhigher.top/develop/2160.html#verify-authenticator
import { Base64 as base64Js } from 'js-base64';

const nuxtApp = useNuxtApp();
useHead({
  title: '生物辨識測試(原生)'
});

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

    // This Relying Party will accept either an ES256 or RS256 credential, but
    // prefers an ES256 credential.
    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7 // "ES256" as registered in the IANA COSE Algorithms registry
      },
      {
        type: 'public-key',
        alg: -257 // Value registered by this specification for "RS256"
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
.web_authn_page {
  &-outbound_link {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    flex-direction: row;
  }

  &-register {
    margin-bottom: 16px;
    &-title {
      margin-bottom: 16px;
    }
    &-id {
      margin-bottom: 8px;
    }
    &-account {
      margin-bottom: 8px;
    }
    &-name {
      margin-bottom: 8px;
    }
    &-submit {
      margin-bottom: 16px;
      text-align: center;
    }
    &-output_title {
      margin-bottom: 16px;
    }
    &-output {
      max-width: 100%;
      max-height: 400px;
      word-wrap: break-word;
      overflow: auto;
      margin-bottom: 16px;
    }
  }

  &-login {
    @extend .web_authn_page-register;
    &-title {
      @extend .web_authn_page-register-title;
    }
    &-id {
      @extend .web_authn_page-register-id;
    }
    &-submit {
      @extend .web_authn_page-register-submit;
    }
    &-output_title {
      @extend .web_authn_page-register-output_title;
    }
    &-output {
      @extend .web_authn_page-register-output;
    }
  }
}
</style>
