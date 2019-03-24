import { queryActions } from '../constants/actionTypes';
import { AnyAction } from 'redux';

import { IQueryState } from '../components/interfaces/IQueryState';

const defaultState: IQueryState = {
  results: {}
};

export function queryReducer(state: IQueryState = defaultState, action: AnyAction): IQueryState {
  switch (action.type) {
    case queryActions.SET_QUERY_RESULT: {
      const { queryKey, result } = action.payload;
      const results = { ...state.results };

      results[queryKey] = result;

      return {
        ...state,
        results: results
      };
    }

    default: {
      return state;
    }
  }
}
