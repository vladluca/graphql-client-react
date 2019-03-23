import { DocumentNode } from 'graphql';

export interface IGraphqlOptions {
  operation: DocumentNode;
  debug?: boolean;
}
