<template>
  <div class="hexagon">
    <div class="hexagon-drawing" />
  </div>
</template>

<style lang="scss">
@mixin triangle {
  // Positioning
  position: absolute; /* 相對定位，位置參照 .hexagon */

  // Display & Box Model
  width: 0;
  border-left: calc(var(--hexagon_width) / 2) solid transparent;
  border-right: calc(var(--hexagon_width) / 2) solid transparent;

  // Misc
  content: ''; /* 偽元素必須有 content 屬性 */
}
.hexagon {
  --hexagon_width: 100px;

  // Display & Box Model
  width: var(--hexagon_width);

  &-drawing {
    // --hexagon_height: 58px;
    --hexagon_height: calc(
      var(--hexagon_width) * 1.73205 / 3
    ); /* sqrt(3) 的近似值約為 1.73205 */

    // Positioning
    position: relative; /* 為了讓偽元素可以相對於它定位 */

    // Display & Box Model
    width: var(--hexagon_width);
    height: var(--hexagon_height);
    margin: calc(var(--hexagon_height) / 2) 0; /* 上下邊距，用來容納偽元素的高度 (高度的一半) */

    // Visual
    background-color: #6a0dad; /* 六邊形的顏色 (這裡用紫色作範例) */

    &::before {
      @include triangle;
      // Positioning
      bottom: 99%; /* 定位在 .hexagon 的下方 */

      // Display & Box Model
      border-bottom: calc(var(--hexagon_height) / 2) solid #6a0dad; /* 上方三角形的底邊，高度是 .hexagon 高度的一半，顏色與六邊形相同 */
    }
    &::after {
      @include triangle;
      // Positioning
      top: 99%; /* 定位在 .hexagon 的上方 */

      // Display & Box Model
      width: 0;
      border-top: calc(var(--hexagon_height) / 2) solid #6a0dad; /* 下方三角形的頂邊，高度是 .hexagon 高度的一半，顏色與六邊形相同 */
    }
  }
}
</style>
