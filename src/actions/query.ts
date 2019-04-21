import { queryActions } from '../constants/actionTypes';
import { AnyAction } from 'redux';

import { IQueryResponse } from '../components/interfaces/IQueryResponse';

export function setQueryResult(queryData: IQueryResponse): AnyAction {
  return {
    type: queryActions.SET_QUERY_RESULT,
    payload: queryData
  };
}

export function mergeMutationResponse(mutationResponse: object): AnyAction {
  return {
    type: queryActions.MERGE_MUTATION_RESPONSE,
    payload: mutationResponse
  }
}