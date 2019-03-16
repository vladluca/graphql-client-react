import { ReactNode } from 'react';
import { HttpClientConfig } from '../../HttpClientConfig/HttpClientConfig';

export interface IGraphqlClientProviderProps {
  client: HttpClientConfig;
  children: ReactNode;
}
