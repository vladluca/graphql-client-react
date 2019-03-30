import { ReactNode } from 'react';
import { Store } from 'redux';

import { IGraphqlOptions } from './IGraphqlOptions';
import { IGraphqlInjectedProps } from './IGraphqlInjectedProps';
import { IReduxState } from './IReduxState';
import HttpClient from '../../HttpClient/HttpClient';
import { IGraphqlDocument } from './IGraphqlDocument';

export interface IQueryContainerProps {
  options: IGraphqlOptions;
  client: HttpClient | undefined;
  store: Store<IReduxState> | undefined;
  graphqlDocument: IGraphqlDocument;
  children(props: IGraphqlInjectedProps): ReactNode;
}
