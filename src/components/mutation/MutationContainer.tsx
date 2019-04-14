import React, { Component, ReactNode } from 'react';

import { IMutationContainerProps } from '../interfaces/IMutationContainerProps';
import { variablesChecker } from '../../utils/variablesChecker';
import HttpClient from '../../HttpClient/HttpClient';
import { AxiosError } from 'axios';

type MutationContainerProps = IMutationContainerProps;

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

    if (client) {
      if (graphqlDocument.variables) {
        try {
          variablesChecker(graphqlDocument.variables, variables ? variables : {});
        } catch (e) {
          throw e;
        }
      }

      return this.fetchData(client, variables);

    } else {
      throw new Error('No graphql client on context!');
    }
  }

  /**
   * @param client
   * @param variables
   */
  public fetchData(client: HttpClient, variables?: object): Promise<any> {
    return client.post({
      query: this.props.graphqlDocument.body,
      variables
    }).then((response: any) => {
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

export default MutationContainer;
