import { useAframe } from '@app/aframe/hooks/useAframe';
import { useVrStore } from '@app/store/360vrStore';

export function useAframeDialogVideo(aframeConfig) {
  const aframe = useAframe(aframeConfig);
  const vrStore = useVrStore();
  const componentName = 'aframe-dialog-video-trigger';

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
        dialogVideoTitle: { type: 'string', default: '' },
        videoSrc: { type: 'string', default: '' },
        youtubeId: { type: 'string', default: '' },
        vrDialogVideoId: { type: 'string', default: '' },
      },
      init: function () {
        this.vrStore = vrStore;
        this.el.setAttribute('data-raycastable', '');

        const { dialogVideoTitle, videoSrc, youtubeId } = this.data;

        this.dialogVideoTitle = dialogVideoTitle;
        this.videoSrc = videoSrc;
        this.youtubeId = youtubeId;

        this.onTriggerClick = this.onTriggerClick.bind(this);

        this.el.addEventListener('click', this.onTriggerClick);
      },
      onTriggerClick: function () {
        if (this.vrStore.isVrArMode === false) {
          this.vrStore.setVideoTrigger(true);
        } else {
          const vrDialogId = this.data.vrDialogId;
          if (import.meta.dev) {
            console.log({ vrDialogId });
          }
        }

        this.vrStore.setVideoTitle(this.dialogVideoTitle);
        this.vrStore.setVideoSrc(this.videoSrc);
        this.vrStore.setYoutubeId(this.youtubeId);
      },
    });
  }

  return { handleRegister, aframe };
}
