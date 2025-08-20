import qs from 'qs';
// https://juejin.cn/post/6974902702400602148

const cacheCount = {};

function defaultGenerateReqKey(config) {
  const { method, url, params, data = {} } = config;
  return [method, url, `_params_${qs.stringify(params)}`, `_data_${qs.stringify(data)}`].join('&');
}

function defaultGenerateCacheName(config, refreshCountKey = 'page') {
  const { method, url = '', params, data } = config;
  // const urlOnly = url.substring(0, url.indexOf('?'));
  // const urlArray = urlOnly.split('/');
  const urlArray = url.split('/');

  const apiMethod = urlArray[urlArray.length - 1] || '/';
  const cacheNameParams = { ...params };
  delete cacheNameParams[refreshCountKey];
  const cacheNameData = { ...data };
  delete cacheNameData[refreshCountKey];

  return (method || 'GET') + (apiMethod !== '' ? `&${apiMethod}&` : '&') + [`_params_${qs.stringify(cacheNameParams)}`, `_data_${qs.stringify(cacheNameData)}`].join('&');
}

function defaultHandleRefresh(cacheName, config, refreshCountKey = 'page', generateReqKey, deleteCache) {
  const { url, params = {}, data = {} } = config;
  // const urlOnly = url.substring(0, url.indexOf('?'));

  const endPage = cacheCount[cacheName];

  console.log({ endPage });
  for (let i = 1; i < endPage; i++) {
    const tempConfig = { ...config, data: { ...data, [refreshCountKey]: isNaN(data?.[refreshCountKey]) === false ? i : null } };
    const tempParams = { ...params };
    if (isNaN(tempParams?.[refreshCountKey]) === false) {
      tempParams[refreshCountKey] = i;
    }
    // tempConfig.url = urlOnly + `?${qs.stringify(tempParams)}`;
    tempConfig.url = url + `?${qs.stringify(tempParams)}`;
    console.log({ tempConfig, config });
    const requestKey = generateReqKey(tempConfig);

    deleteCache(requestKey);
  }
}

function defaultAddRefreshCount(config, refreshCountKey = 'page') {
  const { params, data } = config;

  return Number(isNaN(params?.[refreshCountKey]) === false ? params?.[refreshCountKey] : isNaN(data?.[refreshCountKey]) === false ? data?.[refreshCountKey] : 1);
}

function isCacheLike(getCache, setCache, deleteCache) {
  return typeof getCache === 'function' && typeof setCache === 'function' && typeof deleteCache === 'function';
}

export function cacheAdapterEnhancer(options, defaultAdapter, generateReqKey, generateCacheName) {
  if (typeof defaultAdapter !== 'function') {
    throw new TypeError('default defaultAdapter is not function');
  }
  const {
    enabledByDefault = true,
    cacheFlag = 'useCache',
    refreshFlag = 'useCacheRefresh',
    handleRefresh,
    addRefreshCount,
    refreshCountKey = 'page',
    getCache,
    setCache,
    deleteCache
  } = options;

  async function handelDefaultAdapter(config, requestKey, isLike, ttlConfig) {
    try {
      return await defaultAdapter(config); // 使用預設的xhrAdapter發送請求
    } catch (error) {
      if (isLike === true) {
        deleteCache(requestKey, ttlConfig);
      }
      throw error;
    }
  }
  return async config => {
    const { method, forceUpdate, ttlConfig = {}, params, data } = config;
    const useCache = config[cacheFlag] !== undefined && config[cacheFlag] !== null
      ? config[cacheFlag]
      : enabledByDefault;

    const isLike = isCacheLike(getCache, setCache, deleteCache);
    const requestKey = typeof generateReqKey === 'function' ? generateReqKey(config) : defaultGenerateReqKey(config); // 生成請求Key
    const cacheName = typeof generateCacheName === 'function' ? generateCacheName(config, refreshCountKey) : defaultGenerateCacheName(config, refreshCountKey); // 生成快取名稱

    const isRefresh = config[refreshFlag] !== undefined && config[refreshFlag] !== null
      ? config[refreshFlag]
      : false;
    if (isRefresh === true && isLike === true) {
      // 若重新整理，清除與該次請求相關之快取
      if (typeof handleRefresh === 'function') {
        handleRefresh(cacheName, config, refreshCountKey, typeof generateReqKey === 'function' ? generateReqKey : defaultGenerateReqKey, deleteCache);
      } else {
        defaultHandleRefresh(cacheName, config, refreshCountKey, typeof generateReqKey === 'function' ? generateReqKey : defaultGenerateReqKey, deleteCache);
      }
      cacheCount[cacheName] = 1;
    }

    let responsePromise = null;
    if (useCache === true && isLike === true) {
      responsePromise = await getCache(requestKey, { ...ttlConfig, method }) || null; // 從快取中取得請求key對應的響應對象
    }

    if (responsePromise === null || forceUpdate) {
      // 快取未命中/失效或強制更新時，則重新請求資料
      responsePromise = handelDefaultAdapter(config, requestKey, isLike, { ...ttlConfig, method });

      if (isLike === true) {
        setCache(requestKey, responsePromise, { ...ttlConfig, method }); // 保存請求回傳的響應對象
        if (typeof params?.[refreshCountKey] === 'number' || typeof data?.[refreshCountKey] === 'number') {
          let count = 1;
          if (typeof addRefreshCount === 'function') {
            count = addRefreshCount(config, refreshCountKey);
          } else {
            count = defaultAddRefreshCount(config, refreshCountKey);
          }
          cacheCount[cacheName] = count;
        }
      }
    }

    return responsePromise; // 回傳已經保存得響應對象
    // return defaultAdapter(config); // 使用預設的xhrAdapter發送請求
  };
}
export default cacheAdapterEnhancer;