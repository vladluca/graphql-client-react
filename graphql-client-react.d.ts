import { Component, ComponentClass, ComponentType } from 'react';
import { AnyAction, Reducer } from 'redux';

import { IGraphqlOptions } from './src/components/interfaces/IGraphqlOptions';
import { IGraphqlInjectedProps } from './src/components/interfaces/IGraphqlInjectedProps';
import { IOperationType } from './src/components/interfaces/IOperationType';
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

// constants
declare const OperationType: IOperationType;

//reducers
declare function queryReducer(state: IQueryState, action: AnyAction): IQueryState;
