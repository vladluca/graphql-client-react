import { DocumentNode } from 'graphql';

import { CachingTypes } from '../../constants/cachingTypes';

export interface IGraphqlOptions {
  operation: DocumentNode;
  variables?: object;
  cachingType?: CachingTypes;
}
