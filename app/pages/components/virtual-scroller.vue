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
useHeadMataData({
  title: 'virtual-scroller組件測試'
});

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
    /* Display & Box Model */
    margin-bottom: 16px;
  }
  &-scroller {
    /* Display & Box Model */
    border: 1px solid #000;

    &-item {
      /* Display & Box Model */
      height: var(--item_height);
    }
  }
}
</style>
