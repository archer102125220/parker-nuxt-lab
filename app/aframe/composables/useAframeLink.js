import { useAframe } from '@app/aframe/composables/useAframe';
import { useAFrameStore } from '@app/store/aFrameStore';

export function useAframeLink(aframeConfig) {
  const aframe = useAframe(aframeConfig);
  const vrStore = useAFrameStore();
  const router = useRouter();
  const componentName = 'aframe-link';

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
        linkPath: { type: 'string', default: '' },
        linkQyery: { type: 'string', default: '{}' }
      },
      init: function () {
        this.vrStore = vrStore;
        this.el.setAttribute('data-raycastable', '');

        const { linkPath, linkQyery } = this.data;

        this.linkPath = linkPath;
        try {
          this.linkQyery = JSON.parse(linkQyery);
        } catch (error) {
          if (import.meta.dev) {
            console.error(error);
          }
          this.linkQyery = {};
        }
        this.onLinkButtonClick = this.onLinkButtonClick.bind(this);

        this.el.addEventListener('click', this.onLinkButtonClick);
      },
      onLinkButtonClick: async function () {
        this.vrStore.setAFrameLoading(true);
        const skyDom = document.querySelector(
          '.' + aframe.value.api.skyAnimationClassName
        );
        await skyDom.onFadeout();
        router.push({ path: this.linkPath, query: this.linkQyery });
      }
    });
  }

  return { handleRegister, aframe };
}
