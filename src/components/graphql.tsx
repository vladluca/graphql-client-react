import React, { ReactNode } from 'react';

import { IGraphQLOptions } from './interfaces/IGraphQLOptions';
import { IGraphQLInjectedProps } from './interfaces/IGraphQLInjectedProps';

export function graphql<TProps>({ debug = false }: IGraphQLOptions = {}): (
  WrappedComponent: React.ComponentType<TProps>
) => React.ComponentClass<TProps & IGraphQLInjectedProps> {
  return (
    WrappedComponent: React.ComponentType<TProps>,
  ): React.ComponentClass<TProps & IGraphQLInjectedProps> => {
    return class extends React.Component<TProps & IGraphQLInjectedProps> {
      render(): ReactNode {

        console.log('graphql HOC props: ', this.props, debug);
        return <WrappedComponent text="Ana are mere" {...this.props} />;
      }
    };
  };
}
