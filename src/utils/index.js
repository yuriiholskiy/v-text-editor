export const groupBy = (keys) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = keys.map((key) => key + '$' + obj[key]).join('-');
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const uniqueArray = (arr, prop) => [
  ...new Map(arr.map((item) => [item[prop], item])).values()
];

export const getNodes = (str) => [
  ...new DOMParser().parseFromString(str, 'text/html').body.childNodes
];
