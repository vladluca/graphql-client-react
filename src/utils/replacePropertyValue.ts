import clone from 'lodash/clone';
import each from 'lodash/each';
import merge from 'lodash/merge';
import { optimisticResponseFlag } from '../constants/utils';

export function replacePropertyValue(uniqIdentifierKey: string, newVal: any, object: any, accumulator?: any[]): any {
  const newObject: any = clone(object);

  each(object, (val: any, key: string) => {
    if (typeof(val) === 'object') {
      if (newVal.length && (val[uniqIdentifierKey] === newVal[0][uniqIdentifierKey])) {
        const vall: any = newVal[0];
        newObject[key] = { ...newVal.shift() };
      } else if (!newVal.length && val[uniqIdentifierKey] === newVal[uniqIdentifierKey]) {
        if (val[optimisticResponseFlag] === true) {
          delete newObject[key][optimisticResponseFlag];
        }

        if (newVal[optimisticResponseFlag] === true && accumulator) {
          accumulator.push({ ...val });
        }

        merge(newObject[key], newVal);
      } else {
        newObject[key] = replacePropertyValue(uniqIdentifierKey, newVal, val, accumulator);
      }
    }
  });

  return newObject;
}
