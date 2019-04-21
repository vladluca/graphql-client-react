import { Component, ComponentClass, ComponentType, ReactNode } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AnyAction, Store } from 'redux';
import { DocumentNode } from 'graphql';

import { IQueryState } from './src/components/interfaces/IQueryState';
import { IReduxState } from './src/components/interfaces/IReduxState';

declare interface IGraphqlOptions {
  operation: DocumentNode;
  variables?: object;
  cachingType?: CachingTypes;
  executeOnMount?: boolean;
}

declare interface IQueryInjectedProps {
  data: any;
  fetchQuery: (newVariables?: object) => void;
  error?: any;
}

declare interface IMutationInjectedProps {
  executeMutation: (variables: object) => Promise<any>;
}

declare interface IGraphqlInjectedProps {
  [queryKey: string]: IQueryInjectedProps | IMutationInjectedProps | any;
}

export interface IReduxState {
  queryReducer: IQueryState;
}

export interface IGraphqlClientProviderProps {
  client: HttpClientConfig;
  store: Store<IReduxState>;
  uniqIdentifierKey: string;
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

  public setRequestInterceptor(requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig): HttpClientConfig;
  public getRequestInterceptor(): (config: AxiosRequestConfig) => AxiosRequestConfig

  public setRequestInterceptorErrorHandler(requestInterceptorErrorHandler: (error: AxiosError) => Promise<any>): HttpClientConfig;
  public getRequestInterceptorErrorHandler(): (error: AxiosError) => Promise<any>;

  public setResponseInterceptor(responseInterceptor: (response: AxiosResponse) => AxiosResponse): HttpClientConfig;
  public getResponseInterceptor(): (response: AxiosResponse) => AxiosResponse;

  public setResponseInterceptorErrorHandler(
    responseInterceptorErrorHandler: (error: AxiosError) => Promise<any>
  ): HttpClientConfig;
  public getResponseInterceptorErrorHandler(): (error: AxiosError) => Promise<any>;
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
