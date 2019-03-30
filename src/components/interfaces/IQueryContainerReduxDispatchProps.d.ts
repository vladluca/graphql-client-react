import { IQueryResponse } from './IQueryResponse';

export interface IQueryContainerReduxDispatchProps {
  setQueryResult: (queryData: IQueryResponse) => void;
}
