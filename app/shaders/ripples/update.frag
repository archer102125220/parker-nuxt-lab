// 設定預設的浮點數精確度為高
precision highp float;

// 當前的水波紋狀態紋理
uniform sampler2D texture;
// 紋理中單個像素的偏移量 (用於取得相鄰像素)
uniform vec2 delta;

// 從頂點著色器接收的紋理座標
varying vec2 coord;

void main() {
  // 獲取當前座標的水波狀態資訊
  vec4 info = texture2D(texture, coord);

  // x 與 y 方向的偏移向量
  vec2 dx = vec2(delta.x, 0.0);
  vec2 dy = vec2(0.0, delta.y);

  // 取得上下左右四個相鄰像素的水波高度 (r 通道)，並計算平均值
  float average = (
    texture2D(texture, coord - dx).r +
    texture2D(texture, coord - dy).r +
    texture2D(texture, coord + dx).r +
    texture2D(texture, coord + dy).r
  ) * 0.25;

  // info.g 儲存的是垂直速度 (或者說高度的變化率)
  // 將平均高度與當前高度的差值乘上係數作為加速度，更新速度
  info.g += (average - info.r) * 2.0;
  // 套用阻尼係數 (0.995)，讓波浪隨時間逐漸衰減平息
  info.g *= 0.995;
  // 根據更新後的速度 (info.g) 來改變當前的水波高度 (info.r)
  info.r += info.g;

  // 輸出更新後的水波紋狀態
  gl_FragColor = info;
}