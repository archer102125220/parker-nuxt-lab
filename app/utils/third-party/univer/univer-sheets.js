import { loadScript } from '@app/utils/helpers/load-script';
import { loadCSS } from '@app/utils/helpers/load-css';

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
      src: 'https://unpkg.com/@univerjs/presets/lib/umd/index.js'
    }
  ];
  const univerScriptList = [
    // {
    //   id: 'univer-thread-comment',
    //   src: 'https://unpkg.com/@univerjs/thread-comment/lib/umd/index.js'
    // }
  ];
  const univerSheetCoreScriptList = [
    {
      id: 'univer-sheets-core',
      src: 'https://unpkg.com/@univerjs/preset-sheets-core/lib/umd/index.js'
    }
  ];
  const univerSheetsScriptPart1List = [
    {
      id: 'univer-sheets-filter',
      src: 'https://unpkg.com/@univerjs/preset-sheets-filter/lib/umd/index.js'
    },
    {
      id:'univer-sheets-sort',
      src:'https://unpkg.com/@univerjs/preset-sheets-sort/lib/umd/index.js'
    },
    {
      id:'univer-sheets-data-validation',
      src:'https://unpkg.com/@univerjs/preset-sheets-data-validation/lib/umd/index.js'
    },
    {
      id:'univer-sheets-conditional-formatting',
      src:'https://unpkg.com/@univerjs/preset-sheets-conditional-formatting/lib/umd/index.js'
    },
    {
      id:'univer-sheets-hyper-link',
      src:'https://unpkg.com/@univerjs/preset-sheets-hyper-link/lib/umd/index.js'
    },
    {
      id:'univer-sheets-find-replace',
      src:'https://unpkg.com/@univerjs/preset-sheets-find-replace/lib/umd/index.js'
    },
    {
      id:'univer-sheets-drawing',
      src:'https://unpkg.com/@univerjs/preset-sheets-drawing/lib/umd/index.js'
    },
    {
      id:'univer-sheets-thread-comment',
      src:'https://unpkg.com/@univerjs/preset-sheets-thread-comment/lib/umd/index.js'
    },
    {
      id:'univer-sheets-note',
      src:'https://unpkg.com/@univerjs/preset-sheets-note/lib/umd/index.js'
    },
    {
      id:'univer-sheets-table',
      src:'https://unpkg.com/@univerjs/preset-sheets-table/lib/umd/index.js'
    },
    {
      id:'univer-watermark',
      src:'https://unpkg.com/@univerjs/watermark/lib/umd/index.js'
    },
    {
      id:'univer-watermark-facade',
      src:'https://unpkg.com/@univerjs/watermark/lib/umd/facade.js'
    },
    {
      id:'univer-sheets-crosshair-highlight',
      src:'https://unpkg.com/@univerjs/sheets-crosshair-highlight/lib/umd/index.js'
    },
    {
      id:'univer-sheets-crosshair-highlight-facade',
      src:'https://unpkg.com/@univerjs/sheets-crosshair-highlight/lib/umd/facade.js'
    },
    {
      id:'univer-sheets-zen-editor',
      src:'https://unpkg.com/@univerjs/sheets-zen-editor/lib/umd/index.js'
    },
    {
      id:'univer-sheets-zen-editor-facade',
      src:'https://unpkg.com/@univerjs/sheets-zen-editor/lib/umd/facade.js'
    },
    {
      id:'univer-uniscript',
      src:'https://unpkg.com/@univerjs/uniscript/lib/umd/index.js'
    },
    {
      id:'univer-preset-sheets-advanced',
      src:'https://unpkg.com/@univerjs/preset-sheets-advanced/lib/umd/index.js'
    }
  ];
  const univerSheetsScriptPart2List = [
  ];
  const univerLocaleList = [
    {
      id: 'univer-sheets-core-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-core/lib/umd/locales/zh-TW.js'
    },
    {
      id: 'univer-sheets-filter-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-filter/lib/umd/locales/zh-TW.js'
    },
    {
      id: 'univer-sheets-sort-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-sort/lib/umd/locales/zh-TW.js'
    },
    {
      id:'univer-sheets-data-validation-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-data-validation/lib/umd/locales/zh-TW.js'
    },
    {
      id:'univer-sheets-conditional-formatting-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-conditional-formatting/lib/umd/locales/zh-TW.js'
    },
    {
      id:'univer-sheets-hyper-link-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-hyper-link/lib/umd/locales/zh-TW.js'
    },
    {
      id:'univer-sheets-find-replace-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-find-replace/lib/umd/locales/zh-TW.js'
    },
    {
      id:'univer-sheets-drawing-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-drawing/lib/umd/locales/zh-TW.js'
    },
    {
      id:'univer-sheets-thread-comment-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-thread-comment/lib/umd/locales/zh-TW.js'
    },
    {
      id:'univer-sheets-note-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-note/lib/umd/locales/zh-TW.js'
    },
    {
      id:'univer-sheets-table-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-table/lib/umd/locales/zh-TW.js'
    },
    {
      id:'univer-sheets-zen-editor-zh-tw',
      src:'https://unpkg.com/@univerjs/sheets-zen-editor/lib/umd/locale/zh-TW.js'
    },
    {
      id:'univer-preset-sheets-advanced-zh-tw',
      src:'https://unpkg.com/@univerjs/preset-sheets-advanced/lib/umd/locales/zh-TW.js'
    }
  ];
  const univerCSSList = [
    {
      id: 'univer-sheets-core-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-core/lib/index.css'
    },
    {
      id: 'univer-sheets-filter-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-filter/lib/index.css'
    },
    {
      id: 'univer-sheets-sort-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-sort/lib/index.css'
    },
    {
      id:'univer-sheets-data-validation-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-data-validation/lib/index.css'
    },
    {
      id:'univer-sheets-conditional-formatting-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-conditional-formatting/lib/index.css'
    },
    {
      id:'univer-sheets-hyper-link-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-hyper-link/lib/index.css'
    },
    {
      id:'univer-sheets-find-replace-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-find-replace/lib/index.css'
    },
    {
      id:'univer-sheets-drawing-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-drawing/lib/index.css'
    },
    {
      id:'univer-sheets-thread-comment-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-thread-comment/lib/index.css'
    },
    {
      id:'univer-sheets-note-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-note/lib/index.css'
    },
    {
      id:'univer-sheets-table-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-table/lib/index.css'
    },
    {
      id:'univer-sheets-crosshair-highlight-css',
      src:'https://unpkg.com/@univerjs/sheets-crosshair-highlight/lib/index.css'
    },
    {
      id:'univer-sheets-zen-editor-css',
      src:'https://unpkg.com/@univerjs/sheets-zen-editor/lib/index.css'
    },
    {
      id:'univer-uniscript-css',
      src:'https://unpkg.com/@univerjs/uniscript/lib/index.css'
    },
    {
      id:'univer-preset-sheets-advanced-css',
      src:'https://unpkg.com/@univerjs/preset-sheets-advanced/lib/index.css'
    }
  ];

  const querySelectorAllString = [
    ...dependecyScriptList.map((dependecyScript) => `#${dependecyScript.id}`),
    ...univerSheetCoreScriptList.map(
      (sheetCoreScript) => `#${sheetCoreScript.id}`
    ),
    ...univerCoreScriptList.map((coreScript) => `#${coreScript.id}`),
    ...univerScriptList.map((univerScript) => `#${univerScript.id}`),
    ...univerSheetsScriptPart1List.map(
      (univerSheetScript) => `#${univerSheetScript.id}`
    ),
    ...univerSheetsScriptPart2List.map(
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

  // const dependecyScriptPromiseList = dependecyScriptList.map(
  //   (dependecyScript) => loadScript(dependecyScript.id, dependecyScript.src)
  // );
  // await Promise.all(dependecyScriptPromiseList);

  // const univerCoreScriptPromiseList = univerCoreScriptList.map((coreScript) =>
  //   loadScript(coreScript.id, coreScript.src)
  // );
  // await Promise.all(univerCoreScriptPromiseList);

  // const univerScriptPromiseList = univerScriptList.map((univerScript) =>
  //   loadScript(univerScript.id, univerScript.src)
  // );
  // await Promise.all(univerScriptPromiseList);

  // const univerSheetCoreScriptPromiseList = univerSheetCoreScriptList.map(
  //   (sheetCoreScript) => loadScript(sheetCoreScript.id, sheetCoreScript.src)
  // );
  // await Promise.all(univerSheetCoreScriptPromiseList);

  // const univerSheetsScriptPart1PromiseList = univerSheetsScriptPart1List.map(
  //   (univerSheetScript) =>
  //     loadScript(univerSheetScript.id, univerSheetScript.src)
  // );
  // await Promise.all(univerSheetsScriptPart1PromiseList);

  // const univerSheetScriptPromiseList = univerSheetsScriptPart2List.map(
  //   (univerSheetScript) =>
  //     loadScript(univerSheetScript.id, univerSheetScript.src)
  // );
  // await Promise.all(univerSheetScriptPromiseList);

  // 嚴格依序載入，每個都等前一個完成
  for (const script of [
    ...dependecyScriptList,
    ...univerCoreScriptList,
    ...univerScriptList,
    ...univerSheetCoreScriptList,
    ...univerSheetsScriptPart1List,
    ...univerSheetsScriptPart2List
  ]) {
    await loadScript(script.id, script.src);
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

export async function createUniverInstance(container) {
  await importUniver();

  if (typeof window.UniverPresets?.createUniver !== 'function') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(createUniverInstance(container));
      }, 100);
    });
  }

  if (container instanceof HTMLElement === false) {
    throw new Error('container must be an HTMLElement');
  }

  const {
    UniverPresets,
    UniverPresetSheetsCore,
    UniverCore,
    UniverProLicense,
    // UniverSheetsAdvancedPreset,
    // UniverSheetsDrawingPreset,
    UniverPresetSheetsCoreZhTW,
    UniverPresetSheetsAdvancedZhTW,
    UniverPresetSheetsDrawingZhTW
  } = window;
  const { createUniver } = UniverPresets;
  const { LocaleType, mergeLocales } = UniverCore;
  const { UniverSheetsCorePreset } = UniverPresetSheetsCore;
  const { UniverLicensePlugin } = UniverProLicense;

  const univerInstance = createUniver({
    locale: LocaleType.ZH_TW,
    locales: {
      [LocaleType.ZH_TW]: mergeLocales(
        UniverPresetSheetsCoreZhTW,
        UniverPresetSheetsDrawingZhTW,
        UniverPresetSheetsAdvancedZhTW
      )
    },
    presets: [
      UniverSheetsCorePreset({ container })
      // UniverSheetsAdvancedPreset({ license: 'fake.txt', useWorker:true }),
      // UniverSheetsDrawingPreset()
    ]
  });

  univerInstance.univer.registerPlugin(UniverLicensePlugin, {
    license: 'fake.txt'
  });
  window.univerInstance = univerInstance;

  return univerInstance;
}

export default createUniverInstance;
