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
        <!-- <p class="web_authn_page-login-title">執行身份驗證</p>
        <v-text-field
          clearable
          label="帳號"
          class="web_authn_page-login-account"
          v-model="loginAccount"
        /> -->
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
// https://flyhigher.top/develop/2160.html#verify-authenticator
import { Base64 as base64Js } from 'js-base64';

const nuxtApp = useNuxtApp();
useHead({
  title: '生物辨識測試'
});

const credentialId = ref(null);
const publicKeyBytes = ref(null);

const registerId = ref('test');
const registerAccount = ref('test');
const registerName = ref('test');
const registerWebApiOutput = ref(null);
const registerOutput = ref(null);

// const loginAccount = ref('test');
const loginWebApiOutput = ref(null);
const loginOutput = ref(null);

async function handleGeneratePublicKeySetting() {
  const challengeString =
    await nuxtApp.$webAuthn.GET_webAuthnGenerateChallenge();
  const challenge = base64Js.toUint8Array(challengeString);

  const publicKeyCredentialCreationOptions = {
    challenge,
    rp: {
      name: 'Nuxt Lab'
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

    // authenticatorSelection: {
    //   authenticatorAttachment: 'platform'
    // },
    timeout: 60000,
    attestation: 'direct',
    // attestation: 'none'
  };

  return { publicKeyCredentialCreationOptions, challengeString, challenge };
}

async function handleWebAuthnRegister() {
  nuxtApp.$store.system.setLoading(true);
  try {
    const {
      publicKeyCredentialCreationOptions: publicKeySetting,
      challengeString
    } = await handleGeneratePublicKeySetting();

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

    const credentialJSON = {
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
      ),
      type: credential.type
    };
    const response = await nuxtApp.$webAuthn.POST_webAuthnRegistration({
      challengeString,
      credential: credentialJSON
    });

    // const transports = credential.response.getTransports();
    // console.log({ transports });

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
  nuxtApp.$store.system.setLoading(false);
}

async function handleWebAuthnLogin() {
  nuxtApp.$store.system.setLoading(true);
  console.log({
    // loginAccount: loginAccount.value,
    credentialId: base64Js.toUint8Array(credentialId.value)
  });
  try {
    const {
      publicKeyCredentialCreationOptions: publicKeySetting,
      challengeString
    } = await handleGeneratePublicKeySetting();

    // publicKeySetting.user = undefined;

    const allowCredentials = [
      {
        id: base64Js.toUint8Array(credentialId.value), // from registration
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

    const utf8Decoder = new TextDecoder('utf-8');

    const credentialJSON = {
      authenticatorAttachment: credential.authenticatorAttachment,
      id: credential.id,
      // rawId: credential.rawId,
      response: {
        userHandle: credential.response.userHandle,
        signature: credential.response.signature,
        clientDataJSON: credential.response.clientDataJSON,
        authenticatorData: credential.response.authenticatorData
      },
      rawId: base64Js.fromUint8Array(new Uint8Array(credential.rawId), true),
      clientDataJSON: base64Js.fromUint8Array(
        new Uint8Array(credential.response.clientDataJSON),
        true
      ),
      userHandle: base64Js.encodeURL(
        utf8Decoder.decode(credential.response.userHandle)
      ),
      signature: base64Js.encodeURL(
        new Uint8Array(credential.response.signature)
      ),
      authenticatorData: base64Js.encodeURL(
        new Uint8Array(credential.response.authenticatorData)
      ),
      type: credential.type
    };

    console.log({ credentialJSON });

    const response = await nuxtApp.$webAuthn.POST_webAuthnVerify({
      userId: registerId.value,
      challengeString,
      credential: credentialJSON
    });

    loginOutput.value = response;
  } catch (error) {
    console.error(error);
  }
  nuxtApp.$store.system.setLoading(false);
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
