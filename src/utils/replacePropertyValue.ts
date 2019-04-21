import clone from 'lodash/clone';
import each from 'lodash/each';
import merge from 'lodash/merge';

export function replacePropertyValue(uniqIdentifierKey: string, newVal: any, object: any) {
  const newObject = clone(object);

  each(object, (val, key) => {
    if (typeof(val) === 'object') {
      if (val[uniqIdentifierKey] === newVal[uniqIdentifierKey]) {
        // console.log(val, newVal, newObject[key]);
        merge(newObject[key], newVal);
      }
      newObject[key] = replacePropertyValue(uniqIdentifierKey, newVal, val);
    }
  });

  return newObject;
}