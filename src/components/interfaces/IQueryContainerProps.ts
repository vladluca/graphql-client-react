import { ReactNode } from 'react';
import { Store } from 'redux';

import { IGraphqlOptions } from './IGraphqlOptions';
import { HttpClientConfig } from '../../HttpClientConfig/HttpClientConfig';
import { IGraphqlInjectedProps } from './IGraphqlInjectedProps';
import { IReduxState } from './IReduxState';

export interface IQueryContainerProps {
  options: IGraphqlOptions;
  client: HttpClientConfig | undefined;
  store: Store<IReduxState> | undefined;
  children(props: IGraphqlInjectedProps): ReactNode;
}
