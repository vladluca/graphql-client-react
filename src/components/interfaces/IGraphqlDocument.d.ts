import { OperationTypes } from '../../constants/operationTypes';
import { IOperationVariables } from './IOperationVariables';

export interface IGraphqlDocument {
  type: OperationTypes;
  name: string;
  operationSelectionName: string | undefined;
  variables: ReadonlyArray<IOperationVariables>;
  body: string;
}
