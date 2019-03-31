import { Component, ComponentClass, ComponentType, ReactNode } from 'react';
import { AnyAction, Store } from 'redux';

import { IQueryState } from './src/components/interfaces/IQueryState';
import { DocumentNode } from 'graphql';
import { IReduxState } from './src/components/interfaces/IReduxState';
import { IGraphqlResponseData } from './src/components/interfaces/IGraphqlResponseData';

declare interface IGraphqlOptions {
  operation: DocumentNode;
  variables?: object;
  cachingType?: CachingTypes;
  executeOnMount?: boolean;
}

declare interface IGraphqlResponseData {
  data: any;
  fetchQuery: (newVariables?: object) => void;
  error?: any;
}

declare interface IGraphqlInjectedProps {
  [queryKey: string]: IGraphqlResponseData | any;
}

export interface IReduxState {
  queryReducer: IQueryState;
}

export interface IGraphqlClientProviderProps {
  client: HttpClientConfig;
  store: Store<IReduxState>;
  children: ReactNode;
}

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
