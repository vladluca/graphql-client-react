import { IGraphqlResponseData } from './IGraphqlResponseData';
import { IMutationInjectedProps } from './IMutationInjectedProps';

export interface IGraphqlInjectedProps {
  [queryKey: string]: IGraphqlResponseData | IMutationInjectedProps | any;
}
