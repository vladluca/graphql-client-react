import { ReactNode } from 'react';
import { Store } from 'redux';

import { HttpClientConfig } from '../../HttpClientConfig/HttpClientConfig';
import { IReduxState } from './IReduxState';

export interface IGraphqlClientProviderProps {
  client: HttpClientConfig;
  store: Store<IReduxState>;
  children: ReactNode;
}
