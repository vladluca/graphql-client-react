import { ReactNode } from 'react';

import HttpClient from '../../HttpClient/HttpClient';

import { IGraphqlOptions } from './IGraphqlOptions';
import { IGraphqlInjectedProps } from './IGraphqlInjectedProps';
import { IGraphqlDocument } from './IGraphqlDocument';

export interface IMutationContainerProps {
  options: IGraphqlOptions;
  client: HttpClient | undefined;
  graphqlDocument: IGraphqlDocument;
  children(props: IGraphqlInjectedProps): ReactNode;
}
