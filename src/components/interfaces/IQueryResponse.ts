export interface IQueryResponse {
  queryKey: string;
  result: {
    data: any,
    errors?: any
  };
}
