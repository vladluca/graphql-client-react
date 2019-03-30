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
import HttpClient from '../../HttpClient/HttpClient';
import { CachingTypes } from '../../constants/cachingTypes';

type QueryContainerProps = IQueryContainerProps & IQueryContainerReduxStateProps & IQueryContainerReduxDispatchProps;

/**
 * QueryContainer
 */
class QueryContainer extends Component<QueryContainerProps> {

  private fetchedFromServer: boolean;

  constructor(props: QueryContainerProps) {
    super(props);

    this.fetchedFromServer = false;
  }

  componentDidMount(): void {
    const {
      client,
      graphqlDocument,
      options: {
        variables,
        cachingType
      },
      queryResults
    } = this.props;
    const queryKey: string = graphqlDocument.name + (variables ? JSON.stringify(variables) : '');

    if (client) {
      if (graphqlDocument.variables) {
        try {
          variablesChecker(graphqlDocument.variables, variables ? variables : {});
        } catch (e) {
          throw e;
        }
      }

      let shouldFetchFromServer: boolean;

      switch (cachingType) {
        case CachingTypes.CacheAndNetwork:
          shouldFetchFromServer = true;
          break;

        case CachingTypes.NetworkOnly:
          shouldFetchFromServer = true;
          break;

        case CachingTypes.CacheFirst:
        default:
          shouldFetchFromServer = !queryResults[queryKey];
          break;

      }

      if (shouldFetchFromServer) {
        this.fetchData(client, queryKey, variables);
      }
    }
  }

  public fetchData(client: HttpClient, queryKey: string, variables?: object): Promise<void> {
    return client.post({
      query: this.props.graphqlDocument.body,
      variables
    }).then((response: any) => {
      this.fetchedFromServer = true;

      this.props.setQueryResult({
        queryKey,
        result: response.data
      });
    }).catch((error: AxiosError) => {
      if (error.response) {
        this.fetchedFromServer = true;

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

  render(): ReactNode {
    const {
      graphqlDocument,
      options: {
        variables,
        cachingType
      },
      queryResults
    } = this.props;

    const queryKey: string = graphqlDocument.name + (variables ? JSON.stringify(variables) : '');
    const queryResponse: any = {};

    if (cachingType !== CachingTypes.NetworkOnly || (cachingType === CachingTypes.NetworkOnly && this.fetchedFromServer)) {
      queryResponse[graphqlDocument.name] = queryResults[queryKey];
    } else {
      queryResponse[graphqlDocument.name] = undefined;
    }

    console.log(queryResults);

    console.log('asd');
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
