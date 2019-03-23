import { OperationTypes } from '../../constants/operationTypes';

export interface IGraphqlOptions {
  operationType: OperationTypes;
  debug?: boolean;
}
