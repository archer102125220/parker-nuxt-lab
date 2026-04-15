import { useSystemStore } from '@app/store/system';
import { useWindowSize } from '@app/composables/useWindowSize';

export default defineNuxtPlugin(({ $pinia }) => {
  const system = useSystemStore($pinia);

  return {
    provide: {
      successMessage(text) {
        system.setMessageState({ text, type: 'success' });
      },
      warningMessage(text) {
        system.setMessageState({ text, type: 'warning' });
      },
      errorMessage(text) {
        system.setMessageState({ text, type: 'error' });
      },
      infoMessage(text) {
        system.setMessageState({ text, type: 'info' });
      },
      store: {
        system,
        clientInit() {
          const { windowSize } = useWindowSize();

          const stopWatch = watch(
            () => windowSize.value,
            (newWindowSize) => {
              console.log({ newWindowSize });
              system.setWindowInnerSize({
                width: newWindowSize.width,
                height: newWindowSize.height,
                // 最好與 style\mixin.scss 的 @mixin mobile 設定一樣
                isMobile: window.matchMedia('(max-width: 707px)').matches,
                // 最好與 style\mixin.scss 的 @mixin tabletOnly 設定一樣
                isTabletOnly: window.matchMedia(
                  '(min-width: 708px) and (max-width: 1140px)'
                ).matches,
                // 最好與 style\mixin.scss 的 @mixin tablet 設定一樣
                isTablet: window.matchMedia('(max-width: 1140px)').matches
              });
            }
          );

          return () => {
            stopWatch();
          };
        }
      }
    }
  };
});
