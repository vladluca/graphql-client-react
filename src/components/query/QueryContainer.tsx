import React, { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IQueryContainerProps } from '../interfaces/IQueryContainerProps';
import { IReduxState } from '../interfaces/IReduxState';
import { IQueryContainerReduxStateProps } from '../interfaces/IQueryContainerReduxStateProps';
import { IQueryContainerReduxDispatchProps } from '../interfaces/IQueryContainerReduxDispatchProps';

import { setQueryResult } from '../../actions/query';
import { variablesChecker } from '../../utils/variablesChecker';

type QueryContainerProps = IQueryContainerProps & IQueryContainerReduxStateProps & IQueryContainerReduxDispatchProps;

/**
 * QueryContainer
 */
class QueryContainer extends Component<QueryContainerProps> {

  componentDidMount(): void {
    const { client, graphqlDocument, options: { variables } } = this.props;

    if (client) {
      if (variables) {
        try {
          variablesChecker(graphqlDocument.variables, variables);
        } catch (e) {
          throw e;
        }
      }

      client.post({
        query: this.props.graphqlDocument.body,
        variables
      }).then((response: any) => {
        console.log('RESPONSE: ', response);
      }).catch((e: Error) => {
        console.error(e);
      });
    }

    this.props.setQueryResult(this.props.options.operation);
  }

  render(): ReactNode {
    return this.props.children({
      operation: this.props.options.operation
    });
  }
}

function mapStateToProps(state: IReduxState): IQueryContainerReduxStateProps {
  return {
    queryResult: state.queryReducer.result
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
