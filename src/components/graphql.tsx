import React, { ComponentType, ComponentClass } from 'react';

import { IGraphqlOptions } from './interfaces/IGraphqlOptions';

import { OperationType } from '../constants/operationType';
import { query } from './query/query';
import { IGraphqlInjectedProps } from './interfaces/IGraphqlInjectedProps';

/**
 * @param options
 */
export function graphql<TProps>(options: IGraphqlOptions): (
  WrappedComponent: ComponentType<TProps>
) => ComponentClass<TProps & IGraphqlInjectedProps> {
  switch (options.operationType) {
    case OperationType.Query:
      return query<TProps>(options);

    default:
      throw new Error('Invalid operation type provided');
  }
}
