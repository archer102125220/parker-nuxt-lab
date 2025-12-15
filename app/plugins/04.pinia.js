import { useSystemStore } from '@app/store/system';

export default defineNuxtPlugin(({ $pinia }) => {
  console.log('pinia plugin loading...');

  const system = useSystemStore($pinia);

  console.log('pinia plugin loaded');
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
          if (typeof window._pluginwareHandleResize_ !== 'function') {
            function _pluginwareHandleResize_() {
              system.setWindowInnerSize({
                width: window.innerWidth,
                height: window.innerHeight,
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
            window._pluginwareHandleResize_ = _pluginwareHandleResize_;
            _pluginwareHandleResize_();
            window.addEventListener('resize', window._pluginwareHandleResize_);
          }

          if (typeof window._pluginwareHandleResize_ !== 'function') {
            return () =>
              window.removeEventListener(
                'resize',
                window._pluginwareHandleResize_
              );
          }
          return () => {};
        }
      }
    }
  };
});
