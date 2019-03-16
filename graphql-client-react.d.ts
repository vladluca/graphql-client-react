import { Component, ComponentClass, ComponentType } from 'react';

import { IGraphqlOptions } from './src/components/interfaces/IGraphqlOptions';
import { IGraphqlInjectedProps } from './src/components/interfaces/IGraphqlInjectedProps';
import { IOperationType } from './src/components/interfaces/IOperationType';
import { IGraphqlClientProviderProps } from './src/components/interfaces/IGraphqlClientProviderProps';

// react components
declare function graphql<TProps>(options: IGraphqlOptions): (
  WrappedComponent: ComponentType<TProps>
) => ComponentClass<TProps & IGraphqlInjectedProps>;

declare class GraphqlClientProvider extends Component<IGraphqlClientProviderProps> {}

// http client config
declare class HttpClientConfig {}

// constants
declare const OperationType: IOperationType;
