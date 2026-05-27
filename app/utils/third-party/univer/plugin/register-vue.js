import { loadScript } from '@app/utils/helpers/load-script';
import { UNIVERSAL_VERSION } from '@/app/utils/third-party/univer/import-univer';

import IconFolder from '@app/components/Icon/Folder.vue';
import IconCSV from '@app/components/Icon/CSV.vue';

export function importRegisterVue(univerInstance, tryLimit = 10, tryCount = 0) {
  if (typeof univerInstance !== 'object' || univerInstance === null) {
    console.error('[importRegisterVue] univerInstance is not an object');
    return;
  }
  return new Promise(async (resolve, reject) => {
    const { UniverUi = {} } = window;

    const { UniverUIPlugin } = UniverUi;

    if (typeof UniverUIPlugin === 'undefined') {
      if (tryCount < tryLimit) {
        return setTimeout(() => {
          resolve(importRegisterVue(univerInstance, tryLimit, tryCount + 1));
        }, 500);
      }
      return reject(new Error('Failed to load Univer dependencies'));
    }

    const univerUiAdapterVue3DependecyList = [
      { id: 'vue3', src: 'https://unpkg.com/vue@3/dist/vue.global.js' }
    ];

    await Promise.all(
      univerUiAdapterVue3DependecyList.map((item) =>
        loadScript(item.id, item.src)
      )
    );

    const univerUiAdapterVue3ScriptList = [
      {
        id: 'univerjs-ui-adapter-vue3',
        src: `https://unpkg.com/@univerjs/ui-adapter-vue3@${UNIVERSAL_VERSION}/lib/umd/index.js`
      }
    ];
    await Promise.all(
      univerUiAdapterVue3ScriptList.map((item) => loadScript(item.id, item.src))
    );

    const { UniverUiAdapterVue3 = {} } = window;
    const { UniverVue3AdapterPlugin } = UniverUiAdapterVue3;

    if (
      typeof UniverVue3AdapterPlugin === 'undefined' ||
      typeof univerInstance?.univer?.registerPlugin === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        return setTimeout(() => {
          resolve(importRegisterVue(univerInstance, tryLimit, tryCount + 1));
        }, 500);
      }
      return reject(new Error('Failed to load Univer dependencies'));
    }

    const { univer, univerAPI, ...orthers } = univerInstance;
    try {
      univer.registerPlugin(UniverVue3AdapterPlugin);
      univerAPI.registerComponent('Vue3FolderIcon', IconFolder, {
        framework: 'vue3'
      });
      univerAPI.registerComponent('Vue3CSVIcon', IconCSV, {
        framework: 'vue3'
      });
    } catch (error) {
      // reject(error);
      if (import.meta.dev) {
        console.error('registerPlugin UniverVue3AdapterPlugin error', error);
      }
    }
    resolve({ univer, univerAPI, ...orthers });
  });
}
