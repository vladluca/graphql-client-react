import React, { ComponentType, ComponentClass } from 'react';

import { IGraphQLOptions } from './interfaces/IGraphQLOptions';

import { OperationType } from '../constants/operationType';
import { query } from './query';
import { IGraphQLInjectedProps } from './interfaces/IGraphQLInjectedProps';

export function graphql<TProps>(options: IGraphQLOptions): (
  WrappedComponent: ComponentType<TProps>
) => ComponentClass<TProps & IGraphQLInjectedProps> {
  switch (options.operationType) {
    case OperationType.Query:
      return query<TProps>(options);

    default:
      throw new Error('Invalid operation type provided');
  }
}
