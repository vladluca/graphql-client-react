import { queryActions } from '../constants/actionTypes';
import { AnyAction } from 'redux';

import { IQueryState } from '../components/interfaces/IQueryState';
import { IQueryStateCache } from '../components/interfaces/IQueryStateCache';

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

    default: {
      return state;
    }
  }
}
