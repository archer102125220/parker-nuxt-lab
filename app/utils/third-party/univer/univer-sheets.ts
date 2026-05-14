
export type UniverSheetsInstance = {
  univer: any;
  univerAPI: any;
}

export async function importUniver(): Promise<void> {
  if (typeof document === 'undefined') return;


  const scriptIdList = ['univer-react', 'univer-react-dom', 'univer-rxjs', 'univer-echarts', 'univer-presets', 'univer-sheets-core', 'univer-sheets-core-zh-tw', 'univer-sheets-advanced', 'univer-sheets-advanced-zh-tw', 'univer-sheets-drawing', 'univer-sheets-drawing-zh-tw', 'univer-sheets-advanced-css', 'univer-sheets-core-css', 'univer-sheets-drawing-css'];
  const querySelectorAllString = scriptIdList.map((scriptId) => `#${scriptId}`).join(',');

  if (document.querySelectorAll(querySelectorAllString).length > 0) {
    return;
  }

  return new Promise(async (resolve) => {
    function handleRemoveScriptId(e: Event) {
      console.log(e);
      if (!e.currentTarget) return;

      const targetId = (e.currentTarget as HTMLScriptElement).id;
      const targetIdIndex= scriptIdList.findIndex((scriptId) => scriptId === targetId);

      if (targetIdIndex > -1) {
        scriptIdList.splice(targetIdIndex, 1);
      }
      console.log({ scriptIdList });
      if (scriptIdList.length <= 0) {
        setTimeout(resolve, 1000);
      }
    }

    const univerReact = document.createElement('script');
    univerReact.setAttribute('id', 'univer-react');
    univerReact.setAttribute('async', 'true');
    univerReact.setAttribute('crossorigin', 'true');
    univerReact.setAttribute('src', 'https://unpkg.com/react@18.3.1/umd/react.production.min.js');
    univerReact.addEventListener('load',handleRemoveScriptId);

    const univerReactDom = document.createElement('script');
    univerReactDom.setAttribute('id', 'univer-react-dom');
    univerReactDom.setAttribute('async', 'true');
    univerReactDom.setAttribute('crossorigin', 'true');
    univerReactDom.setAttribute('src', 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js');
    univerReactDom.addEventListener('load',handleRemoveScriptId);

    const univerRxjs = document.createElement('script');
    univerRxjs.setAttribute('id', 'univer-rxjs');
    univerRxjs.setAttribute('crossorigin', 'true');
    univerRxjs.setAttribute('src', 'https://unpkg.com/rxjs/dist/bundles/rxjs.umd.min.js');
    univerRxjs.addEventListener('load',handleRemoveScriptId);
    
    const univerEcharts = document.createElement('script');
    univerEcharts.setAttribute('id', 'univer-echarts');
    univerEcharts.setAttribute('crossorigin', 'true');
    univerEcharts.setAttribute('src', 'https://unpkg.com/echarts@5.6.0/dist/echarts.min.js');
    univerEcharts.addEventListener('load',handleRemoveScriptId);

    document.head.appendChild(univerReact);
    document.head.appendChild(univerReactDom);
    document.head.appendChild(univerRxjs);
    document.head.appendChild(univerEcharts);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const univerPresets = document.createElement('script');
    univerPresets.setAttribute('id', 'univer-presets');
    univerPresets.setAttribute('async', 'true');
    univerPresets.setAttribute('crossorigin', 'true');
    univerPresets.setAttribute('src', 'https://unpkg.com/@univerjs/presets/lib/umd/index.js');
    univerPresets.addEventListener('load', handleRemoveScriptId);

    document.head.appendChild(univerPresets);

    const univerSheetsCore = document.createElement('script');
    univerSheetsCore.setAttribute('id', 'univer-sheets-core');
    univerSheetsCore.setAttribute('async', 'true');
    univerSheetsCore.setAttribute('crossorigin', 'true');
    univerSheetsCore.setAttribute('src', 'https://unpkg.com/@univerjs/preset-sheets-core/lib/umd/index.js');
    univerSheetsCore.addEventListener('load', handleRemoveScriptId);

    document.head.appendChild(univerSheetsCore);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const univerSheetsAdvanced = document.createElement('script');
    univerSheetsAdvanced.setAttribute('id', 'univer-sheets-advanced');
    univerSheetsAdvanced.setAttribute('async', 'true');
    // univerSheetsAdvanced.setAttribute('module', 'true');
    univerSheetsAdvanced.setAttribute('crossorigin', 'true');
    univerSheetsAdvanced.setAttribute('src', 'https://unpkg.com/@univerjs/preset-sheets-advanced/lib/umd/index.js');
    univerSheetsAdvanced.addEventListener('load', handleRemoveScriptId);
    univerSheetsAdvanced.addEventListener('load', function (e) {
      console.log('univerSheetsAdvanced load');
      console.log((window as any).UniverSheetsAdvancedPreset);
      console.dir(e);
      console.log((e as any).currentTarget);
      console.log(
      (window as any).UniverProEngineFormula,
          (window as any).UniverProExchangeClient,
          (window as any).UniverProLicense,
          (window as any).UniverProSheetsChart,
          (window as any).UniverProSheetsChartUi,
          (window as any).UniverProSheetsExchangeClient,
          (window as any).UniverProSheetsPivot,
          (window as any).UniverProSheetsPivotUi,
          (window as any).UniverProSheetsPrint,
          (window as any).UniverProSheetsShape,
          (window as any).UniverProSheetsShapeUi,
          (window as any).UniverProSheetsSparkline,
          (window as any).UniverProSheetsSparklineUi);
    });
    
    document.head.appendChild(univerSheetsAdvanced);

    const univerSheetsDrawing = document.createElement('script');
    univerSheetsDrawing.setAttribute('id', 'univer-sheets-drawing');
    univerSheetsDrawing.setAttribute('crossorigin', 'true');
    univerSheetsDrawing.setAttribute('async', 'true');
    univerSheetsDrawing.setAttribute('crossorigin', 'true');
    univerSheetsDrawing.setAttribute('src', 'https://unpkg.com/@univerjs/preset-sheets-drawing/lib/umd/index.js');
    univerSheetsDrawing.addEventListener('load', handleRemoveScriptId);
    
    document.head.appendChild(univerSheetsDrawing);

    const univerSheetsCoreZhTW = document.createElement('script');
    univerSheetsCoreZhTW.setAttribute('id', 'univer-sheets-core-zh-tw');
    univerSheetsCoreZhTW.setAttribute('crossorigin', 'true');
    univerSheetsCoreZhTW.setAttribute('src', 'https://unpkg.com/@univerjs/preset-sheets-core/lib/umd/locales/zh-TW.js');
    univerSheetsCoreZhTW.addEventListener('load',handleRemoveScriptId);

    const univerSheetsAdvancedZhTW = document.createElement('script');
    univerSheetsAdvancedZhTW.setAttribute('id', 'univer-sheets-advanced-zh-tw');
    univerSheetsAdvancedZhTW.setAttribute('crossorigin', 'true');
    univerSheetsAdvancedZhTW.setAttribute('src', 'https://unpkg.com/@univerjs/preset-sheets-advanced/lib/umd/locales/zh-TW.js');
    univerSheetsAdvancedZhTW.addEventListener('load',handleRemoveScriptId);

    const univerSheetsDrawingZhTW = document.createElement('script');
    univerSheetsDrawingZhTW.setAttribute('id', 'univer-sheets-drawing-zh-tw');
    univerSheetsDrawingZhTW.setAttribute('crossorigin', 'true');
    univerSheetsDrawingZhTW.setAttribute('src', 'https://unpkg.com/@univerjs/preset-sheets-drawing/lib/umd/locales/zh-TW.js');
    univerSheetsDrawingZhTW.addEventListener('load',handleRemoveScriptId);

    const univerSheetsAdvancedCss = document.createElement('link');
    univerSheetsAdvancedCss.setAttribute('id', 'univer-sheets-advanced-css');
    univerSheetsAdvancedCss.setAttribute('crossorigin', 'true');
    univerSheetsAdvancedCss.setAttribute('rel', 'stylesheet');
    univerSheetsAdvancedCss.setAttribute('href', 'https://unpkg.com/@univerjs/preset-sheets-advanced/lib/index.css');
    univerSheetsAdvancedCss.addEventListener('load', handleRemoveScriptId);
    
    document.head.appendChild(univerSheetsAdvancedCss);

    const univerSheetsCoreCss = document.createElement('link');
    univerSheetsCoreCss.setAttribute('id', 'univer-sheets-core-css');
    univerSheetsCoreCss.setAttribute('crossorigin', 'true');
    univerSheetsCoreCss.setAttribute('rel', 'stylesheet');
    univerSheetsCoreCss.setAttribute('href', 'https://unpkg.com/@univerjs/preset-sheets-core/lib/index.css');
    univerSheetsCoreCss.addEventListener('load', handleRemoveScriptId);
    
    document.head.appendChild(univerSheetsCoreCss);

    const univerSheetsDrawingCss = document.createElement('link');
    univerSheetsDrawingCss.setAttribute('id', 'univer-sheets-drawing-css');
    univerSheetsDrawingCss.setAttribute('rel', 'stylesheet');
    univerSheetsDrawingCss.setAttribute('crossorigin', 'true');
    univerSheetsDrawingCss.setAttribute('href', 'https://unpkg.com/@univerjs/preset-sheets-drawing/lib/index.css');
    univerSheetsDrawingCss.addEventListener('load', handleRemoveScriptId);

    document.head.appendChild(univerSheetsDrawingCss);

    document.head.appendChild(univerSheetsCoreZhTW);
    document.head.appendChild(univerSheetsAdvancedZhTW);
    document.head.appendChild(univerSheetsDrawingZhTW);
  });
}

export async function createUniverInstance(container: HTMLElement): Promise<UniverSheetsInstance> {
  await importUniver();

  if (typeof (window as any).UniverPresets?.createUniver !== 'function') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(createUniverInstance(container));
      }, 100);
    });
  }

  const {
    UniverPresets,
    UniverPresetSheetsCore,
    UniverCore,
    // UniverSheetsAdvancedPreset,
    // UniverSheetsDrawingPreset,
    UniverPresetSheetsCoreZhTW,
    UniverPresetSheetsAdvancedZhTW,
    UniverPresetSheetsDrawingZhTW
  } = (window as any);
  const { createUniver } = UniverPresets;
  const { LocaleType, mergeLocales } = UniverCore;
  const { UniverSheetsCorePreset } = UniverPresetSheetsCore;

  return createUniver({
    locale: LocaleType.ZH_TW,
    locales: {
      [LocaleType.ZH_TW]: mergeLocales(
        UniverPresetSheetsCoreZhTW,
        // UniverPresetSheetsDrawingZhTW,
        // UniverPresetSheetsAdvancedZhTW
      )
    },
    presets: [
      UniverSheetsCorePreset({ container }),
      // UniverSheetsAdvancedPreset({ license:'[ENCRYPTION_KEY]', useWorker:true }),
      // UniverSheetsDrawingPreset()
    ]
  });

}

export default createUniverInstance;