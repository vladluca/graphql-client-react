import React, { ReactNode } from 'react';

import { IGraphqlOptions } from '../interfaces/IGraphqlOptions';
import { IGraphqlInjectedProps } from '../interfaces/IGraphqlInjectedProps';
import QueryContainer from './QueryContainer';
import { GraphqlClientContext, GraphqlClientContextValue } from '../../context/GraphqlClientContext';
import { IGraphqlDocument } from '../interfaces/IGraphqlDocument';

/**
 * @param options
 */
export function query<TProps>(options: IGraphqlOptions, graphqlDocument: IGraphqlDocument): (
  WrappedComponent: React.ComponentType<TProps>
) => React.ComponentClass<TProps & IGraphqlInjectedProps> {
  return (
    WrappedComponent: React.ComponentType<TProps>
  ): React.ComponentClass<TProps & IGraphqlInjectedProps> => {
    return class extends React.Component<TProps & IGraphqlInjectedProps> {
      render(): ReactNode {

        console.log('graphql HOC props: ', this.props);
        console.log('graphql HOC options: ', options);
        console.log('graphqlDocument: ', graphqlDocument);
        return (
          <GraphqlClientContext.Consumer>
            {(value: GraphqlClientContextValue) => (
              <QueryContainer
                options={ options }
                client={value ? value.client : undefined}
                store={ value ? value.store : undefined }
                graphqlDocument={ graphqlDocument }
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
