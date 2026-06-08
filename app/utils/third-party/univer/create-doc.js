import { loadScript } from '@app/utils/helpers/load-script';
import { loadCSS } from '@app/utils/helpers/load-css';
import {
  importUniver,
  UNIVERSAL_VERSION,
  UNIVERSER_DOCKER_HOST
} from '@app/utils/third-party/univer/import-univer';
import { importSheet } from '@app/utils/third-party/univer/create-sheet';
import { importRegisterVue } from '@app/utils/third-party/univer/plugin/register-vue';
import { createdLocalExportButtonPlugin } from '@app/utils/third-party/univer/plugin/local-export';
import { createdServerExportButtonPlugin } from '@app/utils/third-party/univer/plugin/server-export';
import { createdLocalImportButtonPlugin } from '@app/utils/third-party/univer/plugin/local-import';
import { createdUniverExchangeLifecyclePlugin } from '@app/utils/third-party/univer/plugin/exchange-lifecycle';
import { createdDocLockPlugin } from '@app/utils/third-party/univer/plugin/doc-lock';
import CustomPluginEnUS from '@app/utils/third-party/univer/i18n/en-US';
import CustomPluginZhTW from '@app/utils/third-party/univer/i18n/zh-TW';

// 因為 univer 會重複引用導致報錯，所以忽略 univer 的重複引用錯誤
function ignoreErrorLog() {
  if (typeof window.originalConsoleError === 'function') {
    return;
  }

  // 1. 先把原生的 console.error 存起來
  window.originalConsoleError =
    window.originalConsoleError || window.console.error;

  // 2. 覆寫 console.error
  window.console.error = function (...args) {
    // 3. 產生一個錯誤物件來獲取當下的 Call Stack
    const stackTrace = new Error().stack || '';

    // 4. 定義你要過濾的目標（例如該 CDN 的網址特徵、檔案名稱，或特定套件內的函式名稱）
    const targetScript = 'https://unpkg.com/@univerjs'; // 替換成你想攔截的 CDN 檔名或路徑

    // 你也可以結合之前的訊息字串過濾，做雙重條件判斷
    const targetMessage =
      ' already exists. Returning the cached identifier decorator.';
    const isTargetMessage = args.some(
      (arg) => typeof arg === 'string' && arg.includes(targetMessage)
    );

    // 5. 判斷堆疊中是否包含目標檔案的呼叫紀錄
    if (stackTrace.includes(targetScript) && isTargetMessage) {
      // 如果這個 error 是從目標 CDN 腳本發出來的，我們就直接 return 把它吃掉
      if (import.meta.dev) {
        console.warn('@univerjs ignoreErrorLog', args);
      }

      return;
    }

    // 如果不是目標腳本觸發的，就照常印出錯誤
    window.originalConsoleError.apply(console, args);
  };
}

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

