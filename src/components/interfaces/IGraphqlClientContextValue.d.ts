import { Store } from 'redux';

import { IReduxState } from './IReduxState';
import HttpClient from '../../HttpClient/HttpClient';

export interface IGraphqlClientContextValue {
  client: HttpClient;
  store: Store<IReduxState>;
  uniqIdentifierKey: string;
}
