import { OperationTypes } from '../../constants/operationTypes';
import { VariableDefinitionNode } from 'graphql';

export interface IGraphqlDocument {
  type: OperationTypes;
  name: string;
  variables: ReadonlyArray<VariableDefinitionNode>;
  body: string;
}
