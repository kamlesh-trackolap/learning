// arrays
export const isArray = (arr:unknown) => Array.isArray(arr);
export const isNotEmptyArray = (arr:unknown)=> isArray(arr) && !!arr.length;

// object
export const isNotEmptyObject = (obj:unknown) => {
  return obj !== null 
    && typeof obj === "object" 
    && !isArray(obj) 
    && !!Object.keys(obj).length;
};
export const deepClone = (obj:unknown)=> JSON.parse(JSON.stringify(obj));

export const isFunction = (func:unknown) => typeof func === 'function';
