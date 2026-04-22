// 設定預設的浮點數精確度為高
precision highp float;

// 背景圖片紋理
uniform sampler2D samplerBackground;
// 包含水波高度資訊的紋理
uniform sampler2D samplerRipples;
// 單個像素的偏移量，用於計算法向量
uniform vec2 delta;

// 擾動強度，控制水波折射的明顯程度
uniform float perturbance;
// 水波紋紋理的座標
varying vec2 ripplesCoord;
// 背景圖片的座標
varying vec2 backgroundCoord;

void main() {
  // 取得當前點以及相鄰(右、下)點的水波高度
  float height = texture2D(samplerRipples, ripplesCoord).r;
  float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;
  float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;
  
  // 利用相鄰高度差計算出 X 和 Y 方向的三維切向量
  vec3 dx = vec3(delta.x, heightX - height, 0.0);
  vec3 dy = vec3(0.0, heightY - height, delta.y);
  
  // 外積求得法線向量，並取 xz 平面作為 2D 偏移量 (用於折射)
  vec2 offset = -normalize(cross(dy, dx)).xz;
  
  // 計算鏡面反射高光 (Specular highlight)，假設光源方向為 (-0.6, 1.0)
  float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);
  
  // 從背景紋理中讀取受偏移量與擾動強度影響的顏色，並疊加高光亮度
  gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;
}