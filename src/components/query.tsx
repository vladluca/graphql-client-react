import React, { ReactNode } from 'react';

import { IGraphQLOptions } from './interfaces/IGraphQLOptions';
import { IGraphQLInjectedProps } from './interfaces/IGraphQLInjectedProps';

export function query<TProps>(options: IGraphQLOptions): (
  WrappedComponent: React.ComponentType<TProps>
) => React.ComponentClass<TProps & IGraphQLInjectedProps> {
  return (
    WrappedComponent: React.ComponentType<TProps>,
  ): React.ComponentClass<TProps & IGraphQLInjectedProps> => {
    return class extends React.Component<TProps & IGraphQLInjectedProps> {
      render(): ReactNode {

        console.log('graphql HOC props: ', this.props);
        console.log('graphql HOC options: ', options);
        return <WrappedComponent operationType={ options.operationType } {...this.props} />;
      }
    };
  };
}
