import React, { Component, ReactNode } from 'react';

import { GraphqlClientContext } from '../context/GraphqlClientContext';
import { IGraphqlClientProviderProps } from './interfaces/IGraphqlClientProviderProps';
import { IGraphqlClientContextValue } from './interfaces/IGraphqlClientContextValue';

/**
 * GraphqlClientProvider
 */
export class GraphqlClientProvider extends Component<IGraphqlClientProviderProps> {

  /**
   * @return {IGraphqlClientContextValue}
   */
  public getContextValue(): IGraphqlClientContextValue {
    return {
      client: this.props.client,
      store: this.props.store
    };
  }

  /**
   * @return {ReactNode}
   */
  public render(): ReactNode {
    return (
      <GraphqlClientContext.Provider value={ this.getContextValue() }>
        { this.props.children }
      </GraphqlClientContext.Provider>
    );
  }
}
