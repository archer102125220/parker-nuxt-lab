<template>
  <section class="enter_label_page">
    <p class="enter_label_page-demo_title">展示：</p>
    <AnimationEnterLabel class="enter_label_page-demo" :label="demoLabel" />

    <form class="enter_label_page-form" @submit.prevent="handleDemoLabel">
      <p class="enter_label_page-form-title">測試文字：</p>
      <v-text-field
        clearable
        label="測試文字"
        class="enter_label_page-form-input"
        v-model="demoInput"
      />

      <div class="enter_label_page-form-submit">
        <v-btn color="primary" type="submit">更新</v-btn>
      </div>
    </form>
  </section>
</template>

<script setup>
useHead({
  title: '文字特效測試'
});

const demoLabel = ref('Parker的Nuxt實驗室');
const demoInput = ref('Parker的Nuxt實驗室');

function handleDemoLabel() {
  demoLabel.value = demoInput.value;
}
</script>

<style lang="scss">
.enter_label_page {
  &-demo_title {
  }
  &-demo {
    min-height: 24px;
    margin-bottom: 16px;
  }
  &-form {
    &-title {
    }
    &-input {
    }
    &-submit {
    }
  }
}
</style>
