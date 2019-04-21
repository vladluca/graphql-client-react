import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { IMutationContainerProps } from '../interfaces/IMutationContainerProps';
import { IReduxState } from '../interfaces/IReduxState';
import { IMutationContainerReduxDispatchProps } from '../interfaces/IMutationContainerReduxDispatchProps';

import { mergeMutationResponse } from '../../actions/query';

import { variablesChecker } from '../../utils/variablesChecker';
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
   */
  public executeMutation(variables: object): Promise<any> {
    const {
      client,
      graphqlDocument
    } = this.props;
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa', graphqlDocument);
    if (client) {
      if (graphqlDocument.variables) {
        try {
          variablesChecker(graphqlDocument.variables, variables ? variables : {});
        } catch (e) {
          throw e;
        }
      }

      return this.fetchData(client, graphqlDocument.operationSelectionName, variables);

    } else {
      throw new Error('No graphql client on context!');
    }
  }

  /**
   * @param client
   * @param operationSelectionName
   * @param variables
   */
  public fetchData(client: HttpClient, operationSelectionName: string | undefined, variables?: object): Promise<any> {
    return client.post({
      query: this.props.graphqlDocument.body,
      variables
    }).then((response: any) => {
      if (operationSelectionName && response.data.data[operationSelectionName]) {
        if (response.data.data[operationSelectionName]['id']) {
          console.log(response.data.data[operationSelectionName]['id']);

          this.props.mergeMutationResponse(response.data.data[operationSelectionName]);
        }
      }
      return response.data;
    }).catch((error: AxiosError) => {
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
    mergeMutationResponse: (mutationResponse: object) => dispatch(mergeMutationResponse(mutationResponse))
  };
}

export default connect<{}, IMutationContainerReduxDispatchProps, IMutationContainerProps, IReduxState>(
  undefined,
  mapDispatchToProps
)(MutationContainer);
