export interface IMutationInjectedProps {
  executeMutation: (variables: object) => Promise<any>;
}
