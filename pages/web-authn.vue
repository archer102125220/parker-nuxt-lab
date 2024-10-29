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
      <p class="web_authn_page-register-output">{{ registerOutput }}</p>
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
      <p class="web_authn_page-login-output">{{ loginOutput }}</p>
    </div>
  </div>
</template>

<script setup>
import { Base64 as base64Js } from 'js-base64';

// https://blog.techbridge.cc/2019/08/17/webauthn-intro
const nuxtApp = useNuxtApp();
useHead({
  title: '生物辨識測試'
});

const challenge = ref(null);

const registerId = ref('test');
const registerAccount = ref('test');
const registerName = ref('test');
const registerOutput = ref(null);
const loginAccount = ref('');
const loginOutput = ref('');

async function handleWebAuthnRegister() {
  try {
    const challengeString =
      await nuxtApp.$webAuthn.GET_webAuthnGenerateChallenge();
    challenge.value = Uint8Array.from(challengeString.split(','));

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

    const credentials = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    });
    const credentialsJSON = {
      authenticatorAttachment: credentials.authenticatorAttachment,
      id: credentials.id,
      // rawId: credentials.rawId,
      response: {
        attestationObject: credentials.response.attestationObject,
        clientDataJSON: credentials.response.clientDataJSON
      },
      rawId: base64Js.encodeURL(new Uint8Array(credentials.rawId)),
      attestationObject: base64Js.encodeURL(
        new Uint8Array(credentials.response.attestationObject)
      ),
      clientDataJSON: base64Js.encodeURL(
        new Uint8Array(credentials.response.clientDataJSON)
      )
    };
    const response = await nuxtApp.$webAuthn.POST_webAuthnRegistration({
      challengeString,
      credentials: credentialsJSON
    });

    console.log({
      credentials,
      credentialsJSON,
      challenge,
      registerAccount: registerAccount.value,
      registerName: registerName.value,
      response,

      'credentialsJSON.attestationObject': base64Js.decode(
        credentialsJSON.attestationObject
      )
    });

    registerOutput.value = response;
  } catch (error) {
    console.error(error);
  }
}

function handleWebAuthnLogin() {
  console.log({
    loginAccount: loginAccount.value
  });
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
      word-wrap: break-word;
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
