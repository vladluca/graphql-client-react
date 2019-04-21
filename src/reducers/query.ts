import { queryActions } from '../constants/actionTypes';
import { AnyAction } from 'redux';

import { IQueryState } from '../components/interfaces/IQueryState';
import { IQueryStateCache } from '../components/interfaces/IQueryStateCache';
import { replacePropertyValue } from '../utils/replacePropertyValue';

const defaultState: IQueryState = {
  results: {}
};

export function queryReducer(state: IQueryState = defaultState, action: AnyAction): IQueryState {
  switch (action.type) {
    case queryActions.SET_QUERY_RESULT: {
      const { queryKey, result } = action.payload;
      const results: IQueryStateCache = { ...state.results };

      results[queryKey] = result;

      return {
        ...state,
        results
      };
    }

    case queryActions.MERGE_MUTATION_RESPONSE: {
      const { uniqIdentifierKey, mutationResponse } = action.payload;

      const results: IQueryStateCache = replacePropertyValue(uniqIdentifierKey, mutationResponse, { ...state.results });

      return {
        ...state,
        results
      }
    }

    default: {
      return state;
    }
  }
}
