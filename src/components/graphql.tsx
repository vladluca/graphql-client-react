import React, { ComponentType, ComponentClass } from 'react';

import { IGraphqlOptions } from './interfaces/IGraphqlOptions';

import { OperationTypes } from '../constants/operationTypes';
import { query } from './query/query';
import { IGraphqlInjectedProps } from './interfaces/IGraphqlInjectedProps';
import { gqlParser } from '../utils/gqlParser';
import { IGraphqlDocument } from './interfaces/IGraphqlDocument';

/**
 * @param options
 */
export function graphql<TProps>(options: IGraphqlOptions): (
  WrappedComponent: ComponentType<TProps>
) => ComponentClass<TProps & IGraphqlInjectedProps> {
  const graphqlDocument: IGraphqlDocument = gqlParser(options.operation);

  switch (graphqlDocument.type) {
    case OperationTypes.Query:
      return query<TProps>(options, graphqlDocument);

    default:
      throw new Error('Invalid operation type provided');
  }
}
