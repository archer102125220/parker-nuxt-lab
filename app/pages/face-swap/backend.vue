<template>
  <section class="face_swap_backend_page">
    <v-btn
      class="face_swap_backend_page-back_btn"
      to="/face-swap"
      variant="text"
    >
      <v-icon start>mdi-arrow-left</v-icon>
      返回
    </v-btn>

    <v-img
      class="face_swap_backend_page-banner"
      max-height="200"
      cover
      src="/img/face-api/face-api-v.04.webp"
    />

    <h1 class="face_swap_backend_page-title">後端 AI 人臉替換</h1>

    <v-alert
      class="face_swap_backend_page-alert"
      type="info"
      variant="tonal"
      prominent
    >
      <v-alert-title>功能開發中</v-alert-title>
      此功能正在開發中，敬請期待！
    </v-alert>

    <div class="face_swap_backend_page-info">
      <h2>預計使用技術</h2>
      <v-list>
        <v-list-item prepend-icon="mdi-nodejs">
          <v-list-item-title>Node.js 後端 API</v-list-item-title>
        </v-list-item>
        <v-list-item prepend-icon="mdi-face-recognition">
          <v-list-item-title
            >InsightFace / DeepFaceLab AI 模型</v-list-item-title
          >
        </v-list-item>
        <v-list-item prepend-icon="mdi-gpu">
          <v-list-item-title>伺服器端 GPU 加速處理</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>

    <v-btn
      class="face_swap_backend_page-action_btn"
      to="/face-swap/frontend"
      color="primary"
      size="large"
    >
      先試試純前端版本
    </v-btn>
  </section>
</template>

<script setup>
useHeadMataData({
  title: '後端 AI 人臉替換 - 開發中'
});
</script>

<style lang="scss" scoped>
.face_swap_backend_page {
  /* Display & Box Model */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 16px 16px 32px;

  /* Typography */
  font-family: sans-serif;

  &-back_btn {
    /* Display & Box Model */
    align-self: flex-start;
    margin-bottom: 16px;
  }

  &-banner {
    /* Display & Box Model */
    width: 100%;
    max-width: 600px;
    margin-bottom: 24px;

    /* Visual */
    border-radius: 8px;
    opacity: 0.7;
  }

  &-title {
    /* Display & Box Model */
    margin-bottom: 24px;

    /* Typography */
    font-size: 1.8rem;
    font-weight: 700;
    text-align: center;
  }

  &-alert {
    /* Display & Box Model */
    width: 100%;
    max-width: 500px;
    margin-bottom: 32px;
  }

  &-info {
    /* Display & Box Model */
    width: 100%;
    max-width: 500px;
    margin-bottom: 32px;

    h2 {
      /* Display & Box Model */
      margin-bottom: 16px;

      /* Typography */
      font-size: 1.2rem;
      text-align: center;
    }
  }

  &-action_btn {
    /* Display & Box Model */
    margin-top: auto;
  }
}
</style>
