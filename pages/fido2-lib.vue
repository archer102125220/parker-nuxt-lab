<template>
  <div class="fido2_lib_page">
    <h1>fido2-lib套件的方式為主的方式實作</h1>
    <div class="fido2_lib_page-outbound_link">
      <p>記錄筆記：</p>
      <a
        href="https://www.notion.so/Web-Authn-6480f13abf224ef59a41571df1531f6a"
        target="_blank"
      >
        notion筆記連結
      </a>
    </div>
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
        <!-- <v-text-field
          clearable
          label="帳號"
          class="fido2_lib_page-login-id"
          v-model="loginId"
        /> -->
        <v-text-field
          disabled
          label="模擬伺服器已儲存的帳號"
          class="fido2_lib_page-login-id"
          v-model="serverSaveUserId"
        />
        <v-checkbox
          v-model="rememberMe"
          :value="true"
          color="primary"
          label="模擬啟用”記住我“的登入(手機強制啟用)"
          :disabled="rememberMeDisable"
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
const system = nuxtApp.$store?.system;
useHead({
  title: '生物辨識測試(fido2-lib)'
});

const credentialId = ref(null);
const credentialPublicKeyPem = ref(null);
const credentialTransports = ref(null);
const credentialType = ref(null);
// const credentialPublicKeyJwk = ref(null);
// const publicKey = ref('');
const serverSaveUserId = ref(null);

const registerId = ref('testId');
const registerAccount = ref('testAccount');
const registerName = ref('testName');
const registerWebApiOutput = ref(null);
const registerOutput = ref(null);

// const loginId = ref('testId');
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
    // const rpId =
    //   typeof location?.hostname === 'string' ? location.hostname : undefined;

    console.log({
      publicKeySetting: {
        ...publicKeySetting,
        rp: {
          // id: rpId,
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
          // id: rpId,
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

    // const credentialJSON = credential.toJSON(); // ios safari 的憑證沒有toJSON方法
    const credentialJSON = {
      authenticatorAttachment: credential.authenticatorAttachment,
      id: credential.id, // 前端要存
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
        transports: credential.response.getTransports() // 前端要存
      },
      type: credential.type // 前端要存
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

    // const _publicKey = base64Js.decode(
    //   response.base64URLServerSaveData.publicKey
    // );
    const _credentialPublicKeyPem = base64Js.decode(
      response.base64URLServerSaveData.credentialPublicKeyPem
    );
    // const _credentialPublicKeyJwk = JSON.parse(
    //   base64Js.decode(response.base64URLServerSaveData.credentialPublicKeyJwk)
    // );

    console.log({
      response,
      credentialJSON,
      credentialPublicKeyPem: _credentialPublicKeyPem,
      // credentialPublicKeyJwk: _credentialPublicKeyJwk,
      credentialId: base64Js.toUint8Array(
        response?.base64URLServerSaveData?.resultId
      )
    });
    registerOutput.value = response;
    // localStorage.setItem('fido2_lib_credential_id', credential.id);
    // localStorage.setItem(
    //   'fido2_lib_transports',
    //   JSON.stringify(credential.response.getTransports())
    // );
    // localStorage.setItem('fido2_lib_type', credential.type);
    credentialId.value = response?.base64URLServerSaveData?.resultId;
    credentialTransports.value = credential.response.getTransports();
    credentialType.value = credential.type;
    serverSaveUserId.value = response?.base64URLServerSaveData?.userId;

    credentialPublicKeyPem.value = _credentialPublicKeyPem;
    // credentialPublicKeyJwk.value = _credentialPublicKeyJwk;
    // publicKey.value = _publicKey;

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
    // console.log({
    //   loginId: loginId.value,
    //   credentialId: base64Js.toUint8Array(credentialId.value)
    // });

    const publicKeySetting = await nuxtApp.$fido2Lib.GET_fido2LibGenerateOption(
      {
        isLogin: true,
        // credentialId: localStorage.getItem('fido2_lib_credential_id'),
        credentialId: credentialId.value
      }
    );

    console.log(publicKeySetting);

    let allowCredentials;
    if (rememberMe.value === true) {
      allowCredentials = [
        // 使用前端儲存的金鑰識別id、金鑰type、無密碼驗證方式
        {
          // id: base64Js.toUint8Array(
          //   localStorage.getItem('fido2_lib_credential_id')
          // ), // from registration
          id: base64Js.toUint8Array(credentialId.value), // from registration

          // type: 'public-key',
          // type: localStorage.getItem('fido2_lib_type'),
          type: credentialType.value,

          // transports: ['internal', 'usb', 'ble', 'nfc'],
          // transports: JSON.parse(localStorage.getItem('fido2_lib_transports')),
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
        // credentialPublicKeyJwk: base64Js.encodeURL(
        //   JSON.stringify(credentialPublicKeyJwk.value)
        // ),
        // publicKey: base64Js.encodeURL(JSON.stringify(publicKey.value)),
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
.fido2_lib_page {
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
