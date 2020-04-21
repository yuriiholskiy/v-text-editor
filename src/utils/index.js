export const groupBy = (keys) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = keys.map((key) => key + '$' + obj[key]).join('-');
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const checkEqualityProp = (obj1, obj2, prop) => {
  return obj1[prop] === obj2[prop];
};
