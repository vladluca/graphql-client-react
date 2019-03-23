import {
  DocumentNode,
  DefinitionNode,
  VariableDefinitionNode,
  OperationDefinitionNode,
} from 'graphql';

import { OperationTypes } from '../constants/operationTypes';
import { IGraphqlDocument } from '../components/interfaces/IGraphqlDocument';
import { IOperationVariables } from '../components/interfaces/IOperationVariables';
import { variablesParser } from './variablesParser';

const cache: Map<DocumentNode, IGraphqlDocument> = new Map();

// the parser is mainly a safety check for the HOC
export function gqlParser(document: DocumentNode): IGraphqlDocument {
  const cached: IGraphqlDocument | undefined = cache.get(document);

  if (cached) {
    return cached;
  }

  if(!document || !document.kind) {
    throw new Error(
      `${document} is not a valid GraphQL DocumentNode.`
    );
  }

  const fragments: ReadonlyArray<DefinitionNode> = document.definitions.filter((definitionItem: DefinitionNode) => {
    return definitionItem.kind === 'FragmentDefinition';
  });

  const queries: ReadonlyArray<DefinitionNode> = document.definitions.filter((definitionItem: DefinitionNode) => {
    return definitionItem.kind === 'OperationDefinition' && definitionItem.operation === 'query';
  });

  const mutations: ReadonlyArray<DefinitionNode> = document.definitions.filter((definitionItem: DefinitionNode) => {
    return definitionItem.kind === 'OperationDefinition' && definitionItem.operation === 'mutation';
  });

  if (fragments.length && !(queries.length + mutations.length)) {
    throw new Error(
      'A fragment must be passed together with a query or ' +
      'a mutation, passing just a fragment to graphql is not allowed.'
    );
  }

  if (queries.length + mutations.length > 1) {
    throw new Error(
      'Only one query/mutation is supported for every HOC. ' +
      'You can compose multiple HOCs if you need multiple operations on a component.'
    );
  }

  const type: OperationTypes = queries.length ? OperationTypes.Query : OperationTypes.Mutation;

  const definitions: ReadonlyArray<DefinitionNode> = queries.length ? queries : mutations;

  if (definitions.length === 0) {
    throw new Error(
      'You must pass one query/mutation to graphql HOC.'
    );
  }

  const definition: DefinitionNode = definitions[0] as OperationDefinitionNode;
  const variables: ReadonlyArray<VariableDefinitionNode> = definition.variableDefinitions || [];
  const body: string = document.loc ? document.loc.source.body : '';
  let name: string;

  if (definition.name && definition.name.kind === 'Name') {
    name = definition.name.value;
  } else {
    name = 'data';
  }

  const parsedVariables: ReadonlyArray<IOperationVariables> = variablesParser(variables);

  const payload: IGraphqlDocument = { name, type, variables: parsedVariables, body };
  cache.set(document, payload);

  return payload;
}