export async function importDoc() {
  if (typeof window === 'undefined') return;

  await importSheet();

  const univerDocCoreScriptList = [
    {
      id: 'univer-preset-docs-core',
      src: `https://unpkg.com/@univerjs/preset-docs-core@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-docs-ui-facade',
      src: `https://unpkg.com/@univerjs/docs-ui@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    }
  ];
  const univerDocScriptList = [
    {
      id: 'univer-preset-docs-hyper-link',
      src: `https://unpkg.com/@univerjs/preset-docs-hyper-link@${UNIVERSAL_VERSION}/lib/umd/index.js`
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
      id: 'univer-preset-docs-hyper-link-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-docs-hyper-link@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-preset-docs-hyper-link-en-us',
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
      id: 'univer-drawing-ui-css',
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
    ...univerDocCoreScriptList.map(
      (sheetCoreScript) => `#${sheetCoreScript.id}`
    ),
    ...univerDocScriptList.map((univerDocScript) => `#${univerDocScript.id}`),
    ...univerLocaleList.map(
      (univerLocaleScript) => `#${univerLocaleScript.id}`
    ),
    ...univerCSSList.map((univerCSSScript) => `#${univerCSSScript.id}`)
  ].join(',');

  if (
    document.querySelectorAll(querySelectorAllString).length ===
    querySelectorAllString.length
  ) {
    return;
  }

  const univerDocCoreScriptPromiseList = univerDocCoreScriptList.map(
    (sheetCoreScript) =>
      loadScript(
        sheetCoreScript.id,
        sheetCoreScript.src,
        sheetCoreScript.attributes
      )
  );
  await Promise.all(univerDocCoreScriptPromiseList);

  const univerDocScriptPromiseList = univerDocScriptList.map(
    (univerDocScript) =>
      loadScript(
        univerDocScript.id,
        univerDocScript.src,
        univerDocScript.attributes
      )
  );
  await Promise.all(univerDocScriptPromiseList);

  // Capture Docs globals immediately after loading Docs scripts
  if (!window.__UNIVER_DOCS_GLOBALS__) {
    window.__UNIVER_DOCS_GLOBALS__ = {
      UniverCore: window.UniverCore,
      UniverDesign: window.UniverDesign,
      UniverUi: window.UniverUi,
      UniverDocs: window.UniverDocs,
      UniverDocsUi: window.UniverDocsUi,
      UniverEngineRender: window.UniverEngineRender
    };
  }

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
  if (typeof window === 'undefined') return;

  // importSheet may have overwritten globals if it was the first time loading.
  // We must restore Docs globals here so that Pro plugins bind to Docs UI.
  if (window.__UNIVER_DOCS_GLOBALS__) {
    Object.assign(window, window.__UNIVER_DOCS_GLOBALS__);
  }

  const univerProCroScriptList = [
    {
      id: 'univer-pro-engine-formula',
      src: `https://unpkg.com/@univerjs-pro/engine-formula@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-pro-print',
      src: `https://unpkg.com/@univerjs-pro/print@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-pro-collaboration',
      src: `https://unpkg.com/@univerjs-pro/collaboration@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-pro-collaboration-client',
      src: `https://unpkg.com/@univerjs-pro/collaboration-client@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-pro-exchange-client',
      src: `https://unpkg.com/@univerjs-pro/exchange-client@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-pro-exchange-client-facade',
      src: `https://unpkg.com/@univerjs-pro/exchange-client@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    }
  ];

  const univerDocAdvancedScriptList = [
    // {
    //   id: 'univer-pro-docs-exchange-client',
    //   src: `https://unpkg.com/@univerjs-pro/docs-exchange-client@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-docs-print',
    //   src: `https://unpkg.com/@univerjs-pro/docs-print@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    {
      id: 'univer-pro-collaboration-client-ui',
      src: `https://unpkg.com/@univerjs-pro/collaboration-client-ui@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-preset-docs-advanced',
      src: `https://unpkg.com/@univerjs/preset-docs-advanced@${UNIVERSAL_VERSION}/lib/umd/index.js`
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
    }
  ];

  const univerDocAdvancedCSSList = [
    {
      id: 'univer-preset-docs-advanced-css',
      src: `https://unpkg.com/@univerjs/preset-docs-advanced@${UNIVERSAL_VERSION}/lib/index.css`
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

  if (
    document.querySelectorAll(querySelectorAllString).length ===
    querySelectorAllString.length
  ) {
    return;
  }

  // const univerProCroScriptPromiseList = univerProCroScriptList.map(
  //   (univerProCroScript) => {
  //     return loadScript(
  //       univerProCroScript.id,
  //       univerProCroScript.src,
  //       univerProCroScript.attributes
  //     );
  //   }
  // );
  // await Promise.all(univerProCroScriptPromiseList);
  for (const univerProCroScript of univerProCroScriptList) {
    await loadScript(
      univerProCroScript.id,
      univerProCroScript.src,
      univerProCroScript.attributes
    );
  }

  const univerDocAdvancedScriptPromiseList = univerDocAdvancedScriptList.map(
    (univerDocAdvancedScript) => {
      return loadScript(
        univerDocAdvancedScript.id,
        univerDocAdvancedScript.src,
        univerDocAdvancedScript.attributes
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

export async function importDocCollaboration() {
  if (typeof window === 'undefined') return;

  await importAdvancedDoc();

  const univerDocCollaborationScriptList = [
    {
      id: 'univer-preset-docs-collaboration',
      src: `https://unpkg.com/@univerjs/preset-docs-collaboration@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
    // {
    //   id: 'univer-pro-collaboration',
    //   src: `https://unpkg.com/@univerjs-pro/collaboration@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-collaboration-client',
    //   src: `https://unpkg.com/@univerjs-pro/collaboration-client@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-collaboration-client-ui',
    //   src: `https://unpkg.com/@univerjs-pro/collaboration-client-ui@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // }
  ];

  const univerDocCollaborationLocaleList = [
    {
      id: 'univer-preset-docs-collaboration-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-docs-collaboration@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-preset-docs-collaboration-en-us',
      src: `https://unpkg.com/@univerjs/preset-docs-collaboration@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    }
  ];

  const univerDocCollaborationCSSList = [
    {
      id: 'univer-preset-docs-collaboration-css',
      src: `https://unpkg.com/@univerjs/preset-docs-collaboration@${UNIVERSAL_VERSION}/lib/index.css`
    }
  ];

  const querySelectorAllString = [
    ...univerDocCollaborationScriptList.map(
      (univerDocCollaborationScript) => `#${univerDocCollaborationScript.id}`
    ),
    ...univerDocCollaborationLocaleList.map(
      (univerDocCollaborationLocale) => `#${univerDocCollaborationLocale.id}`
    ),
    ...univerDocCollaborationCSSList.map(
      (univerDocCollaborationCSS) => `#${univerDocCollaborationCSS.id}`
    )
  ].join(',');

  if (
    document.querySelectorAll(querySelectorAllString).length ===
    querySelectorAllString.length
  ) {
    return;
  }

  const univerDocCollaborationScriptPromiseList =
    univerDocCollaborationScriptList.map((univerDocCollaborationScript) => {
      return loadScript(
        univerDocCollaborationScript.id,
        univerDocCollaborationScript.src,
        univerDocCollaborationScript.attributes
      );
    });
  await Promise.all(univerDocCollaborationScriptPromiseList);

  const univerDocCollaborationLocaleListPromiseList =
    univerDocCollaborationLocaleList.map((univerDocCollaborationLocale) => {
      return loadScript(
        univerDocCollaborationLocale.id,
        univerDocCollaborationLocale.src,
        univerDocCollaborationLocale.attributes
      );
    });
  await Promise.all(univerDocCollaborationLocaleListPromiseList);

  const univerDocCollaborationCSSListPromiseList =
    univerDocCollaborationCSSList.map((univerDocCollaborationCSS) => {
      return loadCSS(
        univerDocCollaborationCSS.id,
        univerDocCollaborationCSS.src,
        univerDocCollaborationCSS.attributes
      );
    });
  await Promise.all(univerDocCollaborationCSSListPromiseList);
}

export async function createDocInstance({
  container,
  locale = '',
  license,
  universerEndpoint,
  docsCoreConfig = {},
  threadCommentPresetConfig,
  quickInsertUIConfig,
  watermark = false,
  watermarkConfig,
  // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，因此先註解起來
  // uniscript = false,
  // uniscriptConfig,
  drawingPresetConfig,
  collaboration = false,
  advancedPresetConfig = {},
  collaborationConfig = {},
  docLockConfig = {}
} = {}) {
  if (typeof window === 'undefined') return;

  if (container instanceof HTMLElement === false) {
    throw new Error('container must be an HTMLElement');
  }

  const safeLicense = (license ?? import.meta.env.VITE_UNIVER_LICENSE) || '';
  const docsAdvanced = typeof safeLicense === 'string' && safeLicense !== '';

  ignoreErrorLog();
  console.log('createDocInstance start');
  await importUniver();
  await importDoc();

  if (typeof window.UniverPresets?.createUniver !== 'function') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(createDocInstance(container, locale));
      }, 100);
    });
  }

  // Restore Docs globals before instantiating the editor
  if (window.__UNIVER_DOCS_GLOBALS__) {
    Object.assign(window, window.__UNIVER_DOCS_GLOBALS__);
  }

  console.log('before importAdvancedDoc');
  await importAdvancedDoc();
  console.log('after importAdvancedDoc');

  const {
    UniverPresets = {},
    UniverCore = {},
    UniverPresetDocsCore = {},
    UniverPresetDocsHyperLink = {},
    UniverPresetDocsDrawing = {},
    UniverDocsQuickInsertUi = {},
    UniverPresetDocsThreadComment = {},
    UniverWatermark = {},
    UniverPresetDocsCoreZhTW,
    UniverPresetDocsCoreEnUS,
    UniverPresetDocsHyperLinkZhTW,
    UniverPresetDocsHyperLinkEnUS,
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
  const { UniverDocsHyperLinkPreset } = UniverPresetDocsHyperLink;
  const { UniverDocsDrawingPreset } = UniverPresetDocsDrawing;
  const { UniverDocsQuickInsertUIPlugin } = UniverDocsQuickInsertUi;
  const { UniverDocsThreadCommentPreset } = UniverPresetDocsThreadComment;

  const {
    // UniverProLicense = {},
    // UniverProDocsPrint = {},
    // UniverProExchangeClient = {},
    UniverProDocsExchangeClient = {},
    UniverPresetDocsAdvanced = {}
  } = window;
  // const { UniverLicensePlugin } = UniverProLicense;
  const { UniverDocsAdvancedPreset } = UniverPresetDocsAdvanced;
  // const { UniverDocsPrintPlugin } = UniverProDocsPrint;
  // const { UniverExchangeClientPlugin } = UniverProExchangeClient;
  const { UniverDocsExchangeClientPlugin } = UniverProDocsExchangeClient;

  const [
    LocalExportButtonPlugin,
    ServerExportButtonPlugin,
    LocalImportButtonPlugin,
    ExchangeLifecyclePlugin,
    DocLockPlugin
  ] = await Promise.all([
    createdLocalExportButtonPlugin(),
    createdServerExportButtonPlugin(),
    createdLocalImportButtonPlugin(),
    createdUniverExchangeLifecyclePlugin(),
    createdDocLockPlugin()
  ]);

  const univerConfig = {
    locale: locale.includes('zh') ? LocaleType.ZH_TW : LocaleType.EN_US,
    locales: {},
    presets: [
      UniverDocsCorePreset({ ...docsCoreConfig, container }),
      UniverDocsHyperLinkPreset(),
      UniverDocsThreadCommentPreset(threadCommentPresetConfig)
    ],
    plugins: [
      typeof quickInsertUIConfig === 'object' && quickInsertUIConfig !== null
        ? [UniverDocsQuickInsertUIPlugin, quickInsertUIConfig]
        : UniverDocsQuickInsertUIPlugin
    ]
  };

  const localeZhTW = [
    UniverPresetDocsCoreZhTW,
    UniverPresetDocsHyperLinkZhTW,
    UniverPresetDocsDrawingZhTW,
    UniverPresetDocsQuickInsertUiZhTW,
    UniverPresetDocsThreadCommentZhTW,

    CustomPluginZhTW
  ];

  const localeEnUS = [
    UniverPresetDocsCoreEnUS,
    UniverPresetDocsHyperLinkEnUS,
    UniverPresetDocsDrawingEnUS,
    UniverPresetDocsQuickInsertUiEnUS,
    UniverPresetDocsThreadCommentEnUS,

    CustomPluginEnUS
  ];

  if (watermark === true) {
    const { UniverWatermarkPlugin } = UniverWatermark;

    if (typeof watermarkConfig === 'object' && watermarkConfig !== null) {
      univerConfig.plugins.push([
        UniverWatermarkPlugin,
        // {
        //   textWatermarkSettings: {
        //     content: '測試浮水印',
        //     fontSize: 36,
        //   },
        // }
        watermarkConfig
      ]);
    } else {
      univerConfig.plugins.push(UniverWatermarkPlugin);
    }
  }

  const safeUniverserEndpoint =
    (universerEndpoint ?? import.meta.env.VITE_UNIVERSER_PROXY_PATH) || '';

  if (
    typeof UniverDocsAdvancedPreset !== 'undefined' &&
    docsAdvanced === true
  ) {
    const { UniverPresetDocsAdvancedZhTW, UniverPresetDocsAdvancedEnUS } =
      window;

    localeZhTW.push(UniverPresetDocsAdvancedZhTW);
    localeEnUS.push(UniverPresetDocsAdvancedEnUS);

    const advancedPreset = UniverDocsAdvancedPreset({
      useWorker: true,
      universerEndpoint: safeUniverserEndpoint,
      ...advancedPresetConfig,
      license: safeLicense
    });

    if (collaboration === false) {
      // 過濾掉官方的匯出按鈕 UI Plugin，這樣在非共編狀態下就不會顯示官方按鈕
      advancedPreset.plugins = advancedPreset.plugins.filter((plugin) => {
        const pluginClass = Array.isArray(plugin) ? plugin[0] : plugin;
        return pluginClass !== UniverDocsExchangeClientPlugin;
      });
    }

    univerConfig.presets.push(advancedPreset);
  }

  if (
    typeof UniverDocsAdvancedPreset !== 'undefined' &&
    docsAdvanced === true &&
    collaboration === true
  ) {
    await importDocCollaboration();

    const {
      UniverProCollaboration,
      UniverProCollaborationClient,
      UniverProCollaborationClientUi,

      UniverProCollaborationClientZhTW,
      UniverProCollaborationClientEnUS,
      UniverProCollaborationClientUiZhTW,
      UniverProCollaborationClientUiEnUS
    } = window;

    const { IAuthzIoService, IUndoRedoService, IMentionIOService } = UniverCore;

    const { UniverCollaborationPlugin } = UniverProCollaboration;
    const { UniverCollaborationClientPlugin } = UniverProCollaborationClient;
    const {
      BrowserCollaborationSocketService,
      UniverCollaborationClientUIPlugin
    } = UniverProCollaborationClientUi;

    univerConfig.collaboration = true;

    localeZhTW.push(
      UniverProCollaborationClientZhTW,
      UniverProCollaborationClientUiZhTW
    );
    localeEnUS.push(
      UniverProCollaborationClientEnUS,
      UniverProCollaborationClientUiEnUS
    );

    univerConfig.override = [
      [IAuthzIoService, null],
      [IUndoRedoService, null],
      [IMentionIOService, null]
    ];

    univerConfig.presets.push(
      UniverDocsDrawingPreset(
        typeof drawingPresetConfig === 'object' && drawingPresetConfig !== null
          ? { ...drawingPresetConfig, collaboration: true }
          : { collaboration: true }
      )
    );

    univerConfig.plugins.push(
      UniverCollaborationPlugin,
      [
        UniverCollaborationClientPlugin,
        {
          socketService: BrowserCollaborationSocketService,
          authzUrl: `${UNIVERSER_DOCKER_HOST}/universer-api/authz`,
          snapshotServerUrl: `${UNIVERSER_DOCKER_HOST}/universer-api/snapshot`,
          collabSubmitChangesetUrl: `${UNIVERSER_DOCKER_HOST}/universer-api/comb`,
          collabWebSocketUrl: `${UNIVERSER_DOCKER_HOST}/universer-api/comb/connect`
        }
      ],
      UniverCollaborationClientUIPlugin
    );
  } else {
    univerConfig.collaboration = undefined;

    univerConfig.presets.push(UniverDocsDrawingPreset(drawingPresetConfig));
  }

  univerConfig.locales = {
    [LocaleType.ZH_TW]: mergeLocales(...localeZhTW),
    [LocaleType.EN_US]: mergeLocales(...localeEnUS)
  };

  const univerInstance = await importRegisterVue(createUniver(univerConfig));
  univerInstance.univer.registerPlugins([
    [LocalExportButtonPlugin],
    [ServerExportButtonPlugin],
    [LocalImportButtonPlugin],
    [ExchangeLifecyclePlugin],
    [DocLockPlugin, { noStyle: false, ...docLockConfig }]
  ]);

  localeType.list = UniverCore.LocaleType;
  eventType.list = univerInstance.univerAPI.Event;
  window.univerInstance = univerInstance;

  return univerInstance;
}

export default createDocInstance;
