import React, { ReactNode } from 'react';

import { IGraphqlOptions } from '../interfaces/IGraphqlOptions';
import { IGraphqlInjectedProps } from '../interfaces/IGraphqlInjectedProps';
import MutationContainer from './MutationContainer';
import { GraphqlClientContext, GraphqlClientContextValue } from '../../context/GraphqlClientContext';
import { IGraphqlDocument } from '../interfaces/IGraphqlDocument';

/**
 * @param options
 * @param graphqlDocument
 */
export function mutation<TProps>(options: IGraphqlOptions, graphqlDocument: IGraphqlDocument): (
  WrappedComponent: React.ComponentType<TProps>
) => React.ComponentClass<TProps & IGraphqlInjectedProps> {
  return (
    WrappedComponent: React.ComponentType<TProps>
  ): React.ComponentClass<TProps & IGraphqlInjectedProps> => {
    return class extends React.Component<TProps & IGraphqlInjectedProps> {
      render(): ReactNode {
        return (
          <GraphqlClientContext.Consumer>
            {(value: GraphqlClientContextValue) => (
              <MutationContainer
                options={ options }
                client={ value ? value.client : undefined }
                store={ value ? value.store : undefined }
                graphqlDocument={ graphqlDocument }
              >
                {(mutationResultProps: IGraphqlInjectedProps) => (
                  <WrappedComponent
                    { ...mutationResultProps }
                    { ...this.props }
                  />
                )}
              </MutationContainer>
            ) }
          </GraphqlClientContext.Consumer>
        );
      }
    };
  };
}
