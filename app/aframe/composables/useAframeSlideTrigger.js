import { useAframe } from '@app/aframe/hooks/useAframe';
import { useVrStore } from '@app/store/360vrStore';

export function useAframeSlideTrigger(aframeConfig) {
  const aframe = useAframe(aframeConfig);
  const vrStore = useVrStore();
  const componentName = 'aframe-slide-trigger';

  watch(
    () => aframe.value.api,
    (newAframe) => {
      handleRegister(newAframe);
    },
    { deep: true }
  );

  function handleRegister(newAframe) {
    if (
      newAframe === null ||
      newAframe.components[componentName] !== undefined
    ) {
      return;
    }

    newAframe.registerComponent(componentName, {
      schema: {
        slideImgList: { type: 'string', default: '[]' },
      },
      init: function () {
        this.vrStore = vrStore;
        this.el.setAttribute('data-raycastable', '');

        const { slideImgList } = this.data;

        try {
          this.slideImgList = JSON.parse(slideImgList);
        } catch (error) {
          this.slideImgList = [];
        }
        this.onTriggerClick = this.onTriggerClick.bind(this);

        this.el.addEventListener('click', this.onTriggerClick);
      },
      onTriggerClick: function () {
        if (this.vrStore.isVrArMode === false) {
          this.vrStore.setSlideTrigger(true);
        }
        this.vrStore.setSlideImgList(this.slideImgList);
      },
    });
  }

  return { handleRegister, aframe };
}
