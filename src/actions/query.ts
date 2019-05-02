import { queryActions } from '../constants/actionTypes';
import { AnyAction } from 'redux';

import { IQueryResponse } from '../components/interfaces/IQueryResponse';

export function setQueryResult(queryData: IQueryResponse): AnyAction {
  return {
    type: queryActions.SET_QUERY_RESULT,
    payload: queryData
  };
}

export function mergeMutationResponse(mutationResponse: object, uniqIdentifierKey: string, uuid?: string): AnyAction {
  return {
    type: queryActions.MERGE_MUTATION_RESPONSE,
    payload: {
      mutationResponse,
      uniqIdentifierKey,
      uuid
    }
  };
}

export function rollbackOptimisticResponse(uniqIdentifierKey: string, uuid: string): AnyAction {
  return {
    type: queryActions.ROLLBACK_OPTIMISTIC_RESPONSE,
    payload: {
      uniqIdentifierKey,
      uuid
    }
  };
}

export function removeBackupOptimisticResponseData(uuid: string): AnyAction {
  return {
    type: queryActions.REMOVE_BACKUP_OPTIMISTIC_RESPONSE_DATA,
    payload: {
      uuid
    }
  };
}
