import { IOperationVariables } from '../components/interfaces/IOperationVariables';

export function variablesChecker(expectedVariables: ReadonlyArray<IOperationVariables>, actualVariables: Object) {
  const actualVariablesKeys = Object.keys(actualVariables)

  expectedVariables.forEach((item: IOperationVariables) => {
    const actualVariable: Object | undefined = actualVariablesKeys.find((key) => {
      return key === item.name;
    })

    if (item.required && !actualVariable) {
      throw new Error(`Variable ${item.name} is required!`)
    }
  })
}