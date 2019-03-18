import React, { ReactNode } from 'react';

import { IGraphqlOptions } from '../interfaces/IGraphqlOptions';
import { IGraphqlInjectedProps } from '../interfaces/IGraphqlInjectedProps';
import QueryContainer from './QueryContainer';
import { GraphqlClientContext, GraphqlClientContextValue } from '../../context/GraphqlClientContext';

/**
 * @param options
 */
export function query<TProps>(options: IGraphqlOptions): (
  WrappedComponent: React.ComponentType<TProps>
) => React.ComponentClass<TProps & IGraphqlInjectedProps> {
  return (
    WrappedComponent: React.ComponentType<TProps>
  ): React.ComponentClass<TProps & IGraphqlInjectedProps> => {
    return class extends React.Component<TProps & IGraphqlInjectedProps> {
      render(): ReactNode {

        console.log('graphql HOC props: ', this.props);
        console.log('graphql HOC options: ', options);
        return (
          <GraphqlClientContext.Consumer>
            {(value: GraphqlClientContextValue) => (
              <QueryContainer
                options={ options }
                client={value ? value.client : undefined}
                store={ value ? value.store : undefined }
              >
                {(queryResultProps: IGraphqlInjectedProps) => (
                  <WrappedComponent
                    { ...queryResultProps }
                    { ...this.props }
                  />
                )}
              </QueryContainer>
            ) }
          </GraphqlClientContext.Consumer>
        );
      }
    };
  };
}
