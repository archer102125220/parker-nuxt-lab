<template>
  <div class="web_authn_page">
    <div class="web_authn_page-register">
      <form @submit.prevent="handleWebAuthnRegister">
        <p class="web_authn_page-register-title">向伺服器註冊生物辨識資料</p>
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
const nuxtApp = useNuxtApp();
useHead({
  title: '生物辨識測試'
});

const registerAccount = ref('');
const registerName = ref('');
const registerOutput = ref('');
const loginAccount = ref('');
const loginOutput = ref('');

async function handleWebAuthnRegister() {
  try {
    const challengeString =
      await nuxtApp.$webAuthn.GET_webAuthnGenerateChallenge();
    const challenge = Uint8Array.from(challengeString.split(','));

    const userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=';
    const id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));

    const publicKeyCredentialCreationOptions = {
      challenge,
      rp: {
        name: 'Tech Bridge'
        // id: 'techbridge.inc'
      },
      user: {
        id,
        name: registerAccount.value,
        displayName: registerName.value
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
      authenticatorSelection: {
        authenticatorAttachment: 'platform'
      },
      timeout: 60000,
      attestation: 'direct'
    };

    const credentials = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    });

    // const challenge = new Uint8Array(32);
    // window.crypto.getRandomValues(challenge);

    // const userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=';
    // const id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));

    // const publicKeyCredentialCreationOptions = {
    //   challenge,
    //   rp: {
    //     name: 'Tech Bridge',
    //     id: 'techbridge.inc'
    //   },
    //   user: {
    //     id,
    //     name: 'arvin@techbridge.cc',
    //     displayName: 'Arvin'
    //   },
    //   pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
    //   authenticatorSelection: {
    //     authenticatorAttachment: 'platform'
    //   },
    //   timeout: 60000,
    //   attestation: 'direct'
    // };
    // const credentials = await navigator.credentials.create(
    //   publicKeyCredentialCreationOptions
    // );

    console.log({
      credentials,
      // challengeString,
      challenge,
      registerAccount: registerAccount.value,
      registerName: registerName.value
    });
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
  }
}
</style>
