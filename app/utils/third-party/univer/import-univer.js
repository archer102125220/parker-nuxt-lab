import { loadScript } from '@app/utils/helpers/load-script';

export const UNIVERSAL_VERSION = '0.23.0';
export const UNIVERSER_DOCKER_HOST =
  import.meta.env.VITE_UNIVERSER_PROXY_PATH || '';

export async function importUniver() {
  if (typeof window === 'undefined') return;

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
      src: 'https://unpkg.com/rxjs@7.8.2/dist/bundles/rxjs.umd.min.js'
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

  const querySelectorAllString = [
    ...dependecyScriptList.map((dependecyScript) => `#${dependecyScript.id}`),
    ...univerCoreScriptList.map((coreScript) => `#${coreScript.id}`),
    ...univerScriptList.map((univerScript) => `#${univerScript.id}`)
  ].join(',');

  if (
    document.querySelectorAll(querySelectorAllString).length ===
    querySelectorAllString.length
  ) {
    return;
  }

  const dependecyScriptPromiseList = dependecyScriptList.map(
    (dependecyScript) =>
      loadScript(
        dependecyScript.id,
        dependecyScript.src,
        dependecyScript.attributes
      )
  );
  await Promise.all(dependecyScriptPromiseList);

  const univerCoreScriptPromiseList = univerCoreScriptList.map((coreScript) =>
    loadScript(coreScript.id, coreScript.src, coreScript.attributes)
  );
  await Promise.all(univerCoreScriptPromiseList);

  const univerScriptPromiseList = univerScriptList.map((univerScript) =>
    loadScript(univerScript.id, univerScript.src, univerScript.attributes)
  );
  await Promise.all(univerScriptPromiseList);
}
export default importUniver;
