import { loadScript } from '@app/utils/helpers/load-script';
import { loadCSS } from '@app/utils/helpers/load-css';

const UNIVERSAL_VERSION = '0.23.0';
const UNIVER_SERVER_ENDPOINT = 'https://localhost:3000/api/univer-test';

export const LOCALE_TYPE = {
  get list() {
    return localeType.list;
  }
};
const localeType = {
  list: null
};
export const EVENT_TYPE = {
  get list() {
    return eventType.list;
  }
};
const eventType = {
  list: null
};

export async function importUniver() {
  if (typeof document === 'undefined') return;

  const dependecyScriptList = [
    {
      id: 'univer-react',
      src: 'https://unpkg.com/react@18.3.1/umd/react.production.min.js'
    },
    {
      id: 'univer-react-dom',
      src: 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js'
    },
    {
      id: 'univer-rxjs',
      src: 'https://unpkg.com/rxjs/dist/bundles/rxjs.umd.min.js'
    },
    {
      id: 'univer-echarts',
      src: 'https://unpkg.com/echarts@5.6.0/dist/echarts.min.js'
    }
  ];
  const univerCoreScriptList = [
    {
      id: 'univer-presets',
      src: `https://unpkg.com/@univerjs/presets@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
  ];
  const univerScriptList = [
    {
      id: 'univer-pro-license',
      src: `https://unpkg.com/@univerjs-pro/license@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
  ];
  const univerDocCoreScriptList = [
    {
      id: 'univer-preset-docs-core',
      src: `https://unpkg.com/@univerjs/preset-docs-core@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id:'univer-docs-ui-facade',
      src: `https://unpkg.com/@univerjs/docs-ui@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    }
  ];
  const univerDocScriptList = [
    {
      id: 'univer-preset-docs-hyper-link',
      src: `https://unpkg.com/@univerjs/preset-docs-hyper-link@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-docs-hyper-link-ui',
      src: `https://unpkg.com/@univerjs/docs-hyper-link-ui@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-preset-docs-drawing',
      src: `https://unpkg.com/@univerjs/preset-docs-drawing@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-drawing-ui',
      src: `https://unpkg.com/@univerjs/drawing-ui@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-docs-quick-insert-ui',
      src: `https://unpkg.com/@univerjs/docs-quick-insert-ui@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-preset-docs-thread-comment',
      src: `https://unpkg.com/@univerjs/preset-docs-thread-comment@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-watermark',
      src: `https://unpkg.com/@univerjs/watermark@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-watermark-facade',
      src: `https://unpkg.com/@univerjs/watermark@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    },
    {
      id: 'univer-uniscript',
      src: `https://unpkg.com/@univerjs/uniscript@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
  ];
  const univerLocaleList = [
    {
      id: 'univer-docs-core-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-docs-core@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-docs-core-en-us',
      src: `https://unpkg.com/@univerjs/preset-docs-core@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-docs-hyper-link-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-docs-hyper-link@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-docs-hyper-link-en-us',
      src: `https://unpkg.com/@univerjs/preset-docs-hyper-link@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-preset-docs-drawing-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-docs-drawing@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-preset-docs-drawing-en-us',
      src: `https://unpkg.com/@univerjs/preset-docs-drawing@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-docs-quick-insert-ui-zh-tw',
      src: `https://unpkg.com/@univerjs/docs-quick-insert-ui@${UNIVERSAL_VERSION}/lib/umd/locale/zh-TW.js`
    },
    {
      id: 'univer-docs-quick-insert-ui-en-us',
      src: `https://unpkg.com/@univerjs/docs-quick-insert-ui@${UNIVERSAL_VERSION}/lib/umd/locale/en-US.js`
    },
    {
      id: 'univer-preset-docs-thread-comment-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-docs-thread-comment@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-preset-docs-thread-comment-en-us',
      src: `https://unpkg.com/@univerjs/preset-docs-thread-comment@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    }
  ];
  const univerCSSList = [
    {
      id: 'univer-docs-core-css',
      src: `https://unpkg.com/@univerjs/preset-docs-core@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-preset-docs-hyper-link-css',
      src: `https://unpkg.com/@univerjs/preset-docs-hyper-link@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-preset-docs-drawing-css',
      src: `https://unpkg.com/@univerjs/preset-docs-drawing@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id:'univer-drawing-ui-css',
      src: `https://unpkg.com/@univerjs/drawing-ui@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-docs-quick-insert-ui-css',
      src: `https://unpkg.com/@univerjs/docs-quick-insert-ui@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-preset-docs-thread-comment-css',
      src: `https://unpkg.com/@univerjs/preset-docs-thread-comment@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-uniscript-css',
      src: `https://unpkg.com/@univerjs/uniscript@${UNIVERSAL_VERSION}/lib/index.css`
    }
  ];

  const querySelectorAllString = [
    ...dependecyScriptList.map((dependecyScript) => `#${dependecyScript.id}`),
    ...univerDocCoreScriptList.map(
      (sheetCoreScript) => `#${sheetCoreScript.id}`
    ),
    ...univerCoreScriptList.map((coreScript) => `#${coreScript.id}`),
    ...univerScriptList.map((univerScript) => `#${univerScript.id}`),
    ...univerDocScriptList.map(
      (univerDocScript) => `#${univerDocScript.id}`
    ),
    ...univerLocaleList.map(
      (univerLocaleScript) => `#${univerLocaleScript.id}`
    ),
    ...univerCSSList.map((univerCSSScript) => `#${univerCSSScript.id}`)
  ].join(',');

  if (document.querySelectorAll(querySelectorAllString).length > 0) {
    return;
  }

  const dependecyScriptPromiseList = dependecyScriptList.map(
    (dependecyScript) =>
      loadScript(
        dependecyScript.id,
        dependecyScript.src,
        dependecyScript.module
      )
  );
  await Promise.all(dependecyScriptPromiseList);

  const univerCoreScriptPromiseList = univerCoreScriptList.map((coreScript) =>
    loadScript(coreScript.id, coreScript.src, coreScript.module)
  );
  await Promise.all(univerCoreScriptPromiseList);

  const univerScriptPromiseList = univerScriptList.map((univerScript) =>
    loadScript(univerScript.id, univerScript.src, univerScript.module)
  );
  await Promise.all(univerScriptPromiseList);

  const univerDocCoreScriptPromiseList = univerDocCoreScriptList.map(
    (sheetCoreScript) =>
      loadScript(
        sheetCoreScript.id,
        sheetCoreScript.src,
        sheetCoreScript.module
      )
  );
  await Promise.all(univerDocCoreScriptPromiseList);

  const univerDocScriptPromiseList = univerDocScriptList.map(
    (univerDocScript) =>
      loadScript(
        univerDocScript.id,
        univerDocScript.src,
        univerDocScript.module
      )
  );
  await Promise.all(univerDocScriptPromiseList);

  await Promise.all([
    ...univerLocaleList.map((univerLocaleScript) =>
      loadScript(univerLocaleScript.id, univerLocaleScript.src)
    ),
    ...univerCSSList.map((univerCSSScript) =>
      loadCSS(univerCSSScript.id, univerCSSScript.src)
    )
  ]);
}

export async function importAdvancedDoc() {
  const univerProCroScriptList = [
    {
      id: 'univer-pro-engine-formula',
      src: `https://unpkg.com/@univerjs-pro/engine-formula@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-pro-print',
      src: `https://unpkg.com/@univerjs-pro/print@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    // {
    //   id: 'univer-pro-collaboration',
    //   src: `https://unpkg.com/@univerjs-pro/collaboration@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    {
      id: 'univer-pro-exchange-client',
      src:`https://unpkg.com/@univerjs-pro/exchange-client@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-pro-exchange-client-facade',
      src:`https://unpkg.com/@univerjs-pro/exchange-client@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    },
  ];

  const univerDocAdvancedScriptList = [
    {
      id: 'univer-pro-docs-print',
      src:`https://unpkg.com/@univerjs-pro/docs-print@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-pro-docs-exchange-client',
      src:`https://unpkg.com/@univerjs-pro/docs-exchange-client@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
  ];

  const univerDocAdvancedLocaleList = [
    {
      id: 'univer-preset-docs-advanced-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-docs-advanced@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-preset-docs-advanced-en-us',
      src: `https://unpkg.com/@univerjs/preset-docs-advanced@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-pro-docs-print-zh-tw',
      src:`https://unpkg.com/@univerjs-pro/docs-print@${UNIVERSAL_VERSION}/lib/umd/locale/zh-TW.js`
    },
    {
      id: 'univer-pro-docs-print-en-us',
      src:`https://unpkg.com/@univerjs-pro/docs-print@${UNIVERSAL_VERSION}/lib/umd/locale/en-US.js`
    },
    {
      id: 'univer-preset-docs-collaboration-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-docs-collaboration@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-preset-docs-collaboration-en-us',
      src: `https://unpkg.com/@univerjs/preset-docs-collaboration@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    }
  ];

  const univerDocAdvancedCSSList = [
    {
      id: 'univer-preset-docs-advanced-css',
      src: `https://unpkg.com/@univerjs/preset-docs-advanced@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-preset-docs-collaboration-css',
      src: `https://unpkg.com/@univerjs/preset-docs-collaboration@${UNIVERSAL_VERSION}/lib/index.css`
    }
  ];

  const querySelectorAllString = [
    ...univerProCroScriptList.map(
      (univerProCroScript) => `#${univerProCroScript.id}`
    ),
    ...univerDocAdvancedScriptList.map(
      (univerDocAdvancedScript) => `#${univerDocAdvancedScript.id}`
    ),
    ...univerDocAdvancedLocaleList.map(
      (univerDocAdvancedLocale) => `#${univerDocAdvancedLocale.id}`
    )
  ].join(',');

  if (document.querySelectorAll(querySelectorAllString).length > 0) {
    return;
  }

  const univerProCroScriptPromiseList = univerProCroScriptList.map(
    (univerProCroScript) => {
      return loadScript(
        univerProCroScript.id,
        univerProCroScript.src,
        univerProCroScript.module
      );
    }
  );
  await Promise.all(univerProCroScriptPromiseList);

  const univerDocAdvancedScriptPromiseList = univerDocAdvancedScriptList.map(
    (univerDocAdvancedScript) => {
      return loadScript(
        univerDocAdvancedScript.id,
        univerDocAdvancedScript.src,
        univerDocAdvancedScript.module
      );
    }
  );
  await Promise.all(univerDocAdvancedScriptPromiseList);

  const univerDocAdvancedPromiseList = [
    ...univerDocAdvancedLocaleList.map((univerLocaleScript) =>
      loadScript(univerLocaleScript.id, univerLocaleScript.src)
    ),
    ...univerDocAdvancedCSSList.map((univerCSSScript) =>
      loadCSS(univerCSSScript.id, univerCSSScript.src)
    )
  ];
  await Promise.all(univerDocAdvancedPromiseList);
}

export async function createDocInstance(container, locale = '') {
  console.log('createDocInstance start');
  await importUniver();

  if (typeof window.UniverPresets?.createUniver !== 'function') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(createDocInstance(container, locale));
      }, 100);
    });
  }

  if (container instanceof HTMLElement === false) {
    throw new Error('container must be an HTMLElement');
  }

  const {
    UniverPresets,
    UniverCore,
    UniverPresetDocsCore,
    UniverDocsHyperLink,
    UniverPresetDocsDrawing,
    UniverDocsQuickInsertUi,
    UniverPresetDocsThreadComment,
    // UniverWatermark,
    UniverPresetDocsCoreZhTW,
    UniverPresetDocsCoreEnUS,
    UniverPresetDocsDrawingZhTW,
    UniverPresetDocsDrawingEnUS,
    UniverPresetDocsQuickInsertUiZhTW,
    UniverPresetDocsQuickInsertUiEnUS,
    UniverPresetDocsThreadCommentZhTW,
    UniverPresetDocsThreadCommentEnUS
  } = window;
  const { createUniver } = UniverPresets;
  const { LocaleType, mergeLocales } = UniverCore;
  const { UniverDocsCorePreset } = UniverPresetDocsCore;
  const { UniverDocsHyperLinkPlugin } = UniverDocsHyperLink;
  const { UniverDocsDrawingPreset } = UniverPresetDocsDrawing;
  const { UniverDocsQuickInsertUIPlugin } = UniverDocsQuickInsertUi;
  const { UniverDocsThreadCommentPreset } = UniverPresetDocsThreadComment;
  // const { UniverWatermarkPlugin } = UniverWatermark;

  const univerInstance = createUniver({
    locale: locale.includes('zh') ? LocaleType.ZH_TW : LocaleType.EN_US,
    locales: {
      [LocaleType.ZH_TW]: mergeLocales(
        UniverPresetDocsCoreZhTW,
        UniverPresetDocsDrawingZhTW,
        UniverPresetDocsQuickInsertUiZhTW,
        UniverPresetDocsThreadCommentZhTW
      ),
      [LocaleType.EN_US]: mergeLocales(
        UniverPresetDocsCoreEnUS,
        UniverPresetDocsDrawingEnUS,
        UniverPresetDocsQuickInsertUiEnUS,
        UniverPresetDocsThreadCommentEnUS
      )
    },
    presets: [
      UniverDocsCorePreset({ container }),
      UniverDocsDrawingPreset(),
      UniverDocsThreadCommentPreset()
    ],
    plugins: [
      UniverDocsHyperLinkPlugin,
      UniverDocsQuickInsertUIPlugin,

      // [UniverWatermarkPlugin, { 
      //   textWatermarkSettings: { 
      //     content: 'Hello, Univer!', 
      //     fontSize: 36, 
      //   }, 
      // }]
    ]
  });

  console.log('before importAdvancedDoc');
  await importAdvancedDoc();
  console.log('after importAdvancedDoc');
  const {
    UniverProLicense = {},
    UniverProDocsPrint = {},
    UniverProExchangeClient = {},
    UniverProDocsExchangeClient = {},

    UniverProDocsPrintZhTW,
    UniverProDocsPrintEnUS,
    UniverProExchangeClientZhTW,
    UniverProExchangeClientEnUS,
    UniverPresetDocsAdvancedZhTW,
    UniverPresetDocsAdvancedEnUS
  } = window;
  const { UniverLicensePlugin } = UniverProLicense;
  const { UniverDocsPrintPlugin } = UniverProDocsPrint;
  const { UniverExchangeClientPlugin } = UniverProExchangeClient;
  const { UniverDocsExchangeClientPlugin } = UniverProDocsExchangeClient;

  if (typeof UniverLicensePlugin !== 'undefined') {
    univerInstance.univer.registerPlugin(UniverLicensePlugin, {
      license: import.meta.env.VITE_UNIVER_LICENSE || ''
      // license: 'fake.txt'
    });
    univerInstance.univer.registerPlugin(UniverDocsPrintPlugin);
    univerInstance.univer.registerPlugin(UniverExchangeClientPlugin, {
      uploadFileServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/stream/file/upload`,
      importServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/exchange/{type}/import`,
      exportServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/exchange/{type}/export`,
      getTaskServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/exchange/task/{taskID}`,
      signUrlServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/file/{fileID}/sign-url`,
      downloadEndpointUrl: `${UNIVER_SERVER_ENDPOINT}/`,
    });
    univerInstance.univer.registerPlugin(UniverDocsExchangeClientPlugin);
    univerInstance.univerAPI.loadLocales(
      LocaleType.ZH_TW,
      mergeLocales(
        UniverProDocsPrintZhTW,
        UniverProExchangeClientZhTW,
        UniverPresetDocsAdvancedZhTW
      )
    );
    univerInstance.univerAPI.loadLocales(
      LocaleType.EN_US,
      mergeLocales(
        UniverProDocsPrintEnUS,
        UniverProExchangeClientEnUS,
        UniverPresetDocsAdvancedEnUS
      )
    );
  }

  localeType.list = UniverCore.LocaleType;
  eventType.list = univerInstance.univerAPI.Event;
  // window.univerInstance = univerInstance;

  return univerInstance;
}

export default createDocInstance;
