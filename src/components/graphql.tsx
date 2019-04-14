import React, { ComponentType, ComponentClass } from 'react';

import { query } from './query/query';
import { mutation } from './mutation/mutation';

import { IGraphqlOptions } from './interfaces/IGraphqlOptions';
import { IGraphqlInjectedProps } from './interfaces/IGraphqlInjectedProps';
import { IGraphqlDocument } from './interfaces/IGraphqlDocument';

import { OperationTypes } from '../constants/operationTypes';
import { gqlParser } from '../utils/gqlParser';

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

    case OperationTypes.Mutation:
      return mutation<TProps>(options, graphqlDocument);

    default:
      throw new Error('Invalid operation type provided');
  }
}
