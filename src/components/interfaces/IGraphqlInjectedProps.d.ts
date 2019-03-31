import { IGraphqlResponseData } from './IGraphqlResponseData';

export interface IGraphqlInjectedProps {
  [queryKey: string]: IGraphqlResponseData | any;
}
