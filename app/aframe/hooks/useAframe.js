// https://github.com/aframevr/aframe-inspector
export function useAframe({
  beforeAframeLoad,
  getAframe,
  afterAframeLoad,
  isMounted = true,
} = {}) {
  const aframe = useState('__aframe', () => ({ init: null, api: null }));
  onMounted(async () => {
    aframe.value.init = aframeInit;
    if (isMounted === true) {
      await aframeInit();
    }
  });
  async function aframeInit() {
    try {
      if (window.AFRAME !== undefined && process.env.IS_DEV) {
        console.log('%cAFrame has been loaded.', 'color: #ef9b00;');
      }

      if (typeof beforeAframeLoad === 'function') {
        await beforeAframeLoad();
      }

      await import('aframe');

      handleModule();

      await Promise.all([
        import('aframe-event-set-component'),
        import('aframe-environment-component'),
        import('aframe-extras'),
        import('aframe-text-geometry-component'),
        import('aframe-html-shader'),
      ]);

      if (typeof getAframe === 'function') {
        await getAframe(window.AFRAME);
      }

      const html = document.querySelector('html');
      const hasClassName = html.classList.value.includes('a-fullscreen');
      if (hasClassName === false) {
        html.classList.add('a-fullscreen');
      }

      aframe.value.api = window.AFRAME;

      await nextTick();

      if (typeof afterAframeLoad === 'function') {
        afterAframeLoad(window.AFRAME);
      }
    } catch (error) {
      console.error(error);
    }

    return window?.AFRAME;
  }

  function handleModule() {
    // aframe-html-shader所使用的 three.js版本過舊，需做以下處理
    window.THREE.Math = {
      nearestPowerOfTwo: window.THREE.MathUtils.floorPowerOfTwo,
    };
    Object.keys(window.THREE.MathUtils).forEach((key) => {
      window.THREE.Math[key] = window.THREE.MathUtils[key];
    });
    window.THREE._PlaneGeometry = window.THREE.PlaneGeometry;
    window.THREE.PlaneGeometry = class newPlaneGeometry extends (
      window.THREE._PlaneGeometry
    ) {
      constructor(...arg) {
        super(...arg);
        this.metadata = this.metadata || {};
        this.metadata.parameters = this.parameters || {
          width: 1,
          height: 1,
          widthSegments: 1,
          heightSegments: 1,
        };
      }
    };

    // 修改手機停用重力感應裝置下之操作模式並反轉拖動方向
    const PI_2 = Math.PI / 2;
    window.AFRAME.components['look-controls'].Component.prototype.onTouchMove =
      function (evt) {
        const canvas = this.el.sceneEl.canvas;
        const pitchObject = this.pitchObject;
        const yawObject = this.yawObject;

        if (!this.touchStarted || !this.data.touchEnabled) {
          return;
        }

        const deltaY =
          (2 * Math.PI * (evt.touches[0].pageX - this.touchStart.x)) /
          canvas.clientWidth;
        const deltaX =
          (2 * Math.PI * (evt.touches[0].pageY - this.touchStart.y)) /
          canvas.clientHeight;

        // Allow touch orientaion to both x and y
        const direction = this.data.reverseTouchDrag ? 1 : -1;
        // Limit touch orientaion to to yaw (y axis).
        yawObject.rotation.y -= deltaY * 0.5 * direction;
        pitchObject.rotation.x -= deltaX * 0.5 * direction;
        pitchObject.rotation.x = Math.max(
          -PI_2,
          Math.min(PI_2, pitchObject.rotation.x)
        );
        this.touchStart = {
          x: evt.touches[0].pageX,
          y: evt.touches[0].pageY,
        };
      };
    // 反轉拖動方向
    window.AFRAME.components['look-controls'].Component.prototype.onMouseMove =
      function (evt) {
        let movementX;
        let movementY;
        const pitchObject = this.pitchObject;
        const previousMouseEvent = this.previousMouseEvent;
        const yawObject = this.yawObject;

        // Not dragging or not enabled.
        if (!this.data.enabled || (!this.mouseDown && !this.pointerLocked)) {
          return;
        }

        // Calculate delta.
        if (this.pointerLocked) {
          movementX = evt.movementX || evt.mozMovementX || 0;
          movementY = evt.movementY || evt.mozMovementY || 0;
        } else {
          movementX = evt.screenX - previousMouseEvent.screenX;
          movementY = evt.screenY - previousMouseEvent.screenY;
        }
        this.previousMouseEvent.screenX = evt.screenX;
        this.previousMouseEvent.screenY = evt.screenY;

        // Calculate rotation.
        const direction = this.data.reverseMouseDrag ? 1 : -1;
        yawObject.rotation.y -= movementX * 0.002 * direction;
        pitchObject.rotation.x -= movementY * 0.002 * direction;
        pitchObject.rotation.x = Math.max(
          -PI_2,
          Math.min(PI_2, pitchObject.rotation.x)
        );
      };
  }

  onBeforeUnmount(() => {
    const html = document.querySelector('html');
    const hasClassName = html.classList.value.includes('a-fullscreen');
    if (hasClassName === true) {
      html.classList.remove('a-fullscreen');
    }
  });

  return aframe;
}
