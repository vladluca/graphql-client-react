import { IOperationVariables } from '../components/interfaces/IOperationVariables';

export function variablesChecker(expectedVariables: ReadonlyArray<IOperationVariables>, actualVariables: object): void {
  const actualVariablesKeys: string[] = Object.keys(actualVariables);

  expectedVariables.forEach((item: IOperationVariables) => {
    const actualVariable: string | undefined = actualVariablesKeys.find((key: string) => {
      return key === item.name;
    });

    if (item.required && !actualVariable) {
      throw new Error(`Variable ${item.name} is required!`);
    }
  });
}
