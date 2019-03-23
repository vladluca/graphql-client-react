import { OperationTypes } from '../../constants/operationTypes';
import { IOperationVariables } from './IOperationVariables';

export interface IGraphqlDocument {
  type: OperationTypes;
  name: string;
  variables: ReadonlyArray<IOperationVariables>;
  body: string;
}
