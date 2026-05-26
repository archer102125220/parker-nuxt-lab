import { loadScript } from '@app/utils/helpers/load-script';
import { loadCSS } from '@app/utils/helpers/load-css';
import {
  importUniver,
  UNIVERSAL_VERSION,
  // UNIVER_SERVER_ENDPOINT,
  UNIVERSER_DOCKER_HOST
} from '@app/utils/third-party/univer/import-univer';
import { importRegisterVue } from '@app/utils/third-party/univer/register-vue';
import { createdImportCSVButtonPlugin } from '@app/utils/third-party/univer/plugin/csv-import';
import { createdExportCSVButtonPlugin } from '@app/utils/third-party/univer/plugin/csv-export';
import { createdLocalExportButtonPlugin } from '@app/utils/third-party/univer/plugin/local-export';
import { createdLocalImportButtonPlugin } from '@app/utils/third-party/univer/plugin/local-import';

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

export async function importSheet() {
  const univerSheetCoreScriptList = [
    {
      id: 'univer-sheets-core',
      src: `https://unpkg.com/@univerjs/preset-sheets-core@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
  ];
  const univerSheetsScriptList = [
    {
      id: 'univer-sheets-filter',
      src: `https://unpkg.com/@univerjs/preset-sheets-filter@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-sort',
      src: `https://unpkg.com/@univerjs/preset-sheets-sort@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-data-validation',
      src: `https://unpkg.com/@univerjs/preset-sheets-data-validation@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-conditional-formatting',
      src: `https://unpkg.com/@univerjs/preset-sheets-conditional-formatting@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-hyper-link',
      src: `https://unpkg.com/@univerjs/preset-sheets-hyper-link@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-find-replace',
      src: `https://unpkg.com/@univerjs/preset-sheets-find-replace@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-drawing',
      src: `https://unpkg.com/@univerjs/preset-sheets-drawing@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-thread-comment',
      src: `https://unpkg.com/@univerjs/preset-sheets-thread-comment@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-note',
      src: `https://unpkg.com/@univerjs/preset-sheets-note@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-table',
      src: `https://unpkg.com/@univerjs/preset-sheets-table@${UNIVERSAL_VERSION}/lib/umd/index.js`
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
      id: 'univer-sheets-crosshair-highlight',
      src: `https://unpkg.com/@univerjs/sheets-crosshair-highlight@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-crosshair-highlight-facade',
      src: `https://unpkg.com/@univerjs/sheets-crosshair-highlight@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    },
    {
      id: 'univer-sheets-zen-editor',
      src: `https://unpkg.com/@univerjs/sheets-zen-editor@${UNIVERSAL_VERSION}/lib/umd/index.js`
    },
    {
      id: 'univer-sheets-zen-editor-facade',
      src: `https://unpkg.com/@univerjs/sheets-zen-editor@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    }
    // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
    // {
    //   id: 'univer-uniscript',
    //   src: `https://unpkg.com/@univerjs/uniscript@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // }
  ];
  const univerLocaleList = [
    {
      id: 'univer-sheets-core-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-core@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-core-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-core@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-filter-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-filter@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-filter-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-filter@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-sort-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-sort@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-sort-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-sort@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-data-validation-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-data-validation@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-data-validation-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-data-validation@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-conditional-formatting-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-conditional-formatting@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-conditional-formatting-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-conditional-formatting@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-hyper-link-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-hyper-link@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-hyper-link-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-hyper-link@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-find-replace-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-find-replace@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-find-replace-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-find-replace@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-drawing-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-drawing@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-drawing-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-drawing@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-thread-comment-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-thread-comment@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-thread-comment-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-thread-comment@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-note-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-note@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-note-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-note@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-table-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-table@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-sheets-table-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-table@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },
    {
      id: 'univer-sheets-zen-editor-zh-tw',
      src: `https://unpkg.com/@univerjs/sheets-zen-editor@${UNIVERSAL_VERSION}/lib/umd/locale/zh-TW.js`
    },
    {
      id: 'univer-sheets-zen-editor-en-us',
      src: `https://unpkg.com/@univerjs/sheets-zen-editor@${UNIVERSAL_VERSION}/lib/umd/locale/en-US.js`
    }

    // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
    // {
    //   id: 'univer-uniscript-zh-tw',
    //   src: `https://unpkg.com/@univerjs/uniscript@${UNIVERSAL_VERSION}/lib/umd/locale/zh-TW.js`
    // },
    // {
    //   id: 'univer-uniscript-en-us',
    //   src: `https://unpkg.com/@univerjs/uniscript@${UNIVERSAL_VERSION}/lib/umd/locale/en-US.js`
    // }
  ];
  const univerCSSList = [
    {
      id: 'univer-sheets-core-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-core@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-filter-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-filter@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-sort-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-sort@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-data-validation-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-data-validation@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-conditional-formatting-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-conditional-formatting@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-hyper-link-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-hyper-link@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-find-replace-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-find-replace@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-drawing-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-drawing@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-thread-comment-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-thread-comment@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-note-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-note@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-table-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-table@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-crosshair-highlight-css',
      src: `https://unpkg.com/@univerjs/sheets-crosshair-highlight@${UNIVERSAL_VERSION}/lib/index.css`
    },
    {
      id: 'univer-sheets-zen-editor-css',
      src: `https://unpkg.com/@univerjs/sheets-zen-editor@${UNIVERSAL_VERSION}/lib/index.css`
    }

    // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
    // {
    //   id: 'univer-uniscript-css',
    //   src: `https://unpkg.com/@univerjs/uniscript@${UNIVERSAL_VERSION}/lib/index.css`
    // }
  ];

  const querySelectorAllString = [
    ...univerSheetCoreScriptList.map(
      (sheetCoreScript) => `#${sheetCoreScript.id}`
    ),
    ...univerSheetsScriptList.map(
      (univerSheetScript) => `#${univerSheetScript.id}`
    ),
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

  const univerSheetCoreScriptPromiseList = univerSheetCoreScriptList.map(
    (sheetCoreScript) =>
      loadScript(
        sheetCoreScript.id,
        sheetCoreScript.src,
        sheetCoreScript.attributes
      )
  );
  await Promise.all(univerSheetCoreScriptPromiseList);

  if (!window.__UNIVER_SHEETS_GLOBALS__) {
    window.__UNIVER_SHEETS_GLOBALS__ = {
      UniverCore: window.UniverCore,
      UniverDesign: window.UniverDesign,
      UniverUi: window.UniverUi,
      UniverSheets: window.UniverSheets,
      UniverSheetsUi: window.UniverSheetsUi,
      UniverEngineRender: window.UniverEngineRender
    };
  }

  const univerSheetsScriptPromiseList = univerSheetsScriptList.map(
    (univerSheetScript) =>
      loadScript(
        univerSheetScript.id,
        univerSheetScript.src,
        univerSheetScript.attributes
      )
  );
  await Promise.all(univerSheetsScriptPromiseList);

  await Promise.all([
    ...univerLocaleList.map((univerLocaleScript) =>
      loadScript(univerLocaleScript.id, univerLocaleScript.src)
    ),
    ...univerCSSList.map((univerCSSScript) =>
      loadCSS(univerCSSScript.id, univerCSSScript.src)
    )
  ]);
}

export async function importSheetAdvanced() {
  const univerProCroScriptList = [
    {
      id: 'univer-pro-engine-formula',
      src: `https://unpkg.com/@univerjs-pro/engine-formula@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
  ];
  const univerSheetsAdvancedScriptList = [
    {
      id: 'univer-preset-sheets-advanced',
      src: `https://unpkg.com/@univerjs/preset-sheets-advanced@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }

    // {
    //   id: 'univer-pro-sheets-print',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-print@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-shape',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-shape@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-shape-ui',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-shape-ui@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-shape-facade',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-shape@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    // },
    // {
    //   id: 'univer-pro-sheets-pivot',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-pivot@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-pivot-ui',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-pivot-ui@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-sparkline',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-sparkline@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-sparkline-ui',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-sparkline-ui@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-sparkline-facade',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-sparkline@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    // },
    // {
    //   id: 'univer-pro-sheets-chart',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-chart@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-chart-ui',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-chart-ui@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-chart-facade',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-chart@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    // },
    // {
    //   id: 'univer-pro-exchange-client',
    //   src:`https://unpkg.com/@univerjs-pro/exchange-client@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-sheets-exchange-client',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-exchange-client@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // },
    // {
    //   id: 'univer-pro-exchange-client-facade',
    //   src:`https://unpkg.com/@univerjs-pro/exchange-client@${UNIVERSAL_VERSION}/lib/umd/facade.js`
    // }
  ];

  const univerSheetsAdvancedLocaleList = [
    {
      id: 'univer-preset-sheets-advanced-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-advanced@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-preset-sheets-advanced-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-advanced@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    },

    {
      id: 'univer-pro-sheets-print-zh-tw',
      src: `https://unpkg.com/@univerjs-pro/sheets-print@${UNIVERSAL_VERSION}/lib/umd/locale/zh-TW.js`
    },
    {
      id: 'univer-pro-sheets-print-en-us',
      src: `https://unpkg.com/@univerjs-pro/sheets-print@${UNIVERSAL_VERSION}/lib/umd/locale/en-US.js`
    },
    {
      id: 'univer-pro-exchange-client-zh-tw',
      src: `https://unpkg.com/@univerjs-pro/exchange-client@${UNIVERSAL_VERSION}/lib/umd/locale/zh-TW.js`
    },
    {
      id: 'univer-pro-exchange-client-en-us',
      src: `https://unpkg.com/@univerjs-pro/exchange-client@${UNIVERSAL_VERSION}/lib/umd/locale/en-US.js`
    }

    // {
    //   id: 'univer-pro-sheets-shape-ui-zh-tw',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-shape-ui@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    // },
    // {
    //   id: 'univer-pro-sheets-pivot-zh-tw',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-pivot@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    // },
    // {
    //   id: 'univer-pro-sheets-pivot-ui-zh-tw',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-pivot-ui@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    // },
    // {
    //   id: 'univer-pro-sheets-sparkline-ui-zh-tw',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-sparkline-ui@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    // },
    // {
    //   id: 'univer-pro-sheets-chart-ui-zh-tw',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-chart-ui@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    // },
    // {
    //   id: 'univer-pro-sheets-chart-zh-tw',
    //   src:`https://unpkg.com/@univerjs-pro/sheets-chart@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    // }
  ];

  const univerSheetsAdvancedCSSList = [
    {
      id: 'univer-preset-sheets-advanced-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-advanced@${UNIVERSAL_VERSION}/lib/index.css`
    }

    // {
    //   id: 'univer-pro-sheets-print-css',
    //   src: `https://unpkg.com/@univerjs-pro/sheets-print@${UNIVERSAL_VERSION}/lib/index.css`
    // },
    // {
    //   id: 'univer-pro-sheets-shape-ui-css',
    //   src: `https://unpkg.com/@univerjs-pro/sheets-shape-ui@${UNIVERSAL_VERSION}/lib/index.css`
    // },
    // {
    //   id: 'univer-pro-sheets-pivot-ui-css',
    //   src: `https://unpkg.com/@univerjs-pro/sheets-pivot-ui@${UNIVERSAL_VERSION}/lib/index.css`
    // },
    // {
    //   id: 'univer-pro-sheets-pivot-css',
    //   src: `https://unpkg.com/@univerjs-pro/sheets-pivot@${UNIVERSAL_VERSION}/lib/index.css`
    // },
    // {
    //   id: 'univer-pro-sheets-sparkline-ui-css',
    //   src: `https://unpkg.com/@univerjs-pro/sheets-sparkline-ui@${UNIVERSAL_VERSION}/lib/index.css`
    // },
    // {
    //   id: 'univer-pro-sheets-chart-ui-css',
    //   src: `https://unpkg.com/@univerjs-pro/sheets-chart-ui@${UNIVERSAL_VERSION}/lib/index.css`
    // },
    // {
    //   id: 'univer-pro-exchange-client-css',
    //   src: `https://unpkg.com/@univerjs-pro/exchange-client@${UNIVERSAL_VERSION}/lib/index.css`
    // }
  ];

  const querySelectorAllString = [
    ...univerProCroScriptList.map(
      (univerProCroScript) => `#${univerProCroScript.id}`
    ),
    ...univerSheetsAdvancedScriptList.map(
      (univerSheetAdvancedScript) => `#${univerSheetAdvancedScript.id}`
    ),
    ...univerSheetsAdvancedLocaleList.map(
      (univerSheetAdvancedLocale) => `#${univerSheetAdvancedLocale.id}`
    )
  ].join(',');

  if (
    document.querySelectorAll(querySelectorAllString).length ===
    querySelectorAllString.length
  ) {
    return;
  }

  const univerProCroScriptPromiseList = univerProCroScriptList.map(
    (univerProCroScript) => {
      return loadScript(
        univerProCroScript.id,
        univerProCroScript.src,
        univerProCroScript.attributes
      );
    }
  );
  await Promise.all(univerProCroScriptPromiseList);

  const univerSheetsAdvancedScriptPromiseList =
    univerSheetsAdvancedScriptList.map((univerSheetAdvancedScript) => {
      return loadScript(
        univerSheetAdvancedScript.id,
        univerSheetAdvancedScript.src,
        univerSheetAdvancedScript.attributes
      );
    });
  await Promise.all(univerSheetsAdvancedScriptPromiseList);

  const univerSheetsAdvancedPromiseList = [
    ...univerSheetsAdvancedLocaleList.map((univerLocaleScript) =>
      loadScript(univerLocaleScript.id, univerLocaleScript.src)
    ),
    ...univerSheetsAdvancedCSSList.map((univerCSSScript) =>
      loadCSS(univerCSSScript.id, univerCSSScript.src)
    )
  ];
  await Promise.all(univerSheetsAdvancedPromiseList);
}

export async function importCollaboration() {
  const univerSheetCollaborationScriptList = [
    {
      id: 'univer-preset-sheets-collaboration',
      src: `https://unpkg.com/@univerjs/preset-sheets-collaboration@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
  ];

  const univerSheetsCollaborationLocaleList = [
    {
      id: 'univer-preset-sheets-collaboration-zh-tw',
      src: `https://unpkg.com/@univerjs/preset-sheets-collaboration@${UNIVERSAL_VERSION}/lib/umd/locales/zh-TW.js`
    },
    {
      id: 'univer-preset-sheets-collaboration-en-us',
      src: `https://unpkg.com/@univerjs/preset-sheets-collaboration@${UNIVERSAL_VERSION}/lib/umd/locales/en-US.js`
    }
  ];

  const univerSheetsCollaborationCSSList = [
    {
      id: 'univer-preset-sheets-collaboration-css',
      src: `https://unpkg.com/@univerjs/preset-sheets-collaboration@${UNIVERSAL_VERSION}/lib/index.css`
    }
  ];

  const querySelectorAllString = [
    ...univerSheetCollaborationScriptList.map(
      (univerSheetAdvancedScript) => `#${univerSheetAdvancedScript.id}`
    ),
    ...univerSheetsCollaborationLocaleList.map(
      (univerSheetAdvancedLocale) => `#${univerSheetAdvancedLocale.id}`
    )
  ].join(',');

  if (
    document.querySelectorAll(querySelectorAllString).length ===
    querySelectorAllString.length
  ) {
    return;
  }

  const univerSheetCollaborationScriptPromiseList =
    univerSheetCollaborationScriptList.map((univerSheetCollaborationScript) => {
      return loadScript(
        univerSheetCollaborationScript.id,
        univerSheetCollaborationScript.src,
        univerSheetCollaborationScript.attributes
      );
    });
  await Promise.all(univerSheetCollaborationScriptPromiseList);

  const univerSheetsCollaborationPromiseList = [
    ...univerSheetsCollaborationLocaleList.map((univerLocaleScript) =>
      loadScript(univerLocaleScript.id, univerLocaleScript.src)
    ),
    ...univerSheetsCollaborationCSSList.map((univerCSSScript) =>
      loadCSS(univerCSSScript.id, univerCSSScript.src)
    )
  ];
  await Promise.all(univerSheetsCollaborationPromiseList);
}

export async function createSheetInstance(
  container,
  locale = '',
  collaboration = false
) {
  await importUniver();
  await importSheet();

  if (typeof window.UniverPresets?.createUniver !== 'function') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(createSheetInstance(container, locale));
      }, 100);
    });
  }

  if (container instanceof HTMLElement === false) {
    throw new Error('container must be an HTMLElement');
  }

  if (window.__UNIVER_SHEETS_GLOBALS__) {
    Object.assign(window, window.__UNIVER_SHEETS_GLOBALS__);
  }

  await importSheetAdvanced();

  const {
    UniverPresets,
    UniverCore,
    UniverPresetSheetsCore,
    UniverPresetSheetsFilter,
    UniverPresetSheetsSort,
    UniverPresetSheetsDataValidation,
    UniverPresetSheetsConditionalFormatting,
    UniverPresetSheetsHyperLink,
    UniverPresetSheetsFindReplace,
    UniverPresetSheetsDrawing,
    UniverPresetSheetsThreadComment,
    UniverPresetSheetsNote,
    UniverPresetSheetsTable,

    // UniverWatermark,
    UniverSheetsCrosshairHighlight,
    UniverSheetsZenEditor,

    // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
    // UniverUniscript,

    UniverPresetSheetsCoreZhTW,
    UniverPresetSheetsCoreEnUS,
    UniverPresetSheetsFilterZhTW,
    UniverPresetSheetsFilterEnUS,
    UniverPresetSheetsSortZhTW,
    UniverPresetSheetsSortEnUS,
    UniverPresetSheetsDataValidationZhTW,
    UniverPresetSheetsDataValidationEnUS,
    UniverPresetSheetsConditionalFormattingZhTW,
    UniverPresetSheetsConditionalFormattingEnUS,
    UniverPresetSheetsHyperLinkZhTW,
    UniverPresetSheetsHyperLinkEnUS,
    UniverPresetSheetsFindReplaceZhTW,
    UniverPresetSheetsFindReplaceEnUS,

    // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
    // UniverUniscriptZhTW,
    // UniverUniscriptEnUS,

    UniverPresetSheetsDrawingZhTW,
    UniverPresetSheetsDrawingEnUS,
    UniverPresetSheetsThreadCommentZhTW,
    UniverPresetSheetsThreadCommentEnUS,
    UniverPresetSheetsNoteZhTW,
    UniverPresetSheetsNoteEnUS,
    UniverPresetSheetsTableZhTW,
    UniverPresetSheetsTableEnUS,
    UniverSheetsZenEditorZhTW,
    UniverSheetsZenEditorEnUS,

    UniverPresetSheetsAdvanced,
    UniverPresetSheetsAdvancedZhTW,
    UniverPresetSheetsAdvancedEnUS
  } = window;
  const { createUniver } = UniverPresets;
  const { LocaleType, mergeLocales } = UniverCore;
  const { UniverSheetsCorePreset } = UniverPresetSheetsCore;
  const { UniverSheetsFilterPreset } = UniverPresetSheetsFilter;
  const { UniverSheetsSortPreset } = UniverPresetSheetsSort;
  const { UniverSheetsDataValidationPreset } = UniverPresetSheetsDataValidation;
  const { UniverSheetsConditionalFormattingPreset } =
    UniverPresetSheetsConditionalFormatting;
  const { UniverSheetsHyperLinkPreset } = UniverPresetSheetsHyperLink;
  const { UniverSheetsFindReplacePreset } = UniverPresetSheetsFindReplace;
  const { UniverSheetsDrawingPreset } = UniverPresetSheetsDrawing;
  const { UniverSheetsThreadCommentPreset } = UniverPresetSheetsThreadComment;
  const { UniverSheetsNotePreset } = UniverPresetSheetsNote;
  const { UniverSheetsTablePreset } = UniverPresetSheetsTable;
  const { UniverSheetsAdvancedPreset } = UniverPresetSheetsAdvanced;

  // const { UniverWatermarkPlugin: _UniverWatermarkPlugin } = UniverWatermark;
  const { UniverSheetsCrosshairHighlightPlugin } =
    UniverSheetsCrosshairHighlight;
  const { UniverSheetsZenEditorPlugin } = UniverSheetsZenEditor;

  // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
  // const { UniverUniscriptPlugin } = UniverUniscript;

  const [ImportCSVPlugin, ExportCSVPlugin, LocalExportButtonPlugin, LocalImportButtonPlugin] =
    await Promise.all([
      createdImportCSVButtonPlugin(),
      createdExportCSVButtonPlugin(),
      createdLocalExportButtonPlugin(),
      createdLocalImportButtonPlugin()
    ]);

  const univerConfig = {
    locale: locale.includes('zh') ? LocaleType.ZH_TW : LocaleType.EN_US,
    locales: {},
    presets: [
      UniverSheetsCorePreset({ container }),
      UniverSheetsFilterPreset(),
      UniverSheetsSortPreset(),
      UniverSheetsDataValidationPreset(),
      UniverSheetsConditionalFormattingPreset(),
      UniverSheetsHyperLinkPreset(),
      UniverSheetsFindReplacePreset(),
      UniverSheetsThreadCommentPreset(),
      UniverSheetsNotePreset(),
      UniverSheetsTablePreset(),
      UniverSheetsAdvancedPreset({
        license: import.meta.env.VITE_UNIVER_LICENSE,
        useWorker: true,
        // universerEndpoint: UNIVER_SERVER_ENDPOINT,
        universerEndpoint: UNIVERSER_DOCKER_HOST
      })
    ],
    plugins: [
      // [_UniverWatermarkPlugin, {
      //   textWatermarkSettings: {
      //     content: '測試浮水印',
      //     fontSize: 20,
      //   },
      // }],
      UniverSheetsCrosshairHighlightPlugin,
      UniverSheetsZenEditorPlugin

      // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
      // UniverUniscriptPlugin
    ]
  };

  if (collaboration === true) {
    await importCollaboration();

    const {
      UniverPresetSheetsCollaboration,
      UniverSheetsCollaborationPresetZhTW,
      UniverSheetsCollaborationPresetEnUS
    } = window;

    const { UniverSheetsCollaborationPreset } = UniverPresetSheetsCollaboration;

    univerConfig.locales = {
      [LocaleType.ZH_TW]: mergeLocales(
        UniverPresetSheetsCoreZhTW,
        UniverPresetSheetsFilterZhTW,
        UniverPresetSheetsSortZhTW,
        UniverPresetSheetsDataValidationZhTW,
        UniverPresetSheetsConditionalFormattingZhTW,
        UniverPresetSheetsHyperLinkZhTW,
        UniverPresetSheetsFindReplaceZhTW,

        // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
        // UniverUniscriptZhTW,

        UniverPresetSheetsDrawingZhTW,
        UniverPresetSheetsThreadCommentZhTW,
        UniverPresetSheetsNoteZhTW,
        UniverPresetSheetsTableZhTW,
        UniverSheetsZenEditorZhTW,

        UniverPresetSheetsAdvancedZhTW,
        UniverSheetsCollaborationPresetZhTW
      ),
      [LocaleType.EN_US]: mergeLocales(
        UniverPresetSheetsCoreEnUS,
        UniverPresetSheetsFilterEnUS,
        UniverPresetSheetsSortEnUS,
        UniverPresetSheetsDataValidationEnUS,
        UniverPresetSheetsConditionalFormattingEnUS,
        UniverPresetSheetsHyperLinkEnUS,
        UniverPresetSheetsFindReplaceEnUS,

        // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
        // UniverUniscriptEnUS,

        UniverPresetSheetsDrawingEnUS,
        UniverPresetSheetsThreadCommentEnUS,
        UniverPresetSheetsNoteEnUS,
        UniverPresetSheetsTableEnUS,
        UniverSheetsZenEditorEnUS,

        UniverPresetSheetsAdvancedEnUS,
        UniverSheetsCollaborationPresetEnUS
      )
    };

    univerConfig.collaboration = true;

    univerConfig.presets.push(
      UniverSheetsDrawingPreset({ collaboration: true }),
      UniverSheetsCollaborationPreset({
        // universerEndpoint: UNIVER_SERVER_ENDPOINT
        universerEndpoint: UNIVERSER_DOCKER_HOST
      })
    );
  } else {
    univerConfig.locales = {
      [LocaleType.ZH_TW]: mergeLocales(
        UniverPresetSheetsCoreZhTW,
        UniverPresetSheetsFilterZhTW,
        UniverPresetSheetsSortZhTW,
        UniverPresetSheetsDataValidationZhTW,
        UniverPresetSheetsConditionalFormattingZhTW,
        UniverPresetSheetsHyperLinkZhTW,
        UniverPresetSheetsFindReplaceZhTW,

        // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
        // UniverUniscriptZhTW,

        UniverPresetSheetsDrawingZhTW,
        UniverPresetSheetsThreadCommentZhTW,
        UniverPresetSheetsNoteZhTW,
        UniverPresetSheetsTableZhTW,
        UniverSheetsZenEditorZhTW,

        UniverPresetSheetsAdvancedZhTW
      ),
      [LocaleType.EN_US]: mergeLocales(
        UniverPresetSheetsCoreEnUS,
        UniverPresetSheetsFilterEnUS,
        UniverPresetSheetsSortEnUS,
        UniverPresetSheetsDataValidationEnUS,
        UniverPresetSheetsConditionalFormattingEnUS,
        UniverPresetSheetsHyperLinkEnUS,
        UniverPresetSheetsFindReplaceEnUS,

        // uniscript 好像是 experimental ，並且 CDN 需要額外想辦法處理 monaco-editor ，暫先註解掉
        // UniverUniscriptEnUS,

        UniverPresetSheetsDrawingEnUS,
        UniverPresetSheetsThreadCommentEnUS,
        UniverPresetSheetsNoteEnUS,
        UniverPresetSheetsTableEnUS,
        UniverSheetsZenEditorEnUS,

        UniverPresetSheetsAdvancedEnUS
      )
    };

    univerConfig.presets.push(UniverSheetsDrawingPreset());

    univerConfig.collaboration = undefined;
  }

  const univerInstance = await importRegisterVue(createUniver(univerConfig));
  univerInstance.univer.registerPlugins([
    [ImportCSVPlugin],
    [ExportCSVPlugin],
    [LocalExportButtonPlugin],
    [LocalImportButtonPlugin]
  ]);

  localeType.list = UniverCore.LocaleType;
  eventType.list = univerInstance.univerAPI.Event;
  // window.univerInstance = univerInstance;

  return univerInstance;
}

export default createSheetInstance;
