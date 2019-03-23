import { VariableDefinitionNode } from 'graphql';

import { IOperationVariables } from '../components/interfaces/IOperationVariables';

export function variablesParser(variables: ReadonlyArray<VariableDefinitionNode>): Array<IOperationVariables> {
  let parsedVariables: Array<IOperationVariables> = [];

  variables.forEach((variableItem: VariableDefinitionNode) => {
    parsedVariables.push({
      required: variableItem.type.kind === 'NonNullType',
      name: variableItem.variable.name.value
    });
  });

  return parsedVariables;
}