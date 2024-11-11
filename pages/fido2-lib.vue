<template>
  <div class="fido2_lib_page">
    <h1>fido2-lib套件的方式為主的方式實作</h1>
    <div class="fido2_lib_page-register">
      <form @submit.prevent="handleFido2LibRegister">
        <p class="fido2_lib_page-register-title">向伺服器註冊生物辨識資料</p>
        <v-text-field
          clearable
          label="id"
          class="fido2_lib_page-register-id"
          v-model="registerId"
        />
        <v-text-field
          clearable
          label="帳號"
          class="fido2_lib_page-register-account"
          v-model="registerAccount"
        />
        <v-text-field
          clearable
          label="名稱"
          class="fido2_lib_page-register-name"
          v-model="registerName"
        />
        <div class="fido2_lib_page-register-submit">
          <v-btn color="primary" type="submit">註冊</v-btn>
        </div>
      </form>
      <p class="fido2_lib_page-register-output_title">web authn回傳：</p>
      <div class="fido2_lib_page-register-output">
        <p>{{ registerWebApiOutput }}</p>
      </div>
      <p class="fido2_lib_page-register-output_title">伺服端回傳：</p>
      <div class="fido2_lib_page-register-output">
        <p>{{ registerOutput }}</p>
      </div>
    </div>

    <div class="fido2_lib_page-login">
      <form @submit.prevent="handleFido2LibLogin">
        <p class="fido2_lib_page-login-title">執行身份驗證</p>
        <v-text-field
          clearable
          label="帳號"
          class="fido2_lib_page-login-id"
          v-model="loginId"
        />
        <div class="fido2_lib_page-login-submit">
          <v-btn color="primary" type="submit">驗證</v-btn>
        </div>
      </form>
      <p class="fido2_lib_page-login-output_title">web authn回傳：</p>
      <div class="fido2_lib_page-login-output">
        <p>{{ loginWebApiOutput }}</p>
      </div>
      <p class="fido2_lib_page-login-output_title">web 伺服端回傳：</p>
      <div class="fido2_lib_page-login-output">
        <p>{{ loginOutput }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Base64 as base64Js } from 'js-base64';

const nuxtApp = useNuxtApp();
useHead({
  title: '生物辨識測試(fido2-lib)'
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
  const challengeString = await nuxtApp.$fido2Lib.GET_fido2LibGenerateOption();
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
    attestation: 'direct'
  };

  return { publicKeyCredentialCreationOptions, challengeString, challenge };
}

async function handleFido2LibRegister() {
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

    console.log({ publicKeySetting });

    const credential = await navigator.credentials.create({
      publicKey: {
        ...publicKeySetting,
        challenge: base64Js.toUint8Array(publicKeySetting.challenge),
        user: {
          ...publicKeySetting.user,
          id: base64Js.toUint8Array(publicKeySetting.user.id)
        }
      }
    });
    registerWebApiOutput.value = credential;
    console.log(credential);

    const credentialJSON = credential.toJSON();
    console.log({ credentialJSON });

    const response = await nuxtApp.$fido2Lib.POST_fido2LibRegistration({
      challengeString: publicKeySetting.challenge,
      credential: credentialJSON
    });
    console.log({ response });

    // const transports = credential.response.getTransports();
    // console.log({ transports });

    // const _credentialPublicKeyPem = base64Js.decode(
    //   response.base64URLServerSaveData.credentialPublicKeyPem
    // );
    // const _credentialPublicKeyJwk = JSON.parse(
    //   base64Js.decode(response.base64URLServerSaveData.credentialPublicKeyJwk)
    // );

    // console.log({
    //   response,
    //   credentialJSON,
    //   credentialPublicKeyPem: _credentialPublicKeyPem,
    //   credentialPublicKeyJwk: _credentialPublicKeyJwk,
    //   credentialId: base64Js.toUint8Array(
    //     response?.base64URLServerSaveData?.credentialId
    //   )
    // });
    // registerOutput.value = response;
    // credentialId.value = response?.base64URLServerSaveData?.credentialId;

    // credentialPublicKeyPem.value = _credentialPublicKeyPem;
    // credentialPublicKeyJwk.value = _credentialPublicKeyJwk;

    nuxtApp.$successMessage('憑證註冊成功');
  } catch (error) {
    nuxtApp.$errorMessage('登入憑證失敗');
    console.error(error);
  }
  console.log('---create end---');
  nuxtApp.$store.system.setLoading(false);
}

async function handleFido2LibLogin() {
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
      userHandle: base64Js.fromUint8Array(
        // utf8Decoder.decode(credential.response.userHandle)
        new Uint8Array(credential.response.userHandle),
        true
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

    const response = await nuxtApp.$fido2Lib.POST_fido2LibVerify({
      userId: loginId.value,
      challengeString,
      credentialId: credentialId.value,
      credential: credentialJSON,
      base64URLServerSaveData: {
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
.fido2_lib_page {
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
    @extend .fido2_lib_page-register;
    &-title {
      @extend .fido2_lib_page-register-title;
    }
    &-id {
      @extend .fido2_lib_page-register-id;
    }
    &-submit {
      @extend .fido2_lib_page-register-submit;
    }
    &-output_title {
      @extend .fido2_lib_page-register-output_title;
    }
    &-output {
      @extend .fido2_lib_page-register-output;
    }
  }
}
</style>
