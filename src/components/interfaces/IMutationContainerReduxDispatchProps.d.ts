export interface IMutationContainerReduxDispatchProps {
  mergeMutationResponse: (mutationResponse: object, uniqIdentifierKey: string, uuid?: string) => void;
  rollbackOptimisticResponse: (uniqIdentifierKey: string, uuid: string) => void;
  removeBackupOptimisticResponseData: (uuid: string) => void
}
