import { loadScript } from '@app/utils/helpers/load-script';
import { loadCSS } from '@app/utils/helpers/load-css';
import { createdImportCSVButtonPlugin } from '@app/utils/third-party/univer/plugin/csv-import';
import { createdExportCSVButtonPlugin } from '@app/utils/third-party/univer/plugin/csv-export';

const UNIVERSAL_VERSION = '0.22.1';
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
    // {
    //   id: 'univer-network',
    //   src: `https://unpkg.com/@univerjs/network@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // }
  ];
  const univerScriptList = [
    // {
    //   id: 'univer-thread-comment',
    //   src: `https://unpkg.com/@univerjs/thread-comment@${UNIVERSAL_VERSION}/lib/umd/index.js`
    // }
    {
      id: 'univer-pro-license',
      src: `https://unpkg.com/@univerjs-pro/license@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
  ];
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
    },
    {
      id: 'univer-uniscript',
      src: `https://unpkg.com/@univerjs/uniscript@${UNIVERSAL_VERSION}/lib/umd/index.js`
    }
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
    },
    {
      id: 'univer-uniscript-css',
      src: `https://unpkg.com/@univerjs/uniscript@${UNIVERSAL_VERSION}/lib/index.css`
    }
  ];

  const querySelectorAllString = [
    ...dependecyScriptList.map((dependecyScript) => `#${dependecyScript.id}`),
    ...univerSheetCoreScriptList.map(
      (sheetCoreScript) => `#${sheetCoreScript.id}`
    ),
    ...univerCoreScriptList.map((coreScript) => `#${coreScript.id}`),
    ...univerScriptList.map((univerScript) => `#${univerScript.id}`),
    ...univerSheetsScriptList.map(
      (univerSheetScript) => `#${univerSheetScript.id}`
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

  const univerSheetCoreScriptPromiseList = univerSheetCoreScriptList.map(
    (sheetCoreScript) =>
      loadScript(
        sheetCoreScript.id,
        sheetCoreScript.src,
        sheetCoreScript.module
      )
  );
  await Promise.all(univerSheetCoreScriptPromiseList);

  const univerSheetsScriptPromiseList = univerSheetsScriptList.map(
    (univerSheetScript) =>
      loadScript(
        univerSheetScript.id,
        univerSheetScript.src,
        univerSheetScript.module
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

export async function importAdvancedSheet() {
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

  const univerSheetsAdvancedScriptPromiseList =
    univerSheetsAdvancedScriptList.map((univerSheetAdvancedScript) => {
      return loadScript(
        univerSheetAdvancedScript.id,
        univerSheetAdvancedScript.src,
        univerSheetAdvancedScript.module
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

export async function createSheetInstance(container, locale = '') {
  await importUniver();

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

  const {
    UniverPresets,
    UniverCore,
    UniverPresetSheetsCore,
    UniverPresetSheetsDrawing,
    UniverPresetSheetsCoreZhTW,
    UniverPresetSheetsCoreEnUS,
    UniverPresetSheetsDrawingZhTW,
    UniverPresetSheetsDrawingEnUS
  } = window;
  const { createUniver } = UniverPresets;
  const { LocaleType, mergeLocales } = UniverCore;
  const { UniverSheetsCorePreset } = UniverPresetSheetsCore;
  const { UniverSheetsDrawingPreset } = UniverPresetSheetsDrawing;

  const [ImportCSVPlugin, ExportCSVPlugin] = await Promise.all([
    createdImportCSVButtonPlugin(),
    createdExportCSVButtonPlugin()
  ]);

  const univerInstance = createUniver({
    locale: locale.includes('zh') ? LocaleType.ZH_TW : LocaleType.EN_US,
    locales: {
      [LocaleType.ZH_TW]: mergeLocales(
        UniverPresetSheetsCoreZhTW,
        UniverPresetSheetsDrawingZhTW
      ),
      [LocaleType.EN_US]: mergeLocales(
        UniverPresetSheetsCoreEnUS,
        UniverPresetSheetsDrawingEnUS
      )
    },
    presets: [
      UniverSheetsCorePreset({ container }),
      UniverSheetsDrawingPreset()
    ],
    plugins: [
      ImportCSVPlugin,
      ExportCSVPlugin
    ]
  });

  await importAdvancedSheet();
  const {
    UniverProLicense = {},
    UniverProSheetsPrint = {},
    UniverProExchangeClient = {},
    UniverProSheetsExchangeClient = {},
    // UniverProEngineFormula = {},

    UniverProSheetsPrintZhTW,
    UniverProSheetsPrintEnUS,
    UniverProExchangeClientZhTW,
    UniverProExchangeClientEnUS,
    UniverPresetSheetsAdvancedZhTW,
    UniverPresetSheetsAdvancedEnUS
  } = window;
  const { UniverLicensePlugin } = UniverProLicense;
  const { UniverSheetsPrintPlugin } = UniverProSheetsPrint;
  const { UniverExchangeClientPlugin } = UniverProExchangeClient;
  const { UniverSheetsExchangeClientPlugin } = UniverProSheetsExchangeClient;
  // const { UniverProFormulaEnginePlugin } = UniverProEngineFormula;

  if (typeof UniverLicensePlugin !== 'undefined') {
    univerInstance.univer.registerPlugin(UniverLicensePlugin, {
      license: import.meta.env.VITE_UNIVER_LICENSE || ''
    });
    univerInstance.univer.registerPlugin(UniverSheetsPrintPlugin);
    univerInstance.univer.registerPlugin(UniverExchangeClientPlugin, {
      uploadFileServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/stream/file/upload`,
      importServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/exchange/{type}/import`,
      exportServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/exchange/{type}/export`,
      getTaskServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/exchange/task/{taskID}`,
      signUrlServerUrl: `${UNIVER_SERVER_ENDPOINT}/universer-api/file/{fileID}/sign-url`,
      downloadEndpointUrl: `${UNIVER_SERVER_ENDPOINT}/`
    });
    univerInstance.univer.registerPlugin(UniverSheetsExchangeClientPlugin);
    univerInstance.univerAPI.loadLocales(
      LocaleType.ZH_TW,
      mergeLocales(
        UniverProSheetsPrintZhTW,
        UniverProExchangeClientZhTW,
        UniverPresetSheetsAdvancedZhTW
      )
    );
    univerInstance.univerAPI.loadLocales(
      LocaleType.EN_US,
      mergeLocales(
        UniverProSheetsPrintEnUS,
        UniverProExchangeClientEnUS,
        UniverPresetSheetsAdvancedEnUS
      )
    );
  }

  localeType.list = UniverCore.LocaleType;
  eventType.list = univerInstance.univerAPI.Event;
  // window.univerInstance = univerInstance;

  return univerInstance;
}

export default createSheetInstance;
