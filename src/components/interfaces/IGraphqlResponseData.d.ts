export interface IGraphqlResponseData {
  data: any;
  fetchQuery: (newVariables?: object) => void;
  error?: any;
}