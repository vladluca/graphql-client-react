import React, { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IQueryContainerProps } from '../interfaces/IQueryContainerProps';
import { IReduxState } from '../interfaces/IReduxState';
import { IQueryContainerReduxStateProps } from '../interfaces/IQueryContainerReduxStateProps';
import { IQueryContainerReduxDispatchProps } from '../interfaces/IQueryContainerReduxDispatchProps';

import { setQueryResult } from '../../actions/query';

type QueryContainerProps = IQueryContainerProps & IQueryContainerReduxStateProps & IQueryContainerReduxDispatchProps;

/**
 * QueryContainer
 */
class QueryContainer extends Component<QueryContainerProps> {

  componentDidMount(): void {
    this.props.setQueryResult(this.props.options.operation);
  }

  render(): ReactNode {
    console.log('QueryContainer props: ', this.props);

    return this.props.children({
      operation: this.props.options.operation
    });
  }
}

function mapStateToProps(state: IReduxState): IQueryContainerReduxStateProps {
  console.log(state);
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
