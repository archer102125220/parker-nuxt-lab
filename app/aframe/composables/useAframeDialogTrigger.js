import { useAframe } from '@app/aframe/hooks/useAframe';
import { useVrStore } from '@app/store/360vrStore';

export function useAframeDialogTrigger(aframeConfig) {
  const aframe = useAframe(aframeConfig);
  const vrStore = useVrStore();
  const componentName = 'aframe-dialog-trigger';

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
        dialogTitle: { type: 'string', default: '' },
        dialogContent: { type: 'string', default: '' },
        dialogImg: { type: 'string', default: '' },
        windowTop: { type: 'string', default: '' },
      },
      init: function () {
        this.vrStore = vrStore;
        this.el.setAttribute('data-raycastable', '');

        const { dialogTitle, dialogContent, dialogImg, windowTop } = this.data;

        this.dialogTitle = dialogTitle;
        this.dialogContent = dialogContent;
        this.dialogImg = dialogImg;
        this.windowTop = windowTop;

        this.onTriggerClick = this.onTriggerClick.bind(this);

        this.el.addEventListener('click', this.onTriggerClick);
      },
      onTriggerClick: function () {
        if (this.vrStore.isVrArMode === true) {
          return;
        }

        this.vrStore.setDialogTrigger(true);
        this.vrStore.setDialogTitle(this.dialogTitle);
        this.vrStore.setDialogContent(this.dialogContent);
        this.vrStore.setDialogImg(this.dialogImg);
        this.vrStore.setDialogWindowTop(this.windowTop);
      },
    });
  }

  return { handleRegister, aframe };
}
