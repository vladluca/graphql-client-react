export interface IQueryInjectedProps {
  data: any;
  fetchQuery: (newVariables?: object) => void;
  error?: any;
}