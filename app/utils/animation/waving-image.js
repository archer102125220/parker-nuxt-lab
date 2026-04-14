export function initWavingImageDOM({
  imageDOM,
  amplitude = 30, // 振幅
  period = 2, // 周期数
  frequency = 1, // 频率
  fps = 70, // 每秒帧数
  stop = false // 停止动画
} = {}) {
  let img = imageDOM;
  if (typeof imageDOM === 'string') {
    img = document.getElementById(imageDOM);
  }

  if (!img) {
    console.error('imageDOM is not a image element');
    return;
  }

  const div = document.createElement('div');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  div.appendChild(canvas);
  img.replaceWith(div);
  div.appendChild(img);

  const imgWidth = Math.floor(img.width);
  const imgHeight = Math.floor(img.height);
  const canvasWidth = imgWidth;
  const canvasHeight = imgHeight + amplitude * 2;

  // div.style.width = canvasWidth + "px";
  // div.style.height = canvasHeight + "px";
  // div.style.overflow = "hidden";
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const wavelength = imgWidth / period; // 波长
  const waveSpeed = wavelength * frequency; // 波速
  const spatialFrequency = (2 * Math.PI) / wavelength; // x系数
  const amplitudeRatio = amplitude / imgWidth; // 振幅系数

  const interval = 1000 / fps; // 连续帧之间间隔（理论）
  let timeNow = Date.now(); // 当前时间
  let timeLast = timeNow; // 上一帧时间
  let delta = 0; // 连续帧之间间隔（实际）

  let distance = 0;
  function animateFrame() {
    if (stop) return false;
    timeNow = Date.now();
    delta = timeNow - timeLast;
    if (delta > interval) {
      // console.log(img)
      timeLast = timeNow;
      distance += (delta / 1000) * waveSpeed;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      for (let x = 0; x < imgWidth; x++) {
        const y =
          amplitudeRatio * x * Math.sin(spatialFrequency * (x - distance)) +
          amplitude;
        ctx.drawImage(img, x, 0, 1, imgHeight, x, y, 1, imgHeight);
      }
    }

    requestAnimationFrame(animateFrame);
  }

  requestAnimationFrame(animateFrame);
  requestAnimationFrame(function () {
    img.style.display = 'none';
  });
}
