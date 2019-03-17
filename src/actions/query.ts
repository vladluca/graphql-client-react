import { queryActions } from '../constants/actionTypes';
import { AnyAction } from 'redux';

export function setQueryResult(result: any): AnyAction {
  return {
    type: queryActions.SET_QUERY_RESULT,
    payload: result
  };
}
