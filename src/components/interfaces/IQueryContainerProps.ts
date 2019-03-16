import { ReactNode } from 'react';

import { IGraphqlOptions } from './IGraphqlOptions';
import { HttpClientConfig } from '../../HttpClientConfig/HttpClientConfig';
import { IGraphqlInjectedProps } from './IGraphqlInjectedProps';

export interface IQueryContainerProps {
  options: IGraphqlOptions;
  client: HttpClientConfig | undefined;
  children(props: IGraphqlInjectedProps): ReactNode;
}
