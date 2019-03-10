import { ComponentClass, ComponentType } from 'react'

import { IGraphQLOptions } from './src/components/interfaces/IGraphQLOptions';
import { IGraphQLInjectedProps } from './src/components/interfaces/IGraphQLInjectedProps';

declare function graphql<TProps>(options?: IGraphQLOptions): (WrappedComponent: ComponentType<TProps>) => ComponentClass<TProps & IGraphQLInjectedProps>;
