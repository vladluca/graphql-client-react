import { queryActions } from '../constants/actionTypes';
import { AnyAction } from 'redux';

import { IQueryState } from '../components/interfaces/IQueryState';

const defaultState: IQueryState = {
  result: null
};

export default function queryReducer(state: IQueryState = defaultState, action: AnyAction): IQueryState {
  switch (action.type) {
    case queryActions.SET_QUERY_RESULT: {
      return {
        ...state,
        result: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
