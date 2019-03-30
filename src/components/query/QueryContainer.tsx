import React, { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IQueryContainerProps } from '../interfaces/IQueryContainerProps';
import { IReduxState } from '../interfaces/IReduxState';
import { IQueryContainerReduxStateProps } from '../interfaces/IQueryContainerReduxStateProps';
import { IQueryContainerReduxDispatchProps } from '../interfaces/IQueryContainerReduxDispatchProps';

import { setQueryResult } from '../../actions/query';
import { variablesChecker } from '../../utils/variablesChecker';
import { AxiosError } from 'axios';

type QueryContainerProps = IQueryContainerProps & IQueryContainerReduxStateProps & IQueryContainerReduxDispatchProps;

/**
 * QueryContainer
 */
class QueryContainer extends Component<QueryContainerProps> {

  componentDidMount(): void {
    const { client, graphqlDocument, options: { variables } } = this.props;
    const queryKey: string = graphqlDocument.name + JSON.stringify(variables);

    if (client) {
      if (graphqlDocument.variables) {
        try {
          variablesChecker(graphqlDocument.variables, variables ? variables : {});
        } catch (e) {
          throw e;
        }
      }

      client.post({
        query: this.props.graphqlDocument.body,
        variables
      }).then((response: any) => {
        this.props.setQueryResult({
          queryKey,
          result: response.data
        });
      }).catch((error: AxiosError) => {
        if (error.response) {
          this.props.setQueryResult({
            queryKey,
            result: {
              data: null,
              errors: error.response.data
            }
          });
        } else {
          throw error;
        }
      });
    }
  }

  render(): ReactNode {
    const { graphqlDocument, options: { variables } } = this.props;
    const queryKey: string = graphqlDocument.name + JSON.stringify(variables);
    const queryResponse: any = {};

    queryResponse[graphqlDocument.name] = this.props.queryResults[queryKey];

    return this.props.children(queryResponse);
  }
}

function mapStateToProps(state: IReduxState): IQueryContainerReduxStateProps {
  return {
    queryResults: state.queryReducer.results
  };
}

function mapDispatchToProps(dispatch: Dispatch): IQueryContainerReduxDispatchProps {
  return {
    setQueryResult: (result: any) => dispatch(setQueryResult(result))
  };
}

export default connect<IQueryContainerReduxStateProps, IQueryContainerReduxDispatchProps, IQueryContainerProps, IReduxState>(
  mapStateToProps,
  mapDispatchToProps
)(QueryContainer);
