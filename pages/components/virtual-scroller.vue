<template>
  <div class="virtual_scroller_page" @scroll="pageScroll">
    <p class="virtual_scroller_page-title">vuetifyjs:</p>
    <v-virtual-scroll
      class="virtual_scroller_page-scroller"
      :height="300"
      :items="itemList"
    >
      <template v-slot:default="{ item, index }">
        <p
          class="virtual_scroller_page-scroller-item"
          :style="{ '--item_height': `${24 * (index || 1)}px` }"
        >
          Item {{ item }}
        </p>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script setup>
const itemList = computed(() => {
  return [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30'
  ];
});

function pageScroll(e) {
  console.log({ e });
}
</script>

<style lang="scss">
.virtual_scroller_page {
  &-title {
    margin-bottom: 16px;
  }
  &-scroller {
    border: 1px solid #000;
    &-item {
      height: var(--item_height);
    }
  }
}
</style>
