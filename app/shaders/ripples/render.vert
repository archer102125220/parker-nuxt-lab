// 設定預設的浮點數精確度為高
precision highp float;

// 頂點位置
attribute vec2 vertex;
// 背景圖片映射的左上角和右下角座標
uniform vec2 topLeft;
uniform vec2 bottomRight;
// 容器(Canvas)的寬高比，用來校正水波紋形狀不被拉伸變形
uniform vec2 containerRatio;
// 傳遞給片段著色器的水波紋座標
varying vec2 ripplesCoord;
// 傳遞給片段著色器的背景圖片座標
varying vec2 backgroundCoord;

void main() {
  // 根據傳入的範圍將頂點映射到背景圖片的座標
  backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);
  // Y 軸反轉，以符合 WebGL 紋理坐標系統
  backgroundCoord.y = 1.0 - backgroundCoord.y;
  // 計算水波紋紋理的讀取座標，並乘上容器比例確保波紋是圓形
  ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;
  // 設定頂點位置，反轉 Y 軸
  gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);
}