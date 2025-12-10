<template>
  <section class="face_swap_index_page">
    <v-img
      class="face_swap_index_page-banner"
      max-height="300"
      cover
      src="/img/face-api/face-api-v.04.webp"
    />

    <h1 class="face_swap_index_page-title">AI 人臉替換</h1>
    <p class="face_swap_index_page-subtitle">選擇實作版本</p>

    <div class="face_swap_index_page-cards">
      <v-card
        class="face_swap_index_page-cards-card"
        :to="localePath('/face-swap/frontend')"
        hover
      >
        <v-card-item>
          <v-card-title>
            <v-icon start>mdi-monitor</v-icon>
            純前端版本
          </v-card-title>
        </v-card-item>
        <v-card-text>
          使用 face-api.js + Canvas 實現，適合快速測試，效果較基礎。
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="text">進入</v-btn>
        </v-card-actions>
      </v-card>

      <v-card
        class="face_swap_index_page-cards-card face_swap_index_page-cards-card--coming_soon"
        :to="localePath('/face-swap/backend')"
        hover
      >
        <v-chip
          class="face_swap_index_page-cards-card-chip"
          color="warning"
          size="small"
        >
          開發中
        </v-chip>
        <v-card-item>
          <v-card-title>
            <v-icon start>mdi-server</v-icon>
            後端 AI 版本
          </v-card-title>
        </v-card-item>
        <v-card-text>
          使用 Node.js 後端 + AI 模型，效果更精緻，敬請期待！
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="text">查看</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </section>
</template>

<script setup>
const localePath = useLocalePath();

useHeadMataData({
  title: 'AI 人臉替換'
});
</script>

<style lang="scss" scoped>
.face_swap_index_page {
  /* Display & Box Model */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 0 16px 32px;

  /* Typography */
  font-family: sans-serif;

  &-banner {
    /* Display & Box Model */
    width: 100%;
    max-width: 800px;
    margin-bottom: 24px;

    /* Visual */
    border-radius: 8px;
  }

  &-title {
    /* Display & Box Model */
    margin-bottom: 8px;

    /* Typography */
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }

  &-subtitle {
    /* Display & Box Model */
    margin-bottom: 32px;

    /* Typography */
    font-size: 1.2rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }

  &-cards {
    /* Display & Box Model */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    width: 100%;
    max-width: 800px;

    &-card {
      /* Positioning */
      position: relative;

      /* Misc */
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-4px);
      }

      &--coming_soon {
        /* Visual */
        opacity: 0.85;
      }

      &-chip {
        /* Positioning */
        position: absolute;
        top: 12px;
        right: 12px;
      }
    }
  }
}
</style>
