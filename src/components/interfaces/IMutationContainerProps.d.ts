import { ReactNode } from 'react';
import { Store } from 'redux';

import HttpClient from '../../HttpClient/HttpClient';

import { IGraphqlOptions } from './IGraphqlOptions';
import { IGraphqlInjectedProps } from './IGraphqlInjectedProps';
import { IGraphqlDocument } from './IGraphqlDocument';
import { IReduxState } from './IReduxState';

export interface IMutationContainerProps {
  options: IGraphqlOptions;
  client: HttpClient | undefined;
  store: Store<IReduxState> | undefined;
  graphqlDocument: IGraphqlDocument;
  children(props: IGraphqlInjectedProps): ReactNode;
}
