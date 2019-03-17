import { combineReducers, Reducer } from 'redux';

import queryReducer from './query';
import { IReduxState } from '../components/interfaces/IReduxState';

export const graphqlClientReducer: Reducer<IReduxState> = combineReducers<IReduxState>({
  queryReducer
});
