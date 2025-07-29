
export function findLastIndex(array, callback, thisArg) {
  for (let index = array.length - 1; index >= 0; index--) {
    if (typeof callback !== 'function') {
      let errorMsg = typeof callback?.call;
      if (errorMsg !== 'function') {
        errorMsg = `${errorMsg} "${callback}"`;
      }
      throw new TypeError(`TypeError: ${errorMsg} is not a function`);
    }
    if (callback.call(thisArg, array[index], index, array)) return index;
  }
  return -1;
};

export function handleFindLastIndexPolyfill() {
  if (typeof Array.prototype.findLastIndex !== 'function') {
    Array.prototype.findLastIndex = function (callback, thisArg) {
      return findLastIndex(this, callback, thisArg);
    };
  }
}

export default handleFindLastIndexPolyfill;
