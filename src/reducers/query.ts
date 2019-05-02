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
      const { uniqIdentifierKey, mutationResponse, uuid } = action.payload;
      const backupData: any[] = [];

      const results: IQueryStateCache = replacePropertyValue(
        uniqIdentifierKey,
        mutationResponse,
        { ...state.results },
        uuid ? backupData : undefined
        );

      if (uuid) {
        results[uuid] = backupData;
      }

      return {
        ...state,
        results
      };
    }

    case queryActions.ROLLBACK_OPTIMISTIC_RESPONSE: {
      const { uuid, uniqIdentifierKey } = action.payload;

      const results: IQueryStateCache = replacePropertyValue(
        uniqIdentifierKey,
        [ ...state.results[uuid] ],
        { ...state.results }
      );

      delete results[uuid];

      return {
        ...state,
        results
      };
    }

    case queryActions.REMOVE_BACKUP_OPTIMISTIC_RESPONSE_DATA: {
      const { uuid } = action.payload;
      const results: IQueryStateCache = { ...state.results };

      delete results[uuid];

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
