import { IQueryInjectedProps } from './IQueryInjectedProps';
import { IMutationInjectedProps } from './IMutationInjectedProps';

export interface IGraphqlInjectedProps {
  [queryKey: string]: IQueryInjectedProps | IMutationInjectedProps | any;
}
