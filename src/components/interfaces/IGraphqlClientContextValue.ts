import { Store } from 'redux';

import { HttpClientConfig } from '../../HttpClientConfig/HttpClientConfig';
import { IReduxState } from './IReduxState';

export interface IGraphqlClientContextValue {
  client: HttpClientConfig;
  store: Store<IReduxState>
}
