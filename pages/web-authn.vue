<template>
  <div class="web_authn_page">
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
      <div class="web_authn_page-register-output">
        <p>web authn回傳：</p>
        <p>{{ registerWebApiOutput }}</p>
      </div>
      <div class="web_authn_page-register-output">
        <p>伺服端回傳：</p>
        <p>{{ registerOutput }}</p>
      </div>
    </div>

    <div class="web_authn_page-login">
      <form @submit.prevent="handleWebAuthnLogin">
        <p class="web_authn_page-login-title">執行身份驗證</p>
        <v-text-field
          clearable
          label="帳號"
          class="web_authn_page-login-account"
          v-model="loginAccount"
        />
        <div class="web_authn_page-login-submit">
          <v-btn color="primary" type="submit">驗證</v-btn>
        </div>
      </form>
      <div class="web_authn_page-login-output">
        <p>web authn回傳：</p>
        <p>{{ loginWebApiOutput }}</p>
      </div>
      <div class="web_authn_page-login-output">
        <p>伺服端回傳：</p>
        <p>{{ loginOutput }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// https://blog.techbridge.cc/2019/08/17/webauthn-intro
// https://yishiashia.github.io/posts/passkey-and-webauthn-passwordless-authentication/
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API#browser_compatibility
import { Base64 as base64Js } from 'js-base64';

const nuxtApp = useNuxtApp();
useHead({
  title: '生物辨識測試'
});

const challenge = ref(null);
const credentialId = ref(null);
const publicKeyBytes = ref(null);

const registerId = ref('test');
const registerAccount = ref('test');
const registerName = ref('test');
const registerWebApiOutput = ref(null);
const registerOutput = ref(null);

const loginAccount = ref('test');
const loginWebApiOutput = ref(null);
const loginOutput = ref(null);

async function handleWebAuthnRegister() {
  try {
    const challengeString =
      await nuxtApp.$webAuthn.GET_webAuthnGenerateChallenge();
    challenge.value = base64Js.toUint8Array(base64Js.decode(challengeString));

    // const encodedData = window.btoa("Hello, world"); // 编码
    // const decodedData = window.atob(encodedData); // 解码

    // const userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=';
    // const id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));
    const id = Uint8Array.from(registerId.value, (c) => c.charCodeAt(0));

    const publicKeyCredentialCreationOptions = {
      challenge: challenge.value,
      rp: {
        name: 'Nuxt Lab'
        // id: 'techbridge.inc'
      },
      user: {
        id,
        name: registerAccount.value,
        displayName: registerName.value
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

      // authenticatorSelection: {
      //   authenticatorAttachment: 'platform'
      // },
      timeout: 60000,
      attestation: 'direct'
    };

    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    });
    registerWebApiOutput.value = credential;
    const credentialsJSON = {
      authenticatorAttachment: credential.authenticatorAttachment,
      id: credential.id,
      // rawId: credential.rawId,
      response: {
        attestationObject: credential.response.attestationObject,
        clientDataJSON: credential.response.clientDataJSON
      },
      rawId: base64Js.fromUint8Array(new Uint8Array(credential.rawId), true),
      attestationObject: base64Js.fromUint8Array(
        new Uint8Array(credential.response.attestationObject),
        true
      ),
      clientDataJSON: base64Js.fromUint8Array(
        new Uint8Array(credential.response.clientDataJSON),
        true
      )
    };
    const response = await nuxtApp.$webAuthn.POST_webAuthnRegistration({
      challengeString,
      credential: credentialsJSON
    });

    const transports = credential.response.getTransports();

    console.log({
      credential,
      credentialsJSON,
      challenge,
      registerAccount: registerAccount.value,
      registerName: registerName.value,
      response,

      'credentialsJSON.attestationObject': base64Js.toUint8Array(
        credentialsJSON.attestationObject
      ),
      transports
    });

    console.log({
      credentialId: base64Js.toUint8Array(
        response?.base64URLServerSaveData?.credentialId
      ),
      publicKeyBytes: base64Js.toUint8Array(
        response?.base64URLServerSaveData?.publicKeyBytes
      )
    });
    registerOutput.value = response;
    credentialId.value = response?.base64URLServerSaveData?.credentialId;
    publicKeyBytes.value = response?.base64URLServerSaveData?.publicKeyBytes;
  } catch (error) {
    console.error(error);
  }
}

async function handleWebAuthnLogin() {
  console.log({
    loginAccount: loginAccount.value,
    credentialId: base64Js.toUint8Array(credentialId.value)
  });
  try {
    const id = Uint8Array.from(registerId.value, (c) => c.charCodeAt(0));

    const publicKey = {
      challenge: challenge.value,
      rp: {
        name: 'Nuxt Lab'
        // id: 'techbridge.inc'
      },
      user: {
        id,
        name: registerAccount.value,
        displayName: registerName.value
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

      // authenticatorSelection: {
      //   authenticatorAttachment: 'platform'
      // },
      timeout: 60000,
      attestation: 'direct'
    };
    const allowCredentials = [
      {
        id: base64Js.toUint8Array(credentialId.value), // from registration
        type: 'public-key',
        transports: ['internal', 'usb', 'ble', 'nfc']
      }
    ];

    const credential = await navigator.credentials.get({
      publicKey,
      allowCredentials
    });
    console.log(credential);
    loginWebApiOutput.value = credential;

    const credentialsJSON = {
      authenticatorAttachment: credential.authenticatorAttachment,
      id: credential.id,
      // rawId: credential.rawId,
      response: {
        attestationObject: credential.response.attestationObject,
        clientDataJSON: credential.response.clientDataJSON
      },
      rawId: base64Js.fromUint8Array(new Uint8Array(credential.rawId), true),
      attestationObject: base64Js.fromUint8Array(
        new Uint8Array(credential.response.attestationObject),
        true
      ),
      clientDataJSON: base64Js.fromUint8Array(
        new Uint8Array(credential.response.clientDataJSON),
        true
      )
    };

    const response = await nuxtApp.$webAuthn.POST_webAuthnRegistration({
      challengeString,
      credential: credentialsJSON
    });

    loginOutput.value = response;
  } catch (error) {
    console.error(error);
  }
}
</script>

<style lang="scss" scoped>
.web_authn_page {
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
    &-output {
      max-width: 100%;
      max-height: 700px;
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
    &-account {
      @extend .web_authn_page-register-account;
    }
    &-submit {
      @extend .web_authn_page-register-submit;
    }
    &-output {
      @extend .web_authn_page-register-output;
    }
  }
}
</style>
