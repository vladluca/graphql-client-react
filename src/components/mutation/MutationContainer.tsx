import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import uuidv4 from 'uuid/v4';

import { IMutationContainerProps } from '../interfaces/IMutationContainerProps';
import { IReduxState } from '../interfaces/IReduxState';
import { IMutationContainerReduxDispatchProps } from '../interfaces/IMutationContainerReduxDispatchProps';

import { mergeMutationResponse, removeBackupOptimisticResponseData, rollbackOptimisticResponse } from '../../actions/query';

import { variablesChecker } from '../../utils/variablesChecker';
import { optimisticResponseFlag } from '../../constants/utils';

import HttpClient from '../../HttpClient/HttpClient';

type MutationContainerProps = IMutationContainerProps & IMutationContainerReduxDispatchProps;

/**
 * MutationContainer
 */
class MutationContainer extends Component<MutationContainerProps> {

  /**
   * @param props
   */
  constructor(props: MutationContainerProps) {
    super(props);

    this.executeMutation = this.executeMutation.bind(this);
  }

  /**
   * @param variables
   * @param optimisticResponse
   */
  public executeMutation(variables: any, optimisticResponse?: any): Promise<any> {
    const {
      client,
      graphqlDocument,
      uniqIdentifierKey
    } = this.props;

    if (client) {
      if (graphqlDocument.variables) {
        try {
          variablesChecker(graphqlDocument.variables, variables ? variables : {});
        } catch (e) {
          throw e;
        }
      }

      const uuid: string = uuidv4();

      if (optimisticResponse && uniqIdentifierKey && variables[uniqIdentifierKey]) {
        optimisticResponse[uniqIdentifierKey] = variables[uniqIdentifierKey];
        optimisticResponse[optimisticResponseFlag] = true;

        this.props.mergeMutationResponse(optimisticResponse, uniqIdentifierKey, uuid);
      }

      return this.fetchData(client, graphqlDocument.operationSelectionName, uuid, variables);

    } else {
      throw new Error('No graphql client on context!');
    }
  }

  /**
   * @param client
   * @param operationSelectionName
   * @param uuid
   * @param variables
   */
  public fetchData(
    client: HttpClient,
    operationSelectionName: string | undefined,
    uuid: string,
    variables?: object
  ): Promise<any> {
    return client.post({
      query: this.props.graphqlDocument.body,
      variables
    }).then((response: any) => {
      const { uniqIdentifierKey } = this.props;

      if (response.errors) {
        throw new Error();
      }

      if (operationSelectionName && response.data.data[operationSelectionName] && uniqIdentifierKey) {
        if (response.data.data[operationSelectionName][uniqIdentifierKey]) {
          this.props.mergeMutationResponse(response.data.data[operationSelectionName], uniqIdentifierKey);
        }
      }

      this.props.removeBackupOptimisticResponseData(uuid);

      return response.data;
    }).catch((error: AxiosError) => {
      const { uniqIdentifierKey } = this.props;

      if (uniqIdentifierKey) {
        this.props.rollbackOptimisticResponse(uniqIdentifierKey, uuid);
      }

      if (error.response) {
        return {
          data: undefined,
          errors: error.response.data
        };
      } else {
        throw error;
      }
    });
  }

  render(): ReactNode {
    const {
      graphqlDocument
    } = this.props;

    const mutationInjectedProps: any = {};

    mutationInjectedProps[graphqlDocument.name] = this.executeMutation;

    return this.props.children(mutationInjectedProps);
  }
}

/**
 * @param dispatch
 */
function mapDispatchToProps(dispatch: Dispatch): IMutationContainerReduxDispatchProps {
  return {
    mergeMutationResponse: (mutationResponse: object, uniqIdentifierKey: string, uuid?: string) => dispatch(
      mergeMutationResponse(mutationResponse, uniqIdentifierKey, uuid)
    ),
    rollbackOptimisticResponse: (uniqIdentifierKey: string, uuid: string) => dispatch(
      rollbackOptimisticResponse(uniqIdentifierKey, uuid)
    ),
    removeBackupOptimisticResponseData: (uuid: string) => dispatch(
      removeBackupOptimisticResponseData(uuid)
    )
  };
}

export default connect<{}, IMutationContainerReduxDispatchProps, IMutationContainerProps, IReduxState>(
  undefined,
  mapDispatchToProps
)(MutationContainer);
