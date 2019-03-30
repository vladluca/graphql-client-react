import { Component, ComponentClass, ComponentType } from 'react';
import { AnyAction } from 'redux';

import { IGraphqlOptions } from './src/components/interfaces/IGraphqlOptions';
import { IGraphqlInjectedProps } from './src/components/interfaces/IGraphqlInjectedProps';
import { IGraphqlClientProviderProps } from './src/components/interfaces/IGraphqlClientProviderProps';
import { IQueryState } from './src/components/interfaces/IQueryState';

// react components
declare function graphql<TProps>(options: IGraphqlOptions): (
  WrappedComponent: ComponentType<TProps>
) => ComponentClass<TProps & IGraphqlInjectedProps>;

declare class GraphqlClientProvider extends Component<IGraphqlClientProviderProps> {}

// http client config
declare class HttpClientConfig {
  constructor(apiUrl: string);

  public setApiUrl(apiUrl: string): HttpClientConfig;
  public getApiUrl(): string;
}

// reducers
declare function queryReducer(state: IQueryState, action: AnyAction): IQueryState;

// constants
declare enum CachingTypes {
  CacheFirst = 'CACHE_FIRST',
  CacheAndNetwork = 'CACHE_AND_NETWORK',
  NetworkOnly = 'NETWORK_ONLY',
  CacheOnly = 'CACHE_ONLY',
  NoCache = 'NO_CACHE'
}
