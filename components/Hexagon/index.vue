<template>
  <div class="hexagon">
    <div class="hexagon-drawing" />
  </div>
</template>

<style lang="scss">
@mixin triangle {
  content: ''; /* 偽元素必須有 content 屬性 */
  position: absolute; /* 相對定位，位置參照 .hexagon */
  width: 0;
  // border-left: 50px solid transparent; /* 三角形的左邊框，寬度是 .hexagon 寬度的一半 */
  // border-right: 50px solid transparent; /* 三角形的右邊框，寬度是 .hexagon 寬度的一半 */
  border-left: calc(var(--hexagon_width) / 2) solid transparent;
  border-right: calc(var(--hexagon_width) / 2) solid transparent;
}
.hexagon {
  --hexagon_width: 100px;
  // height: 200px;
  width: var(--hexagon_width);

  &-drawing {
    // --hexagon_height: 58px;
    --hexagon_height: calc(
      var(--hexagon_width) * 1.73205 / 3
    ); /* sqrt(3) 的近似值約為 1.73205 */

    position: relative; /* 為了讓偽元素可以相對於它定位 */

    // width: 100px; /* 六邊形中間矩形部分的寬度 */
    // height: 57.735px; /* 六邊形中間矩形部分的高度 (寬度 * sqrt(3)/2 的一半，再乘以2) */
    width: var(--hexagon_width);
    // height: calc(var(--hexagon_width) * 1.73205 / 2);
    height: var(--hexagon_height);

    background-color: #6a0dad; /* 六邊形的顏色 (這裡用紫色作範例) */
    // margin: 28.8675px 0; /* 上下邊距，用來容納偽元素的高度 (高度的一半) */
    margin: calc(var(--hexagon_height) / 2) 0; /* 上下邊距，用來容納偽元素的高度 (高度的一半) */

    &::before {
      @include triangle;
      // bottom: 100%; /* 定位在 .hexagon 的下方 */
      bottom: 99%; /* 定位在 .hexagon 的下方 */
      // border-bottom: 28.8675px solid #6a0dad; /* 上方三角形的底邊，高度是 .hexagon 高度的一半，顏色與六邊形相同 */
      border-bottom: calc(var(--hexagon_height) / 2) solid #6a0dad; /* 上方三角形的底邊，高度是 .hexagon 高度的一半，顏色與六邊形相同 */
    }
    &::after {
      @include triangle;
      // top: 100%; /* 定位在 .hexagon 的上方 */
      top: 99%; /* 定位在 .hexagon 的上方 */
      width: 0;
      // border-top: 28.8675px solid #6a0dad; /* 下方三角形的頂邊，高度是 .hexagon 高度的一半，顏色與六邊形相同 */
      border-top: calc(var(--hexagon_height) / 2) solid #6a0dad; /* 下方三角形的頂邊，高度是 .hexagon 高度的一半，顏色與六邊形相同 */
    }
  }
}
</style>
