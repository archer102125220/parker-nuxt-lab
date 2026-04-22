// 定義頂點的位置屬性
attribute vec2 vertex;
// 傳遞給片段著色器(Fragment Shader)的紋理座標
varying vec2 coord;

void main() {
  // 將頂點座標 (從 -1 到 1) 轉換為紋理座標 (從 0 到 1)
  coord = vertex * 0.5 + 0.5;
  // 設定頂點位置，Z 為 0，W 為 1 (標準 2D 平面)
  gl_Position = vec4(vertex, 0.0, 1.0);
}