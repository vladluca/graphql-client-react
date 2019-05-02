import clone from 'lodash/clone';
import each from 'lodash/each';
import merge from 'lodash/merge';

export function replacePropertyValue(uniqIdentifierKey: string, newVal: any, object: any): any {
  const newObject: any = clone(object);

  each(object, (val: any, key: string) => {
    if (typeof(val) === 'object') {
      if (val[uniqIdentifierKey] === newVal[uniqIdentifierKey]) {
        merge(newObject[key], newVal);
      }
      newObject[key] = replacePropertyValue(uniqIdentifierKey, newVal, val);
    }
  });

  return newObject;
}
