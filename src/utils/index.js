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

const checkEquality = (obj1, obj2) => {
  let isEqual = true;

  Object.keys(obj1).forEach((key) => {
    if (key === 'text') {
      return;
    }

    if (obj1[key] !== obj2[key]) {
      isEqual = false;
    }
  });

  return isEqual;
};

export const combineStyles = (arr) => {
  let previousItem = Object.assign({}, arr[0]);
  let currentItem;
  let index = 0;
  const combinedArr = [previousItem];

  for (let i = 1; i < arr.length; i++) {
    currentItem = arr[i];

    if (checkEquality(previousItem, currentItem)) {
      combinedArr[index].text += ' ' + currentItem.text;
    } else {
      previousItem = Object.assign({}, currentItem);
      combinedArr.push(previousItem);
      index++;
    }
  }

  return combinedArr;
};
