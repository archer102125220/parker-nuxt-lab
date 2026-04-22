// 設定預設的浮點數精確度為高
precision highp float;

// 圓周率常數，用於計算水滴形狀
const float PI = 3.141592653589793;
// 當前的水波紋狀態紋理
uniform sampler2D texture;
// 水滴落在畫布上的中心位置
uniform vec2 center;
// 水滴的影響半徑
uniform float radius;
// 水滴的強度（波浪高度）
uniform float strength;

// 從頂點著色器接收的紋理座標
varying vec2 coord;

void main() {
  // 獲取當前座標的水波紋狀態 (r 通道代表高度)
  vec4 info = texture2D(texture, coord);

  // 計算當前像素與水滴中心的距離，並歸一化 (0 到 1，中心點最強)
  float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);
  // 使用餘弦函數讓水滴邊緣平滑過渡 (產生水波形狀)
  drop = 0.5 - cos(drop * PI) * 0.5;

  // 將計算出的水滴強度加到當前水波高度 (r 通道)
  info.r += drop * strength;

  // 輸出更新後的水波紋狀態
  gl_FragColor = info;
}